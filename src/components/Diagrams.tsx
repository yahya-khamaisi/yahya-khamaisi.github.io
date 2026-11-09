/**
 * Simplified redraws of company architecture diagrams. The originals name
 * internal endpoints, model IDs and systems, so these keep only the shape.
 */

export function OcrFlow() {
  return (
    <div className="flow" role="img" aria-label="OCR flow: upload, classify, route to one of four layouts, one JSON schema">
      <div className="flow-row" style={{ gridTemplateColumns: '1fr 14px 1fr' }}>
        <span className="dg">Upload</span>
        <span className="arr">→</span>
        <span className="dg">Classify</span>
      </div>
      <div className="flow-row" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        <span className="dg">A</span>
        <span className="dg">B</span>
        <span className="dg">C</span>
        <span className="dg">D<small>RTL</small></span>
      </div>
      <span className="dg hl">One JSON schema</span>
    </div>
  )
}

export function ChatbotFlow() {
  const cols = { gridTemplateColumns: '1fr 14px 1fr 14px 1fr' }
  return (
    <div className="flow" role="img" aria-label="Serverless RAG flow: PDFs to vectors, chat to Lambda to LLM">
      <div className="flow-row" style={cols}>
        <span className="dg">PDFs</span>
        <span className="arr">→</span>
        <span className="dg">Loader</span>
        <span className="arr">→</span>
        <span className="dg">Vectors</span>
      </div>
      <div className="flow-row" style={cols}>
        <span className="dg">Chat</span>
        <span className="arr">⇄</span>
        <span className="dg">Lambda</span>
        <span className="arr">→</span>
        <span className="dg hl">LLM</span>
      </div>
    </div>
  )
}

export function RenewalFlow() {
  return (
    <div className="card flow-card" role="img" aria-label="Renewal flow: staff portal or website assistant, guardrails, renewal agent, renewal service and payment">
      <div className="flow-stack">
        <span className="dg">Staff portal<small>internal chat</small></span>
        <span className="dg">Website assistant<small>for customers</small></span>
      </div>
      <span className="arr">→</span>
      <span className="dg">Guardrails<small>masking · consent</small></span>
      <span className="arr">→</span>
      <span className="dg hl">Renewal agent<small>Azure AI Foundry</small></span>
      <span className="arr">→</span>
      <div className="flow-stack">
        <span className="dg">Renewal service<small>quote</small></span>
        <span className="dg">Payment</span>
      </div>
    </div>
  )
}
