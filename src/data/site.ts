/**
 * Copy and metadata for the portfolio layout.
 *
 * content.ts / content.ar.ts stay the source of truth for the record itself
 * (profile, projects, experience, education, publications). This file holds
 * what the layout adds on top: section copy, the scripted agent demo, the
 * stack visuals, and how each project is grouped and evidenced.
 */
import type { Lang } from '../i18n/LangProvider'

export type GroupKey = 'te' | 'tw' | 'cr' | 'ea' | 'rs' | 'pe'
export type Discipline = 'ai' | 'fs' | 'app'
export type Evidence =
  | 'caseStudy'
  | 'screen'
  | 'diagram'
  | 'figures'
  | 'screenshots'
  | 'liveSite'
  | 'github'

export type ProjectMeta = {
  group: GroupKey
  discipline: Discipline
  evidence?: Evidence
  /** Screenshot or figure under public/, shown on the project page. */
  image?: string
}

export const groupOrder: GroupKey[] = ['te', 'tw', 'cr', 'ea', 'rs', 'pe']

/** Bar colour per group in the project-count charts. */
export const groupTone: Record<GroupKey, string> = {
  te: 'linear-gradient(90deg, var(--blue), var(--violet))',
  tw: 'var(--blue)',
  cr: 'var(--violet)',
  ea: 'color-mix(in srgb, var(--blue) 60%, var(--fill))',
  rs: 'color-mix(in srgb, var(--violet) 60%, var(--fill))',
  pe: 'var(--muted)',
}


export const projectMeta: Record<string, ProjectMeta> = {
  'te-ai-portal': { group: 'te', discipline: 'ai', evidence: 'caseStudy' },
  'reimbursement-portal': { group: 'te', discipline: 'fs', evidence: 'screen' },
  'claims-summary-ai': { group: 'te', discipline: 'ai' },
  'te-ocr-backend': { group: 'te', discipline: 'ai', evidence: 'diagram' },
  mhvoucher: { group: 'tw', discipline: 'fs', evidence: 'screen' },
  'journify-middleware': { group: 'tw', discipline: 'fs' },
  'invoice-ms': { group: 'tw', discipline: 'fs' },
  'serverless-ai-chatbot': { group: 'tw', discipline: 'ai', evidence: 'diagram' },
  'journify-cms': { group: 'tw', discipline: 'fs' },
  'magento-continuity': { group: 'tw', discipline: 'fs' },
  'coolriots-rag': { group: 'cr', discipline: 'ai' },
  bexinsight: { group: 'cr', discipline: 'ai' },
  'pern-analytics': { group: 'cr', discipline: 'fs' },
  'wavelet-realtime': { group: 'ea', discipline: 'fs' },
  'karisma-apis': { group: 'ea', discipline: 'fs' },
  factory6g: { group: 'rs', discipline: 'ai', evidence: 'figures', image: '/work/f6g-ppo.jpg' },
  'polar-6g-sim': { group: 'rs', discipline: 'app', evidence: 'github' },
  lucent: { group: 'pe', discipline: 'app', evidence: 'screenshots', image: '/work/lucent.jpg' },
  vitals: { group: 'pe', discipline: 'app', evidence: 'screenshots', image: '/work/vitals.jpg' },
  driftly: { group: 'pe', discipline: 'app', evidence: 'screenshots', image: '/work/driftly.jpg' },
  paperline: { group: 'pe', discipline: 'app' },
  alinaworld: { group: 'pe', discipline: 'app' },
  'albert-roi': { group: 'pe', discipline: 'fs', evidence: 'liveSite', image: '/work/albert.jpg' },
  filterkit: { group: 'pe', discipline: 'fs', evidence: 'github' },
  'next-starter-kit': { group: 'pe', discipline: 'fs', evidence: 'github' },
  skycast: { group: 'pe', discipline: 'fs', evidence: 'github' },
}

/** The three projects told as full case studies on the home page. */
export const caseStudySlugs = ['te-ai-portal', 'reimbursement-portal', 'mhvoucher'] as const
export type CaseStudySlug = (typeof caseStudySlugs)[number]

/** Career bars on a 2020 → 2027 axis, in the same order as `experience`. */
export const careerSpans: [number, number][] = [
  [2026.25, 2026.9],
  [2024, 2026.2],
  [2022.6, 2024.05],
  [2021.67, 2022.62],
  [2020.5, 2021.62],
]

export type Layer = 'ui' | 'api' | 'agents' | 'retrieval' | 'cloud'
export const layerOrder: Layer[] = ['ui', 'api', 'agents', 'retrieval', 'cloud']
export const aiLayers: Layer[] = ['agents', 'retrieval']

/** Which layers each project touched, from its stack. [from, to] are 1-based layer indexes. */
export const coverage: { slug: string; spans: [number, number][]; tone: 'mix' | 'ai' | 'fs' }[] = [
  { slug: 'te-ai-portal', spans: [[1, 5]], tone: 'mix' },
  { slug: 'serverless-ai-chatbot', spans: [[1, 5]], tone: 'mix' },
  { slug: 'coolriots-rag', spans: [[2, 4]], tone: 'ai' },
  { slug: 'bexinsight', spans: [[2, 5]], tone: 'mix' },
  { slug: 'reimbursement-portal', spans: [[1, 2], [5, 5]], tone: 'fs' },
  { slug: 'mhvoucher', spans: [[1, 2], [5, 5]], tone: 'fs' },
]

export const orbitTools = {
  ai: ['Azure AI Foundry', 'LangChain', 'OpenAI', 'Milvus', 'Elasticsearch', 'AWS Bedrock', 'TensorFlow'],
  fs: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'NestJS', 'Node.js', 'Azure Functions', 'PostgreSQL', 'Redis', 'Docker'],
}

export const marqueeTools = {
  ai: ['Azure AI Foundry', 'LangChain', 'OpenAI', 'Milvus', 'Elasticsearch', 'Azure AI Search', 'Document Intelligence', 'AWS Bedrock', 'TensorFlow'],
  fs: ['Python', 'FastAPI', 'Next.js', 'React', 'TypeScript', 'NestJS', 'Node.js', 'Azure Functions', 'PostgreSQL', 'Redis', 'Docker', 'AWS Lambda'],
}

type Scene = {
  tab: string
  question: string
  sources: { kind: string; title: string; href: string }[]
  answer: string
}

export type Copy = {
  nav: { id: string; label: string }[]
  askAboutMe: string
  cv: string
  theme: { system: string; light: string; dark: string; toggle: (current: string) => string }
  hero: {
    chips: string[]
    lead: string
    rotating: string[]
    tail: string
    sub: string
    primary: string
    secondary: string
    proof: { value: string; label: string; tone?: 'ai' | 'fs' }[]
    toolsLabel: string
  }
  ask: {
    agent: string
    hint: string
    examples: string
    question: string
    trace: string
    retrieved: string
    answer: string
    waiting: string
    grounded: string
    disclaimer: string
    steps: { label: string; meta: (scene: Scene) => string }[]
    scenes: Scene[]
  }
  work: {
    num: string
    title: string
    lead: string
    problem: string
    built: string
    outcome: string
    readCase: string
    rebuilt: string
    redrawn: string
    thesis: string
    layerTags: Record<Layer, string>
    cases: Record<CaseStudySlug, { meta: string; problem: string; built: string; outcome: string; layers: Layer[] }>
    indexLabel: string
    indexTitle: (n: number) => string
    indexSub: string
    browse: (n: number) => string
    macApp: string
    brandSite: string
  }
  build: {
    num: string
    title: string
    lead: [string, string, string, string, string]
    layers: Record<Layer, { name: string; title: string; tools: string }>
    request: string
    response: string
    coverageLabel: string
    coverage: Record<string, string>
    principles: { title: string; body: string; tone: 'ai' | 'fs' }[]
  }
  experience: {
    num: string
    title: string
    timelineAria: string
    evolutionLabel: string
    evolutionPath: [string, string, string]
    eras: { when: string; title: string; tools: [string, 'ai' | 'fs'][] }[]
    chips: string[][]
  }
  skills: {
    num: string
    title: string
    lead: string
    orbitLabel: string
    orbitTitle: [string, string]
    inner: string
    outer: string
    orbitBody: string
    aiTitle: string
    fsTitle: string
    ai: [string, string][]
    fs: [string, string][]
  }
  education: {
    num: string
    title: string
    inProgress: string
    researchAreas: string
    areas: [string, 'ai' | 'fs'][]
  }
  contact: { num: string; title: [string, string]; lead: string }
  footer: { backToTop: string }
  projects: {
    label: string
    title: (n: number) => string
    lead: string
    distAria: string
    filterAria: string
    all: string
    groups: Record<GroupKey, { name: string; note: string }>
    legend: Record<Discipline, string>
    evidence: Record<Evidence, string>
    writeUp: string
    home: string
  }
  project: {
    back: string
    role: string
    when: string
    stack: string
    built: string
    impact: string
    evidence: string
    product: string
    productTitle: string
    productLead: string
    chain: string
    chainTitle: string
    chainSteps: [string, string][]
    chainNote: string
    renewal: string
    renewalTitle: string
    renewalLead: string
    prev: string
    next: string
    notFound: string
    visit: string
    github: string
  }
  screens: {
    portal: string
    internal: string
    sources: string
  }
}

const en: Copy = {
  nav: [
    { id: 'work', label: 'Work' },
    { id: 'stack', label: 'How I build' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
  askAboutMe: 'Ask about me',
  cv: 'CV',
  theme: {
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    toggle: (current) => `Theme: ${current}. Click to change.`,
  },
  hero: {
    chips: ['Senior AI Engineer · Takaful Emarat', 'Dubai, UAE', 'PhD · Applied AI'],
    lead: 'I build',
    rotating: ['AI agents', 'RAG systems', 'APIs & portals', 'full products'],
    tail: 'that hold up in production.',
    sub: 'Full-stack engineer for AI systems: the agents and retrieval, plus the APIs, interfaces and cloud they run on. Six years of enterprise delivery.',
    primary: 'See the work',
    secondary: 'Ask the portfolio',
    proof: [
      { value: '6+ yrs', label: 'enterprise delivery, 5 companies' },
      { value: '5 agents', label: 'live on Azure AI Foundry', tone: 'ai' },
      { value: '~60%', label: 'lower search latency, BeXInsight', tone: 'fs' },
      { value: '4 papers', label: 'PhD research in applied AI' },
    ],
    toolsLabel: 'Tools I use',
  },
  ask: {
    agent: 'portfolio-agent',
    hint: 'Ask a question. Every answer cites this page.',
    examples: 'Example questions',
    question: 'Question',
    trace: 'Agent trace',
    retrieved: 'Retrieved',
    answer: 'Answer',
    waiting: 'Waiting for the plan…',
    grounded: '✓ grounded in 3 sources',
    disclaimer: 'scripted demo · built from this page',
    steps: [
      { label: 'Plan the lookups', meta: () => '3 queries' },
      { label: 'Search this portfolio', meta: () => '3 hits' },
      { label: 'Write with citations', meta: (s) => `${s.answer.length} chars` },
      { label: 'Check every claim', meta: () => 'pass' },
    ],
    scenes: [
      {
        tab: 'AI work',
        question: 'What has Yahya shipped with AI?',
        sources: [
          { kind: 'Project', title: 'TE AI Portal', href: '#work' },
          { kind: 'Experience', title: 'Takaful Emarat', href: '#experience' },
          { kind: 'Project', title: 'Serverless AI Chatbot', href: '#work' },
        ],
        answer:
          'Five agents on Azure AI Foundry for underwriting and policy renewal at Takaful Emarat [1][2], and a serverless RAG assistant on AWS [3]. Answers in the portal cite the documents they read.',
      },
      {
        tab: 'Full stack',
        question: 'Can he build the whole product, not just the model?',
        sources: [
          { kind: 'Project', title: 'Claims Portal', href: '#work' },
          { kind: 'Project', title: 'MHVoucher Platform', href: '#work' },
          { kind: 'Skills', title: 'Azure Functions', href: '#skills' },
        ],
        answer:
          'Yes. He owns a claims portal end to end on FastAPI and Next.js [1], built the NestJS admin portal for an airline voucher platform [2], and ships Azure Functions backends [3].',
      },
      {
        tab: 'Research',
        question: 'What is his research background?',
        sources: [
          { kind: 'Education', title: 'PhD · Sunway University', href: '#education' },
          { kind: 'Project', title: 'Factory6G', href: '#work' },
          { kind: 'Paper', title: 'arXiv:2510.08080', href: '#education' },
        ],
        answer:
          'A PhD in applied AI, in progress [1]. Factory6G compares AI schedulers on one simulated factory radio channel [2]. Four papers, including a 2025 taxonomy of URLLC for 6G [3].',
      },
    ],
  },
  work: {
    num: '01 — Work',
    title: 'Selected work',
    lead: 'Three systems, each told as problem, build and outcome. Company screens are rebuilt from the source with client data blurred.',
    problem: 'Problem',
    built: 'Built',
    outcome: 'Outcome',
    readCase: 'Read the case study →',
    rebuilt: 'Rebuilt from source · client data blurred',
    redrawn: 'Simplified redraw · internal names removed',
    thesis: 'Figure from the thesis',
    layerTags: { ui: 'Interface', api: 'API', agents: 'Agents', retrieval: 'Retrieval', cloud: 'Cloud' },
    cases: {
      'te-ai-portal': {
        meta: 'Takaful Emarat · 2026 – now · Lead engineer',
        problem: 'Underwriting and renewal lived in spreadsheets and email threads.',
        built: 'One Next.js portal with five hosted agents on Azure AI Foundry. Documents are OCR’d and indexed at upload.',
        outcome: 'Answers cite the documents they read. One renewal agent serves staff and the public website.',
        layers: ['ui', 'api', 'agents', 'retrieval', 'cloud'],
      },
      'reimbursement-portal': {
        meta: 'Takaful Emarat · 2026 – now · Owner',
        problem: 'Members and finance needed one place to submit, review and pay claims.',
        built: 'FastAPI backend and Next.js frontend: document upload, OTP, status timelines and a finance console for TPA batches.',
        outcome: 'Every batch is tracked from upload to payment, with overdue ones flagged.',
        layers: ['ui', 'api', 'cloud'],
      },
      mhvoucher: {
        meta: 'Trinity Wizards · Malaysia Airlines · 2025 – 2026',
        problem: 'An airline needed to run vouchers, merchants and campaigns at scale.',
        built: 'Production voucher platform on Node.js and Azure Functions, with a NestJS admin portal.',
        outcome: 'Inventory, redemption, gifting and campaigns run from one admin portal.',
        layers: ['ui', 'api', 'cloud'],
      },
    },
    indexLabel: 'Project index',
    indexTitle: (n) => `${n} projects in total`,
    indexSub: '5 companies, PhD research, and side projects.',
    browse: (n) => `Browse all ${n} →`,
    macApp: 'macOS · Swift',
    brandSite: 'Brand site',
  },
  build: {
    num: '02 — How I build',
    title: 'From the interface to the model.',
    lead: ['One request, five layers. ', 'Blue', ' is full-stack work, ', 'violet', ' is AI work. I’ve shipped every layer.'],
    layers: {
      ui: { name: '01 Interface', title: 'Portals and widgets', tools: 'Next.js · React · Angular · embeddable chat' },
      api: { name: '02 API', title: 'Services', tools: 'FastAPI · NestJS · Node.js · Azure Functions' },
      agents: { name: '03 Agents', title: 'Reasoning', tools: 'Azure AI Foundry · LangChain · guardrails' },
      retrieval: { name: '04 Retrieval', title: 'Grounding', tools: 'AI Search · Milvus · Elasticsearch · OCR' },
      cloud: { name: '05 Data & cloud', title: 'Runs it', tools: 'Azure · AWS · PostgreSQL · Redis · Docker' },
    },
    request: 'request →',
    response: '← answer + citations',
    coverageLabel: 'Where each project sits',
    coverage: {
      'te-ai-portal': 'all five layers',
      'serverless-ai-chatbot': 'chat UI to Lambda and LLM',
      'coolriots-rag': 'FastAPI · LangChain · Milvus',
      bexinsight: 'search API, ~60% faster',
      'reimbursement-portal': 'Next.js · FastAPI|Azure',
      mhvoucher: 'NestJS admin · Node|Azure',
    },
    principles: [
      { title: 'Own it end to end', body: 'From requirements through Azure deployment and handover, for every AI automation I propose.', tone: 'fs' },
      { title: 'Cite or don’t answer', body: 'Agents retrieve real document text and show their sources, so people can check the answer.', tone: 'ai' },
      { title: 'Guardrails before launch', body: 'Masking and consent sit between customers and the model, before anything reaches a live API.', tone: 'ai' },
    ],
  },
  experience: {
    num: '03 — Experience',
    title: 'Experience',
    timelineAria: 'Career timeline from 2020 to 2026 across five companies',
    evolutionLabel: 'How my stack evolved',
    evolutionPath: ['backend', 'full stack', 'AI in production'],
    eras: [
      { when: '2020 · Karisma', title: 'Microservices', tools: [['APIs', 'fs'], ['Streaming', 'fs']] },
      { when: '2021 · Wavelet', title: 'Full stack', tools: [['React', 'fs'], ['Vue', 'fs'], ['PostgreSQL', 'fs']] },
      { when: '2022 · CoolRIOTS', title: 'RAG & search', tools: [['LangChain', 'ai'], ['Milvus', 'ai'], ['FastAPI', 'fs']] },
      { when: '2024 · Trinity', title: 'Cloud at scale', tools: [['Azure Functions', 'fs'], ['NestJS', 'fs'], ['AWS RAG', 'ai']] },
      { when: '2026 · Takaful', title: 'Agents in production', tools: [['AI Foundry', 'ai'], ['OCR', 'ai'], ['Next.js', 'fs']] },
    ],
    chips: [
      ['TE AI Portal', 'Claims Portal', 'TE OCR'],
      ['MHVoucher', 'Journify Middleware', 'InvoiceMS', 'AI Chatbot'],
      ['RAG Platforms', 'BeXInsight'],
      ['Realtime platform'],
      ['Microservice APIs'],
    ],
  },
  skills: {
    num: '04 — Skills',
    title: 'Two disciplines, one engineer.',
    lead: 'Every tool here points to the project where I used it.',
    orbitLabel: 'The toolbelt',
    orbitTitle: ['AI at the core.', 'Full stack all the way around it.'],
    inner: 'Inner ring · AI and retrieval',
    outer: 'Outer ring · interfaces, APIs, data and cloud',
    orbitBody: 'Agents are only as good as the product around them, so I build both: the model calls and the portal, API and database they sit in.',
    aiTitle: 'AI engineering',
    fsTitle: 'Full-stack engineering',
    ai: [
      ['Agents · Azure AI Foundry', 'TE AI Portal'],
      ['RAG · LangChain · Milvus', 'CoolRIOTS RAG'],
      ['Serverless RAG on AWS', 'AI Chatbot'],
      ['Search · Elasticsearch', 'BeXInsight'],
      ['Document AI · OCR', 'TE OCR'],
      ['Deep RL · TensorFlow', 'Factory6G'],
    ],
    fs: [
      ['Next.js · React · TypeScript', 'TE AI Portal, Claims'],
      ['Python · FastAPI', 'Claims Portal'],
      ['Node.js · NestJS', 'MHVoucher'],
      ['Azure Functions', 'Journify, InvoiceMS'],
      ['PostgreSQL · Redis · MongoDB', 'PERN, BeXInsight'],
      ['Swift · macOS', 'Lucent, Vitals'],
    ],
  },
  education: {
    num: '05 — Education & research',
    title: 'Education',
    inProgress: 'in progress',
    researchAreas: 'Research areas',
    areas: [['URLLC & 6G', 'ai'], ['Deep RL scheduling', 'ai'], ['Computer vision', 'ai'], ['VoIP security', 'fs'], ['AI ethics', 'fs']],
  },
  contact: { num: '06 — Contact', title: ['Let’s ship', 'something real.'], lead: 'Email reaches me fastest.' },
  footer: { backToTop: 'Back to top' },
  projects: {
    label: 'Project index',
    title: (n) => `All ${n} projects`,
    lead: 'Every project from five companies, PhD research and side projects. The three with full case studies are on the home page; this is the complete record.',
    distAria: 'Projects per group',
    filterAria: 'Filter projects',
    all: 'All',
    groups: {
      te: { name: 'Takaful Emarat', note: 'Senior AI Engineer · 2026 – now' },
      tw: { name: 'Trinity Wizards', note: 'Malaysia Airlines and AWS work · 2024 – 2026' },
      cr: { name: 'CoolRIOTS', note: 'Senior AI Engineer · 2022 – 2024' },
      ea: { name: 'Earlier roles', note: 'Wavelet Solutions, Karisma System M · 2020 – 2022' },
      rs: { name: 'PhD research', note: 'Sunway University · 2024 – now' },
      pe: { name: 'Personal & open source', note: 'macOS apps, web and GitHub' },
    },
    legend: { ai: 'AI', fs: 'Full stack', app: 'App / research' },
    evidence: {
      caseStudy: 'Case study',
      screen: 'Screen',
      diagram: 'Diagram',
      figures: 'Thesis figures',
      screenshots: 'Screenshots',
      liveSite: 'Live site',
      github: 'GitHub',
    },
    writeUp: 'Write-up',
    home: '← Home',
  },
  project: {
    back: '← All projects',
    role: 'Role',
    when: 'When',
    stack: 'Stack',
    built: 'What I built',
    impact: 'Impact',
    evidence: 'Evidence',
    product: '1 · The product',
    productTitle: 'Ask, with sources',
    productLead: 'Underwriters tick files or saved assessments and ask about them. Each answer shows what it read from.',
    chain: '2 · How an assessment runs',
    chainTitle: 'A chain of specialist agents',
    chainSteps: [
      ['01 Intake', 'Understands the request'],
      ['02 Claims', 'Reviews claims history'],
      ['03 Medical', 'Reads medical findings'],
      ['04 Coding', 'Standardises diagnoses'],
      ['05 Conclude', 'Writes the conclusion'],
      ['06 Report', 'Saves a cited PDF'],
    ],
    chainNote: 'Simplified · internal step names and data sources left out',
    renewal: '3 · Policy renewal',
    renewalTitle: 'One agent, two front doors',
    renewalLead: 'The same renewal agent serves staff in the portal and customers through the website widget, behind masking and consent guardrails.',
    prev: 'Previous',
    next: 'Next project',
    notFound: 'That project isn’t in the portfolio.',
    visit: 'Visit live site',
    github: 'View on GitHub',
  },
  screens: { portal: 'TE AI Portal', internal: 'Internal', sources: 'Sources' },
}

const ar: Copy = {
  nav: [
    { id: 'work', label: 'الأعمال' },
    { id: 'stack', label: 'كيف أبني' },
    { id: 'experience', label: 'الخبرة' },
    { id: 'skills', label: 'المهارات' },
    { id: 'education', label: 'التعليم' },
    { id: 'contact', label: 'تواصل' },
  ],
  askAboutMe: 'اسأل عني',
  cv: 'السيرة الذاتية',
  theme: {
    system: 'النظام',
    light: 'فاتح',
    dark: 'داكن',
    toggle: (current) => `المظهر: ${current}. انقر للتغيير.`,
  },
  hero: {
    chips: ['مهندس ذكاء اصطناعي أول · تكافل الإمارات', 'دبي، الإمارات', 'دكتوراه · ذكاء اصطناعي تطبيقي'],
    lead: 'أبني',
    rotating: ['وكلاء ذكاء اصطناعي', 'أنظمة RAG', 'واجهات وبوابات', 'منتجات كاملة'],
    tail: 'تصمد في بيئة الإنتاج.',
    sub: 'مهندس full-stack لأنظمة الذكاء الاصطناعي: الوكلاء والاسترجاع، مع الواجهات البرمجية والواجهات والسحابة التي تعمل عليها. ست سنوات من التسليم المؤسسي.',
    primary: 'شاهد الأعمال',
    secondary: 'اسأل المعرض',
    proof: [
      { value: '+6 سنوات', label: 'تسليم مؤسسي في 5 شركات' },
      { value: '5 وكلاء', label: 'يعملون على Azure AI Foundry', tone: 'ai' },
      { value: '~60%', label: 'أسرع في البحث، BeXInsight', tone: 'fs' },
      { value: '4 أوراق', label: 'بحث دكتوراه في الذكاء الاصطناعي' },
    ],
    toolsLabel: 'الأدوات التي أستخدمها',
  },
  ask: {
    agent: 'portfolio-agent',
    hint: 'اطرح سؤالاً. كل إجابة تستشهد بهذه الصفحة.',
    examples: 'أسئلة مقترحة',
    question: 'السؤال',
    trace: 'خطوات الوكيل',
    retrieved: 'المصادر',
    answer: 'الإجابة',
    waiting: 'بانتظار الخطة…',
    grounded: '✓ مستندة إلى 3 مصادر',
    disclaimer: 'عرض توضيحي مُعدّ مسبقاً · من محتوى هذه الصفحة',
    steps: [
      { label: 'تخطيط عمليات البحث', meta: () => '3 استعلامات' },
      { label: 'البحث في المعرض', meta: () => '3 نتائج' },
      { label: 'الكتابة مع الاستشهاد', meta: (s) => `${s.answer.length} حرفاً` },
      { label: 'التحقق من كل معلومة', meta: () => 'ناجح' },
    ],
    scenes: [
      {
        tab: 'الذكاء الاصطناعي',
        question: 'ماذا أطلق يحيى بالذكاء الاصطناعي؟',
        sources: [
          { kind: 'مشروع', title: 'TE AI Portal', href: '#work' },
          { kind: 'خبرة', title: 'تكافل الإمارات', href: '#experience' },
          { kind: 'مشروع', title: 'Serverless AI Chatbot', href: '#work' },
        ],
        answer:
          'خمسة وكلاء على Azure AI Foundry للاكتتاب وتجديد الوثائق في تكافل الإمارات [1][2]، ومساعد RAG بلا خوادم على AWS [3]. إجابات البوابة تستشهد بالمستندات التي قرأتها.',
      },
      {
        tab: 'Full stack',
        question: 'هل يستطيع بناء المنتج كاملاً، لا النموذج فقط؟',
        sources: [
          { kind: 'مشروع', title: 'بوابة المطالبات', href: '#work' },
          { kind: 'مشروع', title: 'MHVoucher', href: '#work' },
          { kind: 'مهارات', title: 'Azure Functions', href: '#skills' },
        ],
        answer:
          'نعم. يملك بوابة مطالبات من البداية للنهاية على FastAPI و Next.js [1]، وبنى بوابة إدارة NestJS لمنصة قسائم طيران [2]، ويطلق خدمات خلفية على Azure Functions [3].',
      },
      {
        tab: 'البحث',
        question: 'ما خلفيته البحثية؟',
        sources: [
          { kind: 'تعليم', title: 'دكتوراه · جامعة صنواي', href: '#education' },
          { kind: 'مشروع', title: 'Factory6G', href: '#work' },
          { kind: 'ورقة', title: 'arXiv:2510.08080', href: '#education' },
        ],
        answer:
          'دكتوراه في الذكاء الاصطناعي التطبيقي قيد الإنجاز [1]. يقارن Factory6G بين أنظمة جدولة ذكية على قناة راديو مصنع محاكاة واحدة [2]. أربع أوراق، منها تصنيف URLLC للجيل السادس عام 2025 [3].',
      },
    ],
  },
  work: {
    num: '01 — الأعمال',
    title: 'أعمال مختارة',
    lead: 'ثلاثة أنظمة، كل منها بالمشكلة والبناء والنتيجة. شاشات الشركات أعيد بناؤها من الكود المصدري مع تمويه بيانات العملاء.',
    problem: 'المشكلة',
    built: 'البناء',
    outcome: 'النتيجة',
    readCase: 'اقرأ دراسة الحالة ←',
    rebuilt: 'أعيد بناؤها من المصدر · بيانات العملاء مموّهة',
    redrawn: 'رسم مبسّط · الأسماء الداخلية محذوفة',
    thesis: 'شكل من أطروحة الدكتوراه',
    layerTags: { ui: 'الواجهة', api: 'API', agents: 'الوكلاء', retrieval: 'الاسترجاع', cloud: 'السحابة' },
    cases: {
      'te-ai-portal': {
        meta: 'تكافل الإمارات · 2026 – الآن · المهندس الرئيسي',
        problem: 'كان الاكتتاب والتجديد يعيشان في جداول البيانات وسلاسل البريد.',
        built: 'بوابة Next.js واحدة مع خمسة وكلاء مستضافين على Azure AI Foundry. تُقرأ المستندات بـ OCR وتُفهرس عند الرفع.',
        outcome: 'الإجابات تستشهد بالمستندات التي قرأتها. وكيل تجديد واحد يخدم الموظفين والموقع العام.',
        layers: ['ui', 'api', 'agents', 'retrieval', 'cloud'],
      },
      'reimbursement-portal': {
        meta: 'تكافل الإمارات · 2026 – الآن · المالك',
        problem: 'احتاج الأعضاء والمالية إلى مكان واحد لتقديم المطالبات ومراجعتها ودفعها.',
        built: 'خلفية FastAPI وواجهة Next.js: رفع المستندات، و OTP، ومسار الحالة، ولوحة مالية لدفعات TPA.',
        outcome: 'كل دفعة متتبعة من الرفع حتى الدفع، مع تنبيه للمتأخر منها.',
        layers: ['ui', 'api', 'cloud'],
      },
      mhvoucher: {
        meta: 'Trinity Wizards · الخطوط الماليزية · 2025 – 2026',
        problem: 'احتاجت شركة طيران إلى إدارة القسائم والتجار والحملات على نطاق واسع.',
        built: 'منصة قسائم في الإنتاج على Node.js و Azure Functions، مع بوابة إدارة NestJS.',
        outcome: 'المخزون والاسترداد والإهداء والحملات تُدار من بوابة إدارة واحدة.',
        layers: ['ui', 'api', 'cloud'],
      },
    },
    indexLabel: 'فهرس المشاريع',
    indexTitle: (n) => `${n} مشروعاً إجمالاً`,
    indexSub: '5 شركات، وبحث دكتوراه، ومشاريع جانبية.',
    browse: (n) => `تصفّح كل المشاريع (${n}) ←`,
    macApp: 'macOS · Swift',
    brandSite: 'موقع علامة تجارية',
  },
  build: {
    num: '02 — كيف أبني',
    title: 'من الواجهة إلى النموذج.',
    lead: ['طلب واحد، خمس طبقات. ', 'الأزرق', ' عمل full-stack، و', 'البنفسجي', ' عمل ذكاء اصطناعي. أطلقت في كل طبقة.'],
    layers: {
      ui: { name: '01 الواجهة', title: 'بوابات ومكوّنات', tools: 'Next.js · React · Angular · محادثة مضمّنة' },
      api: { name: '02 API', title: 'الخدمات', tools: 'FastAPI · NestJS · Node.js · Azure Functions' },
      agents: { name: '03 الوكلاء', title: 'الاستدلال', tools: 'Azure AI Foundry · LangChain · ضوابط' },
      retrieval: { name: '04 الاسترجاع', title: 'التأسيس على المصادر', tools: 'AI Search · Milvus · Elasticsearch · OCR' },
      cloud: { name: '05 البيانات والسحابة', title: 'التشغيل', tools: 'Azure · AWS · PostgreSQL · Redis · Docker' },
    },
    request: 'الطلب ←',
    response: '→ الإجابة مع المصادر',
    coverageLabel: 'موقع كل مشروع',
    coverage: {
      'te-ai-portal': 'الطبقات الخمس',
      'serverless-ai-chatbot': 'من واجهة المحادثة إلى Lambda والنموذج',
      'coolriots-rag': 'FastAPI · LangChain · Milvus',
      bexinsight: 'واجهة بحث، أسرع بنحو 60%',
      'reimbursement-portal': 'Next.js · FastAPI|Azure',
      mhvoucher: 'NestJS · Node|Azure',
    },
    principles: [
      { title: 'الملكية من البداية للنهاية', body: 'من المتطلبات حتى النشر على Azure والتسليم، لكل أتمتة ذكاء اصطناعي أقترحها.', tone: 'fs' },
      { title: 'استشهد أو لا تُجب', body: 'يسترجع الوكلاء نص المستندات الفعلي ويعرضون مصادرهم، ليتحقق الناس من الإجابة.', tone: 'ai' },
      { title: 'الضوابط قبل الإطلاق', body: 'الإخفاء والموافقة يقعان بين العملاء والنموذج، قبل أن يصل أي شيء إلى واجهة حية.', tone: 'ai' },
    ],
  },
  experience: {
    num: '03 — الخبرة',
    title: 'الخبرة',
    timelineAria: 'خط زمني مهني من 2020 إلى 2026 في خمس شركات',
    evolutionLabel: 'كيف تطورت أدواتي',
    evolutionPath: ['الخلفية', 'full stack', 'ذكاء اصطناعي في الإنتاج'],
    eras: [
      { when: '2020 · Karisma', title: 'خدمات مصغّرة', tools: [['APIs', 'fs'], ['Streaming', 'fs']] },
      { when: '2021 · Wavelet', title: 'Full stack', tools: [['React', 'fs'], ['Vue', 'fs'], ['PostgreSQL', 'fs']] },
      { when: '2022 · CoolRIOTS', title: 'RAG والبحث', tools: [['LangChain', 'ai'], ['Milvus', 'ai'], ['FastAPI', 'fs']] },
      { when: '2024 · Trinity', title: 'سحابة على نطاق واسع', tools: [['Azure Functions', 'fs'], ['NestJS', 'fs'], ['AWS RAG', 'ai']] },
      { when: '2026 · تكافل', title: 'وكلاء في الإنتاج', tools: [['AI Foundry', 'ai'], ['OCR', 'ai'], ['Next.js', 'fs']] },
    ],
    chips: [
      ['TE AI Portal', 'بوابة المطالبات', 'TE OCR'],
      ['MHVoucher', 'Journify Middleware', 'InvoiceMS', 'AI Chatbot'],
      ['منصات RAG', 'BeXInsight'],
      ['منصة فورية'],
      ['واجهات خدمات مصغّرة'],
    ],
  },
  skills: {
    num: '04 — المهارات',
    title: 'تخصصان، مهندس واحد.',
    lead: 'كل أداة هنا تشير إلى المشروع الذي استخدمتها فيه.',
    orbitLabel: 'صندوق الأدوات',
    orbitTitle: ['الذكاء الاصطناعي في المركز.', 'و full stack من حوله.'],
    inner: 'الحلقة الداخلية · الذكاء الاصطناعي والاسترجاع',
    outer: 'الحلقة الخارجية · الواجهات والـ APIs والبيانات والسحابة',
    orbitBody: 'الوكلاء جيدون بقدر المنتج المحيط بهم، لذا أبني الاثنين: استدعاءات النموذج، والبوابة والـ API وقاعدة البيانات التي تحتضنها.',
    aiTitle: 'هندسة الذكاء الاصطناعي',
    fsTitle: 'هندسة full stack',
    ai: [
      ['وكلاء · Azure AI Foundry', 'TE AI Portal'],
      ['RAG · LangChain · Milvus', 'CoolRIOTS RAG'],
      ['RAG بلا خوادم على AWS', 'AI Chatbot'],
      ['بحث · Elasticsearch', 'BeXInsight'],
      ['ذكاء المستندات · OCR', 'TE OCR'],
      ['تعلم معزز عميق · TensorFlow', 'Factory6G'],
    ],
    fs: [
      ['Next.js · React · TypeScript', 'TE AI Portal، المطالبات'],
      ['Python · FastAPI', 'بوابة المطالبات'],
      ['Node.js · NestJS', 'MHVoucher'],
      ['Azure Functions', 'Journify، InvoiceMS'],
      ['PostgreSQL · Redis · MongoDB', 'PERN، BeXInsight'],
      ['Swift · macOS', 'Lucent، Vitals'],
    ],
  },
  education: {
    num: '05 — التعليم والبحث',
    title: 'التعليم',
    inProgress: 'قيد الإنجاز',
    researchAreas: 'مجالات البحث',
    areas: [['URLLC والجيل السادس', 'ai'], ['جدولة بالتعلم المعزز', 'ai'], ['الرؤية الحاسوبية', 'ai'], ['أمن VoIP', 'fs'], ['أخلاقيات الذكاء الاصطناعي', 'fs']],
  },
  contact: { num: '06 — تواصل', title: ['لنُطلق', 'شيئاً حقيقياً.'], lead: 'البريد الإلكتروني أسرع طريقة للوصول إليّ.' },
  footer: { backToTop: 'العودة للأعلى' },
  projects: {
    label: 'فهرس المشاريع',
    title: (n) => `كل المشاريع (${n})`,
    lead: 'كل مشروع من خمس شركات وبحث الدكتوراه والمشاريع الجانبية. المشاريع الثلاثة ذات دراسات الحالة الكاملة في الصفحة الرئيسية؛ وهذا السجل الكامل.',
    distAria: 'عدد المشاريع لكل مجموعة',
    filterAria: 'تصفية المشاريع',
    all: 'الكل',
    groups: {
      te: { name: 'تكافل الإمارات', note: 'مهندس ذكاء اصطناعي أول · 2026 – الآن' },
      tw: { name: 'Trinity Wizards', note: 'الخطوط الماليزية و AWS · 2024 – 2026' },
      cr: { name: 'CoolRIOTS', note: 'مهندس ذكاء اصطناعي أول · 2022 – 2024' },
      ea: { name: 'أدوار سابقة', note: 'Wavelet Solutions و Karisma System M · 2020 – 2022' },
      rs: { name: 'بحث الدكتوراه', note: 'جامعة صنواي · 2024 – الآن' },
      pe: { name: 'شخصي ومفتوح المصدر', note: 'تطبيقات macOS والويب و GitHub' },
    },
    legend: { ai: 'ذكاء اصطناعي', fs: 'Full stack', app: 'تطبيق / بحث' },
    evidence: {
      caseStudy: 'دراسة حالة',
      screen: 'شاشة',
      diagram: 'مخطط',
      figures: 'أشكال الأطروحة',
      screenshots: 'لقطات شاشة',
      liveSite: 'موقع حي',
      github: 'GitHub',
    },
    writeUp: 'وصف',
    home: '→ الرئيسية',
  },
  project: {
    back: '→ كل المشاريع',
    role: 'الدور',
    when: 'الفترة',
    stack: 'التقنيات',
    built: 'ما بنيته',
    impact: 'الأثر',
    evidence: 'الدليل',
    product: '1 · المنتج',
    productTitle: 'اسأل، مع المصادر',
    productLead: 'يختار المكتتبون الملفات أو التقييمات المحفوظة ويسألون عنها. كل إجابة تعرض ما قرأته.',
    chain: '2 · كيف يجري التقييم',
    chainTitle: 'سلسلة من الوكلاء المتخصصين',
    chainSteps: [
      ['01 الاستلام', 'يفهم الطلب'],
      ['02 المطالبات', 'يراجع سجل المطالبات'],
      ['03 الطبي', 'يقرأ النتائج الطبية'],
      ['04 الترميز', 'يوحّد التشخيصات'],
      ['05 الاستنتاج', 'يكتب الخلاصة'],
      ['06 التقرير', 'يحفظ PDF مع المصادر'],
    ],
    chainNote: 'مبسّط · أسماء الخطوات الداخلية ومصادر البيانات محذوفة',
    renewal: '3 · تجديد الوثائق',
    renewalTitle: 'وكيل واحد، بابان',
    renewalLead: 'وكيل التجديد نفسه يخدم الموظفين في البوابة والعملاء عبر مكوّن الموقع، خلف ضوابط الإخفاء والموافقة.',
    prev: 'السابق',
    next: 'المشروع التالي',
    notFound: 'هذا المشروع غير موجود في المعرض.',
    visit: 'زيارة الموقع',
    github: 'عرض على GitHub',
  },
  screens: { portal: 'TE AI Portal', internal: 'داخلي', sources: 'المصادر' },
}

export const copy: Record<Lang, Copy> = { en, ar }
export type { Scene }
