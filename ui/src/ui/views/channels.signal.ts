import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { formatRelativeTimestamp } from "../format.ts";
import type { SignalStatus } from "../types.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import {
  formatBoolean,
  formatNullableBoolean,
  formatProbeStatus,
  renderSingleAccountChannelCard,
  resolveChannelConfigured,
} from "./channels.shared.ts";
import type { ChannelsProps } from "./channels.types.ts";

export function renderSignalCard(params: {
  props: ChannelsProps;
  signal?: SignalStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, signal, accountCountLabel } = params;
  const configured = resolveChannelConfigured("signal", props);

  return renderSingleAccountChannelCard({
    title: "Signal",
    subtitle: t("channels.subtitles.signal"),
    accountCountLabel,
    statusRows: [
      { label: t("channels.labels.configured"), value: formatNullableBoolean(configured) },
      { label: t("channels.labels.running"), value: formatBoolean(Boolean(signal?.running)) },
      { label: t("channels.labels.baseUrl"), value: signal?.baseUrl ?? t("common.na") },
      {
        label: t("channels.labels.lastStart"),
        value: signal?.lastStartAt ? formatRelativeTimestamp(signal.lastStartAt) : t("common.na"),
      },
      {
        label: t("channels.labels.lastProbe"),
        value: signal?.lastProbeAt ? formatRelativeTimestamp(signal.lastProbeAt) : t("common.na"),
      },
    ],
    lastError: signal?.lastError,
    secondaryCallout: signal?.probe
      ? html`<div class="callout" style="margin-top: 12px;">
          ${t("channels.probe.label")} ${formatProbeStatus(signal.probe.ok)} ·
          ${signal.probe.status ?? ""} ${signal.probe.error ?? ""}
        </div>`
      : nothing,
    configSection: renderChannelConfigSection({ channelId: "signal", props }),
    footer: html`<div class="row" style="margin-top: 12px;">
      <button class="btn" @click=${() => props.onRefresh(true)}>
        ${t("channels.actions.probe")}
      </button>
    </div>`,
  });
}
