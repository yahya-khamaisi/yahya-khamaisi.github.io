export type DomainId = 'agents' | 'cloud' | 'fullstack' | 'ai' | 'data'

export type Domain = {
  id: DomainId
  label: string
  sub: string
  title: string
  text: string
  story: string
  icon: 'ai' | 'cloud' | 'react' | 'search' | 'database'
  hx: number
  hy: number
  r: number
}

export type Flow = {
  from: DomainId
  to: DomainId
  label: string
}

/**
 * Capability graph — full-stack engineering for AI products.
 * The doctoral research is background depth, not a node here.
 */
export const careerDomains: Domain[] = [
  {
    id: 'ai',
    label: 'Applied AI',
    sub: 'RAG · agents · eval',
    title: 'Applied AI',
    text: 'The centre of the work: RAG, LLMs, agent tooling, and the evaluation loops that keep them honest in production.',
    story:
      'Applied AI is the hub — every other capability exists to get an agent or a retrieval system safely in front of real users.',
    icon: 'search',
    hx: 0.5,
    hy: 0.42,
    r: 46,
  },
  {
    id: 'agents',
    label: 'AI Agents',
    sub: 'ReAct · MCP · tools',
    title: 'Agent systems',
    text: 'Production agentic workflows with tool gateways, session orchestration, guardrails, and payment handoffs.',
    story:
      'Agents turn AI into operable products — MCP tools, session state, and safe handoffs into APIs and widgets (e.g. TE AI Portal).',
    icon: 'ai',
    hx: 0.22,
    hy: 0.28,
    r: 34,
  },
  {
    id: 'cloud',
    label: 'Cloud',
    sub: 'Azure · APIs · queues',
    title: 'Cloud platforms',
    text: 'Azure Functions, Container Apps, APIM, queues, and reliable API surfaces for enterprise delivery.',
    story:
      'Cloud is how strong systems ship at scale — Functions, Container Apps, APIM, and queues under real load.',
    icon: 'cloud',
    hx: 0.78,
    hy: 0.28,
    r: 34,
  },
  {
    id: 'fullstack',
    label: 'Full Stack',
    sub: 'UI · Nest · FastAPI',
    title: 'Full-stack products',
    text: 'NestJS / React / FastAPI systems — admin portals, embeddable widgets, and operational tooling.',
    story:
      'Full-stack delivery makes AI and APIs usable — portals, widgets, and operator tools people trust.',
    icon: 'react',
    hx: 0.22,
    hy: 0.7,
    r: 34,
  },
  {
    id: 'data',
    label: 'Data & Retrieval',
    sub: 'Postgres · vectors · search',
    title: 'Data & retrieval',
    text: 'The substrate under every AI feature — Postgres, vector stores, and search indexes tuned to answer fast and stay isolated per tenant.',
    story:
      'Data and retrieval decide whether an agent has anything real to say — indexing at ingest, vector search, and query tuning under load.',
    icon: 'database',
    hx: 0.78,
    hy: 0.7,
    r: 34,
  },
]

export const careerFlows: Flow[] = [
  { from: 'ai', to: 'agents', label: 'tools' },
  { from: 'ai', to: 'cloud', label: 'serve' },
  { from: 'ai', to: 'fullstack', label: 'UX' },
  { from: 'ai', to: 'data', label: 'retrieve' },
  { from: 'agents', to: 'cloud', label: 'deploy' },
  { from: 'agents', to: 'fullstack', label: 'widget' },
  { from: 'cloud', to: 'fullstack', label: 'API' },
  { from: 'data', to: 'cloud', label: 'index' },
]

export const careerProof = [
  'TE AI Portal',
  'CoolRIOTS RAG',
  'BeXInsight Search',
  'MHVoucher',
  'Journify Middleware',
  '6+ years delivery',
]

export const careerIdleStory =
  'Hover a node to see how the pieces connect to get an AI system into production.'

/** Back-compat aliases used by CapabilityScene callers */
export const domains = careerDomains
export const flows = careerFlows
