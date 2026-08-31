/**
 * Architecture diagrams for project detail pages.
 *
 * These are hand-authored from the same public description each project's
 * overview already gives — component names and data flow, nothing internal.
 * No production data, no exact reproductions of client tooling. The default
 * footnote on <ProjectDiagram /> says as much.
 *
 * Shape: left-to-right columns (pipeline stages / tiers), each holding a few
 * nodes. Mark the one "core" node per diagram `accent: true`.
 */

export type DiagramNode = {
  label: string
  sub?: string
  accent?: boolean
}

export type DiagramColumn = {
  label: string
  nodes: DiagramNode[]
}

export type Diagram = {
  /** one line above the diagram — what it shows */
  caption: string
  columns: DiagramColumn[]
  /** overrides the default "representative architecture" note */
  footnote?: string
}

export const projectDiagrams: Record<string, Diagram> = {
  'te-ai-portal': {
    caption:
      'Documents in, grounded answers out — one portal over five hosted agents.',
    columns: [
      {
        label: 'Ingest',
        nodes: [
          { label: 'Files upload' },
          { label: 'Document Intelligence OCR' },
          { label: 'Azure AI Search index', sub: 'at upload' },
        ],
      },
      {
        label: 'Portal',
        nodes: [
          { label: 'Next.js 15 portal', sub: 'Files · Generate · Ask · Reports' },
          { label: 'RBAC · dept / TPA mappings' },
          { label: 'Public renewal widget', sub: '/widget.js · /embed' },
        ],
      },
      {
        label: '5 agents · AI Foundry',
        nodes: [
          { label: 'Underwriting — generate', accent: true },
          { label: 'Underwriting — Ask', accent: true },
          { label: 'Policy renewal', accent: true },
        ],
      },
      {
        label: 'State',
        nodes: [
          { label: 'Azure SQL', sub: 'Prisma' },
          { label: 'Blob Storage' },
        ],
      },
    ],
  },

  mhvoucher: {
    caption:
      'Customer APIs and an audited admin portal over one voucher database.',
    columns: [
      {
        label: 'Actors',
        nodes: [
          { label: 'Customer apps' },
          { label: 'Support & merchant staff' },
        ],
      },
      {
        label: 'Services',
        nodes: [
          {
            label: 'Azure Functions APIs',
            sub: 'catalogue · redemption · gifting · campaigns',
          },
          { label: 'NestJS admin portal', sub: 'RBAC · audit log', accent: true },
        ],
      },
      {
        label: 'Data',
        nodes: [{ label: 'SQL Server', sub: 'tuned indexes' }],
      },
      {
        label: 'Signals',
        nodes: [
          { label: 'Redemption-failure alerts' },
          { label: 'Operational reports' },
        ],
      },
    ],
  },

  'invoice-ms': {
    caption:
      '19 Azure Functions — 12 HTTP, 7 on timers — behind airline invoicing.',
    columns: [
      {
        label: 'Triggers',
        nodes: [
          { label: 'HTTP · 12', sub: 'invoice CRUD · admin list / detail' },
          { label: 'Timer · 7', sub: 'daily & weekly reports' },
        ],
      },
      {
        label: 'Runtime',
        nodes: [
          { label: 'Functions v4', sub: 'programming model v4', accent: true },
          { label: 'Prisma' },
        ],
      },
      {
        label: 'Outputs',
        nodes: [
          { label: 'Invoice database' },
          { label: 'Excel · CSV · e-invoice' },
          { label: 'Report & error emails' },
        ],
      },
    ],
  },

  'journify-middleware': {
    caption:
      'Queue-driven Azure Functions keeping a live travel platform current.',
    columns: [
      {
        label: 'Planner APIs',
        nodes: [
          { label: 'Plans · places · permissions' },
          { label: 'Filter · sort · paginate' },
        ],
      },
      {
        label: 'Queue',
        nodes: [{ label: 'Azure Storage Queue' }],
      },
      {
        label: 'Workers',
        nodes: [
          { label: 'Queue-triggered functions', accent: true },
          { label: 'Tripmate permission flows' },
        ],
      },
      {
        label: 'Store',
        nodes: [{ label: 'Content store' }, { label: 'Redis cache' }],
      },
    ],
  },

  'reimbursement-portal': {
    caption:
      'One backend serving a public claims portal and an internal ops console.',
    columns: [
      {
        label: 'Members',
        nodes: [
          { label: 'Claim submission' },
          { label: 'Document upload' },
          { label: 'OTP status lookup' },
        ],
      },
      {
        label: 'Backend',
        nodes: [
          { label: 'FastAPI services', accent: true },
          { label: 'Auth · OTP' },
        ],
      },
      {
        label: 'Operations',
        nodes: [
          { label: 'Claims review' },
          { label: 'PO batch handling' },
          { label: 'Excel export' },
        ],
      },
    ],
  },

  'coolriots-rag': {
    caption:
      'LLM answers grounded in indexed documents, not open-ended generation.',
    columns: [
      {
        label: 'Index',
        nodes: [
          { label: 'Documents', sub: 'IBM Object Storage' },
          { label: 'Chunk + embed' },
          { label: 'Milvus / ChromaDB' },
        ],
      },
      {
        label: 'Retrieve',
        nodes: [
          { label: 'FastAPI + LangChain', accent: true },
          { label: 'Top-k vector search' },
          { label: 'MyInfo identity', sub: 'multi-layer auth' },
        ],
      },
      {
        label: 'Answer',
        nodes: [
          { label: 'OpenAI LLM' },
          { label: 'Grounded reply + sources' },
        ],
      },
    ],
  },

  bexinsight: {
    caption:
      'Tenant-isolated global search, ~60% faster after index and query tuning.',
    columns: [
      {
        label: 'Query',
        nodes: [
          { label: 'Tenant request' },
          { label: 'Tenant-scoped filter' },
        ],
      },
      {
        label: 'Serve',
        nodes: [
          { label: 'Search API · Node.js', accent: true },
          { label: 'Redis cache' },
        ],
      },
      {
        label: 'Index',
        nodes: [{ label: 'Elasticsearch' }, { label: 'MongoDB source' }],
      },
    ],
    footnote:
      'Representative architecture — the ~60% latency drop is measured; the layout is illustrative.',
  },

  'serverless-ai-chatbot': {
    caption:
      'A serverless RAG assistant reachable from web chat and WhatsApp Business.',
    columns: [
      {
        label: 'Channels',
        nodes: [
          { label: 'WhatsApp Business' },
          { label: 'API Gateway WebSocket' },
        ],
      },
      {
        label: 'Compute',
        nodes: [
          { label: 'AWS Lambda', accent: true },
          { label: 'Conversation summariser' },
          { label: 'SQS' },
        ],
      },
      {
        label: 'Memory + docs',
        nodes: [
          { label: 'DynamoDB memory' },
          { label: 'S3 knowledge' },
        ],
      },
      {
        label: 'Answer',
        nodes: [{ label: 'RAG response' }],
      },
    ],
  },

  factory6g: {
    caption: 'Reproducible Monte Carlo sweeps from config to paper-ready plots.',
    columns: [
      {
        label: 'Configure',
        nodes: [
          { label: 'Scenario config' },
          { label: 'Sionna / TensorFlow model' },
        ],
      },
      {
        label: 'Run',
        nodes: [
          { label: 'Monte Carlo sweep', accent: true },
          { label: 'Checkpointing' },
        ],
      },
      {
        label: 'Aggregate',
        nodes: [
          { label: 'Metric aggregation' },
          { label: 'Cross-layer analysis' },
        ],
      },
      {
        label: 'Report',
        nodes: [{ label: 'Plots + tables for papers' }],
      },
    ],
  },
}

export const diagramSlugs = new Set(Object.keys(projectDiagrams))
