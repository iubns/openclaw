# OpenClaw UI Credential 관리 - 빠른 참조 가이드

## 📱 UI 접근 및 네비게이션

### 설정 페이지 열기

```
Web Dashboard → ⚙️ Settings → Credentials/Configuration
```

### 섹션별 접근 경로

| 목적              | 경로                                 |
| ----------------- | ------------------------------------ |
| **Slack 설정**    | Settings > Channels > Slack          |
| **Discord 설정**  | Settings > Channels > Discord        |
| **Telegram 설정** | Settings > Channels > Telegram       |
| **LLM API Key**   | Settings > Models > [Provider]       |
| **Google Chat**   | Settings > Channels > Google Chat    |
| **웹 검색 API**   | Settings > Tools > Web Search        |
| **Gateway 인증**  | Settings > Gateway > Authentication  |
| **인증 프로필**   | Settings > Authentication > Profiles |

---

## 🔑 채널별 Credential 필드

### Slack

```json
{
  "botToken": "xoxb-...",          # Slack Bot Token
  "appToken": "xapp-...",          # Slack App Token
  "signingSecret": "...",          # 요청 서명 검증
  "userToken": "xoxp-..."          # 사용자 토큰 (선택)
}
```

**위치**: `channels.slack` 또는 `channels.slack.accounts.[id]`

### Discord

```json
{
  "token": "bot-token"             # Discord Bot Token
}
```

**위치**: `channels.discord.token` 또는 `channels.discord.accounts.[id].token`

### Telegram

```json
{
  "botToken": "123456:ABC-DEF..."  # Telegram Bot Token (BotFather에서 받음)
}
```

**위치**: `channels.telegram.accounts.[id].botToken`

### Matrix

```json
{
  "accessToken": "syt_...",        # Matrix Access Token
  "password": "password"           # 계정 패스워드
}
```

**위치**: `channels.matrix.accessToken`, `channels.matrix.password`

### Google Chat

```json
{
  "serviceAccount": "{...}",                    # Google Service Account JSON
  "serviceAccountRef": {                        # 또는 참조
    "source": "env",
    "id": "GOOGLE_SERVICE_ACCOUNT"
  }
}
```

**위치**: `channels.googlechat.serviceAccount`

### Feishu (飞书)

```json
{
  "appSecret": "...",              # App Secret
  "encryptKey": "...",             # 암호화 키
  "verificationToken": "..."       # 인증 토큰
}
```

### IRC

```json
{
  "password": "...",               # IRC 비밀번호
  "nickserv": {
    "password": "..."              # NickServ 비밀번호 (선택)
  }
}
```

### Mattermost

```json
{
  "botToken": "..."
}
```

---

## 🤖 LLM 프로바이더 API Keys

### Anthropic

```json
{
  "models": {
    "providers": {
      "anthropic": {
        "apiKey": "sk-ant-..."
      }
    }
  }
}
```

### OpenAI

```json
{
  "models": {
    "providers": {
      "openai": {
        "apiKey": "sk-..."
      }
    }
  }
}
```

### Google Gemini

```json
{
  "models": {
    "providers": {
      "google": {
        "apiKey": "..."
      }
    }
  }
}
```

### 기타 LLM 프로바이더

- **Groq**: `models.providers.groq.apiKey`
- **Perplexity**: `models.providers.perplexity.apiKey`
- **xAI**: `models.providers.xai.apiKey`
- **Deepseek**: `models.providers.deepseek.apiKey`
- **Kimi**: `models.providers.kimi.apiKey`

---

## 🔍 웹 검색 도구 API Keys

### 검색 엔진별

| 엔진           | 설정 경로                                            | API 제공자   |
| -------------- | ---------------------------------------------------- | ------------ |
| **Google**     | `tools.web.search.apiKey`                            | Google Cloud |
| **Brave**      | `plugins.entries.brave.config.webSearch.apiKey`      | Brave Search |
| **Perplexity** | `plugins.entries.perplexity.config.webSearch.apiKey` | Perplexity   |
| **Tavily**     | `plugins.entries.tavily.config.webSearch.apiKey`     | Tavily       |
| **Firecrawl**  | `tools.web.fetch.firecrawl.apiKey`                   | Firecrawl    |
| **Moonshot**   | `plugins.entries.moonshot.config.webSearch.apiKey`   | Moonshot     |
| **xAI**        | `plugins.entries.xai.config.webSearch.apiKey`        | xAI          |

---

## 🔐 Gateway 인증

### 토큰 기반 인증

```json
{
  "gateway": {
    "auth": {
      "mode": "token",
      "token": "your-access-token"
    }
  }
}
```

### 패스워드 기반 인증

```json
{
  "gateway": {
    "auth": {
      "mode": "password",
      "password": "your-password"
    }
  }
}
```

### 신뢰할 수 있는 프록시

```json
{
  "gateway": {
    "auth": {
      "mode": "trusted-proxy"
    }
  }
}
```

---

## 📝 입력 모드

### 직접 입력 (Direct)

```
탭: Direct
↓
텍스트 필드에 credential 직접 입력
↓
예: xoxb-... 또는 sk-...
```

### 환경변수 참조 (Reference)

```
탭: Reference (Env/Vault)
↓
source: env
id: VARIABLE_NAME
↓
시스템 환경변수에서 자동 로드
```

**예시**:

```json
{
  "source": "env",
  "id": "SLACK_BOT_TOKEN"
}
```

---

## 💾 저장 및 적용

### 설정 저장 절차

```
1. credential 입력
   ↓
2. [Save] 버튼 클릭
   ↓
3. 설정 파일 저장됨
   ↓
4. 자동 프로브 (연결 테스트)
   ↓
5. 상태 표시 업데이트
```

### 설정 파일 위치

- **Linux/macOS**: `~/.openclaw/openclaw.json`
- **Windows**: `%USERPROFILE%\.openclaw\openclaw.json`
- **인증 프로필**: `~/.openclaw/auth-profiles.json`

---

## 🔍 설정 검색

### 검색 문법

| 검색어             | 결과                  |
| ------------------ | --------------------- |
| `slack`            | Slack 관련 모든 설정  |
| `token`            | token 포함 필드       |
| `tag:secret`       | secret 태그 필드      |
| `api tag:security` | "api" + security 태그 |
| `password`         | password 관련 필드    |

### 검색 예시

```
[검색박스]
> slack
↓
- Slack: Bot Token
- Slack: App Token
- Slack: Signing Secret
(검색 결과)

[검색박스]
> tag:secret
↓
(모든 secret 태그 필드 표시)
```

---

## 👁️ Sensitive 데이터 표시/숨김

### 개별 필드 토글

```
[입력필드] ●●●●●●●●● [👁️]
                      ↑
                      클릭으로 표시/숨김
```

### 전체 민감 데이터 표시

```
Settings 상단
→ [👁️ Reveal sensitive] 토글
→ 모든 secret값 표시
```

---

## ⚠️ 보안 권장사항

### ✅ DO (권장)

```
✓ Environment variable 참조 사용 (SecretRef)
✓ 민감 데이터 자동 마스킹 활용
✓ 정기적 credential 로테이션
✓ 각 채널별 별도 토큰 사용
✓ 프로바이더 권장 스코프만 부여
```

### ❌ DON'T (비권장)

```
✗ 설정 파일에 평문 저장
✗ 버전 관리에 credential 커밋
✗ 공유 credential 사용
✗ 만료된 토큰 유지
✗ 과도한 권한 스코프
```

---

## 🐛 문제 해결

### "Schema unavailable" 에러

```
문제: 스키마 로드 실패
원인: 게이트웨이 연결 문제
해결:
  1. 게이트웨이 상태 확인
  2. 브라우저 개발자 도구 > Network 확인
  3. /api/schema 요청 상태 확인
```

### credential 저장 안됨

```
문제: Save 버튼 비활성화
원인: 폼 검증 실패
해결:
  1. 필수 필드 확인
  2. 형식 검증 (JSON for Google Chat)
  3. 콘솔 에러 메시지 확인
```

### 채널 연결 실패

```
문제: "Probe failed"
원인: credential 틀림 또는 권한 부족
해결:
  1. Token/API Key 재확인
  2. 만료 상태 확인
  3. 프로바이더 웹사이트에서 재발급
```

---

## 📚 관련 문서

| 문서                                                | 내용                        |
| --------------------------------------------------- | --------------------------- |
| [전체 탐색 가이드](UI-CREDENTIAL-EXPLORER.md)       | credential 시스템 상세 설명 |
| [컴포넌트 상세 가이드](UI-CREDENTIAL-COMPONENTS.md) | UI 구현 로직 및 코드 예시   |
| [인증 시맨틱](docs/auth-credential-semantics.md)    | OAuth vs API Key 정책       |
| [설정 문서](docs/reference/configuration.md)        | 모든 설정 옵션              |

---

## ⌚ 자주 필요한 작업

### Slack Bot 추가하기

```
1. https://api.slack.com/apps 접속
2. "Create New App" → "From scratch"
3. 권한 설정 (OAuth Scopes)
4. Install to workspace
5. Token 复制 (Bot Token / App Token)
6. UI Settings > Channels > Slack 입력
7. Save
```

### LLM 프로바이더 연결

```
1. 프로바이더 계정 접속
2. API Key 생성
3. UI Settings > Models > [Provider] 입력
4. Save
5. 모델 가용성 자동 확인
```

### 웹 검색 도구 설정

```
1. 검색엔진 API 계정 생성
2. API Key 획득
3. UI Settings > Tools > Web Search 입력
4. Save
5. Agent에서 웹 검색 자동 활용
```

---

## 🎯 최소한의 설정 (Minimal Setup)

필수 credential:

- **LLM API Key** (Anthropic, OpenAI 등) 1개 이상
- **채널 Token** (Slack, Discord 등) 1개 이상
- **Gateway Token** (원격 접근 시)

선택적:

- 웹 검색 API Key
- 추가 채널
- 백업 LLM 프로바이더

---

## 🔄 Credential 로테이션

### 프로바이더에서 신규 토큰 발급

```
1. 프로바이더 웹사이트 접속
2. Old token 비활성화/삭제
3. New token 발급
```

### UI에서 업데이트

```
1. Settings > [해당 섹션]
2. 필드 선택
3. 새로운 값 입력
4. 👁️ 토글로 확인
5. Save
```

### 환경변수 참조 경우

```
1. 환경변수만 업데이트
2. 설정 파일 수정 불필요
3. 게이트웨이 재시작 (또는 config reload)
```

---

## 📱 모바일/앱 내 credential

**참고**: Web UI에서만 설정 가능

- 모바일 앱은 설정된 credential 자동 연동
- 각 기기에서 동기화됨
- Credential 자체는 저장되지 않음 (참조만)

---

최종 업데이트: 2026-04-16
