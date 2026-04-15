# OpenClaw UI Credential 입력 컴포넌트 상세 가이드

## 개요

이 문서는 OpenClaw의 웹 UI에서 credential/secret을 등록하고 관리할 때 사용되는 실제 컴포넌트와 구현 로직을 상세히 설명합니다.

---

## 1. 설정 폼 아키텍처

### 1.1 주요 파일 구조

```
ui/src/ui/views/
├── config.ts                    # 메인 설정 페이지 렌더링
├── config-form.ts              # 폼 분석 및 렌더링 오케스트레이션
├── config-form.render.ts       # 섹션 및 필드 렌더
├── config-form.node.ts         # 개별 필드 렌더 로직
├── config-form.analyze.ts      # 스키마 분석
├── config-form.shared.ts       # 공유 유틸리티
├── channels.config.ts          # 채널별 설정 폼
└── channels.*.ts               # 채널별 상세 컴포넌트
```

### 1.2 렌더링 계층 구조

```
┌─ renderConfig (최상위)
│  ├─ renderConfigForm
│  │  ├─ renderSectionCard
│  │  │  └─ renderNode (recursive)
│  │  │     ├─ renderLeafNode (string, number, boolean, select 등)
│  │  │     ├─ renderArrayNode
│  │  │     ├─ renderObjectNode
│  │  │     └─ renderSensitiveField
│  │  └─ renderSearch
│  └─ renderChannelConfigSection (채널별)
│     └─ renderChannelConfigForm
│        └─ renderNode (채널 필드)
└─ renderOverview (접근 제어)
   └─ renderGatewayAuth
      ├─ 토큰 입력
      └─ 패스워드 입력
```

---

## 2. Sensitive 필드 렌더링

### 2.1 민감 데이터 감지 로직

**파일**: `ui/src/ui/views/config-form.node.ts`

```typescript
// 민감 데이터 경로 패턴
const SENSITIVE_PATH_PATTERNS = [
  /secret/i,
  /token/i,
  /password/i,
  /apikey/i,
  /key/i,
  /credential/i,
];

// 민감 데이터 여부 판단
function hasSensitiveConfigData(
  value: unknown,
  path: Array<string | number>,
  hints: ConfigUiHints,
): boolean {
  // 1. UI Hints에서 sensitive 플래그 확인
  const hint = hintForPath(path, hints);
  if (hint?.sensitive) {
    return true;
  }

  // 2. 경로에 민감 데이터 패턴 매칭
  const pathStr = path
    .filter((p) => typeof p === "string")
    .join(".")
    .toLowerCase();

  for (const pattern of SENSITIVE_PATH_PATTERNS) {
    if (pattern.test(pathStr)) {
      return true;
    }
  }

  // 3. 값이 SecretRef 객체인지 확인
  if (isSecretRefObject(value)) {
    return true;
  }

  return false;
}
```

### 2.2 민감 필드 렌더링

```typescript
// Sensitive 상태 계산
function getSensitiveRenderState(params: SensitiveRenderParams): SensitiveRenderState {
  const isSensitive = hasSensitiveConfigData(params.value, params.path, params.hints);
  const isRevealed =
    isSensitive &&
    (params.revealSensitive || (params.isSensitivePathRevealed?.(params.path) ?? false));

  return {
    isSensitive,
    isRedacted: isSensitive && !isRevealed,
    isRevealed,
    canReveal: isSensitive,
  };
}
```

### 2.3 민감 필드 UI 컴포넌트

```typescript
// 민감 토글 버튼
function renderSensitiveToggleButton(params: {
  path: Array<string | number>;
  state: SensitiveRenderState;
  disabled: boolean;
  onToggleSensitivePath?: (path: Array<string | number>) => void;
}): TemplateResult | typeof nothing {
  const { state } = params;

  if (!state.isSensitive || !params.onToggleSensitivePath) {
    return nothing;
  }

  return html`
    <button
      type="button"
      class="btn btn--icon ${state.isRevealed ? "active" : ""}"
      style="width:28px;height:28px;padding:0;"
      title=${state.canReveal
        ? state.isRevealed
          ? "Hide value"
          : "Reveal value"
        : "Disable stream mode to reveal value"}
      ?disabled=${params.disabled || !state.canReveal}
      @click=${() => params.onToggleSensitivePath?.(params.path)}
    >
      ${state.isRevealed ? sharedIcons.eye : sharedIcons.eyeOff}
    </button>
  `;
}

// 민감 필드 입력 렌더
function renderSensitiveInput(params: {
  path: Array<string | number>;
  value: unknown;
  state: SensitiveRenderState;
  disabled: boolean;
  onChange: (value: string) => void;
}): TemplateResult {
  const displayValue = params.state.isRevealed ? String(params.value ?? "") : "●●●●●●●●●";

  return html`
    <div style="display: flex; align-items: center; gap: 8px;">
      <input
        type=${params.state.isRevealed ? "text" : "password"}
        autocomplete="off"
        .value=${params.state.isRevealed ? String(params.value ?? "") : ""}
        ?disabled=${params.disabled}
        @input=${(e: Event) => {
          params.onChange((e.target as HTMLInputElement).value);
        }}
        placeholder="Enter value"
        style="flex: 1 1 0%; min-width: 0;"
      />
      ${params.state.canReveal
        ? renderSensitiveToggleButton({
            path: params.path,
            state: params.state,
            disabled: params.disabled,
            onToggleSensitivePath: () => {
              // 토글 로직
            },
          })
        : nothing}
    </div>
  `;
}
```

---

## 3. SecretRef 객체 처리

### 3.1 SecretRef 인식 및 렌더링

```typescript
// SecretRef 객체 타입 정의
type SecretRef = {
  source: string; // 예: "env"
  id: string; // 참조 ID
  provider?: string; // 선택적 프로바이더
};

// SecretRef 객체 감지
function isSecretRefObject(value: unknown): value is {
  source: string;
  id: string;
  provider?: string;
} {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  if (typeof candidate.source !== "string" || typeof candidate.id !== "string") {
    return false;
  }

  return candidate.provider === undefined || typeof candidate.provider === "string";
}

// SecretRef 표시 방식
function renderSecretRefDisplay(ref: SecretRef): TemplateResult {
  return html`
    <div style="display: flex; align-items: center; gap: 8px;">
      <span class="badge" style="background: #e8f5e9; color: #2e7d32;"> REF </span>
      <code style="font-size: 0.9em;">
        ${ref.source}:${ref.id}${ref.provider ? `(${ref.provider})` : ""}
      </code>
    </div>
  `;
}
```

### 3.2 SecretRef와 Plaintext 선택 UI

```typescript
// Credential 입력 모드 선택
function renderSecretInputModeSelector(params: {
  value: unknown;
  onSelectMode: (mode: "plaintext" | "ref") => void;
  disabled: boolean;
}): TemplateResult {
  const isRef = isSecretRefObject(params.value);

  return html`
    <div class="tablist" style="margin-bottom: 12px;">
      <button
        class="tab ${!isRef ? "active" : ""}"
        ?disabled=${params.disabled}
        @click=${() => params.onSelectMode("plaintext")}
      >
        Direct
      </button>
      <button
        class="tab ${isRef ? "active" : ""}"
        ?disabled=${params.disabled}
        @click=${() => params.onSelectMode("ref")}
      >
        Reference (Env/Vault)
      </button>
    </div>
  `;
}

// Plaintext 입력
function renderPlaintextInput(params: {
  value: unknown;
  onChange: (value: string) => void;
  disabled: boolean;
}): TemplateResult {
  return html`
    <input
      type="password"
      .value=${String(params.value ?? "")}
      ?disabled=${params.disabled}
      @input=${(e: Event) => {
        params.onChange((e.target as HTMLInputElement).value);
      }}
      placeholder="Enter your API key or token"
    />
  `;
}

// SecretRef 입력
function renderRefInput(params: {
  value: unknown;
  onChange: (ref: SecretRef) => void;
  disabled: boolean;
}): TemplateResult {
  const ref = isSecretRefObject(params.value) ? params.value : { source: "env", id: "" };

  return html`
    <div style="display: flex; gap: 8px;">
      <select
        .value=${ref.source}
        ?disabled=${params.disabled}
        @change=${(e: Event) => {
          const source = (e.target as HTMLSelectElement).value;
          params.onChange({ ...ref, source });
        }}
      >
        <option value="env">Environment Variable</option>
        <option value="vault">Vault</option>
      </select>

      <input
        type="text"
        .value=${ref.id}
        ?disabled=${params.disabled}
        @input=${(e: Event) => {
          const id = (e.target as HTMLInputElement).value;
          params.onChange({ ...ref, id });
        }}
        placeholder="Variable name or path"
      />
    </div>
  `;
}
```

---

## 4. 채널별 설정 폼

### 4.1 채널 설정 폼 구조

**파일**: `ui/src/ui/views/channels.config.ts`

```typescript
// 채널 설정 폼 Props
type ChannelConfigFormProps = {
  channelId: string; // "slack", "discord" 등
  configValue: Record<string, unknown> | null; // 현재 설정값
  schema: unknown; // JSON Schema
  uiHints: ConfigUiHints; // UI 힌트
  disabled: boolean; // 비활성화 여부
  onPatch: (path: Array<string | number>, value: unknown) => void; // 변경 핸들러
};

// 렌더링
export function renderChannelConfigForm(props: ChannelConfigFormProps) {
  const analysis = analyzeConfigSchema(props.schema);
  const normalized = analysis.schema;

  if (!normalized) {
    return html`<div class="callout danger">Schema unavailable.</div>`;
  }

  // channels.[channelId] 경로의 스키마 노드 찾기
  const node = resolveSchemaNode(normalized, ["channels", props.channelId]);

  if (!node) {
    return html`<div class="callout danger">Channel schema unavailable.</div>`;
  }

  const configValue = props.configValue ?? {};
  const value = resolveChannelValue(configValue, props.channelId);

  return html`
    <div class="config-form">
      ${renderNode({
        schema: node,
        value,
        path: ["channels", props.channelId],
        hints: props.uiHints,
        unsupported: new Set(analysis.unsupportedPaths),
        disabled: props.disabled,
        showLabel: false,
        onPatch: props.onPatch,
      })}
    </div>
  `;
}
```

### 4.2 Slack 채널 설정 예시

```typescript
// Slack 설정 필드 (복수 계정 지원)
{
  "channels": {
    "slack": {
      "accounts": {
        "[account-id]": {
          "botToken": "xoxb-...",
          "appToken": "xapp-...",
          "signingSecret": "signing-secret",
          "userToken": "xoxp-..."
        }
      },
      // 또는 단일 기본 계정
      "botToken": "xoxb-...",
      "appToken": "xapp-...",
      "signingSecret": "signing-secret"
    }
  }
}
```

### 4.3 Discord 채널 설정 예시

```typescript
{
  "channels": {
    "discord": {
      "token": "bot-token",  // 기본 토큰
      "accounts": {
        "bot-1": {
          "token": "bot-token-1"
        },
        "bot-2": {
          "token": "bot-token-2"
        }
      }
    }
  }
}
```

---

## 5. 검색 및 필터링 기능

### 5.1 설정 검색 파서

**파일**: `ui/src/ui/views/config-form.node.ts`

```typescript
// 검색 쿼리 파싱
export function parseConfigSearchQuery(query: string): ConfigSearchCriteria {
  const tags: string[] = [];
  const seen = new Set<string>();

  const raw = query.trim();

  // tag: 접두사 추출
  const stripped = raw.replace(/(^|\s)tag:([^\s]+)/gi, (_, leading: string, token: string) => {
    const normalized = token.trim().toLowerCase();
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      tags.push(normalized);
    }
    return leading;
  });

  return {
    text: stripped.trim().toLowerCase(),
    tags,
  };
}

// 사용 예시
parseConfigSearchQuery("slack tag:security token");
// → {
//     text: "slack token",
//     tags: ["security"]
//   }
```

### 5.2 필드 매칭 로직

```typescript
// 필드 메타데이터 생성
function resolveFieldMeta(
  path: Array<string | number>,
  schema: JsonSchema,
  hints: ConfigUiHints,
): FieldMeta {
  const hint = hintForPath(path, hints);
  const label = hint?.label ?? schema.title ?? humanize(String(path.at(-1)));
  const help = hint?.help ?? schema.description;
  const schemaTags = normalizeTags(schema["x-tags"] ?? schema.tags);
  const hintTags = normalizeTags(hint?.tags);

  return {
    label,
    help,
    tags: hintTags.length > 0 ? hintTags : schemaTags,
  };
}

// 노드 검색 매칭
function matchesNodeSearch(params: {
  schema: JsonSchema;
  path: Array<string | number>;
  hints: ConfigUiHints;
  criteria: ConfigSearchCriteria;
}): boolean {
  if (!hasSearchCriteria(params.criteria)) {
    return true;
  }

  const { label, help, tags } = resolveFieldMeta(params.path, params.schema, params.hints);

  // 태그 매칭
  if (!matchesTags(params.criteria.tags, tags)) {
    return false;
  }

  // 텍스트 매칭
  if (!params.criteria.text) {
    return true;
  }

  const pathLabel = params.path.filter((s) => typeof s === "string").join(".");

  return (
    matchesText(params.criteria.text, [label, help, pathLabel]) ||
    (params.schema.enum
      ? matchesText(
          params.criteria.text,
          params.schema.enum.map((e) => String(e)),
        )
      : false)
  );
}
```

---

## 6. 실시간 편집 및 저장

### 6.1 폼 패치 (변경 적용)

```typescript
// onPatch 핸들러
function onFormPatch(path: Array<string | number>, value: unknown) {
  // 현재 폼 값 복사
  const next = structuredClone(formValue);

  // 경로를 따라 값 설정
  let current = next;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!(key in current)) {
      current[key] = typeof path[i + 1] === "number" ? [] : {};
    }
    current = current[key];
  }

  const lastKey = path[path.length - 1];
  current[lastKey] = value;

  // UI 업데이트
  updateFormValue(next);
}
```

### 6.2 저장 프로세스

```typescript
// 설정 저장
async function onConfigSave() {
  setSaving(true);

  try {
    // 성능 검증
    const validation = validateConfig(formValue);
    if (!validation.valid) {
      showError(validation.errors);
      return;
    }

    // 서버에 저장
    const response = await saveConfig(formValue);

    if (response.ok) {
      showSuccess("Configuration saved");
      setOriginalValue(structuredClone(formValue));
    } else {
      showError(response.error);
    }
  } finally {
    setSaving(false);
  }
}
```

---

## 7. Gateway 인증 UI

### 7.1 Gateway 인증 설정 페이지

**파일**: `ui/src/ui/views/overview.ts`

```typescript
// Gateway 인증 설정
export function renderGatewayAuthSection(params: {
  gatewayUrl: string;
  settings: { token: string };
  password: string;
  onSettingsChange: (settings: { token: string }) => void;
  onPasswordChange: (password: string) => void;
  showGatewayToken: boolean;
  onShowGatewayTokenChange: (show: boolean) => void;
}): TemplateResult {
  return html`
    <div class="gateway-auth-section">
      <h3>Gateway Authentication</h3>

      <label class="field">
        <span>Gateway URL</span>
        <input
          type="text"
          .value=${params.gatewayUrl}
          placeholder="ws://100.x.y.z:18789"
          disabled
        />
      </label>

      <label class="field">
        <span>Token</span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <input
            type=${params.showGatewayToken ? "text" : "password"}
            autocomplete="off"
            .value=${params.settings.token}
            @input=${(e: Event) => {
              params.onSettingsChange({
                ...params.settings,
                token: (e.target as HTMLInputElement).value,
              });
            }}
            placeholder="OPENCLAW_GATEWAY_TOKEN"
          />
          <button
            type="button"
            class="btn btn--icon ${params.showGatewayToken ? "active" : ""}"
            @click=${() => params.onShowGatewayTokenChange(!params.showGatewayToken)}
          >
            ${params.showGatewayToken ? eyeIcon : eyeOffIcon}
          </button>
        </div>
      </label>

      <label class="field">
        <span>Password</span>
        <input
          type="password"
          autocomplete="off"
          .value=${params.password}
          @input=${(e: Event) => {
            params.onPasswordChange((e.target as HTMLInputElement).value);
          }}
          placeholder="(not saved)"
        />
      </label>
    </div>
  `;
}
```

---

## 8. 모델 프로바이더 API Key 관리

### 8.1 모델 프로바이더 설정

```json
{
  "models": {
    "providers": {
      "anthropic": {
        "apiKey": "sk-ant-...",
        "baseUrl": "https://api.anthropic.com"
      },
      "openai": {
        "apiKey": "sk-...",
        "baseUrl": "https://api.openai.com/v1"
      },
      "google": {
        "apiKey": "..."
      }
    }
  }
}
```

### 8.2 프로바이더 선택 및 키 설정

```typescript
// 모델 프로바이더 폼
function renderModelProviderForm(params: {
  providers: Record<string, ProviderConfig>;
  onAdd: (providerId: string) => void;
  onUpdate: (providerId: string, config: ProviderConfig) => void;
}): TemplateResult {
  return html`
    <div class="model-providers">
      <h3>Model Providers</h3>

      ${Object.entries(params.providers).map(
        ([id, config]) => html`
          <div class="provider-card">
            <h4>${id}</h4>

            <label class="field">
              <span>API Key</span>
              <input
                type="password"
                .value=${config.apiKey ?? ""}
                @input=${(e: Event) => {
                  params.onUpdate(id, {
                    ...config,
                    apiKey: (e.target as HTMLInputElement).value,
                  });
                }}
                placeholder="Enter API key"
              />
            </label>

            ${config.baseUrl
              ? html`
                  <label class="field">
                    <span>Base URL (Optional)</span>
                    <input
                      type="text"
                      .value=${config.baseUrl}
                      @input=${(e: Event) => {
                        params.onUpdate(id, {
                          ...config,
                          baseUrl: (e.target as HTMLInputElement).value,
                        });
                      }}
                      placeholder="https://api.provider.com"
                    />
                  </label>
                `
              : nothing}
          </div>
        `,
      )}
    </div>
  `;
}
```

---

## 9. 다국어 지원 (i18n)

### 9.1 로케일별 credential 용어

**파일**: `ui/src/i18n/locales/en.ts`

```typescript
export const enLocale = {
  common: {
    credential: "Credential",
    password: "Password (not saved)", // pragma: allowlist secret
    secret: "Secret",
    token: "Token",
    apiKey: "API Key",
    auth: "Authentication",
    authAge: "Auth age",
    probeOk: "Probe ok",
    probeFailed: "Probe failed",
  },
  // ...
};
```

**파일**: `ui/src/i18n/locales/de.ts`, `es.ts` 등 - 각 언어별 번역

```typescript
export const deLocale = {
  common: {
    credential: "Anmeldedaten",
    password: "Passwort (nicht gespeichert)",
    secret: "Geheimnis",
    token: "Token",
    apiKey: "API-Schlüssel",
    // ...
  },
};
```

---

## 10. 보안 고려사항

### 10.1 민감 데이터 마스킹

```typescript
// API Key 마스킹
function maskApiKey(apiKey: string): string {
  if (!apiKey) {
    return "missing";
  }
  if (apiKey.length <= 6) {
    return "●●●●●●";
  }
  return apiKey.substring(0, 3) + "●".repeat(Math.max(6, apiKey.length - 6));
}

// 예: "sk-proj-123456789..." → "sk-●●●●●●●●●●●"
```

### 10.2 환경변수 보호

```typescript
// 환경변수 참조만 저장
const config = {
  channels: {
    slack: {
      botToken: {
        source: "env",
        id: "SLACK_BOT_TOKEN",
      },
    },
  },
};

// 실제 값은 환경에서만 로드
```

### 10.3 SecretRef 검증

```typescript
// OAuth 프로필은 SecretRef 미지원
export function ensureOAuthProfileSecretRefPolicy(profile: AuthProfile): void {
  if (profile.mode === "oauth") {
    if (profile.tokenRef || profile.keyRef) {
      throw new Error("OAuth profiles cannot use SecretRef. Use token/key directly.");
    }
  }
}
```

---

## 11. 실제 사용 시나리오

### 11.1 Slack Bot 설정

```
1. UI 열기
   → Settings > Channels > Slack 선택

2. Account 추가
   → "Add Account" 버튼 클릭

3. Bot Token 입력
   → "Direct" 탭 선택
   → xoxb-... 토큰 입력

4. App Token 입력
   → xapp-... 토큰 입력

5. Signing Secret 입력
   → 서명 비밀 입력

6. Save
   → 설정 저장
   → 프로브 실행 (재연결)

7. Status 확인
   → "Connected" 표시 확인
```

### 11.2 LLM API Key 설정

```
1. UI 열기
   → Settings > Models

2. Provider 선택
   → Anthropic / OpenAI 등

3. API Key 입력
   → "Direct" 모드로 sk-... 입력

4. 또는 Environment Ref 선택
   → "Reference" 탭
   → source: "env"
   → id: "ANTHROPIC_API_KEY"

5. Save
   → 모델 가용 여부 자동 확인

6. 모델 사용
   → Agent에서 사용 가능
```

### 11.3 웹 검색 API Key 설정

```
1. UI 열기
   → Settings > Tools > Web Search

2. 검색 엔진 선택
   → Google / Brave / Tavily 등

3. API Key 입력
   → api.key 값 입력

4. Save
   → 설정 저장

5. 웹 검색 도구
   → Agent가 웹 검색 자동 사용
```

---

## 12. 디버깅 팁

### 12.1 민감 데이터 표시

```typescript
// 환경 설정에서 모든 secret 표시
// UI > Settings > reveal all sensitive

// 또는 개별적으로
// 각 필드의 눈 아이콘 클릭
```

### 12.2 검색으로 credential 찾기

```
// Slack 관련 설정 찾기
검색: "slack"

// 보안 관련 설정 찾기
검색: "tag:security"

// API key 관련 설정 찾기
검색: "api"
```

### 12.3 스키마 에러

```
// "Schema unavailable" 에러
→ 브라우저 개발자 도구에서 네트워크 탭 확인
→ /api/schema 요청 상태 확인
→ 게이트웨이 확인
```

---

## 13. 참고 파일

| 기능                  | 파일                                    |
| --------------------- | --------------------------------------- |
| 메인 설정 페이지      | `ui/src/ui/views/config.ts`             |
| 폼 렌더링 로직        | `ui/src/ui/views/config-form.render.ts` |
| 노드 렌더링           | `ui/src/ui/views/config-form.node.ts`   |
| 채널 설정             | `ui/src/ui/views/channels.config.ts`    |
| 개요/Gateway          | `ui/src/ui/views/overview.ts`           |
| Credential 레지스트리 | `src/secrets/target-registry-data.ts`   |
| 타입 정의             | `src/secrets/target-registry-types.ts`  |
| i18n                  | `ui/src/i18n/locales/`                  |
