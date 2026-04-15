import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { formatRelativeTimestamp } from "../format.ts";
import type { SlackStatus } from "../types.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import {
  formatBoolean,
  formatNullableBoolean,
  formatProbeStatus,
  renderSingleAccountChannelCard,
  resolveChannelConfigured,
} from "./channels.shared.ts";
import type { ChannelsProps } from "./channels.types.ts";

export function renderSlackCard(params: {
  props: ChannelsProps;
  slack?: SlackStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, slack, accountCountLabel } = params;
  const configured = resolveChannelConfigured("slack", props);

  return renderSingleAccountChannelCard({
    title: "Slack",
    subtitle: t("channels.subtitles.slack"),
    accountCountLabel,
    statusRows: [
      { label: t("channels.labels.configured"), value: formatNullableBoolean(configured) },
      { label: t("channels.labels.running"), value: formatBoolean(Boolean(slack?.running)) },
      {
        label: t("channels.labels.lastStart"),
        value: slack?.lastStartAt ? formatRelativeTimestamp(slack.lastStartAt) : t("common.na"),
      },
      {
        label: t("channels.labels.lastProbe"),
        value: slack?.lastProbeAt ? formatRelativeTimestamp(slack.lastProbeAt) : t("common.na"),
      },
    ],
    lastError: slack?.lastError,
    secondaryCallout: slack?.probe
      ? html`<div class="callout" style="margin-top: 12px;">
          ${t("channels.probe.label")} ${formatProbeStatus(slack.probe.ok)} ·
          ${slack.probe.status ?? ""} ${slack.probe.error ?? ""}
        </div>`
      : nothing,
    configSection: renderChannelConfigSection({ channelId: "slack", props }),
    footer: html`<div class="row" style="margin-top: 12px;">
      <button class="btn" @click=${() => props.onRefresh(true)}>
        ${t("channels.actions.probe")}
      </button>
    </div>`,
  });
}
