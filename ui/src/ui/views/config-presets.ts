/**
 * 구성 프리셋 - 여러 설정을 한 번에 지정하는 의견이 반영된 번들입니다.
 * config.patch를 통해 적용됩니다.
 */

export type ConfigPresetId = "personal" | "codeAgent" | "teamBot" | "minimal";

export type ConfigPresetPatch = {
  agents: {
    defaults: {
      bootstrapMaxChars: number;
      bootstrapTotalMaxChars: number;
      contextInjection: "always" | "continuation-skip";
    };
  };
};

export type ConfigPreset = {
  id: ConfigPresetId;
  label: string;
  description: string;
  detail: string;
  impact: string;
  icon: string;
  patch: ConfigPresetPatch;
};

export const CONFIG_PRESETS: ConfigPreset[] = [
  {
    id: "personal",
    label: "개인용 어시스턴트",
    description: "일상 사용에 맞춘 균형 잡힌 기본값입니다.",
    detail:
      "대화, 문서, 가벼운 편집에 잘 맞으며 큰 코딩 예산이 필요하지 않습니다.",
    impact: "적당한 프롬프트 예산으로 매 턴 부트스트랩 컨텍스트를 주입합니다.",
    icon: "✨",
    patch: {
      agents: {
        defaults: {
          bootstrapMaxChars: 20_000,
          bootstrapTotalMaxChars: 150_000,
          contextInjection: "always",
        },
      },
    },
  },
  {
    id: "codeAgent",
    label: "코드 에이전트",
    description: "저장소 작업에 가장 큰 컨텍스트 예산을 제공합니다.",
    detail:
      "여러 파일 변경, 긴 부트스트랩 문서, 코드 중심 세션에 가장 적합합니다.",
    impact:
      "가장 큰 프롬프트 예산을 사용하고 매 턴 컨텍스트를 다시 주입합니다.",
    icon: "🛠️",
    patch: {
      agents: {
        defaults: {
          bootstrapMaxChars: 50_000,
          bootstrapTotalMaxChars: 300_000,
          contextInjection: "always",
        },
      },
    },
  },
  {
    id: "teamBot",
    label: "팀 봇",
    description: "공유 봇을 위한 가벼운 후속 동작입니다.",
    detail:
      "큰 부트스트랩 페이로드보다 연속성이 더 중요한 다중 채널 워크플로에 적합합니다.",
    impact: "안전한 후속 재주입을 건너뛰어 후속 턴을 더 작게 유지합니다.",
    icon: "👥",
    patch: {
      agents: {
        defaults: {
          bootstrapMaxChars: 10_000,
          bootstrapTotalMaxChars: 80_000,
          contextInjection: "continuation-skip",
        },
      },
    },
  },
  {
    id: "minimal",
    label: "최소",
    description: "가장 작은 컨텍스트 예산과 가장 낮은 비용입니다.",
    detail: "빠른 유틸리티 턴, 자동화, 비용에 민감한 워크플로에 적합합니다.",
    impact: "가장 작은 부트스트랩 예산과 가장 가벼운 후속 동작을 사용합니다.",
    icon: "⚡",
    patch: {
      agents: {
        defaults: {
          bootstrapMaxChars: 5_000,
          bootstrapTotalMaxChars: 30_000,
          contextInjection: "continuation-skip",
        },
      },
    },
  },
];

export function getPresetById(id: ConfigPresetId): ConfigPreset | undefined {
  return CONFIG_PRESETS.find((p) => p.id === id);
}

/**
 * Detect which preset (if any) matches the current config values.
 */
export function detectActivePreset(
  config: Record<string, unknown>,
): ConfigPresetId | null {
  const agents = config.agents as Record<string, unknown> | undefined;
  const defaults = agents?.defaults as Record<string, unknown> | undefined;
  if (!defaults) {
    return null;
  }
  const maxChars = defaults.bootstrapMaxChars;
  const totalMax = defaults.bootstrapTotalMaxChars;
  const contextInjection = defaults.contextInjection;
  for (const preset of CONFIG_PRESETS) {
    const presetDefaults = (preset.patch.agents as Record<string, unknown>)
      ?.defaults as Record<string, unknown> | undefined;
    if (!presetDefaults) {
      continue;
    }
    if (
      maxChars === presetDefaults.bootstrapMaxChars &&
      totalMax === presetDefaults.bootstrapTotalMaxChars &&
      contextInjection === presetDefaults.contextInjection
    ) {
      return preset.id;
    }
  }
  return null;
}
