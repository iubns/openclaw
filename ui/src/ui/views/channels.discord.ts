import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { formatRelativeTimestamp } from "../format.ts";
import type { DiscordStatus } from "../types.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import {
  formatBoolean,
  formatNullableBoolean,
  formatProbeStatus,
  renderSingleAccountChannelCard,
  resolveChannelConfigured,
} from "./channels.shared.ts";
import type { ChannelsProps } from "./channels.types.ts";

export function renderDiscordCard(params: {
  props: ChannelsProps;
  discord?: DiscordStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, discord, accountCountLabel } = params;
  const configured = resolveChannelConfigured("discord", props);

  return renderSingleAccountChannelCard({
    title: "Discord",
    subtitle: t("channels.subtitles.discord"),
    accountCountLabel,
    statusRows: [
      { label: t("channels.labels.configured"), value: formatNullableBoolean(configured) },
      { label: t("channels.labels.running"), value: formatBoolean(Boolean(discord?.running)) },
      {
        label: t("channels.labels.lastStart"),
        value: discord?.lastStartAt ? formatRelativeTimestamp(discord.lastStartAt) : t("common.na"),
      },
      {
        label: t("channels.labels.lastProbe"),
        value: discord?.lastProbeAt ? formatRelativeTimestamp(discord.lastProbeAt) : t("common.na"),
      },
    ],
    lastError: discord?.lastError,
    secondaryCallout: discord?.probe
      ? html`<div class="callout" style="margin-top: 12px;">
          ${t("channels.probe.label")} ${formatProbeStatus(discord.probe.ok)} ·
          ${discord.probe.status ?? ""} ${discord.probe.error ?? ""}
        </div>`
      : nothing,
    configSection: renderChannelConfigSection({ channelId: "discord", props }),
    footer: html`<div class="row" style="margin-top: 12px;">
      <button class="btn" @click=${() => props.onRefresh(true)}>
        ${t("channels.actions.probe")}
      </button>
    </div>`,
  });
}
