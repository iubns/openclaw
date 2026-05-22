import type { ChannelConfigUiHint } from "openclaw/plugin-sdk/channel-core";

export const discordChannelConfigUiHints = {
  "": {
    label: "Discord",
    help: "봇 인증, 재시도 정책, 스트리밍, 스레드 바인딩 및 선택적인 음성 기능을 포함하는 Discord 채널 공급자 설정입니다. 필요가 없는 한 권한 있는 인텐트기능(privileged intents) 및 고급 기능들은 비활성화된 상태로 유지하십시오.",
  },
  dmPolicy: {
    label: "Discord DM 정책",
    help: '다이렉트 메시지 접근 제어입니다 ("pairing" 권장). "open"으로 설정하려면 channels.discord.allowFrom=["*"] 권한 허용이 필요합니다.',
  },
  "dm.policy": {
    label: "Discord DM 정책",
    help: '다이렉트 메시지 접근 제어입니다 ("pairing" 권장). "open"으로 설정하려면 channels.discord.allowFrom=["*"] 설정이 필요합니다. (이전 방식: channels.discord.dm.allowFrom)',
  },
  configWrites: {
    label: "Discord 설정 작성 (Config Writes)",
    help: "채널 이벤트나 명령어에 응답하여 Discord가 설정을 쓰도록 허용합니다 (기본값: true).",
  },
  proxy: {
    label: "Discord 프록시 URL",
    help: "Discord 게이트웨이 및 API 요청용 프록시 URL입니다(앱 ID 조회 및 허용 목록 확인). 계정별로 channels.discord.accounts.<id>.proxy를 통해 설정할 수 있습니다.",
  },
  "commands.native": {
    label: "Discord 기본 명령어",
    help: 'Discord의 기본 명령어를 재정의합니다 (boolean 또는 "auto").',
  },
  "commands.nativeSkills": {
    label: "Discord 기본 스킬 명령어",
    help: 'Discord의 기본 스킬 명령어를 재정의합니다 (boolean 또는 "auto").',
  },
  streaming: {
    label: "Discord 스트리밍 모드",
    help: '통합 Discord 스트림 미리보기 모드: "off" | "partial" | "block" | "progress". "progress" 모드는 최종 전송 전까지 편집 가능한 단일 진행 중 초안을 유지합니다. 레거시 boolean/streamMode 키는 자동으로 맵핑(변환)됩니다.',
  },
  "streaming.mode": {
    label: "Discord 스트리밍 모드",
    help: '정식 Discord 미리보기 모드입니다: "off" | "partial" | "block" | "progress".',
  },
  "streaming.chunkMode": {
    label: "Discord 청크 모드",
    help: '발신 Discord 텍스트 전달을 위한 청크(chunking) 모드입니다: "length" (기본값) 또는 "newline".',
  },
  "streaming.block.enabled": {
    label: "Discord 블록 스트리밍 활성화",
    help: 'channels.discord.streaming.mode="block" 일 때 분할된 블록 형태의 Discord 미리보기 전송을 활성화합니다.',
  },
  "streaming.block.coalesce": {
    label: "Discord 블록 스트리밍 병합(Coalesce)",
    help: "최종 전송 전 스트리밍된 Discord 블록 답장들을 하나로 합칩니다.",
  },
  "streaming.preview.chunk.minChars": {
    label: "Discord 초안 청크의 최소 문자 수",
    help: 'channels.discord.streaming.mode="block" 일 때 Discord 스트림 미리보기 업데이트를 위한 최소 문자 수입니다 (기본값: 200).',
  },
  "streaming.preview.chunk.maxChars": {
    label: "Discord 초안 청크의 최대 문자 수",
    help: 'channels.discord.streaming.mode="block" 일 때 Discord 스트림 미리보기 청크의 권장 최대 크기입니다 (기본값: 800; channels.discord.textChunkLimit 에 맞게 제한됩니다).',
  },
  "streaming.preview.chunk.breakPreference": {
    label: "Discord 초안 청크의 분할 선호 지점",
    help: "Discord 초안 청크를 나눌 때 기준이 되는 선호 단위(paragraph(단락) | newline(줄바꿈) | sentence(문장)). 기본값: paragraph.",
  },
  "streaming.preview.toolProgress": {
    label: "Discord 초안 도구 진행 상황",
    help: "실시간 초안 미리보기 메시지에 도구 작동 진행 상황을 표시합니다 (기본값: true). 초안이 유지되는 동안 중간 도구 업데이트 내역을 숨기려면 false로 설정하세요.",
  },
  "streaming.preview.commandText": {
    label: "Discord 초안 명령어 내용",
    help: '미리보기의 도구 작동 진행 줄에 나타나는 명령어/실행 세부 정보 설정입니다: "raw"는 기존 릴리스 방식 그대로 나타나고, "status"는 도구 레이블 부분만 표기합니다.',
  },
  "streaming.progress.label": {
    label: "Discord 진행 레이블",
    help: '초기 진행 상태 초안의 제목입니다. "auto"를 통해 내장된 짧은 문구(단어 하나 레이블)를 지정하거나 직접 입력할 수 있으며, 제목을 없애려면 false를 설정하세요.',
  },
  "streaming.progress.labels": {
    label: "Discord 진행 상황 라벨 옵션표(Pool)",
    help: 'streaming.progress.label="auto"일 때 적용 가능한 라벨들의 옵션 목록입니다. 설정하지 않으면 OpenClaw 내장 라벨 텍스트를 사용합니다.',
  },
  "streaming.progress.maxLines": {
    label: "Discord 스트리밍 진행 시 최대 줄 수",
    help: "초안 레이블 텍스트 아래에 표시 상태로 유지할 컴팩트 진행 상황 표시 줄의 최대 갯수입니다(기본 설정: 8).",
  },
  "streaming.progress.toolProgress": {
    label: "Discord 진행 중 툴 적용 알림",
    help: "상태 진행 초안 모드에서 간략하게 요약된 툴/작업 진행 상황 줄을 표시할지 여부(기본값: true). 최종 콘텐츠 전송 이전까지 상태 레이블 이름만 두고 싶으면 false를 지정하세요.",
  },
  "streaming.progress.commandText": {
    label: "Discord 진행 상태 시 커맨드 안내문",
    help: '진행 초안의 커맨드/실행 정보 설명 방식 텍스트 설정: "raw"는 기존 출시 방식을 고스란히 담아 유지하며, "status"는 구체적인 정보 노출 없이 툴 레이블명 부분만 보여줍니다.',
  },
  "retry.attempts": {
    label: "Discord 재시도 횟수",
    help: "Discord API 호출 시 허용될 최대 재시도 시도(retry) 횟수입니다 (기본: 3).",
  },
  "retry.minDelayMs": {
    label: "Discord 최소 재시도 지연 (ms)",
    help: "전송 Discord API 재시도 이전에 기다릴 최소 대기시간입니다(설정 기준: ms 밀리초).",
  },
  "retry.maxDelayMs": {
    label: "Discord 최대 재시도 지연 (ms)",
    help: "전송용 외부 Discord API 재시도 사이의 대기 한도 최대 시간 캡입니다(설정 기준: ms 밀리초).",
  },
  "retry.jitter": {
    label: "Discord 재시도 지터(Jitter)",
    help: "Discord 재시도 지연 시간들에 반영할 0-1 사이 값의 확률 조절 변동율성 계수기(Jitter) 입니다.",
  },
  maxLinesPerMessage: {
    label: "Discord 메시지 당 최대 줄 수",
    help: "Discord의 메시지당 부드러운 최대 행 개수(기준 제한)를 말합니다 (기본값 설정: 17).",
  },
  "thread.inheritParent": {
    label: "Discord 상위 스레드 내용 상속 허용",
    help: "true일 경우, 하위 Discord 스레드 세션은 부모 채널 트랜스크립트(원본 채널 채팅 내용 부분) 기록을 따와 상속받게 됩니다 (기본값: false).",
  },
  "eventQueue.listenerTimeout": {
    label: "Discord EventQueue 리스너 제한 시간 (ms)",
    help: "게이트웨이 정상화/이벤트 적재 핸들러에 대해 정식 Discord 리스너가 작동하기까지의 동작 시간 한계 설정(ms). OpenClaw 기본 수치는 120000ms 입니다; 만일 수정하길 원한다면 개별 계정 세팅인 channels.discord.accounts.<id>.eventQueue.listenerTimeout 내에 조절하세요.",
  },
  "eventQueue.maxQueueSize": {
    label: "Discord EventQueue 대기열 최대 큐 크기",
    help: "옵션형태로 설정하는 Discord 이벤트큐(EventQueue) 수용 용량(백프레셔 동작 락다운 발생 전에 담아두는 대기 중인 최대 큐 이벤트 양). 개별 계정의 channels.discord.accounts.<id>.eventQueue.maxQueueSize에서 정의 가능.",
  },
  "eventQueue.maxConcurrency": {
    label: "Discord EventQueue 처리 최대 동시 실행 수",
    help: "옵션형 Discord EventQueue 병용 개수 제한(동시에 최대로 열어 처리하는 핸들러의 실행량). 설정은 channels.discord.accounts.<id>.eventQueue.maxConcurrency에 합니다.",
  },
  "threadBindings.enabled": {
    label: "Discord 스레드 바인딩 활성화 설정",
    help: "Discord 스레드 바인딩 기능( /focus, 연결 스레드로 배송 라우트 전달, 특정 스레드 안 한정 내부 서브에이전트 구동 허용) 부분을 오픈 상태로 돌립니다. 이 옵션을 켜두면 session.threadBindings.enabled 전역 항목보다 상위로 적용(덮어씀).",
  },
  "threadBindings.idleHours": {
    label: "Discord 스레드 바인딩 비활성 유휴 시간 방치 허용값 (hours 단위)",
    help: "Discord 의 바인딩된 스레드 세션 부분(/focus 나 만들어진 생성 스레드)들의 사용 안 하는 시간대. 자동으로 그 스레드를 놓(unfocus)아버리는 유휴 작동 오프 모션 기능을 막으려면 0시간 사용을 명시하십시오 (기본: 24). 설정 시 session.threadBindings.idleHours 항목 위에 우월권으로 대체.",
  },
  "threadBindings.maxAgeHours": {
    label: "Discord 스레드 바인딩 작동 유지 상한선(Max Age) (hours 단위)",
    help: "선택형 지정 시간으로 Discord 쓰레드 안 바인드 상태(bound session)가 살아있을 최고치 리미트 타임아웃 제한(시간 단위). 종료 한계를 막을 목적이면 0값 부여(기본: 0). 이 세팅 등록 시 기존 session.threadBindings.maxAgeHours를 덮어씁니다.",
  },
  "threadBindings.spawnSessions": {
    label: "Discord 내 지정 스레드 세션 작동 생성 허용치",
    help: "sessions_spawn(thread=true) 이나 ACP 시스템의 스레드 스폰 기능을 통한 자동화 Discord 스레드 개방과 귀속 맵핑 실행 허용 여부(기본: true). 현재 채널/계정에 대해 비활성화 시키려면 false 입력.",
  },
  "threadBindings.defaultSpawnContext": {
    label: "Discord 쓰레드 바운드 세션의 기본 스폰(새판 생성 시의) 컨텍스트",
    help: '별도 파생된 쓰레드 상의 서브에이전트에 물릴 근간 방식. 기본 시작은 요청했던 트랜스크립트(채팅기록/세션 이력)에서 기반하여 나오는 "fork"(포크 구조); 완전히 새로우면서 텅빈 상태 출동을 생각할 땐 "isolated"(독립형)을 선택(기본값: "fork").',
  },
  "ui.components.accentColor": {
    label: "Discord 컴포넌트형 디자인 강조 생상 설정값(Accent Color)",
    help: "Discord 융합 디자인 컨테이너 상자에 먹입힐 하이라이트 지정색상(hex). 특정 채널이나 개별 어카운트를 상대로 지정하고자 할 때는 channels.discord.accounts.<id>.ui.components.accentColor 안에서 셋팅.",
  },
  "intents.presence": {
    label: "Discord Presence 정보 인텐트 연동(의도 허용 승인)",
    help: "Guild Presences에 속하는 민감 허용(privileged) 의도 승계 항목을 활성화할지 여부(Discord Developer Portal에 있는 것과 옵션 동일 활성 요구됨). Spotify 플레이 상태와 같은 각종 유저간 액티비티 동태 추적을 가능케 할 때 필요. (기본값 설정 상태: false).",
  },
  "intents.guildMembers": {
    label: "Discord 길드 구성원(Members) 파악 인텐트",
    help: "Guild내 참여 유저들에 대해 요구되는 프라이빗(privileged intent) 허용 승인을 오픈. Discord 개발자 포털 페이지 내의 같은 옵션 영역도 같이 열려야 함 (기본 세팅값: false).",
  },
  "intents.voiceStates": {
    label: "Discord 음성 상태용 연동 (Voice States Intent)",
    help: "Discord 길드 내부 Voice States 액션 권한을 요구 인텐트로 설정. 만일 특별히 지정하지 않을 경우에는 알아서 현 음성 세팅 방향성을 물고 오게 되나, Discord내 통화 모드 / 보이스 채팅 환경 융합이 명백히 필요한 때에만 켜두길 권고 (true 등록).",
  },
  gatewayInfoTimeoutMs: {
    label: "Discord 끄트머리 게이트웨이 내의 Metadata 통신 아웃 제한 (ms)",
    help: "연락 타임아웃 제한 내 해당 Discord /gateway/bot metadata 수급 데이터를 파악하지 못해서 범용 게이트웨이 본 링크로 뻗어가게 두는 시간(본래 URL fallback 강제 도달). 기본은 30000이며 config 락해제시 OPENCLAW_DISCORD_GATEWAY_INFO_TIMEOUT_MS 안에서 오버라이드 재정의 수용.",
  },
  gatewayReadyTimeoutMs: {
    label: "Discord 게이트 준비/READY 인식 제한 대기 허용 한도 (ms)",
    help: "어플리케이션 스타트업 작동시에 발생할 대기(Discord 전초 게이트웨이 기기 내부 READY 이벤트 전송 인식 대기선)로서, 이걸 미충족 시 다시 소켓 접속을 끊었다 켜(restarting)게 하는 마지노선 타임 아웃값. 미지정기본 15000: 만일 재설정용 값이 부재중인 세팅상황일 때는 OPENCLAW_DISCORD_READY_TIMEOUT_MS 단에서 수용처리됨.",
  },
  gatewayRuntimeReadyTimeoutMs: {
    label: "Discord 실행 중간 / Runtime READY 제한(접속 장애 응답 허용 지연 대기) 타임아웃 값 (ms)",
    help: "어플 구동 사이드 중간에 잃은 교신(reconnect 단) 때문에 다시 게이트웨이에 재회신하며 붙을 때 기다리는 한계 지연 (READY 도달점). 여기 리미트 돌파시는 본 사이클의 프로세싱/실행 라이블리후드를 파기 후 강종합니다. 세팅 안할 시 기본 30000; OPENCLAW_DISCORD_RUNTIME_READY_TIMEOUT_MS 에 별도의 수신 강제가 들어가 있을 경우에는 이것이 통과됩니다.",
  },
  "voice.enabled": {
    label: "Discord 보이스 활성화 설정기",
    help: "Discord 내 실제 오픈된 음성 채널 회의나 텍스트간 대화 세션에 관한 참여 모드를 킵니다. Text 채팅용도로만 설계된 디스코드 세팅이면 음성 기능은 초기 상태는 막혀있고, 킬 경우엔 해당 설정을 열고 더해/vc 형태의 인텐트 및 음성(Guild Voice States) 기능을 추가 오픈하게 됩니다.",
  },
  "voice.model": {
    label: "Discord 음성 모드 활용 적용 LLM 모델",
    help: "Discord 통화방 안의 음성 리액팅으로 끌어다 작동시킬 LLM 인공지능 지정자 재정의 명입니다 (예: openai/gpt-5.4-mini). 아무 내용 없이 공백 세팅 유지 시 설정된 현 채널/방 내의 할당 에이전트 내 베이스 모델을 그대로 빌려와 적용시킵니다.",
  },
  "voice.autoJoin": {
    label: "Discord 음성 채팅 자동 진입(Auto-Join)",
    help: "온라인/부팅되자 마자 대기하던 Discord 내의 특정 설정된 음성 채널방을 찾아 곧장 자체적으로 문을 열어 입장합니다. (guildId/channelId 입력 내역 엔트리 배열 리스트로 할당).",
  },
  "voice.daveEncryption": {
    label: "Discord Voice의 DAVE 채널 내 종단간 통신 암호화 설정",
    help: "Discord에 봇/보이스 시스템이 들어갈 시에 요구될 수 있는 종단간 (end-to-end) 통신암호 기법(DAVE) 모드의 강제 부여(기본: @discordjs/voice 쪽에 맞춰 true 권장되나 때에 따라 Discord 앱 단에서 특정 요청이 들어올 때 세팅 재응 시 조절 가능).",
  },
  "voice.decryptionFailureTolerance": {
    label: "Discord 음성 시스템 DAVE 암호 해제 결함/Failure 허용치 수(Tolerance)",
    help: "DAVE 프로세스가 직접 나서 복원하기 직전까지 버티는, 이어져 떨어지는 연속형 해독 불량의 불통 시도 카운트 총 허용 리미트 내역입니다. (Discord.js 쪽 파라미터 전달 수치: 기본 허용 에러는 24).",
  },
  "voice.connectTimeoutMs": {
    label: "Discord 음성 연결 접속 제한 시간 한도 (ms)",
    help: "@discordjs/voice 가 셋팅 되어서 입장 (Join) 도달 시 방 접속 대기 준비(Ready status) 란이 성공/실패가 나기까지 줄수 있는 처음 커넥팅 유예 갭 카운트 제한입니다. (기본: 30000).",
  },
  "voice.reconnectGraceMs": {
    label: "Discord 통화 재접속 유예 대기(Reconnect Grace) 시간 (ms)",
    help: "통신 단절이나 끊긴 Discord 보이스/연결 세션을 OpenClaw 단에서 전부 박살 혹은 없애버리기(destroy)기 전까지 대기하는 시그널 연결(Signalling/Connecting) 상태 돌입 기다림의 유예 버퍼시간 (기본 설정 수치: 15000).",
  },
  "voice.tts": {
    label: "Discord 보이스 텍스트/음성 (TTS) 세팅기",
    help: "목소리 송출용도로 쓰일 시스템 속 Discord 내 음성(사운드) 출력용 TTS 형태들의 개별적 부분 재정의 셋 내역(각 messages.tts 옵션의 적용 사항과 합쳐져 같이 적용 활용.)",
  },
  "pluralkit.enabled": {
    label: "Discord PluralKit 활성화 옵션",
    help: "PluralKit 툴 형태로 우회 프록시 되어 날아온 메시지들을 인지 및 정상 처리하여 각각의 개별 시스템 멤버 발송으로 똑바로 구별 지어서 인식 취급해 줍니다.",
  },
  "pluralkit.token": {
    label: "Discord PluralKit 연동 토큰값",
    help: "프라이빗(Private) 으로 가려진 멤버들이나 시스템 개체 쪽 정보 해소를 필요로 할 시에 기재하여 제공할 수 있는 선택형 PluralKit 인증 토큰 값입니다.",
  },
  activity: {
    label: "Discord 출석(상태 액티비티) 활동 내용",
    help: "Discord 챗상 외관 출석/현재 활동(Activity) 내역에 남기는 텍스트 지정글(보통 Custom Status 커스텀 상태 메시지로 취급 반영됩니다).",
  },
  status: {
    label: "Discord 보이기 프로필(상태-Status)",
    help: "Discord 계정/봇 안쪽 켤 때 밖으로 드러나는 프레즌스 종류(online (온라인), dnd (방해금지), idle (자리비움), invisible (오프라인 표시)).",
  },
  "autoPresence.enabled": {
    label: "Discord 상태 자동 업데이트 켜기",
    help: "활성화(true) 지정 시 지금의 모델 러닝 능력/사용 가능 여부 시스템 정보를 토대로 내 Discord 계정에 드러나는(bot presence) 출석 표기를 스마트하게 자동 갱신 반영합니다. (상황 예: 양호가능=>온라인(online), 성능저하/알수없음=>자리비움(idle), 제한한도(Quota) 소진/에러=>방해 말것(dnd) 모드).",
  },
  "autoPresence.intervalMs": {
    label: "Discord 자동 상태 체크/로딩 확인의 갱신 주기 (ms)",
    help: "얼마다 어느 틈 빈도로 해당 자동상태 변경점(presence 갱신 유무 판단) 을 재검사/평가지표 파악할 것인지 간격시간을 설정합니다(밀리초 기준) (기본 주기값: 30000).",
  },
  "autoPresence.minUpdateIntervalMs": {
    label: "Discord 자동 상태 호출/업데이트용 최고 짧은 간격 타임 허용 (ms)",
    help: "거듭된 잦은 시스템 노이즈성 상태 변경 신호로 유발될 과다한 봇/어플의 표기(Status spam) 통신을 차단하고자 두게 되는, 실제 서버 발송상태 갱신 콜 간의 최소 휴지(기다림) 방지벽(밀리초). (기본: 15000).",
  },
  "autoPresence.healthyText": {
    label: "Discord 자동상태 알림 시 [정상작동/배터리 양호] 시의 등록 표기 텍스트",
    help: "모든 시스템의 능력 수급/응답(runtime 건강성)이 통상적임 상태(online 시) 일 때 덧댈 Custom 메시지를 설정할 수 있습니다. 템플릿 기재 내역 없음 공란일 시엔 정식 기본 상태출력 항목(channels.discord.activity 세팅) 단에서 적용된 값 부분을 대타로 가져옵니다.",
  },
  "autoPresence.degradedText": {
    label: "Discord 자동상태- [문제유발/모델 성능 저하-응답 모호] 시 출력 텍스트 영역",
    help: "모델 내 구동 능력(available) 및 응답 상태가 질적으로 하락하였거나 알 수 없음 형태 에이전트/런타임 감지 시에(Idle) 보낼 대타 표시 글구 선택지 셋팅문.",
  },
  "autoPresence.exhaustedText": {
    label: "Discord 자동상태 알림- [자원/한도 코타 전부 소진 (오링)] 시 사용 표출 글귀",
    help: "실 런타임단에서 이미 할당 인공지능/모델 부분 코타 한도를 완전히 다 짜내어 (exhausted/unavailable) 못쓴다는 치명 결여(에러)를 인식(상태 DND) 하였을 때 보낼 글을 여기 입력합니다. {reason} 식으로 자리 표시자 형식을 써 해당 유발 원인명도 함께 담아서 표시케 기입 가능합니다.",
  },
  activityType: {
    label: "Discord 출석 활동 (Activity Type) 유형 항목치",
    help: "Discord 내 프로필상 보여질 Activity 출석 푯릿말의 타입 기호명입니다 (설정 수치표=> 0=플레이중(Playing), 1=스트리밍(Streaming), 2=청취(Listening), 3=시청 안(Watching), 4=커스텀(기본지정-Custom), 5=종목 경쟁중(Competing)).",
  },
  activityUrl: {
    label: "Discord 상태 갱신 출석 활동 URL 삽입기 (Activity 스트리밍 URL)",
    help: "스트리밍 시 외부로 공유될 본 방/프로필 표시 URL 주소 지정(위 activityType 항목을 1=Streaming으로 지정 구성했을시, 이 주소 란 입력 내역이 반드시 요구됩니다).",
  },
  allowBots: {
    label: "Discord 타 봇들의 생성/보낸 메시지 동시 통과 허가 설정",
    help: '봇으로 작성된 응답 문자에 리액트 응답/인식을 걸지, 아니면 걸러 무시할지 결정. (디폴트(허용 안함): false). 여기 내용에 "mentions (멘션만)" 텍스트 기입 변경치 적용시- 본인의 해당 봇 어카운트를 "호출/멘션(Mention)"한 메시지 건에 한해서만 특별 타봇 접견 통로를 오픈합니다.',
  },
  mentionAliases: {
    label: "Discord 멘션(Mention 지목/언급) 별칭 맵핑용 테이블 (Aliases)",
    help: "대화를 배송해 넘기기 이전에 아웃바운드로 붙어 나가는 @handle 구조 텍스트 내역을 절대 안정성이 보장된 Discord ID(유저) 부분 정보로 가로채 맵핑 치환시켜주는 기능입니다. 해당 동작 계정은 channels.discord.accounts.<id>.mentionAliases 단을 불러 지정 구성시킬 수 있습니다.",
  },
  token: {
    label: "Discord 봇 토큰 열쇠 (Bot Token)",
    help: "개별 프로바이더를 대상으로 한 게이트웨이 송/투신 또는 REST API 권한 접근 인증 릴레이 과정상 소요되는 중요한 Discord bot token 키입니다! 노출되면 큰일나니 배포나 등록 형 일반 컨픽 내 안 보이게 비밀상태 시크릿을 유지해 주시며 유출 사고 방지시 발견 즉시 돌림 갱신해 주십시오.",
    sensitive: true,
  },
  applicationId: {
    label: "Discord 상 애플리케이션 ID 주소",
    help: "스타트업 구동(출발 단계) 시점에 호스팅(Host) 네트워크 상황 단에서 Discord 정규 ID 확인 엔드포인트 단과 맞닿아 연락/체크업 검수가 작동되지도 뚫어 보지도 못할 현상 돌파용으로 명시 기재시켜 투입할 보조 Discord 애플리케이션/클라이언트 ID 입력단입니다.",
  },
} satisfies Record<string, ChannelConfigUiHint>;
