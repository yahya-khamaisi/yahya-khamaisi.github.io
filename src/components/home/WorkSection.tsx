import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MagicCard } from '@/components/ui/magic-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useContent, useCopy } from '../../i18n/useContent'
import { aiLayers, caseStudySlugs, groupOrder, projectMeta, type CaseStudySlug } from '../../data/site'
import { Reveal } from '../Reveal'
import { ClaimsScreen, PortalScreen, VoucherScreen } from '../Screens'
import { ChatbotFlow, OcrFlow } from '../Diagrams'
import { Eyebrow, ProofNote, SectionHead, Tag, pillButton } from '../site'

const screens: Record<CaseStudySlug, () => React.JSX.Element> = {
  'te-ai-portal': PortalScreen,
  'reimbursement-portal': ClaimsScreen,
  mhvoucher: VoucherScreen,
}

const apps = [
  { slug: 'lucent', cover: false },
  { slug: 'vitals', cover: false },
  { slug: 'driftly', cover: false },
  { slug: 'albert-roi', cover: true },
]

export function WorkSection() {
  const { projects } = useContent()
  const c = useCopy()
  const w = c.work
  const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

  const evidence = [
    { slug: 'te-ocr-backend', body: <OcrFlow />, note: w.redrawn },
    { slug: 'serverless-ai-chatbot', body: <ChatbotFlow />, note: w.redrawn },
    {
      slug: 'factory6g',
      body: <img className="w-full rounded-lg bg-white" src="/work/f6g-ppo.jpg" alt="PPO training curves for DRL and reliability-aware DRL" loading="lazy" width="1200" height="671" />,
      note: w.thesis,
    },
  ]

  return (
    <section id="work" className="flex scroll-mt-20 flex-col gap-8 pb-16 md:pb-32">
      <SectionHead num={w.num} title={w.title} lead={w.lead} />

      <Reveal>
        <Tabs defaultValue={caseStudySlugs[0]}>
          <TabsList variant="line" className="h-auto flex-wrap gap-2">
            {caseStudySlugs.map((slug) => (
              <TabsTrigger key={slug} value={slug} className="h-9 flex-none px-3 text-base">
                {bySlug(slug)?.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {caseStudySlugs.map((slug) => {
            const project = bySlug(slug)
            const cs = w.cases[slug]
            const Screen = screens[slug]
            if (!project) return null
            const pao: [string, string][] = [[w.problem, cs.problem], [w.built, cs.built], [w.outcome, cs.outcome]]
            return (
              <TabsContent key={slug} value={slug} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Card className="grid grid-cols-1 items-center gap-9 p-6 md:grid-cols-12 md:p-8">
                  <div className="flex flex-col gap-3 md:col-span-5">
                    <Eyebrow>{cs.meta}</Eyebrow>
                    <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cs.layers.map((l) => (
                        <Tag key={l} tone={aiLayers.includes(l) ? 'ai' : 'fs'}>{w.layerTags[l]}</Tag>
                      ))}
                    </div>
                    <dl>
                      {pao.map(([label, text]) => (
                        <div key={label} className="grid grid-cols-1 gap-1 border-t py-3 text-sm leading-relaxed sm:grid-cols-4 sm:gap-3">
                          <dt><Eyebrow>{label}</Eyebrow></dt>
                          <dd className="text-foreground/80 sm:col-span-3">{text}</dd>
                        </div>
                      ))}
                    </dl>
                    <Link to={`/projects/${slug}`} className="font-semibold text-chart-1 hover:underline">{w.readCase}</Link>
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-7">
                    <Screen />
                    <ProofNote>{w.rebuilt}</ProofNote>
                  </div>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {evidence.map((e, i) => {
          const project = bySlug(e.slug)
          return (
            <Reveal key={e.slug} step={i}>
              <article className="h-full">
              <MagicCard className="h-full rounded-xl" gradientColor="var(--muted)">
              <div className="flex h-full flex-col gap-3 p-6">
                <Eyebrow>{project?.tag}</Eyebrow>
                <h3 className="text-xl font-bold">
                  <Link to={`/projects/${e.slug}`} className="hover:text-chart-1">{project?.title}</Link>
                </h3>
                {e.body}
                <ProofNote className="mt-auto">{e.note}</ProofNote>
              </div>
              </MagicCard>
              </article>
            </Reveal>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {apps.map(({ slug, cover }, i) => {
          const project = bySlug(slug)
          const meta = projectMeta[slug]
          if (!project || !meta?.image) return null
          return (
            <Reveal key={slug} step={i}>
              <figure>
              <Card className="gap-3 p-4">
                <Link to={`/projects/${slug}`} className={cn('flex h-80 items-center justify-center overflow-hidden rounded-xl bg-muted', !cover && 'p-4')}>
                  <img src={meta.image} alt={project.title} loading="lazy" className={cover ? 'size-full object-cover' : 'max-h-full max-w-full rounded-xl'} />
                </Link>
                <figcaption className="flex justify-between gap-2 text-sm">
                  <b>{project.title}</b>
                  <span className="text-muted-foreground">{cover ? w.brandSite : w.macApp}</span>
                </figcaption>
              </Card>
              </figure>
            </Reveal>
          )
        })}
      </div>

      <Reveal>
        <Link to="/projects" className="block">
          <Card className="grid grid-cols-1 items-center gap-6 p-6 transition-shadow hover:shadow-lg md:grid-cols-3 md:p-8">
            <span className="flex flex-col gap-1.5">
              <Eyebrow>{w.indexLabel}</Eyebrow>
              <strong className="text-3xl font-extrabold tracking-tight">{w.indexTitle(projects.length)}</strong>
              <span className="text-sm text-muted-foreground">{w.indexSub}</span>
            </span>
            <span className="flex flex-wrap gap-1.5">
              {groupOrder.map((g) => (
                <Tag key={g}>
                  {c.projects.groups[g].name}
                  <span className="font-mono text-muted-foreground">{projects.filter((p) => projectMeta[p.slug]?.group === g).length}</span>
                </Tag>
              ))}
            </span>
            <span className={cn(buttonVariants({ size: 'lg' }), pillButton, 'md:justify-self-end')}>{w.browse(projects.length)}</span>
          </Card>
        </Link>
      </Reveal>
    </section>
  )
}
