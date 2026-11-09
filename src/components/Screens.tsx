/**
 * Product screens rebuilt from each codebase's own labels, layout and brand
 * colour. Every value is a placeholder and is blurred on top of that — no
 * client data comes from the real systems. Screens stay in English and
 * light, like the apps themselves.
 */

const R = ({ children }: { children: string }) => <span className="redact">{children}</span>

export function PortalScreen() {
  return (
    <div className="screen" role="img" aria-label="TE AI Portal assessments screen with the agent chain">
      <div className="screen-bar">
        <span className="mono">TE AI Portal · Group underwriting</span>
        <span>Internal</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '140px minmax(0, 1fr)', minHeight: 320 }}>
        <div className="scr-side">
          <span>Ask</span>
          <span>Groups</span>
          <span className="on">Assessments</span>
          <span>History</span>
        </div>
        <div className="scr-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <b style={{ fontSize: 14 }}>Underwriting workflow agents</b>
            <span style={{ marginLeft: 'auto', color: '#1d7d37', fontWeight: 600 }}>Done</span>
          </div>
          <div className="seq" style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {['Intake', 'Claims review', 'Medical findings', 'Diagnosis coding', 'Conclusion', 'Report'].map((s) => (
              <span key={s} className="scr-pill">{s}</span>
            ))}
          </div>
          <div className="scr-table">
            <div className="scr-row head" style={{ gridTemplateColumns: '1.1fr 1.4fr 0.8fr' }}>
              <span>Policy number</span><span>Employer name</span><span>Status</span>
            </div>
            <div className="scr-row" style={{ gridTemplateColumns: '1.1fr 1.4fr 0.8fr' }}>
              <R>P-00000000</R><R>Employer Name LLC</R><span style={{ color: '#1d7d37' }}>Ready</span>
            </div>
            <div className="scr-row" style={{ gridTemplateColumns: '1.1fr 1.4fr 0.8fr' }}>
              <R>P-00000000</R><R>Company Trading</R><span style={{ color: '#56565c' }}>Reviewed</span>
            </div>
          </div>
          <div className="scr-box">
            <b>Ask about this report</b>
            <span style={{ color: '#56565c' }}><R>Three diagnosis groups account for most claims across members in this policy.</R></span>
            <span><span style={{ padding: '3px 8px', borderRadius: 6, background: '#f3edf7', color: '#5b157f' }}>Sources · 3</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AskScreen() {
  const source = (name: string, hint: string) => (
    <span style={{ border: '1px solid #ececf0', borderRadius: 10, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <b><R>{name}</R></b>
      <span style={{ color: '#56565c', fontSize: 12 }}>{hint}</span>
    </span>
  )
  return (
    <div className="screen" role="img" aria-label="TE AI Portal Ask screen with threads, a cited answer and its sources">
      <div className="screen-bar">
        <span className="mono">TE AI Portal · Individual underwriting · Ask</span>
        <span>Internal · rebuilt from source</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 200px) minmax(0, 1fr) minmax(0, 260px)', minHeight: 460, fontSize: 13 }}>
        <div className="scr-side">
          <span className="on" style={{ textAlign: 'center' }}>New thread</span>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: 12 }}>Threads</span>
          <span style={{ background: '#efe7f4', borderRadius: 8 }}><R>Policy review thread</R></span>
          <span><R>Renewal question</R></span>
          <span><R>Claims summary</R></span>
        </div>
        <div className="scr-body" style={{ padding: 20, gap: 14, fontSize: 13 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 10px', borderRadius: 999, background: '#f3edf7', color: '#5b157f', fontWeight: 600 }}>Report · <R>Assessment title</R></span>
            <span style={{ padding: '4px 10px', borderRadius: 999, background: '#f3f3f5' }}>Clear selection</span>
          </div>
          <span style={{ alignSelf: 'flex-end', maxWidth: '70%', padding: '10px 14px', borderRadius: '16px 16px 4px 16px', background: '#5b157f', color: '#fff' }}>What are the key risks?</span>
          <div style={{ maxWidth: '88%', padding: '12px 14px', borderRadius: '16px 16px 16px 4px', background: '#f3f3f5', display: 'flex', flexDirection: 'column', gap: 8, lineHeight: 1.5 }}>
            <R>The assessment flags three risk areas for this member, each linked to findings in the uploaded medical documents and the claims history.</R>
            <R>A chronic condition noted in two reports, recent claims above the group average, and one pending diagnosis.</R>
          </div>
          <span style={{ color: '#56565c', fontSize: 12 }}>Responded in 6.2s · Helpful · Not helpful</span>
          <div style={{ marginTop: 'auto', border: '1px solid #dcdce2', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, color: '#8a8a90' }}>
            <span style={{ flexGrow: 1 }}>Ask about this report…</span>
            <span style={{ padding: '6px 12px', borderRadius: 8, background: '#5b157f', color: '#fff', fontWeight: 600 }}>Send</span>
          </div>
        </div>
        <div style={{ borderLeft: '1px solid #ececf0', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <b>Sources</b>
          <span style={{ color: '#56565c', fontSize: 12 }}>What this answer read from</span>
          {source('medical_report.pdf', 'Open page 3')}
          {source('claims_history.xlsx', 'Open page 1')}
          {source('Assessment report', 'Saved assessment')}
        </div>
      </div>
    </div>
  )
}

export function ClaimsScreen() {
  const kpi = (label: string, value: string) => (
    <div className="scr-kpi">
      <span style={{ color: '#56565c' }}>{label}</span>
      <b className="redact">{value}</b>
    </div>
  )
  const cols = { gridTemplateColumns: '1fr 1fr 1fr 1fr' }
  return (
    <div className="screen" role="img" aria-label="Claims Portal finance dashboard">
      <div className="screen-bar">
        <span className="mono">Claims Portal · Finance</span>
        <span>Internal</span>
      </div>
      <div className="scr-body" style={{ background: '#efeff3' }}>
        <div className="scr-kpis">
          {kpi('Submitted', '1,240')}
          {kpi('Accepted', '1,108')}
          {kpi('Failed', '32')}
          {kpi('Amount paid', 'AED 00,000')}
        </div>
        <div className="scr-kpi" style={{ gap: 8, padding: 12 }}>
          <b style={{ fontSize: 12.5 }}>Batches by status</b>
          <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden' }}>
            <span className="grow" style={{ width: '46%', background: '#5b157f' }} />
            <span className="grow" style={{ width: '24%', background: '#9b6bb8', animationDelay: '.2s' }} />
            <span className="grow" style={{ width: '18%', background: '#d6c3e3', animationDelay: '.4s' }} />
            <span className="grow" style={{ width: '12%', background: '#e9e3ee', animationDelay: '.6s' }} />
          </div>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: 14, color: '#56565c' }}>
            <span>Paid</span><span>Processed</span><span>Uploaded</span><span>Needs attention</span>
          </span>
        </div>
        <div className="scr-table" style={{ background: '#fff', border: 0 }}>
          <div className="scr-row head" style={{ ...cols, background: '#fff', borderBottom: '1px solid #eee' }}>
            <span>Batch ref</span><span>TPA</span><span>Amount</span><span>Status</span>
          </div>
          <div className="scr-row" style={{ ...cols, borderTop: 0 }}>
            <R>BR-0000</R><R>TPA Name</R><R>AED 00,000</R><span>Paid</span>
          </div>
          <div className="scr-row" style={cols}>
            <R>BR-0000</R><R>TPA Name</R><R>AED 00,000</R><span style={{ color: '#b3261e' }}>Past target</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function VoucherScreen() {
  const cols = { gridTemplateColumns: '0.9fr 1.6fr 1fr 0.7fr 0.8fr 0.9fr' }
  const row = (title: string, type: string) => (
    <div className="scr-row" style={cols}>
      <R>V00000</R><R>{title}</R><R>Merchant</R><span>{type}</span><R>000</R><R>00/00/26</R>
    </div>
  )
  return (
    <div className="screen" role="img" aria-label="Voucher Dashboard table in the admin portal">
      <div className="screen-bar">
        <span className="mono">Admin Portal · Voucher Dashboard</span>
        <span>Internal</span>
      </div>
      <div className="scr-body" style={{ fontSize: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span style={{ padding: '6px 12px', borderRadius: 6, background: '#00205b', color: '#fff', fontWeight: 600 }}>Voucher</span>
          <span style={{ padding: '6px 12px', borderRadius: 6, background: '#f1f2f6' }}>Merchant</span>
          <span style={{ padding: '6px 12px', borderRadius: 6, background: '#f1f2f6' }}>Campaign</span>
          <span style={{ marginLeft: 'auto', padding: '6px 12px', borderRadius: 6, background: '#00205b', color: '#fff', fontWeight: 600 }}>New Voucher Creation</span>
        </div>
        <div className="scr-table rows-in" style={{ overflowX: 'auto' }}>
          <div className="scr-row head" style={{ ...cols, fontSize: 10.5, background: '#f1f2f6', color: '#4a4f5c' }}>
            <span>VOUCHER ID</span><span>VOUCHER TITLE</span><span>MERCHANT</span><span>TYPE</span><span>USED</span><span>EXPIRY</span>
          </div>
          {row('Voucher title here', 'Gift')}
          {row('Another voucher', 'Campaign')}
          {row('Voucher title', 'Bundle')}
        </div>
      </div>
    </div>
  )
}
