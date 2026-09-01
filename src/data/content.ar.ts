/* eslint-disable */
/**
 * Arabic (العربية) bundle — mirrors the shape of `en` in content.ts.
 * Draft translation in Modern Standard Arabic; tech terms and brand names
 * are kept in Latin script on purpose. Review welcome.
 */
import {
  categoryLabels as enCategoryLabels,
  type Site,
  type Project,
  type Experience,
  type EducationEntry,
  type Publication,
  type SkillGroup,
  type ResearchToolkit,
  type Ui,
} from './content'
import { careerDomains, careerFlows, careerProof } from './systems'
import { projectDiagrams } from './diagrams'
import type { Diagram } from './diagrams'

const profile: Site['profile'] = {
  name: 'يحيى خمايسة',
  role: 'مهندس Full-Stack للذكاء الاصطناعي',
  focus: 'Full Stack · ذكاء اصطناعي · سحابة',
  location: 'دبي، الإمارات',
  email: 'yahya.s.m.khamayseh@gmail.com',
  github: 'https://github.com/yahya-khamaisi',
  linkedin: 'https://www.linkedin.com/in/yahya-khamaisi/',
  photo: '/yahya.jpg',
  photoAlt: 'صورة ليحيى خمايسة',
  cvUrl: '/Yahya-Khamayseh-CV.pdf',
  summary:
    'مهندس full-stack يبني أنظمة ذكاء اصطناعي جاهزة للإنتاج — وكلاء، استرجاع، واجهات برمجية، والسحابة التي تشغّلها. ست سنوات من التسليم المؤسسي، مدعومة ببحث دكتوراه في الذكاء الاصطناعي التطبيقي حيث تُدرَس الموثوقية تحت الحِمل الحقيقي مباشرةً.',
  headline: 'مهندس full-stack، أبني أنظمة ذكاء اصطناعي في الإنتاج.',
}

const pageMeta: Site['pageMeta'] = {
  '/': {
    title: 'يحيى خمايسة — مهندس Full-stack للذكاء الاصطناعي',
    description:
      'مهندس full-stack يبني أنظمة ذكاء اصطناعي للإنتاج — وكلاء، استرجاع، واجهات برمجية، وسحابة. ست سنوات من التسليم المؤسسي، مدعومة ببحث دكتوراه في الذكاء الاصطناعي التطبيقي.',
  },
  '/projects': {
    title: 'المشاريع — يحيى خمايسة',
    description:
      'أعمال مختارة عبر الذكاء الاصطناعي المؤسسي، والبحث التطبيقي، والمصادر المفتوحة، والتسليم المبكر. صفِّ حسب المسار أو ابحث حسب العميل والتقنيات.',
  },
}

const highlights: Site['highlights'] = [
  { label: '+6 سنوات', detail: 'تسليم إنتاجي لعملاء مؤسسيين', icon: 'years' },
  { label: 'ذكاء اصطناعي في الإنتاج', detail: 'وكلاء وRAG وحلقات تقييم', icon: 'ai' },
  { label: 'Full stack وسحابة', detail: 'واجهات برمجية وبوابات وتسليم على Azure', icon: 'spark' },
  { label: 'مدعوم بالدكتوراه', detail: 'بحث دكتوراه في الذكاء الاصطناعي التطبيقي', icon: 'research' },
]

const heroStack: Site['heroStack'] = [
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

const nav: Site['nav'] = [
  { label: 'الأعمال', href: '#work' },
  { label: 'الخبرة', href: '#experience' },
  { label: 'المهارات', href: '#skills' },
  { label: 'التعليم', href: '#education' },
  { label: 'تواصل', href: '#contact' },
]

const categoryLabels: Record<keyof typeof enCategoryLabels, string> = {
  industry: 'ذكاء اصطناعي مؤسسي',
  research: 'بحث',
  github: 'GitHub',
  personal: 'مشاريع شخصية',
  earlier: 'أعمال سابقة',
}

const projectCategories: Site['projectCategories'] = [
  { id: 'all', label: 'الكل' },
  { id: 'industry', label: 'ذكاء اصطناعي مؤسسي' },
  { id: 'research', label: 'بحث' },
  { id: 'github', label: 'GitHub' },
  { id: 'personal', label: 'مشاريع شخصية' },
  { id: 'earlier', label: 'أعمال سابقة' },
]

const projects: Project[] = [
  {
    slug: 'te-ai-portal',
    title: 'بوابة TE AI',
    tag: 'Takaful Emarat · ذكاء اصطناعي وكيلي',
    role: 'مهندس رئيسي، البوابة والوكلاء',
    period: '2026 – حتى الآن',
    blurb:
      'مساحة عمل ذكاء اصطناعي متعددة المشاريع للاكتتاب وتجديد الوثائق، مدعومة بخمسة وكلاء مُستضافين على Azure AI Foundry.',
    overview:
      'بوابة TE AI هي مساحة العمل الداخلية للذكاء الاصطناعي في Takaful Emarat — تطبيق Next.js 15 يغطي الاكتتاب (الملفات ← التوليد ← السؤال ← التقارير) وتجديد الوثائق، ويُطرَح أيضاً كأداة محادثة عامة على الموقع. خمسة وكلاء code-first يعملون كخدمات مُستضافة على Azure AI Foundry: توليد وسؤال للاكتتاب الفردي والجماعي، إضافةً إلى تجديد الوثائق.',
    details: [
      'بوابة Next.js 15 / React 19 على Azure SQL (Prisma) وBlob Storage وDocument Intelligence OCR وفهرسة Azure AI Search عند الرفع.',
      'خمس خدمات Agent Framework مُستضافة على Azure AI Foundry: توليد الاكتتاب الفردي/الجماعي، وسؤال الاكتتاب الفردي/الجماعي، وتوليد تجديد الوثائق.',
      'تجديد الوثائق يُطرَح مرتين — محادثة داخلية للموظفين وأداة عامة `/widget.js` + `/embed` محمية بمفتاح موقع.',
      'واجهة إدارية لصلاحيات RBAC، وربط الأقسام/جهات الإدارة الخارجية، وتتبّع الاستخدام، وحالة مزامنة قاعدة المعرفة.',
    ],
    impact: [
      'دمج الاكتتاب والتجديد في بوابة واحدة بدل جداول متفرقة وسلاسل بريد.',
      'الـ OCR وفهرسة البحث عند الرفع مكّنا وكيلَي التوليد والسؤال من استرجاع نص المستندات الفعلي بدل إعادة قراءة ملفات PDF.',
      'وكيل التجديد نفسه يخدم الآن الموظفين الداخليين والموقع العام عبر أداة واحدة.',
    ],
    stack: ['Next.js 15', 'Azure AI Foundry', 'Prisma', 'Azure SQL'],
    href: null,
    mock: 'psa',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'mhvoucher',
    title: 'منصة MHVoucher',
    tag: 'Malaysia Airlines',
    role: 'مهندس منصّات',
    period: '2025 – 2026',
    blurb:
      'منصة قسائم إنتاجية للمخزون والاستبدال والإهداء والحملات، مع بوابة إدارية بـ NestJS.',
    overview:
      'MHVoucher هو النظام الذي يستخدمه فريق العمليات في Malaysia Airlines لإدارة مخزون القسائم والاستبدال والإهداء والحملات من طرف إلى طرف. إلى جانب الواجهات البرمجية الموجَّهة للعملاء، بنيتُ البوابة الإدارية التي يعتمد عليها فريق الدعم يومياً — لذا كانت الموثوقية وقابلية التدقيق بأهمية تسليم الميزات نفسها.',
    details: [
      'واجهات برمجية بـ Node.js / Azure Functions للكتالوج وقائمة الرغبات والاستبدال والتقارير التشغيلية.',
      'بوابة خدمة إدارية بصلاحيات RBAC وسجل تدقيق وصلاحيات دور دعم التجّار.',
      'ضبط SQL واستراتيجية فهرسة لإبقاء الاستعلامات عالية الحركة سريعة.',
      'معالجة أخطاء ديناميكية وإشعارات فشل الاستبدال.',
    ],
    impact: [
      'صلاحيات RBAC وسجل التدقيق منحا فرق الدعم وصولاً إدارياً آمناً وقابلاً للتتبّع.',
      'الفهرسة وضبط الاستعلامات قلّلا حوادث بطء الاستعلامات في الإنتاج.',
      'إشعارات الفشل الآلية قلّصت استكشاف أعطال الاستبدال يدوياً.',
    ],
    stack: ['Node.js', 'Azure Functions', 'NestJS', 'SQL'],
    href: null,
    mock: 'mhvoucher',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'journify-middleware',
    title: 'وسيط Journify',
    tag: 'Malaysia Airlines · Azure',
    role: 'مهندس منصّات',
    period: '2024 – 2026',
    blurb: 'العمود الفقري القائم على Azure Functions خلف منصة المحتوى السياحي لـ Malaysia Airlines.',
    overview:
      'وسيط Journify يوجّه محتوى المخطِّط والمسار والصلاحيات والوجهات لمنصة السفر في Malaysia Airlines. عبر أكثر من 230 التزام (commit)، تحوّل العمل من تسليم الميزات إلى إبقاء منصة حيّة ومتنامية مستقرة ومحدَّثة.',
    details: [
      'واجهات برمجية للمخطِّط تغطي الخطط والأماكن والصلاحيات والوجهات مع التصفية والترتيب والتصفّح.',
      'معالجة مدفوعة بالأحداث باستخدام Azure Storage Queue ودوال يُشغّلها الطابور.',
      'مسارات تعاون متعددة المستخدمين، تشمل صلاحيات Tripmate وانتقالات الحالة.',
      'ترقيات المنصة إلى Node.js 20 وAzure Functions v4.',
    ],
    impact: [
      'أكثر من 230 التزام أبقت منصة سفر حيّة مستقرة خلال نمو مستمر.',
      'المعالجة المدفوعة بالطوابير أزالت الاختناقات المتزامنة.',
      'ترقية Node.js 20 / Functions v4 خفّضت مخاطر المنصة مستقبلاً.',
    ],
    stack: ['Azure Functions', 'Node.js', 'Queues', 'Redis'],
    href: null,
    mock: 'middleware',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'reimbursement-portal',
    title: 'بوابة استرداد النفقات العامة',
    tag: 'Takaful Emarat · Full Stack',
    role: 'مهندس full-stack',
    period: '2026 – حتى الآن',
    blurb:
      'بوابة مطالبات ذاتية الخدمة مع رفع مستندات والتحقق عبر OTP وخطوط زمنية للحالة، مقترنة بوحدة تحكّم تشغيلية داخلية.',
    overview:
      'تمنح هذه البوابة أعضاء Takaful Emarat مساراً ذاتي الخدمة لتقديم المطالبات التأمينية وتتبّعها، بينما تمنح فريق العمليات الداخلي أدوات المعالجة بالدُفعات والتصدير اللازمة لمعالجتها بكميات كبيرة. تولّيتُ التجربة من طرف إلى طرف — من البنية السحابية حتى الواجهة.',
    details: [
      'مسارات موجَّهة للأعضاء لتقديم المطالبة ورفع المستندات وخطوط زمنية للحالة.',
      'بحث قائم على OTP يتيح للأعضاء متابعة حالة المطالبة دون حساب.',
      'أدوات داخلية لمراجعة المطالبات ومعالجة دفعات أوامر الشراء والتصدير إلى Excel.',
      'بنية سحابية وواجهة سُلّمتا من طرف إلى طرف لعمليات التأمين في الإمارات.',
    ],
    impact: [
      'انتقل تقديم المطالبات العامة من الاستلام اليدوي إلى مسار ذاتي الخدمة عبر الإنترنت.',
      'المعالجة بالدُفعات والتصدير إلى Excel سرّعا تسوية المكتب الخلفي.',
      'بنية واحدة خدمت البوابة العامة ووحدة التحكّم التشغيلية الداخلية معاً.',
    ],
    stack: ['Full stack', 'Azure', 'Claims ops', 'UI/UX'],
    href: null,
    mock: 'reimbursement',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'coolriots-rag',
    title: 'منصات CoolRIOTS للاسترجاع المعزّز',
    tag: 'CoolRIOTS · RAG',
    role: 'مهندس رئيسي',
    period: '2022 – 2024',
    blurb: 'خوادم استرجاع وروبوتات محادثة حوّلت نماذج الذكاء الاصطناعي الأولية إلى أنظمة إنتاجية قابلة للقياس.',
    overview:
      'في CoolRIOTS، قدتُ بنية الاسترجاع وروبوتات المحادثة التي أخرجت تجارب الذكاء الاصطناعي من الدفاتر إلى الإنتاج — بتأصيل إجابات نماذج اللغة في مستندات حقيقية بدل التوليد المفتوح، ودمج التحقق من الهوية بمستوى حكومي على طول الطريق.',
    details: [
      'حزم RAG مبنية على Python وFastAPI وLangChain وOpenAI وMilvus / ChromaDB، مدعومة بـ IBM Object Storage.',
      'تكامل آمن مع MyInfo السنغافورية بمصادقة متعددة الطبقات.',
      'مسارات استرجاع وكيلية مع تكاملات Facebook وGoogle لتفاعل المستخدم.',
      'تبادل بيانات متسق عبر الخدمات على طول خط الاسترجاع.',
    ],
    impact: [
      'حلّ البحث الدلالي محل الاسترجاع القائم على الكلمات المفتاحية فقط عبر المنصة.',
      'تكامل MyInfo أضاف طبقة هوية آمنة بمستوى حكومي.',
      'أصبحت جودة الاسترجاع شيئاً يقيسه الفريق، لا يقدّره بالعين.',
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
    tag: 'بحث دكتوراه · ذكاء اصطناعي تطبيقي',
    role: 'باحث ومطوّر رئيسي',
    period: 'يناير 2024 – حتى الآن',
    blurb:
      'منصة بحث الدكتوراه — بيئة Docker-first لاختبار الجدولة والموثوقية بمساعدة الذكاء الاصطناعي تحت حِمل مُحاكى.',
    overview:
      'Factory6G هي المنصة خلف مسار الدكتوراه — بيئة قابلة للتكرار لاختبار مدى صمود الجدولة والتقدير بمساعدة الذكاء الاصطناعي تحت ميزانيات صارمة للموثوقية وزمن الاستجابة. مبنية للانتقال مباشرةً من التجربة إلى النشر، وتسير إلى جانب العمل الهندسي لا تنافسه.',
    details: [
      'عمليات مسح مونت كارلو تقارن المقدِّرات ومديري الموارد في Sionna وTensorFlow.',
      'خطوط تجارب قابلة للتكرار مع نقاط حفظ وتجميع للمقاييس.',
      'تحليل متعدد الطبقات لزمن الاستجابة والموثوقية والجدولة للسيناريوهات الحرجة زمنياً.',
      'أدوات رسم وتقارير مبنية لإعادة الاستخدام المباشر في الأوراق البحثية.',
    ],
    impact: [
      'أنتجت نتائج قابلة للمقارنة عبر عدة مقدِّرات وجداول.',
      'الخطوط القابلة للتكرار تدعم الآن كل تجربة جديدة، لا الأولى فقط.',
      'تُغذّي النتائج مباشرةً ورقة تصنيف URLLC للصناعة 5.0.',
    ],
    stack: ['Python', 'TensorFlow', 'Sionna', 'Docker'],
    href: 'https://github.com/yahya-khamaisi/Factory6G',
    mock: 'factory6g',
    tier: 'featured',
    category: 'research',
  },
  {
    slug: 'bexinsight',
    title: 'بحث BeXInsight الشامل',
    tag: 'CoolRIOTS · واجهة بحث',
    role: 'مهندس رئيسي',
    period: '2022 – 2024',
    blurb:
      'واجهة بحث شاملة متعددة المستأجرين خفّضت زمن الاستعلام بنحو 60% عبر الفهرسة وتحسين الاستعلامات.',
    overview:
      'BeXInsight هي واجهة البحث متعددة المستأجرين التي قدتُها لـ CoolRIOTS — مصمَّمة لإبقاء بيانات كل مستأجر معزولة تماماً مع إعادة نتائج سريعة ومرتَّبة على نطاق واسع. أصبح عمل الأداء هنا الحجة التجارية لمزيد من الاستثمار في المنصة.',
    details: [
      'Elasticsearch وRedis وMongoDB تشغّل بحثاً معزول المستأجرين على نطاق واسع.',
      'قيادة تصميم الواجهة واستراتيجية الفهرسة وقياس زمن الاستجابة من طرف إلى طرف.',
      'ضبط خطة الاستعلام لإزالة أبطأ المسارات أولاً.',
    ],
    impact: [
      'انخفاض زمن الاستعلام بنحو 60% بعد أعمال الفهرسة وخطة الاستعلام.',
      'صمد عزل المستأجرين تحت حِمل إنتاجي حقيقي.',
      'أعطت القياسات الشركة حجة قابلة للقياس لتوسيع المنصة أكثر.',
    ],
    stack: ['Elasticsearch', 'Redis', 'MongoDB', 'Node.js'],
    href: null,
    mock: 'ai-search',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'serverless-ai-chatbot',
    title: 'روبوت محادثة ذكاء اصطناعي بلا خوادم',
    tag: 'هندسة الذكاء الاصطناعي · AWS RAG',
    role: 'مساهم، أنظمة الذكاء الاصطناعي',
    period: 'مطلع 2026',
    blurb: 'مساعد RAG بلا خوادم قائم على Lambda مع مراسلة WhatsApp Business وذاكرة محادثة.',
    overview:
      'جمع هذا العمل بين الاستكشاف الأوّلي والتصليب الإنتاجي لروبوت محادثة بلا خوادم — مساعد معزَّز بالاسترجاع يعمل على AWS Lambda، يمكن الوصول إليه عبر WhatsApp Business، وبذاكرة محادثة كافية للحفاظ على سلسلة دعم حقيقية.',
    details: [
      'AWS Lambda وAPI Gateway WebSocket وDynamoDB وSQS وS3 وCloudFront وCognito.',
      'تلخيص المحادثة وإدارة ديناميكية للتوجيهات.',
      'تكامل مراسلة WhatsApp Business وكشف النطاق.',
      'إصلاحات لمسار الاستدلال للتطبيع وخطوط الاقتراحات.',
    ],
    impact: [
      'تلخيص المحادثة قلّص السياق المتكرر في سلاسل الدعم الطويلة.',
      'تكامل WhatsApp Business وسّع الوصول إلى ما بعد أداة الويب.',
      'إصلاحات الاستدلال حسّنت دقة التطبيع والاقتراح في الإنتاج.',
    ],
    stack: ['AWS Lambda', 'RAG', 'DynamoDB', 'WebSocket'],
    href: null,
    mock: 'chatbot',
    tier: 'featured',
    category: 'industry',
  },
  {
    slug: 'invoice-ms',
    title: 'الخادم الخلفي InvoiceMS',
    tag: 'Malaysia Airlines · Azure Functions',
    role: 'مهندس منصّات',
    period: 'مطلع 2026',
    blurb: '19 دالة Azure Functions تدير إنشاء الفواتير وتقارير الإدارة وتصدير الفواتير الإلكترونية لعمليات الطيران.',
    overview:
      'InvoiceMS هو الخادم الخلفي القائم على Azure Functions v4 خلف نظام فوترة Malaysia Airlines — ينشئ الفواتير، ويمنح الإداريين قوائم فواتير قابلة للبحث وطرق عرض التفاصيل، ويولّد تقارير CSV وExcel والفواتير الإلكترونية التي يعتمد عليها قسم المالية.',
    details: [
      '19 دالة (12 مشغِّل HTTP و7 مشغِّلات مؤقتة) هُجِّرت إلى نموذج البرمجة v4 في Azure Functions.',
      'إنشاء الفواتير، وطرق عرض قوائم/تفاصيل الفواتير للإداريين، ومعالجة إتمام المعاملات.',
      'توليد تقارير Excel يومية وأسبوعية، وتصدير CSV، وتوليد CSV للفواتير الإلكترونية للامتثال.',
      'رسائل بريد آلية للتقارير وإشعارات الأخطاء، تشمل تقارير كتالوج ومعاملات MHVoucher.',
    ],
    impact: [
      'هُجِّرت دوال v3 القديمة إلى v4 دون كسر المسارات أو الطرق أو الجداول القائمة.',
      'حصل فريقا المالية والإدارة على طرق عرض فواتير قابلة للبحث بدل البحث اليدوي في الجداول.',
      'أبقى تصدير CSV للفواتير الإلكترونية المنصة متوافقة مع متطلبات تقارير الامتثال.',
    ],
    stack: ['Azure Functions', 'Node.js', 'Prisma', 'Excel/CSV'],
    href: null,
    mock: 'dashboard',
    tier: 'more',
    category: 'industry',
  },
  {
    slug: 'vehicles-plate-detection',
    title: 'كشف لوحات المركبات',
    tag: 'GitHub · رؤية حاسوبية',
    role: 'مطوّر مستقل',
    period: '2024',
    blurb: 'خط كشف لوحات مركبات قائم على YOLOv8 مبني لصور من العالم الحقيقي.',
    overview:
      'مشروع رؤية حاسوبية يطبّق كشف YOLOv8 على لوحات المركبات — نفس نهج الكشف خلف بحثي المنشور في كشف السطو المسلّح عبر كاميرات المراقبة، مطبَّقاً هنا على مشكلة مستقلة مختلفة.',
    details: [
      'خط كشف من طرف إلى طرف من الصورة الخام حتى تحديد موضع اللوحة.',
      'تقييم النموذج بما يتوافق مع منهجية منشور CCTV / YOLOv8.',
    ],
    impact: ['خط كشف عامل منشور كمستودع عام قابل للتكرار.'],
    stack: ['Python', 'YOLOv8', 'CV', 'Detection'],
    href: 'https://github.com/yahya-khamaisi/Vehicles-plate-detection-app',
    mock: 'plate',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'albert-roi',
    title: 'Albert Roi',
    tag: 'علامة تجارية · موقع مباشر',
    role: 'مصمّم ومطوّر',
    period: '2023',
    blurb: 'تجربة هبوط لعلامة عطور فاخرة، يُوصَل إليها بمسح رمز QR على عبوة المنتج.',
    overview:
      'Albert Roi مشروع علامة تجارية صغير أُخذ من الفكرة إلى موقع مباشر بنطاق مخصص — سرد قصة المنتج لنسختين رجالية ونسائية، مصمَّم ليُكتشَف عبر العبوة لا عبر البحث.',
    details: [
      'سرد قصة المنتج لنسختين رجالية ونسائية.',
      'أصول QR وEAN جاهزة للطباعة منسّقة مع السطح الرقمي للعلامة.',
      'موقع ثابت مُنشَر على نطاق مخصص عبر GitHub Pages.',
    ],
    impact: ['شُحنت عبوة الطباعة والتجربة الرقمية للعلامة كنظام منسّق واحد.'],
    stack: ['HTML', 'CSS', 'GitHub Pages'],
    href: 'https://albert-roi.com/',
    mock: 'albert',
    tier: 'more',
    category: 'personal',
  },
  {
    slug: 'alinaworld',
    title: 'AlinaWorld',
    tag: 'شخصي · لعبة macOS',
    role: 'مطوّر منفرد',
    period: '2024',
    blurb: 'لعبة منصّات ثنائية الأبعاد أصلية على macOS — 27 مهمة عبر تسعة عوالم، مبنية منفرداً بـ Swift وSpriteKit.',
    overview:
      'AlinaWorld لعبة منصّات كاملة بُنيت منفرداً من طرف إلى طرف — من تصميم المهام حتى فيزياء الحركة المضبوطة يدوياً — كتطبيق macOS أصلي، لا غلاف ويب.',
    details: [
      'إحساس فيزياء مخصص: تسارع، عدو، قفز متغير، وهجمات دهس.',
      'خريطة مهام، تبديل ملء الشاشة، وتحكّم بلوحة المفاتيح أولاً لـ macOS 13+.',
      'مُحزَّمة كتطبيق .app أصلي عبر سكربتات بناء Swift Package Manager.',
    ],
    impact: [
      'ضُبطت ميكانيكا الحركة بالإحساس لا بإعدادات الإطار الافتراضية.',
      'مُحزَّمة كتطبيق أصلي قابل للتوزيع، لا مجرد نموذج أولي.',
    ],
    stack: ['Swift', 'SpriteKit', 'macOS'],
    href: null,
    mock: 'game',
    tier: 'more',
    category: 'personal',
  },
  {
    slug: 'claims-summary-ai',
    title: 'AI لتلخيص المطالبات',
    tag: 'Takaful Emarat · LLM',
    role: 'مساهم، خدمات الذكاء الاصطناعي',
    period: '2026 – حتى الآن',
    blurb: 'خدمة LLM تحوّل بيانات المطالبات الخام إلى ملخصات سردية قابلة للقراءة مع مخرجات PDF.',
    overview:
      'AI لتلخيص المطالبات خدمة مساندة ضمن برنامج الذكاء الاصطناعي في Takaful Emarat — تأخذ بيانات المطالبات المهيكلة وتنتج ملخصات سردية يقرؤها المراجعون في ثوانٍ، مُصيَّرة مباشرةً إلى PDF لتناسب المسارات القائمة.',
    details: [
      'خط توليد سردي مقترن ببرنامج بوابة TE AI.',
      'مخرجات PDF مبنية للاستخدام المباشر في مسارات المراجعة التشغيلية والاكتتابية.',
      'جزء من محفظة احتضان أوسع للذكاء الاصطناعي تغطي التجديد والمطالبات والاكتتاب.',
    ],
    impact: [
      'حلّت الملخصات السردية محل الكتابة اليدوية للمراجعين.',
      'تصيير PDF أدخل المخرجات مباشرةً في المسارات التشغيلية القائمة.',
    ],
    stack: ['LLM', 'PDF', 'Azure', 'FastAPI'],
    href: null,
    mock: 'chatbot',
    tier: 'more',
    category: 'industry',
  },
  {
    slug: 'te-ocr-backend',
    title: 'الخادم الخلفي TE OCR',
    tag: 'Takaful Emarat · OCR',
    role: 'مهندس خادم خلفي',
    period: '2026 – حتى الآن',
    blurb: 'خدمة OCR خلفية تستخرج النص من المستندات عبر رحلات العملاء B2B وB2C.',
    overview:
      'تتولّى هذه الخدمة استخراج OCR لمسارات المستندات الموجَّهة للعملاء في Takaful Emarat — تحوّل المستندات الممسوحة والنماذج المرفوعة إلى نص مهيكل تستخدمه خدمات المطالبات والاكتتاب اللاحقة.',
    details: [
      'واجهات برمجية خلفية مخصصة لاستخراج OCR لرحلات مستندات B2B وB2C.',
      'تغذّي نصاً مهيكلاً إلى مسارات المطالبات والاكتتاب اللاحقة.',
    ],
    impact: ['أزالت الإدخال اليدوي للبيانات من رحلات العملاء كثيفة المستندات.'],
    stack: ['Python', 'OCR', 'Azure'],
    href: null,
    mock: 'api',
    tier: 'more',
    category: 'industry',
  },
  {
    slug: 'pern-analytics',
    title: 'لوحة تحليلات PERN',
    tag: 'CoolRIOTS · تحليلات',
    role: 'مهندس full-stack',
    period: '2023 – 2024',
    blurb: 'لوحة PostgreSQL وExpress وReact وNode مبنية لتصوير بيانات أسرع بنحو 25%.',
    overview:
      'تقرن لوحة التحليلات هذه لـ CoolRIOTS مخطط PostgreSQL مضبوطاً بواجهة React مبنية للتعامل مع رسوم تشغيلية أكثف دون تباطؤ — نوع عمل الـ full-stack الذي يقف بهدوء خلف تقارير الفريق اليومية.',
    details: [
      'تصميم مخطط SQL وتجميع خلفي لتقارير سريعة الاستجابة.',
      'واجهة React مضبوطة لرسوم ومرشحات تشغيلية أكثف.',
    ],
    impact: [
      'تصوير بيانات أسرع بنحو 25% عبر التجميع الخلفي.',
      'دعم تصميم المخطط رسوماً أكثف دون إبطاء الاستعلامات.',
    ],
    stack: ['PostgreSQL', 'Express', 'React', 'Node.js'],
    href: null,
    mock: 'dashboard',
    tier: 'more',
    category: 'industry',
  },
  {
    slug: 'journify-cms',
    title: 'نظام Journify لإدارة المحتوى',
    tag: 'Malaysia Airlines · Laravel',
    role: 'مساهم',
    period: '2024 – 2025',
    blurb: 'تحسينات نظام إدارة محتوى Laravel للمحتوى السياحي القائم على المسارات والمقالات والوجهات.',
    overview:
      'إلى جانب الوسيط، يُعدّ نظام إدارة المحتوى هذا بـ Laravel المكان الذي يدير فيه فريق المحتوى السياحي في Malaysia Airlines المسارات والمقالات وصفحات الوجهات. أبقى عملي الميزات الجديدة تُشحن دون زعزعة تدفقات المحتوى القائمة.',
    details: [
      'ميزات مدركة للوجهات، وترحيلات، وواجهات برمجية قائمة على التصنيف.',
      'إصلاحات اتساق دورة حياة الخطة وإصلاحات UI/UX إنتاجية.',
      'إصدارات منسّقة إلى جانب فريق وسيط Journify.',
    ],
    impact: [
      'شُحنت ميزات جديدة مدركة للوجهات دون كسر تدفقات المحتوى القائمة.',
      'قلّلت إصلاحات دورة الحياة ومعالجة البيانات مشكلات الواجهة الإنتاجية المتكررة.',
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'CMS'],
    href: null,
    mock: 'cms',
    tier: 'more',
    category: 'earlier',
  },
  {
    slug: 'magento-continuity',
    title: 'استمرارية منصة Magento',
    tag: 'Journify · Magento 2',
    role: 'مساهم',
    period: '2024 – 2025',
    blurb: 'هندسة استمرارية على خادم Magento 2 خلفي — مزامنة البحث، وخطافات الويب، واستقرار الكتالوج.',
    overview:
      'مع انتقال الأولوية إلى خدمات أحدث في أماكن أخرى، ظلّ خادم Magento 2 الخلفي بحاجة للبقاء آمناً إنتاجياً. عبر أكثر من 212 التزام، تمحور العمل حول إبقاء مزامنة البحث وخطافات الويب وأتمتة SEO موثوقة، لا إضافة سطح جديد.',
    details: [
      'مزامنة البحث (GlobalSearchSync) وتكاملات خطافات الويب.',
      'أتمتة SEO ومسارات التقارير.',
      'إصلاحات جذرية على مسارات الكتالوج والطلبات الحرجة إنتاجياً.',
    ],
    impact: [
      'أكثر من 212 التزام أبقت خادماً خلفياً قديماً للتجارة الإلكترونية آمناً إنتاجياً.',
      'حلّت الإصلاحات الجذرية مشكلات الكتالوج والطلبات المتكررة.',
    ],
    stack: ['Magento 2', 'PHP', 'Webhooks', 'SEO'],
    href: null,
    mock: 'cms',
    tier: 'more',
    category: 'earlier',
  },
  {
    slug: 'wavelet-realtime',
    title: 'منصة Wavelet الفورية',
    tag: 'Wavelet Solutions',
    role: 'مهندس full-stack',
    period: 'سبتمبر 2021 – أغسطس 2022',
    blurb: 'منتج اتصال فوري full-stack بأكثر من 50 واجهة REST ومراسلة متعددة القنوات.',
    overview:
      'في Wavelet Solutions بنيتُ ميزات React وVue لمنتج اتصال فوري، مدعومة بطبقة واجهات برمجية كبيرة ومختبَرة جيداً بـ Node.js تتصل بـ Telegram وWhatsApp وFacebook.',
    details: [
      'ميزات React.js وVue.js لبيئات الاتصال الفوري.',
      'أكثر من 50 واجهة REST بـ Node.js / Express مع تكاملات Telegram وWhatsApp/Twilio وFacebook.',
      'تصميم مخطط PostgreSQL مع CI/CD آلي على Azure.',
    ],
    impact: [
      'أكثر من 50 واجهة REST دمجت مراسلة Telegram وWhatsApp وFacebook.',
      'تغطية اختبارات بنحو 90% أبقت الإصدارات متوقَّعة.',
    ],
    stack: ['React', 'Vue', 'Node.js', 'PostgreSQL'],
    href: null,
    mock: 'wavelet',
    tier: 'more',
    category: 'earlier',
  },
  {
    slug: 'karisma-apis',
    title: 'واجهات Karisma للخدمات المصغّرة',
    tag: 'Karisma System M',
    role: 'مهندس خادم خلفي',
    period: 'يوليو 2020 – أغسطس 2021',
    blurb: 'أكثر من 30 واجهة خدمات مصغّرة لعمليات CRUD ومعالجة الملفات والبث الفوري في بيئة منظَّمة.',
    overview:
      'أول دور خادم خلفي محترف لي — بناء واجهات خدمات مصغّرة حيث كانت الموثوقية والتعامل الآمن مع البيانات بأهمية تسليم الميزات، وحيث وُضِعت الأسس لعمل السحابة والذكاء الاصطناعي لاحقاً.',
    details: [
      'أكثر من 30 واجهة خدمات مصغّرة لعمليات CRUD ومعالجة الملفات والبث الفوري.',
      'عمل تحسين خلفي يستهدف أداء معالجة الصور.',
      'استكشاف أعطال الإنتاج مع تركيز قوي على الأمان.',
    ],
    impact: [
      'معالجة صور أسرع بنحو 40% بعد التحسين الخلفي.',
      'شُحنت أكثر من 30 واجهة خدمات مصغّرة إلى الإنتاج.',
    ],
    stack: ['Microservices', 'APIs', 'Streaming', 'Security'],
    href: null,
    mock: 'karisma',
    tier: 'more',
    category: 'earlier',
  },
  {
    slug: 'appointment-booking',
    title: 'حجز مواعيد متعدد المستأجرين',
    tag: 'GitHub · Full Stack',
    role: 'مطوّر مستقل',
    period: '2023',
    blurb: 'نظام جدولة مفتوح المصدر يستكشف عزل المستأجرين للحجوزات والتقاويم.',
    overview:
      'استكشاف عام لبنية الجدولة متعددة المستأجرين — كيفية إبقاء الحجوزات والتقاويم والتوافر معزولة بنظافة عبر المستأجرين دون تكرار البنية لكل عميل.',
    details: [
      'أنماط عزل المستأجرين للحجوزات والتقاويم والتوافر.',
      'مُنشَر كبنية مرجعية عامة قابلة لإعادة الاستخدام.',
    ],
    impact: ['بنية جدولة قابلة لإعادة الاستخدام منشورة لمطورين آخرين.'],
    stack: ['Full stack', 'Multi-tenant', 'APIs'],
    href: 'https://github.com/yahya-khamaisi/Multi-Tenant-Appointment-Booking-System',
    mock: 'booking',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'arrivo-backend',
    title: 'الخادم الخلفي Arrivo',
    tag: 'GitHub · خادم خلفي',
    role: 'مطوّر مستقل',
    period: '2022',
    blurb: 'مستودع خدمة خادم خلفي مستقل مبني حول منطق المنتج والواجهات على جانب الخادم.',
    overview:
      'تجربة منتج موجَّهة للخادم الخلفي — تصميم واجهات ومنطق على جانب الخادم طُوّر باستقلال عن عمل العملاء، ونُشر كتنفيذ مرجعي.',
    details: ['قاعدة كود خلفية عامة لتجارب المنتج/الواجهات.'],
    impact: ['خادم خلفي مرجعي عامل منشور على GitHub.'],
    stack: ['Backend', 'APIs'],
    href: 'https://github.com/yahya-khamaisi/arrivo-backend',
    mock: 'api',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'iaas',
    title: 'IAAS',
    tag: 'GitHub · بنية تحتية',
    role: 'مطوّر مستقل',
    period: '2022',
    blurb: 'استكشاف بنية تحتية كخدمة يتناول مفاهيم تجهيز السحابة.',
    overview:
      'غوص ذاتي في أنماط البنية التحتية كخدمة — عناصر التجهيز الأساسية ومفاهيم المنصة مُستكشَفة خارج مواعيد العملاء النهائية.',
    details: ['تجارب بنية تحتية ومنصة، منشورة علناً.'],
    impact: ['استكشاف موثَّق لمفاهيم تجهيز IaaS.'],
    stack: ['Cloud', 'IaaS'],
    href: 'https://github.com/yahya-khamaisi/IAAS',
    mock: 'middleware',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'freelancer-portfolio',
    title: 'بورتفوليو فريق مستقلين',
    tag: 'GitHub · بورتفوليو',
    role: 'مطوّر',
    period: '2021',
    blurb: 'موقع تسويقي مبني لعرض العمل المشترك وقدرات مجموعة مستقلين.',
    overview:
      'بناء واجهة أمامية لفريق مستقلين صغير — واجهة عرض مشتركة لبورتفوليوهم وخدماتهم الجماعية، موجَّهة للعملاء المحتملين.',
    details: ['واجهة أمامية تسويقية عامة لفريق مستقلين.'],
    impact: ['بورتفوليو مشترك منشور لمجموعة مستقلين.'],
    stack: ['HTML', 'CSS', 'Portfolio'],
    href: 'https://github.com/yahya-khamaisi/freelancer-team-portifolio',
    mock: 'portfolio',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'dating-app',
    title: 'تطبيق مواعدة',
    tag: 'GitHub · منتج',
    role: 'مطوّر مستقل',
    period: '2021',
    blurb: 'تجربة منتج مبكرة تستكشف تدفقات تطبيقات المواعدة وأسطح المطابقة.',
    overview:
      'إحدى تجارب المنتج الأولى للـ full-stack لدي — العمل عبر تدفقات المطابقة والملف الشخصي والاكتشاف كطريقة لتعلّم التفكير على مستوى المنتج، لا تصميم الواجهات فقط.',
    details: ['مشروع GitHub عام من عمل تعلّم/منتج مبكر.'],
    impact: ['استكشاف عملي مبكر لتجربة المطابقة والملف الشخصي.'],
    stack: ['Mobile/Web', 'Product'],
    href: 'https://github.com/yahya-khamaisi/Dating-APP',
    mock: 'dating',
    tier: 'more',
    category: 'github',
  },
  {
    slug: 'weather-app',
    title: 'تطبيق الطقس',
    tag: 'GitHub · تطبيق',
    role: 'مطوّر مستقل',
    period: '2020',
    blurb: 'تطبيق طقس صغير مدفوع بواجهة برمجية بُني كمشروع تعلّم مركَّز.',
    overview:
      'تطبيق طقس مُدمَج — يجلب بيانات التنبؤ ويعرضها عبر واجهة عميل بسيطة، بُني مبكراً لممارسة استهلاك واجهات الطرف الثالث بنظافة.',
    details: ['واجهة مدفوعة بواجهة برمجية بُنيت من طرف إلى طرف كمشروع تعلّم.'],
    impact: ['تكامل واجهة برمجية كامل وعامل شُحن من الصفر.'],
    stack: ['API', 'UI'],
    href: 'https://github.com/yahya-khamaisi/WeatherApp',
    mock: 'weather',
    tier: 'more',
    category: 'github',
  },
]

const home: Site['home'] = {
  topPicks: {
    kicker: 'أبرز الأعمال',
    title: 'الثلاثة التي تُظهر المدى',
    description:
      'بوابة ذكاء اصطناعي إنتاجية، ومنصة قسائم طيران، ووسيط Azure الذي يُبقي تطبيق سفر يعمل — تسليم full-stack على نطاق مؤسسي.',
  },
  capabilities: {
    kicker: 'كيف تتكامل القطع',
    title: 'هندسة ذكاء اصطناعي full-stack، من طرف إلى طرف',
    description:
      'الذكاء الاصطناعي التطبيقي في المركز، مع طبقات السحابة والبيانات والمنتج والوكلاء التي تضعه أمام مستخدمين حقيقيين — قابل للقياس في كل خطوة.',
    cardTitle: 'نظام واحد، خمس طبقات',
    cardText:
      'الذكاء الاصطناعي التطبيقي والوكلاء والسحابة والـ full stack والبيانات على خريطة واحدة. مرِّر المؤشر على أي عقدة لتتبّع كيف تتصل القطع.',
    careerFlowLabel: 'تدفّق المسيرة',
    sceneAria:
      'خريطة تفاعلية لنظام هندسة الذكاء الاصطناعي full-stack: الذكاء الاصطناعي التطبيقي، الوكلاء، السحابة، الـ full stack، والبيانات',
  },
}

const pageHero: Site['pageHero'] = {
  projects: { kicker: 'البورتفوليو', title: 'المشاريع', description: '' },
  experience: {
    kicker: 'المسيرة',
    title: 'الخبرة',
    description:
      'خمسة أدوار، الأحدث أولاً — من أول وظيفة خادم خلفي إلى إدارة محفظة ذكاء اصطناعي للتأمين.',
  },
  education: {
    kicker: 'الخلفية',
    title: 'التعليم',
    description:
      'ثلاث شهادات، خيط واحد — أساسيات هندسة الحاسوب، وماجستير نحو الأنظمة والذكاء الاصطناعي، ودكتوراه بدوام جزئي في الذكاء الاصطناعي التطبيقي تسير إلى جانب هندسة بدوام كامل.',
  },
  skills: {
    kicker: 'القدرات',
    title: 'المهارات',
    description:
      'هندسة full-stack لمنتجات الذكاء الاصطناعي — خوادم، استرجاع، بيانات، وسحابة. المستويات تقييم ذاتي، وكل مجال مرتبط بمشروع طُبّق فيه.',
  },
  research: {
    kicker: 'البحث',
    title: 'البحث والمنشورات',
    description:
      'المسار الثانوي: دكتوراه بدوام جزئي في الذكاء الاصطناعي التطبيقي للأنظمة الشبكية الموثوقة. يسير إلى جانب العمل الهندسي ويعيد الحُكم إليه.',
  },
  contact: { kicker: 'تواصل', title: 'لنتحدّث', description: '' },
}

const skillGroups: SkillGroup[] = [
  {
    title: 'الخوادم والواجهات البرمجية',
    icon: 'api',
    description:
      'مجموعة الأدوات الافتراضية لشحن خدمات موثوقة — من وكلاء FastAPI إلى بوابات NestJS الإدارية.',
    relatedProjectSlug: 'te-ai-portal',
    items: [
      { label: 'Python / FastAPI / Flask', icon: 'python', level: 5 },
      { label: 'Node.js / Express / NestJS', icon: 'code', level: 5 },
      { label: 'Azure Functions وواجهات REST', icon: 'cloud', level: 5 },
      { label: 'الخدمات المصغّرة وخطافات الويب', icon: 'network', level: 4 },
    ],
  },
  {
    title: 'الذكاء الاصطناعي والاسترجاع',
    icon: 'ai',
    description:
      'تحويل نماذج اللغة إلى ميزات منتج موثوقة لا عروض توضيحية — استرجاع وأدوات وحلقات تقييم.',
    relatedProjectSlug: 'coolriots-rag',
    items: [
      { label: 'ذكاء اصطناعي وكيلي / أنظمة RAG', icon: 'spark', level: 5 },
      { label: 'LangChain / OpenAI / Azure AI Foundry', icon: 'ai', level: 4 },
      { label: 'Milvus / ChromaDB / Elasticsearch', icon: 'search', level: 4 },
      { label: 'هندسة التوجيهات والتقييم', icon: 'chip', level: 4 },
    ],
  },
  {
    title: 'البيانات والسحابة',
    icon: 'cloud',
    description:
      'بيانات تبقى سريعة تحت الحِمل، وبنية سحابية لا توقظ أحداً الساعة الثالثة فجراً.',
    relatedProjectSlug: 'bexinsight',
    items: [
      { label: 'PostgreSQL / MongoDB / Redis', icon: 'database', level: 5 },
      { label: 'Container Apps / APIM / Queues', icon: 'cloud', level: 4 },
      { label: 'Docker وخطوط CI/CD', icon: 'docker', level: 4 },
      { label: 'تصميم المخططات وضبط الاستعلامات', icon: 'database', level: 5 },
    ],
  },
  {
    title: 'الـ Full Stack والمنتج',
    icon: 'react',
    description:
      'سطح المنتج الذي يُشحن عليه الذكاء الاصطناعي — بوابات، وأدوات قابلة للتضمين، والتحكّم بالوصول الذي يعتمد عليه المشغّلون.',
    relatedProjectSlug: 'reimbursement-portal',
    items: [
      { label: 'React / Next.js / TypeScript', icon: 'react', level: 4 },
      { label: 'البوابات الإدارية والأدوات القابلة للتضمين', icon: 'code', level: 4 },
      { label: 'أنماط RBAC / SSO / التدقيق', icon: 'security', level: 4 },
      { label: 'تصميم الواجهات والتكامل', icon: 'api', level: 5 },
    ],
  },
]

const researchToolkit: ResearchToolkit = {
  title: 'أدوات البحث',
  description:
    'تُستخدَم في مسار الدكتوراه، لا في التسليم اليومي.',
  items: [
    'خطوط محاكاة Python',
    'TensorFlow / Sionna',
    'YOLOv8 / رؤية حاسوبية',
    'أتمتة تجارب مونت كارلو',
  ],
}

const experience: Experience[] = [
  {
    company: 'Takaful Emarat',
    role: 'مهندس ذكاء اصطناعي أول',
    period: 'أبريل 2026 — حتى الآن',
    place: 'دبي، الإمارات',
    focus: 'ذكاء اصطناعي وكيلي · Azure · تأمين',
    summary:
      'إدارة التسليم المستمر لمحفظة الذكاء الاصطناعي والأتمتة في الشركة على Azure — وكلاء الاكتتاب والتجديد، وبوابة مطالبات الاسترداد، وذكاء المستندات.',
    highlights: [
      'إدارة بوابة TE AI — الاكتتاب الفردي، والاكتتاب الجماعي، وتجديد الوثائق — ببناء وتشغيل وكلاء على Azure AI Foundry.',
      'إدارة بوابة مطالبات الاسترداد من طرف إلى طرف: خادم خلفي FastAPI وواجهة Next.js لتقديم الأعضاء، ومراجعة المالية والعمليات، والتقارير.',
      'إدارة منصة OCR لرحلات مستندات B2B وB2C — تصنيف واستخراج مهيكل على Azure Document Intelligence.',
      'اقتراح وتسليم أتمتة وكلاء ذكاء اصطناعي جديدة للاكتتاب والمطالبات وأقسام أخرى، من المتطلبات حتى النشر والتسليم على Azure.',
    ],
    stack: ['Azure AI Foundry', 'FastAPI', 'Next.js', 'Azure', 'Agents'],
    mock: 'psa',
  },
  {
    company: 'Trinity Wizards',
    role: 'مهندس ذكاء اصطناعي / سحابة / خادم خلفي أول',
    period: 'يناير 2024 — مارس 2026',
    place: 'ماليزيا · هجين',
    focus: 'منصات طيران · Azure · واجهات برمجية',
    partner: 'AWS Platinum Partner',
    summary:
      'تسليم للعميل لمنصات السفر والقسائم في Malaysia Airlines — وسيط Azure، وبوابة إدارية بـ NestJS، واستقرار المنصة تحت نمو مستمر.',
    engagements: [
      {
        label: 'MHVoucher (Malaysia Airlines)',
        kind: 'منصة قسائم',
        points: [
          'واجهات برمجية بـ Node.js / Azure Functions للمخزون والاستبدال والإهداء والحملات، إضافةً إلى بوابة إدارية بـ NestJS بصلاحيات RBAC وسجل تدقيق.',
          'ضبط SQL وفهرسة وإشعارات فشل الاستبدال لإبقاء الاستعلامات عالية الحركة سريعة وفرق الدعم غير معطَّلة.',
        ],
      },
      {
        label: 'Journify (Malaysia Airlines)',
        kind: 'وسيط · نظام إدارة محتوى',
        points: [
          'وسيط Azure Functions ومعالجة مدفوعة بالطوابير لمحتوى المخطِّط والمسار والصلاحيات والوجهات على منصة حيّة ومتنامية.',
          'تحسينات نظام إدارة محتوى Laravel وإصلاحات استمرارية Magento 2 عبر مسارات الكتالوج ومزامنة البحث والطلبات.',
        ],
      },
    ],
    stack: ['Azure Functions', 'Node.js', 'NestJS', 'Laravel', 'SQL'],
    mock: 'trinity',
  },
  {
    company: 'CoolRIOTS',
    role: 'مهندس ذكاء اصطناعي أول',
    period: 'أغسطس 2022 — يناير 2024',
    place: 'سنغافورة · هجين',
    focus: 'RAG · بحث · تكامل آمن',
    partner: 'IBM Platinum Partner',
    summary:
      'بنية استرجاع وبحث نقلت الذكاء الاصطناعي من الدفاتر إلى الإنتاج — إجابات نماذج لغة مؤصَّلة، وبحث متعدد المستأجرين، وهوية بمستوى حكومي.',
    highlights: [
      'بناء منصات RAG واسترجاع على Python وFastAPI وLangChain وOpenAI وMilvus / ChromaDB، مدعومة بـ IBM Object Storage.',
      'قيادة واجهة BeXInsight للبحث الشامل متعدد المستأجرين (Elasticsearch وRedis وMongoDB) — زمن استعلام أقل بنحو 60% عبر الفهرسة وضبط خطة الاستعلام.',
      'دمج واجهة هوية MyInfo السنغافورية بمصادقة متعددة الطبقات وتبادل بيانات متسق عبر الخدمات.',
      'بناء خدمات تحليلات وتجميع حسّنت استجابة اللوحات وأداء التقارير.',
    ],
    stack: ['FastAPI', 'LangChain', 'Milvus', 'Elasticsearch', 'OpenAI'],
    mock: 'ai-search',
  },
  {
    company: 'Wavelet Solutions',
    role: 'مهندس Full-Stack',
    period: 'سبتمبر 2021 — أغسطس 2022',
    place: 'ماليزيا · في الموقع',
    focus: 'منتج فوري · واجهات برمجية',
    summary:
      'دور منتج مبكر — أسطح اتصال فوري وحوزة واجهات برمجية كبيرة ومختبَرة جيداً.',
    highlights: [
      'تسليم ميزات React.js وVue.js لبيئات الاتصال الفوري.',
      'بناء أكثر من 50 واجهة REST بـ Node.js / Express مع تكاملات Telegram وWhatsApp/Twilio وFacebook.',
      'تصميم مخططات PostgreSQL وأتمتة CI/CD على Azure مع الحفاظ على تغطية اختبارات بنحو 90%.',
    ],
    stack: ['React', 'Vue', 'Node.js', 'PostgreSQL', 'Azure'],
    mock: 'wavelet',
  },
  {
    company: 'Karisma System M',
    role: 'مهندس خادم خلفي',
    period: 'يوليو 2020 — أغسطس 2021',
    place: 'ماليزيا · في الموقع',
    focus: 'خدمات مصغّرة · أداء',
    summary:
      'أول دور خادم خلفي — عمل خدمات وأداء في بيئة منظَّمة كان التعامل الآمن مع البيانات فيها غير قابل للتفاوض.',
    highlights: [
      'بناء أكثر من 30 واجهة خدمات مصغّرة لعمليات CRUD ومعالجة الملفات والبث الفوري.',
      'تحسين أداء معالجة الصور بنحو 40% عبر التحسين الخلفي.',
      'استكشاف أعطال الإنتاج مع تركيز قوي على الأمان وموثوقية الخدمة.',
    ],
    stack: ['Microservices', 'APIs', 'Performance', 'Security'],
    mock: 'karisma',
  },
]

const education: EducationEntry[] = [
  {
    school: 'Sunway University',
    degree: 'دكتوراه في الحوسبة — ذكاء اصطناعي تطبيقي',
    period: 'يناير 2024 — حتى الآن',
    location: 'سيلانغور، ماليزيا',
    note: 'بدوام جزئي، إلى جانب هندسة بدوام كامل. ذكاء اصطناعي وتعلّم آلة تطبيقي للأنظمة الشبكية الموثوقة (Factory6G).',
    icon: 'research',
    status: 'in-progress',
    focus: 'الذكاء الاصطناعي وتعلّم الآلة التطبيقي للموثوقية والجدولة تحت ميزانيات صارمة لزمن الاستجابة',
    highlights: [
      'يتمحور البحث حول Factory6G، منصة Docker-first لاختبار الجدولة والموثوقية بمساعدة الذكاء الاصطناعي تحت حِمل مُحاكى.',
      'تغطي التجارب التقدير والجدولة وتحليل مونت كارلو باستخدام Sionna وTensorFlow.',
      'تمتد الأعمال المنشورة إلى تصنيف URLLC للصناعة 5.0 والرؤية الحاسوبية وأمن VoIP وأخلاقيات الذكاء الاصطناعي.',
      'يسير البحث بالتوازي مع التسليم بدوام كامل؛ يُغذّي الهندسة بدل أن يحلّ محلها.',
    ],
    relatedProjectSlug: 'factory6g',
  },
  {
    school: 'UNIMY',
    degree: 'ماجستير علوم الحاسوب',
    period: '2021 — 2022',
    location: 'ماليزيا',
    note: 'معدل 3.68 · الأول على القسم',
    icon: 'education',
    status: 'complete',
    gpa: '3.68 / 4.0',
    honors: ['الأول على القسم'],
    focus: 'هندسة برمجيات متقدمة، وأنظمة موزَّعة، وتعلّم آلة تطبيقي',
    highlights: [
      'مقررات دراسات عليا تشمل الأنظمة الموزَّعة والخوارزميات المتقدمة وتعلّم الآلة التطبيقي.',
      'مال مشروع التخرج نحو بنية الخادم الخلفي والأنظمة المدفوعة بالبيانات — أساس مباشر لهندسة السحابة والذكاء الاصطناعي التي تلت.',
      'أنهيتُ الأول على القسم، ما رسم القفزة إلى دور خادم خلفي محترف مباشرةً بعد التخرج.',
    ],
  },
  {
    school: 'An-Najah National University',
    degree: 'بكالوريوس هندسة الحاسوب',
    period: '2016 — 2020',
    location: 'نابلس، فلسطين',
    note: 'معدل 3.83 · الأول على القسم',
    icon: 'chip',
    status: 'complete',
    gpa: '3.83 / 4.0',
    honors: ['الأول على القسم'],
    focus: 'أساسيات هندسة الحاسوب: الأنظمة والشبكات والتصميم المضمَّن',
    highlights: [
      'مقررات أساسية في هياكل البيانات وشبكات الحاسوب والأنظمة المضمَّنة وتصميم المنطق الرقمي.',
      'قدّم مشروع التخرج تطوير الـ full-stack وأشعل الانتقال إلى هندسة الخادم الخلفي.',
      'تخرجتُ الأول على القسم، والتحقتُ مباشرةً بأول دور خادم خلفي في Karisma System M.',
    ],
  },
]

const publications: Publication[] = [
  {
    title: 'كشف السطو المسلّح عبر كاميرات المراقبة باستخدام YOLOv8',
    venue: 'AIP Conference Proceedings، 2025',
    href: 'https://pubs.aip.org/aip/acp/article-abstract/3367/1/020006/3367869/CCTV-armed-robbery-detection-with-YOLOv8',
    icon: 'chip',
    note: 'يطبّق نفس نهج الكشف خلف مشروع كشف لوحات المركبات.',
  },
  {
    title:
      'URLLC لصناعة 5.0 الممكَّنة بـ 6G: تصنيف للبنى والتقنيات متعددة الطبقات والتطبيقات الحرجة زمنياً',
    venue: 'arXiv:2510.08080، 2025',
    href: 'https://arxiv.org/abs/2510.08080',
    icon: 'network',
    note: 'يستند مباشرةً إلى تجارب Factory6G ونتائجها متعددة الطبقات.',
  },
  {
    title:
      'مراجعة وتعزيز أمن VoIP: تحديد الثغرات واقتراح حلول متكاملة',
    venue: 'Journal of Telecommunications and the Digital Economy، 2024',
    href: 'https://www.researchgate.net/publication/387551333_Review_and_Enhancement_of_VoIP_Security_Identifying_Vulnerabilities_and_Proposing_Integrated_Solutions',
    icon: 'security',
    note: 'مراجعة موجَّهة للأمن لثغرات VoIP وتخفيفها.',
  },
  {
    title: 'الأخلاقيات ودورها في مستقبل تطوير الذكاء الاصطناعي',
    venue: 'International Conference on Frontier of Digital Transformation، 2023',
    href: 'https://pubs.aip.org/aip/acp/article-abstract/2808/1/040003/2891836/Ethics-and-its-role-in-the-future-of-AI',
    icon: 'ai',
    note: 'ورقة موقف حول ممارسات تطوير الذكاء الاصطناعي المسؤول.',
  },
]

/* ---- systems (career graph) ---- */

const domainText: Record<string, { label: string; sub: string; title: string; text: string; story: string }> = {
  ai: {
    label: 'الذكاء الاصطناعي التطبيقي',
    sub: 'RAG · وكلاء · تقييم',
    title: 'الذكاء الاصطناعي التطبيقي',
    text: 'مركز العمل: RAG ونماذج اللغة وأدوات الوكلاء وحلقات التقييم التي تُبقيها صادقة في الإنتاج.',
    story:
      'الذكاء الاصطناعي التطبيقي هو المحور — كل قدرة أخرى موجودة لإيصال وكيل أو نظام استرجاع بأمان إلى مستخدمين حقيقيين.',
  },
  agents: {
    label: 'وكلاء الذكاء الاصطناعي',
    sub: 'ReAct · MCP · أدوات',
    title: 'أنظمة الوكلاء',
    text: 'مسارات عمل وكيلية إنتاجية ببوابات أدوات وتنسيق جلسات وحواجز أمان وتسليمات دفع.',
    story:
      'الوكلاء يحوّلون الذكاء الاصطناعي إلى منتجات قابلة للتشغيل — أدوات MCP وحالة جلسة وتسليمات آمنة إلى الواجهات والأدوات (مثل بوابة TE AI).',
  },
  cloud: {
    label: 'السحابة',
    sub: 'Azure · واجهات · طوابير',
    title: 'المنصات السحابية',
    text: 'Azure Functions وContainer Apps وAPIM وطوابير وأسطح واجهات موثوقة للتسليم المؤسسي.',
    story:
      'السحابة هي كيف تُشحن الأنظمة القوية على نطاق واسع — Functions وContainer Apps وAPIM وطوابير تحت حِمل حقيقي.',
  },
  fullstack: {
    label: 'Full Stack',
    sub: 'واجهة · Nest · FastAPI',
    title: 'منتجات Full-stack',
    text: 'أنظمة NestJS / React / FastAPI — بوابات إدارية وأدوات قابلة للتضمين وأدوات تشغيلية.',
    story:
      'تسليم الـ full-stack يجعل الذكاء الاصطناعي والواجهات قابلة للاستخدام — بوابات وأدوات وأدوات مشغّلين يثق بها الناس.',
  },
  data: {
    label: 'البيانات والاسترجاع',
    sub: 'Postgres · متجهات · بحث',
    title: 'البيانات والاسترجاع',
    text: 'الأساس تحت كل ميزة ذكاء اصطناعي — Postgres ومخازن متجهات وفهارس بحث مضبوطة للإجابة بسرعة والبقاء معزولة لكل مستأجر.',
    story:
      'البيانات والاسترجاع يحدّدان إن كان لدى الوكيل ما يقوله فعلاً — الفهرسة عند الاستيراد، والبحث المتجهي، وضبط الاستعلامات تحت الحِمل.',
  },
}

const flowLabels: Record<string, string> = {
  tools: 'أدوات',
  serve: 'تقديم',
  UX: 'تجربة',
  retrieve: 'استرجاع',
  deploy: 'نشر',
  widget: 'أداة',
  API: 'واجهة',
  index: 'فهرسة',
}

const arSystems: Site['systems'] = {
  domains: careerDomains.map((d) => ({ ...d, ...domainText[d.id] })),
  flows: careerFlows.map((f) => ({ ...f, label: flowLabels[f.label] ?? f.label })),
  proof: careerProof,
  idleStory:
    'مرِّر المؤشر على أي عقدة لترى كيف تتصل القطع لإيصال نظام ذكاء اصطناعي إلى الإنتاج.',
}

/* ---- diagrams ---- */

const diagramTerms: Record<string, string> = {
  // column labels
  Ingest: 'الاستيراد',
  Portal: 'البوابة',
  '5 agents · AI Foundry': '5 وكلاء · AI Foundry',
  State: 'الحالة',
  Actors: 'الجهات',
  Services: 'الخدمات',
  Data: 'البيانات',
  Signals: 'الإشعارات',
  Triggers: 'المشغّلات',
  Runtime: 'بيئة التشغيل',
  Outputs: 'المخرجات',
  'Planner APIs': 'واجهات المخطِّط',
  Queue: 'الطابور',
  Workers: 'المعالِجات',
  Store: 'التخزين',
  Members: 'الأعضاء',
  Backend: 'الخادم الخلفي',
  Operations: 'العمليات',
  Index: 'الفهرسة',
  Retrieve: 'الاسترجاع',
  Answer: 'الإجابة',
  Query: 'الاستعلام',
  Serve: 'التقديم',
  Channels: 'القنوات',
  Compute: 'الحوسبة',
  'Memory + docs': 'الذاكرة والمستندات',
  Configure: 'الإعداد',
  Run: 'التشغيل',
  Aggregate: 'التجميع',
  Report: 'التقارير',
  // node labels
  'Files upload': 'رفع الملفات',
  'Public renewal widget': 'أداة تجديد عامة',
  'Underwriting — generate': 'الاكتتاب — التوليد',
  'Underwriting — Ask': 'الاكتتاب — السؤال',
  'Policy renewal': 'تجديد الوثيقة',
  'Customer apps': 'تطبيقات العملاء',
  'Support & merchant staff': 'فريق الدعم والتجّار',
  'Redemption-failure alerts': 'تنبيهات فشل الاستبدال',
  'Operational reports': 'تقارير تشغيلية',
  'Invoice database': 'قاعدة بيانات الفواتير',
  'Report & error emails': 'رسائل التقارير والأخطاء',
  'Plans · places · permissions': 'الخطط · الأماكن · الصلاحيات',
  'Filter · sort · paginate': 'تصفية · ترتيب · تصفّح',
  'Queue-triggered functions': 'دوال يُشغّلها الطابور',
  'Tripmate permission flows': 'مسارات صلاحيات Tripmate',
  'Content store': 'مخزن المحتوى',
  'Redis cache': 'ذاكرة Redis المؤقتة',
  'Claim submission': 'تقديم المطالبة',
  'Document upload': 'رفع المستندات',
  'OTP status lookup': 'استعلام الحالة عبر OTP',
  'FastAPI services': 'خدمات FastAPI',
  'Claims review': 'مراجعة المطالبات',
  'PO batch handling': 'معالجة دفعات أوامر الشراء',
  'Excel export': 'تصدير Excel',
  Documents: 'المستندات',
  'Chunk + embed': 'التقطيع والتضمين',
  'Top-k vector search': 'بحث متجهي لأعلى النتائج',
  'MyInfo identity': 'هوية MyInfo',
  'Grounded reply + sources': 'رد موثَّق بالمصادر',
  'Tenant request': 'طلب المستأجر',
  'Tenant-scoped filter': 'تصفية على مستوى المستأجر',
  'MongoDB source': 'مصدر MongoDB',
  'Conversation summariser': 'ملخِّص المحادثة',
  'DynamoDB memory': 'ذاكرة DynamoDB',
  'S3 knowledge': 'معرفة S3',
  'RAG response': 'استجابة RAG',
  'Scenario config': 'إعداد السيناريو',
  'Sionna / TensorFlow model': 'نموذج Sionna / TensorFlow',
  'Monte Carlo sweep': 'مسح مونت كارلو',
  Checkpointing: 'نقاط الحفظ',
  'Metric aggregation': 'تجميع المقاييس',
  'Cross-layer analysis': 'تحليل متعدد الطبقات',
  'Plots + tables for papers': 'رسوم وجداول للأوراق البحثية',
  'Next.js 15 portal': 'بوابة Next.js 15',
  // sub labels
  'at upload': 'عند الرفع',
  'Files · Generate · Ask · Reports': 'الملفات · التوليد · السؤال · التقارير',
  'catalogue · redemption · gifting · campaigns': 'الكتالوج · الاستبدال · الإهداء · الحملات',
  'RBAC · audit log': 'RBAC · سجل تدقيق',
  'tuned indexes': 'فهارس محسَّنة',
  'invoice CRUD · admin list / detail': 'عمليات الفواتير · قوائم وتفاصيل الإدارة',
  'daily & weekly reports': 'تقارير يومية وأسبوعية',
  'programming model v4': 'نموذج البرمجة v4',
  'multi-layer auth': 'مصادقة متعددة الطبقات',
  'RBAC · dept / TPA mappings': 'RBAC · ربط الأقسام / جهات الإدارة الخارجية',
}

const diagramCaptions: Record<string, string> = {
  'te-ai-portal': 'مستندات تدخل، وإجابات مؤصَّلة تخرج — بوابة واحدة فوق خمسة وكلاء مُستضافين.',
  mhvoucher: 'واجهات للعملاء وبوابة إدارية مُدقَّقة فوق قاعدة بيانات قسائم واحدة.',
  'invoice-ms': '19 دالة Azure Functions — 12 عبر HTTP و7 على مؤقتات — خلف فوترة الطيران.',
  'journify-middleware': 'دوال Azure Functions مدفوعة بالطوابير تُبقي منصة سفر حيّة محدَّثة.',
  'reimbursement-portal': 'خادم خلفي واحد يخدم بوابة مطالبات عامة ووحدة تحكّم تشغيلية داخلية.',
  'coolriots-rag': 'إجابات نماذج اللغة مؤصَّلة في مستندات مفهرسة، لا توليد مفتوح.',
  bexinsight: 'بحث شامل معزول المستأجرين، أسرع بنحو 60% بعد ضبط الفهرسة والاستعلامات.',
  'serverless-ai-chatbot': 'مساعد RAG بلا خوادم يمكن الوصول إليه من الويب ومن WhatsApp Business.',
  factory6g: 'عمليات مسح مونت كارلو قابلة للتكرار من الإعداد حتى رسوم جاهزة للأوراق البحثية.',
}

const diagramFootnotes: Record<string, string> = {
  bexinsight:
    'بنية تمثيلية — انخفاض زمن الاستجابة بنحو 60% مقيس؛ أما التخطيط فتوضيحي.',
}

const DEFAULT_FOOTNOTE_AR =
  'بنية تمثيلية — توضيحية، ليست بيانات إنتاج ولا نسخة طبق الأصل من الأدوات الداخلية.'

function tr(s: string): string {
  return diagramTerms[s] ?? s
}

const diagrams: Record<string, Diagram> = Object.fromEntries(
  Object.entries(projectDiagrams).map(([slug, d]) => [
    slug,
    {
      caption: diagramCaptions[slug] ?? d.caption,
      footnote: diagramFootnotes[slug] ?? DEFAULT_FOOTNOTE_AR,
      columns: d.columns.map((c) => ({
        label: tr(c.label),
        nodes: c.nodes.map((n) => ({
          ...n,
          label: tr(n.label),
          sub: n.sub ? tr(n.sub) : undefined,
        })),
      })),
    },
  ]),
)

const ui: Ui = {
  langName: 'English',
  langSwitchTo: 'Switch to English',
  featured: 'مميّز',
  projectDetailsAria: (title) => `${title} — تفاصيل المشروع`,
  skipToContent: 'تخطَّ إلى المحتوى',
  openMenu: 'افتح القائمة',
  closeMenu: 'أغلق القائمة',
  primaryNav: 'التنقّل الرئيسي',
  openToConversations: 'منفتح للحديث',
  backToTop: 'العودة للأعلى',
  builtWith: 'مبني بـ React وTypeScript وVite',
  breadcrumb: 'مسار التنقّل',
  projectsCrumb: 'المشاريع',
  adjacentProjects: 'مشاريع مجاورة',
  previous: 'السابق',
  next: 'التالي',
  projectNotFound: 'المشروع غير موجود',
  projectNotFoundBody: 'هذا المُعرِّف لا يطابق مشروعاً في البورتفوليو.',
  backToProjects: 'العودة إلى المشاريع',
  seeProjects: 'شاهد المشاريع',
  downloadCv: 'حمّل السيرة الذاتية',
  contact: 'تواصل',
  contactMe: 'تواصل معي',
  viewAllProjects: 'كل المشاريع',
  discussThisWork: 'ناقش هذا العمل',
  viewOnGithub: 'شاهد على GitHub',
  visitLiveSite: 'زُر الموقع المباشر',
  projectPage: 'صفحة المشروع',
  seeRelatedProject: 'شاهد المشروع المرتبط',
  seeItInAProject: 'شاهده في مشروع',
  seeTheResearch: 'شاهد البحث',
  overview: 'نظرة عامة',
  architecture: 'البنية',
  whatShipped: 'ما تم تسليمه',
  impact: 'الأثر',
  stack: 'التقنيات',
  atAGlance: 'لمحة سريعة',
  role: 'الدور',
  timeline: 'المدة',
  track: 'المسار',
  heroEyebrow: (location) => `مهندس ذكاء اصطناعي أول · ${location} · منفتح للحديث`,
  filterProjects: 'تصفية المشاريع',
  searchProjects: 'ابحث في المشاريع',
  searchPlaceholder: 'ابحث في المشاريع والعملاء والتقنيات…',
  showingCount: (shown, total) => `عرض ${shown} من ${total} مشروعاً`,
  noMatch: (query, filtered) =>
    `لا مشاريع تطابق "${query}"${
      filtered ? ' ضمن هذا المرشّح' : ''
    }. جرّب كلمة بحث مختلفة أو امسح المرشّح.`,
  projectsDescription: (total) =>
    `${total} مشروعاً عبر الذكاء الاصطناعي المؤسسي، وتسليم الـ full-stack، والمصادر المفتوحة، ومسار البحث — مرتَّبة حسب الوزن المهني. صفِّ حسب المسار أو ابحث حسب الاسم أو العميل أو التقنيات.`,
  contactDescription: (location) =>
    `منفتح للتعاون في الـ full-stack وهندسة الذكاء الاصطناعي والبحث. مقيم في ${location}.`,
  inProgress: 'قيد التنفيذ',
  completed: 'مكتمل',
  gpa: 'المعدل',
  proficiency: (level) => `إتقان ${level} من 5`,
  skillsSecondary: 'ثانوي',
  researchWritingKicker: 'المنشورات',
  researchWritingTitle: 'البحث والكتابة',
  researchWritingDesc:
    'منشورات تمتد إلى الرؤية الحاسوبية، وURLLC لصناعة 5.0 عبر 6G، وأمن VoIP، وأخلاقيات الذكاء الاصطناعي.',
  publicationsKicker: 'كتابة',
  publicationsTitle: 'المنشورات',
  publicationsDesc:
    'أوراق تمتد إلى الرؤية الحاسوبية، وURLLC لصناعة 5.0 عبر 6G، وأمن VoIP، وأخلاقيات الذكاء الاصطناعي.',
  form: {
    name: 'الاسم',
    namePlaceholder: 'اسمك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'you@example.com',
    subject: 'الموضوع',
    subjectPlaceholder: 'ما موضوع الرسالة؟',
    message: 'الرسالة',
    messagePlaceholder: 'أخبرني عن الدور أو المشروع أو التعاون.',
    send: 'أرسل الرسالة',
    sending: 'جارٍ الإرسال…',
    sent: 'أُرسِلت الرسالة — سأعود إليك قريباً.',
    validationError: 'أضف اسمك وبريداً صالحاً ورسالة.',
    networkError: 'حدث خطأ ما. راسِلني مباشرةً بدلاً من ذلك.',
    note: 'يُرسَل عبر formsubmit.co — يُرسَل اسمك وبريدك ورسالتك إليّ بالبريد ولا تُخزَّن على هذا الموقع.',
    reachDirectly: 'أو تواصل معي مباشرةً',
    defaultSubject: 'تواصل عبر البورتفوليو',
  },
  themeUsingSystem: 'يتبع سمة النظام',
  themeUsingLight: 'السمة الفاتحة',
  themeUsingDark: 'السمة الداكنة',
  themeClickToChange: 'انقر للتغيير.',
  themeShort: { system: 'النظام', light: 'فاتح', dark: 'داكن' },
  settings: {
    open: 'الإعدادات',
    title: 'إعدادات العرض',
    textSize: 'حجم النص',
    sizeSmall: 'صغير',
    sizeMedium: 'متوسط',
    sizeLarge: 'كبير',
    typeface: 'الخط',
    faceEditorial: 'تحريري',
    faceModern: 'حديث',
    faceCompact: 'مضغوط',
    language: 'اللغة',
    langEnglish: 'English',
    langArabic: 'العربية',
    theme: 'المظهر',
    themeSystem: 'النظام',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    close: 'إغلاق',
  },
}

export const ar: Site = {
  profile,
  pageMeta,
  highlights,
  heroStack,
  nav,
  projects,
  categoryLabels,
  projectCategories,
  home,
  pageHero,
  skillGroups,
  researchToolkit,
  experience,
  education,
  publications,
  systems: arSystems,
  diagrams,
  ui,
}
