import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { formatRelativeTimestamp, formatDurationHuman } from "../format.ts";
import type { WhatsAppStatus } from "../types.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import {
  formatBoolean,
  formatNullableBoolean,
  renderSingleAccountChannelCard,
  resolveChannelConfigured,
} from "./channels.shared.ts";
import type { ChannelsProps } from "./channels.types.ts";

export function renderWhatsAppCard(params: {
  props: ChannelsProps;
  whatsapp?: WhatsAppStatus;
  accountCountLabel: unknown;
}) {
  const { props, whatsapp, accountCountLabel } = params;
  const configured = resolveChannelConfigured("whatsapp", props);

  return renderSingleAccountChannelCard({
    title: "WhatsApp",
    subtitle: t("channels.subtitles.whatsapp"),
    accountCountLabel,
    statusRows: [
      { label: t("channels.labels.configured"), value: formatNullableBoolean(configured) },
      { label: t("channels.labels.linked"), value: formatBoolean(Boolean(whatsapp?.linked)) },
      { label: t("channels.labels.running"), value: formatBoolean(Boolean(whatsapp?.running)) },
      { label: t("channels.labels.connected"), value: formatBoolean(Boolean(whatsapp?.connected)) },
      {
        label: t("channels.labels.lastConnect"),
        value: whatsapp?.lastConnectedAt
          ? formatRelativeTimestamp(whatsapp.lastConnectedAt)
          : t("common.na"),
      },
      {
        label: t("channels.labels.lastMessage"),
        value: whatsapp?.lastMessageAt
          ? formatRelativeTimestamp(whatsapp.lastMessageAt)
          : t("common.na"),
      },
      {
        label: t("channels.labels.authAge"),
        value:
          whatsapp?.authAgeMs != null ? formatDurationHuman(whatsapp.authAgeMs) : t("common.na"),
      },
    ],
    lastError: whatsapp?.lastError,
    extraContent: html`
      ${props.whatsappMessage
        ? html`<div class="callout" style="margin-top: 12px;">${props.whatsappMessage}</div>`
        : nothing}
      ${props.whatsappQrDataUrl
        ? html`<div class="qr-wrap">
            <img src=${props.whatsappQrDataUrl} alt=${t("channels.whatsapp.qrAlt")} />
          </div>`
        : nothing}
    `,
    configSection: renderChannelConfigSection({ channelId: "whatsapp", props }),
    footer: html`<div class="row" style="margin-top: 14px; flex-wrap: wrap;">
      <button
        class="btn primary"
        ?disabled=${props.whatsappBusy}
        @click=${() => props.onWhatsAppStart(false)}
      >
        ${props.whatsappBusy ? t("channels.actions.working") : t("channels.actions.showQr")}
      </button>
      <button
        class="btn"
        ?disabled=${props.whatsappBusy}
        @click=${() => props.onWhatsAppStart(true)}
      >
        ${t("channels.actions.relink")}
      </button>
      <button class="btn" ?disabled=${props.whatsappBusy} @click=${() => props.onWhatsAppWait()}>
        ${t("channels.actions.waitForScan")}
      </button>
      <button
        class="btn danger"
        ?disabled=${props.whatsappBusy}
        @click=${() => props.onWhatsAppLogout()}
      >
        ${t("channels.actions.logout")}
      </button>
      <button class="btn" @click=${() => props.onRefresh(true)}>
        ${t("channels.actions.refresh")}
      </button>
    </div>`,
  });
}
