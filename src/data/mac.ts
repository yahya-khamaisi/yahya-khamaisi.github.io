/**
 * Copy for the macOS-style shell: sections, hero, widgets, case studies,
 * and the micro-copy the windows, Dock and Spotlight need. Both languages
 * live here so the shell strings stay in one place.
 */
import type { SymName } from '../components/Sym'

export type SectionId =
  | 'about'
  | 'work'
  | 'experience'
  | 'skills'
  | 'education'
  | 'research'
  | 'contact'

export type Section = { id: SectionId; to: string; label: string; icon: SymName }

export type ProofItem = { value: string; label: string; icon: SymName }

export type CaseStudy = {
  problem: string
  outcomes: { value: string; label: string }[]
}

export type MacCopy = {
  sections: Section[]
  hero: { status: string; before: string; em: string; after: string; lede: string }
  proof: ProofItem[]
  /** home-page widgets */
  widgets: {
    now: string
    since: string
    sample: string
    sayHello: string
    sayHelloText: string
    writeToMe: string
  }
  caseStudies: Record<string, CaseStudy>
  t: {
    seeMyWork: string
    featuredWork: string
    showAll: (n: number) => string
    elsewhere: string
    more: string
    search: string
    spotlightPlaceholder: string
    spotlightGroups: { sections: string; projects: string; skills: string; experience: string; research: string }
    noResults: string
    gridView: string
    listView: string
    toggleInspector: string
    projectsCount: (n: number) => string
    problem: string
    question: string
    outcomes: string
    openCaseStudy: string
    back: string
    share: string
    linkCopied: string
    illustrative: string
    tools: string
    provenIn: string
    usedIn: (n: number) => string
    to: string
    from: string
    newMessage: string
    attachCv: string
    yearsCompanies: (years: number, companies: number) => string
    theme: string
    language: string
    name: string
    period: string
  }
}

const enSections: Section[] = [
  { id: 'about', to: '/', label: 'About', icon: 'home' },
  { id: 'work', to: '/projects', label: 'Work', icon: 'grid' },
  { id: 'experience', to: '/experience', label: 'Experience', icon: 'brief' },
  { id: 'skills', to: '/skills', label: 'Skills', icon: 'spark' },
  { id: 'education', to: '/education', label: 'Education', icon: 'cap' },
  { id: 'research', to: '/research', label: 'Research', icon: 'paper' },
  { id: 'contact', to: '/contact', label: 'Contact', icon: 'mail' },
]

const arLabels: Record<SectionId, string> = {
  about: 'نبذة',
  work: 'الأعمال',
  experience: 'الخبرة',
  skills: 'المهارات',
  education: 'التعليم',
  research: 'الأبحاث',
  contact: 'تواصل',
}

export const macEn: MacCopy = {
  sections: enSections,
  hero: {
    status: 'Senior AI Engineer · Dubai · open to conversations',
    before: 'I take AI from ',
    em: 'prototype',
    after: ' to the system a business runs on.',
    lede: 'Full-stack AI engineer. Six years shipping agents, retrieval, and cloud platforms for insurance and aviation, plus a PhD on how AI holds up under real-world load.',
  },
  proof: [
    { value: '5', label: 'hosted AI agents in production', icon: 'ai' },
    { value: '~60%', label: 'lower search latency at scale', icon: 'search' },
    { value: '230+', label: 'commits on a live airline platform', icon: 'cloud' },
    { value: 'PhD', label: 'applied AI reliability research', icon: 'flask' },
  ],
  widgets: {
    now: 'Now',
    since: 'since',
    sample: 'Sample agent run · illustrative',
    sayHello: 'Say hello',
    sayHelloText: "Working on AI, platform or full-stack problems? Let's talk.",
    writeToMe: 'Write to me',
  },
  caseStudies: {
    'te-ai-portal': {
      problem:
        'Underwriters re-read PDFs and spreadsheets for every case, and renewals ran over email.',
      outcomes: [
        { value: '5', label: 'hosted agents' },
        { value: '2', label: 'surfaces, one renewal agent' },
        { value: 'OCR', label: 'and search indexing at upload' },
      ],
    },
    mhvoucher: {
      problem:
        'Support staff needed safe, traceable control over redemptions without touching the database.',
      outcomes: [
        { value: 'RBAC', label: 'role-scoped support access' },
        { value: 'Audit', label: 'logging on admin actions' },
        { value: 'Auto', label: 'redemption-failure alerts' },
      ],
    },
    'journify-middleware': {
      problem:
        'A live travel platform kept growing on older runtimes with synchronous bottlenecks.',
      outcomes: [
        { value: '230+', label: 'commits on a live platform' },
        { value: 'Queues', label: 'event-driven processing' },
        { value: 'Node 20', label: 'and Functions v4 upgrade' },
      ],
    },
    'reimbursement-portal': {
      problem:
        'Claim intake was manual, and members had no way to check status without calling.',
      outcomes: [
        { value: 'OTP', label: 'status lookup, no account' },
        { value: '2', label: 'portals, one architecture' },
        { value: 'Batch', label: 'PO handling and Excel export' },
      ],
    },
    'coolriots-rag': {
      problem:
        'AI answers lived in notebooks, retrieval was keyword-only, and quality could not be measured.',
      outcomes: [
        { value: 'RAG', label: 'answers grounded in documents' },
        { value: 'MyInfo', label: 'government-grade identity' },
        { value: 'Eval', label: 'retrieval quality measured' },
      ],
    },
    factory6g: {
      problem:
        'Do learned estimators and schedulers stay reliable when the deadline is a millisecond?',
      outcomes: [
        { value: 'Monte Carlo', label: 'estimator and scheduler sweeps' },
        { value: 'Docker', label: 'reproducible pipelines' },
        { value: 'Paper', label: 'URLLC for Industry 5.0' },
      ],
    },
    bexinsight: {
      problem:
        "Tenants needed fast, ranked search without ever seeing each other's data.",
      outcomes: [
        { value: '~60%', label: 'lower query latency' },
        { value: 'Isolated', label: 'multi-tenant data' },
        { value: 'Bench', label: 'business case for scale' },
      ],
    },
  },
  t: {
    seeMyWork: 'See my work',
    featuredWork: 'Featured work',
    showAll: (n) => `Show all ${n}`,
    elsewhere: 'Elsewhere',
    more: 'More',
    search: 'Search',
    spotlightPlaceholder: 'Search projects, skills, roles…',
    spotlightGroups: {
      sections: 'Sections',
      projects: 'Projects',
      skills: 'Skills',
      experience: 'Experience',
      research: 'Research',
    },
    noResults: 'No matches. Try a client, a tool, or a role.',
    gridView: 'Grid view',
    listView: 'List view',
    toggleInspector: 'Show or hide the inspector',
    projectsCount: (n) => `${n} projects`,
    problem: 'Problem',
    question: 'Question',
    outcomes: 'Outcomes',
    openCaseStudy: 'Open case study',
    back: 'Back',
    share: 'Share',
    linkCopied: 'Link copied',
    illustrative: 'Illustrative screen. Names, figures and documents are invented.',
    tools: 'Tools',
    provenIn: 'Proven in',
    usedIn: (n) => `${n} project${n === 1 ? '' : 's'}`,
    to: 'To:',
    from: 'From:',
    newMessage: 'New message',
    attachCv: 'CV',
    yearsCompanies: (y, c) => `${y}+ years · ${c} companies`,
    theme: 'Appearance',
    language: 'Language',
    name: 'Name',
    period: 'When',
  },
}

export const macAr: MacCopy = {
  sections: enSections.map((s) => ({ ...s, label: arLabels[s.id] })),
  hero: {
    status: 'مهندس ذكاء اصطناعي أول · دبي · منفتح للحديث',
    before: 'أنقل الذكاء الاصطناعي من ',
    em: 'النموذج الأولي',
    after: ' إلى النظام الذي تعتمد عليه الأعمال.',
    lede: 'مهندس full-stack للذكاء الاصطناعي. ست سنوات في بناء الوكلاء وأنظمة الاسترجاع والمنصات السحابية لقطاعي التأمين والطيران، مع دكتوراه تدرس موثوقية الذكاء الاصطناعي تحت الضغط الفعلي.',
  },
  proof: [
    { value: '5', label: 'وكلاء ذكاء اصطناعي في الإنتاج', icon: 'ai' },
    { value: '~60%', label: 'زمن بحث أقل على نطاق واسع', icon: 'search' },
    { value: '230+', label: 'commit على منصة طيران حية', icon: 'cloud' },
    { value: 'PhD', label: 'بحث في موثوقية الذكاء الاصطناعي', icon: 'flask' },
  ],
  widgets: {
    now: 'الآن',
    since: 'منذ',
    sample: 'تشغيل وكيل · مثال توضيحي',
    sayHello: 'لنتحدث',
    sayHelloText: 'تعمل على مشكلة في الذكاء الاصطناعي أو المنصات أو الـ full-stack؟ لنتحدث.',
    writeToMe: 'راسلني',
  },
  caseStudies: {
    'te-ai-portal': {
      problem: 'كان المكتتبون يعيدون قراءة ملفات PDF والجداول في كل حالة، وكانت التجديدات تتم عبر البريد.',
      outcomes: [
        { value: '5', label: 'وكلاء مستضافون' },
        { value: '2', label: 'واجهتان ووكيل تجديد واحد' },
        { value: 'OCR', label: 'وفهرسة البحث عند الرفع' },
      ],
    },
    mhvoucher: {
      problem: 'احتاج فريق الدعم إلى تحكّم آمن وقابل للتتبّع في الاسترداد دون لمس قاعدة البيانات.',
      outcomes: [
        { value: 'RBAC', label: 'صلاحيات دعم حسب الدور' },
        { value: 'Audit', label: 'سجلّ لإجراءات الإدارة' },
        { value: 'Auto', label: 'تنبيهات فشل الاسترداد' },
      ],
    },
    'journify-middleware': {
      problem: 'منصة سفر حيّة تنمو باستمرار على بيئات تشغيل قديمة مع اختناقات متزامنة.',
      outcomes: [
        { value: '230+', label: 'commit على منصة حية' },
        { value: 'Queues', label: 'معالجة قائمة على الأحداث' },
        { value: 'Node 20', label: 'وترقية Functions v4' },
      ],
    },
    'reimbursement-portal': {
      problem: 'كان استلام المطالبات يدوياً، ولم يكن للأعضاء طريقة لمعرفة الحالة دون اتصال.',
      outcomes: [
        { value: 'OTP', label: 'استعلام دون حساب' },
        { value: '2', label: 'بوابتان ببنية واحدة' },
        { value: 'Batch', label: 'دفعات PO وتصدير Excel' },
      ],
    },
    'coolriots-rag': {
      problem: 'كانت إجابات الذكاء الاصطناعي في دفاتر تجريبية، والاسترجاع بالكلمات المفتاحية فقط، ولا قياس للجودة.',
      outcomes: [
        { value: 'RAG', label: 'إجابات مستندة إلى الوثائق' },
        { value: 'MyInfo', label: 'هوية بمستوى حكومي' },
        { value: 'Eval', label: 'قياس جودة الاسترجاع' },
      ],
    },
    factory6g: {
      problem: 'هل تبقى المقدِّرات والمجدولات المتعلّمة موثوقة حين تكون المهلة جزءاً من الثانية؟',
      outcomes: [
        { value: 'Monte Carlo', label: 'مسوح للمقدِّرات والمجدولات' },
        { value: 'Docker', label: 'خطوط قابلة لإعادة الإنتاج' },
        { value: 'Paper', label: 'URLLC لصناعة 5.0' },
      ],
    },
    bexinsight: {
      problem: 'احتاج المستأجرون إلى بحث سريع ومرتّب دون أن يرى أحدهم بيانات الآخر.',
      outcomes: [
        { value: '~60%', label: 'زمن استعلام أقل' },
        { value: 'Isolated', label: 'بيانات معزولة لكل مستأجر' },
        { value: 'Bench', label: 'مبرّر تجاري للتوسّع' },
      ],
    },
  },
  t: {
    seeMyWork: 'شاهد أعمالي',
    featuredWork: 'أعمال مختارة',
    showAll: (n) => `عرض الكل (${n})`,
    elsewhere: 'روابط',
    more: 'المزيد',
    search: 'بحث',
    spotlightPlaceholder: 'ابحث في المشاريع والمهارات والأدوار…',
    spotlightGroups: {
      sections: 'الأقسام',
      projects: 'المشاريع',
      skills: 'المهارات',
      experience: 'الخبرة',
      research: 'الأبحاث',
    },
    noResults: 'لا نتائج. جرّب اسم عميل أو أداة أو دور.',
    gridView: 'عرض شبكي',
    listView: 'عرض قائمة',
    toggleInspector: 'إظهار أو إخفاء لوحة التفاصيل',
    projectsCount: (n) => `${n} مشروعاً`,
    problem: 'المشكلة',
    question: 'السؤال',
    outcomes: 'النتائج',
    openCaseStudy: 'افتح دراسة الحالة',
    back: 'رجوع',
    share: 'مشاركة',
    linkCopied: 'تم نسخ الرابط',
    illustrative: 'شاشة توضيحية. الأسماء والأرقام والوثائق متخيَّلة.',
    tools: 'الأدوات',
    provenIn: 'مُثبتة في',
    usedIn: (n) => `${n} مشاريع`,
    to: 'إلى:',
    from: 'من:',
    newMessage: 'رسالة جديدة',
    attachCv: 'السيرة',
    yearsCompanies: (y, c) => `+${y} سنوات · ${c} شركات`,
    theme: 'المظهر',
    language: 'اللغة',
    name: 'الاسم',
    period: 'المدة',
  },
}
