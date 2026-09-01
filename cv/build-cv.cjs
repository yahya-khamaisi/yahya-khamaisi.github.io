const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  BorderStyle, TabStopType, LevelFormat, ExternalHyperlink,
} = require('docx');

const RIGHT_TAB = 10480; // text width: 12240 - 880 - 880 (dxa)

const INK = '1A1A1A';
const GREY = '585858';
const RULE = 'BFBFBF';
const FONT = 'Calibri';

const OUT = process.argv[2] || 'Yahya-Khamayseh-CV.docx';

// ---- helpers ---------------------------------------------------------------

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 260, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 3 } },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: INK, characterSpacing: 8, font: FONT }),
    ],
  });
}

// Job/degree title on the left, dates flush right
function entryHeader(title, right) {
  return new Paragraph({
    spacing: { before: 140, after: 20 },
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    children: [
      new TextRun({ text: title, bold: true, size: 21, color: INK, font: FONT }),
      new TextRun({ text: '\t' + right, size: 18, italics: true, color: GREY, font: FONT }),
    ],
  });
}

function metaLine(text) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 18, italics: true, color: GREY, font: FONT })],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 19, color: INK, font: FONT })],
  });
}

// "Label. Body text." paragraph used for projects
function labelled(label, body) {
  return new Paragraph({
    spacing: { after: 90 },
    children: [
      new TextRun({ text: label + ' ', bold: true, size: 19, color: INK, font: FONT }),
      new TextRun({ text: body, size: 19, color: INK, font: FONT }),
    ],
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 80 },
    children: [new TextRun({ text, size: opts.size ?? 19, color: opts.color ?? INK, italics: !!opts.italics, font: FONT })],
  });
}

// ---- content -------------------------------------------------------------

const children = [];

// Header
children.push(new Paragraph({
  spacing: { after: 20 },
  children: [new TextRun({ text: 'Yahya Khamayseh', bold: true, size: 44, color: INK, font: FONT })],
}));
children.push(new Paragraph({
  spacing: { after: 60 },
  children: [new TextRun({ text: 'Senior AI Engineer  ·  Full-Stack', size: 21, color: GREY, font: FONT })],
}));
const sep = () => new TextRun({ text: '   ·   ', size: 16, color: RULE, font: FONT });
const link = (text, href) => new ExternalHyperlink({
  link: href,
  children: [new TextRun({ text, size: 16, color: GREY, font: FONT })],
});
children.push(new Paragraph({
  spacing: { after: 40 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 6 } },
  children: [
    new TextRun({ text: 'Dubai, UAE', size: 16, color: GREY, font: FONT }),
    sep(),
    link('yahya.s.m.khamayseh@gmail.com', 'mailto:yahya.s.m.khamayseh@gmail.com'),
    sep(),
    link('github.com/yahya-khamaisi', 'https://github.com/yahya-khamaisi'),
    sep(),
    link('linkedin.com/in/yahya-khamaisi', 'https://www.linkedin.com/in/yahya-khamaisi'),
    sep(),
    link('yahya-khamaisi.github.io', 'https://yahya-khamaisi.github.io'),
  ],
}));

// Summary
children.push(sectionHeading('Summary'));
children.push(body(
  'Full-stack engineer who builds AI systems for production — agents, retrieval, APIs, and the cloud they run on. ' +
  'Currently Senior AI Engineer at Takaful Emarat, owning an insurance AI portfolio on Azure. Six years of enterprise ' +
  'delivery across the UAE, Singapore, and Malaysia, backed by part-time doctoral research in applied AI. Service ' +
  'boundaries are drawn clearly, inputs are validated aggressively, and AI features are made measurable rather than magical.',
  { after: 40 },
));

// Experience
children.push(sectionHeading('Experience'));

children.push(entryHeader('Senior AI Engineer — Takaful Emarat', 'Apr 2026 – Present'));
children.push(metaLine('Dubai, UAE'));
[
  'Owns continuous delivery of the company AI and automation portfolio on Azure.',
  'TE AI Portal — Individual Underwriting, Group Underwriting, and Policy Renewal — building and operating agents on Azure AI Foundry.',
  'Reimbursement Claims Portal end to end: FastAPI backend and Next.js frontend for member submission, finance/operations review, and reporting.',
  'OCR platform for B2B and B2C document journeys — classification and structured extraction on Azure Document Intelligence.',
  'Proposes and delivers new AI-agent automations for underwriting, claims, and other departments, from requirements through Azure deployment and handover.',
].forEach((t) => children.push(bullet(t)));

children.push(entryHeader('Senior AI / Cloud / Backend Engineer — Trinity Wizards', 'Jan 2024 – Mar 2026'));
children.push(metaLine('Malaysia (Hybrid)  ·  AWS Platinum Partner'));
[
  "Client delivery for Malaysia Airlines' travel and voucher platforms.",
  'MHVoucher: Node.js / Azure Functions APIs for inventory, redemption, gifting, and campaigns, plus a NestJS admin portal with RBAC and audit logging; SQL tuning and redemption-failure notifications.',
  'Journify: Azure Functions middleware and queue-driven processing for planner, itinerary, and destination content (230+ commits); Laravel CMS enhancements and Magento 2 continuity fixes.',
].forEach((t) => children.push(bullet(t)));

children.push(entryHeader('Senior AI Engineer — CoolRIOTS', 'Aug 2022 – Jan 2024'));
children.push(metaLine('Singapore (Hybrid)  ·  IBM Platinum Partner'));
[
  'Built RAG and retrieval platforms on Python, FastAPI, LangChain, OpenAI, and Milvus / ChromaDB, backed by IBM Object Storage.',
  'Led the BeXInsight multi-tenant global search API (Elasticsearch, Redis, MongoDB) — roughly 60% lower query latency through indexing and query-plan tuning.',
  'Integrated the Singapore MyInfo identity API with multi-layer authentication and consistent cross-service data exchange.',
  'Built analytics and aggregation services improving dashboard responsiveness and reporting performance.',
].forEach((t) => children.push(bullet(t)));

children.push(entryHeader('Full-Stack Engineer — Wavelet Solutions', 'Sep 2021 – Aug 2022'));
children.push(metaLine('Malaysia (On-site)'));
[
  'Delivered React and Vue features for real-time communication surfaces.',
  'Built 50+ REST APIs in Node.js / Express with Telegram, WhatsApp/Twilio, and Facebook integrations.',
  'Designed PostgreSQL schemas and automated Azure CI/CD while holding ~90% test coverage.',
].forEach((t) => children.push(bullet(t)));

children.push(entryHeader('Backend Engineer — Karisma System M', 'Jul 2020 – Aug 2021'));
children.push(metaLine('Malaysia (On-site)'));
[
  'Built 30+ microservice APIs for CRUD, file processing, and real-time streaming.',
  'Improved image-processing performance ~40% through backend optimisation.',
  'Troubleshot production issues with a strong emphasis on security and reliability.',
].forEach((t) => children.push(bullet(t)));

// Selected Projects
children.push(sectionHeading('Selected Projects'));
children.push(body('Architecture diagrams and full write-ups at yahya-khamaisi.github.io', { italics: true, color: GREY, size: 17, after: 120 }));
[
  ['TE AI Portal (Takaful Emarat).', 'Multi-project AI workspace for underwriting and policy renewal, backed by five hosted Azure AI Foundry agents; Next.js 15, Prisma, Azure SQL.'],
  ['CoolRIOTS RAG Platforms.', 'Retrieval and chatbot backends on FastAPI, LangChain, Milvus/ChromaDB, and OpenAI, with secure MyInfo identity integration.'],
  ['BeXInsight Global Search (CoolRIOTS).', 'Multi-tenant search API with strict tenant isolation; ~60% lower query latency through indexing and query-plan tuning.'],
  ['MHVoucher Platform (Malaysia Airlines).', 'Production voucher platform for inventory, redemption, gifting, and campaigns with a NestJS admin portal.'],
  ['Journify Middleware (Malaysia Airlines).', 'Azure Functions backbone for a travel content platform — 230+ commits, event-driven queues, Node.js 20 / Functions v4.'],
  ['Factory6G (doctoral research).', 'Docker-first platform for testing AI-assisted scheduling and reliability under simulated load; Python, TensorFlow, Sionna. Secondary to the engineering work.'],
].forEach(([l, b]) => children.push(labelled(l, b)));

// Education
children.push(sectionHeading('Education'));
children.push(entryHeader('PhD in Computing, Applied AI — Sunway University', 'Jan 2024 – Present'));
children.push(metaLine('Part-time, alongside full-time engineering · Selangor, Malaysia. Applied AI & ML for reliability and scheduling under strict latency budgets (Factory6G).'));
children.push(entryHeader('MSc Computer Science — UNIMY', '2021 – 2022'));
children.push(metaLine('Malaysia. GPA 3.68/4.0, ranked 1st in department.'));
children.push(entryHeader('BSc Computer Engineering — An-Najah National University', '2016 – 2020'));
children.push(metaLine('Nablus, Palestine. GPA 3.83/4.0, ranked 1st in department.'));

// Publications
children.push(sectionHeading('Publications'));
[
  'CCTV armed robbery detection with YOLOv8. AIP Conference Proceedings, 2025.',
  'URLLC for 6G Enabled Industry 5.0: A Taxonomy of Architectures, Cross-Layer Techniques, and Time-Critical Applications. arXiv:2510.08080, 2025.',
  'Review and Enhancement of VoIP Security: Identifying Vulnerabilities and Proposing Integrated Solutions. Journal of Telecommunications and the Digital Economy, 2024.',
  'Ethics and its role in the future of AI development. Int’l Conference on Frontier of Digital Transformation, 2023.',
].forEach((t) => children.push(bullet(t)));

// Skills
children.push(sectionHeading('Skills'));
[
  ['Backend & APIs:', 'Python (FastAPI, Flask), Node.js (Express, NestJS), Azure Functions, REST, microservices, webhooks.'],
  ['AI & Retrieval:', 'Agentic AI / RAG, LangChain, OpenAI, Azure AI Foundry, Milvus / ChromaDB / Elasticsearch, prompt engineering & evaluation.'],
  ['Data & Cloud:', 'PostgreSQL, MongoDB, Redis, Azure Container Apps / APIM / Queues, Docker, CI/CD, schema design & query tuning.'],
  ['Full Stack & Product:', 'React, Next.js, TypeScript, admin portals & embeddable widgets, RBAC / SSO / audit patterns, API design & integration.'],
  ['Research toolkit (secondary):', 'Python simulation pipelines, TensorFlow / Sionna, YOLOv8 / computer vision, Monte Carlo experiment automation.'],
].forEach(([l, b]) => children.push(labelled(l, b)));

// ---- document -----------------------------------------------------------

const doc = new Document({
  creator: 'Yahya Khamayseh',
  title: 'Yahya Khamayseh — CV',
  styles: {
    default: {
      document: { run: { font: FONT, size: 19, color: INK } },
    },
  },
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: '•',
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 260, hanging: 180 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 780, bottom: 780, left: 880, right: 880 },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log('wrote', OUT, buf.length, 'bytes');
});
