import type { ChannelConfigUiHint } from "openclaw/plugin-sdk/core";

export const whatsAppChannelConfigUiHints = {
  "": {
    label: "WhatsApp 채널",
    help: "WhatsApp 채널 제공자 설정 — 접근 정책 및 메시지 배칭 동작을 제어합니다. 이 섹션에서 응답성 및 다이렉트(개인) 메시지 라우팅의 안전성을 조정하세요.",
  },
  dmPolicy: {
    label: "WhatsApp 다이렉트 메시지(DM) 정책",
    help: '다이렉트 메시지 접근 제어("pairing" 권장). "open"을 사용하려면 channels.whatsapp.allowFrom=["*"]가 필요합니다.',
  },
  selfChatMode: {
    label: "WhatsApp 개인 휴대폰 모드",
    help: "같은 기기/번호 설정(봇이 사용자의 개인 WhatsApp 번호를 사용합니다).",
  },
  debounceMs: {
    label: "WhatsApp 메시지 디바운스(밀리초)",
    help: "같은 발신자의 빠른 연속 메시지를 묶기 위한 디바운스 창(밀리초). 0으로 설정하면 비활성화됩니다.",
  },
  configWrites: {
    label: "WhatsApp 설정 쓰기 허용",
    help: "채널 이벤트/명령에 응답하여 WhatsApp이 설정을 수정하도록 허용합니다(기본값: true).",
  },
} satisfies Record<string, ChannelConfigUiHint>;
