import type { ChannelConfigUiHint } from "openclaw/plugin-sdk/channel-core";

export const telegramChannelConfigUiHints = {
  "": {
    label: "Telegram",
    help: "인증 토큰, 재시도 동작, 메시지 렌더링 제어를 포함한 Telegram 채널 공급자 설정입니다. Telegram 전용 API 특성에 맞게 봇 동작을 조정하려면 이 섹션을 사용하세요.",
  },
  customCommands: {
    label: "Telegram 사용자 지정 명령어",
    help: "추가적인 Telegram 봇 메뉴 명령어입니다(기본 명령어와 병합되며, 충돌 시 무시됨).",
  },
  botToken: {
    label: "Telegram 봇 토큰",
    help: "이 계정/공급자 설정의 Bot API 요청을 인증하는 데 사용되는 Telegram 봇 토큰입니다. 노출이 의심되는 경우 시크릿/환경 변수 대체를 사용하고 토큰을 재발급하세요.",
  },
  dmPolicy: {
    label: "Telegram DM 정책",
    help: '다이렉트 메시지 접근 제어입니다 ("pairing" 권장). "open"으로 설정하려면 channels.telegram.allowFrom=["*"] 설정이 필요합니다.',
  },
  "dm.threadReplies": {
    label: "Telegram DM 스레드 답장",
    help: 'message_thread_id가 있는 Telegram DM에서 평면 세션("off", 기본값)을 사용할지 또는 스레드 범위 세션("inbound" 또는 "always")을 사용할지 제어합니다. 평면 세션 유지 시에도 답장에서는 스레드 ID가 보존됩니다.',
  },
  "direct.*.threadReplies": {
    label: "Telegram DM별 스레드 답장",
    help: 'message_thread_id 세션 스레딩에 대한 DM별 재정의(override)입니다. 특정 다이렉트 채팅이 의도적으로 Telegram DM 주제(topics)를 별도의 세션으로 사용하는 경우에만 "inbound"를 사용하세요.',
  },
  configWrites: {
    label: "Telegram 설정 쓰기",
    help: "채널 이벤트/명령어 응답에 따라 Telegram이 설정을 작성하도록 허용합니다 (기본값: true).",
  },
  "commands.native": {
    label: "Telegram 기본 명령어",
    help: 'Telegram의 기본 명령어를 재정의합니다 (boolean 또는 "auto").',
  },
  "commands.nativeSkills": {
    label: "Telegram 기본 스킬 명령어",
    help: 'Telegram의 기본 스킬 명령어를 재정의합니다 (boolean 또는 "auto").',
  },
  streaming: {
    label: "Telegram 스트리밍 모드",
    help: '통합 Telegram 스트림 미리보기 모드입니다: "off" | "partial" | "block" | "progress" (기본값: "partial"). "progress" 모드는 최종 전송 전까지 편집 가능한 단일 진행 중 초안을 유지합니다. 레거시 boolean/streamMode 키가 감지된 경우 doctor --fix를 실행하여 마이그레이션하세요.',
  },
  "streaming.mode": {
    label: "Telegram 스트리밍 모드",
    help: '정식 Telegram 미리보기 모드입니다: "off" | "partial" | "block" | "progress" (기본값: "partial").',
  },
  "streaming.chunkMode": {
    label: "Telegram 청크(Chunk) 모드",
    help: '보내는 Telegram 텍스트의 청크(chunking) 모드입니다: "length" (기본값) 또는 "newline".',
  },
  "streaming.block.enabled": {
    label: "Telegram 블록 스트리밍 활성화",
    help: 'channels.telegram.streaming.mode="block" 일 때, 청크(chunk) 단위 블록 스타일의 Telegram 미리보기 전송을 활성화합니다.',
  },
  "streaming.block.coalesce": {
    label: "Telegram 블록 스트리밍 병합(Coalesce)",
    help: "최종 전송 전에 스트리밍된 Telegram 블록 답장들을 하나로 병합합니다.",
  },
  "streaming.preview.chunk.minChars": {
    label: "Telegram 초안 청크의 최소 문자 수",
    help: 'channels.telegram.streaming.mode="block" 일 때, Telegram 블록 미리보기 청크를 내보내기 전 대기하는 최소 문자 수입니다.',
  },
  "streaming.preview.chunk.maxChars": {
    label: "Telegram 초안 청크의 최대 문자 수",
    help: 'channels.telegram.streaming.mode="block" 일 때, Telegram 블록 미리보기 청크의 목표 최대 크기입니다.',
  },
  "streaming.preview.chunk.breakPreference": {
    label: "Telegram 초안 청크의 분할 기준 (선호도)",
    help: "Telegram 초안 청크 분할 시 선호하는 지점입니다 (paragraph(단락) | newline(줄바꿈) | sentence(문장)).",
  },
  "streaming.preview.toolProgress": {
    label: "Telegram 초안 도구 진행 상황",
    help: "라이브 초안 미리보기 메시지에 도구/작업 진행 상황 표시 여부 (미리보기 스트리밍이 활성화된 경우 기본값: true). 편집되는 미리보기에서 도구 업데이트 내용을 숨기려면 false로 설정하세요.",
  },
  "streaming.preview.commandText": {
    label: "Telegram 초안 명령어 문구",
    help: '진행 상황 미리보기 줄의 명령어/실행 세부 정보 표시 설정입니다: "raw"는 출시된 동작을 유지하며, "status"는 도구 레이블만 표시합니다.',
  },
  "streaming.progress.label": {
    label: "Telegram 진행 상황 라블",
    help: '초기 진행 상태 초안의 제목입니다. "auto"로 설정 시 내장된 단일 단어 레이블을, 사용자 지정 문자열, 혹은 false 설정으로 제목을 숨길 수 있습니다.',
  },
  "streaming.progress.labels": {
    label: "Telegram 진행 상황 라블 목록",
    help: 'streaming.progress.label="auto" 일 때의 후보 레이블 목록입니다. 설정하지 않으면 OpenClaw 내장 진행 상태 레이블을 사용합니다.',
  },
  "streaming.progress.maxLines": {
    label: "Telegram 진행 상황 최대 줄 수",
    help: "초안 레이블 아래에 유지할 축약형 진행 상황 줄의 최대 개수입니다 (기본값: 8).",
  },
  "streaming.progress.toolProgress": {
    label: "Telegram 진행 상황 도구 줄 표시",
    help: "진행 초안 모드에서 요약된 도구/작업 진행 상황을 표시할지 여부입니다 (기본값: true). 최종 전송 전까지 레이블만 남기려면 false로 설정하세요.",
  },
  "streaming.progress.commandText": {
    label: "Telegram 진행 상황 명령어 텍스트",
    help: '진행 초안 줄에서의 명령어/작업 세부 정보 표시 설정: "raw"는 기존 출시 동작을 유지하며, "status"는 도구 레이블만 보여줍니다.',
  },
  "retry.attempts": {
    label: "Telegram 재시도 횟수",
    help: "나가는 Telegram API 호출의 최대 재시도 횟수입니다 (기본값: 3).",
  },
  "retry.minDelayMs": {
    label: "Telegram 최소 재시도 지연 (ms)",
    help: "Telegram API 재시도 전 대기하는 최소 지연 시간(밀리초)입니다.",
  },
  "retry.maxDelayMs": {
    label: "Telegram 최대 재시도 지연 (ms)",
    help: "Telegram API 재시도 시 허용되는 최대 지연 시간(밀리초) 한도입니다.",
  },
  "retry.jitter": {
    label: "Telegram 재시도 지터(Jitter)",
    help: "Telegram 재시도 지연 시간에 적용되는 지터(Jitter) 계수(0-1)입니다.",
  },
  "network.autoSelectFamily": {
    label: "Telegram autoSelectFamily",
    help: "Telegram에 대한 Node autoSelectFamily 특성을 재정의합니다(true=활성화, false=비활성화).",
  },
  "network.dangerouslyAllowPrivateNetwork": {
    label: "Telegram 프라이빗 네트워크 위험 허용",
    help: "Telegram 미디어 다운로드가 api.telegram.org를 프라이빗/내부/특수 용도 주소로 해석하는 신뢰할 수 있는 fake-IP 또는 투명 프록시 환경에서 위험을 감수하고 이를 허용하기 위한 설정입니다.",
  },
  timeoutSeconds: {
    label: "Telegram API 시간 제한(초)",
    help: "Telegram API 요청이 중단되기까지의 최대 시간(초)입니다 (기본값: grammY 기준 500초).",
  },
  mediaGroupFlushMs: {
    label: "Telegram 미디어 그룹 Flush (ms)",
    help: "Telegram 사진첩/미디어 그룹을 하나의 수신 메시지로 전송하기 전 버퍼링할 밀리초 단위 시간입니다. 기본값: 500.",
  },
  pollingStallThresholdMs: {
    label: "Telegram 폴링 정지(Stall) 임계값 (ms)",
    help: "완료된 Telegram getUpdates가 없는 상태가 이 시간(밀리초) 이상 지속되면 watchdog이 폴링 러너를 다시 시작합니다. 기본값: 120000.",
  },
  silentErrorReplies: {
    label: "Telegram 조용한 오류 답장",
    help: "true로 설정하면 오류로 표시된 Telegram 봇 답장이 조용하게(알림음 없이) 전송됩니다. 기본값: false.",
  },
  apiRoot: {
    label: "Telegram API 루트 URL",
    help: "사용자 지정 Telegram Bot API 루트 URL입니다. API 루트만 기재하며 (예: https://api.telegram.org), 뒤에 /bot<TOKEN> 등 엔드포인트를 붙이지 마세요. 자체 호스팅 Bot API 서버 또는 api.telegram.org가 차단된 지역의 리버스 프록시에 사용합니다.",
  },
  trustedLocalFileRoots: {
    label: "Telegram 신뢰하는 로컬 파일 루트",
    help: "자체 호스팅 Telegram Bot API의 절대 file_path 값을 신뢰할 로컬 파일 시스템 루트 목록입니다. 이 설정된 루트 내부의 절대 경로만 디스크에서 직접 읽고, 다른 모든 절대 경로는 거부됩니다.",
  },
  autoTopicLabel: {
    label: "Telegram 자동 주제 레이블 생성",
    help: "첫 메시지 수신 시 LLM을 사용하여 DM 포럼 주제의 이름을 자동으로 변경합니다. 기본값: true. 비활성화하려면 false로 지정하거나 사용자 프롬프트를 원할 경우 객체 형태 { enabled: true, prompt: '...' }를 사용할 수 있습니다.",
  },
  "autoTopicLabel.enabled": {
    label: "Telegram 자동 주제 레이블 활성화",
    help: "자동 주제 이름 변경을 사용할지 여부입니다. 기본값: true.",
  },
  "autoTopicLabel.prompt": {
    label: "Telegram 자동 주제 수정 프롬프트",
    help: "LLM 기반 주제 작명용 사용자 지정 프롬프트입니다. 이 프롬프트 뒤에 실제 사용자 메시지가 추가됩니다.",
  },
  "capabilities.inlineButtons": {
    label: "Telegram 인라인 버튼 활성화",
    help: "지원되는 명령어 및 상호작용 표면에 대해 Telegram 인라인 버튼 컴포넌트를 활성화합니다. 배포 환경이 텍스트 전용 호환성을 가져야 하는 경우 이를 비활성화하세요.",
  },
  execApprovals: {
    label: "Telegram 실행(Exec) 승인 설정",
    help: "Telegram 기본 실행 승인 라우팅 및 승인자 권한 설정입니다. 값을 지정하지 않으면 OpenClaw는 봇 계정에 사용될 수 있는 승인자가 판별될 때 DM 우선 기본 승인을 자동 활성화합니다.",
  },
  "execApprovals.enabled": {
    label: "Telegram 실행 승인 활성화",
    help: '이 계정의 Telegram 기본 실행 승인 라우팅 제어입니다: 설정하지 않거나 "auto"인 경우 승인자가 확인되면 DM 우선으로 기본 기능을 켜며, true는 강제 활성화, false는 기능을 끕니다.',
  },
  "execApprovals.approvers": {
    label: "Telegram 실행 담당 승인자 설정",
    help: "이 봇 계정의 명령 실행 요청을 승인할 수 있는 Telegram 사용자 ID입니다. 숫자 형태의 ID만 사용하세요. 설정하지 않을 경우 OpenClaw는 가능하면 commands.ownerAllowFrom에서 숫자형 소유자 ID를 유추합니다.",
  },
  "execApprovals.agentFilter": {
    label: "Telegram 실행 승인 대상 에이전트 필터",
    help: 'Telegram 실행 승인 라우팅에 적용할 에이전트의 선택적 허용 목록입니다 (예: `["main", "ops-agent"]`). Telegram 내에서 관리할 특정 에이전트만 승인 프롬프트가 표시되도록 할 때 사용하세요.',
  },
  "execApprovals.sessionFilter": {
    label: "Telegram 실행 승인 세션 필터",
    help: "Telegram 승인 라우팅이 이뤄지기 전 일치해야 하는 선택적인 세션 키 필터 (문자열 일부 포함 또는 정규식 형식)입니다. 의도한 세션에서만 실행 승인 메시지가 전달되도록 좁은 범위를 사용하세요.",
  },
  "execApprovals.target": {
    label: "Telegram 실행 승인 대상",
    help: 'Telegram 승인 요청 프롬프트를 전송할 위치 제어입니다: "dm"은 승인자의 DM으로 전송(기본값), "channel"은 프롬프트가 발생한 원래의 Telegram 그룹/토픽으로 전송, "both"는 두 군데 모두 전송합니다. 채널 전송 시 명령 내용 전체가 공개되므로 신뢰하는 소규모 그룹/주제에서만 사용하세요.',
  },
  "threadBindings.enabled": {
    label: "Telegram 스레드 바인딩 활성화",
    help: "Telegram 대화 바인딩 기능(/focus, /unfocus, /agents 및 /session idle|max-age)을 활성화합니다. 설정 시 session.threadBindings.enabled를 덮어씁니다.",
  },
  "threadBindings.idleHours": {
    label: "Telegram 스레드 바인딩 유휴 시간 (시간)",
    help: "바인딩된 Telegram 세션의 비활동 유지창(시간 단위)입니다. 0으로 설정하면 자동 유휴 언포커스가 비활성화됩니다(기본값: 24). 설정 시 session.threadBindings.idleHours를 덮어씁니다.",
  },
  "threadBindings.maxAgeHours": {
    label: "Telegram 스레드 바인딩 최대 수명 (시간)",
    help: "바인딩된 Telegram 세션의 선택적인 강제 종료 수명(시간 단위)입니다. 0이면 한도가 지정되지 않습니다 (기본값: 0). 지정 시 session.threadBindings.maxAgeHours를 덮어씁니다.",
  },
  "threadBindings.spawnSessions": {
    label: "Telegram 스레드 바인딩 세션 생성 허용",
    help: "sessions_spawn(thread=true) 명령 또는 ACP 스레드 생성이 발생할 때, 지원되는 경우 Telegram 대화를 자동으로 바인딩하도록 허용합니다.",
  },
  "threadBindings.defaultSpawnContext": {
    label: "Telegram 스레드 세션 기본 컨텍스트",
    help: '바인딩된 스레드에서 생성되는 기본 하위 에이전트 컨텍스트입니다. "fork"는 요청자의 대화 기록에서 분기하며, "isolated"는 빈 줄 상태에서 시작합니다. 기본값: "fork".',
  },
} satisfies Record<string, ChannelConfigUiHint>;
