export const profile = {
  name: 'Yahya Khamayseh',
  role: 'Full-Stack AI Engineer',
  focus: 'Full Stack · AI · Cloud',
  location: 'Dubai, UAE',
  email: 'yahya.s.m.khamayseh@gmail.com',
  github: 'https://github.com/dr-yahya',
  linkedin: 'https://www.linkedin.com/in/yahya-khamayseh-01a4aa1a9/',
  photo: '/yahya.jpg',
  photoAlt: 'Portrait of Yahya Khamayseh',
  /** drop the PDF at public/Yahya-Khamayseh-CV.pdf */
  cvUrl: '/Yahya-Khamayseh-CV.pdf',
  summary:
    'Full-stack engineer who builds AI systems for production — agents, retrieval, APIs, and the cloud they run on. Six years of enterprise delivery, backed by doctoral research in applied AI where reliability under real-world load is studied directly.',
  headline: 'Full-stack engineer, building AI systems in production.',
}

/** Per-route metadata for document title + description. */
export const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Yahya Khamayseh — Full-stack AI engineer',
    description:
      'Full-stack engineer building AI systems for production — agents, retrieval, APIs, and cloud. Six years of enterprise delivery, backed by doctoral research in applied AI.',
  },
  '/about': {
    title: 'About — Yahya Khamayseh',
    description:
      'Production delivery and PhD research, approached as one practice — systems built to hold up, and what makes them reliable studied continuously.',
  },
  '/projects': {
    title: 'Projects — Yahya Khamayseh',
    description:
      'Selected work across enterprise AI, applied research, open source, and earlier delivery. Filter by track or search by client and stack.',
  },
  '/experience': {
    title: 'Experience — Yahya Khamayseh',
    description:
      'Six years across five roles — AI, cloud, and API delivery in the UAE, Singapore, and Malaysia, currently owning an insurance AI portfolio at Takaful Emarat.',
  },
  '/education': {
    title: 'Education — Yahya Khamayseh',
    description:
      'A PhD in computing focused on applied AI, an MSc in computer science, and a BSc in computer engineering — top of the department twice.',
  },
  '/skills': {
    title: 'Skills — Yahya Khamayseh',
    description:
      'Backend and APIs, AI and retrieval, data and cloud, full stack and product — each domain linked to a project where it was applied.',
  },
  '/research': {
    title: 'Research & publications — Yahya Khamayseh',
    description:
      'PhD research on 6G smart-factory reliability and AI-assisted resource management, with published work on URLLC, computer vision, VoIP security, and AI ethics.',
  },
  '/contact': {
    title: 'Contact — Yahya Khamayseh',
    description:
      'Enquiries about full-stack, AI engineering, and research collaborations are welcome. Based in Dubai, UAE; remote work is open.',
  },
}

export const highlights = [
  { label: '6+ years', detail: 'production delivery for enterprise clients', icon: 'years' as const },
  { label: 'AI in production', detail: 'agents, RAG, and evaluation loops', icon: 'ai' as const },
  { label: 'Full stack + cloud', detail: 'APIs, portals, and Azure delivery', icon: 'spark' as const },
  { label: 'PhD-backed', detail: 'doctoral research in applied AI', icon: 'research' as const },
]

/** Toolbelt shown as a mono ticker under the hero copy. */
export const heroStack = [
  'Python',
  'FastAPI',
  'Node.js',
  'NestJS',
  'Next.js',
  'React',
  'Azure',
  'Azure AI Foundry',
  'LangChain',
  'RAG',
  'PostgreSQL',
  'Milvus',
  'Docker',
  'TensorFlow',
]

/** Distinct from `highlights` — used only on the About page so the two pages don't echo each other. */
export const aboutStats = [
  { label: '6 years', detail: 'production delivery across three countries', icon: 'years' as const },
  { label: 'AI-first', detail: 'agents, RAG, and evaluation in real products', icon: 'ai' as const },
  { label: 'PhD-backed', detail: 'doctoral research in applied AI, in progress', icon: 'research' as const },
  { label: '1st in department', detail: 'top of the cohort, BSc and MSc', icon: 'education' as const },
]

export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education', href: '/education' },
  { label: 'Skills', href: '/skills' },
  { label: 'Research', href: '/research' },
  { label: 'Contact', href: '/contact' },
]

export type MockKind =
  | 'factory6g'
  | 'psa'
  | 'reimbursement'
  | 'mhvoucher'
  | 'ai-search'
  | 'albert'
  | 'trinity'
  | 'wavelet'
  | 'karisma'
  | 'chatbot'
  | 'middleware'
  | 'cms'
  | 'dashboard'
  | 'plate'
  | 'game'
  | 'booking'
  | 'api'
  | 'portfolio'
  | 'weather'
  | 'dating'

export type IconName =
  | 'api'
  | 'cloud'
  | 'ai'
  | 'database'
  | 'code'
  | 'security'
  | 'docker'
  | 'react'
  | 'python'
  | 'search'
  | 'chip'
  | 'network'
  | 'years'
  | 'research'
  | 'location'
  | 'spark'
  | 'work'
  | 'skills'
  | 'experience'
  | 'paper'
  | 'mail'
  | 'education'

export type ProjectCategory =
  | 'industry'
  | 'research'
  | 'github'
  | 'personal'
  | 'earlier'

export type Project = {
  slug: string
  title: string
  tag: string
  /** what I did on this project, in a few words */
  role: string
  /** when it happened */
  period: string
  /** one-line summary for cards */
  blurb: string
  /** 2–3 sentence context for the detail page */
  overview: string
  /** what was built, in specifics */
  details: string[]
  /** outcomes and results */
  impact: string[]
  stack: string[]
  href: string | null
  mock: MockKind
  /** featured = full media cards; more = compact grid */
  tier: 'featured' | 'more'
  category: ProjectCategory
}

/** Ordered by career importance — flagship AI/PhD work first, then enterprise platforms, then open-source and earlier work. */
export const projects: Project[] = [
  {
    slug: 'te-ai-portal',
    title: 'TE AI Portal',
    tag: 'Takaful Emarat · Agentic AI',
    role: 'Lead engineer, AI portal & agents',
    period: '2026 – Present',
    blurb:
      'A multi-project AI workspace for underwriting and policy renewal, backed by five hosted Azure AI Foundry agents.',
    overview:
      'TE AI Portal is Takaful Emarat\u2019s internal AI workspace — a Next.js 15 app covering underwriting (Files → Generate → Ask → Reports) and Policy Renewal, which also ships as a public website chat widget. Five code-first agents run as hosted services on Azure AI Foundry: individual and group underwriting generate/ask, plus policy renewal.',
    details: [
      'Next.js 15 / React 19 portal on Azure SQL (Prisma), Blob Storage, Document Intelligence OCR, and Azure AI Search indexing at upload.',
      'Five hosted Agent Framework services on Azure AI Foundry: individual/group underwriting generate, individual/group Ask, and policy-renewal generate.',
      'Policy Renewal ships twice — an internal staff chat and a public `/widget.js` + `/embed` widget gated by a site key.',
      'Admin surface for RBAC, department/TPA mappings, usage tracking, and knowledge-base sync status.',
    ],
    impact: [
      'Consolidated underwriting and renewal into one portal instead of scattered spreadsheets and email threads.',
      'OCR and Search indexing at upload let the Generate and Ask agents retrieve real document text instead of re-reading PDFs.',
      'The same renewal agent now serves both internal staff and the public website through one widget.',
    ],
    stack: ['Next.js 15', 'Azure AI Foundry', 'Prisma', 'Azure SQL'],
    href: null,
    mock: 'psa',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'mhvoucher',
    title: 'MHVoucher Platform',
    tag: 'Malaysia Airlines',
    role: 'Platform engineer',
    period: '2025 – 2026',
    blurb:
      'A production voucher platform for inventory, redemption, gifting, and campaigns, with a NestJS admin portal.',
    overview:
      'MHVoucher is the system Malaysia Airlines\u2019 operations team uses to run voucher inventory, redemption, gifting, and campaigns end to end. Alongside the customer-facing APIs, I built the admin portal that support staff rely on daily — so reliability and auditability mattered as much as raw feature delivery.',
    details: [
      'Node.js / Azure Functions APIs for catalogue, wishlist, redemption, and operational reporting.',
      'Admin Service Portal with RBAC, audit logging, and merchant support-role permissions.',
      'SQL tuning and indexing strategy to keep high-traffic queries fast.',
      'Dynamic error handling and redemption-failure notifications.',
    ],
    impact: [
      'RBAC and audit logging gave support teams safe, traceable admin access.',
      'Indexing and query tuning reduced slow-query incidents in production.',
      'Automated failure notifications cut down manual redemption troubleshooting.',
    ],
    stack: ['Node.js', 'Azure Functions', 'NestJS', 'SQL'],
    href: null,
    mock: 'mhvoucher',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'journify-middleware',
    title: 'Journify Middleware',
    tag: 'Malaysia Airlines · Azure',
    role: 'Platform engineer',
    period: '2024 – 2026',
    blurb:
      'The Azure Functions backbone behind Malaysia Airlines\u2019 travel content platform.',
    overview:
      'Journify Middleware routes planner, itinerary, permissions, and destination content for Malaysia Airlines\u2019 travel platform. Across 230+ commits, the work shifted from feature delivery to keeping a live, growing platform stable and current.',
    details: [
      'Planner APIs for plans, places, permissions, and destinations with filtering, sorting, and pagination.',
      'Event-driven processing using Azure Storage Queue and queue-triggered functions.',
      'Multi-user collaboration workflows, including Tripmate permissions and state transitions.',
      'Platform upgrades to Node.js 20 and Azure Functions v4.',
    ],
    impact: [
      '230+ commits kept a live travel platform stable through sustained growth.',
      'Event-driven queue processing removed synchronous bottlenecks.',
      'The Node.js 20 / Functions v4 upgrade reduced platform risk going forward.',
    ],
    stack: ['Azure Functions', 'Node.js', 'Queues', 'Redis'],
    href: null,
    mock: 'middleware',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'reimbursement-portal',
    title: 'Public Reimbursement Portal',
    tag: 'Takaful Emarat · Full Stack',
    role: 'Full-stack engineer',
    period: '2026 – Present',
    blurb:
      'A self-serve claims portal with document upload, OTP verification, and status timelines, paired with an internal ops console.',
    overview:
      'This portal gives Takaful Emarat members a self-serve path to submit and track insurance claims, while giving the internal operations team the batch and export tooling they need to process them at volume. I owned the experience end to end — from cloud architecture through UI.',
    details: [
      'Member-facing flows for claim submission, document upload, and status timelines.',
      'OTP-based lookup so members can check claim status without an account.',
      'Internal tools for claims review, PO batch handling, and Excel export.',
      'Cloud architecture and UI delivered end-to-end for UAE insurance operations.',
    ],
    impact: [
      'Public claim submission moved from manual intake to a self-serve online flow.',
      'Batch processing and Excel export sped up back-office reconciliation.',
      'One architecture served both the public portal and the internal ops console.',
    ],
    stack: ['Full stack', 'Azure', 'Claims ops', 'UI/UX'],
    href: null,
    mock: 'reimbursement',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'coolriots-rag',
    title: 'CoolRIOTS RAG Platforms',
    tag: 'CoolRIOTS · RAG',
    role: 'Lead engineer',
    period: '2022 – 2024',
    blurb:
      'Retrieval and chatbot backends that turned AI prototypes into measurable, production-grade systems.',
    overview:
      'For CoolRIOTS, I led the retrieval and chatbot infrastructure that took AI experiments out of notebooks and into production — grounding LLM answers in real documents instead of open-ended generation, and integrating government-grade identity verification along the way.',
    details: [
      'RAG stacks built on Python, FastAPI, LangChain, OpenAI, and Milvus / ChromaDB, backed by IBM Object Storage.',
      'Secure Singapore MyInfo integration with multi-layer authentication.',
      'Agentic retrieval flows with Facebook and Google integrations for user interaction.',
      'Consistent cross-service data exchange across the retrieval pipeline.',
    ],
    impact: [
      'Semantic search replaced keyword-only retrieval across the platform.',
      'The MyInfo integration added a secure, government-grade identity layer.',
      'Retrieval quality became something the team could measure, not just eyeball.',
    ],
    stack: ['FastAPI', 'LangChain', 'Milvus', 'OpenAI'],
    href: null,
    mock: 'ai-search',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'factory6g',
    title: 'Factory6G',
    tag: 'Doctoral research · applied AI',
    role: 'Lead researcher & developer',
    period: 'Jan 2024 – Present',
    blurb:
      'The doctoral research platform — a Docker-first environment for testing AI-assisted scheduling and reliability under simulated load.',
    overview:
      'Factory6G is the platform behind the PhD track — a reproducible environment for testing how AI-assisted scheduling and estimation hold up under strict reliability and latency budgets. It is built to move straight from experiment to publication, and it sits alongside the engineering work rather than competing with it.',
    details: [
      'Monte Carlo sweeps comparing estimators and resource managers in Sionna and TensorFlow.',
      'Reproducible experiment pipelines with checkpointing and metric aggregation.',
      'Cross-layer analysis of latency, reliability, and scheduling for time-critical scenarios.',
      'Plotting and reporting tooling built for direct reuse in papers.',
    ],
    impact: [
      'Produced comparable results across multiple estimators and schedulers.',
      'Reproducible pipelines now underpin every new experiment, not just the first one.',
      'Findings feed directly into the URLLC for Industry 5.0 taxonomy paper.',
    ],
    stack: ['Python', 'TensorFlow', 'Sionna', 'Docker'],
    href: 'https://github.com/dr-yahya/Factory6G',
    mock: 'factory6g',
    tier: 'featured',
    category: 'research',
  },
  {
    slug: 'bexinsight',
    title: 'BeXInsight Global Search',
    tag: 'CoolRIOTS · Search API',
    role: 'Lead engineer',
    period: '2022 – 2024',
    blurb:
      'A multi-tenant global search API that cut query latency by roughly 60% through indexing and query optimisation.',
    overview:
      'BeXInsight is the multi-tenant search API I led for CoolRIOTS — designed to keep every tenant\u2019s data strictly isolated while still returning fast, ranked results at scale. The performance work here became the business case for further platform investment.',
    details: [
      'Elasticsearch, Redis, and MongoDB powering tenant-isolated search at scale.',
      'API design, indexing strategy, and latency benchmarking led end to end.',
      'Query-plan tuning to eliminate the slowest paths first.',
    ],
    impact: [
      'Roughly 60% lower query latency after indexing and query-plan work.',
      'Multi-tenant isolation held up under real production load.',
      'Benchmarks gave the business a measurable case for scaling the platform further.',
    ],
    stack: ['Elasticsearch', 'Redis', 'MongoDB', 'Node.js'],
    href: null,
    mock: 'ai-search',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'serverless-ai-chatbot',
    title: 'Serverless AI Chatbot',
    tag: 'AI Engineering · AWS RAG',
    role: 'Contributor, AI systems',
    period: 'Early 2026',
    blurb:
      'A serverless, Lambda-based RAG assistant with WhatsApp Business messaging and conversation memory.',
    overview:
      'This work combined proof-of-concept exploration with production hardening for a serverless chatbot — a retrieval-augmented assistant running on AWS Lambda, reachable through WhatsApp Business, with enough conversation memory to hold a real support thread.',
    details: [
      'AWS Lambda, API Gateway WebSocket, DynamoDB, SQS, S3, CloudFront, and Cognito.',
      'Conversation summarisation and dynamic prompt management.',
      'WhatsApp Business messaging integration and scope detection.',
      'Inference workflow fixes for normalisation and suggestion pipelines.',
    ],
    impact: [
      'Conversation summarisation cut repeated context in long support threads.',
      'WhatsApp Business integration extended reach beyond a web widget.',
      'Inference fixes improved normalisation and suggestion accuracy in production.',
    ],
    stack: ['AWS Lambda', 'RAG', 'DynamoDB', 'WebSocket'],
    href: null,
    mock: 'chatbot',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'invoice-ms',
    title: 'InvoiceMS Backend',
    tag: 'Malaysia Airlines · Azure Functions',
    role: 'Platform engineer',
    period: 'Early 2026',
    blurb:
      '19 Azure Functions running invoice creation, admin reporting, and e-invoice exports for airline operations.',
    overview:
      'InvoiceMS is the Azure Functions v4 backend behind Malaysia Airlines\u2019 invoicing — creating invoices, giving admins searchable invoice lists and detail views, and generating the CSV, Excel, and e-invoice reports finance depends on.',
    details: [
      '19 functions (12 HTTP triggers, 7 timer triggers) migrated onto the Azure Functions Programming Model v4.',
      'Invoice creation, admin invoice list/detail views, and transaction-completion handling.',
      'Daily and weekly Excel report generation, CSV export, and e-invoice CSV generation for compliance.',
      'Automated report and error-notification emails, including MHVoucher catalogue and transaction reports.',
    ],
    impact: [
      'Legacy v3 functions migrated to v4 without breaking existing routes, methods, or schedules.',
      'Finance and admin teams got searchable invoice views instead of manual spreadsheet lookups.',
      'E-invoice CSV export kept the platform aligned with compliance reporting requirements.',
    ],
    stack: ['Azure Functions', 'Node.js', 'Prisma', 'Excel/CSV'],
    href: null,
    mock: 'dashboard',
    tier: 'more',
    category: 'industry',
  },
  {
    slug: 'vehicles-plate-detection',
    title: 'Vehicles Plate Detection',
    tag: 'GitHub · Computer Vision',
    role: 'Independent developer',
    period: '2024',
    blurb:
      'A YOLOv8-based vehicle license-plate detection pipeline built for real-world imagery.',
    overview:
      'A computer-vision project applying YOLOv8 detection to vehicle license plates — the same detection approach behind my published CCTV armed-robbery-detection research, applied here to a different, self-contained problem.',
    details: [
      'End-to-end detection pipeline from raw imagery to plate localisation.',
      'Model evaluation aligned with the CCTV / YOLOv8 publication methodology.',
    ],
    impact: [
      'A working detection pipeline published as a reproducible public repository.',
    ],
    stack: ['Python', 'YOLOv8', 'CV', 'Detection'],
    href: 'https://github.com/dr-yahya/Vehicles-plate-detection-app',
    mock: 'plate',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'albert-roi',
    title: 'Albert Roi',
    tag: 'Brand · Live site',
    role: 'Designer & developer',
    period: '2023',
    blurb:
      'A luxury perfume brand\u2019s landing experience, reached by scanning a QR code on the product packaging.',
    overview:
      'Albert Roi is a small brand project taken from concept to a live, custom-domain site — product storytelling for masculine and feminine variants, designed to be discovered through packaging rather than search.',
    details: [
      'Product storytelling for masculine and feminine variants.',
      'Packaging-ready QR and EAN assets coordinated with the digital brand surface.',
      'Static site published on a custom domain via GitHub Pages.',
    ],
    impact: [
      'Print packaging and the digital brand experience shipped as one coordinated system.',
    ],
    stack: ['HTML', 'CSS', 'GitHub Pages'],
    href: 'https://albert-roi.com/',
    mock: 'albert',
    tier: 'more',
    category: 'personal',
  },
  {
    slug: 'alinaworld',
    title: 'AlinaWorld',
    tag: 'Personal · macOS Game',
    role: 'Solo developer',
    period: '2024',
    blurb:
      'A native macOS 2D platformer — 27 missions across nine worlds, built solo in Swift and SpriteKit.',
    overview:
      'AlinaWorld is a full platformer built alone, end to end — from mission design to hand-tuned movement physics — as a native macOS app, not a web wrapper.',
    details: [
      'Custom physics feel: acceleration, sprint, variable jump, and stomp attacks.',
      'Mission map, fullscreen toggle, and keyboard-first controls for macOS 13+.',
      'Packaged as a native .app via Swift Package Manager build scripts.',
    ],
    impact: [
      'Movement mechanics tuned by feel rather than framework defaults.',
      'Packaged as a distributable native application, not just a prototype.',
    ],
    stack: ['Swift', 'SpriteKit', 'macOS'],
    href: null,
    mock: 'game',
    tier: 'more',
    category: 'personal',
  },
  {
    slug: 'claims-summary-ai',
    title: 'Claims Summary AI',
    tag: 'Takaful Emarat · LLM',
    role: 'Contributor, AI services',
    period: '2026 – Present',
    blurb:
      'An LLM service that turns raw claim data into readable narrative summaries with PDF output.',
    overview:
      'Claims Summary AI is a supporting service inside the Takaful Emarat AI programme — it takes structured claim data and produces narrative summaries reviewers can read in seconds, rendered straight to PDF for existing workflows.',
    details: [
      'Narrative generation pipeline paired with the TE AI Portal programme.',
      'PDF output built for direct use in operational and underwriting review paths.',
      'Part of a broader AI incubation portfolio covering renewal, claims, and underwriting.',
    ],
    impact: [
      'Narrative summaries replaced manual write-ups for reviewers.',
      'PDF rendering slotted the output straight into existing operational workflows.',
    ],
    stack: ['LLM', 'PDF', 'Azure', 'FastAPI'],
    href: null,
    mock: 'chatbot',
    tier: 'more',
    category: 'industry',
  },
  {
    slug: 'te-ocr-backend',
    title: 'TE OCR Backend',
    tag: 'Takaful Emarat · OCR',
    role: 'Backend engineer',
    period: '2026 – Present',
    blurb:
      'A backend OCR service extracting text from documents across the B2B and B2C customer journeys.',
    overview:
      'This service handles OCR extraction for Takaful Emarat\u2019s customer-facing document flows — turning uploaded scans and forms into structured text that downstream claims and underwriting services can use.',
    details: [
      'Backend APIs dedicated to OCR extraction for B2B and B2C document journeys.',
      'Feeds structured text into downstream claims and underwriting workflows.',
    ],
    impact: [
      'Removed manual data entry from document-heavy customer journeys.',
    ],
    stack: ['Python', 'OCR', 'Azure'],
    href: null,
    mock: 'api',
    tier: 'more',
    category: 'industry',
  },
  {
    slug: 'pern-analytics',
    title: 'PERN Analytics Dashboard',
    tag: 'CoolRIOTS · Analytics',
    role: 'Full-stack engineer',
    period: '2023 – 2024',
    blurb:
      'A PostgreSQL, Express, React, and Node dashboard built for roughly 25% faster data visualisation.',
    overview:
      'This analytics dashboard for CoolRIOTS pairs a tuned PostgreSQL schema with a React frontend built to handle denser operational charts without slowing down — the kind of full-stack work that sits quietly behind a team\u2019s daily reporting.',
    details: [
      'SQL schema design and backend aggregation for responsive reporting.',
      'React frontend tuned for denser operational charts and filters.',
    ],
    impact: [
      'Roughly 25% faster data visualisation through backend aggregation.',
      'Schema design supported denser charts without slowing queries.',
    ],
    stack: ['PostgreSQL', 'Express', 'React', 'Node.js'],
    href: null,
    mock: 'dashboard',
    tier: 'more',
    category: 'industry',
  },
  {
    slug: 'journify-cms',
    title: 'Journify CMS',
    tag: 'Malaysia Airlines · Laravel',
    role: 'Contributor',
    period: '2024 – 2025',
    blurb:
      'Laravel CMS enhancements for itinerary, article, and destination-based travel content.',
    overview:
      'Running alongside the middleware, this Laravel CMS is where Malaysia Airlines\u2019 travel content team manages itineraries, articles, and destination pages. My work kept new features shipping without destabilising existing content flows.',
    details: [
      'Destination-aware features, migrations, and category-based APIs.',
      'Plan lifecycle consistency fixes and production UI/UX repairs.',
      'Coordinated releases alongside the Journify Middleware team.',
    ],
    impact: [
      'New destination-aware features shipped without breaking existing content flows.',
      'Lifecycle and data-handling fixes reduced recurring production UI issues.',
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'CMS'],
    href: null,
    mock: 'cms',
    tier: 'more',
    category: 'earlier',
  },
  {
    slug: 'magento-continuity',
    title: 'Magento Platform Continuity',
    tag: 'Journify · Magento 2',
    role: 'Contributor',
    period: '2024 – 2025',
    blurb:
      'Continuity engineering on a Magento 2 backend — search sync, webhooks, and catalog stability.',
    overview:
      'As newer services took priority elsewhere, this Magento 2 backend still needed to stay production-safe. Across 212+ commits, the work centred on keeping search synchronisation, webhooks, and SEO automation reliable rather than adding new surface area.',
    details: [
      'Search synchronisation (GlobalSearchSync) and webhook integrations.',
      'SEO automation and reporting workflows.',
      'Root-cause fixes on production-critical catalog and order paths.',
    ],
    impact: [
      '212+ commits kept a legacy e-commerce backend production-safe.',
      'Root-cause fixes resolved recurring catalog and order issues.',
    ],
    stack: ['Magento 2', 'PHP', 'Webhooks', 'SEO'],
    href: null,
    mock: 'cms',
    tier: 'more',
    category: 'earlier',
  },
  {
    slug: 'wavelet-realtime',
    title: 'Wavelet Realtime Platform',
    tag: 'Wavelet Solutions',
    role: 'Full-stack engineer',
    period: 'Sep 2021 – Aug 2022',
    blurb:
      'A full-stack realtime communication product with 50+ REST APIs and multi-channel messaging.',
    overview:
      'At Wavelet Solutions I built React and Vue features for a real-time communication product, backed by a large, well-tested Node.js API layer that connected to Telegram, WhatsApp, and Facebook.',
    details: [
      'React.js and Vue.js features for real-time communication environments.',
      '50+ REST APIs in Node.js / Express with Telegram, WhatsApp/Twilio, and Facebook integrations.',
      'PostgreSQL schema design with automated Azure CI/CD.',
    ],
    impact: [
      '50+ REST APIs integrated Telegram, WhatsApp, and Facebook messaging.',
      '~90% test coverage kept releases predictable.',
    ],
    stack: ['React', 'Vue', 'Node.js', 'PostgreSQL'],
    href: null,
    mock: 'wavelet',
    tier: 'more',
    category: 'earlier',
  },
  {
    slug: 'karisma-apis',
    title: 'Karisma Microservice APIs',
    tag: 'Karisma System M',
    role: 'Backend engineer',
    period: 'Jul 2020 – Aug 2021',
    blurb:
      '30+ microservice APIs for CRUD, file processing, and real-time streaming in a regulated environment.',
    overview:
      'My first professional backend role — building microservice APIs where reliability and secure data handling mattered as much as feature delivery, and where the fundamentals for later cloud and AI work were laid down.',
    details: [
      '30+ microservice APIs for CRUD, file processing, and real-time streaming.',
      'Backend optimisation work targeting image-processing performance.',
      'Production troubleshooting with a strong emphasis on security.',
    ],
    impact: [
      '~40% faster image processing after backend optimisation.',
      '30+ microservice APIs shipped into production.',
    ],
    stack: ['Microservices', 'APIs', 'Streaming', 'Security'],
    href: null,
    mock: 'karisma',
    tier: 'more',
    category: 'earlier',
  },
  {
    slug: 'appointment-booking',
    title: 'Multi-Tenant Appointment Booking',
    tag: 'GitHub · Full Stack',
    role: 'Independent developer',
    period: '2023',
    blurb:
      'An open-source scheduling system exploring tenant isolation for bookings and calendars.',
    overview:
      'A public exploration of multi-tenant scheduling architecture — how to keep bookings, calendars, and availability cleanly isolated across tenants without duplicating infrastructure per client.',
    details: [
      'Tenant isolation patterns for bookings, calendars, and availability.',
      'Published as a reusable public reference architecture.',
    ],
    impact: ['A reusable scheduling architecture published for other developers.'],
    stack: ['Full stack', 'Multi-tenant', 'APIs'],
    href: 'https://github.com/dr-yahya/Multi-Tenant-Appointment-Booking-System',
    mock: 'booking',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'arrivo-backend',
    title: 'Arrivo Backend',
    tag: 'GitHub · Backend',
    role: 'Independent developer',
    period: '2022',
    blurb:
      'A standalone backend service repository built around API and server-side product logic.',
    overview:
      'A backend-focused product experiment — API design and server-side logic developed independently of client work, published as a reference implementation.',
    details: ['Public backend codebase for product/API experimentation.'],
    impact: ['A working backend reference published on GitHub.'],
    stack: ['Backend', 'APIs'],
    href: 'https://github.com/dr-yahya/arrivo-backend',
    mock: 'api',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'iaas',
    title: 'IAAS',
    tag: 'GitHub · Infrastructure',
    role: 'Independent developer',
    period: '2022',
    blurb:
      'An infrastructure-as-a-service exploration into cloud provisioning concepts.',
    overview:
      'A self-directed dive into infrastructure-as-a-service patterns — provisioning primitives and platform concepts explored outside of client deadlines.',
    details: ['Infrastructure and platform experimentation, published publicly.'],
    impact: ['Documented exploration of IaaS provisioning concepts.'],
    stack: ['Cloud', 'IaaS'],
    href: 'https://github.com/dr-yahya/IAAS',
    mock: 'middleware',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'freelancer-portfolio',
    title: 'Freelancer Team Portfolio',
    tag: 'GitHub · Portfolio',
    role: 'Developer',
    period: '2021',
    blurb:
      'A marketing site built to showcase a freelancer collective\u2019s shared work and capabilities.',
    overview:
      'A front-end build for a small freelancer team — a shared shop window for their collective portfolio and services, aimed at prospective clients.',
    details: ['Public marketing front end for a freelancer team.'],
    impact: ['A shared portfolio published for a freelancer collective.'],
    stack: ['HTML', 'CSS', 'Portfolio'],
    href: 'https://github.com/dr-yahya/freelancer-team-portifolio',
    mock: 'portfolio',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'dating-app',
    title: 'Dating App',
    tag: 'GitHub · Product',
    role: 'Independent developer',
    period: '2021',
    blurb:
      'An early product experiment exploring dating-app flows and matching surfaces.',
    overview:
      'One of my earlier full-stack product experiments — working through matching, profile, and discovery flows as a way to learn product-level thinking, not just API design.',
    details: ['Public GitHub project from earlier product/learning work.'],
    impact: ['Early hands-on exploration of matching and profile UX.'],
    stack: ['Mobile/Web', 'Product'],
    href: 'https://github.com/dr-yahya/Dating-APP',
    mock: 'dating',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'weather-app',
    title: 'WeatherApp',
    tag: 'GitHub · App',
    role: 'Independent developer',
    period: '2020',
    blurb:
      'A small, API-driven weather application built as a focused learning project.',
    overview:
      'A compact weather app — fetching and presenting forecast data through a simple client UI, built early on to practice consuming third-party APIs cleanly.',
    details: ['API-driven UI built end-to-end as a learning project.'],
    impact: ['A complete, working API integration shipped from scratch.'],
    stack: ['API', 'UI'],
    href: 'https://github.com/dr-yahya/WeatherApp',
    mock: 'weather',
    tier: 'more',
    category: 'github',
  },
]

export const featuredProjects = projects.filter((p) => p.tier === 'featured')

export const projectCategories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'industry', label: 'Industry AI' },
  { id: 'research', label: 'Research' },
  { id: 'github', label: 'GitHub' },
  { id: 'personal', label: 'Personal' },
  { id: 'earlier', label: 'Earlier work' },
]

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug)
  if (index < 0) return { prev: null, next: null }
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}

export const aboutEssay = {
  kicker: 'About',
  title: 'How the work is done',
  lede:
    'The main work is full-stack engineering for AI products — agents, retrieval, APIs, and the cloud that runs them. A doctoral research track runs alongside it, where the same question is studied more slowly: what actually makes a system reliable under load.',
  sections: [
    {
      id: 'who',
      title: 'The practice',
      paragraphs: [
        'APIs, cloud services, admin portals, and agentic AI systems are built for enterprise clients day to day. AI is treated as a product surface with the same rigour as any other: inputs are validated, behaviour is evaluated, and failure modes are handled rather than hoped away.',
        'A PhD in computing is also being pursued part-time, focused on applied AI and ML for reliable networked systems. It is not a second career competing for attention — it is where reliability under pressure is reasoned about without a delivery deadline, and those conclusions are carried back into the engineering work.',
      ],
    },
    {
      id: 'career',
      title: 'What has been shipped',
      paragraphs: [
        'In industry, an agentic insurance-renewal platform for Takaful Emarat, airline voucher systems for Malaysia Airlines, retrieval and multi-tenant search platforms for CoolRIOTS, Azure middleware for travel content, and claims-operations portals have been led or contributed to. The same instinct is applied throughout: service boundaries are drawn clearly, inputs are validated aggressively, and AI features are made measurable rather than magical.',
        'The research side is Factory6G — a Docker-first platform where AI-assisted scheduling and reliability are tested under simulated load, and the source of published work on applied AI, computer vision, and systems security. It informs the engineering; it is not the headline.',
        'Taken together, one pattern is held: cloud-native runtimes are preferred, validation is treated as non-negotiable, AI is expected to survive contact with real data, and the work is documented clearly enough to be picked up by someone else.',
      ],
    },
    {
      id: 'place',
      title: 'Based in Dubai',
      paragraphs: [
        'Dubai, UAE is the base, and remote collaboration is welcomed. Clients in the UAE, Malaysia, and Singapore have been served, including regulated insurance and airline environments where the details are not allowed to slip.',
      ],
    },
    {
      id: 'working',
      title: 'Where the fit is strongest',
      paragraphs: [
        'The strongest work is produced on briefs where backend depth and AI product sense are both required — agents with real tool gateways, RAG systems that are evaluated rather than assumed, APIs that stay fast under load, and the judgment to tell a demo apart from something that will hold.',
        'If any of that matches what is being built, or a role or platform is worth discussing, the contact page is the fastest way to get in touch.',
      ],
    },
  ],
}

export type SkillItem = {
  label: string
  icon: IconName
  /** self-rated proficiency, 1–5 */
  level: number
}

export type SkillGroup = {
  title: string
  icon: IconName
  description: string
  relatedProjectSlug?: string
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend & APIs',
    icon: 'api',
    description:
      'The default toolkit for shipping reliable services — from FastAPI agents to NestJS admin portals.',
    relatedProjectSlug: 'te-ai-portal',
    items: [
      { label: 'Python / FastAPI / Flask', icon: 'python', level: 5 },
      { label: 'Node.js / Express / NestJS', icon: 'code', level: 5 },
      { label: 'Azure Functions & REST APIs', icon: 'cloud', level: 5 },
      { label: 'Microservices & webhooks', icon: 'network', level: 4 },
    ],
  },
  {
    title: 'AI & Retrieval',
    icon: 'ai',
    description:
      'Turning LLMs into dependable product features rather than demos — retrieval, tools, and evaluation loops.',
    relatedProjectSlug: 'coolriots-rag',
    items: [
      { label: 'Agentic AI / RAG systems', icon: 'spark', level: 5 },
      { label: 'LangChain / OpenAI / Azure AI Foundry', icon: 'ai', level: 4 },
      { label: 'Milvus / ChromaDB / Elasticsearch', icon: 'search', level: 4 },
      { label: 'Prompt engineering & evaluation', icon: 'chip', level: 4 },
    ],
  },
  {
    title: 'Data & Cloud',
    icon: 'cloud',
    description:
      'Data that stays fast under load, and cloud infrastructure that does not page anyone at 3am.',
    relatedProjectSlug: 'bexinsight',
    items: [
      { label: 'PostgreSQL / MongoDB / Redis', icon: 'database', level: 5 },
      { label: 'Container Apps / APIM / Queues', icon: 'cloud', level: 4 },
      { label: 'Docker & CI/CD pipelines', icon: 'docker', level: 4 },
      { label: 'Schema design & query tuning', icon: 'database', level: 5 },
    ],
  },
  {
    title: 'Full Stack & Product',
    icon: 'react',
    description:
      'The product surface AI ships on — portals, embeddable widgets, and the access control operators rely on.',
    relatedProjectSlug: 'reimbursement-portal',
    items: [
      { label: 'React / Next.js / TypeScript', icon: 'react', level: 4 },
      { label: 'Admin portals & embeddable widgets', icon: 'code', level: 4 },
      { label: 'RBAC / SSO / audit patterns', icon: 'security', level: 4 },
      { label: 'API design & integration', icon: 'api', level: 5 },
    ],
  },
]

/** Secondary — the research toolkit, shown small and clearly separate from the engineering stack. */
export const researchToolkit = {
  title: 'Research toolkit',
  description:
    'Used in the doctoral track, not day-to-day delivery. Full detail lives on the research page.',
  items: [
    'Python simulation pipelines',
    'TensorFlow / Sionna',
    'YOLOv8 / computer vision',
    'Monte Carlo experiment automation',
  ],
}

export type Engagement = {
  label: string
  kind: string
  points: string[]
}

export type Experience = {
  company: string
  role: string
  period: string
  place: string
  focus: string
  summary: string
  engagements?: Engagement[]
  highlights?: string[]
  stack: string[]
  mock: MockKind
}

export const experience: Experience[] = [
  {
    company: 'Takaful Emarat',
    role: 'Senior AI Engineer',
    period: 'Jun 2026 — Present',
    place: 'Dubai, UAE',
    focus: 'Agentic AI · Azure · Insurance',
    summary:
      'Owns continuous delivery of the company AI and automation portfolio on Azure — underwriting and renewal agents, the reimbursement claims portal, and document intelligence.',
    highlights: [
      'Owns the TE AI Portal — Individual Underwriting, Group Underwriting, and Policy Renewal — building and operating agents on Azure AI Foundry.',
      'Owns the Reimbursement Claims Portal end to end: a FastAPI backend and Next.js frontend for member submission, finance and operations review, and reporting.',
      'Owns the OCR platform for B2B and B2C document journeys — classification and structured extraction on Azure Document Intelligence.',
      'Proposes and delivers new AI-agent automations for underwriting, claims, and other departments, from requirements through Azure deployment and handover.',
    ],
    stack: ['Azure AI Foundry', 'FastAPI', 'Next.js', 'Azure', 'Agents'],
    mock: 'psa',
  },
  {
    company: 'Trinity Wizards',
    role: 'Senior AI / Cloud / Backend Engineer',
    period: 'Jan 2024 — May 2026',
    place: 'Malaysia · Hybrid',
    focus: 'Airline platforms · Azure · APIs',
    summary:
      'Client delivery for Malaysia Airlines travel and voucher platforms — Azure middleware, a NestJS admin portal, and platform stability under sustained growth.',
    engagements: [
      {
        label: 'MHVoucher (Malaysia Airlines)',
        kind: 'Voucher platform',
        points: [
          'Node.js / Azure Functions APIs for inventory, redemption, gifting, and campaigns, plus a NestJS admin portal with RBAC and audit logging.',
          'SQL tuning, indexing, and redemption-failure notifications to keep high-traffic queries fast and support teams unblocked.',
        ],
      },
      {
        label: 'Journify (Malaysia Airlines)',
        kind: 'Middleware · CMS',
        points: [
          'Azure Functions middleware and queue-driven processing for planner, itinerary, permissions, and destination content on a live, growing platform.',
          'Laravel CMS enhancements and Magento 2 continuity fixes across catalogue, search sync, and order paths.',
        ],
      },
    ],
    stack: ['Azure Functions', 'Node.js', 'NestJS', 'Laravel', 'SQL'],
    mock: 'trinity',
  },
  {
    company: 'CoolRIOTS',
    role: 'Senior AI Engineer',
    period: 'Aug 2022 — Jan 2024',
    place: 'Singapore · Hybrid',
    focus: 'RAG · Search · Secure integration',
    summary:
      'Retrieval and search infrastructure that moved AI from notebooks into production — grounded LLM answers, multi-tenant search, and government-grade identity.',
    highlights: [
      'Built RAG and retrieval platforms on Python, FastAPI, LangChain, OpenAI, and Milvus / ChromaDB, backed by IBM Object Storage.',
      'Led the BeXInsight multi-tenant global search API (Elasticsearch, Redis, MongoDB) — roughly 60% lower query latency through indexing and query-plan tuning.',
      'Integrated the Singapore MyInfo identity API with multi-layer authentication and consistent cross-service data exchange.',
      'Built analytics and aggregation services that improved dashboard responsiveness and reporting performance.',
    ],
    stack: ['FastAPI', 'LangChain', 'Milvus', 'Elasticsearch', 'OpenAI'],
    mock: 'ai-search',
  },
  {
    company: 'Wavelet Solutions',
    role: 'Full-Stack Engineer',
    period: 'Sep 2021 — Aug 2022',
    place: 'Malaysia · On-site',
    focus: 'Realtime product · APIs',
    summary:
      'An earlier product role — real-time communication surfaces and a large, well-tested API estate.',
    highlights: [
      'Delivered React.js and Vue.js features for real-time communication environments.',
      'Built 50+ REST APIs in Node.js / Express with Telegram, WhatsApp/Twilio, and Facebook integrations.',
      'Designed PostgreSQL schemas and automated Azure CI/CD while holding ~90% test coverage.',
    ],
    stack: ['React', 'Vue', 'Node.js', 'PostgreSQL', 'Azure'],
    mock: 'wavelet',
  },
  {
    company: 'Karisma System M',
    role: 'Backend Engineer',
    period: 'Jul 2020 — Aug 2021',
    place: 'Malaysia · On-site',
    focus: 'Microservices · Performance',
    summary:
      'The first backend role — service and performance work in a regulated environment where secure data handling was non-negotiable.',
    highlights: [
      'Built 30+ microservice APIs for CRUD, file processing, and real-time streaming.',
      'Improved image-processing performance by ~40% through backend optimisation.',
      'Troubleshot production issues with a strong emphasis on security and service reliability.',
    ],
    stack: ['Microservices', 'APIs', 'Performance', 'Security'],
    mock: 'karisma',
  },
]

export type EducationEntry = {
  school: string
  degree: string
  period: string
  location: string
  note: string
  icon: IconName
  status: 'in-progress' | 'complete'
  gpa?: string
  honors?: string[]
  focus: string
  highlights: string[]
  relatedProjectSlug?: string
}

export const education: EducationEntry[] = [
  {
    school: 'Sunway University',
    degree: 'PhD in Computing — Applied AI',
    period: 'Jan 2024 — Present',
    location: 'Selangor, Malaysia',
    note: 'Part-time, alongside full-time engineering. Applied AI & ML for reliable networked systems (Factory6G).',
    icon: 'research',
    status: 'in-progress',
    focus: 'Applied AI and ML for reliability and scheduling under strict latency budgets',
    highlights: [
      'Research centres on Factory6G, a Docker-first platform for testing AI-assisted scheduling and reliability under simulated load.',
      'Experiments cover estimation, scheduling, and Monte Carlo analysis with Sionna and TensorFlow.',
      'Published work spans URLLC taxonomy for Industry 5.0, computer vision, VoIP security, and AI ethics.',
      'The research runs in parallel with full-time delivery; it informs the engineering rather than replacing it.',
    ],
    relatedProjectSlug: 'factory6g',
  },
  {
    school: 'UNIMY',
    degree: 'MSc Computer Science',
    period: '2021 — 2022',
    location: 'Malaysia',
    note: 'GPA 3.68 · Ranked 1st in department',
    icon: 'education',
    status: 'complete',
    gpa: '3.68 / 4.0',
    honors: ['Ranked 1st in department'],
    focus: 'Advanced software engineering, distributed systems, and applied machine learning',
    highlights: [
      'Graduate coursework spanning distributed systems, advanced algorithms, and applied machine learning.',
      'Capstone and project work leaned toward backend architecture and data-driven systems — direct groundwork for the cloud and AI engineering that followed.',
      'Finished top of the department, which shaped the jump into a professional backend role right after graduating.',
    ],
  },
  {
    school: 'An-Najah National University',
    degree: 'BSc Computer Engineering',
    period: '2016 — 2020',
    location: 'Nablus, Palestine',
    note: 'GPA 3.83 · Ranked 1st in department',
    icon: 'chip',
    status: 'complete',
    gpa: '3.83 / 4.0',
    honors: ['Ranked 1st in department'],
    focus: 'Computer engineering fundamentals: systems, networks, and embedded design',
    highlights: [
      'Core coursework in data structures, computer networks, embedded systems, and digital logic design.',
      'Senior/graduation project work introduced full-stack development and sparked the move into backend engineering.',
      'Graduated top of the department, going straight into a first backend role at Karisma System M.',
    ],
  },
]

export type Publication = {
  title: string
  venue: string
  href: string
  icon: IconName
  note: string
}

export const publications: Publication[] = [
  {
    title: 'CCTV armed robbery detection with YOLOv8',
    venue: 'AIP Conference Proceedings, 2025',
    href: 'https://pubs.aip.org/aip/acp/article-abstract/3367/1/020006/3367869/CCTV-armed-robbery-detection-with-YOLOv8',
    icon: 'chip' as const,
    note: 'Applies the same detection approach behind the Vehicles Plate Detection project.',
  },
  {
    title:
      'URLLC for 6G Enabled Industry 5.0: A Taxonomy of Architectures, Cross Layer Techniques, and Time Critical Applications',
    venue: 'arXiv:2510.08080, 2025',
    href: 'https://arxiv.org/abs/2510.08080',
    icon: 'network' as const,
    note: 'Draws directly on Factory6G experiments and cross-layer results.',
  },
  {
    title:
      'Review and enhancement of VoIP security: Identifying vulnerabilities and proposing integrated solutions',
    venue: 'Journal of Telecommunications and the Digital Economy, 2024',
    href: 'https://www.researchgate.net/publication/387551333_Review_and_Enhancement_of_VoIP_Security_Identifying_Vulnerabilities_and_Proposing_Integrated_Solutions',
    icon: 'security' as const,
    note: 'A security-focused review of VoIP vulnerabilities and mitigations.',
  },
  {
    title: 'Ethics and its role in the future of AI development',
    venue: 'International Conference on Frontier of Digital Transformation, 2023',
    href: 'https://pubs.aip.org/aip/acp/article-abstract/2808/1/040003/2891836/Ethics-and-its-role-in-the-future-of-AI',
    icon: 'ai' as const,
    note: 'A position paper on responsible AI development practices.',
  },
]
