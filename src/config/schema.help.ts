import { MEDIA_AUDIO_FIELD_HELP } from "./media-audio-field-metadata.js";
import { describeTalkSilenceTimeoutDefaults } from "./talk-defaults.js";

export const FIELD_HELP: Record<string, string> = {
  meta: "OpenClaw이 자동으로 관리하여 이 구성 파일의 작성/버전 역사 기록을 위한 메타데이터 필드입니다. 이 값을 시스템 관리자로 유지하고, 마이그레이션 디버깅 외에는 수동 편집을 피하세요.",
  "meta.lastTouchedVersion": "OpenClaw가 구성을 쓸 때 자동으로 설정됩니다.",
  "meta.lastTouchedAt":
    "마지막으로 구성을 쓴 시간의 ISO 타임스탬프입니다(자동 설정).",
  env: "게이트웨이 프로세스에 런타임 변수를 제공하는 데 사용되는 환경 가져오기 및 재정의 설정입니다. 셸 환경 로딩 및 명시적 변수 주입 동작을 제어하려면 이 섹션을 사용하세요.",
  "env.shellEnv":
    "시작 시 로그인 셸에서 변수를 로드하기 위한 셸 환경 가져오기 제어입니다. 프로필에 정의된 비밀값이나 PATH 사용자 지정에 의존하는 경우 이 기능을 활성화 상태로 유지하세요.",
  "env.shellEnv.enabled":
    "시작 초기화 중에 사용자 셸 프로필에서 환경 변수를 로드할 수 있도록 합니다. 개발자 머신에서는 활성화 상태로 유지하고, 명시적 환경 관리가 적용된 잠금 상태의 서비스 환경에서는 비활성화하세요.",
  "env.shellEnv.timeoutMs":
    "대체(fallback) 동작이 적용되기 전 셸 환경 확인에 허용되는 최대 시간(밀리초)입니다. 더 빠른 시작을 위해 시간 제한을 줄이거나 셸 초기화가 무거운 경우 늘리세요.",
  "env.vars":
    "OpenClaw의 런타임 프로세스 환경에 병합되는 명시적 키/값 환경 변수 재정의입니다. 셸 프로필의 부수 효과에만 의존하는 대신 결정론적인 환경 구성에 이를 사용하세요.",
  wizard:
    "가장 최근의 안내형 설정 실행 세부 정보를 기록하는 설정 마법사 상태 추적 필드입니다. 업그레이드 전반에 걸친 설정 흐름의 관찰 및 문제 해결을 위해 이 필드들을 유지하세요.",
  "wizard.lastRunAt":
    "이 호스트에서 설정 마법사가 가장 최근에 완료된 시간의 ISO 타임스탬프입니다. 지원 및 운영 감사 중에 설정의 최신 상태를 확인하는 데 사용하세요.",
  "wizard.lastRunVersion":
    "이 구성에서 가장 최근 마법사가 실행되었을 때 기록된 OpenClaw 버전입니다. 버전 간 설정 변경으로 인한 동작 차이를 진단할 때 사용하세요.",
  "wizard.lastRunCommit":
    "개발 빌드에서 마지막 마법사 실행 시 기록된 소스 커밋 식별자입니다. 디버깅 중 설정 동작을 정확한 소스 상태와 상호 연관시키는 데 사용하세요.",
  "wizard.lastRunCommand":
    "실행 컨텍스트를 보존하기 위해 최신 마법사 실행에 대해 기록된 명령 호출입니다. 설정 회귀를 확인할 때 설정 단계를 재현하는 데 사용하세요.",
  "wizard.lastRunMode":
    '가장 최근 설정 흐름에 대해 "local" 또는 "remote"로 기록된 마법사 실행 모드입니다. 설정이 직접적인 로컬 런타임을 대상으로 했는지 아니면 원격 게이트웨이 토폴로지를 대상으로 했는지 이해하는 데 사용하세요.',
  diagnostics:
    "디버깅 중 대상 추적, 원격 측정 내보내기, 캐시 검사를 위한 진단 제어입니다. 프로덕션 환경에서는 기준 진단을 최소한으로 유지하고 문제를 조사할 때만 더 깊은 신호를 활성화하세요.",
  "diagnostics.otel":
    "게이트웨이 구성 요소가 내보내는 추적, 메트릭, 로그를 위한 OpenTelemetry 내보내기 설정입니다. 중앙 집중식 관찰 가능성 백엔드 및 분산 추적 파이프라인과 통합할 때 사용하세요.",
  "diagnostics.cacheTrace":
    "내장된 실행에서 캐시 결정 및 페이로드 컨텍스트를 관찰하기 위한 캐시 추적 로깅 설정입니다. 디버깅을 위해 일시적으로 활성화하고 이후에는 민감한 로그 공간을 줄이기 위해 비활성화하세요.",
  logging:
    "심각도, 출력 대상, 형식 지정, 민감한 데이터 수정(redaction)을 위한 로깅 동작 제어입니다. 유용한 진단은 보존하면서 프로덕션에 충분할 만큼 레벨과 수정을 엄격하게 유지하세요.",
  "logging.level":
    '런타임 로거 출력의 기본 로그 레벨 임계값입니다: "silent", "fatal", "error", "warn", "info", "debug" 또는 "trace". 프로덕션의 경우 "info" 또는 "warn"으로 유지하고, 조사 중에만 debug/trace를 사용하세요.',
  "logging.file":
    "콘솔 로깅에 추가하거나 콘솔 로깅을 대체하여 보존되는 로그 출력을 위한 선택적 파일 경로입니다. 관리되는 쓰기 가능한 경로를 사용하고 보존/순환을 운영 정책에 맞추세요.",
  "logging.consoleLevel":
    '콘솔 전용 로그 임계값입니다: 터미널 출력 제어를 위한 "silent", "fatal", "error", "warn", "info", "debug" 또는 "trace". 필요한 경우 더 풍부한 파일 로깅을 유지하면서 로컬 콘솔을 조용하게 유지하는 데 사용하세요.',
  "logging.consoleStyle":
    '콘솔 출력 형식 스타일입니다: 운영자 및 수집 필요성에 따라 "pretty", "compact" 또는 "json". 시스템 구문 분석 파이프라인의 경우 json을 사용하고, 사람이 주로 보는 터미널 워크플로의 경우 pretty/compact를 사용하세요.',
  "logging.redactSensitive":
    '민감한 로그/스크립트 수정 모드: "off"는 일반 로그 및 스크립트 마스킹을 비활성화하며, "tools"는 해당 싱크에서 민감한 도구/구성 페이로드 필드를 수정합니다. 이것이 "off"인 경우에도 안전 경계 UI, 도구, 진단 페이로드는 여전히 수정될 수 있습니다.',
  "logging.redactPatterns":
    "방출 전에 로그 출력, 보존된 스크립트 텍스트, 안전 경계 UI/도구/진단 페이로드에 적용되는 추가 사용자 지정 수정 정규식 패턴입니다. 내장된 수정 규칙에서 다루지 않는 조직별 토큰 및 식별자를 마스킹하는 데 사용하세요.",
  cli: "배너 및 태그라인 스타일과 같은 로컬 명령 출력 동작을 위한 CLI 프레젠테이션 제어입니다. 런타임 동작을 변경하지 않고 운영자 선호도에 맞게 시작 출력을 유지하려면 이 섹션을 사용하세요.",
  "cli.banner":
    "제목/버전 줄 및 태그라인 스타일 동작을 위한 CLI 시작 배너 제어입니다. 빠른 버전/컨텍스트 확인을 위해 배너를 활성화된 상태로 유지한 다음, 선호하는 노이즈 수준으로 태그라인 모드를 조정하세요.",
  "cli.banner.taglineMode":
    'CLI 시작 배너의 태그라인 스타일을 제어합니다: "random"(기본값)은 순환하는 태그라인 풀에서 선택하고, "default"는 항상 중립적인 기본 태그라인을 표시하며, "off"는 배너 버전 줄은 유지하면서 태그라인 텍스트를 숨깁니다.',
  update:
    "OpenClaw 런타임 버전을 최신으로 유지하기 위한 업데이트 채널 및 시작 확인 동작입니다. 프로덕션 환경에서는 보수적인 채널을 사용하고 제어된 환경에서만 실험적인 채널을 사용하세요.",
  "update.channel":
    'git + npm 설치를 위한 업데이트 채널입니다("stable", "beta" 또는 "dev").',
  "update.checkOnStart":
    "게이트웨이가 시작될 때 npm 업데이트를 확인합니다(기본값: true).",
  "update.auto.enabled":
    "패키지 설치를 위한 백그라운드 자동 업데이트를 활성화합니다(기본값: false).",
  "update.auto.stableDelayHours":
    "안정(stable) 채널 자동 적용이 시작되기 전 최소 지연 시간입니다(기본값: 6).",
  "update.auto.stableJitterHours":
    "추가적인 안정 채널 롤아웃 분산 시간(시간)입니다(기본값: 12).",
  "update.auto.betaCheckIntervalHours":
    "베타 채널 확인이 실행되는 빈도(시간)입니다(기본값: 1).",
  gateway:
    "바인드 모드, 인증, 제어 UI, 원격 전송 및 운영 안전 제어를 위한 게이트웨이 런타임 표면입니다. 신뢰할 수 있는 로컬 인터페이스 외부로 게이트웨이를 의도적으로 노출시키지 않는 한 보수적인 기본값을 유지하세요.",
  "gateway.port":
    "API, 제어 UI, 채널 연결 수신 경로를 위해 게이트웨이 리스너가 사용하는 TCP 포트입니다. 전용 포트를 사용하고 리버스 프록시나 로컬 개발자 서비스와의 충돌을 피하세요.",
  "gateway.mode":
    '게이트웨이 작동 모드: "local"은 이 호스트에서 채널 및 에이전트 런타임을 실행하며, "remote"는 원격 전송을 통해 연결합니다. 분할 원격 게이트웨이 토폴로지를 의도적으로 실행하지 않는 한 "local"을 유지하세요.',
  "gateway.bind":
    '네트워크 바인드 프로필: 인터페이스 노출을 제어하기 위한 "auto", "lan", "loopback", "custom" 또는 "tailnet". 외부 클라이언트가 연결해야 하는 경우가 아니면 가장 안전한 로컬 작동을 위해 "loopback" 또는 "auto"를 유지하세요.',
  "gateway.customBindHost":
    "수동 인터페이스 지정을 위해 gateway.bind가 custom으로 설정되었을 때 사용되는 명시적 바인드 호스트/IP입니다. 외부 노출이 필요한 경우가 아니면 와일드카드 바인드를 피하고 정확한 주소를 사용하세요.",
  "gateway.controlUi":
    "활성화, 경로 지정, 브라우저 출처/인증 강화 동작을 포함하는 제어 UI 호스팅 설정입니다. 인터넷 연결 배포 전에는 UI 노출을 최소화하고 강력한 인증 제어와 결합하세요.",
  "gateway.controlUi.enabled":
    "true인 경우 게이트웨이 HTTP 프로세스에서 게이트웨이 제어 UI를 제공하도록 활성화합니다. 로컬 관리를 위해 활성화 상태로 유지하고, 외부 제어 표면이 이를 대체할 때 비활성화하세요.",
  "gateway.auth":
    "모드, 자격 증명, 신뢰할 수 있는 프록시 동작, 속도 제한을 포함하는 게이트웨이 HTTP/WebSocket 액세스에 대한 인증 정책입니다. 루프백이 아닌 모든 배포에 대해 인증을 활성화 상태로 유지하세요.",
  "gateway.auth.mode":
    '게이트웨이 인증 모드: 에지(edge) 아키텍처에 따라 "none", "token", "password" 또는 "trusted-proxy"입니다. 직접 노출 시에는 token/password를 사용하고, 강화된 ID 인식 프록시 뒤에서는 trusted-proxy만 사용하세요.',
  "gateway.auth.allowTailscale":
    "구성된 경우 신뢰할 수 있는 Tailscale ID 경로가 게이트웨이 인증 검사를 충족하도록 허용합니다. tailnet ID 상태가 강력하고 운영자 워크플로가 이에 의존하는 경우에만 이 기능을 사용하세요.",
  "gateway.auth.rateLimit":
    "게이트웨이 경계에서 자격 증명 무차별 대입(brute-force) 위험을 줄이기 위한 로그인/인증 시도 스로틀링 제어입니다. 노출된 환경에서는 활성화 상태로 유지하고 트래픽 기준선에 맞게 임계값을 조정하세요.",
  "gateway.auth.trustedProxy":
    "사용자 클레임을 주입하는 업스트림 ID 제공자를 위한 신뢰할 수 있는 프록시 인증 헤더 매핑입니다. 위조된 ID 헤더를 방지하려면 알려진 프록시 CIDR 및 엄격한 헤더 허용 목록에서만 사용하세요.",
  "gateway.trustedProxies":
    "전달된 클라이언트 ID 헤더를 제공하도록 허용된 업스트림 프록시의 CIDR/IP 허용 목록입니다. 신뢰할 수 없는 홉이 사용자를 가장할 수 없도록 이 목록을 좁게 유지하세요.",
  "gateway.allowRealIpFallback":
    "프록시 시나리오에서 x-forwarded-for가 누락된 경우 x-real-ip 대체를 활성화합니다. 인그레스(ingress) 스택이 이 호환성 동작을 요구하지 않는 한 비활성화 상태로 유지하세요.",
  "gateway.tools":
    "에이전트/도구 프로필과 독립적으로 런타임 도구 가용성을 제한할 수 있는 게이트웨이 수준의 도구 노출 허용/거부 정책입니다. 거친 수준의 비상 제어 및 프로덕션 강화에 이를 사용하세요.",
  "gateway.tools.allow":
    "런타임에 좁은 범위의 도구 세트만 사용하도록 할 때 사용하는 명시적인 게이트웨이 수준 도구 허용 목록입니다. 도구 범위를 엄격하게 제어해야 하는 잠긴 환경에 이를 사용하세요.",
  "gateway.tools.deny":
    "하위 수준 정책에서 허용하더라도 위험한 도구를 차단하기 위한 명시적인 게이트웨이 수준 도구 거부 목록입니다. 비상 대응 및 심층 방어(defense-in-depth) 강화를 위해 거부 규칙을 사용하세요.",
  "gateway.handshakeTimeoutMs":
    "인증 전 게이트웨이 WebSocket 핸드셰이크 시간 제한(밀리초)입니다. 시작 준비 중에 로컬 클라이언트가 연결될 수 있는 부하가 많거나 저전력 호스트에서는 더 높은 값을 사용하세요. OPENCLAW_HANDSHAKE_TIMEOUT_MS가 여전히 우선합니다.",
  "gateway.channelHealthCheckMinutes":
    "자동 채널 상태 프로빙 및 상태 업데이트 간격(분)입니다. 더 빠른 감지를 위해 간격을 줄이거나 정기적인 프로브 노이즈를 줄이기 위해 간격을 늘리세요.",
  "gateway.channelStaleEventThresholdMinutes":
    "상태 모니터가 오래된 소켓으로 처리하고 재시작을 트리거하기 전까지 연결된 채널이 제공자 측의 전송 활동 없이 유지될 수 있는 분 단위 시간입니다. 기본값: 30.",
  "gateway.channelMaxRestartsPerHour":
    "롤링 1시간 창 내에 허용되는 상태 모니터 시작 채널 재시작의 최대 횟수입니다. 이에 도달하면 창이 만료될 때까지 추가 재시작을 건너뜁니다. 기본값: 10.",
  "gateway.tailscale":
    "게이트웨이 시작/종료 시 Serve/Funnel 노출 및 수명 주기 처리를 위한 Tailscale 통합 설정입니다. 배포가 의도적으로 Tailscale 인그레스에 의존하지 않는 한 꺼두세요.",
  "gateway.tailscale.mode":
    'Tailscale 게시 모드: 비공개 또는 공개 노출 경로를 위한 "off", "serve" 또는 "funnel". tailnet 전용 액세스에는 "serve"를 사용하고 공용 인터넷 연결이 필요할 때만 "funnel"을 사용하세요.',
  "gateway.tailscale.resetOnExit":
    "종료 후 오래된 게시 경로를 피하기 위해 게이트웨이 종료 시 Tailscale Serve/Funnel 상태를 재설정합니다. 다른 컨트롤러가 게이트웨이 외부에서 게시 수명 주기를 관리하지 않는 한 활성화 상태로 유지하세요.",
  "gateway.remote":
    "이 인스턴스가 다른 런타임 호스트로 프록시할 때 직접 또는 SSH 전송을 위한 원격 게이트웨이 연결 설정입니다. 분할 호스트 작동이 의도적으로 구성된 경우에만 원격 모드를 사용하세요.",
  "gateway.remote.transport":
    '원격 연결 전송 방식: "direct"는 구성된 URL 연결을 사용하고 "ssh"는 SSH를 통해 터널링합니다. 원격 포트를 노출하지 않고 암호화된 터널 의미가 필요할 때 SSH를 사용하세요.',
  "gateway.reload":
    "편집이 적용되는 방식과 전체 재시작이 트리거되는 시점에 대한 실시간 구성 다시 로드 정책입니다. 다시 로드 내부를 디버깅하지 않는 한 가장 안전한 운영 업데이트를 위해 하이브리드 동작을 유지하세요.",
  "gateway.tls":
    "게이트웨이 프로세스에서 직접 HTTPS를 종료하기 위한 TLS 인증서 및 키 설정입니다. 프로덕션에서는 명시적인 인증서를 사용하고 신뢰할 수 없는 네트워크에서 일반 텍스트 노출을 피하세요.",
  "gateway.tls.enabled":
    "클라이언트가 HTTPS/WSS를 통해 직접 연결되도록 게이트웨이 리스너에서 TLS 종료를 활성화합니다. 인터넷에 직접 노출되거나 신뢰할 수 없는 네트워크 경계의 경우 활성화 상태로 유지하세요.",
  "gateway.tls.autoGenerate":
    "명시적 파일이 구성되지 않은 경우 로컬 TLS 인증서/키 쌍을 자동 생성합니다. 로컬/개발 설정에만 사용하고 프로덕션 트래픽의 경우 실제 인증서로 교체하세요.",
  "gateway.tls.certPath":
    "TLS가 활성화되었을 때 게이트웨이에서 사용하는 TLS 인증서 파일의 시스템 경로입니다. 관리되는 인증서 경로를 사용하고 갱신 자동화를 이 위치에 맞추세요.",
  "gateway.tls.keyPath":
    "TLS가 활성화되었을 때 게이트웨이에서 사용하는 TLS 비공개 키 파일의 시스템 경로입니다. 이 키 파일의 권한을 제한하고 보안 정책에 따라 순환(rotate)하세요.",
  "gateway.tls.caPath":
    "게이트웨이 에지에서 클라이언트 확인 또는 사용자 지정 신뢰 체인 요구 사항을 위한 선택적 CA 번들 경로입니다. 사설 PKI 또는 사용자 지정 인증서 체인이 배포의 일부인 경우 이 경로를 사용하세요.",
  "gateway.http":
    "엔드포인트 토글 및 전송 방향 API 노출 제어를 그룹화하는 게이트웨이 HTTP API 구성입니다. 공격 표면을 줄이기 위해 필요한 엔드포인트만 활성화 상태로 유지하세요.",
  "gateway.http.endpoints":
    "호환성 라우트 및 선택적 통합을 위한 게이트웨이 API 표면의 HTTP 엔드포인트 기능 토글입니다. 의도적으로 엔드포인트를 활성화하고 롤아웃 후 액세스 패턴을 모니터링하세요.",
  "gateway.http.securityHeaders":
    "게이트웨이 프로세스 자체에서 적용하는 선택적 HTTP 응답 보안 헤더입니다. TLS가 종료되는 리버스 프록시에서 이를 설정하는 것이 좋습니다.",
  "gateway.http.securityHeaders.strictTransportSecurity":
    "Strict-Transport-Security 응답 헤더의 값입니다. 완전히 제어하는 HTTPS 출처에만 설정하고, 명시적으로 비활성화하려면 false를 사용하세요.",
  "gateway.remote.url":
    "원격 게이트웨이 WebSocket URL입니다(ws:// 또는 wss://).",
  "gateway.remote.token":
    "토큰 인증 배포에서 클라이언트를 원격 게이트웨이에 인증하는 데 사용되는 Bearer 토큰입니다. 비밀/환경 치환을 통해 저장하고 원격 게이트웨이 인증 변경에 맞춰 함께 순환하세요.",
  "gateway.remote.password":
    "암호 모드가 활성화되었을 때 원격 게이트웨이 인증에 사용되는 암호 자격 증명입니다. 이 비밀은 외부에서 관리하고 커밋된 구성 파일에 일반 텍스트 값을 두지 마세요.",
  "gateway.remote.tlsFingerprint":
    "원격 게이트웨이의 예상 sha256 TLS 지문입니다(MITM 방지를 위해 고정).",
  "gateway.remote.sshTarget":
    "SSH를 통한 원격 게이트웨이(게이트웨이 포트를 로컬 호스트로 터널링). 형식: user@host 또는 user@host:port.",
  "gateway.remote.sshIdentity":
    "선택적 SSH ID 파일 경로입니다(ssh -i에 전달됨).",
  "talk.provider": '활성화된 Talk 제공자 ID입니다(예: "acme-speech").',
  "talk.providers":
    "제공자 ID를 키로 하는 제공자별 Talk 설정입니다. 마이그레이션 중에는 레거시 talk.* 키보다 이를 우선으로 사용하세요.",
  "talk.providers.*":
    "일치하는 제공자 ID에 대한 제공자 소유의 Talk 구성 필드입니다.",
  "talk.providers.*.apiKey": "Talk 모드용 제공자 API 키입니다.", // pragma: allowlist secret
  "talk.speechLocale":
    '장치 노드에서 Talk 음성 인식을 위한 BCP 47 로캘 ID입니다(예: "ru-RU"). 각 장치 기본값을 사용하려면 설정하지 않은 상태로 두세요.',
  "talk.interruptOnSpeech":
    "true(기본값)인 경우 Talk 모드에서 사용자가 말하기 시작하면 어시스턴트의 음성을 중지합니다. 대화형 턴 테이킹을 위해 활성화 상태를 유지하세요.",
  "talk.silenceTimeoutMs": `Talk 모드가 완료되고 현재 스크립트를 전송하기 전까지 사용자가 침묵하는 시간(밀리초)입니다. 플랫폼 기본 일시 중지 시간(${describeTalkSilenceTimeoutDefaults()})을 유지하려면 설정하지 않은 상태로 두세요.`,
  acp: "디스패치 활성화, 백엔드 선택, 허용된 에이전트 대상 제한, 스트리밍 턴 프로젝션 동작 조정을 위한 ACP 런타임 제어입니다.",
  "acp.enabled":
    "전역 ACP 기능 게이트입니다. ACP 런타임 + 정책이 구성되지 않은 경우 비활성화 상태로 유지하세요.",
  "acp.dispatch.enabled":
    "ACP 세션 턴에 대한 독립적인 디스패치 게이트입니다(기본값: true). ACP 턴 실행을 차단하면서 ACP 명령을 사용 가능한 상태로 유지하려면 false로 설정하세요.",
  "acp.backend":
    "기본 ACP 런타임 백엔드 ID입니다(예: acpx). 등록된 ACP 런타임 플러그인 백엔드와 일치해야 합니다.",
  "acp.defaultAgent":
    "ACP 생성 시 명시적 대상을 지정하지 않을 때 사용되는 대체 ACP 대상 에이전트 ID입니다.",
  "acp.allowedAgents":
    "ACP 런타임 세션에 허용된 ACP 대상 에이전트 ID의 허용 목록입니다. 비워두면 추가 허용 목록 제한이 없습니다.",
  "acp.maxConcurrentSessions":
    "이 게이트웨이 프로세스 전체에서 활성화될 수 있는 최대 동시 ACP 세션 수입니다.",
  "acp.stream":
    "청크 크기, 메타데이터 가시성, 중복 제거된 전달 동작을 위한 ACP 스트리밍 프로젝션 제어입니다.",
  "acp.stream.coalesceIdleMs":
    "블록 응답이 방출되기 전 ACP 스트리밍 텍스트의 병합(coalescer) 유휴 플러시 창(밀리초)입니다.",
  "acp.stream.maxChunkChars":
    "여러 블록 응답으로 분할되기 전 ACP 스트리밍 블록 프로젝션의 최대 청크 크기입니다.",
  "acp.stream.repeatSuppression":
    "true(기본값)인 경우 원본 ACP 이벤트는 변경하지 않으면서 턴 내에서 반복되는 ACP 상태/도구 프로젝션 라인을 억제합니다.",
  "acp.stream.deliveryMode":
    "ACP 전달 스타일: live는 출력된 내용을 점진적으로 프로젝션하고, final_only는 터미널 턴 이벤트까지 프로젝션된 모든 ACP 출력을 버퍼링합니다.",
  "acp.stream.hiddenBoundarySeparator":
    "숨겨진 ACP 도구 수명 주기 이벤트가 발생했을 때 다음으로 표시되는 어시스턴트 텍스트 앞에 삽입되는 구분자입니다(none|space|newline|paragraph). 기본값: paragraph.",
  "acp.stream.maxOutputChars":
    "잘림 알림이 방출되기 전 ACP 턴당 프로젝션되는 최대 어시스턴트 출력 문자 수입니다.",
  "acp.stream.maxSessionUpdateChars":
    "프로젝션된 ACP 세션/업데이트 라인(도구/상태 업데이트)의 최대 문자 수입니다.",
  "acp.stream.tagVisibility":
    "ACP 프로젝션을 위한 sessionUpdate별 가시성 재정의입니다(예: usage_update, available_commands_update).",
  "acp.runtime.ttlMinutes":
    "정리 대상이 되기 전 ACP 세션 워커의 유휴 런타임 TTL(분)입니다.",
  "acp.runtime.installCommand":
    "ACP 백엔드 연결이 누락되었을 때 `/acp install` 및 `/acp doctor`에 표시되는 선택적 운영자 설치/설정 명령입니다.",
  commitments:
    "대화 턴에서 자동으로 체크인을 감지하고 하트비트 실행을 통해 이를 전달하기 위한 추론된 후속 조치 약속 제어입니다.",
  "commitments.enabled":
    "추론된 후속 조치 약속에 대해 숨겨진 LLM 추출, 저장, 하트비트 전달을 활성화합니다. 기본값: false.",
  "commitments.maxPerDay":
    "롤링 기준 1일 동안 에이전트 세션당 전달되는 최대 추론 후속 조치 약속 수입니다. 기본값: 3.",
  "agents.list.*.skills":
    "이 에이전트에 대한 선택적 스킬 허용 목록입니다. 생략 시 에이전트는 설정된 경우 agents.defaults.skills를 상속받으며, 그렇지 않으면 스킬은 제한되지 않은 상태로 유지됩니다. 스킬을 부여하지 않으려면 []로 설정하세요. 명시적 목록은 상속된 기본값과 병합되지 않고 이를 완전히 대체합니다.",
  "agents.list[].skills":
    "이 에이전트에 대한 선택적 스킬 허용 목록입니다. 생략 시 에이전트는 설정된 경우 agents.defaults.skills를 상속받으며, 그렇지 않으면 스킬은 제한되지 않은 상태로 유지됩니다. 스킬을 부여하지 않으려면 []로 설정하세요. 명시적 목록은 상속된 기본값과 병합되지 않고 이를 완전히 대체합니다.",
  agents:
    "라우팅 및 실행 컨텍스트에 사용되는 기본값 및 명시적 에이전트 항목을 포함하는 에이전트 런타임 구성 루트입니다. 다중 에이전트 워크플로 전반에서 모델/도구 동작이 예측 가능하도록 이 섹션을 명시적으로 유지하세요.",
  "agents.defaults":
    "agents.list의 각 항목에서 재정의하지 않는 한 에이전트가 상속하는 공유 기본 설정입니다. 기본값을 사용하여 일관된 기준 동작을 강제하고 에이전트별 중복 구성을 줄이세요.",
  "agents.defaults.skills":
    "agents.list[].skills를 생략한 에이전트가 상속하는 선택적 기본 스킬 허용 목록입니다. 제한 없는 스킬의 경우 생략하고, 상속하는 에이전트에 스킬을 주지 않으려면 []로 설정하며, 명시적인 agents.list[].skills는 병합되지 않고 이 기본값을 대체한다는 점을 기억하세요.",
  "agents.defaults.contextLimits":
    "선택된 대량 발췌문 및 주입된 프롬프트 블록에 대해 집중된 에이전트 컨텍스트 예산 기본값입니다. 무제한 호출 경로를 다시 열지 않고도 제한된 읽기/주입 크기를 조정하려면 이를 사용하세요.",
  "agents.defaults.contextLimits.memoryGetMaxChars":
    "잘림 메타데이터 및 계속(continuation) 알림이 추가되기 전 memory_get이 반환하는 기본 최대 문자 수입니다. 이전의 더 큰 발췌문에 근접하도록 늘리되 여전히 제한된 상태로 유지하세요.",
  "agents.defaults.contextLimits.memoryGetDefaultLines":
    "요청 시 줄을 생략할 때 사용되는 기본 memory_get 줄 범위(window)입니다. 이것은 최대 문자 제한이 적용되기 전에 선택되는 소스 줄 수를 제어합니다.",
  "agents.defaults.contextLimits.toolResultMaxChars":
    "잘림 전 단일 라이브 도구 결과에 대해 유지되는 기본 최대 문자 수입니다. 이는 영구적인 라이브 도구 결과 쓰기와 오버플로 복구 잘림 휴리스틱 모두에 영향을 줍니다.",
  "agents.defaults.contextLimits.postCompactionMaxChars":
    "압축 후 컨텍스트 새로 고침 주입 중에 AGENTS.md에서 유지되는 기본 최대 문자 수입니다. 압축 복구 비용을 줄이려면 이 값을 낮추고, 더 긴 시작 지침에 의존하는 에이전트의 경우 값을 높이세요.",
  "agents.list":
    "ID, 그리고 모델, 도구, ID, 작업 영역에 대한 선택적 재정의가 포함된 구성된 에이전트의 명시적 목록입니다. 바인딩, 승인, 세션 라우팅이 결정론적으로 유지되도록 시간이 지나도 ID를 안정적으로 유지하세요.",
  "agents.list[].skillsLimits":
    "스킬 하위 시스템 예산에 대한 선택적 에이전트별 재정의입니다. 두 번째 일반 컨텍스트 제한 경로를 도입하지 않고 에이전트가 다른 스킬 프롬프트 예산을 필요로 할 때 이를 사용하세요.",
  "agents.list[].skillsLimits.maxSkillsPromptChars":
    "스킬 프롬프트 문자 예산에 대한 에이전트별 재정의입니다. 이는 동일한 예산을 contextLimits를 통해 라우팅하는 대신 기존 skills.limits.maxSkillsPromptChars 경로를 확장합니다.",
  "agents.list[].contextLimits":
    "집중된 컨텍스트 예산 조정 노브에 대한 선택적 에이전트별 재정의입니다. 누락된 필드는 agents.defaults.contextLimits를 상속합니다.",
  "agents.list[].contextLimits.memoryGetMaxChars":
    "기본 memory_get 최대 문자 예산에 대한 에이전트별 재정의입니다.",
  "agents.list[].contextLimits.memoryGetDefaultLines":
    "줄을 생략할 때 기본 memory_get 줄 범위에 대한 에이전트별 재정의입니다.",
  "agents.list[].contextLimits.toolResultMaxChars":
    "라이브 도구 결과 최대 문자 예산에 대한 에이전트별 재정의입니다.",
  "agents.list[].contextLimits.postCompactionMaxChars":
    "압축 후 AGENTS.md 발췌문 예산에 대한 에이전트별 재정의입니다.",
  "agents.list[].thinkingDefault":
    "선택적인 에이전트별 기본 생각(thinking) 수준입니다. 메시지별 또는 세션별 재정의가 설정되지 않은 경우 이 에이전트에 대해 agents.defaults.thinkingDefault를 재정의합니다.",
  "agents.list[].reasoningDefault":
    "선택적인 에이전트별 기본 추론 가시성(on|off|stream)입니다. 메시지별 또는 세션 추론 재정의가 설정되지 않은 경우 적용됩니다.",
  "agents.list[].fastModeDefault":
    "빠른 모드에 대한 선택적인 에이전트별 기본값입니다. 메시지별 또는 세션별 빠른 모드 재정의가 설정되지 않은 경우 적용됩니다.",
  "agents.list[].runtime":
    "이 에이전트에 대한 선택적 런타임 설명자입니다. 기본 OpenClaw 실행의 경우 embedded를 사용하고 외부 ACP 하네스 기본값의 경우 acp를 사용하세요.",
  "agents.list[].runtime.type":
    '이 에이전트의 런타임 유형입니다: "embedded"(기본 OpenClaw 런타임) 또는 "acp"(ACP 하네스 기본값).',
  "agents.list[].runtime.acp":
    "runtime.type=acp일 때 이 에이전트에 대한 ACP 런타임 기본값입니다. 바인딩 수준 ACP 재정의는 대화마다 여전히 우선 적용됩니다.",
  "agents.list[].runtime.acp.agent":
    "이 OpenClaw 에이전트에 사용할 선택적 ACP 하네스 에이전트 ID입니다(예: codex, claude, cursor, gemini, openclaw).",
  "agents.list[].runtime.acp.backend":
    "이 에이전트의 ACP 세션에 대한 선택적 ACP 백엔드 재정의입니다(전역 acp.backend로 대체됨).",
  "agents.list[].runtime.acp.mode":
    "이 에이전트에 대한 선택적 ACP 세션 모드 기본값입니다(persistent 또는 oneshot).",
  "agents.list[].runtime.acp.cwd":
    "이 에이전트의 ACP 세션에 대한 선택적 기본 작업 디렉터리입니다.",
  "agents.list[].identity.avatar":
    "아바타 이미지 경로(에이전트 작업 영역에 상대적) 또는 원격 URL/데이터 URL입니다.",
  "agents.defaults.heartbeat.suppressToolErrorWarnings":
    "하트비트 실행 중 도구 오류 경고 페이로드를 억제합니다.",
  "agents.list[].heartbeat.suppressToolErrorWarnings":
    "하트비트 실행 중 도구 오류 경고 페이로드를 억제합니다.",
  "agents.defaults.heartbeat.timeoutSeconds":
    "하트비트 에이전트 턴이 중단되기 전 허용되는 최대 시간(초)입니다. agents.defaults.timeoutSeconds를 사용하려면 설정하지 않은 상태로 두세요.",
  "agents.list[].heartbeat.timeoutSeconds":
    "하트비트 에이전트 턴이 중단되기 전 허용되는 에이전트별 최대 시간(초)입니다. 병합된 하트비트/기본 에이전트 시간 제한을 상속하려면 설정하지 않은 상태로 두세요.",
  "agents.defaults.heartbeat.skipWhenBusy":
    "true인 경우, 하위 에이전트 또는 중첩된 명령 작업 등 특히 바쁜 레인(lane)에서 하트비트 턴을 연기합니다. 크론 레인은 항상 하트비트 턴을 연기합니다.",
  "agents.list[].heartbeat.skipWhenBusy":
    "하위 에이전트 또는 중첩된 명령 작업 등 특히 바쁜 레인에서 하트비트 턴을 연기하는 에이전트별 재정의입니다. 크론 레인은 항상 하트비트 턴을 연기합니다.",
  browser:
    "브라우저 지원 워크플로에서 사용되는 로컬 또는 원격 CDP 연결, 프로필 라우팅, 스크린샷/스냅샷 동작을 위한 브라우저 런타임 제어입니다. 자동화 워크플로에 사용자 지정 브라우저 전송 설정이 필요하지 않은 한 기본값을 유지하세요.",
  "browser.enabled":
    "게이트웨이에서 브라우저 기능 연결을 활성화하여 브라우저 도구 및 CDP 기반 워크플로가 실행될 수 있도록 합니다. 브라우저 자동화가 필요하지 않을 때 표면적과 시작 작업을 줄이려면 비활성화하세요.",
  "browser.cdpUrl":
    "외부에서 관리되는 브라우저 인스턴스에 연결하는 데 사용되는 원격 CDP websocket URL입니다. 중앙 집중식 브라우저 호스트에 이를 사용하고 URL 액세스를 신뢰할 수 있는 네트워크 경로로 제한하세요.",
  "browser.actionTimeoutMs":
    "클라이언트가 대기를 포기하기 전 브라우저 act 요청에 대한 기본 시간 제한(밀리초)입니다. 정상적인 대기나 UI 상호 작용이 기본 요청 예산을 초과할 때 이 값을 높이세요.",
  "browser.localLaunchTimeoutMs":
    "프로세스 시작 후 로컬에서 시작된 관리되는 Chrome이 CDP HTTP 엔드포인트를 노출할 때까지의 시간 제한(밀리초)입니다. 느린 단일 보드 컴퓨터나 오래된 호스트에서 이 값을 높이세요.",
  "browser.localCdpReadyTimeoutMs":
    "프로세스가 발견된 후 로컬에서 시작된 관리되는 브라우저가 CDP websocket 준비를 마칠 때까지의 시간 제한(밀리초)입니다. Chrome은 시작되지만 브라우저 시작 시 여전히 CDP에 접근할 수 없다고 보고될 때 이 값을 높이세요.",
  "browser.color":
    "색상 ID 힌트가 표시되는 브라우저 프로필/UI 큐(cue)에 사용되는 기본 강조 색상입니다. 운영자가 활성 브라우저 프로필 컨텍스트를 빠르게 식별할 수 있도록 일관된 색상을 사용하세요.",
  "browser.executablePath":
    "자동 검색이 호스트 환경에 충분하지 않을 때 사용하는 명시적 브라우저 실행 파일 경로입니다. 재시작 시 런타임 동작이 결정론적으로 유지되도록 절대 안정 경로 또는 OS 홈 디렉터리에 대해 ~로 시작하는 경로를 사용하세요.",
  "browser.headless":
    "로컬 런처가 브라우저 인스턴스를 시작할 때 브라우저 시작을 헤드리스 모드로 강제합니다. 서버 환경에서는 헤드리스를 활성화 상태로 유지하고 표시되는 UI 디버깅이 필요할 때만 비활성화하세요.",
  "browser.noSandbox":
    "런타임에 샌드박싱이 실패하는 환경에 대해 Chromium 샌드박스 격리 플래그를 비활성화합니다. 프로세스 격리 보호가 줄어들기 때문에 가능하면 이 기능을 꺼두세요.",
  "browser.attachOnly":
    "로컬 브라우저 프로세스를 시작하지 않고 브라우저 모드를 연결 전용 동작으로 제한합니다. 원격 CDP 제공자가 모든 브라우저 세션을 외부에서 관리할 때 이를 사용하세요.",
  "browser.cdpPortRangeStart":
    "자동 할당되는 브라우저 프로필 포트에 사용되는 시작 로컬 CDP 포트입니다. 호스트 수준 포트 기본값이 다른 로컬 서비스와 충돌할 때 이 값을 늘리세요.",
  "browser.defaultProfile":
    "호출자가 명시적으로 프로필을 선택하지 않을 때 선택되는 기본 브라우저 프로필 이름입니다. 우발적인 교차 컨텍스트 상태 사용을 줄이기 위해 안정적이고 권한이 낮은 프로필을 기본값으로 사용하세요.",
  "browser.profiles":
    "선택적 메타데이터와 함께 CDP 포트 또는 URL로의 명시적 라우팅에 사용되는 명명된 브라우저 프로필 연결 맵입니다. 프로필 이름을 일관성 있게 유지하고 엔드포인트 정의가 겹치지 않게 하세요.",
  "browser.profiles.*.cdpPort":
    "URL 대신 포트로 브라우저 인스턴스에 연결할 때 사용되는 프로필별 로컬 CDP 포트입니다. 연결 충돌을 피하기 위해 프로필마다 고유한 포트를 사용하세요.",
  "browser.profiles.*.cdpUrl":
    "프로필 이름별 명시적 원격 브라우저 라우팅에 사용되는 프로필별 CDP websocket URL입니다. 원격 호스트나 터널에서 프로필 연결이 종료될 때 이를 사용하세요.",
  "browser.profiles.*.userDataDir":
    "Chrome DevTools MCP를 통한 기존 세션 연결을 위한 프로필별 Chromium 사용자 데이터 디렉터리입니다. 내장된 자동 연결 경로가 선택된 호스트 또는 브라우저 노드에서 잘못된 브라우저 데이터 디렉터리를 선택할 때 Brave, Edge, Chromium 또는 기본이 아닌 Chrome 프로필에 이를 사용하세요. ~로 시작하는 경로는 OS 홈 디렉터리로 확장됩니다.",
  "browser.profiles.*.mcpCommand":
    "기존 세션 연결을 위한 프로필별 Chrome DevTools MCP 명령입니다. 기본값은 npx입니다.",
  "browser.profiles.*.mcpArgs":
    "기존 세션 연결을 위한 추가적인 프로필별 Chrome DevTools MCP 인수입니다(예: --no-usage-statistics). 여기서의 엔드포인트 인수는 내장된 자동 연결 또는 브라우저 URL 선택을 재정의합니다.",
  "browser.profiles.*.driver":
    '프로필별 브라우저 드라이버 모드입니다. CDP 기반 프로필의 경우 "openclaw"(또는 레거시 "clawd")를 사용하거나, 선택된 호스트 또는 브라우저 노드에서 Chrome DevTools MCP 연결을 위해 "existing-session"을 사용하세요.',
  "browser.profiles.*.executablePath":
    "로컬에서 시작되는 관리되는 브라우저 프로필을 위한 프로필별 브라우저 실행 파일 경로입니다. browser.executablePath를 재정의하며 OS 홈 디렉터리에 대해 ~로 시작하는 경로를 허용합니다.",
  "browser.profiles.*.headless":
    "로컬에서 시작된 브라우저 인스턴스에 대한 프로필별 헤드리스 재정의입니다. 다른 모든 프로필에 대해 browser.headless를 강제하지 않고 한 프로필만 헤드리스 상태를 유지해야 할 때 이를 사용하세요.",
  "browser.profiles.*.attachOnly":
    "로컬 브라우저 시작을 건너뛰고 기존 CDP 엔드포인트에만 연결하는 프로필별 연결 전용 재정의입니다. 한 프로필은 외부에서 관리되지만 다른 프로필은 로컬에서 시작될 때 유용합니다.",
  "browser.profiles.*.color":
    "대시보드 및 브라우저 관련 UI 힌트에서 시각적 차별화를 위한 프로필별 강조 색상입니다. 운영자가 활성 프로필을 높은 신호(high-signal)로 인식할 수 있도록 뚜렷한 색상을 사용하세요.",
  "browser.evaluateEnabled":
    "지원되는 경우 런타임 스크립트 평가 기능을 위해 브라우저 측 evaluate 도우미를 활성화합니다. 워크플로가 스냅샷/탐색 이외의 평가 의미(semantics)를 요구하지 않는 한 비활성화 상태로 유지하세요.",
  "browser.snapshotDefaults":
    "호출자가 명시적인 스냅샷 옵션을 제공하지 않을 때 사용되는 기본 스냅샷 캡처 구성입니다. 채널 및 자동화 경로 전반에서 일관된 캡처 동작을 위해 이 값을 조정하세요.",
  "browser.snapshotDefaults.mode":
    "에이전트가 소비할 수 있도록 페이지 콘텐츠가 변환되는 방식을 제어하는 기본 스냅샷 추출 모드입니다. 워크플로에 맞춰 가독성, 충실도(fidelity), 토큰 공간의 균형을 맞추는 모드를 선택하세요.",
  "browser.tabCleanup":
    "기본 에이전트 세션에 의해 열린 브라우저 탭에 대한 최선의 정리 정책입니다. 수명이 긴 게이트웨이 전반에 걸쳐 오래된 샌드박스나 관리되는 브라우저 탭이 누적되지 않도록 활성화 상태를 유지하세요.",
  "browser.tabCleanup.enabled":
    "기본 에이전트 세션에 대해 추적되는 유휴 브라우저 탭의 정리를 활성화합니다. 외부 도구가 탭 수명 주기를 완전히 소유하는 경우에만 비활성화하세요.",
  "browser.tabCleanup.idleMinutes":
    "추적되는 기본 에이전트 브라우저 탭이 닫힘 대상이 되기 전까지의 비활동(분) 시간입니다. 세션별 탭 한도는 유지하면서 유휴 시간 정리를 비활성화하려면 0으로 설정하세요.",
  "browser.tabCleanup.maxTabsPerSession":
    "기본 에이전트 세션당 유지되는 최대 추적 브라우저 탭 수입니다. 가장 오래된 비활성 탭이 먼저 닫힙니다. 한도를 비활성화하려면 0으로 설정하세요.",
  "browser.tabCleanup.sweepMinutes":
    "브라우저 탭 정리 스윕 간격(분)입니다. 백그라운드 작업을 너무 자주 추가하지 않으면서 유휴 탭이 회수될 수 있도록 이 값을 적당하게 유지하세요.",
  "browser.ssrfPolicy":
    "내부 호스트에 도달할 수 있는 브라우저/네트워크 fetch 경로에 대한 서버 측 요청 위조(SSRF) 가드레일 설정입니다. 프로덕션에서는 제한적인 기본값을 유지하고 명시적으로 승인된 대상에만 엽니다.",
  "browser.ssrfPolicy.dangerouslyAllowPrivateNetwork":
    "브라우저 도구에서 사설 네트워크 주소 범위로의 액세스를 허용합니다. 설정하지 않은 경우 기본적으로 비활성화되며 명시적으로 신뢰할 수 있는 사설 네트워크 대상에 대해서만 활성화하세요.",
  "browser.ssrfPolicy.allowedHostnames":
    "브라우저/네트워크 요청의 SSRF 정책 확인에 대한 명시적인 호스트 이름 허용 목록 예외입니다. 범위가 넓은 권한이 오래 남지 않도록 이 목록을 최소로 유지하고 항목을 정기적으로 검토하세요.",
  "browser.ssrfPolicy.hostnameAllowlist":
    "명시적 호스트 예외를 위해 SSRF 정책 소비자가 사용하는 레거시/대체 호스트 이름 허용 목록 필드입니다. 안정적이고 정확한 호스트 이름을 사용하고 와일드카드와 같은 넓은 패턴은 피하세요.",
  "browser.remoteCdpTimeoutMs":
    "브라우저 연결 시도가 실패하기 전 원격 CDP 엔드포인트에 연결하는 데 대한 시간 제한(밀리초)입니다. 대기 시간이 긴 터널의 경우 이 값을 늘리거나, 더 빠른 실패 감지를 위해 값을 낮추세요.",
  "browser.remoteCdpHandshakeTimeoutMs":
    "원격 브라우저 대상을 상대로 한 연결 후 CDP 핸드셰이크 준비 확인에 대한 시간 제한(밀리초)입니다. 시작이 느린 원격 브라우저의 경우 이 값을 높이고, 자동화 루프에서 빨리 실패하게 하려면 값을 낮추세요.",
  "discovery.mdns.mode":
    'mDNS 브로드캐스트 모드("minimal" 기본값, "full"은 cliPath/sshPort 포함, "off"는 mDNS 비활성화).',
  discovery:
    "로컬 mDNS 알림 및 선택적 광역 존재 신호를 위한 서비스 검색 설정입니다. 서비스 메타데이터가 유출되지 않도록 검색 범위를 예상되는 네트워크로 지정하세요.",
  "discovery.wideArea":
    "로컬 링크 범위를 넘어 검색 신호를 노출하기 위한 광역 검색 구성 그룹입니다. 게이트웨이 존재(presence)를 사이트 전반에 걸쳐 의도적으로 집계하는 배포에서만 활성화하세요.",
  "discovery.wideArea.enabled":
    "환경에서 로컬이 아닌 게이트웨이 검색이 필요할 때 광역 검색 신호 전송을 활성화합니다. 교차 네트워크 검색이 운영상 필요하지 않은 한 비활성화 상태로 유지하세요.",
  "discovery.wideArea.domain":
    "광역 검색을 위한 선택적인 유니캐스트 DNS-SD 도메인입니다(예: openclaw.internal). 게이트웨이 검색을 로컬 mDNS 범위를 넘어 의도적으로 게시할 때 이를 사용하세요.",
  "discovery.mdns":
    "로컬 네트워크 알림 및 검색 동작 조정을 위한 mDNS 검색 구성 그룹입니다. 추가 메타데이터가 필요하지 않은 한 일상적인 LAN 검색에는 minimal 모드를 유지하세요.",
  tools:
    "웹, 실행, 미디어, 메시징 및 권한이 상승된 표면 전반에 걸친 전역 도구 액세스 정책 및 기능 구성입니다. 광범위한 롤아웃 전에 위험한 기능을 제한하려면 이 섹션을 사용하세요.",
  "tools.allow":
    "엄격한 환경을 위해 프로필 파생 기본값을 대체하는 절대적인 도구 허용 목록입니다. 엄격하게 선별된 하위 도구 기능 모음을 의도적으로 실행할 때만 이를 사용하세요.",
  "tools.deny":
    "프로필이나 제공자 규칙이 허용하더라도 나열된 도구를 차단하는 전역 도구 거부 목록입니다. 비상 차단(lockout) 및 장기적인 심층 방어를 위해 거부 규칙을 사용하세요.",
  "tools.web":
    "검색/fetch 제공자, 한도 및 대체 동작 조정을 위한 웹 도구 정책 그룹입니다. 활성화된 설정을 API 키 가용성 및 아웃바운드 네트워킹 정책과 일치시키세요.",
  "tools.exec":
    "셸 실행 호스트, 보안 모드, 승인 동작 및 런타임 바인딩을 위한 exec 도구 정책 그룹입니다. 프로덕션에서는 보수적인 기본값을 유지하고 권한이 상승된 실행 경로를 더 엄격하게 하세요.",
  "tools.exec.host":
    '셸 명령에 대한 실행 대상 전략을 선택합니다. 런타임 인식 동작(가능한 경우 샌드박스, 그렇지 않은 경우 게이트웨이)을 원하면 "auto"를 사용하고, 고정된 표면이 필요할 때는 sandbox/gateway/node를 명시적으로 고정하세요.',
  "tools.exec.security":
    "명령 실행에 대한 샌드박스/승인 기대를 제어하는 실행 보안 상태(posture) 선택기입니다. 신뢰할 수 없는 프롬프트에 대해서는 엄격한 보안 모드를 유지하고 신뢰할 수 있는 운영자 워크플로에 대해서만 완화하세요.",
  "tools.exec.ask":
    "exec 명령을 실행하기 전 사람의 확인이 필요한 경우에 대한 승인 전략입니다. 공유 채널에서는 더 엄격한 ask 동작을 사용하고 비공개 운영자 컨텍스트에서는 마찰이 적은 설정을 사용하세요.",
  "tools.exec.node":
    "연결된 노드를 통해 명령 실행이 위임될 때 exec 도구를 위한 노드 바인딩 구성입니다. 다중 노드 라우팅이 필요할 때만 명시적 노드 바인딩을 사용하세요.",
  "tools.agentToAgent":
    "에이전트 간 도구 호출을 허용하고 도달할 수 있는 대상 에이전트를 제한하기 위한 정책입니다. 교차 에이전트 오케스트레이션이 의도적으로 활성화되지 않은 한 비활성화하거나 범위를 좁게 유지하세요.",
  "tools.agentToAgent.enabled":
    "런타임에 한 에이전트가 다른 에이전트를 호출할 수 있도록 agent_to_agent 도구 표면을 활성화합니다. 단순한 배포에서는 꺼두고, 오케스트레이션의 가치가 복잡성을 초과할 때만 활성화하세요.",
  "tools.agentToAgent.allow":
    "오케스트레이션이 활성화되었을 때 agent_to_agent 호출에 허용된 대상 에이전트 ID의 허용 목록입니다. 통제되지 않은 교차 에이전트 호출 그래프를 방지하려면 명시적 허용 목록을 사용하세요.",
  "tools.experimental":
    "실험적인 내장 도구 플래그입니다. 기본적으로 이들을 꺼두고 미리 보기 표면을 의도적으로 테스트할 때만 활성화하세요.",
  "tools.experimental.planTool":
    "복잡한 다단계 작업 추적을 위한 실험적인 구조화된 `update_plan` 도구를 활성화합니다. 엄격한 에이전트 기반(strict-agentic)의 내장형 Pi 실행 외부에서 이 도구를 명시적으로 원하지 않는 한 꺼두세요.",
  "tools.elevated":
    "신뢰할 수 있는 발신자만 접근해야 하는 권한이 필요한 명령 표면에 대한 권한 상승된 도구 액세스 제어입니다. 운영자 워크플로가 명시적으로 권한이 필요한 작업을 요구하지 않는 한 비활성화 상태로 유지하세요.",
  "tools.elevated.enabled":
    "발신자 및 정책 검사를 통과할 때 권한 상승된 도구 실행 경로를 활성화합니다. 공개/공유 채널에서는 비활성화하고 신뢰할 수 있는 소유자 운영 컨텍스트에 대해서만 활성화하세요.",
  "tools.elevated.allowFrom":
    "일반적으로 채널/제공자 ID 형식으로 키가 지정된, 권한 상승된 도구를 위한 발신자 허용 규칙입니다. 의도하지 않은 사용자가 권한 상승된 명령을 트리거할 수 없도록 좁고 명시적인 ID를 사용하세요.",
  "tools.subagents":
    "생성된 하위 에이전트가 부모 기본값과 비교하여 도구 가용성을 제한하거나 확장하도록 하는 도구 정책 래퍼(wrapper)입니다. 위임된 에이전트 기능의 범위를 작업 의도에 맞게 유지하려면 이를 사용하세요.",
  "tools.subagents.tools":
    "하위 에이전트별 강화를 위해 생성된 하위 에이전트 런타임에 적용되는 도구 허용/거부 정책입니다. 하위 에이전트가 반자율 워크플로를 실행할 때 부모 범위보다 이를 좁게 유지하세요.",
  "tools.sandbox":
    "샌드박스 실행이 뚜렷한 기능 경계를 가질 수 있도록 샌드박스 에이전트 실행을 위한 도구 정책 래퍼입니다. 샌드박스 컨텍스트에서 더 강력한 안전을 강제하려면 이를 사용하세요.",
  "tools.sandbox.tools":
    "에이전트가 샌드박스 실행 환경에서 실행될 때 적용되는 허용/거부 도구 정책입니다. 샌드박스 작업이 불필요한 외부 작업으로 에스컬레이션되지 않도록 정책을 최소한으로 유지하세요.",
  web: "웹 기반 채팅 표면을 작동할 때 하트비트 및 재연결 동작을 위한 웹 채널 런타임 설정입니다. 네트워크 안정성 프로필 및 예상 가동 시간(uptime) 요구 사항에 맞게 재연결 값을 조정하여 사용하세요.",
  "web.enabled":
    "웹 채널 런타임 및 관련 websocket 수명 주기 동작을 활성화합니다. 활성 연결 관리 오버헤드를 줄이기 위해 웹 채팅을 사용하지 않을 때는 비활성화하세요.",
  "web.heartbeatSeconds":
    "웹 채널 연결 및 활성 상태 유지를 위한 하트비트 간격(초)입니다. 감지를 빠르게 하려면 짧은 간격을 사용하고 keepalive 트래픽을 줄이려면 긴 간격을 사용하세요.",
  "web.reconnect":
    "전송 실패 후 웹 채널 재연결 시도를 위한 재연결 백오프 정책입니다. 우르르 몰려드는(thundering-herd) 재연결 동작을 피하도록 제한된 재시도 및 지터(jitter)를 조정하세요.",
  "web.reconnect.initialMs":
    "연결 해제 후 첫 번째 재시도 전 초기 재연결 지연 시간(밀리초)입니다. 즉각적인 재시도 폭풍 없이 빠르게 복구하려면 적절한 지연 시간을 사용하세요.",
  "web.reconnect.maxMs":
    "반복적인 실패 시 재연결 지연 증가의 한도를 정하기 위한 최대 재연결 백오프 캡(밀리초)입니다. 장기간의 중단 후에도 시기적절하게 복구되도록 합리적인 캡을 사용하세요.",
  "web.reconnect.factor":
    "웹 채널 재시도 루프에서 재연결 시도 사이에 사용되는 지수 백오프 승수입니다. 대규모 플릿 재연결 동작을 안정적으로 유지하려면 계수를 1보다 크게 유지하고 지터로 조정하세요.",
  "web.reconnect.jitter":
    "중단 이벤트 후 클라이언트의 동기화를 해제하기 위해 재연결 지연에 적용되는 무작위화 요인(0-1)입니다. 다중 클라이언트 배포에서는 동기화된 스파이크를 줄이기 위해 지터를 0이 아닌 값으로 유지하세요.",
  "web.reconnect.maxAttempts":
    "현재 실패 시퀀스에 대해 포기하기 전 최대 재연결 시도 횟수입니다(0은 재시도 없음을 의미). 자동화에 민감한 환경에서 통제된 실패 처리를 위해 유한한 캡을 사용하세요.",
  "web.whatsapp":
    "Baileys에 직접 전달되는 WhatsApp 웹 소켓 타이밍 제어입니다. 네트워크 에지, 프록시 또는 NAT가 그 외에는 정상적인 WhatsApp 웹 세션을 닫아버릴 때 이를 조정하세요.",
  "web.whatsapp.keepAliveIntervalMs":
    "Baileys WhatsApp 웹 애플리케이션 ping 간격(밀리초)입니다. 이 값을 낮추면 유휴 링크를 더 일찍 감지하고 새로 고칩니다. 네트워크의 유휴 흐름(idle-flow) 시간 제한보다 여유 있게 낮게 유지하세요.",
  "web.whatsapp.connectTimeoutMs":
    "Baileys가 WhatsApp WebSocket 시작 핸드셰이크를 기다리는 최대 시간(밀리초)입니다. 핸드셰이크 열기 시 408 시간 초과를 보고하는 느리거나 손실이 있는 네트워크에서는 더 높은 값을 사용하세요.",
  "web.whatsapp.defaultQueryTimeoutMs":
    "WhatsApp 웹 요청에 대한 기본 Baileys 쿼리 시간 제한(밀리초)입니다. 네트워크별 조사를 통해 쿼리에 더 긴 시간이 필요하다는 것이 밝혀지지 않는 한 업스트림과 일치하게 유지하세요.",
  canvasHost:
    "캔버스 지원 워크플로에서 사용하는 캔버스 에셋 제공 및 로컬 라이브 리로드 동작을 위한 캔버스 호스트 설정입니다. 캔버스 호스팅 에셋이 적극적으로 사용되지 않는 한 비활성화 상태로 유지하세요.",
  "canvasHost.enabled":
    "캔버스 파일을 제공하기 위해 캔버스 호스트 서버 프로세스 및 라우트를 활성화합니다. 캔버스 워크플로가 비활성 상태일 때는 노출된 로컬 서비스를 줄이기 위해 비활성화하세요.",
  "canvasHost.root":
    "캔버스 콘텐츠 및 정적 에셋을 위해 캔버스 호스트가 제공하는 파일 시스템 루트 디렉터리입니다. 전용 디렉터리를 사용하고 최소 권한 파일 노출을 위해 광범위한 저장소 루트를 피하세요.",
  "canvasHost.port":
    "캔버스 호스팅이 활성화되었을 때 캔버스 호스트 HTTP 서버가 사용하는 TCP 포트입니다. 충돌하지 않는 포트를 선택하고 방화벽/프록시 정책을 이에 맞게 조정하세요.",
  "canvasHost.liveReload":
    "개발 워크플로 중 캔버스 에셋에 대한 자동 라이브 리로드 동작을 활성화합니다. 결정론적 출력이 선호되는 프로덕션 유사 환경에서는 비활성화 상태로 유지하세요.",
  talk: "음성 ID, 모델 선택, 출력 형식 및 중단 동작을 위한 Talk 모드 음성 합성 설정입니다. 대기 시간과 비용을 제어하면서 사람을 대하는 음성 UX를 조정하려면 이 섹션을 사용하세요.",
  "gateway.auth.token":
    "게이트웨이 액세스에 기본적으로 요구됩니다(Tailscale Serve ID를 사용하지 않는 한). 루프백이 아닌 바인드에는 필수입니다.",
  "gateway.auth.password": "Tailscale funnel에 필요합니다.",
  "agents.defaults.sandbox.browser.network":
    "샌드박스 브라우저 컨테이너를 위한 Docker 네트워크입니다(기본값: openclaw-sandbox-browser). 더 엄격한 격리가 필요한 경우 bridge를 피하세요.",
  "agents.list[].sandbox.browser.network":
    "샌드박스 브라우저 Docker 네트워크에 대한 에이전트별 재정의입니다.",
  "agents.defaults.sandbox.docker.dangerouslyAllowContainerNamespaceJoin":
    "샌드박스 Docker 네트워크 모드 container:<id>를 허용하는 위험한(DANGEROUS) 비상 재정의입니다. 이는 다른 컨테이너 네임스페이스와 조인하여 샌드박스 격리를 약화시킵니다.",
  "agents.list[].sandbox.docker.dangerouslyAllowContainerNamespaceJoin":
    "샌드박스 Docker 네트워크 모드에서 컨테이너 네임스페이스 조인을 위한 에이전트별 위험한(DANGEROUS) 재정의입니다.",
  "agents.defaults.sandbox.docker.gpus":
    '--gpus에 전달되는 선택적인 Docker GPU 패스스루 값입니다(예: "all" 또는 "device=GPU-uuid"). NVIDIA Container Toolkit과 같은 호환되는 호스트 런타임이 필요합니다.',
  "agents.list[].sandbox.docker.gpus":
    "샌드박스 컨테이너를 위한 에이전트별 Docker GPU 패스스루 재정의입니다.",
  "agents.defaults.sandbox.browser.cdpSourceRange":
    "컨테이너 에지 CDP 인그레스(ingress)에 대한 선택적 CIDR 허용 목록입니다(예: 172.21.0.1/32).",
  "agents.list[].sandbox.browser.cdpSourceRange":
    "CDP 소스 CIDR 허용 목록에 대한 에이전트별 재정의입니다.",
  "gateway.controlUi.basePath":
    "제어 UI가 제공되는 선택적 URL 접두사입니다(예: /openclaw).",
  "gateway.controlUi.root":
    "제어 UI 에셋을 위한 선택적 파일 시스템 루트입니다(기본값은 dist/control-ui).",
  "gateway.controlUi.embedSandbox":
    '호스팅된 제어 UI 임베드를 위한 iframe 샌드박스 정책입니다. "strict"는 스크립트를 비활성화하고, "scripts"는 출처 격리를 유지하면서 대화형 임베드를 허용하며(기본값), "trusted"는 의도적으로 더 강력한 권한이 필요한 동일 사이트(same-site) 문서에 대해 `allow-same-origin`을 추가합니다.',
  "gateway.controlUi.allowExternalEmbedUrls":
    "호스팅된 임베드가 절대 외부 http(s) URL을 로드할 수 있도록 허용하는 위험한(DANGEROUS) 토글입니다. 제어 UI가 의도적으로 신뢰할 수 있는 서드파티 페이지를 임베드하지 않는 한 꺼두세요. 호스팅된 /__openclaw__/canvas 및 /__openclaw__/a2ui 문서에는 이 설정이 필요하지 않습니다.",
  "gateway.controlUi.chatMessageMaxWidth":
    '그룹화된 제어 UI 채팅 메시지에 대한 선택적 CSS 최대 너비입니다(예: "960px", "82%" 또는 "min(1280px, 82%)"). 값은 브라우저에 도달하기 전 제한된 너비 문법에 따라 검증됩니다.',
  "gateway.controlUi.allowedOrigins":
    '제어 UI/웹 채팅 websocket 연결에 허용된 브라우저 출처입니다(전체 출처만 가능, 예: https://control.example.com). 위험한 Host 헤더 대체가 명시적으로 활성화되지 않는 한, 루프백이 아닌 제어 UI 배포에 필수입니다. ["*"] 설정은 모든 브라우저 출처를 허용한다는 의미이며 꽉 통제된 로컬 테스트 외부에서는 피해야 합니다.',
  "gateway.controlUi.dangerouslyAllowHostHeaderOriginFallback":
    "제어 UI/웹 채팅 websocket 검사를 위해 Host 헤더 기반 출처 대체를 활성화하는 위험한(DANGEROUS) 토글입니다. 이 모드는 배포가 의도적으로 Host 헤더 출처 정책에 의존할 때 지원됩니다. 명시적인 gateway.controlUi.allowedOrigins가 권장되는 강화된 기본값으로 유지됩니다.",
  "gateway.controlUi.allowInsecureAuth":
    "비표준 설정을 실행해야 할 때 제어 UI에 대한 엄격한 브라우저 인증 검사를 완화합니다. 가장(impersonation) 위험이 높으므로 네트워크 및 프록시 경로를 신뢰하지 않는 한 꺼두세요.",
  "gateway.controlUi.dangerouslyDisableDeviceAuth":
    "제어 UI 장치 ID 검사를 비활성화하고 토큰/암호에만 의존합니다. 신뢰할 수 있는 네트워크에서 수명이 짧은 디버깅에만 사용한 다음 즉시 끄세요.",
  "gateway.push":
    "게이트웨이가 페어링된 장치를 깨우거나 알림을 보내야 할 때 사용하는 푸시 전달 설정입니다. 공식 iOS 빌드에 대해서는 여기서 릴레이 지원 APN을 구성하세요. 로컬/수동 빌드의 경우 직접 APN 인증은 환경 기반(env-based)으로 유지됩니다.",
  "gateway.push.apns":
    "이 게이트웨이에 페어링된 iOS 장치에 대한 APN 전달 설정입니다. 외부 푸시 릴레이를 통해 등록하는 공식/TestFlight 빌드에는 릴레이 설정을 사용하세요.",
  "gateway.push.apns.relay":
    "릴레이 지원 APN 전송을 위한 외부 릴레이 설정입니다. 페어링된 공식 iOS 빌드가 릴레이 지원 등록을 게시한 후, 게이트웨이는 push.test, 깨우기 넛지, 재연결 깨우기를 위해 이 릴레이를 사용합니다.",
  "gateway.push.apns.relay.baseUrl":
    "공식/TestFlight iOS 빌드에서 사용하는 외부 APN 릴레이 서비스의 기본 HTTPS URL입니다. 등록 및 전송 트래픽이 동일한 배포에 도달할 수 있도록 이 URL을 iOS 빌드에 구워진 릴레이 URL과 일치하게 유지하세요.",
  "gateway.push.apns.relay.timeoutMs":
    "게이트웨이에서 APN 릴레이로 보내는 릴레이 전송 요청의 시간 제한(밀리초)입니다(기본값: 10000). 느린 릴레이나 네트워크의 경우 이 값을 늘리고 깨우기 시도를 더 빨리 실패하게 하려면 값을 낮추세요.",
  "gateway.http.endpoints.chatCompletions.enabled":
    "OpenAI 호환 `POST /v1/chat/completions` 엔드포인트를 활성화합니다(기본값: false).",
  "gateway.http.endpoints.chatCompletions.maxBodyBytes":
    "`/v1/chat/completions`에 대한 최대 요청 본문 크기(바이트)입니다(기본값: 20MB).",
  "gateway.http.endpoints.chatCompletions.maxImageParts":
    "최신 사용자 메시지에서 허용되는 `image_url` 파트의 최대 개수입니다(기본값: 8).",
  "gateway.http.endpoints.chatCompletions.maxTotalImageBytes":
    "한 요청에서 모든 `image_url` 파트 전체의 누적 디코딩 바이트 최대치입니다(기본값: 20MB).",
  "gateway.http.endpoints.chatCompletions.images":
    "OpenAI 호환 `image_url` 파트에 대한 이미지 fetch/검증 제어입니다.",
  "gateway.http.endpoints.chatCompletions.images.allowUrl":
    "`image_url` 파트에 대한 서버 측 URL fetch를 허용합니다(기본값: false; 데이터 URI는 계속 지원됨). URL fetch를 완전히 비활성화하려면 이를 `false`로 설정하세요.",
  "gateway.http.endpoints.chatCompletions.images.urlAllowlist":
    "`image_url` URL fetch를 위한 선택적인 호스트 이름 허용 목록입니다. 정확한 호스트와 `*.example.com` 형태의 와일드카드를 지원합니다. 목록을 비우거나 생략하면 호스트 이름 허용 목록 제한이 없습니다.",
  "gateway.http.endpoints.chatCompletions.images.allowedMimes":
    "`image_url` 파트에 허용되는 MIME 유형입니다(대소문자 구분 없는 목록).",
  "gateway.http.endpoints.chatCompletions.images.maxBytes":
    "fetch/디코딩된 각 `image_url` 이미지의 최대 바이트 수입니다(기본값: 10MB).",
  "gateway.http.endpoints.chatCompletions.images.maxRedirects":
    "`image_url` URL을 가져올 때 허용되는 최대 HTTP 리디렉션 수입니다(기본값: 3).",
  "gateway.http.endpoints.chatCompletions.images.timeoutMs":
    "`image_url` URL fetch의 시간 제한(밀리초)입니다(기본값: 10000).",
  "gateway.reload.mode":
    '구성 편집이 적용되는 방식을 제어합니다: "off"는 실시간 편집을 무시하고, "restart"는 항상 재시작하며, "hot"은 프로세스 내에서 적용하고, "hybrid"는 hot을 시도한 다음 필요한 경우 재시작합니다. 일상적인 업데이트를 가장 안전하게 하려면 "hybrid"를 유지하세요.',
  "gateway.reload.debounceMs":
    "구성 변경을 적용하기 전의 디바운스 창(ms)입니다.",
  "gateway.reload.deferralTimeoutMs":
    "강제 재시작 전 진행 중인 작업을 기다릴 최대 시간(ms, 선택 사항)입니다. 생략하면 기본 제한 대기 시간이 사용되며, 0으로 설정하면 주기적으로 진행 중이라는 경고와 함께 무기한 대기합니다. 양수 값을 낮게 설정하면 활성 하위 에이전트 LLM 호출이 중단될 위험이 있습니다.",
  "gateway.nodes.browser.mode":
    '노드 브라우저 라우팅입니다("auto" = 연결된 단일 브라우저 노드 선택, "manual" = 노드 매개변수 필요, "off" = 비활성화).',
  "gateway.nodes.browser.node":
    "특정 노드 ID 또는 이름에 브라우저 라우팅을 고정합니다(선택 사항).",
  "gateway.nodes.pairing":
    "노드 페어링 정책 설정입니다. 기본값은 CIDR 자동 승인을 비활성화한 상태로 유지합니다. 귀하가 제어하는 명시적이고 신뢰할 수 있는 CIDR/IP 허용 목록을 통해서만 활성화하세요.",
  "gateway.nodes.pairing.autoApproveCidrs":
    "요청된 범위(scope) 없이 처음 노드 역할 장치 페어링을 자동 승인하기 위한 옵트인(opt-in) CIDR/IP 허용 목록입니다. 설정하지 않으면 비활성화됩니다. 운영자, 브라우저, 제어 UI 및 그 외 역할, 범위, 메타데이터 또는 공개 키 업그레이드 페어링은 여전히 수동 승인이 필요합니다.",
  "gateway.nodes.allowCommands":
    "게이트웨이 기본값 외에 추가로 허용할 node.invoke 명령입니다(명령 문자열 배열). 여기에 위험한 명령을 활성화하는 것은 보안에 민감한 재정의이며 `openclaw security audit`에 의해 플래그가 지정됩니다.",
  "gateway.nodes.denyCommands":
    "노드 클레임이나 기본 허용 목록에 있더라도 차단할 노드 명령 이름입니다(정확한 명령 이름 일치만 가능, 예: `system.run`; 해당 명령 내부의 셸 텍스트는 검사하지 않음).",
  "gateway.webchat.chatHistoryMaxChars":
    "잘림 전 chat.history 응답의 텍스트 필드당 최대 문자 수입니다(기본값: 12000).",
  nodeHost:
    "이 게이트웨이 노드에서 다른 노드나 클라이언트로 노출되는 기능에 대한 노드 호스트 제어입니다. 노드 네트워크를 통해 로컬 기능을 의도적으로 프록시하지 않는 한 기본값을 유지하세요.",
  "nodeHost.browserProxy":
    "노드 라우팅을 통해 로컬 브라우저 제어를 노출하기 위한 browser-proxy 설정을 그룹화합니다. 원격 노드 워크플로에 로컬 브라우저 프로필이 필요할 때만 활성화하세요.",
  "nodeHost.browserProxy.enabled":
    "원격 클라이언트가 이 호스트의 브라우저 기능을 사용할 수 있도록 노드 프록시 라우팅을 통해 로컬 브라우저 제어 서버를 노출합니다. 원격 자동화가 명시적으로 의존하지 않는 한 비활성화 상태로 유지하세요.",
  "nodeHost.browserProxy.allowProfiles":
    "노드 프록시 라우팅을 통해 노출되는 선택적 브라우저 프로필 이름 허용 목록입니다. 프로필 생성/삭제 라우트를 포함한 기본 전체 프로필 표면을 유지하려면 비워 두세요. 설정 시 OpenClaw는 최소 권한 프로필 액세스를 적용하고 프록시를 통한 영구적 프로필 생성/삭제를 차단합니다.",
  media:
    "인바운드 파일을 처리하는 제공자 및 도구 전반에서 공유되는 최상위 미디어 동작입니다. 외부 처리 파이프라인을 위해 안정적인 파일 이름이 필요하거나 인바운드 미디어를 더 오래 보존해야 하는 경우가 아니면 기본값을 유지하세요.",
  "media.preserveFilenames":
    "활성화된 경우, 업로드된 미디어는 생성된 임시 안전 이름 대신 원본 파일 이름을 유지합니다. 다운스트림 자동화가 안정적인 이름에 의존할 때 이 기능을 켜고, 우발적인 파일 이름 유출을 줄이려면 꺼두세요.",
  "media.ttlHours":
    "전체 미디어 트리에서 유지되는 인바운드 미디어 정리를 위한 선택적 보존 시간(시간)입니다. 레거시 동작을 보존하려면 설정하지 않은 상태로 두고, 자동 정리를 원하면 24(1일) 또는 168(7일)과 같은 값을 설정하세요.",
  audio:
    "상위 수준 도구가 음성 또는 미디어 콘텐츠를 처리하기 전에 사용되는 전역 오디오 수집 설정입니다. 음성 메모 및 클립에 대한 결정론적인 기록 동작이 필요할 때 이를 구성하세요.",
  "audio.transcription":
    "에이전트 처리 전 오디오 파일을 텍스트로 변환하기 위한 명령 기반 기록 설정입니다. 로그에서 오류를 진단하기 쉽도록 단순하고 결정론적인 명령 경로를 유지하세요.",
  "audio.transcription.command":
    '오디오 기록에 사용되는 실행 파일 + 인수입니다(첫 번째 토큰은 안전한 바이너리/경로여야 함). 예: `["whisper-cli", "--model", "small", "{{MediaPath}}"]`. 더 이상 사용되지 않는 `{input}` 자리 표시자는 `openclaw doctor --fix`에 의해 `{{MediaPath}}`로 마이그레이션됩니다.',
  "audio.transcription.timeoutSeconds":
    "중단되기 전 기록 명령이 완료될 수 있도록 허용되는 최대 시간입니다. 더 긴 녹음의 경우 이 값을 늘리고 지연 시간에 민감한 배포에서는 짧게 유지하세요.",
  bindings:
    "라우팅 및 지속적인 ACP 대화 소유권을 위한 최상위 바인딩 규칙입니다. 일반 라우팅에는 type=route를 사용하고 영구적인 ACP 하네스 바인딩에는 type=acp를 사용하세요.",
  "bindings[].type":
    '바인딩 종류입니다. 일반 라우팅에는 "route"(또는 레거시 라우트 항목의 경우 생략)를 사용하고, 영구적인 ACP 대화 바인딩에는 "acp"를 사용하세요.',
  "bindings[].agentId":
    "해당 바인딩 일치 규칙이 충족될 때 트래픽을 수신하는 대상 에이전트 ID입니다. 라우팅이 런타임에 실패하지 않도록 유효하고 구성된 에이전트 ID만 사용하세요.",
  "bindings[].session":
    "이 바인딩과 일치하는 대화에 대한 선택적 라우트 세션 재정의입니다. 좁은 범위의 라우트가 동일한 에이전트를 유지하되 세션 연속성을 다르게 격리해야 할 때 이를 사용하세요.",
  "bindings[].session.dmScope":
    '이 라우트 바인딩에 대한 선택적 DM 세션 범위 재정의입니다. 예를 들어 전역 session.dmScope="main"을 유지하면서 선택된 직접 피어(peer)에 대해서는 "per-account-channel-peer"를 사용할 수 있습니다.',
  "bindings[].match":
    "채널 및 선택적 계정/피어 제약을 포함하여 바인딩 적용 시기를 결정하기 위한 일치 규칙 객체입니다. 컨텍스트 전반에서 우발적인 에이전트 탈취를 방지하기 위해 규칙을 좁게 유지하세요.",
  "bindings[].match.channel":
    "이 바인딩이 적용되는 채널/제공자 식별자(예: `telegram`, `discord` 또는 플러그인 채널 ID)입니다. 바인딩 평가가 안정적으로 작동하도록 구성된 채널 키를 정확하게 사용하세요.",
  "bindings[].match.accountId":
    "다중 계정 채널 설정에서 바인딩이 하나의 ID에만 적용되도록 하는 선택적 계정 선택기입니다. 라우트에 계정 범위 지정이 필요한 경우 이를 사용하고 그렇지 않은 경우 설정하지 않은 상태로 두세요.",
  "bindings[].match.peer":
    "피어 종류 및 피어 ID를 포함하여 특정 대화에 대한 선택적 피어 일치 도구입니다. 단일 직접(direct)/그룹/채널 대상만 에이전트에 고정해야 할 때 이를 사용하세요.",
  "bindings[].match.peer.kind":
    '피어 대화 유형입니다: "direct", "group", "channel" 또는 레거시 "dm"(direct에 대해 더 이상 사용되지 않는 별칭). 새 구성에서는 "direct"를 선호하고 종류를 채널 의미 체계에 일치하도록 유지하세요.',
  "bindings[].match.peer.id":
    "제공자의 채팅 ID, 채널 ID 또는 그룹 ID와 같이 피어 일치와 함께 사용되는 대화 식별자입니다. 조용한 일치 실패를 피하기 위해 이 값을 정확하게 유지하세요.",
  "bindings[].match.guildId":
    "다중 서버 배포에서 바인딩 평가를 위한 선택적인 Discord 스타일 길드/서버 ID 제약입니다. 동일한 피어 식별자가 다른 길드 전반에 나타날 수 있을 때 이를 사용하세요.",
  "bindings[].match.teamId":
    "채팅 범위를 팀 아래로 지정하는 제공자가 사용하는 선택적인 팀/작업 영역 ID 제약입니다. 단일 작업 영역 컨텍스트로 격리된 바인딩이 필요할 때 이를 추가하세요.",
  "bindings[].match.roles":
    "채팅 컨텍스트에 역할을 연결하는 제공자가 사용하는 선택적 역할 기반 필터 목록입니다. 권한이 있는 트래픽 또는 운영 역할 트래픽을 특수 에이전트로 라우팅할 때 이를 사용하세요.",
  "bindings[].acp":
    "bindings[].type=acp에 대한 선택적인 바인딩별 ACP 재정의입니다. 이 계층은 일치하는 대화에 대해 agents.list[].runtime.acp 기본값을 재정의합니다.",
  "bindings[].acp.mode":
    "이 바인딩에 대한 ACP 세션 모드 재정의입니다(persistent 또는 oneshot).",
  "bindings[].acp.label":
    "이 바인딩된 대화에서 ACP 상태/진단을 위한 사람 친화적인 레이블입니다.",
  "bindings[].acp.cwd":
    "이 바인딩에서 생성된 ACP 세션에 대한 작업 디렉터리 재정의입니다.",
  "bindings[].acp.backend":
    "이 바인딩에 대한 ACP 백엔드 재정의입니다(에이전트 런타임 ACP 백엔드로 대체된 다음 전역 acp.backend로 대체됨).",
  broadcast:
    "소스 대화당 여러 피어 ID로 동일한 아웃바운드 메시지를 보내기 위한 브로드캐스트 라우팅 맵입니다. 하나의 소스가 많은 목적지로 팬아웃(fan-out)할 수 있으므로 이를 최소화하고 감사해야 합니다.",
  "broadcast.strategy":
    '브로드캐스트 팬아웃의 전달 순서입니다: "parallel"은 모든 대상에 동시에 전송하고, "sequential"은 차례대로 전송합니다. 속도를 위해서는 "parallel"을 사용하고 더 엄격한 순서/배압(backpressure) 제어를 위해서는 "sequential"을 사용하세요.',
  "broadcast.*":
    "각 키가 소스 피어 ID이고 값이 대상 피어 ID의 배열인 소스별 브로드캐스트 대상 목록입니다. 실수로 인한 메시지 증폭을 피하기 위해 목록을 의도적으로 유지하세요.",
  "diagnostics.flags":
    '플래그별로 대상 진단 로그를 활성화합니다(예: ["telegram.http"]). "telegram.*" 또는 "*"와 같은 와일드카드를 지원합니다.',
  "diagnostics.enabled":
    "로그 및 원격 측정 연결 경로의 진단 계측 출력을 위한 마스터 토글입니다. 기본값은 활성화입니다; 꽉 통제된 환경에서만 false로 설정하세요.",
  "diagnostics.stuckSessionWarnMs":
    "긴 처리 세션을 장기 실행, 지연, 또는 중단으로 분류하기 위한 무진행(no-progress) 기간 임계값(밀리초)입니다. 응답, 도구, 상태, 블록, ACP 진행 상황은 타이머를 재설정합니다; 변경되지 않는 동안에는 반복적인 중단 진단이 백오프됩니다.",
  "diagnostics.otel.enabled":
    "구성된 엔드포인트/프로토콜 설정에 따라 추적, 메트릭, 로그를 위한 OpenTelemetry 내보내기 파이프라인을 활성화합니다. 수집기(collector) 엔드포인트 및 인증이 완전히 구성되지 않은 한 비활성화 상태로 유지하세요.",
  "diagnostics.otel.endpoint":
    "스킴(scheme) 및 포트를 포함하여 OpenTelemetry 내보내기 전송에 사용되는 수집기 엔드포인트 URL입니다. 도달 가능하고 신뢰할 수 있는 수집기 엔드포인트를 사용하고 롤아웃 후 수집 오류를 모니터링하세요.",
  "diagnostics.otel.tracesEndpoint":
    "신호별 OTLP/HTTP 추적 엔드포인트입니다. 설정된 경우 추적 내보내기에 한해 diagnostics.otel.endpoint 및 OTEL_EXPORTER_OTLP_ENDPOINT를 재정의합니다.",
  "diagnostics.otel.metricsEndpoint":
    "신호별 OTLP/HTTP 메트릭 엔드포인트입니다. 설정된 경우 메트릭 내보내기에 한해 diagnostics.otel.endpoint 및 OTEL_EXPORTER_OTLP_ENDPOINT를 재정의합니다.",
  "diagnostics.otel.logsEndpoint":
    "신호별 OTLP/HTTP 로그 엔드포인트입니다. 설정된 경우 로그 내보내기에 한해 diagnostics.otel.endpoint 및 OTEL_EXPORTER_OTLP_ENDPOINT를 재정의합니다.",
  "diagnostics.otel.protocol":
    '원격 측정 내보내기를 위한 OTel 전송 프로토콜입니다: 수집기 지원 여부에 따라 "http/protobuf" 또는 "grpc"입니다. 원격 측정 페이로드가 손실되지 않도록 관찰 가능성 백엔드가 기대하는 프로토콜을 사용하세요.',
  "diagnostics.otel.headers":
    "OpenTelemetry 내보내기 요청과 함께 전송되는 추가 HTTP/gRPC 메타데이터 헤더로, 종종 테넌트 인증이나 라우팅에 사용됩니다. 비밀은 환경 기반 값으로 유지하고 불필요하게 헤더가 늘어나는 것을 피하세요.",
  "diagnostics.otel.serviceName":
    "관찰 가능성 백엔드에서 이 게이트웨이 인스턴스를 식별하기 위해 원격 측정 리소스 속성에 보고되는 서비스 이름입니다. 대시보드 및 경고가 배포 전반에서 일관되게 유지되도록 안정적인 이름을 사용하세요.",
  "diagnostics.otel.traces":
    "구성된 OpenTelemetry 수집기 엔드포인트로 추적 신호 내보내기를 활성화합니다. 지연 시간/디버그 추적이 필요할 때 활성화 상태로 유지하고 메트릭/로그만 원할 경우 비활성화하세요.",
  "diagnostics.otel.metrics":
    "구성된 OpenTelemetry 수집기 엔드포인트로 메트릭 신호 내보내기를 활성화합니다. 런타임 상태 대시보드를 위해 활성화 상태로 유지하고 측정 항목 볼륨을 최소화해야 할 때만 비활성화하세요.",
  "diagnostics.otel.logs":
    "로컬 로깅 싱크에 추가하여 OpenTelemetry를 통한 로그 신호 내보내기를 활성화합니다. 서비스 및 에이전트 전반에서 중앙 집중식 로그 상관관계가 필요할 때 이를 사용하세요.",
  "diagnostics.otel.sampleRate":
    "관찰 가능성 백엔드로 내보내지는 추적 트래픽의 양을 제어하는 추적 샘플링 속도(0-1)입니다. 속도가 낮으면 오버헤드/비용이 줄어들고, 속도가 높으면 디버깅 충실도가 향상됩니다.",
  "diagnostics.otel.flushIntervalMs":
    "버퍼에서 수집기로의 주기적인 원격 측정 플러시 간격(밀리초)입니다. 내보내기 트래픽을 줄이려면 값을 늘리고 활성 인시던트 대응 중 더 빠른 가시성을 확보하려면 값을 줄이세요.",
  "diagnostics.otel.captureContent":
    "옵트인(opt-in) OTEL 스팬 콘텐츠 캡처입니다. 기본값은 꺼짐(off)입니다. 부울 값 true는 시스템이 아닌 메시지/도구 콘텐츠를 캡처하는 반면 객체 형식을 사용하면 특정 콘텐츠 클래스를 활성화할 수 있습니다.",
  "diagnostics.otel.captureContent.enabled":
    "세분화된 OTEL 콘텐츠 캡처 필드를 위한 마스터 스위치입니다. 수집기가 원시 프롬프트, 응답, 또는 도구 콘텐츠를 승인받지 않은 한 비활성화 상태로 유지하세요.",
  "diagnostics.otel.captureContent.inputMessages":
    "콘텐츠 캡처가 활성화된 경우 OTEL 스팬에서 모델 입력 메시지 텍스트를 캡처합니다.",
  "diagnostics.otel.captureContent.outputMessages":
    "콘텐츠 캡처가 활성화된 경우 OTEL 스팬에서 모델 출력 메시지 텍스트를 캡처합니다.",
  "diagnostics.otel.captureContent.toolInputs":
    "콘텐츠 캡처가 활성화된 경우 OTEL 스팬에서 도구 입력 텍스트를 캡처합니다.",
  "diagnostics.otel.captureContent.toolOutputs":
    "콘텐츠 캡처가 활성화된 경우 OTEL 스팬에서 도구 출력 텍스트를 캡처합니다.",
  "diagnostics.otel.captureContent.systemPrompt":
    "콘텐츠 캡처가 활성화된 경우 OTEL 스팬에서 시스템 프롬프트 텍스트를 캡처합니다. 명시적으로 활성화하지 않는 한 꺼진 상태를 유지합니다.",
  "diagnostics.cacheTrace.enabled":
    "내장된 에이전트 실행에 대한 캐시 추적 스냅샷을 기록합니다(기본값: false).",
  "diagnostics.cacheTrace.filePath":
    "캐시 추적 로그에 대한 JSONL 출력 경로입니다(기본값: $OPENCLAW_STATE_DIR/logs/cache-trace.jsonl).",
  "diagnostics.cacheTrace.includeMessages":
    "추적 출력에 전체 메시지 페이로드를 포함합니다(기본값: true).",
  "diagnostics.cacheTrace.includePrompt":
    "추적 출력에 프롬프트 텍스트를 포함합니다(기본값: true).",
  "diagnostics.cacheTrace.includeSystem":
    "추적 출력에 시스템 프롬프트를 포함합니다(기본값: true).",
  "tools.exec.applyPatch.enabled":
    "도구 정책에 의해 허용된 경우 OpenAI 및 OpenAI Codex 모델에 대해 apply_patch를 활성화하거나 비활성화합니다(기본값: true).",
  "tools.exec.applyPatch.workspaceOnly":
    "apply_patch 경로를 작업 영역 디렉터리로 제한합니다(기본값: true). 작업 영역 외부 쓰기를 허용하려면 false로 설정하세요(위험).",
  "tools.exec.applyPatch.allowModels":
    '모델 ID의 선택적 허용 목록입니다(예: "gpt-5.4" 또는 "openai/gpt-5.4").',
  "tools.loopDetection.enabled":
    "반복적인 도구 호출 루프 감지 및 백오프 안전 확인을 활성화합니다(기본값: false).",
  "tools.loopDetection.historySize":
    "루프 감지를 위한 도구 기록 범위 크기입니다(기본값: 30).",
  "tools.loopDetection.warningThreshold":
    "감지기가 활성화된 경우 반복적인 패턴에 대한 경고 임계값입니다(기본값: 10).",
  "tools.loopDetection.unknownToolThreshold":
    "이 횟수만큼 누락된 후에는 사용할 수 없는 동일한 도구에 대한 반복 호출을 차단합니다(기본값: 10).",
  "tools.loopDetection.criticalThreshold":
    "감지기가 활성화된 경우 반복적인 패턴에 대한 위험 임계값입니다(기본값: 20).",
  "tools.loopDetection.globalCircuitBreakerThreshold":
    "전역 무진행(no-progress) 브레이커 임계값입니다(기본값: 30).",
  "tools.loopDetection.detectors.genericRepeat":
    "일반적인 동일 도구/동일 매개변수 반복 루프 감지를 활성화합니다(기본값: true).",
  "tools.loopDetection.detectors.knownPollNoProgress":
    "알려진 폴링 도구 무진행 루프 감지를 활성화합니다(기본값: true).",
  "tools.loopDetection.detectors.pingPong":
    "핑퐁 루프 감지를 활성화합니다(기본값: true).",
  "tools.loopDetection.postCompactionGuard.windowSize":
    "가드가 무장 상태를 유지하는 압축 후 시도 횟수입니다(기본값: 3). 값이 낮을수록 엄격하며, 값이 높을수록 에이전트가 중단 전 더 많은 시도를 할 수 있습니다.",
  "tools.exec.notifyOnExit":
    "true(기본값)인 경우 종료 시 백그라운드로 전환된 exec 세션과 노드 exec 수명 주기 이벤트가 시스템 이벤트를 큐에 넣고 하트비트를 요청합니다.",
  "tools.exec.notifyOnExitEmptySuccess":
    "true인 경우 출력이 비어 있는 상태로 성공적으로 종료된 백그라운드 exec도 완료 시스템 이벤트를 큐에 넣습니다(기본값: false).",
  "tools.exec.pathPrepend":
    "exec 실행(게이트웨이/샌드박스)을 위해 PATH 앞에 추가할 디렉터리입니다.",
  "tools.exec.safeBins":
    "명시적 허용 목록 항목 없이 실행할 수 있는 stdin 전용 안전 바이너리를 허용합니다.",
  "tools.exec.strictInlineEval":
    "`python -c`, `node -e`, `ruby -e` 또는 `osascript -e`와 같은 인터프리터 인라인 평가(eval) 형식에 대해 명시적 승인을 요구합니다. 조용한 허용 목록 재사용을 방지하고 해당 형식에 대한 항상 허용을 매번 묻기(ask-each-time)로 하향 조정합니다.",
  "tools.exec.safeBinTrustedDirs":
    "안전한 바이너리 경로 확인을 위해 명시적으로 신뢰할 수 있는 추가 디렉터리입니다(PATH 항목은 자동으로 신뢰되지 않음).",
  "tools.exec.safeBinProfiles":
    "선택적인 바이너리별 안전 바이너리 프로필입니다(위치 제한 + 허용/거부 플래그).",
  "tools.profile":
    "허용/거부 재정의를 적용하기 전에 사전 정의된 도구 정책 기준선을 선택하는 데 사용되는 전역 도구 프로필 이름입니다. 에이전트 전반에 걸쳐 일관된 환경 상태를 위해 이 프로필 이름을 안정적으로 유지하세요.",
  "tools.alsoAllow":
    "선택한 도구 프로필 및 기본 정책 위에 병합된 추가적인 도구 허용 목록 항목입니다. 감사를 통해 의도적인 정책 예외를 빠르게 식별할 수 있도록 이 목록을 작고 명시적으로 유지하세요.",
  "tools.byProvider":
    "표면별로 기능을 조정하기 위해 채널/제공자 ID를 키로 하는 제공자별 도구 허용/거부 재정의입니다. 하나의 제공자가 전역 도구 정책보다 더 엄격한 제어를 필요로 할 때 이를 사용하세요.",
  "agents.list[].tools.profile":
    "한 에이전트가 다른 기능 기준선을 필요로 할 때 사용하는 도구 프로필 선택에 대한 에이전트별 재정의입니다. 에이전트 간 정책 차이가 의도적이고 검토 가능하도록 이 기능을 신중하게 사용하세요.",
  "agents.list[].tools.alsoAllow":
    "전역 및 프로필 정책에 더해 도구에 대한 에이전트별 추가 허용 목록입니다. 특수 에이전트에서 우발적인 권한 확장을 피하기 위해 범위를 좁게 유지하세요.",
  "agents.list[].tools.byProvider":
    "채널 범위 기능 제어를 위한 에이전트별 제공자 특정 도구 정책 재정의입니다. 단일 에이전트가 다른 제공자보다 특정 제공자에 대해 더 엄격한 제한을 필요로 할 때 이를 사용하세요.",
  "tools.exec.approvalRunningNoticeMs":
    "exec 승인이 부여된 후 진행 중 알림을 표시하기 전 지연 시간(밀리초)입니다. 빠른 명령의 경우 깜박임을 줄이려면 늘리고 운영자 피드백을 더 빨리 받으려면 줄이세요.",
  "tools.links.enabled":
    "에이전트 추론 전에 URL이 요약될 수 있도록 자동 링크 이해 사전 처리를 활성화합니다. 더 풍부한 컨텍스트를 위해 활성화 상태를 유지하고, 엄격한 최소 처리만 필요할 때는 비활성화하세요.",
  "tools.links.maxLinks":
    "링크 이해 중에 턴당 확장되는 최대 링크 수입니다. 말이 많은 스레드에서 지연 시간/비용을 제어하려면 값을 낮추고 다중 링크 컨텍스트가 중요할 때는 값을 높이세요.",
  "tools.links.timeoutSeconds":
    "해결되지 않은 링크를 건너뛰기 전 링크별 이해 시간 제한 예산(초)입니다. 외부 사이트가 느리거나 연결할 수 없을 때 긴 중단을 피하기 위해 이 값을 제한되게 유지하세요.",
  "tools.links.models":
    "지원되는 경우 대체용(fallback)으로 순서대로 평가되는, 링크 이해 작업을 선호하는 모델 목록입니다. 일상적인 요약에는 경량 모델을 먼저 사용하고 필요할 때만 무거운 모델을 사용하세요.",
  "tools.links.scope":
    "대화 컨텍스트 및 메시지 유형과 관련하여 링크 이해가 언제 실행되는지를 제어합니다. 링크가 실행 가능하지 않은 메시지에서 불필요한 fetch를 피하기 위해 범위를 보수적으로 유지하세요.",
  "tools.media.models":
    "모달리티별(modality-specific) 모델 목록이 설정되지 않은 경우 미디어 이해 도구가 사용하는 공유된 대체 모델 목록입니다. 런타임 대체 시도의 혼란을 피하기 위해 이를 사용 가능한 다중 모달 제공자와 일치하게 유지하세요.",
  "tools.media.concurrency":
    "이미지, 오디오, 비디오 작업 전반에 걸쳐 턴당 동시 미디어 이해 작업의 최대 수입니다. CPU/네트워크 포화 상태를 방지하기 위해 리소스가 제한된 배포 환경에서는 이 값을 낮추세요.",
  "tools.media.asyncCompletion.directSend":
    "더 이상 사용되지 않는 호환성 플래그입니다. 비동기 미디어 생성 완료는 요청자 세션에 의해 매개되므로, 소스 전달이 필요할 때 에이전트가 사용자에게 어떻게 알리고 메시지 도구를 사용할지 결정할 수 있습니다.",
  "tools.media.image.enabled":
    "첨부되거나 참조된 이미지가 텍스트 컨텍스트로 해석될 수 있도록 이미지 이해를 활성화합니다. 텍스트 전용 작동이 필요하거나 이미지 처리 비용을 피하려면 비활성화하세요.",
  "tools.media.image.maxBytes":
    "정책에 의해 항목을 건너뛰거나 자르기 전에 허용되는 이미지 페이로드의 최대 크기(바이트)입니다. 반복적인 시간 초과/실패 루프를 방지하기 위해 제공자 한도 및 인프라 대역폭에 맞게 현실적인 한도를 유지하세요.",
  "tools.media.image.maxChars":
    "모델 응답 정규화 후 이미지 이해 출력에서 반환되는 최대 문자 수입니다. 프롬프트 비대화를 줄이려면 제한을 더 엄격하게 하고 디테일이 많은 OCR 작업의 경우 한도를 늘리세요.",
  "tools.media.image.prompt":
    "추출 스타일과 세부 수준을 형성하기 위해 이미지 이해 요청에 사용되는 지침 템플릿입니다. 출력이 턴과 채널 전반에 걸쳐 일관되게 유지되도록 프롬프트를 결정론적으로 유지하세요.",
  "tools.media.image.timeoutSeconds":
    "중단되기 전 각 이미지 이해 요청에 대한 시간 제한(초)입니다. 고해상도 분석의 경우 이 값을 늘리고 지연 시간에 민감한 운영자 워크플로의 경우 값을 낮추세요.",
  "tools.media.image.attachments":
    "어떤 메시지 첨부 파일이 이미지 분석 자격을 얻는지 포함하여, 이미지 입력을 위한 첨부 파일 처리 정책입니다. 신뢰할 수 없는 채널에서 예기치 않은 처리를 줄이려면 제한적인 설정을 사용하세요.",
  "tools.media.image.models":
    "공유 미디어 모델을 재정의하고자 할 때 명확히 이미지 이해를 위해 선호되는 순서화된 모델 기본 설정입니다. 대체 시도를 최소화하려면 가장 신뢰할 수 있는 다중 모달 모델을 첫 번째로 두세요.",
  "tools.media.image.scope":
    "이미지 이해가 시도되는 시기(예: 명시적 요청과 폭넓은 자동 감지 비교)에 대한 범위 선택기입니다. 토큰 및 API 지출을 제어하기 위해 바쁜 채널에서는 범위를 좁게 유지하세요.",
  ...MEDIA_AUDIO_FIELD_HELP,
  "tools.media.video.enabled":
    "다운스트림 추론 및 응답을 위해 클립을 텍스트로 요약할 수 있도록 비디오 이해를 활성화합니다. 비디오 처리가 정책을 벗어나거나 배포 환경에 너무 많은 비용이 들 경우 비활성화하세요.",
  "tools.media.video.maxBytes":
    "정책 거부 또는 트리밍이 발생하기 전에 허용되는 비디오 페이로드의 최대 크기(바이트)입니다. 반복적인 시간 초과/실패 루프를 방지하기 위해 제공자 및 인프라 한도에 맞게 조정하세요.",
  "tools.media.video.maxChars":
    "프롬프트 증가를 제어하기 위해 비디오 이해 출력에서 유지되는 최대 문자 수입니다. 밀도 높은 장면 설명의 경우 값을 높이고 간결한 요약이 선호될 때는 낮추세요.",
  "tools.media.video.prompt":
    "원하는 요약 세분성 및 초점 영역을 설명하는 비디오 이해 지침 템플릿입니다. 모델/제공자 대체 전반에 걸쳐 출력 품질이 예측 가능하도록 이 값을 안정적으로 유지하세요.",
  "tools.media.video.timeoutSeconds":
    "취소되기 전 각 비디오 이해 요청에 대한 시간 제한(초)입니다. 대화형 채널에서는 보수적인 값을 사용하고 오프라인이나 일괄 처리 위주의 작업에서는 더 긴 값을 사용하세요.",
  "tools.media.video.attachments":
    "어떤 메시지 파일이 비디오 처리를 트리거할 수 있는지 정의하는 비디오 분석을 위한 첨부 파일 자격 정책입니다. 의도치 않은 대규모 미디어 워크로드를 방지하기 위해 공유 채널에서는 이 값을 명시적으로 유지하세요.",
  "tools.media.video.models":
    "공유 미디어 대체가 적용되기 전 비디오 이해를 위해 명확히 선호되는 순서화된 모델 기본 설정입니다. 저하된 요약을 최소화하기 위해 다중 모달 비디오 지원이 강력한 모델을 우선 순위로 두세요.",
  "tools.media.video.scope":
    "수신되는 이벤트 전반에서 언제 비디오 이해를 시도할지 제어하는 범위 선택기입니다. 노이즈가 많은 채널에서는 범위를 좁히고 비디오 해석이 워크플로의 핵심인 곳에서만 범위를 넓히세요.",
  "skills.load.watch":
    "전체 프로세스를 재시작하지 않고도 업데이트를 적용할 수 있도록 스킬 정의 변경 사항에 대한 파일 시스템 감시를 활성화합니다. 개발 워크플로에서는 활성화 상태로 유지하고 불변(immutable) 프로덕션 이미지에서는 비활성화하세요.",
  "skills.load.watchDebounceMs":
    "다시 로드 로직이 실행되기 전에 빠른 스킬 파일 변경 사항을 병합하기 위한 디바운스 창(밀리초)입니다. 잦은 쓰기 시 재로드로 인한 혼란을 줄이려면 값을 늘리고 편집 피드백을 더 빨리 보려면 값을 낮추세요.",
  approvals:
    "시작된 세션 외부의 채팅 대상으로 exec 및 플러그인 승인 요청을 전달하기 위한 승인 라우팅 제어입니다. 운영자가 대역 외(out-of-band) 승인 가시성을 명시적으로 필요로 하지 않는 한 비활성화 상태로 유지하세요.",
  "approvals.exec":
    "활성화, 라우팅 모드, 필터, 명시적 대상을 포함하는 exec 승인 전달 동작을 그룹화합니다. 승인 프롬프트가 원본 스레드뿐만 아니라 운영 채널에 도달해야 할 때 여기서 구성하세요.",
  "approvals.exec.enabled":
    "구성된 전달 대상으로 exec 승인 요청 전달을 활성화합니다(기본값: false). 위험도가 낮은 설정에서는 비활성화 상태를 유지하고 인간 승인 응답자가 채널에 표시되는 프롬프트를 필요로 할 때만 활성화하세요.",
  "approvals.exec.mode":
    '승인 프롬프트가 전송되는 위치를 제어합니다: "session"은 원본 채팅을 사용하고, "targets"는 구성된 대상을 사용하며, "both"는 두 경로 모두로 전송합니다. 기준선으로 "session"을 사용하고 운영 워크플로에서 중복성이 필요할 때만 확장하세요.',
  "approvals.exec.agentFilter":
    '전달된 승인에 적합한 에이전트 ID의 선택적 허용 목록입니다(예: `["primary", "ops-agent"]`). 전달의 영향 범위(blast radius)를 제한하고 관련 없는 에이전트 때문에 채널에 알림이 가는 것을 피하려면 이를 사용하세요.',
  "approvals.exec.sessionFilter":
    '부분 문자열이나 정규식 스타일의 패턴으로 일치하는 선택적 세션 키 필터입니다(예: `["discord:", "^agent:ops:"]`). 의도된 승인 컨텍스트만 공유 대상으로 전달되도록 좁은 패턴을 사용하세요.',
  "approvals.exec.targets":
    "전달 모드에 대상이 포함될 때 사용되는 각각 채널 및 대상 세부 정보가 있는 명시적 전달 대상입니다. 대상 목록을 최소 권한으로 유지하고 광범위한 전달을 활성화하기 전에 각 대상을 검증하세요.",
  "approvals.exec.targets[].channel":
    "discord, slack, 또는 플러그인 채널 id 등 전달된 승인에 사용되는 채널/제공자 ID입니다. 승인이 알 수 없는 라우트로 인해 소리 없이 실패하지 않도록 유효한 채널 ID만 사용하세요.",
  "approvals.exec.targets[].to":
    "대상 채널 내부의 도착지 식별자입니다(제공자에 따라 채널 ID, 사용자 ID, 또는 스레드 루트). 제공자마다 대상 형식이 다르므로 각 제공자의 의미 체계를 확인하세요.",
  "approvals.exec.targets[].accountId":
    "승인이 특정 계정 컨텍스트를 통해 라우팅되어야 할 때 다중 계정 채널 설정을 위한 선택적 계정 선택기입니다. 대상 채널에 여러 ID가 구성된 경우에만 이를 사용하세요.",
  "approvals.exec.targets[].threadId":
    "전달된 승인의 스레드 전달을 지원하는 채널에 대한 선택적 스레드/토픽 대상입니다. 메인 채널 대신 운영 스레드에 승인 트래픽을 포함시키려면 이를 사용하세요.",
  "approvals.plugin":
    "활성화, 라우팅 모드, 필터, 명시적 대상을 포함하는 플러그인 승인 전달 동작을 그룹화합니다. exec 승인 전달과 독립적입니다. 플러그인 승인 프롬프트가 운영 채널에 도달해야 할 때 여기서 구성하세요.",
  "approvals.plugin.enabled":
    "구성된 전달 대상으로 플러그인 승인 요청 전달을 활성화합니다(기본값: false). approvals.exec.enabled와 독립적입니다.",
  "approvals.plugin.mode":
    '플러그인 승인 프롬프트가 전송되는 위치를 제어합니다: "session"은 원본 채팅을 사용하고, "targets"는 구성된 대상을 사용하며, "both"는 두 경로 모두로 전송합니다.',
  "approvals.plugin.agentFilter":
    '전달된 플러그인 승인에 적합한 에이전트 ID의 선택적 허용 목록입니다(예: `["primary", "ops-agent"]`). 전달 영향 범위를 제한하려면 이를 사용하세요.',
  "approvals.plugin.sessionFilter":
    '부분 문자열이나 정규식 스타일의 패턴으로 일치하는 선택적 세션 키 필터입니다(예: `["discord:", "^agent:ops:"]`). 의도된 승인 컨텍스트만 전달되도록 좁은 패턴을 사용하세요.',
  "approvals.plugin.targets":
    "플러그인 승인 전달 모드에 대상이 포함될 때 사용되는, 채널 및 대상 세부 정보를 갖춘 명시적 전달 대상입니다.",
  "approvals.plugin.targets[].channel":
    "discord, slack, 또는 플러그인 채널 id 등 전달된 플러그인 승인 전달에 사용되는 채널/제공자 ID입니다.",
  "approvals.plugin.targets[].to":
    "대상 채널 내부의 도착지 식별자입니다(제공자에 따라 채널 ID, 사용자 ID, 또는 스레드 루트).",
  "approvals.plugin.targets[].accountId":
    "플러그인 승인이 특정 계정 컨텍스트를 통해 라우팅되어야 할 때 다중 계정 채널 설정을 위한 선택적 계정 선택기입니다.",
  "approvals.plugin.targets[].threadId":
    "전달된 플러그인 승인의 스레드 전달을 지원하는 채널에 대한 선택적 스레드/토픽 대상입니다.",
  "tools.fs.workspaceOnly":
    "파일 시스템 도구(read/write/edit/apply_patch)를 작업 영역 디렉터리로 제한합니다(기본값: false).",
  "tools.sessions.visibility":
    'sessions_list/sessions_history/sessions_send가 대상을 지정할 수 있는 세션을 제어합니다. ("tree" 기본값 = 현재 세션 + 생성된 하위 에이전트 세션; "self" = 현재 세션만; "agent" = 현재 에이전트 ID 내 모든 세션; "all" = 모든 세션; 교차 에이전트는 여전히 tools.agentToAgent가 필요합니다).',
  "tools.message.allowCrossContextSend":
    "레거시 재정의: 모든 제공자 전반에 걸쳐 교차 컨텍스트(cross-context) 전송을 허용합니다.",
  "tools.message.crossContext.allowWithinProvider":
    "동일한 제공자 내 다른 채널로의 전송을 허용합니다(기본값: true).",
  "tools.message.crossContext.allowAcrossProviders":
    "다른 제공자 간의 전송을 허용합니다(기본값: false).",
  "tools.message.crossContext.marker.enabled":
    "교차 컨텍스트 전송 시 표시되는 출처 마커를 추가합니다(기본값: true).",
  "tools.message.crossContext.marker.prefix":
    '교차 컨텍스트 마커의 텍스트 접두사입니다("{channel}" 지원).',
  "tools.message.crossContext.marker.suffix":
    '교차 컨텍스트 마커의 텍스트 접미사입니다("{channel}" 지원).',
  "tools.message.broadcast.enabled":
    "브로드캐스트 작업을 활성화합니다(기본값: true).",
  "tools.web.search.enabled":
    "관리되는 web_search 및 해당 모델에 대한 선택적인 Codex 기본 검색을 활성화합니다.",
  "tools.web.search.provider":
    "검색 제공자 ID입니다. 생략 시 사용 가능한 API 키에서 자동 감지됩니다.",
  "tools.web.search.maxResults": "반환할 결과 수입니다(1-10).",
  "tools.web.search.timeoutSeconds":
    "web_search 요청에 대한 시간 제한(초)입니다.",
  "tools.web.search.cacheTtlMinutes":
    "web_search 결과에 대한 캐시 TTL(분)입니다.",
  "tools.web.search.openaiCodex.enabled":
    "Codex 지원 모델을 위한 기본 Codex 웹 검색을 활성화합니다.",
  "tools.web.search.openaiCodex.mode":
    '기본 Codex 웹 검색 모드: "cached"(기본값) 또는 "live".',
  "tools.web.search.openaiCodex.allowedDomains":
    "기본 Codex web_search 도구에 전달되는 선택적인 도메인 허용 목록입니다.",
  "tools.web.search.openaiCodex.contextSize":
    '기본 Codex 검색 컨텍스트 크기 힌트: "low", "medium" 또는 "high".',
  "tools.web.search.openaiCodex.userLocation.country":
    "기본 Codex 웹 검색에 전송되는 대략적인 국가입니다.",
  "tools.web.search.openaiCodex.userLocation.region":
    "기본 Codex 웹 검색에 전송되는 대략적인 지역/주입니다.",
  "tools.web.search.openaiCodex.userLocation.city":
    "기본 Codex 웹 검색에 전송되는 대략적인 도시입니다.",
  "tools.web.search.openaiCodex.userLocation.timezone":
    "기본 Codex 웹 검색에 전송되는 대략적인 시간대입니다.",
  "tools.web.search.brave.mode":
    'Brave 검색 모드: "web"(URL 결과) 또는 "llm-context"(LLM 그라운딩을 위한 사전 추출된 페이지 콘텐츠).',
  "tools.web.fetch.enabled":
    "web_fetch 도구(가벼운 HTTP fetch)를 활성화합니다.",
  "tools.web.fetch.maxChars":
    "web_fetch가 반환하는 최대 문자 수입니다(잘림 적용).",
  "tools.web.fetch.maxCharsCap":
    "web_fetch maxChars에 대한 하드 캡(구성 및 도구 호출에 적용)입니다.",
  "tools.web.fetch.maxResponseBytes": "자르기 전의 최대 다운로드 크기입니다.",
  "tools.web.fetch.provider": "웹 fetch 대체 제공자 ID입니다.",
  "tools.web.fetch.timeoutSeconds":
    "web_fetch 요청에 대한 시간 제한(초)입니다.",
  "tools.web.fetch.cacheTtlMinutes":
    "web_fetch 결과에 대한 캐시 TTL(분)입니다.",
  "tools.web.fetch.maxRedirects":
    "web_fetch에 허용되는 최대 리디렉션 수입니다(기본값: 3).",
  "tools.web.fetch.userAgent":
    "web_fetch 요청에 대한 User-Agent 헤더를 재정의합니다.",
  "tools.web.fetch.readability":
    "Readability를 사용하여 HTML에서 주요 콘텐츠를 추출합니다(기본 HTML 정리로 대체됨).",
  "tools.web.fetch.useTrustedEnvProxy":
    "신뢰할 수 있는 HTTP(S) 환경 프록시를 통해 web_fetch를 라우팅하고 프록시가 DNS를 해결하도록 합니다. 해당 프록시가 운영자에 의해 제어되고 DNS 해결 후 아웃바운드 정책을 강제하는 경우에만 활성화하세요.",
  "tools.web.fetch.ssrfPolicy":
    "web_fetch에 대한 범위가 지정된 SSRF 정책 재정의입니다. 이 범위를 좁게 유지하고 알려진 로컬 네트워크 프록시 환경에 대해서만 선택적으로 사용하세요.",
  "tools.web.fetch.ssrfPolicy.allowRfc2544BenchmarkRange":
    "Clash 또는 Surge와 같은 가짜 IP 프록시 호환성을 위해 RFC 2544 벤치마크 범위 IP(198.18.0.0/15)를 허용합니다.",
  "tools.web.fetch.ssrfPolicy.allowIpv6UniqueLocalRange":
    "sing-box, Clash 또는 Surge와 같이 신뢰할 수 있는 가짜 IP 프록시 호환성을 위해 IPv6 고유 로컬 주소(fc00::/7)를 허용합니다.",
  models:
    "제공자 정의, 병합/바꾸기 동작, 선택적인 Bedrock 검색 통합을 위한 모델 카탈로그 루트입니다. 프로덕션 장애 조치 경로에 의존하기 전에 제공자 정의를 명시적이고 검증된 상태로 유지하세요.",
  "models.mode":
    '제공자 카탈로그 동작을 제어합니다: "merge"는 내장(built-ins)을 유지하고 사용자 지정 제공자를 오버레이하는 반면 "replace"는 구성된 제공자만 사용합니다. "merge"에서 일치하는 제공자 ID는 비어 있지 않은 에이전트 models.json baseUrl 값을 유지하며, apiKey 값은 제공자가 현재 구성/인증 프로필 컨텍스트에서 SecretRef로 관리되지 않는 경우에만 유지됩니다. SecretRef로 관리되는 제공자는 현재 소스 마커에서 apiKey를 새로 고침하며, 일치하는 모델의 contextWindow/maxTokens는 명시적 항목과 암시적 항목 중 더 높은 값을 사용합니다.',
  "models.providers":
    "연결/인증 설정 및 구체적인 모델 정의가 포함된 제공자 ID로 키가 지정된 제공자 맵입니다. 에이전트 및 도구의 참조가 환경 전반에 걸쳐 이식 가능하도록 안정적인 제공자 키를 사용하세요.",
  "models.pricing":
    "원격 토큰당 비용 카탈로그를 가져오는 선택적인 백그라운드 모델 가격 책정 부트스트랩을 제어합니다.",
  "models.pricing.enabled":
    "백그라운드 모델 가격 책정 부트스트랩을 활성화합니다. 게이트웨이 시작 중 OpenRouter 및 LiteLLM 카탈로그 가져오기를 건너뛰려면 false로 설정하세요. 이 값을 변경하려면 게이트웨이를 재시작해야 합니다.",
  "models.providers.*.baseUrl":
    "해당 제공자 항목에 대한 모델 요청을 처리하는 데 사용되는 제공자 엔드포인트의 기본 URL입니다. HTTPS 엔드포인트를 사용하고 필요한 경우 구성 템플릿을 통해 URL을 환경에 따라 구체적으로 유지하세요.",
  "models.providers.*.apiKey":
    "제공자가 직접 키 인증을 요구할 때 API 키 기반 인증에 사용되는 제공자 자격 증명입니다. 비밀/환경 치환을 사용하고 실제 키를 커밋된 구성 파일에 저장하지 마세요.",
  "models.providers.*.auth":
    '제공자 인증 스타일을 선택합니다: API 키 인증을 위한 "api-key", Bearer 토큰 인증을 위한 "token", OAuth 자격 증명을 위한 "oauth", AWS 자격 증명 해결을 위한 "aws-sdk". 제공자의 요구 사항에 맞춰 일치시키세요.',
  "models.providers.*.api":
    "모델 호출에 대한 요청/응답 호환성 처리를 제어하는 제공자 API 어댑터 선택입니다. 기능 불일치를 피하기 위해 업스트림 제공자 프로토콜과 일치하는 어댑터를 사용하세요.",
  "models.providers.*.contextWindow":
    "모델 항목이 contextWindow를 설정하지 않은 경우 이 제공자 아래의 모델에 적용되는 기본 기본(native) 컨텍스트 창입니다. 모델별 재정의를 위해 모델 수준 contextWindow를 사용하세요.",
  "models.providers.*.contextTokens":
    "모델 항목이 contextTokens를 설정하지 않은 경우 이 제공자 아래의 모델에 적용되는 기본 유효 런타임 컨텍스트 상한입니다. 런타임이 기본 contextWindow 미만으로 예산을 설정해야 할 때 이를 사용하세요.",
  "models.providers.*.maxTokens":
    "모델 항목이 maxTokens를 설정하지 않은 경우 이 제공자 아래의 모델에 적용되는 기본 최대 출력 토큰 예산입니다.",
  "models.providers.*.timeoutSeconds":
    "선택적인 제공자별 모델 요청 시간 제한(초)입니다. 연결, 헤더, 본문 및 전체 요청 중단 처리를 포함하여 제공자 HTTP fetch에 적용됩니다. 전역 에이전트 시간 제한을 변경하는 대신 느린 로컬 또는 자체 호스팅 모델 서버에 대해 이를 사용하세요.",
  "models.providers.*.injectNumCtxForOpenAICompat":
    "OpenAI 호환 어댑터(`openai-completions`)로 구성된 Ollama 제공자에 대해 OpenClaw가 `options.num_ctx`를 주입할지 여부를 제어합니다. 기본값은 true입니다. 프록시/업스트림이 알 수 없는 `options` 페이로드 필드를 거부하는 경우에만 false로 설정하세요.",
  "models.providers.*.params":
    "제공자 플러그인에 의해 해석되는 제공자별 런타임 매개변수입니다. 제공자가 문서화한 키를 유지하고, 임시로 공유된 가정보다는 명시적인 제공자 문서를 우선하세요.",
  "models.providers.*.headers":
    "테넌트 라우팅, 프록시 인증 또는 사용자 지정 게이트웨이 요구 사항을 위해 제공자 요청에 병합되는 정적 HTTP 헤더입니다. 이를 절제하여 사용하고 민감한 헤더 값은 비밀로 유지하세요.",
  "models.providers.*.authHeader":
    "true인 경우, 대체 인증이 가능하더라도 자격 증명이 HTTP Authorization 헤더를 통해 전송됩니다. 제공자나 프록시가 명시적으로 Authorization 전달을 요구할 때만 이 기능을 사용하세요.",
  "models.providers.*.request":
    "추가 헤더, 인증 재정의, 프록시 라우팅, TLS 클라이언트 설정, 그리고 신뢰할 수 있는 자체 호스트 엔드포인트를 위한 선택적 allowPrivateNetwork를 포함하는 모델 제공자 요청에 대한 선택적 요청 재정의입니다. 업스트림이나 엔터프라이즈 네트워크 경로가 전송 사용자 지정을 요구할 때만 이를 사용하세요.",
  "models.providers.*.request.headers":
    "기본 속성 및 인증 해결 후 제공자 요청에 병합되는 추가 헤더입니다.",
  "models.providers.*.request.auth":
    "이 제공자에 대한 제공자 요청 인증 동작을 재정의합니다.",
  "models.providers.*.request.auth.mode":
    '인증 재정의 모드: "provider-default", "authorization-bearer", 또는 "header".',
  "models.providers.*.request.auth.token":
    "인증 모드가 authorization-bearer일 때 사용되는 Bearer 토큰입니다.",
  "models.providers.*.request.auth.headerName":
    "인증 모드가 header일 때 사용되는 사용자 지정 인증 헤더 이름입니다.",
  "models.providers.*.request.auth.value":
    "인증 모드가 header일 때 사용되는 사용자 지정 인증 헤더 값입니다.",
  "models.providers.*.request.auth.prefix":
    "인증 모드가 header일 때 request.auth.value 앞에 추가되는 선택적 접두사입니다.",
  "models.providers.*.request.proxy":
    '모델 제공자 요청에 대한 선택적 프록시 재정의입니다. 환경 프록시 설정을 적용하려면 "env-proxy"를 사용하고, 특정 프록시 URL을 통해 라우팅하려면 "explicit-proxy"를 사용하세요.',
  "models.providers.*.request.proxy.mode":
    '모델 제공자 요청을 위한 프록시 재정의 모드: "env-proxy" 또는 "explicit-proxy".',
  "models.providers.*.request.proxy.url":
    "request.proxy.mode가 explicit-proxy일 때 사용되는 명시적 프록시 URL입니다. URL에 포함된 자격 증명은 민감한 정보로 취급되어 스냅샷에서 삭제됩니다.",
  "models.providers.*.request.proxy.tls":
    "구성된 프록시에 연결할 때 사용되는 선택적 TLS 설정입니다.",
  "models.providers.*.request.proxy.tls.ca":
    "프록시 TLS 인증서 체인을 확인하는 데 사용되는 사용자 지정 CA 번들입니다.",
  "models.providers.*.request.proxy.tls.cert":
    "상호 TLS가 필요할 때 프록시에 제공되는 클라이언트 TLS 인증서입니다.",
  "models.providers.*.request.proxy.tls.key":
    "프록시 상호 TLS를 위해 request.proxy.tls.cert와 페어링되는 비공개 키입니다.",
  "models.providers.*.request.proxy.tls.passphrase":
    "request.proxy.tls.key를 복호화하는 데 사용되는 선택적 암호구입니다.",
  "models.providers.*.request.proxy.tls.serverName":
    "프록시와 TLS를 설정할 때 사용되는 선택적 SNI/서버 이름 재정의입니다.",
  "models.providers.*.request.proxy.tls.insecureSkipVerify":
    "프록시 TLS 인증서 확인을 건너뜁니다. 통제된 개발 환경에서만 사용하세요.",
  "models.providers.*.request.tls":
    "업스트림 모델 엔드포인트에 직접 연결할 때 사용되는 선택적 TLS 설정입니다.",
  "models.providers.*.request.tls.ca":
    "업스트림 TLS 인증서 체인을 확인하는 데 사용되는 사용자 지정 CA 번들입니다.",
  "models.providers.*.request.tls.cert":
    "상호 TLS가 필요할 때 업스트림 엔드포인트에 제공되는 클라이언트 TLS 인증서입니다.",
  "models.providers.*.request.tls.key":
    "업스트림 상호 TLS를 위해 request.tls.cert와 페어링되는 비공개 키입니다.",
  "models.providers.*.request.tls.passphrase":
    "request.tls.key를 복호화하는 데 사용되는 선택적 암호구입니다.",
  "models.providers.*.request.tls.serverName":
    "업스트림 TLS를 설정할 때 사용되는 선택적 SNI/서버 이름 재정의입니다.",
  "models.providers.*.request.tls.insecureSkipVerify":
    "업스트림 TLS 인증서 확인을 건너뜁니다. 통제된 개발 환경에서만 사용하세요.",
  "models.providers.*.request.allowPrivateNetwork":
    "true인 경우, 제공자 HTTP fetch 가드(fetchWithSsrFGuard)를 통해 DNS가 사설, CGNAT 또는 유사한 범위로 확인될 때 모델 기본 URL에 대한 HTTPS를 허용합니다. OpenAI 응답 WebSocket은 헤더/TLS에 대한 요청을 재사용하지만 해당 fetch SSRF 경로를 사용하지는 않습니다. 운영자가 통제하는 자체 호스팅 OpenAI 호환 엔드포인트(LAN, 오버레이, 스플릿 DNS)에 대해서만 사용하세요. 기본값은 false입니다.",
  "models.providers.*.models":
    "식별자, 메타데이터, 제공자별 매개변수, 선택적 호환성/비용 힌트를 포함하는 제공자의 선언된 모델 목록입니다. 선택 및 대체가 올바르게 해결되도록 ID를 제공자 카탈로그 값과 정확히 일치하게 유지하세요.",
  auth: "다중 프로필 제공자 자격 증명 및 쿨다운 기반의 장애 조치 순서 지정에 사용되는 인증 프로필 루트입니다. 자동 장애 조치 동작이 감사 가능하게 유지되도록 프로필을 최소화하고 명시적으로 유지하세요.",
  "channels.matrix.allowBots":
    '구성된 다른 Matrix 봇 계정의 메시지가 응답을 트리거하도록 허용합니다(기본값: false). 이 봇을 시각적으로 멘션하는 봇 메시지만 허용하려면 "mentions"로 설정하세요.',
  "channels.mattermost.botToken":
    "Mattermost System Console -> Integrations -> Bot Accounts의 봇 토큰입니다.",
  "channels.mattermost.baseUrl":
    "Mattermost 서버의 기본 URL입니다(예: https://chat.example.com).",
  "channels.mattermost.chatmode":
    '채널 메시지에 응답하는 방식입니다: 멘션 시("oncall"), 트리거 문자(">" 또는 "!") 시("onchar"), 또는 모든 메시지 시("onmessage").',
  "channels.mattermost.oncharPrefixes":
    'onchar 모드의 트리거 접두사입니다(기본값: [">", "!"]).',
  "channels.mattermost.requireMention":
    "응답하기 전 채널에서 @멘션을 요구합니다(기본값: true).",
  "auth.profiles": "명명된 인증 프로필입니다(제공자 + 모드 + 선택적 이메일).",
  "auth.order":
    "제공자당 정렬된 인증 프로필 ID입니다(자동 장애 조치에 사용됨).",
  "auth.cooldowns":
    "청구 관련 실패 및 재시도 기간 이후 일시적인 프로필 억제를 위한 쿨다운/백오프 제어입니다. 아직 차단된 프로필이 빠르게 다시 선택되는 것을 방지하려면 이를 사용하세요.",
  "auth.cooldowns.billingBackoffHours":
    "청구/크레딧 부족으로 프로필이 실패했을 때의 기본 백오프(시간)입니다(기본값: 5).",
  "auth.cooldowns.billingBackoffHoursByProvider":
    "청구 백오프(시간)에 대한 선택적인 제공자별 재정의입니다.",
  "auth.cooldowns.billingMaxHours":
    "청구 백오프에 대한 상한(시간)입니다(기본값: 24).",
  "auth.cooldowns.authPermanentBackoffMinutes":
    "확신도가 높은 auth_permanent 실패에 대한 기본 백오프(분)입니다(기본값: 10). 일시적인 업스트림 인증 인시던트 후 제공자가 자동으로 복구될 수 있도록 이 값을 청구 백오프보다 짧게 유지하세요.",
  "auth.cooldowns.authPermanentMaxMinutes":
    "auth_permanent 백오프에 대한 상한(분)입니다(기본값: 60).",
  "auth.cooldowns.failureWindowHours":
    "백오프 카운터를 위한 실패 창(시간)입니다(기본값: 24).",
  "auth.cooldowns.overloadedProfileRotations":
    "모델 대체로 전환하기 전에 과부하(overloaded) 오류에 대해 허용되는 최대 동일 제공자 인증 프로필 교체 횟수입니다(기본값: 1).",
  "auth.cooldowns.overloadedBackoffMs":
    "과부하된 제공자/프로필 교체를 재시도하기 전의 고정 지연 시간(밀리초)입니다(기본값: 0).",
  "auth.cooldowns.rateLimitedProfileRotations":
    "모델 대체로 전환하기 전에 속도 제한(rate-limit) 오류에 대해 허용되는 최대 동일 제공자 인증 프로필 교체 횟수입니다(기본값: 1).",
  "agents.defaults.workspace":
    "파일 시스템 컨텍스트 및 저장소 인식(repo-aware) 동작을 위해 에이전트 런타임 도구에 노출되는 기본 작업 영역 경로입니다. 래퍼(wrappers)에서 실행할 때 경로 확인이 결정론적으로 유지되도록 이를 명시적으로 설정하세요.",
  "agents.defaults.skipOptionalBootstrapFiles":
    "에이전트 작업 영역에 생성하지 않아야 할 선택적 부트스트랩 파일입니다. 유효한 값: SOUL.md, USER.md, HEARTBEAT.md, IDENTITY.md.",
  "agents.defaults.contextInjection":
    '시스템 프롬프트에 작업 영역 부트스트랩 파일이 주입되는 시기를 제어합니다: "always"(기본값) 또는 완료된 어시스턴트 응답 후 안전한 계속(continuation) 턴을 위한 "continuation-skip".',
  "agents.defaults.bootstrapMaxChars":
    "잘림 전에 시스템 프롬프트에 주입되는 각 작업 영역 부트스트랩 파일의 최대 문자 수입니다(기본값: 12000).",
  "agents.defaults.bootstrapTotalMaxChars":
    "주입된 모든 작업 영역 부트스트랩 파일의 전체 최대 문자 수입니다(기본값: 60000).",
  "agents.defaults.experimental":
    "실험적인 에이전트 기본 플래그입니다. 미리 보기 표면을 의도적으로 테스트하지 않는 한 꺼두세요.",
  "agents.defaults.experimental.localModelLean":
    "실험적인 로컬 모델 프롬프트 트림(trim)입니다. 활성화되면, OpenClaw는 더 약하거나 더 작은 로컬 모델 백엔드를 위해 브라우저, 크론, 메시지와 같은 무거운 기본 도구를 제거합니다.",
  "agents.defaults.bootstrapPromptTruncationWarning":
    '부트스트랩 파일이 잘렸을 때 에이전트가 볼 수 있는 경고 텍스트를 주입합니다: "off", "once"(기본값) 또는 "always".',
  "agents.defaults.startupContext":
    '단순한 "/new" 및 "/reset"에 대한 런타임 소유의 첫 턴 서곡(prelude)입니다. 모델에게 무엇을 읽을지 묻는 대신 최근 일일 메모리 파일을 첫 프롬프트에 사전 로드할지 여부를 제어하는 데 사용하세요.',
  "agents.defaults.startupContext.enabled":
    "단순한 세션 초기화에 대해 startup-context 서곡을 활성화합니다(기본값: true). 런타임이 로드하는 일일 메모리 없이 프롬프트 전용 동작으로 대체하려면 이를 비활성화하세요.",
  "agents.defaults.startupContext.applyOn":
    '어떤 단순 재설정 명령이 시작 컨텍스트를 얻을지 선택합니다: "new", "reset", 또는 둘 다 포함(기본값: ["new","reset"]).',
  "agents.defaults.startupContext.dailyMemoryDays":
    "구성된 사용자 시간대에서 오늘부터 거꾸로 계산하여 로드할 날짜가 지정된 메모리 파일 수입니다(기본값: 오늘 + 어제를 나타내는 2).",
  "agents.defaults.startupContext.maxFileBytes":
    "시작 컨텍스트를 구성할 때 일일 메모리 파일당 허용되는 최대 바이트 수입니다(기본값: 16384). 이 경계 안전 읽기 제한을 초과하는 파일은 건너뜁니다.",
  "agents.defaults.startupContext.maxFileChars":
    "시작 서곡에서 로드된 각 일일 메모리 파일에 대해 유지되는 최대 문자 수입니다(기본값: 1200).",
  "agents.defaults.startupContext.maxTotalChars":
    "시작 서곡에서 로드된 모든 일일 메모리 파일 전반에 걸쳐 유지되는 최대 전체 문자 수입니다(기본값: 2800). 이 한도에 도달하면 추가 파일은 서곡에서 잘립니다.",
  "agents.defaults.repoRoot":
    "시스템 프롬프트 런타임 라인에 표시되는 선택적 저장소 루트입니다(자동 감지 재정의).",
  "agents.defaults.promptOverlays":
    "제공자별 프롬프트 훅 이전에 모델 제품군별로 적용되는 제공자 독립적인 프롬프트 오버레이입니다.",
  "agents.defaults.promptOverlays.gpt5":
    "OpenAI, OpenRouter, OpenCode, Codex 및 호환 게이트웨이 전반에 걸쳐 일치하는 모델 ID에 적용되는 공유 GPT-5 제품군 프롬프트 오버레이입니다.",
  "agents.defaults.promptOverlays.gpt5.personality":
    'GPT-5 제품군 모델을 위한 친근한 상호작용 스타일 계층입니다("friendly" 또는 "on"은 이를 활성화하고, "off"는 해당 계층만 비활성화합니다). 태그된 동작 컨트랙트는 일치하는 GPT-5 모델에 대해 여전히 활성화된 상태로 유지됩니다.',
  "agents.defaults.envelopeTimezone":
    '메시지 봉투(envelope)를 위한 시간대입니다("utc", "local", "user" 또는 IANA 시간대 문자열).',
  "agents.defaults.envelopeTimestamp":
    '메시지 봉투에 절대 타임스탬프를 포함합니다("on" 또는 "off").',
  "agents.defaults.envelopeElapsed":
    '메시지 봉투에 경과 시간을 포함합니다("on" 또는 "off").',
  "agents.defaults.models":
    "구성된 모델 카탈로그입니다(키는 전체 제공자/모델 ID).",
  "agents.defaults.memorySearch":
    "MEMORY.md 및 memory/*.md에 대한 벡터 검색입니다(에이전트별 재정의 지원).",
  "agents.defaults.memorySearch.enabled":
    "이 에이전트 프로필에 대한 메모리 검색 인덱싱 및 검색 동작을 위한 마스터 토글입니다. 의미 체계(semantic) 회상을 위해 활성화 상태로 유지하고 완전히 상태 비저장(stateless) 응답을 원할 때 비활성화하세요.",
  "agents.defaults.memorySearch.sources":
    '인덱싱되는 소스를 선택합니다: "memory"는 MEMORY.md + 메모리 파일을 읽고, "sessions"는 스크립트 기록을 포함합니다. 이전 채팅 스크립트에서의 회상이 필요한 경우가 아니라면 ["memory"]를 유지하세요.',
  "agents.defaults.memorySearch.extraPaths":
    "기본 메모리 파일 외에 추가 디렉터리나 .md 파일을 메모리 인덱스에 추가합니다. 주요 참조 문서가 저장소의 다른 곳에 있을 때 이를 사용하세요. 다중 모달 메모리가 활성화된 경우 이 경로 아래에 있는 일치하는 이미지/오디오 파일도 인덱싱 대상이 됩니다.",
  "agents.defaults.memorySearch.qmd":
    "한 에이전트가 다른 에이전트의 스크립트 컬렉션을 쿼리해야 할 때 이를 사용하세요. QMD 전용 추가 컬렉션을 통해 모든 것을 하나의 공유 네임스페이스로 평면화하지 않고도 교차 에이전트 메모리 검색을 선택할 수 있습니다.",
  "agents.defaults.memorySearch.qmd.extraCollections":
    "에이전트 간의 방향성 스크립트 검색이 필요할 때 이를 사용하세요. 공유된 전역 스크립트 네임스페이스를 생성하지 않고 QMD 회상 범위를 지정하려면 여기에 컬렉션을 추가하세요.",
  "agents.defaults.memorySearch.qmd.extraCollections.path":
    "추가 QMD 컬렉션에 대해 절대 경로 또는 작업 영역 상대 파일 시스템 경로를 사용하세요. 이 에이전트가 실제로 검색하기를 원하는 스크립트 디렉터리나 노트 폴더를 가리키도록 유지하세요.",
  "agents.defaults.memorySearch.qmd.extraCollections.name":
    "경로가 에이전트 작업 영역 외부를 가리킬 때만 구성된 컬렉션 레이블을 보존합니다. 작업 영역 내부의 경로는 이름이 제공되더라도 에이전트 범위(agent-scoped)로 유지됩니다. 작업 영역 외부에 있는 공유된 교차 에이전트 스크립트 루트에 대해 이를 사용하세요.",
  "agents.defaults.memorySearch.qmd.extraCollections.pattern":
    "컬렉션 내의 어떤 파일이 인덱싱되는지 제한하려면 글로브(glob) 패턴을 사용하세요. 더 좁은 하위 집합이 필요한 경우가 아니면 기본값 `**/*.md`를 유지하세요.",
  "agents.defaults.memorySearch.multimodal":
    '구성된 추가 경로에서 이미지 및 오디오 파일을 인덱싱하기 위한 선택적인 다중 모달 메모리 설정입니다. 임베딩 모델이 교차 모달 임베딩을 명시적으로 지원하지 않는 한 이 기능을 끄고, 활성화된 동안 `memorySearch.fallback`을 "none"으로 설정하세요. 일치하는 파일은 인덱싱 중에 구성된 원격 임베딩 제공자에 업로드됩니다.',
  "agents.defaults.memorySearch.multimodal.enabled":
    "extraPaths에서 이미지/오디오 메모리 인덱싱을 활성화합니다. 이는 현재 Gemini embedding-2를 요구하며, 기본 메모리 루트를 마크다운 전용으로 유지하고 메모리 검색 대체 제공자를 비활성화하며 일치하는 바이너리 콘텐츠를 구성된 원격 임베딩 제공자에 업로드합니다.",
  "agents.defaults.memorySearch.multimodal.modalities":
    'extraPaths에서 인덱싱되는 다중 모달 파일 형식을 선택합니다: "image", "audio", 또는 "all". 큰 바이너리 말뭉치(corpora)를 의도치 않게 인덱싱하지 않도록 이 범위를 좁게 유지하세요.',
  "agents.defaults.memorySearch.multimodal.maxFileBytes":
    "메모리 인덱싱 중에 다중 모달 파일을 건너뛰기 전 각 파일당 허용되는 최대 바이트 수를 설정합니다. 업로드 비용과 인덱싱 지연 시간을 제한하기 위해 이를 사용하거나 짧고 고품질인 오디오 클립의 경우 값을 높이세요.",
  "agents.defaults.memorySearch.experimental.sessionMemory":
    "응답이 이전 채팅 턴을 참조할 수 있도록 세션 스크립트를 메모리 검색에 인덱싱합니다. 인덱싱 비용과 스토리지 사용량이 모두 증가하므로 스크립트 회상이 필요한 경우가 아니면 꺼두세요.",
  "agents.defaults.memorySearch.provider":
    '메모리 벡터를 빌드/쿼리하는 데 사용되는 임베딩 백엔드를 선택합니다: "openai", "gemini", "voyage", "mistral", "bedrock", "lmstudio", "ollama", 또는 "local". 가장 신뢰할 수 있는 제공자를 여기에 유지하고 복원력을 위한 대체를 구성하세요.',
  "agents.defaults.memorySearch.model":
    "기본 모델이 아닌 다른 모델이 필요할 때 선택된 메모리 제공자가 사용하는 임베딩 모델 재정의입니다. 제공자 기본값을 넘어서는 명시적인 회상 품질/비용 조정이 필요할 때만 이를 설정하세요.",
  "agents.defaults.memorySearch.inputType":
    "쿼리 및 문서 임베딩 요청 모두에 동일한 레이블이 적용되어야 할 때만 이 선택적인 제공자별 `input_type` 값을 사용하세요. 비대칭 제공자의 경우 queryInputType 및 documentInputType을 선호하세요.",
  "agents.defaults.memorySearch.queryInputType":
    "쿼리 시점의 메모리 임베딩을 위한 선택적인 제공자별 `input_type` 값입니다. 쿼리 레이블이 필요한 OpenAI 호환 비대칭 임베딩 엔드포인트와 함께 이 값을 사용하세요.",
  "agents.defaults.memorySearch.documentInputType":
    "문서 및 인덱싱 메모리 임베딩을 위한 선택적인 제공자별 `input_type` 값입니다. 구절(passage) 또는 문서 레이블이 필요한 OpenAI 호환 비대칭 임베딩 엔드포인트와 함께 이 값을 사용하세요.",
  "agents.defaults.memorySearch.outputDimensionality":
    "메모리 임베딩을 위한 제공자별 출력 벡터 크기 재정의입니다. Gemini embedding-2는 768, 1536, 또는 3072를 지원합니다; Titan V2, Cohere V4, Nova와 같은 Bedrock 제품군은 허용되는 자체 크기를 노출합니다. 저장된 벡터 차원은 일관성을 유지해야 하므로 값을 변경하면 전체 재색인이 예상됩니다.",
  "agents.defaults.memorySearch.remote.baseUrl":
    "OpenAI 호환 프록시나 사용자 지정 Gemini 기본 URL과 같이 임베딩 API 엔드포인트를 재정의합니다. 자체 게이트웨이 또는 공급업체 엔드포인트를 통해 라우팅할 때만 이를 사용하고 그렇지 않은 경우 제공자 기본값을 유지하세요.",
  "agents.defaults.memorySearch.remote.apiKey":
    "메모리 인덱싱 및 쿼리 시점의 임베딩 호출에 사용되는 전용 API 키를 제공합니다. 메모리 임베딩이 전역 기본값이나 환경 변수와 다른 자격 증명을 사용해야 할 때 이를 사용하세요.",
  "agents.defaults.memorySearch.remote.headers":
    "제공자 기본값과 병합되어 원격 임베딩 요청에 사용자 지정 HTTP 헤더를 추가합니다. 프록시 인증 및 테넌트 라우팅 헤더에 이를 사용하고 민감한 메타데이터가 유출되지 않도록 값을 최소로 유지하세요.",
  "agents.defaults.memorySearch.remote.nonBatchConcurrency":
    "배치(batch)가 아닌 메모리 인덱싱 동안의 동시 인라인 임베딩 요청을 제어합니다. Ollama와 같은 로컬 또는 소규모 자체 호스팅 제공자의 경우 낮은 값을 사용하세요; 배치 임베딩 동시성은 remote.batch에서 개별적으로 구성됩니다.",
  "agents.defaults.memorySearch.remote.batch.enabled":
    "지원되는 경우(OpenAI/Gemini) 임베딩 작업을 위한 제공자 배치 API를 활성화하여 더 큰 인덱스 실행 시 처리량을 향상시킵니다. 제공자 배치 실패를 디버깅하거나 매우 작은 워크로드를 실행하는 경우가 아니면 활성화 상태로 유지하세요.",
  "agents.defaults.memorySearch.remote.batch.wait":
    "인덱싱 작업이 완료되기 전에 배치 임베딩 작업이 완전히 끝나기를 기다립니다. 결정론적인 인덱싱 상태를 위해 활성화 상태를 유지하고, 지연된 일관성을 허용하는 경우에만 비활성화하세요.",
  "agents.defaults.memorySearch.remote.batch.concurrency":
    "인덱싱 중 동시에 실행되는 임베딩 배치 작업의 수를 제한합니다(기본값: 2). 더 빠른 대량 인덱싱을 위해 신중하게 늘리되, 제공자 속도 제한 및 대기열 오류에 주의하세요.",
  "agents.defaults.memorySearch.remote.batch.pollIntervalMs":
    "시스템이 제공자 API에서 배치 작업 상태를 폴링하는 빈도(밀리초)를 제어합니다(기본값: 2000). API 트래픽을 줄이려면 간격을 더 길게 사용하고, 완료 감지를 더 빨리 하려면 간격을 짧게 사용하세요.",
  "agents.defaults.memorySearch.remote.batch.timeoutMinutes":
    "전체 임베딩 배치 작업에 대한 최대 대기 시간(분)을 설정합니다(기본값: 60). 매우 큰 말뭉치나 느린 제공자의 경우 이 값을 늘리고, 자동화가 많은 흐름에서 빨리 실패하게 하려면 값을 낮추세요.",
  "agents.defaults.memorySearch.local.modelPath":
    "GGUF 파일 경로 또는 `hf:` URI와 같이 로컬 메모리 검색을 위한 로컬 임베딩 모델 소스를 지정합니다. 제공자가 `local`인 경우에만 이를 사용하고 큰 인덱스를 재빌드하기 전에 모델 호환성을 검증하세요.",
  "agents.defaults.memorySearch.local.contextSize":
    '임베딩 컨텍스트를 생성할 때 node-llama-cpp에 전달되는 컨텍스트 창 크기입니다(기본값: 4096). 4096은 가중치가 아닌 VRAM을 제한하면서 일반적인 메모리 검색 청크(128–512 토큰)를 안전하게 덮습니다. 리소스가 제한된 호스트에서는 1024–2048로 낮추세요. node-llama-cpp가 모델의 훈련된 최대값을 사용하게 하려면 "auto"로 설정하세요 (대형 모델에는 권장하지 않음, 예: 40,960 토큰으로 훈련된 Qwen3-Embedding-8B는 VRAM을 ~8.8GB에서 ~32GB로 밀어올릴 수 있음).',
  "agents.defaults.memorySearch.fallback":
    '기본 임베딩이 실패할 때 사용되는 백업 제공자입니다: "openai", "gemini", "voyage", "mistral", "bedrock", "lmstudio", "ollama", "local" 또는 "none". 프로덕션 안정성을 위해 실제 대체를 설정하고, 명시적인 실패를 선호하는 경우에만 "none"을 사용하세요.',
  "agents.defaults.memorySearch.store.path":
    "각 에이전트에 대해 SQLite 메모리 인덱스가 디스크의 어디에 저장되는지 설정합니다. 사용자 지정 스토리지 위치 지정 또는 백업 정책 조정이 필요하지 않은 한 기본값 `~/.openclaw/memory/{agentId}.sqlite`를 유지하세요.",
  "agents.defaults.memorySearch.store.vector.enabled":
    "메모리 검색 시 벡터 유사성 쿼리에 사용되는 sqlite-vec 확장을 활성화합니다(기본값: true). 정상적인 의미 체계 회상을 위해 활성화 상태로 유지하고 디버깅 또는 대체 전용(fallback-only) 작동을 위해서만 비활성화하세요.",
  "agents.defaults.memorySearch.store.vector.extensionPath":
    "자동 감지된 sqlite-vec 확장 라이브러리 경로(`.dylib`, `.so` 또는 `.dll`)를 재정의합니다. 런타임이 sqlite-vec를 자동으로 찾지 못하거나 잘 알려진 안정적인 빌드를 고정할 때 이를 사용하세요.",
  "agents.defaults.memorySearch.chunking.tokens":
    "임베딩/인덱싱 전 메모리 소스를 분할할 때 사용되는 청크 크기(토큰 단위)입니다. 청크당 더 넓은 컨텍스트를 위해 이 값을 늘리거나 정밀한(pinpoint) 검색 조회의 정밀도를 높이기 위해 값을 낮추세요.",
  "agents.defaults.memorySearch.chunking.overlap":
    "분할 경계 근처의 컨텍스트 연속성을 보존하기 위해 인접한 메모리 청크 간의 토큰 중첩입니다. 인덱스 크기를 너무 공격적으로 늘리지 않으면서 경계 누락을 줄이려면 적당한 중첩을 사용하세요.",
  "agents.defaults.memorySearch.query.maxResults":
    "다운스트림 재순위 지정(reranking) 및 프롬프트 주입 이전에 검색에서 반환되는 메모리 적중 결과의 최대 수입니다. 더 넓은 범위의 회상을 원하면 값을 높이고 더 타이트한 프롬프트와 빠른 응답을 원하면 값을 낮추세요.",
  "agents.defaults.memorySearch.query.minScore":
    "메모리 결과를 최종 회상 출력에 포함하기 위한 최소 관련성 점수 임계값입니다. 약하거나 잡음이 있는 일치를 줄이려면 값을 높이고, 더 관대한 검색이 필요할 때 낮추세요.",
  "agents.defaults.memorySearch.query.hybrid.enabled":
    "혼합된 정확도 + 의미 체계 쿼리에서 더 나은 회상을 위해 BM25 키워드 일치와 벡터 유사성을 결합합니다. 문제 해결을 위해 순위 결정 동작을 분리하는 경우가 아니면 활성화 상태로 유지하세요.",
  "agents.defaults.memorySearch.query.hybrid.vectorWeight":
    "하이브리드 순위 결정에 의미 체계 유사성이 얼마나 강하게 영향을 미치는지 제어합니다(0-1). 정확한 용어보다 의역(paraphrase) 일치가 더 중요할 때 값을 늘리고 더 엄격한 키워드 강조를 위해 줄이세요.",
  "agents.defaults.memorySearch.query.hybrid.textWeight":
    "하이브리드 순위 결정에 BM25 키워드 관련성이 얼마나 강하게 영향을 미치는지 제어합니다(0-1). 정확한 용어 일치를 위해 늘리고, 의미 체계 일치가 더 높은 순위를 가져야 할 때 줄이세요.",
  "agents.defaults.memorySearch.query.hybrid.candidateMultiplier":
    "재순위 지정(reranking) 이전에 후보 풀을 확장합니다(기본값: 4). 잡음이 많은 말뭉치(corpora)에서 더 나은 회상을 위해 이 값을 높이되, 계산량이 더 많아지고 검색 속도가 약간 느려질 수 있음을 예상하세요.",
  "agents.defaults.memorySearch.query.hybrid.mmr.enabled":
    "단일 답변 창에서 결과를 다양화하고 거의 중복되는 스니펫을 줄이기 위해 MMR 재순위 지정을 추가합니다. 회상이 반복적으로 보일 때 활성화하고, 엄격한 점수 순서 지정을 위해 꺼두세요.",
  "agents.defaults.memorySearch.query.hybrid.mmr.lambda":
    "MMR 관련성 대 다양성의 균형을 설정합니다(0 = 가장 다양함, 1 = 가장 관련성 높음, 기본값: 0.7). 낮은 값은 반복을 줄이고 높은 값은 밀접한 관련성을 유지하지만 중복될 수 있습니다.",
  "agents.defaults.memorySearch.query.hybrid.temporalDecay.enabled":
    "점수가 비슷할 때 최신 메모리가 오래된 메모리보다 순위가 높을 수 있도록 최신성 감쇠(recency decay)를 적용합니다. 적시성이 중요할 때 활성화하고 시간을 초월하는 참조 지식의 경우 꺼두세요.",
  "agents.defaults.memorySearch.query.hybrid.temporalDecay.halfLifeDays":
    "시간적 감쇠가 활성화되었을 때 오래된 메모리가 순위를 잃는 속도를 제어합니다(반감기 일수, 기본값: 30). 낮은 값은 최근 컨텍스트를 더 공격적으로 우선시합니다.",
  "agents.defaults.memorySearch.cache.enabled":
    "재인덱싱 및 증분 업데이트가 더 빨리 실행되도록 계산된 청크 임베딩을 SQLite에 캐시합니다(기본값: true). 캐시 정확성을 조사하거나 디스크 사용량을 최소화하는 경우가 아니면 활성화 상태로 유지하세요.",
  memory: "메모리 백엔드 구성(전역)입니다.",
  "memory.backend":
    '전역 메모리 엔진을 선택합니다: "builtin"은 OpenClaw 메모리 내부 기능을 사용하고, "qmd"는 QMD 사이드카 파이프라인을 사용합니다. QMD를 의도적으로 운영하지 않는 한 "builtin"을 유지하세요.',
  "memory.citations":
    '응답 시 인용(citation) 가시성을 제어합니다: "auto"는 유용할 때 인용을 표시하고, "on"은 항상 표시하며, "off"는 숨깁니다. 신호 대 잡음비 균형을 맞춘 기본값으로 "auto"를 유지하세요.',
  "memory.qmd.command":
    "QMD 백엔드에서 사용하는 `qmd` 바이너리의 실행 경로를 설정합니다(기본값: PATH에서 확인됨). 여러 개의 qmd가 설치되어 있거나 환경에 따라 PATH가 다를 때 명시적인 절대 경로를 사용하세요.",
  "memory.qmd.mcporter":
    "각 호출마다 `qmd`를 생성하는 대신 mcporter(MCP 런타임)를 통해 QMD 작업을 라우팅합니다. 대형 모델에서 콜드 스타트 비용이 높을 때 이를 사용하고, 단순한 로컬 설정의 경우 직접 프로세스 모드를 유지하세요.",
  "memory.qmd.mcporter.enabled":
    "요청마다 qmd를 생성하는 대신 mcporter 데몬을 통해 QMD를 라우팅하여 대형 모델에 대한 콜드 스타트 오버헤드를 줄입니다. mcporter가 설치되고 구성되지 않은 한 비활성화 상태로 유지하세요.",
  "memory.qmd.mcporter.serverName":
    "QMD 호출에 사용되는 mcporter 서버 대상의 이름을 지정합니다(기본값: qmd). mcporter 설정이 qmd mcp 연결 유지를 위해 사용자 지정 서버 이름을 사용할 때만 변경하세요.",
  "memory.qmd.mcporter.startDaemon":
    "mcporter 지원 QMD 모드가 활성화되었을 때 자동으로 mcporter 데몬을 시작합니다(기본값: true). 프로세스 수명 주기가 서비스 감독자에 의해 외부에서 관리되지 않는 한 활성화 상태로 유지하세요.",
  "memory.qmd.searchMode":
    'QMD 검색(retrieval) 경로를 선택합니다: "query"는 표준 쿼리 흐름을 사용하고, "search"는 검색 지향 흐름을 사용하며, "vsearch"는 벡터 검색을 강조합니다. 관련성 품질을 조정하는 경우가 아니면 기본값을 유지하세요.',
  "memory.qmd.searchTool":
    "`searchMode`를 의미론적 검색 모드로 유지하면서 QMD 검색에 사용되는 정확한 mcporter 도구 이름을 재정의합니다. QMD MCP 서버가 `hybrid_search`와 같은 사용자 지정 도구를 노출할 때만 이를 사용하고 일반적인 내장 도구 매핑의 경우 설정하지 않은 상태로 두세요.",
  "memory.qmd.includeDefaultMemory":
    "기본 메모리 파일(MEMORY.md 및 memory/**/*.md)을 QMD 컬렉션으로 자동 인덱싱합니다. 명시적인 사용자 지정 경로를 통해서만 인덱싱을 제어하고 싶지 않다면 활성화 상태로 유지하세요.",
  "memory.qmd.paths":
    "QMD 인덱싱에 포함할 사용자 지정 디렉터리나 파일을 각각 선택적인 이름과 글로브 패턴과 함께 추가합니다. 기본 메모리 경로 외부에 있는 프로젝트별 지식 위치에 이를 사용하세요.",
  "memory.qmd.paths.path":
    "절대 경로 또는 `~` 상대 경로를 사용하여 QMD가 스캔해야 하는 루트 위치를 정의합니다. 컬렉션 ID가 환경 전반에 걸쳐 표류(drift)하지 않도록 안정적인 디렉터리를 사용하세요.",
  "memory.qmd.paths.pattern":
    "글로브 패턴을 사용하여 인덱싱된 각 루트 아래의 파일을 필터링합니다(기본값 `**/*.md`). 디렉터리에 파일 유형이 혼합되어 있을 때 노이즈와 인덱싱 비용을 줄이려면 더 좁은 패턴을 사용하세요.",
  "memory.qmd.paths.name":
    "파일 시스템 위치에서 파생하는 대신 인덱싱된 경로에 대해 안정적인 컬렉션 이름을 설정합니다. 경로가 머신마다 다르지만 일관된 컬렉션 ID를 원할 때 이를 사용하세요.",
  "memory.qmd.sessions.enabled":
    "회상 시 이전 대화 콘텐츠가 포함될 수 있도록 세션 스크립트를 QMD에 인덱싱합니다(실험적 기능, 기본값: false). 스크립트 메모리가 필요하고 더 큰 인덱스 변화(churn)를 수용할 수 있을 때만 활성화하세요.",
  "memory.qmd.sessions.exportDir":
    "정리된 세션 내보내기가 QMD 인덱싱 이전에 기록되는 위치를 재정의합니다. 기본 상태 스토리지가 제한되어 있거나 내보내기가 관리되는 볼륨(volume)에 위치해야 할 때 이를 사용하세요.",
  "memory.qmd.sessions.retentionDays":
    "자동 제거 전까지 내보낸 세션 파일이 보존되는 기간을 정의합니다(일 단위, 기본값: 무제한). 스토리지 위생(hygiene) 또는 규정 준수 보존 정책을 위해 유한한 값을 설정하세요.",
  "memory.qmd.update.interval":
    "QMD가 소스 콘텐츠에서 인덱스를 새로 고치는 빈도를 설정합니다(기간 문자열, 기본값: 5m). 간격이 짧을수록 최신 상태가 개선되지만 백그라운드 CPU 및 I/O가 증가합니다.",
  "memory.qmd.update.debounceMs":
    "연속적인 QMD 새로고침 시도 사이의 최소 지연 시간을 밀리초 단위로 설정합니다(기본값: 15000). 빈번한 파일 변경으로 인해 업데이트 스래싱(thrash)이나 불필요한 백그라운드 부하가 발생하는 경우 이 값을 늘리세요.",
  "memory.qmd.update.onBoot":
    "수명이 긴 QMD 관리자가 열릴 때 초기 QMD 업데이트를 실행합니다(기본값: true). 관리자 시작 업데이트와 레거시/옵트인 시작 새로고침을 비활성화하려면 false로 설정하세요.",
  "memory.qmd.update.startup":
    "메모리가 처음 사용되기 전에 게이트웨이 시작 시 QMD 새로 고침을 예약할지 여부를 제어합니다(`off`, `idle` 또는 `immediate`; 기본값: off). 가장 빠른 시작과 지연 메모리 초기화를 위해 off를 유지하세요.",
  "memory.qmd.update.startupDelayMs":
    '옵트인 `memory.qmd.update.startup: "idle"` 새로 고침이 실행되기 전의 유휴 지연 시간을 설정합니다(기본값: 120000). 채널 및 제공자에게 콜드 스타트 CPU를 사용할 수 있도록 이 값을 늘리세요.',
  "memory.qmd.update.waitForBootSync":
    "초기 관리자 시작 업데이트가 완료될 때까지 QMD 관리자 열기를 차단합니다(기본값: false). 시작 새로고침은 `memory.qmd.update.startup`을 통해 옵트인(opt-in) 상태로 유지됩니다.",
  "memory.qmd.update.embedInterval":
    "QMD가 임베딩을 다시 계산하는 빈도를 설정합니다(기간 문자열, 기본값: 60m; 주기적인 임베딩을 비활성화하려면 0으로 설정). 간격이 낮을수록 최신 상태는 개선되지만 임베딩 워크로드와 비용이 증가합니다.",
  "memory.qmd.update.commandTimeoutMs":
    "컬렉션 목록 조회/추가와 같은 QMD 유지 관리 명령의 시간 제한을 밀리초 단위로 설정합니다(기본값: 30000). 느린 디스크나 명령 완료를 지연시키는 원격 파일 시스템에서 실행할 때 이 값을 늘리세요.",
  "memory.qmd.update.updateTimeoutMs":
    "각 `qmd update` 주기에 대한 최대 실행 시간을 밀리초 단위로 설정합니다(기본값: 120000). 큰 컬렉션의 경우 이 값을 높이고, 자동화에서 더 빠른 실패 감지를 원하면 낮추세요.",
  "memory.qmd.update.embedTimeoutMs":
    "각 `qmd embed` 주기에 대한 최대 실행 시간을 밀리초 단위로 설정합니다(기본값: 120000). 더 무거운 임베딩 워크로드나 느린 하드웨어의 경우 값을 늘리고 빡빡한 SLA 하에서 빨리 실패하게 하려면 낮추세요.",
  "memory.qmd.limits.maxResults":
    "각 검색(recall) 요청에 대해 에이전트 루프로 반환되는 QMD 적중 결과 수를 제한합니다(기본값: 6). 더 넓은 회상 컨텍스트를 위해 이 값을 늘리거나 프롬프트를 타이트하고 빠르게 유지하려면 낮추세요.",
  "memory.qmd.limits.maxSnippetChars":
    "QMD 적중에서 추출되는 스니펫의 최대 길이를 문자 단위로 제한합니다(기본값: 700). 프롬프트가 빠르게 비대해질 때 이 값을 낮추고 답변이 중요한 세부 정보를 일관되게 놓칠 때만 값을 높이세요.",
  "memory.qmd.limits.maxInjectedChars":
    "모든 적중에 걸쳐 한 턴에 주입될 수 있는 QMD 텍스트의 양을 제한합니다. 프롬프트 비대화와 지연 시간을 제어하려면 낮은 값을 사용하고, 컨텍스트가 일관되게 잘릴 때만 높이세요.",
  "memory.qmd.limits.timeoutMs":
    "쿼리당 QMD 검색 시간 제한을 밀리초 단위로 설정합니다(기본값: 4000). 큰 인덱스나 느린 환경의 경우 이 값을 늘리고, 요청 지연 시간을 제한하려면 낮추세요.",
  "memory.qmd.scope":
    "session.sendPolicy 스타일의 규칙을 사용하여 QMD 검색 기능의 대상이 되는 세션/채널을 정의합니다. 교차 채팅 메모리 공유를 의도적으로 원하지 않는 한 기본 직접(direct-only) 범위를 유지하세요.",
  "agents.defaults.memorySearch.cache.maxEntries":
    "메모리 검색을 위해 SQLite에 유지되는 캐시된 임베딩에 대한 최선의 최대 한도(upper bound)를 설정합니다. 디스크 증가를 제어하는 것이 최고 재인덱스 속도보다 더 중요할 때 이를 사용하세요.",
  "agents.defaults.memorySearch.sync.onSessionStart":
    "초기 턴에서 최신 메모리 콘텐츠를 볼 수 있도록 세션 시작 시 메모리 인덱스 동기화를 트리거합니다. 초기 턴 지연 시간보다 시작 시점의 최신 상태가 더 중요할 때 활성화 상태로 유지하세요.",
  "agents.defaults.memorySearch.sync.onSearch":
    "콘텐츠 변경 사항이 감지된 후 검색 시(on search) 재인덱싱을 예약하여 지연(lazy) 동기화를 사용합니다. 유휴 오버헤드를 낮추려면 활성화 상태로 유지하고 쿼리 이전에 사전 동기화된 인덱스가 필요한 경우 비활성화하세요.",
  "agents.defaults.memorySearch.sync.watch":
    "메모리 파일을 감시하고 파일 변경 이벤트(chokidar)에 따라 인덱스 업데이트를 예약합니다. 실시간에 가까운 최신 상태를 위해 활성화하고 감시(watch) 변화(churn) 노이즈가 너무 심한 매우 큰 작업 영역에서는 비활성화하세요.",
  "agents.defaults.memorySearch.sync.watchDebounceMs":
    "재인덱스가 실행되기 전에 빠른 파일 감시 이벤트를 병합하기 위한 디바운스 창(밀리초)입니다. 자주 쓰이는 파일의 변화(churn)를 줄이려면 이 값을 늘리거나 더 빠른 최신 상태 갱신을 위해 낮추세요.",
  "agents.defaults.memorySearch.sync.embeddingBatchTimeoutSeconds":
    "메모리 인덱싱 동안 인라인 임베딩 배치에 대한 시간 제한을 재정의합니다. 제공자 기본값을 사용하려면 설정하지 않은 상태로 두세요: local, Ollama 및 LM Studio와 같은 로컬/자체 호스팅 제공자의 경우 600초, 호스팅된 제공자의 경우 120초입니다.",
  "agents.defaults.memorySearch.sync.sessions.deltaBytes":
    "세션 스크립트 변경 사항이 재인덱스를 트리거하기 전에 최소 이만큼의 새롭게 추가된 바이트가 필요합니다(기본값: 100000). 잦은 소규모 재인덱스를 줄이려면 늘리고 더 빠른 스크립트 최신화를 원하면 낮추세요.",
  "agents.defaults.memorySearch.sync.sessions.deltaMessages":
    "재인덱스가 트리거되기 전에 최소 이만큼의 추가된 스크립트 메시지가 필요합니다(기본값: 50). 실시간에 가까운 스크립트 회상을 원하면 이 값을 낮추고 인덱싱 변화를 줄이려면 높이세요.",
  "agents.defaults.memorySearch.sync.sessions.postCompactionForce":
    "압축에 의해 트리거된 스크립트 업데이트 후 세션 메모리 검색 재인덱스를 강제합니다(기본값: true). 압축된 요약을 즉시 검색할 수 있어야 할 때 활성화 상태로 유지하고 쓰기 시점의 인덱싱 압력을 줄이려면 비활성화하세요.",
  ui: "제어 표면에 표시되는 강조(accenting) 및 어시스턴트 ID를 위한 UI 프레젠테이션 설정입니다. 런타임 동작을 변경하지 않고 브랜딩 및 가독성 사용자 지정을 위해 이를 사용하세요.",
  "ui.seamColor":
    "강조, 배지, 시각적 ID 단서(cues)를 위해 UI 표면에서 사용하는 기본 강조 색상입니다. 밝고 어두운 테마 전반에 걸쳐 읽을 수 있는 고대비 값을 사용하세요.",
  "ui.assistant":
    "UI 표면에 표시되는 이름 및 아바타에 대한 어시스턴트 표시 ID 설정입니다. 이 값들을 운영자 대면(operator-facing) 페르소나 및 지원 예상치에 맞춰 정렬되게 유지하세요.",
  "ui.assistant.name":
    "UI 뷰, 채팅 크롬(chrome), 상태 컨텍스트에 표시되는 어시스턴트 표시 이름입니다. 운영자가 어떤 어시스턴트 페르소나가 활성 상태인지 안정적으로 식별할 수 있도록 이 이름을 일관되게 유지하세요.",
  "ui.assistant.avatar":
    "UI 표면에서 사용되는 어시스턴트 아바타 이미지 소스입니다(런타임 지원에 따라 URL, 경로 또는 데이터 URI). 깔끔한 렌더링을 위해 신뢰할 수 있는 에셋과 일관된 브랜드 치수를 사용하세요.",
  plugins:
    "확장 프로그램 활성화, 로드 범위 제한, 항목 구성 및 설치 추적을 위한 플러그인 시스템 제어입니다. 프로덕션 환경에서는 플러그인 정책을 명시적이고 최소 권한으로 유지하세요.",
  "plugins.enabled":
    "시작 및 구성 다시 로드 중에 전역적으로 플러그인/확장 프로그램 로딩을 활성화하거나 비활성화합니다(기본값: true). 배포에서 확장 프로그램 기능이 필요할 때만 활성화 상태로 유지하세요.",
  "plugins.allow":
    "선택적인 플러그인 ID 허용 목록입니다. 설정되면 나열된 플러그인만 로드 자격이 주어집니다. 구성된 번들 채팅 채널은 채널이 구성에서 명시적으로 활성화될 때 여전히 자체 번들 플러그인을 활성화할 수 있습니다. 통제된 환경에서 승인된 확장 프로그램 인벤토리를 강제하려면 이를 사용하세요.",
  "plugins.deny":
    "허용 목록이나 경로에 포함되더라도 차단되는 플러그인 ID의 선택적인 거부 목록입니다. 비상 롤백 및 위험한 플러그인에 대한 하드 차단을 위해 거부 규칙을 사용하세요.",
  "plugins.load":
    "플러그인이 발견되는 파일 시스템 경로를 지정하기 위한 플러그인 로더 구성 그룹입니다. 신뢰할 수 없는 확장이 우발적으로 로드되는 것을 방지하기 위해 로드 경로를 명시적이고 검토된 상태로 유지하세요.",
  "plugins.load.paths":
    "기본 내장 경로 이외에 로더가 스캔하는 추가 플러그인 파일 또는 디렉터리입니다. 전용 확장 디렉터리를 사용하고 관련 없는 실행 파일 콘텐츠가 있는 광범위한 경로는 피하세요.",
  "plugins.slots":
    "단 하나의 플러그인만이 해당 기능을 제공할 수 있도록 메모리와 같은 독점적인 런타임 슬롯을 어떤 플러그인이 소유할지 선택합니다. 상충되는 동작을 가진 제공자가 겹치는 것을 피하기 위해 명시적인 슬롯 소유권을 사용하세요.",
  "plugins.slots.memory":
    '활성 메모리 플러그인을 ID로 선택하거나 메모리 플러그인을 비활성화하려면 "none"을 선택하세요.',
  "plugins.slots.contextEngine":
    "하나의 플러그인이 컨텍스트 오케스트레이션 동작을 제공할 수 있도록 활성 컨텍스트 엔진 플러그인을 ID로 선택합니다.",
  "plugins.bundledDiscovery":
    'plugins.allow가 구성될 때 번들 플러그인 런타임 검색을 제어합니다. "allowlist"(기본값)는 타사 플러그인과 마찬가지로 plugins.allow에 의해 번들 제공자 플러그인을 제한(gate)합니다. "compat"은 모든 채팅 턴에서 번들 제공자 플러그인을 강제 로드할 수 있는 레거시 동작을 유지합니다.',
  "plugins.entries":
    "활성화 및 플러그인별 런타임 구성 페이로드를 포함하여 플러그인 ID로 키가 지정된 플러그인별 설정입니다. 전역 로더 정책을 변경하지 않고 범위가 지정된 플러그인 튜닝을 위해 이를 사용하세요.",
  "plugins.entries.*.enabled":
    "전역 플러그인 정책 위에 적용되는(재시작 필요) 특정 항목에 대한 플러그인별 활성화 재정의입니다. 여러 환경에 걸쳐 플러그인 롤아웃을 점진적으로 스테이징하려면 이를 사용하세요.",
  "plugins.entries.*.hooks":
    "코어가 적용하는 안전 게이트를 위한 플러그인별 형식화된(typed) 훅 정책 제어입니다. 전체 플러그인을 비활성화하지 않고 영향력이 큰 훅 카테고리를 제한하려면 이를 사용하세요.",
  "plugins.entries.*.hooks.allowPromptInjection":
    "이 플러그인이 형식화된 훅을 통해 프롬프트를 변경(mutate)할 수 있는지 제어합니다. 레거시 `modelOverride` 및 `providerOverride` 동작은 보존하면서 `before_prompt_build`를 차단하고 레거시 `before_agent_start`의 프롬프트 변경 필드를 무시하려면 false로 설정하세요.",
  "plugins.entries.*.hooks.allowConversationAccess":
    "이 플러그인이 `llm_input`, `llm_output`, `before_agent_finalize`, `agent_end`와 같은 형식화된 훅에서 원시 대화 콘텐츠를 읽을 수 있는지 제어합니다. 번들로 제공되지 않는 플러그인은 명시적으로 동의(opt-in)해야 합니다.",
  "plugins.entries.*.hooks.timeoutMs":
    "최대 600000으로 제한되는 이 플러그인의 형식화된 훅에 대한 기본 시간 제한(밀리초)입니다. 플러그인 코드를 변경하지 않고 느린 플러그인 훅의 한도를 정하기 위해 이를 사용하세요. hooks.timeouts의 훅별 값이 우선합니다.",
  "plugins.entries.*.hooks.timeouts":
    "형식화된 훅 이름으로 키가 지정되며 최대 600000으로 제한되는 훅별 시간 제한 재정의(밀리초)입니다. 모든 훅의 시간 제한을 높이는 대신 before_prompt_build나 agent_end와 같이 느린 것으로 알려진 훅에 대해 좁은 재정의를 사용하세요.",
  "plugins.entries.*.subagent":
    "모델 재정의 신뢰 및 허용 목록에 대한 플러그인별 하위 에이전트 런타임 제어입니다. 플러그인이 명시적으로 하위 에이전트 모델 선택을 주도(steer)해야 하는 경우가 아니면 설정하지 않은 상태로 두세요.",
  "plugins.entries.*.subagent.allowModelOverride":
    "이 플러그인이 백그라운드 하위 에이전트 실행에서 제공자/모델 재정의를 요청하도록 명시적으로 허용합니다. 플러그인이 모델 선택을 주도하도록 신뢰되지 않는 한 false로 유지하세요.",
  "plugins.entries.*.subagent.allowedModels":
    '정식 "provider/model" 참조(refs)로서 신뢰할 수 있는 플러그인 하위 에이전트 실행에 허용된 재정의 대상입니다. 어떤 모델이든 의도적으로 허용할 때만 "*"를 사용하세요.',
  "plugins.entries.*.apiKey":
    "항목 설정에서 직접적인 키 구성을 허용하는 플러그인이 소비하는 선택적 API 키 필드입니다. 비밀/환경 치환을 사용하고 실제 자격 증명을 구성 파일에 커밋하지 마세요.",
  "plugins.entries.*.env":
    "해당 플러그인 런타임 컨텍스트에만 주입되는 플러그인별 환경 변수 맵입니다. 전역 프로세스 환경을 공유하는 대신 제공자 자격 증명의 범위를 하나의 플러그인으로 지정할 때 이를 사용하세요.",
  "plugins.entries.*.config":
    "해당 플러그인 자체의 스키마 및 검증 규칙에 의해 해석되는 플러그인 정의 구성 페이로드입니다. 무시되거나 유효하지 않은 설정을 방지하려면 플러그인에서 문서화된 필드만 사용하세요.",
  "agents.list.*.identity.avatar":
    "에이전트 아바타입니다(작업 영역 상대 경로, http(s) URL 또는 데이터 URI).",
  "agents.defaults.model.primary": "기본 모델입니다(제공자/모델).",
  "agents.defaults.model.fallbacks":
    "순서화된 대체 모델입니다(제공자/모델). 기본 모델이 실패할 때 사용됩니다.",
  "agents.defaults.agentRuntime":
    "기본 에이전트 런타임 정책입니다. 생략된 ID는 기본 내장된 OpenClaw Pi를 사용합니다. 플러그인 하네스 선택을 위해서는 id=auto를, codex와 같은 등록된 하네스 ID를, 또는 claude-cli와 같은 지원되는 CLI 백엔드 별칭을 사용하세요.",
  "agents.defaults.agentRuntime.id":
    "에이전트 런타임 ID입니다: pi, auto, codex와 같이 등록된 플러그인 하네스 ID, 또는 claude-cli와 같이 지원되는 CLI 백엔드 별칭. 생략된 ID는 내장된 OpenClaw Pi를 사용합니다.",
  "agents.defaults.embeddedHarness":
    "agents.defaults.agentRuntime에 대한 레거시 입력입니다. 이를 agentRuntime으로 다시 작성하려면 openclaw doctor --fix를 실행하세요.",
  "agents.defaults.embeddedHarness.runtime":
    "agents.defaults.agentRuntime.id에 대한 레거시 입력입니다.",
  "agents.list.*.agentRuntime":
    "에이전트별 런타임 정책 재정의입니다. 기본값은 auto 모드에 머무는 동안 특정 에이전트에 대해 Codex를 강제하려면 id=codex를 사용하세요.",
  "agents.list.*.agentRuntime.id":
    "에이전트별 런타임 ID입니다: pi, auto, codex와 같이 등록된 플러그인 하네스 ID, 또는 claude-cli와 같이 지원되는 CLI 백엔드 별칭. 생략된 ID는 기본 OpenClaw Pi 동작을 상속합니다.",
  "agents.list.*.embeddedHarness":
    "agents.list.*.agentRuntime에 대한 레거시 입력입니다. 이를 agentRuntime으로 다시 작성하려면 openclaw doctor --fix를 실행하세요.",
  "agents.list.*.embeddedHarness.runtime":
    "agents.list.*.agentRuntime.id에 대한 레거시 입력입니다.",
  "agents.defaults.imageModel.primary":
    "기본 모델에 이미지 입력 기능이 없을 때 사용되는 선택적 이미지 모델(제공자/모델)입니다.",
  "agents.defaults.imageModel.fallbacks":
    "순서화된 대체 이미지 모델입니다(제공자/모델).",
  "agents.defaults.imageGenerationModel.primary":
    "공유 이미지 생성 기능에서 사용하는 선택적 이미지 생성 모델(제공자/모델)입니다.",
  "agents.defaults.imageGenerationModel.fallbacks":
    "순서화된 대체 이미지 생성 모델입니다(제공자/모델).",
  "agents.defaults.imageGenerationModel.timeoutMs":
    "image_generate 호출에 대한 기본 제공자 요청 시간 제한(밀리초)입니다. 호출별 timeoutMs가 이를 재정의합니다.",
  "agents.defaults.videoGenerationModel.primary":
    "공유 비디오 생성 기능에서 사용하는 선택적 비디오 생성 모델(제공자/모델)입니다.",
  "agents.defaults.videoGenerationModel.fallbacks":
    "순서화된 대체 비디오 생성 모델입니다(제공자/모델).",
  "agents.defaults.musicGenerationModel.primary":
    "공유 음악 생성 기능에서 사용하는 선택적 음악 생성 모델(제공자/모델)입니다.",
  "agents.defaults.musicGenerationModel.fallbacks":
    "순서화된 대체 음악 생성 모델입니다(제공자/모델).",
  "agents.defaults.mediaGenerationAutoProviderFallback":
    "true(기본값)인 경우 공유 이미지, 음악, 비디오 생성은 명시적인 기본/대체 참조 뒤에 인증 지원(auth-backed) 제공자 기본값을 자동으로 추가합니다. 명시적 대체는 유지하면서 암시적 교차 제공자 대체를 비활성화하려면 false로 설정하세요.",
  "agents.defaults.pdfModel.primary":
    "PDF 분석 도구를 위한 선택적 PDF 모델(제공자/모델)입니다. imageModel 다음 세션 모델 순으로 대체됩니다.",
  "agents.defaults.pdfModel.fallbacks":
    "순서화된 대체 PDF 모델입니다(제공자/모델).",
  "agents.defaults.pdfMaxBytesMb":
    "PDF 도구를 위한 최대 PDF 파일 크기(메가바이트)입니다(기본값: 10).",
  "agents.defaults.pdfMaxPages":
    "PDF 도구가 처리할 수 있는 최대 PDF 페이지 수입니다(기본값: 20).",
  "agents.defaults.imageMaxDimensionPx":
    "스크립트/도구 결과 이미지 페이로드를 정리할 때의 최대 이미지 측면 길이(픽셀)입니다(기본값: 1200).",
  "agents.defaults.cliBackends":
    "텍스트 전용 대체를 위한 선택적 CLI 백엔드입니다(claude-cli 등).",
  "agents.defaults.compaction":
    "컨텍스트가 토큰 한도에 가까워질 때의 압축 조정(기록 점유율, 예비 헤드룸, 압축 전 메모리 플러시 동작 포함)입니다. 긴 수명의 세션이 빡빡한 컨텍스트 창 하에서 안정적인 연속성을 필요로 할 때 이를 사용하세요.",
  "agents.defaults.compaction.mode":
    '압축 전략 모드: "default"는 기준 동작을 사용하고, "safeguard"는 최근 컨텍스트를 보존하기 위해 더 엄격한 가드레일을 적용합니다. 한도 경계 근처에서 공격적인 기록 손실이 관찰되지 않는 한 "default"를 유지하세요.',
  "agents.defaults.compaction.provider":
    "요약에 사용되는 등록된 압축 제공자 플러그인의 ID입니다. 이 값이 설정되고 제공자가 등록된 경우 기본 내장된 summarizeInStages 파이프라인 대신 해당 summarize() 메서드가 호출됩니다. 제공자 실패 시 기본 제공 기능으로 대체됩니다. 기본 내장 요약(summarization)을 사용하려면 설정하지 않은 상태로 두세요.",
  "agents.defaults.compaction.reserveTokens":
    "압축 실행 후 응답 생성 및 도구 출력을 위해 예약된 토큰 헤더룸입니다. 장황하거나 도구를 많이 사용하는 세션의 경우 더 높은 예비분을 사용하고, 더 많은 기록을 유지하는 것이 중요할 때 낮은 예비분을 사용하세요.",
  "agents.defaults.compaction.keepRecentTokens":
    "압축 중에 가장 최근의 대화 창(window)에서 보존되는 최소 토큰 예산입니다. 즉각적인 컨텍스트 연속성을 보호하려면 높은 값을 사용하고 더 긴(long-tail) 기록을 유지하려면 낮은 값을 사용하세요.",
  "agents.defaults.compaction.reserveTokensFloor":
    "Pi 압축 경로에서 reserveTokens에 강제되는 최소 하한(floor)입니다(0은 하한 가드를 비활성화함). 변동하는 토큰 추정치 하에서 지나치게 공격적인 압축을 방지하려면 0이 아닌 하한을 사용하세요.",
  "agents.defaults.compaction.maxHistoryShare":
    "압축 후 유지된 기록에 대해 허용되는 총 컨텍스트 예산의 최대 비율입니다(범위 0.1-0.9). 더 많은 생성 헤드룸을 원하면 낮은 점유율(share)을 사용하고, 더 깊은 역사적 연속성을 원하면 높은 점유율을 사용하세요.",
  "agents.defaults.compaction.identifierPolicy":
    '압축 요약에 대한 식별자 보존 정책입니다: "strict"는 내장된 불투명 식별자 보존 지침을 앞에 추가하며(기본값), "off"는 이 접두사를 비활성화하고, "custom"은 identifierInstructions를 사용합니다. 특정한 호환성 요구사항이 없는 한 "strict"를 유지하세요.',
  "agents.defaults.compaction.identifierInstructions":
    'identifierPolicy="custom"일 때 사용되는 사용자 지정 식별자 보존 지침 텍스트입니다. 압축 요약이 불투명 ID, URL, 호스트 또는 포트를 다시 쓰지(rewrite) 않도록 이 지침을 명시적이고 안전에 중점을 두어 유지하세요.',
  "agents.defaults.compaction.recentTurnsPreserve":
    "안전장치 요약(safeguard summarization) 외부에서 그대로(verbatim) 유지되는 가장 최근 사용자/어시스턴트 턴의 수입니다(기본값: 3). 정확한 최근 대화 컨텍스트를 보존하려면 이 값을 늘리거나 압축을 통해 확보하는 공간(savings)을 최대화하려면 낮추세요.",
  "agents.defaults.compaction.qualityGuard":
    "안전장치(safeguard) 압축 요약에 대한 품질 감사 재시도 설정입니다. 안전장치 모드는 이를 기본적으로 활성화합니다. 요약 감사 및 재생성을 건너뛰려면 enabled: false로 설정하세요.",
  "agents.defaults.compaction.qualityGuard.enabled":
    "안전장치 압축을 위한 요약 품질 감사 및 재생성 재시도를 활성화합니다. 기본값: 안전장치 모드에서는 true.",
  "agents.defaults.compaction.qualityGuard.maxRetries":
    "실패한 안전장치 요약 품질 감사 후 허용되는 최대 재생성 재시도 횟수입니다. 추가 지연 시간 및 토큰 비용을 제한하려면 작은 값을 사용하세요.",
  "agents.defaults.compaction.midTurnPrecheck":
    "도구 결과가 추가된 후 다음 모델 호출 전에 컨텍스트 압력(pressure)을 감지하는 선택적인 Pi 도구 루프 사전 확인(precheck)입니다. 활성화된 경우 OpenClaw는 재시도 전에 기존 사전 확인 복구 기능을 재사용하여 도구 결과를 자르거나 압축합니다.",
  "agents.defaults.compaction.midTurnPrecheck.enabled":
    "Pi 도구 루프를 위한 구조화된 턴 중간 컨텍스트 압력 검사를 활성화합니다. 기본값: false. 도구를 많이 사용하는 긴 세션이 정상적인 턴 종료 압축을 실행하기 전에 컨텍스트 오버플로에 도달하지 않는 한 비활성화 상태로 유지하세요.",
  "agents.defaults.compaction.postIndexSync":
    '압축 후 세션 메모리 재인덱스 모드를 제어합니다: "off", "async" 또는 "await"(기본값: "async"). 가장 강력한 최신성을 원하면 "await"를, 낮은 압축 지연 시간을 원하면 "async"를 사용하고 세션 메모리 동기화가 다른 곳에서 처리되는 경우에만 "off"를 사용하세요.',
  "agents.defaults.compaction.postCompactionSections":
    '에이전트가 중요한 시작 지침을 다시 실행할 수 있도록 압축 후 재주입되는 AGENTS.md H2/H3 섹션 이름입니다. 설정하지 않으면 레거시 "Every Session"/"Safety" 대체와 함께 "Session Startup"/"Red Lines"를 사용합니다. 완전히 비활성화하려면 []로 설정하세요.',
  "agents.defaults.compaction.timeoutSeconds":
    "중단되기 전에 단일 압축 작업에 허용되는 최대 시간(초)입니다(기본값: 900). 요약하는 데 더 많은 시간이 필요한 매우 큰 세션의 경우 이 값을 늘리거나 응답하지 않는 모델에서 더 빨리 실패하게 하려면 줄이세요.",
  "agents.defaults.compaction.model":
    "압축 요약에만 사용되는 선택적인 제공자/모델 재정의입니다. 압축이 세션 기본값과 다른 모델에서 실행되기를 원할 때 이를 설정하고, 그렇지 않고 기본 에이전트 모델을 계속 사용하려면 설정하지 않은 상태로 두세요.",
  "agents.defaults.compaction.truncateAfterCompaction":
    "활성화된 경우, 압축 후 활성 세션 JSONL 파일을 순환시켜 향후 턴에서는 요약 및 요약되지 않은 꼬리(tail) 부분만 로드하고 이전 전체 스크립트는 보관(archive)된 상태로 유지합니다. 장기 실행 세션에서 무제한적인 활성 스크립트 증가를 방지합니다. 기본값: false.",
  "agents.defaults.compaction.maxActiveTranscriptBytes":
    '활성 세션 스크립트가 이 크기(바이트 또는 "20mb"와 같은 문자열)에 도달하면 정상적인 로컬 압축을 트리거합니다. 성공적인 압축 시 더 작은 후속 스크립트로 순환할 수 있도록 truncateAfterCompaction이 필요합니다; 비활성화하려면 0으로 설정하거나 설정하지 않은 상태로 두세요. 이는 결코 원시 스크립트 바이트를 자르지(split) 않습니다.',
  "agents.defaults.compaction.notifyUser":
    "활성화된 경우, 압축이 시작되고 완료될 때 사용자에게 짧은 압축 알림을 보냅니다(예: '🧹 컨텍스트 압축 중...' 및 '🧹 압축 완료'). 압축을 조용하고 방해되지 않게 유지하기 위해 기본적으로 비활성화되어 있습니다.",
  "agents.defaults.compaction.memoryFlush":
    "무거운 압축 전 에이전트의 메모리 쓰기를 실행하는 압축 전 메모리 플러시 설정입니다. 긴 세션의 경우 활성화 상태를 유지하여 공격적인 잘림(trimming) 이전에 핵심적인 컨텍스트가 보존되도록 하세요.",
  "agents.defaults.compaction.memoryFlush.enabled":
    "런타임이 토큰 한도 근처에서 더 강력하게 기록 축소를 수행하기 전에 압축 전 메모리 플러시를 활성화합니다. 제한된 환경에서 의도적으로 메모리 부수 효과(side effects)를 비활성화하지 않는 한 활성화 상태로 유지하세요.",
  "agents.defaults.compaction.memoryFlush.model":
    "압축 전 메모리 플러시 턴에만 사용되는 선택적인 제공자/모델 재정의입니다. 지속성 있는 메모리 추출 시 활성 세션의 유료 모델을 피해야 할 때 ollama/qwen3:8b와 같은 로컬 모델로 설정하세요. 이 재정의는 정확하며 활성 모델 대체 체인을 상속하지 않습니다.",
  "agents.defaults.compaction.memoryFlush.softThresholdTokens":
    "압축 전 메모리 플러시 실행을 트리거하는 압축까지의 임계값 거리(토큰 수)입니다. 더 안전한 지속성을 위해 임계값을 일찍 설정하거나, 플러시 빈도를 낮추려면 더 빠듯한 임계값을 사용하세요.",
  "agents.defaults.compaction.memoryFlush.forceFlushTranscriptBytes":
    '스크립트 파일 크기가 이 임계값(바이트 또는 "2mb"와 같은 문자열)에 도달할 때 압축 전 메모리 플러시를 강제합니다. 토큰 카운터가 최신 상태가 아니더라도 긴 세션이 멈추는 것을 방지하려면 이를 사용하세요. 비활성화하려면 0으로 설정하세요.',
  "agents.defaults.compaction.memoryFlush.prompt":
    "메모리 후보를 생성할 때 압축 전 메모리 플러시 턴에 사용되는 사용자 프롬프트 템플릿입니다. 기본 메모리 플러시 동작을 넘어서 사용자 지정 추출 지침이 필요할 때만 이를 사용하세요.",
  "agents.defaults.compaction.memoryFlush.systemPrompt":
    "추출 스타일 및 안전 제약을 제어하기 위한 압축 전 메모리 플러시 턴의 시스템 프롬프트 재정의입니다. 사용자 지정 지침으로 인해 메모리 품질이 저하되거나 민감한 컨텍스트가 유출되지 않도록 주의해서 사용하세요.",
  "agents.defaults.embeddedPi":
    "작업 영역의 로컬 Pi 설정이 OpenClaw 세션에서 신뢰되고 적용되는 방식에 대한 내장된 Pi 러너 강화 제어입니다.",
  "agents.defaults.embeddedPi.projectSettingsPolicy":
    '내장된 Pi가 작업 영역의 로컬 `.pi/config/settings.json`을 처리하는 방식입니다: "sanitize"(기본값)는 shellPath/shellCommandPrefix를 제거하고, "ignore"는 프로젝트 설정을 완전히 비활성화하며, "trusted"는 프로젝트 설정을 있는 그대로 적용합니다.',
  "agents.defaults.embeddedPi.executionContract":
    '내장된 Pi 실행 컨트랙트입니다: "default"는 표준 러너 동작을 유지하는 반면, "strict-agentic"은 OpenAI/OpenAI Codex GPT-5 제품군 실행이 계획이나 채우기(filler)에서 멈추지 않고 실제 방해 요인(blocker)에 부딪힐 때까지 계속 행동하도록 합니다.',
  "agents.list[].embeddedPi":
    "선택적인 에이전트별 내장 Pi 재정의입니다. 전역 기본값을 변경하지 않고 특정 에이전트를 더 엄격한 GPT-5 실행 동작에 선택적으로 포함시키려면 이를 사용하세요.",
  "agents.list[].embeddedPi.executionContract":
    '선택적인 에이전트별 내장 Pi 실행 컨트랙트 재정의입니다. OpenAI/OpenAI Codex GPT-5 제품군 실행 시 계획 전용 턴에서도 해당 에이전트가 계속 행동하도록 하려면 "strict-agentic"으로 설정하고, 표준 러너 동작을 상속하려면 "default"로 설정하세요.',
  "agents.defaults.humanDelay.mode":
    '블록 응답에 대한 지연 스타일입니다("off", "natural", "custom").',
  "agents.defaults.humanDelay.minMs":
    "사용자 지정 humanDelay의 최소 지연 시간(ms)입니다(기본값: 800).",
  "agents.defaults.humanDelay.maxMs":
    "사용자 지정 humanDelay의 최대 지연 시간(ms)입니다(기본값: 2500).",
  commands:
    "제공자 전반에 걸친 채팅 명령 표면, 소유자 제어(gating) 및 권한 상승된 명령 액세스 동작을 제어합니다. 더 엄격한 운영자 제어나 더 넓은 명령 가용성이 필요하지 않은 한 기본값을 유지하세요.",
  "commands.native":
    "명령 등록을 지원하는 채널(Discord, Slack, Telegram)에 기본(native) 슬래시/메뉴 명령을 등록합니다. 의도적으로 텍스트 전용 명령 워크플로를 실행하지 않는 한 검색 가능성을 위해 활성화 상태로 유지하세요.",
  "commands.nativeSkills":
    "사용자가 지원되는 경우 제공자 명령 메뉴에서 직접 스킬을 호출할 수 있도록 기본(native) 스킬 명령을 등록합니다. 노출된 명령이 운영자가 기대하는 것과 일치하도록 스킬 정책에 맞추세요.",
  "commands.text":
    "사용 가능한 경우 기본(native) 명령 표면 외에 채팅 입력에서 텍스트 명령 구문 분석을 활성화합니다. 기본(native) 명령 등록을 지원하지 않는 채널 전반의 호환성을 위해 이를 활성화 상태로 유지하세요.",
  "commands.bash":
    "bash 채팅 명령(`!`; `/bash` 별칭)이 호스트 셸 명령을 실행하도록 허용합니다(기본값: false; tools.elevated 필요).",
  "commands.bashForegroundMs":
    "bash가 백그라운드로 전환되기 전에 대기하는 시간입니다(기본값: 2000; 0은 즉시 백그라운드 전환).",
  "commands.config":
    "/config 채팅 명령이 디스크의 구성을 읽고/쓰는 것을 허용합니다(기본값: false).",
  "commands.mcp":
    "/mcp 채팅 명령이 mcp.servers 아래에서 OpenClaw MCP 서버 구성을 관리하도록 허용합니다(기본값: false).",
  "commands.plugins":
    "/plugins 채팅 명령이 검색된 플러그인을 나열하고 구성에서 플러그인 활성화를 전환하도록 허용합니다(기본값: false).",
  "commands.debug":
    "런타임 전용 재정의에 대해 /debug 채팅 명령을 허용합니다(기본값: false).",
  "commands.restart":
    "/restart 및 게이트웨이 재시작 도구 동작을 허용합니다(기본값: true).",
  "commands.useAccessGroups":
    "명령에 대해 액세스 그룹 허용 목록/정책을 시행합니다.",
  "commands.ownerAllowFrom":
    "소유자 전용 도구/명령에 대한 명시적 소유자 허용 목록입니다. 채널 고유 ID를 사용하세요(선택적으로 \"whatsapp:+15551234567\"와 같이 접두사를 붙임). '*'는 무시됩니다.",
  "commands.ownerDisplay":
    "시스템 프롬프트에서 소유자 ID가 렌더링되는 방식을 제어합니다. 허용되는 값: raw, hash. 기본값: raw.",
  "commands.ownerDisplaySecret":
    "ownerDisplay=hash일 때 소유자 ID를 HMAC 해시하는 데 사용되는 선택적 비밀값입니다. 환경 치환을 선호합니다.",
  "commands.allowFrom":
    "소유자 수준 명령 표면에 대해 채널 및 발신자별 권한 상승된 명령 허용 규칙을 정의합니다. 권한이 있는 명령이 광범위한 채팅 대상에게 노출되지 않도록 제공자별로 좁은 범위를 가진 ID를 사용하세요.",
  mcp: "OpenClaw가 관리하는 전역 MCP 서버 정의입니다. 내장된 Pi 및 기타 런타임 어댑터는 이러한 서버를 Pi 소유의 프로젝트 설정 내부에 저장하지 않고 소비할 수 있습니다.",
  "mcp.servers":
    "명명된 MCP 서버 정의입니다. OpenClaw는 이를 자체 구성에 저장하고 런타임 어댑터는 실행 시간에 어떤 전송이 지원될지 결정합니다.",
  "mcp.sessionIdleTtlMs":
    "세션 범위의 번들된 MCP 런타임에 대한 유휴 TTL(밀리초)입니다. 기본값은 10분이며 유휴 제거(eviction)를 비활성화하려면 0으로 설정하세요.",
  session:
    "대화 기록 동작에 대한 전역 세션 라우팅, 재설정, 전달 정책 및 유지 관리 제어입니다. 더 엄격한 격리, 보존 또는 전달 제약이 필요하지 않은 한 기본값을 유지하세요.",
  "session.scope":
    '기본 세션 그룹화 전략을 설정합니다: "per-sender"는 발신자별로 격리하고 "global"은 채널 컨텍스트당 하나의 세션을 공유합니다. 의도적인 공유 컨텍스트가 필요한 경우가 아니라면 더 안전한 다중 사용자 동작을 위해 "per-sender"를 유지하세요.',
  "session.dmScope":
    'DM 세션 범위 지정(scoping): "main"은 연속성을 유지하는 반면, "per-peer", "per-channel-peer", "per-account-channel-peer"는 격리를 강화합니다. 공유 받은 편지함이나 다중 계정 배포의 경우 격리된 모드를 사용하세요.',
  "session.identityLinks":
    "동일한 사용자가 하나의 DM 스레드로 확인되도록 표준 ID를 제공자 접두사가 있는 피어 ID에 매핑합니다(예: telegram:123456). 동일한 사람이 여러 채널이나 계정에 걸쳐 나타날 때 이를 사용하세요.",
  "session.resetTriggers":
    "인바운드 콘텐츠에서 일치할 때 세션 재설정을 강제하는 메시지 트리거 목록입니다. 정상적인 대화 중 예상치 않게 컨텍스트가 끊기지 않도록 명시적인 재설정 구문에 드물게 사용하세요.",
  "session.idleMinutes":
    "비활동 간격 전반의 세션 재사용 동작에 대해 분 단위의 레거시 유휴 재설정 창(window)을 적용합니다. 이는 호환성을 위해서만 사용하고 session.reset/session.resetByType 아래의 구조화된 재설정 정책을 선호하세요.",
  "session.reset":
    "유형별 또는 채널별 재정의가 적용되지 않을 때 사용되는 기본 재설정 정책 객체를 정의합니다. 이를 먼저 설정한 다음 동작이 달라져야 하는 곳에만 resetByType 또는 resetByChannel을 겹쳐 쓰세요.",
  "session.reset.mode":
    '재설정 전략을 선택합니다: "daily"는 구성된 시간에 재설정되고 "idle"은 비활동 시간 이후에 재설정됩니다. 놀라운 컨텍스트 롤오버(turnover) 패턴을 피하기 위해 정책당 하나의 명확한 모드를 유지하세요.',
  "session.reset.atHour":
    "세션이 예측 가능한 시간에 롤오버(rollover)되도록 일일 재설정 모드의 로컬 시간 경계(0-23)를 설정합니다. mode=daily와 함께 사용하고 사람이 읽을 수 있는 동작을 위해 운영자 시간대 기대치에 맞추세요.",
  "session.reset.idleMinutes":
    "유휴 모드의 재설정 전 비활동 창(window)을 설정하며 일일 모드와 함께 보조(secondary) 가드 역할을 할 수도 있습니다. 연속성을 보존하려면 더 큰 값을 사용하고, 수명이 짧고 신선한 스레드의 경우 더 작은 값을 사용하세요.",
  "session.resetByType":
    "기본값으로 충분하지 않을 때 채팅 유형(direct, group, thread)별로 재설정 동작을 재정의합니다. 그룹/스레드 트래픽이 직접 메시지(DM)와 다른 재설정 주기를 필요로 할 때 이를 사용하세요.",
  "session.resetByType.direct":
    "직접 채팅에 대한 재설정 정책을 정의하고 해당 유형의 기본 session.reset 구성을 대체합니다. 향후 도구 및 검증이 일관되게 유지되도록 레거시 dm 별칭 대신 이를 정식(canonical) 직접 메시지 재정의로 사용하세요.",
  "session.resetByType.dm":
    "이전 구성과의 하위 호환성을 위해 유지되는 더 이상 사용되지 않는 직접 재설정 동작의 별칭입니다. 향후 도구와 검증이 일관성을 유지할 수 있도록 session.resetByType.direct를 사용하세요.",
  "session.resetByType.group":
    "연속성 및 노이즈 패턴이 DM과 다른 그룹 채팅 세션에 대한 재설정 정책을 정의합니다. 컨텍스트 표류(drift)가 문제가 되는 바쁜 그룹의 경우 더 짧은 유휴 창(window)을 사용하세요.",
  "session.resetByType.thread":
    "포커스(focused) 채널 스레드 워크플로를 포함하여 스레드 범위 세션에 대한 재설정 정책을 정의합니다. 스레드 세션이 다른 채팅 유형보다 더 빨리 또는 더 느리게 만료되어야 할 때 이를 사용하세요.",
  "session.resetByChannel":
    "세분화된 동작 제어를 위해 제공자/채널 ID로 키가 지정된 채널별 재설정 재정의를 제공합니다. 하나의 채널이 유형 수준 정책을 넘어 예외적인 재설정 동작을 필요로 할 때만 이를 사용하세요.",
  "session.store":
    "재시작 전반에 걸쳐 세션 레코드를 유지하는 데 사용되는 세션 저장소 파일 경로를 설정합니다. 사용자 지정 디스크 레이아웃, 백업 라우팅 또는 마운트된 볼륨 스토리지가 필요할 때만 명시적인 경로를 사용하세요.",
  "session.typingIntervalSeconds":
    "입력(typing) 기능이 있는 채널에서 응답이 준비되는 동안 반복되는 입력 표시기의 간격을 제어합니다. 수다스러운 업데이트를 줄이려면 이 값을 늘리고, 더 적극적인 입력 피드백을 원하면 줄이세요.",
  "session.typingMode":
    '입력 동작 타이밍을 제어합니다: 방출 시점을 기준으로 "never", "instant", "thinking" 또는 "message". 불필요한 입력 노이즈를 피하기 위해 트래픽이 많은 채널에서는 보수적인 모드를 유지하세요.',
  "session.mainKey":
    'dmScope 또는 라우팅 로직이 "main"을 가리킬 때 연속성을 위해 사용되는 정식(canonical) 기본 세션 키를 재정의합니다. 의도적으로 사용자 지정 세션 고정(anchoring)이 필요한 경우에만 안정적인 값을 사용하세요.',
  "session.sendPolicy":
    "채널, chatType 및 키 접두사를 대상으로 평가되는 허용/거부 규칙을 사용하여 교차 세션(cross-session) 전송 권한을 제어합니다. 복잡한 환경에서 세션 도구가 메시지를 전달할 수 있는 위치를 제한하려면 이를 사용하세요.",
  "session.sendPolicy.default":
    '일치하는 sendPolicy 규칙이 없을 때의 대체 작업을 설정합니다: "allow" 또는 "deny". 더 간단한 설정을 위해 "allow"를 유지하거나, 모든 대상에 대해 명시적인 허용 규칙이 필요할 때 "deny"를 선택하세요.',
  "session.sendPolicy.rules":
    '기본 작업 전에 평가되는 순서가 지정된 허용/거부 규칙입니다. (예: `{ action: "deny", match: { channel: "discord" } }`). 광범위한 규칙이 예외를 가리지 않도록 가장 구체적인 규칙을 먼저 배치하세요.',
  "session.sendPolicy.rules[].action":
    '해당 일치 기준이 충족되었을 때 규칙 결정을 "allow" 또는 "deny"로 정의합니다. 명시적인 허용 예외를 두고 엄격한 경계를 강제할 때는 거부(deny) 우선 순서를 사용하세요.',
  "session.sendPolicy.rules[].match":
    "채널, chatType, 키 접두사 제약을 결합할 수 있는 선택적인 규칙 일치 조건을 정의합니다. 정책 의도를 읽기 쉽게 유지하고 디버깅을 간단하게 하기 위해 일치 항목을 좁게 유지하세요.",
  "session.sendPolicy.rules[].match.channel":
    "규칙 적용을 특정 채널/제공자 ID(예: discord, telegram, slack)와 일치시킵니다. 한 채널이 다른 채널과 독립적으로 전송을 허용하거나 거부해야 할 때 이를 사용하세요.",
  "session.sendPolicy.rules[].match.chatType":
    "동작이 대화 형태에 따라 달라지도록 규칙 적용을 채팅 유형(direct, group, thread)과 일치시킵니다. DM과 그룹 목적지가 다른 안전 경계를 요구할 때 이를 사용하세요.",
  "session.sendPolicy.rules[].match.keyPrefix":
    "정책 소비자 내부 키 정규화 단계 후 정규화된 세션 키 접두사를 일치시킵니다. 일반적인 접두사 제어에 이를 사용하고, 정확한 전체 키 일치가 필요할 때는 rawKeyPrefix를 선호하세요.",
  "session.sendPolicy.rules[].match.rawKeyPrefix":
    "정확한 전체 키 정책 타겟팅을 위해 정규화되지 않은 원시(raw) 세션 키 접두사를 일치시킵니다. 정규화된 keyPrefix가 너무 광범위하여 에이전트 접두사가 붙거나 전송에 특화된 정밀도가 필요할 때 이를 사용하세요.",
  "session.writeLock":
    "세션 스크립트 쓰기 잠금 획득 제어를 그룹화합니다. 합법적인 스크립트 준비, 정리, 압축 또는 미러(mirror) 작업이 기본 대기 시간보다 길게 경합할 때만 조정하세요.",
  "session.writeLock.acquireTimeoutMs":
    "세션을 사용 중(busy)으로 보고하기 전에 세션 스크립트 쓰기 잠금을 획득하는 동안 대기할 시간(밀리초)입니다. 기본값: 60000; 느린 디스크나 긴 준비/정리의 경우 이 값을 늘리고 빠른 실패가 선호될 때만 낮추세요.",
  "session.agentToAgent":
    "응답 체이닝에 대한 루프 방지 제한을 포함하여 에이전트 간 세션 교환을 위한 제어 그룹입니다. 엄격한 턴(turn) 상한을 가진 고급 에이전트 간 자동화를 실행하지 않는 한 기본값을 유지하세요.",
  "session.agentToAgent.maxPingPongTurns":
    "에이전트 간 교환 중 요청자와 대상 에이전트 간의 최대 응답(reply-back) 턴 수입니다(0-5). 대화 루프를 강력하게 제한하고 예측 가능한 실행 완료를 유지하려면 더 낮은 값을 사용하세요.",
  "session.threadBindings":
    "스레드 포커스(focused) 워크플로를 지원하는 제공자 전반에 걸친 스레드 바인딩 세션 라우팅 동작에 대한 공유 기본값입니다. 여기서 전역 기본값을 구성하고 동작이 다른 경우에만 채널별로 재정의하세요.",
  "session.threadBindings.enabled":
    "스레드 바인딩 세션 라우팅 기능 및 포커스된 스레드 전달 동작을 위한 전역 마스터 스위치입니다. 스레드 바인딩을 전역적으로 비활성화해야 하는 경우가 아니면 최신 스레드 워크플로를 위해 활성화 상태로 유지하세요.",
  "session.threadBindings.idleHours":
    "제공자/채널 전반에 걸친 스레드 바인딩 세션의 기본 비활동 창(window)(시간 단위)입니다(0은 유휴 자동 초점 해제를 비활성화함). 기본값: 24.",
  "session.threadBindings.maxAgeHours":
    "제공자/채널 전반에 걸친 스레드 바인딩 세션에 대한 선택적인 하드 최대 연령(시간)입니다(0은 하드 캡을 비활성화함). 기본값: 0.",
  "session.threadBindings.spawnSessions":
    "sessions_spawn 및 ACP 스레드 생성(spawn)에서 스레드 바인딩된 작업 세션을 만들기 위한 전역 기본 게이트입니다. 기본값: 스레드 바인딩이 활성화된 경우 true.",
  "session.threadBindings.defaultSpawnContext":
    '스레드 바인딩 생성(spawn)에 대한 기본(native) 하위 에이전트 컨텍스트입니다. 요청자 스크립트에서 시작하려면 "fork"를 사용하고 깨끗한 자식(child)의 경우 "isolated"를 사용하세요. 기본값: "fork".',
  "session.maintenance":
    "제거(pruning) 연령, 항목 상한(cap), 재설정 아카이브 보존 및 디스크 예산 정리를 위한 자동 세션 저장소 유지 관리 제어입니다. warn 모드에서 시작하여 영향을 관찰한 다음 임계값이 조정되면 enforce 모드로 전환하세요.",
  "session.maintenance.mode":
    '유지 관리 정책이 보고되기만 할지("warn") 아니면 적극적으로 적용될지("enforce") 결정합니다. 롤아웃 중에는 "warn"을 유지하고 안전한 임계값을 확인한 후 "enforce"로 전환하세요.',
  "session.maintenance.pruneAfter":
    "유지 관리 작업 중에 이 기간(예: `30d` 또는 `12h`)보다 오래된 항목을 제거합니다. 이를 기본 연령 보존 제어로 사용하고 데이터 보존 정책과 맞추세요.",
  "session.maintenance.pruneDays":
    "일(day) 카운트를 사용하는 레거시 구성과의 호환성을 위해 유지되는, 더 이상 사용되지 않는 연령 보존 필드입니다. 기간 구문(syntax)과 동작이 일관되도록 session.maintenance.pruneAfter를 대신 사용하세요.",
  "session.maintenance.maxEntries":
    "시간이 지남에 따라 끝없이 증가하는 것을 방지하기 위해 저장소에 유지되는 전체 세션 항목 수를 제한(cap)합니다. 제한된 환경의 경우 낮은 한도를 사용하고, 더 긴 기록이 필요할 때 더 높은 한도를 사용하세요.",
  "session.maintenance.rotateBytes":
    '더 이상 사용되지 않으며 무시됩니다. `sessions.json` 증가 제어에 사용하지 마세요; OpenClaw는 더 이상 자동 순환(rotation) 백업을 만들지 않으며, "openclaw doctor --fix"는 이 키를 제거합니다.',
  "session.maintenance.resetArchiveRetention":
    "재설정 스크립트 아카이브(`*.reset.<timestamp>`)에 대한 보존 기간입니다. 기간(예: `30d`)을 허용하며, 정리를 비활성화하려면 `false`를 입력합니다. 재설정 결과물이 영원히 증가하지 않도록 pruneAfter를 기본값으로 사용합니다.",
  "session.maintenance.maxDiskBytes":
    "선택적인 에이전트별 세션 디렉터리 디스크 예산입니다(예: `500mb`). 에이전트별 세션 스토리지를 제한하는 데 사용하세요; 이 값을 초과하면 warn 모드는 압력(pressure)을 보고하고 enforce 모드는 가장 오래된 것부터 우선하여 정리를 수행합니다.",
  "session.maintenance.highWaterBytes":
    "디스크 예산 정리 후의 목표 크기(고수위(high-water) 표시)입니다. 기본값은 maxDiskBytes의 80%입니다. 제한된 디스크에서 더 빡빡한 회수(reclaim) 동작을 원할 때 명시적으로 설정하세요.",
  cron: "저장된 크론 작업, 실행 동시성, 전달 대체 및 실행 세션 보존을 위한 전역 스케줄러 설정입니다. 작업 볼륨을 확장하거나 외부 웹훅 수신자를 통합하는 경우가 아니면 기본값을 유지하세요.",
  "cron.enabled":
    "게이트웨이에서 관리하는 저장된 일정에 대해 크론 작업 실행을 활성화합니다. 정상적인 알림/자동화 흐름을 위해 활성화 상태로 유지하고, 작업을 삭제하지 않고 모든 크론 실행을 일시 중지할 때만 비활성화하세요.",
  "cron.store":
    "재시작 전반에 걸쳐 예약된 작업을 유지하는 데 사용되는 크론 작업 저장소 파일의 경로입니다. 사용자 지정 스토리지 레이아웃, 백업 또는 마운트된 볼륨이 필요할 때만 명시적 경로를 설정하세요.",
  "cron.maxConcurrentRuns":
    "전용 크론 중첩 레인에서 독립된 에이전트 턴 LLM 실행을 포함하여, 여러 일정이 함께 시작될 때 동시에 실행될 수 있는 크론 작업의 수를 제한합니다. 부하가 많은 자동화 환경에서 CPU/메모리를 보호하려면 더 낮은 값을 사용하고, 더 높은 처리량을 원하면 주의해서 높이세요.",
  "cron.retry":
    "일회성 작업이 일시적인 오류(속도 제한, 과부하, 네트워크, 서버 오류)로 인해 실패할 때 기본 재시도 정책을 재정의합니다. 생략하면 기본값인 maxAttempts 3, backoffMs [30000, 60000, 300000]을 사용하고 모든 일시적 유형에 대해 재시도합니다.",
  "cron.retry.maxAttempts":
    "영구적으로 비활성화되기 전 일시적 오류에 대한 일회성 작업의 최대 재시도 횟수입니다(기본값: 3).",
  "cron.retry.backoffMs":
    "각 재시도에 대한 백오프 지연(ms)입니다(기본값: [30000, 60000, 300000]). 더 빠른 재시도를 원하면 짧은 값을 사용하세요.",
  "cron.retry.retryOn":
    "재시도할 오류 유형입니다: rate_limit, overloaded, network, timeout, server_error. 재시도를 트리거할 오류를 제한하는 데 사용하세요; 생략하면 모든 일시적 유형을 재시도합니다.",
  "cron.webhook":
    '`notify=true`인 오래된 작업에만 사용되는, 더 이상 사용되지 않는 레거시(legacy) 대체 웹훅 URL입니다. `delivery.mode="webhook"` 및 `delivery.to`를 사용하여 작업별 전달로 마이그레이션하고 이 전역 필드에 의존하지 마세요.',
  "cron.webhookToken":
    "웹훅 모드가 사용될 때 크론 웹훅 POST 전송에 첨부되는 Bearer 토큰입니다. 공유 웹훅 엔드포인트가 인터넷에 노출되어 있다면 비밀/환경 치환을 선호하고 이 토큰을 정기적으로 교체하세요.",
  "cron.sessionRetention":
    "완료된 크론 실행 세션이 제거(pruning)되기 전에 보존되는 기간을 제어합니다(`24h`, `7d`, `1h30m`, 또는 정리를 비활성화하려면 `false`; 기본값: `24h`). 빈도가 높은 스케줄에서 스토리지 증가를 줄이려면 더 짧은 보존 기간을 사용하세요.",
  "cron.runLog":
    "`cron/runs/<jobId>.jsonl` 아래에 있는 작업별 크론 실행 기록 파일에 대한 제거 제어(크기 및 유지되는 줄 수 포함)입니다.",
  "cron.runLog.maxBytes":
    "크론 실행 로그 파일당 허용되는 최대 바이트 수입니다. 이 값을 초과하면 마지막 keepLines 항목으로 파일을 재기록(rewrite)하여 정리합니다(예: `2mb`, 기본값 `2000000`).",
  "cron.runLog.keepLines":
    "파일이 maxBytes를 초과할 때 유지할 후행(trailing) 실행 로그 라인의 수입니다(기본값 `2000`). 포렌식(forensic) 기록을 더 길게 보존하려면 늘리고 디스크가 작은 경우 낮추세요.",
  hooks:
    "외부 이벤트를 OpenClaw의 깨우기 또는 에이전트 동작으로 매핑하기 위한 인바운드 웹훅 자동화 표면입니다. 신뢰할 수 있는 네트워크 너머로 노출하기 전에 명시적인 토큰/세션/에이전트 제어를 통해 이 표면을 단단히 잠그세요.",
  "hooks.enabled":
    "인바운드 웹훅 요청에 대한 웹훅 엔드포인트 및 매핑 실행 파이프라인을 활성화합니다. 게이트웨이로 외부 이벤트를 적극적으로 라우팅하지 않는 한 비활성화 상태로 유지하세요.",
  "hooks.path":
    "게이트웨이 제어 서버에서 웹훅 엔드포인트(예: `/hooks`)가 사용하는 HTTP 경로입니다. 추측할 수 없는 경로를 사용하고 심층 방어를 위해 토큰 검증과 결합하세요.",
  "hooks.token":
    "매핑이 실행되기 전에 요청 인증을 위해 훅 인그레스(ingress)에서 확인하는 공유 Bearer 토큰입니다. 보유자를 별도의 소유자(non-owner) 역할이 아닌 훅 인그레스 표면에 대한 완전 신뢰 호출자(full-trust callers)로 취급하세요. 웹훅 엔드포인트가 인터넷에서 접근 가능한 경우 환경 치환을 사용하고 정기적으로 교체하세요.",
  "hooks.defaultSessionKey":
    "요청이 허용된 채널을 통해 세션 키를 제공하지 않을 때 훅(hook) 전송에 사용되는 대체 세션 키입니다. 관련 없는 자동화 대화가 섞이지 않도록 안정적이지만 범위가 지정된 키를 사용하세요.",
  "hooks.allowRequestSessionKey":
    "true일 때 호출자가 훅 요청에 세션 키를 제공할 수 있도록 허용하여, 호출자가 제어하는 라우팅을 가능하게 합니다. 신뢰할 수 있는 통합자(integrators)가 사용자 지정 세션 스레딩을 명시적으로 필요로 하지 않는 한 false를 유지하세요.",
  "hooks.allowedSessionKeyPrefixes":
    "호출자 제공 키가 활성화되었을 때, 인바운드 훅 요청에 대해 허용되는 세션 키 접두사의 허용 목록입니다. 임의의 세션 키 주입을 방지하기 위해 좁은 접두사를 사용하세요.",
  "hooks.allowedAgentIds":
    "실행 에이전트를 선택할 때 훅 매핑이 타겟팅할 수 있도록 허용된 에이전트 ID의 허용 목록입니다. 이를 사용하여 자동화 이벤트를 전용 서비스 에이전트로 제한하고 훅 토큰이 노출될 경우 영향 범위(blast radius)를 줄이세요.",
  "hooks.maxBodyBytes":
    "요청이 거부되기 전에 허용되는 웹훅 페이로드의 최대 크기(바이트)입니다. 남용 위험을 줄이고 버스트가 심한 통합 환경에서 메모리 사용량을 보호하려면 이 값을 제한하세요.",
  "hooks.presets":
    "표준 매핑 및 동작 기본값을 시드하기 위해 로드 시 적용되는 명명된 훅 프리셋 번들입니다. 운영자가 활성 자동화를 감사할 수 있도록 프리셋 사용을 명시적으로 유지하세요.",
  "hooks.transformsDir":
    "매핑 transform.module 경로에서 참조하는 훅 변환(transform) 모듈의 기본 디렉터리입니다. 동적 가져오기(imports)가 검토 가능하고 예측 가능하도록 통제된 저장소 디렉터리를 사용하세요.",
  "hooks.mappings":
    "인바운드 훅 요청과 일치시키고 선택적 전달 라우팅을 통해 깨우기 또는 에이전트 동작을 선택하는 순서가 지정된 매핑 규칙입니다. 광범위한 패턴 규칙이 모든 것을 캡처하는 것을 방지하려면 구체적인 매핑을 먼저 사용하세요.",
  "hooks.mappings[].id":
    "감사, 문제 해결 및 대상별 업데이트에 사용되는 훅 매핑 항목의 선택적인 안정적 식별자입니다. 로그 및 구성 차이(diff)에서 매핑을 모호함 없이 참조할 수 있도록 고유한 ID를 사용하세요.",
  "hooks.mappings[].match":
    "동작 라우팅이 적용되기 전, 경로 및 소스와 같은 매핑 일치 조건(predicates)을 위한 그룹화 객체입니다. 관련 없는 웹훅 트래픽이 자동화를 트리거하지 않도록 일치 기준을 구체적으로 유지하세요.",
  "hooks.mappings[].match.path":
    "일반적으로 인바운드 요청 경로와 비교되는 훅 매핑의 경로 일치 조건입니다. 웹훅 엔드포인트 경로 패밀리별로 자동화 동작을 분할할 때 이를 사용하세요.",
  "hooks.mappings[].match.source":
    "일반적으로 신뢰할 수 있는 업스트림 메타데이터나 어댑터 로직에 의해 설정되는 훅 매핑의 소스 일치 조건입니다. 재시도 전반에 걸쳐 라우팅이 결정론적으로 유지되도록 안정적인 소스 식별자를 사용하세요.",
  "hooks.mappings[].action":
    '매핑 동작 유형입니다: "wake"는 에이전트 깨우기 흐름을 트리거하고, "agent"는 에이전트 처리로 직접 보냅니다. 즉각적인 실행을 위해서는 "agent"를 사용하고 하트비트 기반 처리가 선호될 때는 "wake"를 사용하세요.',
  "hooks.mappings[].wakeMode":
    '깨우기 예약 모드입니다: "now"는 즉시 깨우고, "next-heartbeat"는 다음 하트비트 주기까지 연기합니다. 약간의 지연을 허용할 수 있는 우선순위가 낮은 자동화에 연기 모드를 사용하세요.',
  "hooks.mappings[].name":
    "진단 및 운영자가 보는 구성 UI에서 사용되는 사람이 읽을 수 있는 매핑 표시 이름입니다. 인시던트 검토 중 라우팅 의도가 명확하도록 이름을 간결하고 설명적으로 유지하세요.",
  "hooks.mappings[].agentId":
    "동작 라우팅이 기본값을 사용하지 않아야 할 때 매핑 실행을 위한 대상 에이전트 ID입니다. 대화형 운영자 세션에서 웹훅 동작을 격리하려면 전용 자동화 에이전트를 사용하세요.",
  "hooks.mappings[].sessionKey":
    "스레드 연속성을 제어하기 위한 매핑 전송 메시지에 대한 명시적 세션 키 재정의입니다. 반복되는 이벤트가 관련 없는 대화로 새어나가지 않고 상호 연관되도록 안정적이고 범위가 지정된 키를 사용하세요.",
  "hooks.mappings[].messageTemplate":
    "구조화된 매핑 입력을 대상 작업(action) 경로로 전송될 최종 메시지 콘텐츠로 합성(synthesize)하기 위한 템플릿입니다. 다운스트림 구문 분석 및 동작이 안정적으로 유지되도록 템플릿을 결정론적으로 유지하세요.",
  "hooks.mappings[].textTemplate":
    "풍부한(rich) 페이로드 렌더링을 원하지 않거나 지원되지 않을 때 사용되는 텍스트 전용 대체 템플릿입니다. 채팅 전달 표면을 위해 간결하고 일관된 요약 문자열을 제공할 때 이를 사용하세요.",
  "hooks.mappings[].deliver":
    "매핑 실행 결과가 채널 대상(destination)으로 전달될지 아니면 조용히 처리될지 여부를 제어합니다. 사용자가 볼 수 있는 출력을 게시하지 않아야 하는 백그라운드 자동화의 경우 전달을 비활성화하세요.",
  "hooks.mappings[].allowUnsafeExternalContent":
    "true인 경우, 생성된 메시지에 덜 정리된(sanitized) 외부 페이로드 데이터가 매핑 콘텐츠에 포함될 수 있습니다. 기본적으로 false로 유지하고, 변환 로직이 검토된 신뢰할 수 있는 소스에 대해서만 활성화하세요.",
  "hooks.mappings[].channel":
    '매핑 출력에 대한 전달 채널 재정의입니다(예: "last", "telegram", "discord", "slack", "signal", "imessage" 또는 "msteams"). 우발적인 교차 채널 전송을 피하려면 채널 재정의를 명시적으로 유지하세요.',
  "hooks.mappings[].to":
    "매핑 응답이 고정된 대상으로 라우팅되어야 할 때, 선택한 채널 내부의 목적지 식별자입니다. 프로덕션 매핑을 활성화하기 전에 제공자별 목적지 형식을 확인하세요.",
  "hooks.mappings[].model":
    "자동화가 에이전트 기본값과 다른 모델을 사용해야 할 때, 매핑으로 트리거된 실행(runs)을 위한 선택적 모델 재정의입니다. 매핑 실행 전반에 걸쳐 동작이 예측 가능하도록 이를 아껴서 사용하세요.",
  "hooks.mappings[].thinking":
    "지연 시간 대 추론 깊이를 조정하기 위한, 매핑으로 트리거된 실행에 대한 선택적 사고(thinking) 노력 재정의입니다. 더 깊은 추론이 명확하게 요구되지 않는 한 대용량 훅에 대해 이 값을 낮추거나 최소한으로 유지하세요.",
  "hooks.mappings[].timeoutSeconds":
    "시간 초과 처리가 적용되기 전에 매핑 동작(action) 실행이 허용되는 최대 런타임입니다. 큐(queue)가 쌓이는 것을 방지하기 위해 트래픽이 많은 웹훅 소스에 대해 더 엄격한 제한을 사용하세요.",
  "hooks.mappings[].transform":
    "매핑 동작 처리 전에 모듈/내보내기 사전 처리를 정의하는 변환 구성 블록입니다. 검토된 코드 경로의 변환(transform)만 사용하고 반복 가능한 자동화를 위해 동작을 결정론적으로 유지하세요.",
  "hooks.mappings[].transform.module":
    "전달 전에 수신 페이로드를 다시 작성(rewrite)하기 위해 hooks.transformsDir에서 로드되는 상대 변환 모듈 경로입니다. 모듈을 로컬로, 검토된 상태로, 경로 탐색(path traversal) 패턴이 없도록 유지하세요.",
  "hooks.mappings[].transform.export":
    "변환 모듈에서 호출할 명명된 내보내기(export)입니다. 생략 시 모듈 기본 내보내기로 대체됩니다. 하나의 파일이 여러 개의 변환 핸들러를 호스팅할 때 이를 설정하세요.",
  "hooks.gmail":
    "Pub/Sub 알림 및 선택적 로컬 콜백 제공(serving)에 사용되는 Gmail 푸시 통합 설정입니다. 가능하면 전용 Gmail 자동화 계정으로 범위를 제한하세요.",
  "hooks.gmail.account":
    "이 훅 통합에서 Gmail 감시(watch)/구독 작업에 사용되는 Google 계정 식별자입니다. 운영 권한을 격리하기 위해 전용 자동화 사서함 계정을 사용하세요.",
  "hooks.gmail.label":
    "레이블이 지정된 메시지 중 훅 이벤트를 트리거할 메시지를 제한하는 선택적 Gmail 레이블 필터입니다. 관련 없는 수신함 트래픽이 자동화 시스템에 넘치지 않도록 필터를 좁게 유지하세요.",
  "hooks.gmail.topic":
    "이 계정의 변경 알림을 게시하기 위해 Gmail watch에서 사용하는 Google Pub/Sub 주제 이름입니다. 감시를 활성화하기 전에 해당 주제 IAM이 Gmail 게시(publish) 권한을 부여하는지 확인하세요.",
  "hooks.gmail.subscription":
    "구성된 주제에서 Gmail 변경 알림을 수신하기 위해 게이트웨이가 소비하는 Pub/Sub 구독입니다. 여러 소비자가 예상치 않게 경합(race)하지 않도록 구독 소유권을 명확히 유지하세요.",
  "hooks.gmail.hookUrl":
    "Gmail 또는 중개자가 이 훅 파이프라인으로 알림을 전달하기 위해 호출하는 공개 콜백 URL입니다. 토큰 검증과 제한된 네트워크 노출로 이 URL을 보호하세요.",
  "hooks.gmail.includeBody":
    "true인 경우 다운스트림 매핑/에이전트 처리를 위해 이메일 본문 콘텐츠를 가져와 포함합니다. 본문 텍스트가 필요하지 않은 한 false로 유지하세요. 페이로드 크기와 민감도가 증가하기 때문입니다.",
  "hooks.gmail.allowUnsafeExternalContent":
    "활성화된 경우, 덜 정리된(sanitized) 외부 Gmail 콘텐츠가 처리에 전달되도록 허용합니다. 더 안전한 기본값을 위해 비활성화 상태로 유지하고 통제된 변환이 있는 신뢰할 수 있는 메일 스트림에 대해서만 활성화하세요.",
  "hooks.gmail.serve":
    "별도의 인그레스 계층 없이 Gmail 알림을 직접 수신하기 위한 로컬 콜백 서버 설정 블록입니다. 이 프로세스가 웹훅 트래픽을 자체적으로 종료해야 할 때만 활성화하세요.",
  "hooks.gmail.pushToken":
    "알림을 처리하기 전 Gmail 푸시 훅 콜백에서 필요한 공유 비밀 토큰입니다. 환경 치환을 사용하고 콜백 엔드포인트가 외부로 노출된 경우 순환(rotate)하세요.",
  "hooks.gmail.maxBytes":
    "includeBody가 활성화되었을 때 이벤트당 처리되는 최대 Gmail 페이로드 바이트 수입니다. 크기가 큰 메시지 처리 비용과 위험을 줄이려면 보수적인 한도를 유지하세요.",
  "hooks.gmail.renewEveryMinutes":
    "만료를 방지하기 위한 Gmail watch 구독의 갱신 주기(분)입니다. 제공자 만료 기간 이하로 설정하고 로그에서 갱신 실패를 모니터링하세요.",
  "hooks.gmail.serve.bind":
    "훅을 직접 제공(serve)할 때 사용되는 로컬 Gmail 콜백 HTTP 서버의 바인드 주소입니다. 외부 인그레스가 의도적으로 필요하지 않은 한 루프백(loopback) 전용을 유지하세요.",
  "hooks.gmail.serve.port":
    "serve 모드가 활성화되었을 때 로컬 Gmail 콜백 HTTP 서버를 위한 포트입니다. 게이트웨이/제어 인터페이스와의 충돌을 피하기 위해 전용 포트를 사용하세요.",
  "hooks.gmail.serve.path":
    "푸시 알림이 수신되는 로컬 Gmail 콜백 서버의 HTTP 경로입니다. 이벤트 유실(dropped events)을 피하기 위해 구독 구성과 일관되게 유지하세요.",
  "hooks.gmail.tailscale.mode":
    'Gmail 콜백을 위한 Tailscale 노출 모드입니다: "off", "serve" 또는 "funnel". 사설(private) tailnet 전달을 위해서는 "serve"를 사용하고 공용 인터넷 인그레스가 필요할 때만 "funnel"을 사용하세요.',
  "hooks.gmail.tailscale":
    "Serve/Funnel 경로를 통해 Gmail 콜백을 게시하기 위한 Tailscale 노출 구성 블록입니다. 공용 인그레스 경로를 활성화하기 전에 사설 tailnet 모드를 우선 사용하세요.",
  "hooks.gmail.tailscale.path":
    "활성화되었을 때 Gmail 콜백 포워딩을 위해 Tailscale Serve/Funnel이 게시하는 경로입니다. 요청이 예상 핸들러에 도달하도록 Gmail 웹훅 구성과 맞춰 정렬되게 유지하세요.",
  "hooks.gmail.tailscale.target":
    "Tailscale Serve/Funnel이 포워딩하는 로컬 서비스 대상입니다(예: http://127.0.0.1:8787). 모호한 라우팅을 방지하기 위해 명시적 루프백 대상을 사용하세요.",
  "hooks.gmail.model":
    "사서함 자동화에 전용 모델 동작이 필요할 때, Gmail로 트리거된 실행(runs)을 위한 선택적 모델 재정의입니다. 사서함 작업에 특수화가 필요하지 않은 한 에이전트 기본값을 상속하도록 설정하지 않은 상태로 두세요.",
  "hooks.gmail.thinking":
    'Gmail 기반 에이전트 실행을 위한 생각(thinking) 노력 재정의입니다: "off", "minimal", "low", "medium" 또는 "high". 일상적인 인박스 자동화의 경우 비용과 지연 시간을 제어하기 위해 적당한 기본값을 유지하세요.',
  "hooks.internal":
    "모듈 경로에서 로드된 번들/사용자 지정 이벤트 핸들러를 위한 내부 훅 런타임 설정입니다. 신뢰할 수 있는 프로세스 내 자동화를 위해 이를 사용하고 핸들러 로딩 범위를 엄격하게 제한하세요.",
  "hooks.internal.enabled":
    "내부 훅 런타임에서 내부 훅 및 구성된 항목(entries)에 대한 처리를 활성화합니다. 내부 훅이 의도적으로 구성되지 않은 한 비활성화 상태로 유지하세요.",
  "hooks.internal.entries":
    "구체적인 런타임 핸들러 및 메타데이터를 등록하는 데 사용되는 구성된 내부 훅 항목(entry) 기록입니다. 프로덕션 동작을 감사할 수 있도록 항목을 명시적이고 버전을 관리하여 유지하세요.",
  "hooks.internal.load":
    "시작 시 핸들러 모듈이 검색되는 위치를 제어하는 내부 훅 로더 설정입니다. 우발적인 모듈 충돌이나 섀도잉(shadowing)을 줄이기 위해 제한된 로드 루트를 사용하세요.",
  "hooks.internal.load.extraDirs":
    "기본 로드 경로 이외에 내부 훅 모듈을 검색하는 추가 디렉터리입니다. 우발적인 모듈 섀도잉을 줄이기 위해 이를 최소화하고 제어되게 유지하세요.",
  "hooks.internal.installs":
    "반복 가능한 배포를 위한 소스 및 확인된 아티팩트를 포함하여 내부 훅 모듈에 대한 설치 메타데이터입니다. 이를 운영 출처(provenance)로 사용하고 수동 표류(drift) 편집을 피하세요.",
  messages:
    "인바운드/아웃바운드 채팅 흐름에 대한 메시지 형식 지정, 승인(acknowledgment), 큐(queueing), 디바운스 및 상태 반응 동작입니다. 채널 반응성이나 메시지 UX를 조정해야 할 때 이 섹션을 사용하세요.",
  "messages.messagePrefix":
    "인바운드 사용자 메시지가 에이전트 런타임에 전달되기 전에 추가되는 접두사 텍스트입니다. 채널 컨텍스트 마커를 위해 이 값을 절제하여 사용하고 세션 간에 안정적으로 유지하세요.",
  "messages.visibleReplies":
    '직접, 그룹, 채널 대화 전반에서 표시되는 소스 응답을 제어합니다. "message_tool"은 일반적인 최종 응답을 비공개로 유지하며 출력(output)을 보기 위해 message(action=send)가 필요합니다; "automatic"은 이전처럼 정상적인 응답을 게시합니다.',
  "messages.responsePrefix":
    "아웃바운드 어시스턴트 응답이 채널로 전송되기 전에 추가되는 접두사 텍스트입니다. 가벼운 브랜딩/컨텍스트 태그용으로 사용하고 콘텐츠 밀도를 떨어뜨리는 긴 접두사는 피하세요.",
  "messages.groupChat":
    "멘션 트리거 및 기록 범위(window) 크기 조정을 포함하는 그룹 메시지 처리 제어입니다. 트래픽이 많은 채널에서 매 메시지마다 그룹 채널이 트리거되지 않도록 멘션 패턴을 좁게 유지하세요.",
  "messages.groupChat.mentionPatterns":
    "그룹 채팅에서 명시적인 멘션/트리거 구문을 감지하는 데 사용되는 안전한 대소문자 구분 없는 정규식 패턴입니다. 트래픽이 많은 채널에서 오탐(false positives)을 줄이기 위해 정밀한 패턴을 사용하세요; 유효하지 않거나 안전하지 않은 중첩 반복 패턴은 무시됩니다.",
  "messages.groupChat.historyLimit":
    "그룹 세션에 대해 턴당 컨텍스트로 로드되는 이전 그룹 메시지의 최대 수입니다. 더 풍부한 연속성을 원하면 높은 값을 사용하고, 더 빠르고 저렴한 응답을 원하면 낮은 값을 사용하세요.",
  "messages.groupChat.visibleReplies":
    '그룹/채널 대화에 대한 시각적인 소스 응답을 재정의합니다. 전역 시각적 응답 정책이 설정되지 않은 경우 기본값은 "message_tool"입니다. "message_tool"은 일반적인 최종 응답을 비공개로 유지하며 대화방에 출력하려면 message(action=send)가 필요합니다; "automatic"은 이전처럼 정상적인 응답을 게시합니다.',
  "messages.queue":
    "세션 실행이 활성화된 동안 도착하는 메시지에 대한 인바운드 메시지 큐 전략입니다. 기본 모드는 steer이며, 스티어링(steering)을 사용할 수 없을 때는 followup 대체 모드가 사용됩니다.",
  "messages.queue.mode":
    '큐 동작 모드입니다. 대기 중인 모든 스티어링 메시지를 다음 모델 경계(boundary)에 주입하려면 "steer"를 사용하세요; "queue"는 레거시 형태인 한 번에 하나씩 처리하는 스티어링입니다; "followup"은 나중에 실행합니다; "collect"는 나중에 일괄 처리(batch)합니다; "steer-backlog"(별칭 "steer+backlog")는 두 가지를 모두 수행합니다; "interrupt"는 활성 실행을 중단합니다.',
  "messages.queue.byChannel":
    "제공자 ID(예: telegram, discord, slack)로 키가 지정된 채널별 큐 모드 재정의입니다. 특정 채널의 트래픽 패턴이 전역 기본값과 다른 큐 동작을 요구할 때 이를 사용하세요.",
  "messages.queue.debounceMs":
    "버퍼링된 인바운드 메시지를 배출하기 전의 전역 후속(followup) 큐 디바운스 창(밀리초)입니다. 기본값은 500ms입니다; 값이 높으면 버스트를 병합하고 낮으면 지연 시간을 줄입니다.",
  "messages.queue.debounceMsByChannel":
    "제공자 ID로 키가 지정된 채널별 큐 동작 디바운스 재정의입니다. 페이싱(pacing)이 다른 채팅 표면에 대해 버스트 처리를 독립적으로 조정하려면 이를 사용하세요.",
  "messages.queue.cap":
    "삭제(drop) 정책이 적용되기 전에 유지되는 대기 중인 인바운드 항목의 최대 수입니다. 기본값은 20입니다; 노이즈가 많은 채널에서는 메모리 사용량이 예측 가능하게 유지되도록 캡을 제한되게 유지하세요.",
  "messages.queue.drop":
    '큐(queue) 캡을 초과했을 때의 드롭 전략입니다. "summarize"는 가장 오래된 항목을 삭제하지만 압축된 요약은 보존합니다; "old"는 요약 없이 가장 오래된 항목을 삭제합니다; "new"는 가장 최신 항목을 거부합니다. 컨텍스트가 중요한 장기 실행 채팅의 경우 "summarize"를 사용하세요.',
  "messages.inbound":
    "큐/턴 처리가 시작되기 전에 사용되는 직접적인 인바운드 디바운스 설정입니다. 동일한 발신자로부터 제공자별로 빠르게 쏟아지는 메시지 버스트(bursts)에 대해 이를 구성하세요.",
  "messages.inbound.byChannel":
    "밀리초 단위로 제공자 ID가 키로 지정된 채널별 인바운드 디바운스 재정의입니다. 일부 제공자가 다른 제공자보다 메시지 조각(fragments)을 더 공격적으로 보낼 때 이를 사용하세요.",
  "messages.removeAckAfterReply":
    "활성화된 경우 최종 응답 전달 후 승인(acknowledgment) 반응을 제거합니다. 지속적인 확인 반응이 어수선함을 만드는 채널에서 더 깨끗한 UX를 원할 때 활성화 상태로 유지하세요.",
  "messages.tts":
    "지원되는 음성 또는 오디오 표면에서 에이전트 응답을 소리 내어 읽어주기 위한 Text-to-Speech(TTS) 정책입니다. 음성 재생이 운영자/사용자 워크플로의 일부가 아닌 한 비활성화 상태로 유지하세요.",
  "messages.tts.persona":
    "기본 TTS 페르소나 ID입니다. 로컬 TTS 페르소나 기본 설정은 호스트별로 이를 재정의할 수 있습니다.",
  "messages.tts.personas":
    "안정적인 음성 ID와 제공자별 음성 바인딩을 정의하는 명명된 TTS 페르소나입니다.",
  "messages.tts.personas.*":
    "단일 TTS 페르소나입니다. 정확한 음성/모델 및 프롬프트 템플릿의 경우 제공자별 바인딩을 사용하세요.",
  "messages.tts.personas.*.prompt":
    "제공자 중립적인 페르소나 프롬프트 인텐트입니다. 제공자는 이를 요청 지침에 매핑할지 여부와 매핑 방식을 결정합니다.",
  "messages.tts.personas.*.providers":
    "음성 제공자 ID로 키가 지정된 제공자별 TTS 페르소나 바인딩입니다. 이는 활성 페르소나에 대해 messages.tts.providers 위에 병합됩니다.",
  "messages.tts.providers":
    "음성 제공자 ID로 키가 지정된 제공자별 TTS 설정입니다. 번들로 제공되는 제공자별 최상위 키 대신 이를 사용하여 음성 플러그인이 핵심 구성 스키마에서 분리되게(decoupled) 유지하세요.",
  "messages.tts.providers.*":
    "하나의 음성 제공자 ID에 대한 제공자별 TTS 구성입니다. 해당 제공자를 소유하는 플러그인으로 필드 범위를 제한하세요.",
  "messages.tts.providers.*.apiKey":
    "해당 음성 플러그인이 인증된 TTS 액세스를 필요로 할 때 그 음성 제공자가 사용하는 제공자 API 키입니다.", // pragma: allowlist secret
  channels:
    "접근 정책, 하트비트 가시성, 표면별 동작을 제어하는 채널 제공자 구성 및 공유 기본값입니다. 기본값을 중앙에 유지하고 필요한 경우에만 제공자별로 재정의하세요.",
  "channels.mattermost":
    "봇 자격 증명, 기본 URL, 메시지 트리거 모드를 위한 Mattermost 채널 제공자 구성입니다. 트래픽이 많은 팀 채널에서는 멘션/트리거 규칙을 엄격하게 유지하세요.",
  "channels.defaults":
    "제공자별 설정이 지정되지 않은 경우 제공자 전반에 적용되는 기본 채널 동작입니다. 제공자별 튜닝 전 일관된 기준 정책을 적용하려면 이를 사용하세요.",
  "channels.defaults.groupPolicy":
    '채널 전반의 기본 그룹 정책: "open", "disabled" 또는 "allowlist". 광범위한 그룹 참여가 의도적인 경우가 아니면 더 안전한 프로덕션 설정을 위해 "allowlist"를 유지하세요.',
  "channels.defaults.contextVisibility":
    '가져온 인용/스레드/기록 콘텐츠에 대한 기본 추가 컨텍스트 가시성입니다: "all"(모든 컨텍스트 유지), "allowlist"(허용 목록에 있는 발신자만), 또는 "allowlist_quote"(허용 목록 + 명시적 인용 유지).',
  "channels.defaults.heartbeat":
    "제공자/채널이 내보내는 상태 메시지에 대한 기본 하트비트 가시성 설정입니다. 경고를 표시(visible)하면서 시끄러운 정상 상태(healthy-state) 업데이트를 줄이려면 이를 전역적으로 조정하세요.",
  "channels.defaults.heartbeat.showOk":
    "true인 경우 채널 상태 출력에 정상(healthy/OK) 하트비트 항목을 표시합니다. 노이즈가 많은 환경에서는 false로 유지하고, 운영자가 명시적인 정상 상태 확인을 필요로 할 때만 활성화하세요.",
  "channels.defaults.heartbeat.showAlerts":
    "true인 경우 채널에서 문제가 발생한 상태를 즉시 파악할 수 있도록 저하(degraded)/오류 하트비트 경고를 운영 채널에 표시합니다. 중단된 채널 상태를 볼 수 있도록 프로덕션에서 활성화 상태를 유지하세요.",
  "channels.defaults.heartbeat.useIndicator":
    "지원되는 경우 장황한 상태 텍스트 대신 간결한 표시기(indicator) 스타일의 하트비트 렌더링을 활성화합니다. 많은 활성 채널이 있는 밀집된 대화형 대시보드에 표시기 모드를 사용하세요.",
  "agents.defaults.heartbeat.includeSystemPromptSection":
    "true인 경우 기본 에이전트의 ## Heartbeats 시스템 프롬프트 섹션을 포함합니다. 하트비트 런타임 동작은 유지하되 에이전트 시스템 프롬프트에서 하트비트 프롬프트 지침은 생략하려면 이 기능을 끄세요.",
  "agents.list.*.heartbeat.includeSystemPromptSection":
    "기본 에이전트의 ## Heartbeats 시스템 프롬프트 섹션이 주입될지 여부에 대한 에이전트별 재정의입니다. 하트비트 런타임 동작은 유지하면서 해당 에이전트의 시스템 프롬프트에서 하트비트 프롬프트 지침을 생략하려면 false를 사용하세요.",
  "agents.defaults.heartbeat.directPolicy":
    '하트비트 전달이 직접/DM 채팅을 타겟팅할 수 있는지 여부를 제어합니다: "allow"(기본값)는 DM 전달을 허용하고 "block"은 직접 타겟팅 전송을 억제합니다.',
  "agents.list.*.heartbeat.directPolicy":
    '하트비트 직접/DM 전달 정책에 대한 에이전트별 재정의; DM이 아닌 대상으로만 하트비트 경고를 보내야 하는 에이전트의 경우 "block"을 사용하세요.',
  "agents.list.*.heartbeat.skipWhenBusy":
    "하위 에이전트 또는 중첩된 명령 작업 등 특히 바쁜 레인에서 하트비트 턴을 연기하는 에이전트별 재정의입니다. 크론 레인은 항상 하트비트 턴을 연기합니다.",
  "channels.mattermost.configWrites":
    "Mattermost가 채널 이벤트/명령에 응답하여 구성을 기록(write)하도록 허용합니다(기본값: true).",
  "channels.modelByChannel":
    "provider -> channel id -> 모델 재정의 맵(값은 제공자/모델 또는 별칭임).",
  "messages.suppressToolErrors":
    "true인 경우 사용자에게 ⚠️ 도구 오류 경고가 표시되지 않도록 억제합니다. 에이전트는 이미 컨텍스트 내에서 오류를 보고 재시도할 수 있습니다. 기본값: false.",
  "messages.ackReaction":
    "인바운드 메시지를 승인(acknowledge)하는 데 사용되는 이모지 반응입니다(비워두면 비활성화됨).",
  "messages.ackReactionScope":
    '승인(ack) 반응을 보낼 시기입니다("group-mentions", "group-all", "direct", "all", "off", "none"). "off"/"none"은 승인 반응을 완전히 비활성화합니다.',
  "messages.statusReactions":
    "에이전트가 진행함에 따라 트리거 메시지의 이모지를 업데이트하는 수명 주기 상태 반응(큐에 대기 중 → 생각 중 → 도구 사용 중 → 완료/오류).",
  "messages.statusReactions.enabled":
    "지원되는 채널에서 수명 주기 상태 반응을 활성화합니다. Slack 및 Discord는 승인 반응이 활성화되어 있을 때 설정하지 않은 값을 활성화(enabled)로 취급합니다. Telegram은 수명 주기 반응이 사용되기 전에 이 값이 true여야 합니다.",
  "messages.statusReactions.emojis":
    "기본 상태 반응 이모지를 재정의합니다. 키: thinking, compacting, tool, coding, web, done, error, stallSoft, stallHard. 유효한 Telegram 반응 이모지여야 합니다.",
  "messages.statusReactions.timing":
    "기본 타이밍을 재정의합니다. 키: debounceMs (700), stallSoftMs (25000), stallHardMs (60000), doneHoldMs (1500), errorHoldMs (2500).",
  "messages.inbound.debounceMs":
    "동일한 발신자로부터 빠르게 수신되는 인바운드 메시지를 일괄 처리하기 위한 디바운스 창(ms)입니다(비활성화하려면 0).",
};
