import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { formatRelativeTimestamp } from "../format.ts";
import type { ChannelAccountSnapshot, TelegramStatus } from "../types.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import {
  formatBoolean,
  formatNullableBoolean,
  formatProbeStatus,
  renderSingleAccountChannelCard,
  resolveChannelConfigured,
} from "./channels.shared.ts";
import type { ChannelsProps } from "./channels.types.ts";

export function renderTelegramCard(params: {
  props: ChannelsProps;
  telegram?: TelegramStatus;
  telegramAccounts: ChannelAccountSnapshot[];
  accountCountLabel: unknown;
}) {
  const { props, telegram, telegramAccounts, accountCountLabel } = params;
  const hasMultipleAccounts = telegramAccounts.length > 1;
  const configured = resolveChannelConfigured("telegram", props);

  const renderAccountCard = (account: ChannelAccountSnapshot) => {
    const probe = account.probe as { bot?: { username?: string } } | undefined;
    const botUsername = probe?.bot?.username;
    const label = account.name || account.accountId;
    return html`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">${botUsername ? `@${botUsername}` : label}</div>
          <div class="account-card-id">${account.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">${t("channels.labels.running")}</span>
            <span>${formatBoolean(Boolean(account.running))}</span>
          </div>
          <div>
            <span class="label">${t("channels.labels.configured")}</span>
            <span>${formatBoolean(Boolean(account.configured))}</span>
          </div>
          <div>
            <span class="label">${t("channels.labels.lastInbound")}</span>
            <span
              >${account.lastInboundAt
                ? formatRelativeTimestamp(account.lastInboundAt)
                : t("common.na")}</span
            >
          </div>
          ${account.lastError
            ? html` <div class="account-card-error">${account.lastError}</div> `
            : nothing}
        </div>
      </div>
    `;
  };

  if (hasMultipleAccounts) {
    return html`
      <div class="card">
        <div class="card-title">Telegram</div>
        <div class="card-sub">${t("channels.subtitles.telegram")}</div>
        ${accountCountLabel}

        <div class="account-card-list">
          ${telegramAccounts.map((account) => renderAccountCard(account))}
        </div>

        ${telegram?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">${telegram.lastError}</div>`
          : nothing}
        ${telegram?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
              ${t("channels.probe.label")} ${formatProbeStatus(telegram.probe.ok)} ·
              ${telegram.probe.status ?? ""} ${telegram.probe.error ?? ""}
            </div>`
          : nothing}
        ${renderChannelConfigSection({ channelId: "telegram", props })}

        <div class="row" style="margin-top: 12px;">
          <button class="btn" @click=${() => props.onRefresh(true)}>
            ${t("channels.actions.probe")}
          </button>
        </div>
      </div>
    `;
  }

  return renderSingleAccountChannelCard({
    title: "Telegram",
    subtitle: t("channels.subtitles.telegram"),
    accountCountLabel,
    statusRows: [
      { label: t("channels.labels.configured"), value: formatNullableBoolean(configured) },
      { label: t("channels.labels.running"), value: formatBoolean(Boolean(telegram?.running)) },
      { label: t("channels.labels.mode"), value: telegram?.mode ?? t("common.na") },
      {
        label: t("channels.labels.lastStart"),
        value: telegram?.lastStartAt
          ? formatRelativeTimestamp(telegram.lastStartAt)
          : t("common.na"),
      },
      {
        label: t("channels.labels.lastProbe"),
        value: telegram?.lastProbeAt
          ? formatRelativeTimestamp(telegram.lastProbeAt)
          : t("common.na"),
      },
    ],
    lastError: telegram?.lastError,
    secondaryCallout: telegram?.probe
      ? html`<div class="callout" style="margin-top: 12px;">
          ${t("channels.probe.label")} ${formatProbeStatus(telegram.probe.ok)} ·
          ${telegram.probe.status ?? ""} ${telegram.probe.error ?? ""}
        </div>`
      : nothing,
    configSection: renderChannelConfigSection({ channelId: "telegram", props }),
    footer: html`<div class="row" style="margin-top: 12px;">
      <button class="btn" @click=${() => props.onRefresh(true)}>
        ${t("channels.actions.probe")}
      </button>
    </div>`,
  });
}
