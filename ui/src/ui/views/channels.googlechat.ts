import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { formatRelativeTimestamp } from "../format.ts";
import type { GoogleChatStatus } from "../types.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import {
  formatProbeStatus,
  formatNullableBoolean,
  renderSingleAccountChannelCard,
  resolveChannelConfigured,
} from "./channels.shared.ts";
import type { ChannelsProps } from "./channels.types.ts";

export function renderGoogleChatCard(params: {
  props: ChannelsProps;
  googleChat?: GoogleChatStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, googleChat, accountCountLabel } = params;
  const configured = resolveChannelConfigured("googlechat", props);

  return renderSingleAccountChannelCard({
    title: "Google Chat",
    subtitle: t("channels.subtitles.googlechat"),
    accountCountLabel,
    statusRows: [
      { label: t("channels.labels.configured"), value: formatNullableBoolean(configured) },
      {
        label: t("channels.labels.running"),
        value: googleChat
          ? googleChat.running
            ? t("channels.common.yes")
            : t("channels.common.no")
          : t("common.na"),
      },
      {
        label: t("channels.labels.credential"),
        value: googleChat?.credentialSource ?? t("common.na"),
      },
      {
        label: t("channels.labels.audience"),
        value: googleChat?.audienceType
          ? `${googleChat.audienceType}${googleChat.audience ? ` · ${googleChat.audience}` : ""}`
          : t("common.na"),
      },
      {
        label: t("channels.labels.lastStart"),
        value: googleChat?.lastStartAt
          ? formatRelativeTimestamp(googleChat.lastStartAt)
          : t("common.na"),
      },
      {
        label: t("channels.labels.lastProbe"),
        value: googleChat?.lastProbeAt
          ? formatRelativeTimestamp(googleChat.lastProbeAt)
          : t("common.na"),
      },
    ],
    lastError: googleChat?.lastError,
    secondaryCallout: googleChat?.probe
      ? html`<div class="callout" style="margin-top: 12px;">
          ${t("channels.probe.label")} ${formatProbeStatus(googleChat.probe.ok)} ·
          ${googleChat.probe.status ?? ""} ${googleChat.probe.error ?? ""}
        </div>`
      : nothing,
    configSection: renderChannelConfigSection({ channelId: "googlechat", props }),
    footer: html`<div class="row" style="margin-top: 12px;">
      <button class="btn" @click=${() => props.onRefresh(true)}>
        ${t("channels.actions.probe")}
      </button>
    </div>`,
  });
}
