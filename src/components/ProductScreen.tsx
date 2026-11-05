import type { ReactNode } from 'react'
import type { MockKind } from '../data/content'
import { Sym, type SymName } from './Sym'

/**
 * Illustrative product screens drawn as native macOS / iOS windows.
 *
 * Every name, code and figure here is invented — they show the shape of
 * each product, never client data. Sizes are in `em` against a font size
 * derived from the container width, so one screen renders crisply both as
 * a card thumbnail and full-size on a case study.
 */
export function ProductScreen({ kind, title }: { kind: MockKind; title: string }) {
  return (
    <div className="scr-fit" aria-hidden="true">
      <div className="scr">{renderKind(kind, title)}</div>
    </div>
  )
}

function renderKind(kind: MockKind, title: string) {
  switch (kind) {
    case 'psa':
      return <Workspace />
    case 'mhvoucher':
    case 'booking':
      return <AdminList />
    case 'reimbursement':
      return <Phones />
    case 'factory6g':
      return <Experiment title={title} />
    case 'ai-search':
    case 'chatbot':
    case 'dating':
      return <Assistant title={title} />
    case 'dashboard':
      return <Metrics title={title} />
    case 'middleware':
    case 'trinity':
    case 'wavelet':
      return <Pipeline title={title} />
    case 'api':
    case 'karisma':
    case 'weather':
      return <ApiClient title={title} />
    case 'cms':
    case 'albert':
    case 'portfolio':
      return <Cms title={title} />
    case 'plate':
      return <Vision />
    case 'game':
      return <Game />
  }
}

function Lights() {
  return (
    <span className="scr-lights">
      <i />
      <i />
      <i />
    </span>
  )
}

function Win({ children, title, sub }: { children: ReactNode; title?: string; sub?: string }) {
  return (
    <div className="scr-win">
      {title !== undefined && (
        <div className="scr-tb">
          <Lights />
          <div className="scr-grow">
            <b>{title}</b>
            {sub && <small>{sub}</small>}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

function Side({ items, on }: { items: [SymName, string][]; on: number }) {
  return (
    <div className="scr-side">
      <Lights />
      {items.map(([icon, label], i) => (
        <span key={label} className={`scr-nav${i === on ? ' is-on' : ''}`}>
          <Sym name={icon} />
          {label}
        </span>
      ))}
    </div>
  )
}

function Workspace() {
  return (
    <div className="scr-win scr-split">
      <Side
        items={[
          ['tray', 'Cases'],
          ['paper', 'Reports'],
          ['book', 'Knowledge'],
          ['bubble', 'Renewals'],
        ]}
        on={0}
      />
      <div className="scr-main">
        <div className="scr-row scr-between">
          <div>
            <b>Northwind Logistics</b>
            <small>Group medical · 142 members</small>
          </div>
          <span className="scr-seg">
            <span className="ok">✓ Files</span>
            <span className="ok">✓ Generate</span>
            <span className="on">Ask</span>
            <span>Report</span>
          </span>
        </div>
        <div className="scr-cols">
          <div className="scr-card">
            <h6>Documents</h6>
            <File name="Member census.pdf" state="Indexed" />
            <File name="Claims history 3y.xlsx" state="Indexed" />
            <File name="Prior schedule.pdf" state="Indexed" />
            <File name="Declarations.pdf" state="OCR 72%" busy />
            <h6>Summary</h6>
            <div className="scr-kv">
              <span>Risk band</span>
              <b>Medium</b>
            </div>
            <div className="scr-kv">
              <span>Loss ratio</span>
              <b>0.71</b>
            </div>
          </div>
          <div className="scr-card scr-chat">
            <h6>
              <i className="scr-dot" /> Group underwriting · Ask
            </h6>
            <p className="scr-msg u">Which members drive most of the claims cost?</p>
            <p className="scr-msg a">
              Three chronic cases account for 41% of paid claims over three years{' '}
              <span className="scr-cite">1</span>. Two renew in Q1, so pricing should
              reflect continued treatment <span className="scr-cite">2</span>.
            </p>
            <div className="scr-compose">Ask about this case</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function File({ name, state, busy }: { name: string; state: string; busy?: boolean }) {
  return (
    <div className="scr-file">
      <span className="scr-doc" />
      <span className="scr-grow">{name}</span>
      <span className={busy ? 'scr-badge run' : 'scr-badge ok'}>{state}</span>
    </div>
  )
}

const rows: [string, string, string, string, 'ok' | 'bad' | 'warn'][] = [
  ['VX-8F2K-19QA', 'Upgrade', 'Business', 'Redeemed', 'ok'],
  ['VX-2M7P-44RT', 'Gift', 'USD 150', 'Redeemed', 'ok'],
  ['VX-9C1L-07ZE', 'Miles', '5,000', 'Failed', 'bad'],
  ['VX-4H6N-88BW', 'Lounge', '1 pass', 'Pending', 'warn'],
  ['VX-7T3D-52KS', 'Gift', 'USD 50', 'Redeemed', 'ok'],
]

function AdminList() {
  return (
    <div className="scr-win scr-split">
      <Side
        items={[
          ['home', 'Overview'],
          ['ticket', 'Redemptions'],
          ['box', 'Inventory'],
          ['shield', 'Roles'],
          ['list', 'Audit log'],
        ]}
        on={1}
      />
      <div className="scr-main">
        <div className="scr-row scr-between">
          <div>
            <b>Redemptions</b>
            <small>Last 24 hours</small>
          </div>
          <span className="scr-field">
            <Sym name="search" /> Voucher or member ID
          </span>
        </div>
        <div className="scr-stats">
          <Stat label="Redeemed today" value="1,284" delta="+12%" />
          <Stat label="Active campaigns" value="7" />
          <Stat label="Failed" value="3" delta="alerted" bad />
          <Stat label="p95 latency" value="142 ms" />
        </div>
        <div className="scr-table">
          {rows.map(([code, type, value, status, tone], i) => (
            <div key={code} className={`scr-tr${i === 2 ? ' is-sel' : ''}`}>
              <span className="mono">{code}</span>
              <span>{type}</span>
              <span>{value}</span>
              <span className={`scr-badge ${tone}`}>{status}</span>
            </div>
          ))}
        </div>
        <small className="scr-foot">
          <Sym name="check" /> support.agent_04 reissued VX-9C1L-07ZE · logged
        </small>
      </div>
    </div>
  )
}

function Stat({ label, value, delta, bad }: { label: string; value: string; delta?: string; bad?: boolean }) {
  return (
    <div className="scr-stat">
      <small>{label}</small>
      <b>
        {value}
        {delta && <em className={bad ? 'bad' : undefined}>{delta}</em>}
      </b>
    </div>
  )
}

function Phones() {
  return (
    <div className="scr-phones">
      <div className="scr-phone">
        <div className="scr-island" />
        <span className="scr-back">‹ Claim</span>
        <b className="scr-large">Verify it's you</b>
        <small>Code sent to +971 ••• •• 42</small>
        <div className="scr-otp">
          <span>4</span>
          <span>8</span>
          <span>1</span>
          <span className="f">2</span>
          <span />
          <span />
        </div>
        <div className="scr-group scr-upload">Add receipts</div>
        <div className="scr-pbtn">Continue</div>
        <TabBar />
      </div>
      <div className="scr-phone">
        <div className="scr-island" />
        <span className="scr-back">‹ Claims</span>
        <b className="scr-large">Consultation</b>
        <small>CLM-20481 · submitted 3 Nov</small>
        <div className="scr-group">
          <small>Amount claimed</small>
          <b className="scr-amt">AED 640.00</b>
          <span className="scr-ibadge">In review</span>
        </div>
        <div className="scr-group scr-tl">
          <span className="d">Submitted</span>
          <span className="d">Documents verified</span>
          <span className="c">Medical review</span>
          <span>Payment</span>
        </div>
        <TabBar />
      </div>
    </div>
  )
}

function TabBar() {
  return (
    <div className="scr-tabbar">
      <span>
        <Sym name="home" />
      </span>
      <span className="on">
        <Sym name="paper" />
      </span>
      <span>
        <Sym name="globe" />
      </span>
    </div>
  )
}

function Experiment({ title }: { title: string }) {
  return (
    <Win title="sweep-ebno" sub={`${title} · 10,000 trials`}>
      <div className="scr-main">
        <div className="scr-cols">
          <div className="scr-card">
            <div className="scr-legend">
              <span style={{ ['--c' as string]: '#0a84ff' }}>CNN</span>
              <span style={{ ['--c' as string]: '#bf5af2' }}>LMMSE</span>
              <span style={{ ['--c' as string]: '#8e8e93' }}>LS</span>
            </div>
            <svg viewBox="0 0 300 140" className="scr-chart">
              <g stroke="currentColor" strokeOpacity=".12">
                <line x1="20" y1="35" x2="300" y2="35" />
                <line x1="20" y1="70" x2="300" y2="70" />
                <line x1="20" y1="105" x2="300" y2="105" />
              </g>
              <polyline fill="none" stroke="#8e8e93" strokeWidth="2" strokeDasharray="4 3" points="20,12 70,24 120,38 170,55 220,72 270,88 300,96" />
              <polyline fill="none" stroke="#bf5af2" strokeWidth="2.2" points="20,12 70,28 120,48 170,70 220,92 270,106 300,114" />
              <polyline fill="none" stroke="#0a84ff" strokeWidth="2.6" points="20,13 70,32 120,56 170,82 220,104 270,120 300,128" />
              <line x1="20" y1="84" x2="300" y2="84" stroke="#30d158" strokeDasharray="3 3" />
            </svg>
          </div>
          <div className="scr-term">
            <span>
              <i className="k">$</i> make sweep
            </span>
            <span>
              trials 10000/10000 <i className="g">✓</i>
            </span>
            <span>
              CNN BLER@8dB <i className="g">2.1e-4</i>
            </span>
            <span>LMMSE BLER@8dB 1.3e-3</span>
            <span>
              LS BLER@8dB <i className="y">8.7e-3</i>
            </span>
            <span>→ figures/fig4.pdf</span>
          </div>
        </div>
      </div>
    </Win>
  )
}

function Assistant({ title }: { title: string }) {
  return (
    <Win title={title} sub="Grounded answers">
      <div className="scr-main">
        <span className="scr-field scr-wide">
          <Sym name="search" /> How do I reset a tenant's index?
        </span>
        <p className="scr-msg a">
          Rebuild it through the admin API. The old index stays live until the swap
          completes <span className="scr-cite">1</span> <span className="scr-cite">2</span>
        </p>
        <div className="scr-card">
          <h6>Sources</h6>
          <File name="ops-runbook.md · 0.89" state="Cited" />
          <File name="index-lifecycle.md · 0.84" state="Cited" />
        </div>
      </div>
    </Win>
  )
}

function Metrics({ title }: { title: string }) {
  const bars = [42, 58, 51, 70, 64, 82, 76, 90]
  return (
    <Win title={title} sub="Last 7 days">
      <div className="scr-main">
        <div className="scr-stats">
          <Stat label="p50" value="38 ms" />
          <Stat label="p95" value="96 ms" />
          <Stat label="Requests" value="1.2M" delta="+8%" />
          <Stat label="Errors" value="0.02%" />
        </div>
        <div className="scr-card scr-bars">
          {bars.map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </Win>
  )
}

function Pipeline({ title }: { title: string }) {
  const fns: [string, string, string, 'ok' | 'warn'][] = [
    ['onPlanUpdated', 'plan-updates', '48 ms', 'ok'],
    ['syncTripmates', 'permissions', '63 ms', 'ok'],
    ['resolvePlaces', 'destinations', '31 ms', 'ok'],
    ['notify', 'alerts', 'Retry 1/3', 'warn'],
  ]
  return (
    <Win title={title} sub="Event pipeline · live">
      <div className="scr-main">
        <div className="scr-table">
          {fns.map(([fn, q, t, tone]) => (
            <div key={fn} className="scr-tr">
              <span className="mono">{fn}</span>
              <span>{q}</span>
              <span className={`scr-badge ${tone}`}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </Win>
  )
}

function ApiClient({ title }: { title: string }) {
  return (
    <Win title={title} sub="API">
      <div className="scr-main">
        <span className="scr-field scr-wide mono">
          <b className="scr-get">GET</b> /v2/items?status=active&amp;limit=20
        </span>
        <div className="scr-term">
          <span>
            <i className="g">200 OK</i> · 41 ms
          </span>
          <span>{'{'}</span>
          <span>&nbsp;&nbsp;"items": [ … 20 ],</span>
          <span>&nbsp;&nbsp;"next": "c_19f2",</span>
          <span>&nbsp;&nbsp;"total": 1284</span>
          <span>{'}'}</span>
        </div>
      </div>
    </Win>
  )
}

function Cms({ title }: { title: string }) {
  return (
    <div className="scr-win scr-split">
      <Side
        items={[
          ['paper', 'Pages'],
          ['box', 'Products'],
          ['globe', 'Locales'],
        ]}
        on={0}
      />
      <div className="scr-main">
        <div className="scr-row scr-between">
          <b>{title}</b>
          <span className="scr-badge ok">Published</span>
        </div>
        <div className="scr-hero-block" />
        <span className="scr-line" />
        <span className="scr-line short" />
        <div className="scr-cols">
          <div className="scr-card scr-thumb" />
          <div className="scr-card scr-thumb" />
        </div>
      </div>
    </div>
  )
}

function Vision() {
  return (
    <Win title="Camera 03" sub="Detection · live">
      <div className="scr-main">
        <div className="scr-vision">
          <span className="scr-box">
            <i>person · 0.94</i>
          </span>
          <span className="scr-box alt">
            <i>plate · 0.88</i>
          </span>
        </div>
      </div>
    </Win>
  )
}

function Game() {
  return (
    <Win title="AlinaWorld" sub="World 3 · Mission 2">
      <div className="scr-game">
        <span className="hill" />
        <span className="hero" />
        <span className="gem" />
        <span className="gem two" />
      </div>
    </Win>
  )
}
