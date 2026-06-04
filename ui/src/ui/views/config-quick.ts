/**
 * Quick Settings view — opinionated card layout for the most common settings.
 * Replaces the raw schema-driven form as the default settings experience.
 *
 * Each card answers a "what do I want to do?" question with status + actions.
 */

import { html, nothing, type TemplateResult } from "lit";
import { icons } from "../icons.ts";
import type { BorderRadiusStop } from "../storage.ts";
import { normalizeOptionalString } from "../string-coerce.ts";
import type { ThemeTransitionContext } from "../theme-transition.ts";
import type { ThemeMode, ThemeName } from "../theme.ts";
import {
  normalizeLocalUserIdentity,
  resolveLocalUserAvatarText,
  resolveLocalUserAvatarUrl,
} from "../user-identity.ts";
import {
  assistantAvatarFallbackUrl,
  resolveChatAvatarRenderUrl,
  resolveAssistantTextAvatar,
} from "./agents-utils.ts";
import {
  CONFIG_PRESETS,
  detectActivePreset,
  getPresetById,
  type ConfigPresetId,
} from "./config-presets.ts";

// ── Types ──

export type QuickSettingsChannel = {
  id: string;
  label: string;
  connected: boolean;
  detail?: string;
};

export type QuickSettingsAutomation = {
  cronJobCount: number;
  skillCount: number;
  mcpServerCount: number;
};

export type QuickSettingsSecurity = {
  gatewayAuth: string;
  execPolicy: string;
  deviceAuth: boolean;
};

export type QuickSettingsProps = {
  // Model & Thinking
  currentModel: string;
  thinkingLevel: string;
  fastMode: boolean;
  onModelChange?: () => void;
  onThinkingChange?: (level: string) => void;
  onFastModeToggle?: () => void;

  // Channels
  channels: QuickSettingsChannel[];
  onChannelConfigure?: (channelId: string) => void;

  // Automations
  automation: QuickSettingsAutomation;
  onManageCron?: () => void;
  onBrowseSkills?: () => void;
  onConfigureMcp?: () => void;

  // Security
  security: QuickSettingsSecurity;
  onSecurityConfigure?: () => void;

  // Appearance
  theme: ThemeName;
  themeMode: ThemeMode;
  hasCustomTheme: boolean;
  customThemeLabel?: string | null;
  borderRadius: number;
  setTheme: (theme: ThemeName, context?: ThemeTransitionContext) => void;
  onOpenCustomThemeImport?: () => void;
  setThemeMode: (mode: ThemeMode, context?: ThemeTransitionContext) => void;
  setBorderRadius: (value: number) => void;
  userAvatar?: string | null;
  onUserAvatarChange?: (next: string | null) => void;

  // Presets
  configObject?: Record<string, unknown>;
  savedConfigObject?: Record<string, unknown>;
  configDirty?: boolean;
  configSaving?: boolean;
  configApplying?: boolean;
  configReady?: boolean;
  onSelectPreset?: (presetId: ConfigPresetId) => void;
  onResetConfig?: () => void;
  onSaveConfig?: () => void;
  onApplyConfig?: () => void;

  // Navigation
  onAdvancedSettings?: () => void;

  // Connection
  connected: boolean;
  gatewayUrl: string;
  assistantName: string;
  assistantAvatar?: string | null;
  assistantAvatarUrl?: string | null;
  assistantAvatarSource?: string | null;
  assistantAvatarStatus?: "none" | "local" | "remote" | "data" | null;
  assistantAvatarReason?: string | null;
  assistantAvatarOverride?: string | null;
  assistantAvatarUploadBusy?: boolean;
  assistantAvatarUploadError?: string | null;
  onAssistantAvatarOverrideChange?: (dataUrl: string) => void | Promise<void>;
  onAssistantAvatarClearOverride?: () => void | Promise<void>;
  basePath?: string | null;
  version: string;
};

// ── Theme options ──

type ThemeOption = { id: ThemeName; label: string };
const BUILTIN_THEME_OPTIONS: ThemeOption[] = [
  { id: "claw", label: "클로" },
  { id: "knot", label: "매듭" },
  { id: "dash", label: "대시" },
];

const BORDER_RADIUS_STOPS: Array<{ value: BorderRadiusStop; label: string }> = [
  { value: 0, label: "없음" },
  { value: 25, label: "약간" },
  { value: 50, label: "기본" },
  { value: 75, label: "둥글게" },
  { value: 100, label: "완전" },
];

const THINKING_LEVELS = ["off", "low", "medium", "high"];
const LOCAL_USER_LABEL = "나";
// Keep raw uploads comfortably below the 2 MB persisted data URL limit after
// base64 expansion and a small MIME/header prefix are added.
const MAX_LOCAL_USER_AVATAR_FILE_BYTES = 1_500_000;
const MAX_ASSISTANT_AVATAR_UPLOAD_BYTES = MAX_LOCAL_USER_AVATAR_FILE_BYTES;

function renderDefaultUserAvatar() {
  return html`
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  `;
}

function formatThinkingLevelLabel(level: string): string {
  switch (level) {
    case "off":
      return "끔";
    case "low":
      return "낮음";
    case "medium":
      return "보통";
    case "high":
      return "높음";
    default:
      return level;
  }
}

function formatThemeModeLabel(mode: ThemeMode): string {
  switch (mode) {
    case "light":
      return "라이트";
    case "dark":
      return "다크";
    case "system":
      return "시스템";
  }
}

function renderLocalUserAvatarPreview(avatar: string | null | undefined) {
  const identity = normalizeLocalUserIdentity({ name: null, avatar });
  const avatarUrl = resolveLocalUserAvatarUrl(identity);
  const avatarText = resolveLocalUserAvatarText(identity);
  if (avatarUrl) {
    return html`<img
      class="qs-user-avatar"
      src=${avatarUrl}
      alt=${LOCAL_USER_LABEL}
    />`;
  }
  if (avatarText) {
    return html`<div
      class="qs-user-avatar qs-user-avatar--text"
      aria-label=${LOCAL_USER_LABEL}
    >
      ${avatarText}
    </div>`;
  }
  return html`
    <div
      class="qs-user-avatar qs-user-avatar--default"
      aria-label=${LOCAL_USER_LABEL}
    >
      ${renderDefaultUserAvatar()}
    </div>
  `;
}

function resolveAssistantPreviewAvatarUrl(
  props: QuickSettingsProps,
): string | null {
  const override = normalizeOptionalString(props.assistantAvatarOverride);
  if (override) {
    return resolveChatAvatarRenderUrl(override, {
      identity: {
        avatar: override,
        avatarUrl: override,
      },
    });
  }
  if (
    props.assistantAvatarStatus === "none" &&
    props.assistantAvatarReason === "missing"
  ) {
    return null;
  }
  return resolveChatAvatarRenderUrl(props.assistantAvatarUrl, {
    identity: {
      avatar: props.assistantAvatar ?? undefined,
      avatarUrl: props.assistantAvatarUrl ?? undefined,
    },
  });
}

function formatAssistantAvatarSource(
  value: string | null | undefined,
): string | null {
  const source = normalizeOptionalString(value);
  if (!source) {
    return null;
  }
  if (/^data:image\//i.test(source)) {
    const header = source.slice(
      0,
      source.indexOf(",") > 0 ? source.indexOf(",") : 32,
    );
    return `${header},...`;
  }
  return source.length > 72
    ? `${source.slice(0, 34)}...${source.slice(-24)}`
    : source;
}

function formatAssistantAvatarIssue(
  status: QuickSettingsProps["assistantAvatarStatus"],
  reason: string | null | undefined,
  _rendered: boolean,
  hasOverride = false,
): string | null {
  if (hasOverride) {
    return null;
  }
  if (status === "remote") {
    return "원격 URL은 Control UI 이미지 정책으로 차단됩니다";
  }
  if (reason === "missing") {
    return "파일을 찾을 수 없음";
  }
  if (reason === "unsupported_extension") {
    return "지원되지 않는 이미지 형식";
  }
  if (reason === "outside_workspace") {
    return "작업 공간 밖";
  }
  if (reason === "too_large") {
    return "이미지가 너무 큼";
  }
  return reason ? "아바타를 렌더링할 수 없음" : null;
}

function renderAssistantAvatarPreview(props: QuickSettingsProps) {
  const assistantName =
    normalizeOptionalString(props.assistantName) ?? "어시스턴트";
  const assistantAvatarOverride = normalizeOptionalString(
    props.assistantAvatarOverride,
  );
  const assistantAvatarUrl = resolveAssistantPreviewAvatarUrl(props);
  if (assistantAvatarUrl) {
    return html`<img
      class="qs-assistant-avatar"
      src=${assistantAvatarUrl}
      alt=${assistantName}
    />`;
  }
  const assistantAvatarText = resolveAssistantTextAvatar(
    assistantAvatarOverride ?? props.assistantAvatar,
  );
  if (assistantAvatarText) {
    return html`<div
      class="qs-assistant-avatar qs-assistant-avatar--text"
      aria-label=${assistantName}
    >
      ${assistantAvatarText}
    </div>`;
  }
  return html`
    <img
      class="qs-assistant-avatar qs-assistant-avatar--fallback"
      src=${assistantAvatarFallbackUrl(props.basePath ?? "")}
      alt=${assistantName}
    />
  `;
}

function handleLocalUserAvatarFileSelect(e: Event, props: QuickSettingsProps) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  const onUserAvatarChange = props.onUserAvatarChange;
  if (!file || !onUserAvatarChange) {
    input.value = "";
    return;
  }
  if (!file.type.startsWith("image/")) {
    input.value = "";
    return;
  }
  if (file.size > MAX_LOCAL_USER_AVATAR_FILE_BYTES) {
    input.value = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    onUserAvatarChange(
      typeof reader.result === "string" ? reader.result : null,
    );
  });
  reader.readAsDataURL(file);
  input.value = "";
}

function handleAssistantAvatarFileSelect(e: Event, props: QuickSettingsProps) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  const onAssistantAvatarOverrideChange = props.onAssistantAvatarOverrideChange;
  if (!file || !onAssistantAvatarOverrideChange) {
    input.value = "";
    return;
  }
  if (file.size > MAX_ASSISTANT_AVATAR_UPLOAD_BYTES) {
    input.value = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const result = typeof reader.result === "string" ? reader.result : "";
    if (result) {
      void onAssistantAvatarOverrideChange(result);
    }
  });
  reader.readAsDataURL(file);
  input.value = "";
}

type ProfileSettings = {
  bootstrapMaxChars: number;
  bootstrapTotalMaxChars: number;
  contextInjection: "always" | "continuation-skip";
};

const DEFAULT_PROFILE_SETTINGS: ProfileSettings = {
  bootstrapMaxChars: 12_000,
  bootstrapTotalMaxChars: 60_000,
  contextInjection: "always",
};

function resolveProfileSettings(
  config?: Record<string, unknown>,
): ProfileSettings {
  const agents = config?.agents as Record<string, unknown> | undefined;
  const defaults = agents?.defaults as Record<string, unknown> | undefined;
  const bootstrapMaxChars =
    typeof defaults?.bootstrapMaxChars === "number" &&
    Number.isFinite(defaults.bootstrapMaxChars)
      ? Math.floor(defaults.bootstrapMaxChars)
      : DEFAULT_PROFILE_SETTINGS.bootstrapMaxChars;
  const bootstrapTotalMaxChars =
    typeof defaults?.bootstrapTotalMaxChars === "number" &&
    Number.isFinite(defaults.bootstrapTotalMaxChars)
      ? Math.floor(defaults.bootstrapTotalMaxChars)
      : DEFAULT_PROFILE_SETTINGS.bootstrapTotalMaxChars;
  const contextInjection =
    defaults?.contextInjection === "continuation-skip"
      ? "continuation-skip"
      : "always";
  return { bootstrapMaxChars, bootstrapTotalMaxChars, contextInjection };
}

function profileSettingsEqual(a: ProfileSettings, b: ProfileSettings): boolean {
  return (
    a.bootstrapMaxChars === b.bootstrapMaxChars &&
    a.bootstrapTotalMaxChars === b.bootstrapTotalMaxChars &&
    a.contextInjection === b.contextInjection
  );
}

function formatCharBudget(value: number): string {
  return `${value.toLocaleString()} chars`;
}

function formatContextInjectionLabel(
  mode: ProfileSettings["contextInjection"],
): string {
  return mode === "always" ? "매 턴" : "안전한 후속 턴 건너뛰기";
}

function describeContextInjection(
  mode: ProfileSettings["contextInjection"],
): string {
  return mode === "always"
    ? "워크스페이스 부트스트랩 컨텍스트를 매 턴 다시 주입합니다."
    : "안전한 후속 턴이 끝난 뒤에는 부트스트랩 재주입을 건너뜁니다.";
}

function renderProfileStat(params: {
  label: string;
  value: string;
  previousValue: string;
  note: string;
}) {
  const changed = params.value !== params.previousValue;
  return html`
    <div class="qs-profile-stat ${changed ? "qs-profile-stat--changed" : ""}">
      <div class="qs-profile-stat__header">
        <span class="qs-profile-stat__label">${params.label}</span>
        <span class="qs-profile-stat__value">${params.value}</span>
      </div>
      <div class="qs-profile-stat__sub">
        ${changed ? `이전: ${params.previousValue}` : "현재 기본값과 일치"}
      </div>
      <div class="qs-profile-stat__note muted">${params.note}</div>
    </div>
  `;
}

// ── Card renderers ──

function renderCardHeader(
  icon: TemplateResult,
  title: string,
  action?: TemplateResult,
) {
  return html`
    <div class="qs-card__header">
      <div class="qs-card__header-left">
        <span class="qs-card__icon">${icon}</span>
        <h3 class="qs-card__title">${title}</h3>
      </div>
      ${action ? action : nothing}
    </div>
  `;
}

function renderModelCard(props: QuickSettingsProps) {
  return html`
    <div class="qs-card qs-card--model">
      ${renderCardHeader(icons.brain, "모델 및 사고 수준")}
      <div class="qs-card__body">
        <div class="qs-row">
          <span class="qs-row__label">모델</span>
          <button
            class="qs-row__value qs-row__value--action"
            @click=${props.onModelChange}
          >
            <code>${props.currentModel || "기본값"}</code>
            <span class="qs-row__chevron">${icons.chevronRight}</span>
          </button>
        </div>
        <div class="qs-row">
          <span class="qs-row__label">사고 수준</span>
          <div class="qs-segmented">
            ${THINKING_LEVELS.map(
              (level) => html`
                <button
                  class="qs-segmented__btn ${level === props.thinkingLevel
                    ? "qs-segmented__btn--active"
                    : ""}"
                  @click=${() => props.onThinkingChange?.(level)}
                >
                  ${formatThinkingLevelLabel(level)}
                </button>
              `,
            )}
          </div>
        </div>
        <div class="qs-row">
          <span class="qs-row__label">빠른 모드</span>
          <label class="qs-toggle">
            <input
              type="checkbox"
              .checked=${props.fastMode}
              @change=${props.onFastModeToggle}
            />
            <span class="qs-toggle__track"></span>
            <span class="qs-toggle__hint muted"
              >${props.fastMode
                ? "켜짐 - 더 저렴하지만 기능은 적음"
                : "꺼짐"}</span
            >
          </label>
        </div>
      </div>
    </div>
  `;
}

function renderChannelsCard(props: QuickSettingsProps) {
  const connectedCount = props.channels.filter((c) => c.connected).length;
  const badge =
    connectedCount > 0
      ? html`<span class="qs-badge qs-badge--ok"
          >${connectedCount}개 연결됨</span
        >`
      : undefined;

  return html`
    <div class="qs-card qs-card--channels">
      ${renderCardHeader(icons.send, "채널", badge)}
      <div class="qs-card__body">
        ${props.channels.length === 0
          ? html`<div class="qs-empty muted">구성된 채널이 없습니다</div>`
          : props.channels.map(
              (ch) => html`
                <div class="qs-row">
                  <span class="qs-row__label">
                    <span
                      class="qs-status-dot ${ch.connected
                        ? "qs-status-dot--ok"
                        : ""}"
                    ></span>
                    ${ch.label}
                  </span>
                  <span class="qs-row__value">
                    ${ch.connected
                      ? html`<span class="muted"
                          >${ch.detail ?? "연결됨"}</span
                        >`
                      : html`<button
                          class="qs-link-btn"
                          @click=${() => props.onChannelConfigure?.(ch.id)}
                        >
                          연결 →
                        </button>`}
                  </span>
                </div>
              `,
            )}
      </div>
    </div>
  `;
}

function renderAutomationsCard(props: QuickSettingsProps) {
  const { cronJobCount, skillCount, mcpServerCount } = props.automation;

  return html`
    <div class="qs-card qs-card--automations">
      ${renderCardHeader(icons.zap, "자동화")}
      <div class="qs-card__body">
        <div class="qs-row">
          <span class="qs-row__label">예약 작업 ${cronJobCount}개</span>
          <button class="qs-link-btn" @click=${props.onManageCron}>
            관리 →
          </button>
        </div>
        <div class="qs-row">
          <span class="qs-row__label">설치된 스킬 ${skillCount}개</span>
          <button class="qs-link-btn" @click=${props.onBrowseSkills}>
            찾아보기 →
          </button>
        </div>
        <div class="qs-row">
          <span class="qs-row__label">MCP 서버 ${mcpServerCount}개</span>
          <button class="qs-link-btn" @click=${props.onConfigureMcp}>
            설정 →
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderSecurityCard(props: QuickSettingsProps) {
  const { gatewayAuth, execPolicy, deviceAuth } = props.security;

  return html`
    <div class="qs-card qs-card--security">
      ${renderCardHeader(
        icons.eye,
        "보안",
        html`<button class="qs-link-btn" @click=${props.onSecurityConfigure}>
          설정 →
        </button>`,
      )}
      <div class="qs-card__body">
        <div class="qs-row">
          <span class="qs-row__label">게이트웨이 인증</span>
          <span class="qs-row__value">
            <span
              class="qs-badge ${gatewayAuth !== "none"
                ? "qs-badge--ok"
                : "qs-badge--warn"}"
              >${gatewayAuth}</span
            >
          </span>
        </div>
        <div class="qs-row">
          <span class="qs-row__label">실행 정책</span>
          <span class="qs-row__value"
            ><span class="qs-badge">${execPolicy}</span></span
          >
        </div>
        <div class="qs-row">
          <span class="qs-row__label">디바이스 인증</span>
          <span class="qs-row__value">
            <span
              class="qs-badge ${deviceAuth ? "qs-badge--ok" : "qs-badge--warn"}"
              >${deviceAuth ? "활성화" : "비활성화"}</span
            >
          </span>
        </div>
      </div>
    </div>
  `;
}

function renderAppearanceCard(props: QuickSettingsProps) {
  const importedThemeName = props.hasCustomTheme
    ? (props.customThemeLabel ?? "가져온 테마")
    : "가져오기";
  const themeOptions: ThemeOption[] = [
    ...BUILTIN_THEME_OPTIONS,
    { id: "custom", label: importedThemeName },
  ];
  return html`
    <div class="qs-card qs-card--appearance">
      ${renderCardHeader(icons.spark, "모양")}
      <div class="qs-card__body">
        <div class="qs-row">
          <span class="qs-row__label">테마</span>
          <div class="qs-segmented">
            ${themeOptions.map(
              (opt) => html`
                <button
                  class="qs-segmented__btn ${opt.id === props.theme
                    ? "qs-segmented__btn--active"
                    : ""}"
                  @click=${(e: Event) => {
                    if (opt.id === "custom" && !props.hasCustomTheme) {
                      props.onOpenCustomThemeImport?.();
                      return;
                    }
                    if (opt.id !== props.theme) {
                      props.setTheme(opt.id, {
                        element: (e.currentTarget as HTMLElement) ?? undefined,
                      });
                    }
                  }}
                >
                  ${opt.label}
                </button>
              `,
            )}
          </div>
        </div>
        <div class="qs-row">
          <span class="qs-row__label">모드</span>
          <div class="qs-segmented">
            ${(["light", "dark", "system"] as ThemeMode[]).map(
              (mode) => html`
                <button
                  class="qs-segmented__btn ${mode === props.themeMode
                    ? "qs-segmented__btn--active"
                    : ""}"
                  @click=${(e: Event) => {
                    if (mode !== props.themeMode) {
                      props.setThemeMode(mode, {
                        element: (e.currentTarget as HTMLElement) ?? undefined,
                      });
                    }
                  }}
                >
                  ${formatThemeModeLabel(mode)}
                </button>
              `,
            )}
          </div>
        </div>
        <div class="qs-row">
          <span class="qs-row__label">둥근 정도</span>
          <div class="qs-segmented">
            ${BORDER_RADIUS_STOPS.map(
              (stop) => html`
                <button
                  class="qs-segmented__btn qs-segmented__btn--compact ${stop.value ===
                  props.borderRadius
                    ? "qs-segmented__btn--active"
                    : ""}"
                  @click=${() => props.setBorderRadius(stop.value)}
                >
                  ${stop.label}
                </button>
              `,
            )}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPersonalCard(props: QuickSettingsProps) {
  const identity = normalizeLocalUserIdentity({
    name: null,
    avatar: props.userAvatar ?? null,
  });
  const avatarText = resolveLocalUserAvatarText(identity) ?? "";
  const assistantName =
    normalizeOptionalString(props.assistantName) ?? "어시스턴트";
  const assistantAvatarUrl = resolveAssistantPreviewAvatarUrl(props);
  const assistantAvatarRendered = Boolean(
    assistantAvatarUrl ||
    resolveAssistantTextAvatar(
      props.assistantAvatarOverride ?? props.assistantAvatar,
    ),
  );
  const assistantAvatarOverride = normalizeOptionalString(
    props.assistantAvatarOverride,
  );
  const assistantAvatarSource = formatAssistantAvatarSource(
    assistantAvatarOverride ?? props.assistantAvatarSource,
  );
  const assistantAvatarIssue = formatAssistantAvatarIssue(
    props.assistantAvatarStatus ?? null,
    props.assistantAvatarReason,
    assistantAvatarRendered,
    Boolean(assistantAvatarOverride),
  );
  const assistantAvatarSourceLabel = assistantAvatarOverride
    ? "UI 재정의"
    : "IDENTITY.md";
  const canOverrideAssistantAvatar = Boolean(
    props.onAssistantAvatarOverrideChange,
  );
  const assistantAvatarSubtitle = assistantAvatarOverride
    ? "설정에서 재정의됨"
    : assistantAvatarIssue
      ? "대체 아바타"
      : assistantAvatarRendered
        ? "IDENTITY.md에서 가져옴"
        : "대체 로고";
  return html`
    <div class="qs-card qs-card--personal">
      ${renderCardHeader(icons.image, "개인 정보")}
      <div class="qs-card__body">
        <div class="qs-identity-grid">
          <section class="qs-identity-card" aria-label="로컬 채팅 식별 정보">
            ${renderLocalUserAvatarPreview(props.userAvatar)}
            <div class="qs-identity-card__copy">
              <div class="qs-identity-card__eyebrow">사용자</div>
              <div class="qs-identity-card__title">${LOCAL_USER_LABEL}</div>
              <div class="qs-identity-card__sub">
                아바타는 브라우저 로컬에 저장됩니다
              </div>
              <div class="qs-identity-card__repair">
                <label class="qs-field">
                  <span class="qs-row__label">아바타 텍스트 / 이모지</span>
                  <input
                    class="qs-field__input"
                    type="text"
                    maxlength="16"
                    .value=${avatarText}
                    placeholder="홍길동 또는 🦞"
                    @input=${(e: Event) => {
                      const value = (e.target as HTMLInputElement).value;
                      props.onUserAvatarChange?.(value.trim() ? value : null);
                    }}
                  />
                </label>
                <div class="qs-identity-card__actions">
                  <label class="btn btn--sm">
                    이미지 선택
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      @change=${(e: Event) =>
                        handleLocalUserAvatarFileSelect(e, props)}
                    />
                  </label>
                  <button
                    type="button"
                    class="btn btn--sm btn--ghost"
                    ?disabled=${!identity.avatar}
                    @click=${() => {
                      props.onUserAvatarChange?.(null);
                    }}
                  >
                    아바타 지우기
                  </button>
                </div>
                <div class="muted">이 브라우저에만 저장됩니다.</div>
              </div>
            </div>
          </section>
          <section
            class="qs-identity-card qs-identity-card--assistant"
            aria-label="어시스턴트 식별 정보"
          >
            ${renderAssistantAvatarPreview(props)}
            <div class="qs-identity-card__copy">
              <div class="qs-identity-card__eyebrow">어시스턴트</div>
              <div class="qs-identity-card__title">${assistantName}</div>
              <div class="qs-identity-card__sub">
                ${assistantAvatarSubtitle}
              </div>
              ${assistantAvatarSource
                ? html`
                    <div
                      class="qs-identity-card__source"
                      title=${props.assistantAvatarSource ?? ""}
                    >
                      <span>${assistantAvatarSourceLabel}</span>
                      <code>${assistantAvatarSource}</code>
                    </div>
                  `
                : nothing}
              ${assistantAvatarIssue
                ? html`<div class="qs-identity-card__issue">
                    ${assistantAvatarIssue}
                  </div>`
                : nothing}
              ${canOverrideAssistantAvatar
                ? html`
                    <div class="qs-identity-card__repair">
                      <div class="qs-identity-card__actions">
                        <label class="btn btn--sm">
                          ${props.assistantAvatarUploadBusy
                            ? "저장 중..."
                            : assistantAvatarOverride
                              ? "이미지 바꾸기"
                              : "이미지 선택"}
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            ?disabled=${props.assistantAvatarUploadBusy ===
                            true}
                            @change=${(e: Event) =>
                              handleAssistantAvatarFileSelect(e, props)}
                          />
                        </label>
                        ${assistantAvatarOverride
                          ? html`
                              <button
                                type="button"
                                class="btn btn--sm btn--ghost"
                                ?disabled=${props.assistantAvatarUploadBusy ===
                                true}
                                @click=${() => {
                                  void props.onAssistantAvatarClearOverride?.();
                                }}
                              >
                                재정의 해제
                              </button>
                            `
                          : nothing}
                      </div>
                      <div class="muted">
                        Control UI 재정의를 저장합니다. 해제하면 IDENTITY.md로
                        돌아갑니다.
                      </div>
                    </div>
                  `
                : nothing}
              ${props.assistantAvatarUploadError
                ? html`<div class="qs-identity-card__error">
                    ${props.assistantAvatarUploadError}
                  </div>`
                : nothing}
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}

function renderPresetsCard(props: QuickSettingsProps) {
  const draftConfig = props.configObject ?? props.savedConfigObject ?? {};
  const savedConfig = props.savedConfigObject ?? {};
  const selectedPresetId = detectActivePreset(draftConfig);
  const savedPresetId = detectActivePreset(savedConfig);
  const selectedPreset = selectedPresetId
    ? getPresetById(selectedPresetId)
    : undefined;
  const savedPreset = savedPresetId ? getPresetById(savedPresetId) : undefined;
  const draftSettings = resolveProfileSettings(draftConfig);
  const savedSettings = resolveProfileSettings(savedConfig);
  const hasPendingProfileChange = !profileSettingsEqual(
    draftSettings,
    savedSettings,
  );
  const hasPendingConfigChange = props.configDirty === true;
  const canCommit =
    props.connected &&
    props.configReady === true &&
    props.configSaving !== true &&
    props.configApplying !== true;
  const stateBanner = hasPendingProfileChange
    ? html`
        <div
          class="qs-profile-state qs-profile-state--pending"
          aria-live="polite"
        >
          <span class="qs-status-dot"></span>
          <div class="qs-profile-state__text">
            <span class="qs-profile-state__title"
              >${selectedPreset?.label ?? "사용자 지정"}이 선택되었지만 아직
              저장되지 않았습니다.</span
            >
            <span class="qs-profile-state__copy"
              >프로필 저장은 이것을 기본값으로 기록합니다. 지금 적용은 저장 후
              현재 세션을 다시 불러옵니다.</span
            >
          </div>
        </div>
      `
    : savedPreset
      ? html`
          <div class="qs-profile-state qs-profile-state--ok" aria-live="polite">
            <span class="qs-status-dot qs-status-dot--ok"></span>
            <div class="qs-profile-state__text">
              <span class="qs-profile-state__title"
                >${savedPreset.label}이 현재 기본값입니다.</span
              >
              <span class="qs-profile-state__copy"
                >프로필은 부트스트랩 크기와 후속 재주입 동작만 변경합니다.</span
              >
            </div>
          </div>
        `
      : html`
          <div class="qs-profile-state" aria-live="polite">
            <span class="qs-status-dot"></span>
            <div class="qs-profile-state__text">
              <span class="qs-profile-state__title"
                >사용자 지정 부트스트랩 설정이 활성화되어 있습니다.</span
              >
              <span class="qs-profile-state__copy"
                >기본 제공 프로필을 선택해 현재 사용자 지정 값을 바꿔
                보세요.</span
              >
            </div>
          </div>
        `;
  const panelTitle = selectedPreset?.label ?? "사용자 지정 구성";
  const panelDescription =
    selectedPreset?.detail ??
    "이 구성은 현재 기본 제공 프로필 중 하나와 일치하지 않습니다.";
  const panelImpact =
    selectedPreset?.impact ??
    "프로필을 선택해 부트스트랩 크기와 후속 동작을 집중적으로 변경해 보세요.";
  const commitCopy = hasPendingProfileChange
    ? "프로필 저장은 이것을 기본값으로 기록합니다. 지금 적용은 저장 후 현재 세션을 다시 불러옵니다."
    : "다른 대기 중인 구성 변경이 있습니다. 여기서 저장하면 보류 중인 모든 구성이 커밋됩니다.";

  return html`
    <div class="qs-card qs-card--span-all">
      ${renderCardHeader(
        icons.zap,
        "컨텍스트 프로필",
        hasPendingProfileChange
          ? html`<span class="qs-badge qs-badge--warn">대기 중</span>`
          : savedPreset
            ? html`<span class="qs-badge qs-badge--ok">저장됨</span>`
            : html`<span class="qs-badge">사용자 지정</span>`,
      )}
      <div class="qs-card__body qs-profiles">
        <div class="qs-profiles__copy">
          <div class="qs-profiles__eyebrow">부트스트랩 컨텍스트</div>
          <p class="qs-profiles__intro">
            OpenClaw가 각 실행에 주입하는 워크스페이스 컨텍스트의 양을
            선택하세요. 이 프로필은 모델, 도구, 채널 또는 테마를 바꾸지
            않습니다.
          </p>
          ${stateBanner}
          <div class="qs-presets-grid">
            ${CONFIG_PRESETS.map((preset) => {
              const presetDefaults = ((
                preset.patch.agents as Record<string, unknown> | undefined
              )?.defaults ?? {}) as Record<string, unknown>;
              const presetContext =
                presetDefaults.contextInjection === "continuation-skip"
                  ? "continuation-skip"
                  : "always";
              return html`
                <button
                  type="button"
                  class="qs-preset ${preset.id === selectedPresetId
                    ? "qs-preset--active"
                    : ""}"
                  aria-pressed=${preset.id === selectedPresetId}
                  @click=${() => props.onSelectPreset?.(preset.id)}
                >
                  <div class="qs-preset__head">
                    <div class="qs-preset__identity">
                      <span class="qs-preset__icon">${preset.icon}</span>
                      <div class="qs-preset__identity-copy">
                        <span class="qs-preset__label">${preset.label}</span>
                        <span class="qs-preset__desc muted"
                          >${preset.description}</span
                        >
                      </div>
                    </div>
                    <div class="qs-preset__badges">
                      ${preset.id === savedPresetId
                        ? html`<span class="qs-badge qs-badge--ok">현재</span>`
                        : nothing}
                      ${hasPendingProfileChange &&
                      preset.id === selectedPresetId
                        ? html`<span class="qs-badge qs-badge--warn"
                            >선택됨</span
                          >`
                        : nothing}
                    </div>
                  </div>
                  <div class="qs-preset__meta">
                    <span
                      >${formatCharBudget(
                        Number(presetDefaults.bootstrapMaxChars ?? 0),
                      )}
                      / 파일</span
                    >
                    <span
                      >${formatCharBudget(
                        Number(presetDefaults.bootstrapTotalMaxChars ?? 0),
                      )}
                      총합</span
                    >
                    <span>${formatContextInjectionLabel(presetContext)}</span>
                  </div>
                </button>
              `;
            })}
          </div>
        </div>

        <div class="qs-profile-panel">
          <div class="qs-profile-panel__eyebrow">
            ${selectedPreset ? "선택된 프로필" : "현재 값"}
          </div>
          <h4 class="qs-profile-panel__title">${panelTitle}</h4>
          <p class="qs-profile-panel__copy">${panelDescription}</p>
          <div class="qs-profile-panel__impact">${panelImpact}</div>

          <div class="qs-profile-panel__stats">
            ${renderProfileStat({
              label: "파일당 부트스트랩",
              value: formatCharBudget(draftSettings.bootstrapMaxChars),
              previousValue: formatCharBudget(savedSettings.bootstrapMaxChars),
              note: "하나의 부트스트랩 파일에서 주입할 수 있는 최대 컨텍스트입니다.",
            })}
            ${renderProfileStat({
              label: "부트스트랩 총합",
              value: formatCharBudget(draftSettings.bootstrapTotalMaxChars),
              previousValue: formatCharBudget(
                savedSettings.bootstrapTotalMaxChars,
              ),
              note: "모든 부트스트랩 파일 전체에서 허용되는 총 컨텍스트입니다.",
            })}
            ${renderProfileStat({
              label: "후속 턴",
              value: formatContextInjectionLabel(
                draftSettings.contextInjection,
              ),
              previousValue: formatContextInjectionLabel(
                savedSettings.contextInjection,
              ),
              note: describeContextInjection(draftSettings.contextInjection),
            })}
          </div>

          ${hasPendingConfigChange
            ? html`
                <div class="qs-profile-panel__actions">
                  <div class="qs-profile-panel__actions-copy muted">
                    ${commitCopy}
                  </div>
                  <div class="qs-profile-panel__actions-row">
                    <button
                      class="btn btn--sm"
                      ?disabled=${props.configSaving === true ||
                      props.configApplying === true}
                      @click=${props.onResetConfig}
                    >
                      변경 취소
                    </button>
                    <button
                      class="btn btn--sm primary"
                      ?disabled=${!canCommit}
                      @click=${props.onSaveConfig}
                    >
                      ${props.configSaving === true
                        ? "저장 중…"
                        : hasPendingProfileChange
                          ? "프로필 저장"
                          : "변경 사항 저장"}
                    </button>
                    <button
                      class="btn btn--sm"
                      ?disabled=${!canCommit}
                      @click=${props.onApplyConfig}
                    >
                      ${props.configApplying === true
                        ? "적용 중…"
                        : "지금 적용"}
                    </button>
                  </div>
                </div>
              `
            : html`
                <div class="qs-profile-panel__footer muted" aria-live="polite">
                  ${savedPreset
                    ? "저장되었고 준비되었습니다. 다른 프로필을 선택해 변경을 준비하세요."
                    : "현재 값은 사용자 지정입니다. 프로필을 선택해 변경을 준비하세요."}
                </div>
              `}
        </div>
      </div>
    </div>
  `;
}

function renderConnectionFooter(props: QuickSettingsProps) {
  return html`
    <div class="qs-footer">
      <div class="qs-footer__row">
        <span
          class="qs-status-dot ${props.connected ? "qs-status-dot--ok" : ""}"
        ></span>
        <span class="muted">${props.connected ? "연결됨" : "오프라인"}</span>
        ${props.assistantName
          ? html`<span class="muted">· ${props.assistantName}</span>`
          : nothing}
        ${props.version
          ? html`<span class="muted">· v${props.version}</span>`
          : nothing}
      </div>
    </div>
  `;
}

// ── Main render ──

export function renderQuickSettings(props: QuickSettingsProps) {
  return html`
    <div class="qs-container">
      <div class="qs-header">
        <h2 class="qs-header__title">${icons.settings} 설정</h2>
        <button class="btn btn--sm" @click=${props.onAdvancedSettings}>
          고급 설정 ${icons.chevronRight}
        </button>
      </div>

      <div class="qs-grid">
        ${renderModelCard(props)} ${renderChannelsCard(props)}
        ${renderSecurityCard(props)} ${renderPersonalCard(props)}
        <div class="qs-side-stack">
          ${renderAppearanceCard(props)} ${renderAutomationsCard(props)}
        </div>
        ${renderPresetsCard(props)}
      </div>

      ${renderConnectionFooter(props)}
    </div>
  `;
}
