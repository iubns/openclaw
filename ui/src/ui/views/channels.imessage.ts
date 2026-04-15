import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { formatRelativeTimestamp } from "../format.ts";
import type { IMessageStatus } from "../types.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import {
  formatBoolean,
  formatNullableBoolean,
  formatProbeStatus,
  renderSingleAccountChannelCard,
  resolveChannelConfigured,
} from "./channels.shared.ts";
import type { ChannelsProps } from "./channels.types.ts";

export function renderIMessageCard(params: {
  props: ChannelsProps;
  imessage?: IMessageStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, imessage, accountCountLabel } = params;
  const configured = resolveChannelConfigured("imessage", props);

  return renderSingleAccountChannelCard({
    title: "iMessage",
    subtitle: t("channels.subtitles.imessage"),
    accountCountLabel,
    statusRows: [
      { label: t("channels.labels.configured"), value: formatNullableBoolean(configured) },
      { label: t("channels.labels.running"), value: formatBoolean(Boolean(imessage?.running)) },
      {
        label: t("channels.labels.lastStart"),
        value: imessage?.lastStartAt
          ? formatRelativeTimestamp(imessage.lastStartAt)
          : t("common.na"),
      },
      {
        label: t("channels.labels.lastProbe"),
        value: imessage?.lastProbeAt
          ? formatRelativeTimestamp(imessage.lastProbeAt)
          : t("common.na"),
      },
    ],
    lastError: imessage?.lastError,
    secondaryCallout: imessage?.probe
      ? html`<div class="callout" style="margin-top: 12px;">
          ${t("channels.probe.label")} ${formatProbeStatus(imessage.probe.ok)} ·
          ${imessage.probe.error ?? ""}
        </div>`
      : nothing,
    configSection: renderChannelConfigSection({ channelId: "imessage", props }),
    footer: html`<div class="row" style="margin-top: 12px;">
      <button class="btn" @click=${() => props.onRefresh(true)}>
        ${t("channels.actions.probe")}
      </button>
    </div>`,
  });
}
