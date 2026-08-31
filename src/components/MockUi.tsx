import type { MockKind } from '../data/content'

const labels: Record<MockKind, string> = {
  factory6g: 'Factory6G Sim',
  psa: 'TE AI Portal',
  reimbursement: 'Claims Portal',
  mhvoucher: 'MHVoucher Admin',
  'ai-search': 'RAG Search',
  albert: 'Albert Roi',
  trinity: 'Cloud · AI Platform',
  wavelet: 'Realtime Stack',
  karisma: 'Microservice APIs',
  chatbot: 'AI Chatbot',
  middleware: 'Azure Middleware',
  cms: 'CMS / Commerce',
  dashboard: 'Analytics',
  plate: 'Plate Detection',
  game: 'AlinaWorld',
  booking: 'Booking System',
  api: 'Backend API',
  portfolio: 'Portfolio Site',
  weather: 'Weather App',
  dating: 'Dating App',
}

export function MockUi({ kind }: { kind: MockKind }) {
  return (
    <div className={`mock-ui mock-ui--${kind}`} aria-hidden="true">
      <div className="mock-ui__chrome">
        <span />
        <span />
        <span />
        <em>{labels[kind]}</em>
      </div>
      <div className="mock-ui__screen">
        {kind === 'factory6g' && <FactoryMock />}
        {kind === 'psa' && <PsaMock />}
        {kind === 'reimbursement' && <ReimbMock />}
        {kind === 'mhvoucher' && <VoucherMock />}
        {(kind === 'ai-search' || kind === 'dashboard') && <SearchMock />}
        {kind === 'albert' && <AlbertMock />}
        {kind === 'trinity' && <TrinityMock />}
        {kind === 'wavelet' && <WaveletMock />}
        {kind === 'karisma' && <KarismaMock />}
        {(kind === 'chatbot' || kind === 'dating') && <ChatMock />}
        {kind === 'middleware' && <TrinityMock />}
        {(kind === 'cms' || kind === 'portfolio') && <AlbertMock />}
        {kind === 'plate' && <PlateMock />}
        {kind === 'game' && <GameMock />}
        {kind === 'booking' && <BookingMock />}
        {(kind === 'api' || kind === 'weather') && <KarismaMock />}
      </div>
    </div>
  )
}

function FactoryMock() {
  return (
    <>
      <div className="mock-row">
        <div className="mock-panel grow">
          <div className="mock-label">Eb/No sweep</div>
          <svg viewBox="0 0 220 90" className="mock-chart">
            <polyline
              className="mock-chart-line"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              points="8,78 40,62 72,68 104,40 136,46 168,22 204,28"
            />
            <polyline
              className="mock-chart-line alt"
              fill="none"
              stroke="var(--mock-accent)"
              strokeWidth="2"
              strokeDasharray="4 3"
              points="8,72 40,58 72,50 104,36 136,30 168,18 204,14"
            />
          </svg>
        </div>
        <div className="mock-stack">
          <div className="mock-stat">
            <b>CNN</b>
            <span>estimator</span>
          </div>
          <div className="mock-stat">
            <b>DRL</b>
            <span>scheduler</span>
          </div>
        </div>
      </div>
      <div className="mock-bars">
        <i style={{ height: '42%' }} />
        <i style={{ height: '68%' }} />
        <i style={{ height: '55%' }} />
        <i style={{ height: '82%' }} />
        <i style={{ height: '70%' }} />
      </div>
    </>
  )
}

function PsaMock() {
  return (
    <div className="mock-chat">
      <div className="mock-chat__head">Policy Renewal · Ask</div>
      <div className="mock-bubble bot">Files · Generate · Ask · Renewal</div>
      <div className="mock-bubble user">Renew policy 01-115-…</div>
      <div className="mock-bubble bot">Ready · document check · payment handoff</div>
      <div className="mock-input">Type your message</div>
    </div>
  )
}

function ChatMock() {
  return (
    <div className="mock-chat">
      <div className="mock-chat__head">AI assistant</div>
      <div className="mock-bubble bot">Ask about policies, claims, or search</div>
      <div className="mock-bubble user">Summarise this thread</div>
      <div className="mock-bubble bot">Summary ready · sources attached</div>
      <div className="mock-input">Type your message</div>
    </div>
  )
}

function ReimbMock() {
  return (
    <>
      <div className="mock-label">Submit a claim</div>
      <div className="mock-fields">
        <div className="mock-field" />
        <div className="mock-field short" />
        <div className="mock-field" />
      </div>
      <div className="mock-row">
        <div className="mock-chip">Docs</div>
        <div className="mock-chip">OTP</div>
        <div className="mock-chip active">Timeline</div>
      </div>
      <div className="mock-timeline">
        <span className="done" />
        <span className="done" />
        <span className="now" />
        <span />
      </div>
    </>
  )
}

function VoucherMock() {
  return (
    <>
      <div className="mock-nav">
        <b />
        <b />
        <b className="on" />
        <b />
      </div>
      <div className="mock-table">
        <div className="mock-tr head">
          <i />
          <i />
          <i />
        </div>
        <div className="mock-tr">
          <i />
          <i />
          <i className="pill" />
        </div>
        <div className="mock-tr">
          <i />
          <i />
          <i className="pill alt" />
        </div>
        <div className="mock-tr">
          <i />
          <i />
          <i className="pill" />
        </div>
      </div>
    </>
  )
}

function SearchMock() {
  return (
    <>
      <div className="mock-search">semantic query…</div>
      <div className="mock-hits">
        <div className="mock-hit">
          <b />
          <span />
          <span className="thin" />
        </div>
        <div className="mock-hit">
          <b />
          <span />
          <span className="thin" />
        </div>
        <div className="mock-hit">
          <b />
          <span />
          <span className="thin" />
        </div>
      </div>
    </>
  )
}

function AlbertMock() {
  return (
    <div className="mock-brand">
      <div className="mock-brand__hero" />
      <div className="mock-brand__copy">
        <b />
        <span />
        <em />
      </div>
    </div>
  )
}

function TrinityMock() {
  return (
    <div className="mock-arch">
      <div className="node">API</div>
      <div className="wire" />
      <div className="node accent">Agent</div>
      <div className="wire" />
      <div className="node">Azure</div>
      <div className="mock-row mini">
        <div className="mock-stat compact">
          <b>RAG</b>
        </div>
        <div className="mock-stat compact">
          <b>RBAC</b>
        </div>
        <div className="mock-stat compact">
          <b>Queues</b>
        </div>
      </div>
    </div>
  )
}

function WaveletMock() {
  return (
    <>
      <div className="mock-row">
        <div className="mock-panel grow">
          <div className="mock-label">Realtime channels</div>
          <div className="mock-pulse">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="mock-chips">
        <div className="mock-chip active">Telegram</div>
        <div className="mock-chip">WhatsApp</div>
        <div className="mock-chip">Facebook</div>
      </div>
    </>
  )
}

function KarismaMock() {
  return (
    <div className="mock-services">
      <div className="svc">
        <b>API</b>
        <span>30+</span>
      </div>
      <div className="svc">
        <b>Files</b>
        <span>stream</span>
      </div>
      <div className="svc">
        <b>Img</b>
        <span>+40%</span>
      </div>
      <div className="svc">
        <b>Secure</b>
        <span>audit</span>
      </div>
    </div>
  )
}

function PlateMock() {
  return (
    <>
      <div className="mock-label">Plate detect</div>
      <div className="mock-plate">
        <div className="mock-plate__frame">
          <span />
        </div>
        <div className="mock-bars">
          <i style={{ height: '55%' }} />
          <i style={{ height: '78%' }} />
          <i style={{ height: '42%' }} />
          <i style={{ height: '88%' }} />
        </div>
      </div>
    </>
  )
}

function GameMock() {
  return (
    <div className="mock-game">
      <div className="mock-game__sky" />
      <div className="mock-game__ground" />
      <div className="mock-game__hero" />
      <div className="mock-game__crystal" />
    </div>
  )
}

function BookingMock() {
  return (
    <>
      <div className="mock-label">Tenant calendar</div>
      <div className="mock-table">
        <div className="mock-tr head">
          <i />
          <i />
          <i />
        </div>
        <div className="mock-tr">
          <i />
          <i />
          <i className="pill" />
        </div>
        <div className="mock-tr">
          <i />
          <i />
          <i className="pill alt" />
        </div>
      </div>
    </>
  )
}
