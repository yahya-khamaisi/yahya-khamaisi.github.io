import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container, Eyebrow, ProofNote, pillButton } from '@/components/site'
import { cn } from '@/lib/utils'
import { useContent, useCopy } from '../i18n/useContent'
import { getAdjacentProjects } from '../data/content'
import { projectMeta } from '../data/site'
import { Reveal } from '../components/Reveal'
import { AskScreen, ClaimsScreen, VoucherScreen } from '../components/Screens'
import { ChatbotFlow, OcrFlow, RenewalFlow } from '../components/Diagrams'

const rebuiltScreens: Record<string, () => React.JSX.Element> = {
  'reimbursement-portal': ClaimsScreen,
  mhvoucher: VoucherScreen,
}
const redrawnFlows: Record<string, () => React.JSX.Element> = {
  'te-ocr-backend': OcrFlow,
  'serverless-ai-chatbot': ChatbotFlow,
}

function Block({ label, title, lead, children }: { label: string; title?: string; lead?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 pt-24 max-md:pt-16">
      <Eyebrow>{label}</Eyebrow>
      {title && <h2 className="text-3xl font-bold tracking-tight">{title}</h2>}
      {lead && <p className="max-w-2xl leading-relaxed text-foreground/80">{lead}</p>}
      {children}
    </section>
  )
}

/** The evidence block for projects that have one, besides the TE AI Portal story. */
function Evidence({ slug, title }: { slug: string; title: string }) {
  const c = useCopy()
  const Screen = rebuiltScreens[slug]
  const Flow = redrawnFlows[slug]
  const image = projectMeta[slug]?.image
  if (Screen) {
    return (
      <>
        <Screen />
        <ProofNote>{c.work.rebuilt}</ProofNote>
      </>
    )
  }
  if (Flow) {
    return (
      <>
        <Card className="p-8"><Flow /></Card>
        <ProofNote>{c.work.redrawn}</ProofNote>
      </>
    )
  }
  if (image) {
    return (
      <Card className="items-center bg-muted p-6">
        <img src={image} alt={title} className="max-h-160 rounded-xl" />
      </Card>
    )
  }
  return null
}

function ListCard({ label, items, step }: { label: string; items: string[]; step?: number }) {
  return (
    <Reveal step={step}>
      <Card className="h-full gap-3.5 p-8 max-sm:p-6">
        <Eyebrow>{label}</Eyebrow>
        <ul className="flex list-disc flex-col gap-2.5 ps-5 leading-relaxed text-foreground/80">
          {items.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </Card>
    </Reveal>
  )
}

export function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const { projects } = useContent()
  const c = useCopy()
  const t = c.project
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Container className="flex flex-col gap-4 py-16">
        <p className="text-lg">{t.notFound}</p>
        <Link to="/projects" className="font-semibold text-chart-1 hover:underline">{t.back}</Link>
      </Container>
    )
  }

  const { next } = getAdjacentProjects(projects, slug)
  const meta = projectMeta[slug]
  const isPortal = slug === 'te-ai-portal'
  const hasEvidence = !isPortal && Boolean(meta?.image || rebuiltScreens[slug] || redrawnFlows[slug])
  const isGithub = project.href?.includes('github.com')
  const facts: [string, string][] = [[t.role, project.role], [t.when, project.period], [t.stack, project.stack.join(' · ')]]

  return (
    <>
      <div className="border-b">
        <Container className="flex h-16 items-center gap-4">
          <Link to="/projects" className="font-semibold text-chart-1 hover:underline">{t.back}</Link>
          <span className="ms-auto text-sm text-muted-foreground">{project.tag}</span>
        </Container>
      </div>

      <Container className="pb-24">
        <Reveal className="flex max-w-3xl flex-col gap-6 pt-16 pb-8">
          <Eyebrow>{project.tag}</Eyebrow>
          <h1 className="text-5xl leading-none font-extrabold tracking-tighter md:text-7xl rtl:leading-tight rtl:tracking-normal">
            {project.title}
          </h1>
          <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">{project.overview}</p>
          {project.href && (
            <a href={project.href} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), pillButton, 'w-fit')}>
              {isGithub ? t.github : t.visit}
            </a>
          )}
        </Reveal>

        <Reveal>
          <Card className="grid grid-cols-1 gap-0 py-0 md:grid-cols-3">
            {facts.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1.5 border-e p-6 last:border-e-0 max-md:border-e-0 max-md:border-b max-md:last:border-b-0">
                <Eyebrow>{label}</Eyebrow>
                <b className="font-semibold">{value}</b>
              </div>
            ))}
          </Card>
        </Reveal>

        {isPortal && (
          <>
            <Block label={t.product} title={t.productTitle} lead={t.productLead}>
              <AskScreen />
              <ProofNote>{c.work.rebuilt}</ProofNote>
            </Block>
            <Block label={t.chain} title={t.chainTitle}>
              <Card className="grid grid-cols-2 gap-3 p-6 md:grid-cols-3 lg:grid-cols-6">
                {t.chainSteps.map(([step, body], i) => (
                  <Reveal key={step} step={i} className="flex flex-col gap-1 rounded-xl border bg-muted p-3.5">
                    <span className="font-mono text-xs text-chart-1">{step}</span>
                    <span className="text-sm text-foreground/80">{body}</span>
                  </Reveal>
                ))}
              </Card>
              <ProofNote>{t.chainNote}</ProofNote>
            </Block>
            <Block label={t.renewal} title={t.renewalTitle} lead={t.renewalLead}>
              <RenewalFlow />
              <ProofNote>{c.work.redrawn}</ProofNote>
            </Block>
          </>
        )}

        {hasEvidence && (
          <Block label={t.evidence}>
            <Evidence slug={slug} title={project.title} />
          </Block>
        )}

        <div className="grid grid-cols-1 gap-6 pt-16 md:grid-cols-2 md:pt-24">
          <ListCard label={t.built} items={project.details} />
          <ListCard label={t.impact} items={project.impact} step={1} />
        </div>

        {next && (
          <Link to={`/projects/${next.slug}`} className="mt-16 block">
            <Card className="flex-row items-center gap-6 p-8 transition-colors hover:shadow-lg">
              <span className="flex grow flex-col gap-1">
                <Eyebrow>{t.next}</Eyebrow>
                <b className="text-2xl font-bold tracking-tight">{next.title}</b>
              </span>
              <ArrowRight className="size-6 text-chart-1 rtl:-scale-x-100" aria-hidden="true" />
            </Card>
          </Link>
        )}
      </Container>
    </>
  )
}
