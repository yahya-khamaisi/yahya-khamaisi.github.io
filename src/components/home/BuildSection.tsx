import { useRef, type RefObject } from 'react'
import { Bot, Cloud, Monitor, Search, Server, type LucideIcon } from 'lucide-react'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useContent, useCopy } from '../../i18n/useContent'
import { aiLayers, coverage, layerOrder, type Layer } from '../../data/site'
import { Reveal } from '../Reveal'
import { Eyebrow, SectionHead } from '../site'

const layerIcon: Record<Layer, LucideIcon> = { ui: Monitor, api: Server, agents: Bot, retrieval: Search, cloud: Cloud }
const barTone = { mix: 'bg-linear-to-r from-chart-1 to-chart-2', ai: 'bg-chart-2', fs: 'bg-chart-1' }

function LayerNode({ layer, nodeRef }: { layer: Layer; nodeRef: RefObject<HTMLDivElement | null> }) {
  const Icon = layerIcon[layer]
  return (
    <div
      ref={nodeRef}
      className={cn('z-10 flex size-12 items-center justify-center rounded-full border-2 bg-card shadow-sm', aiLayers.includes(layer) ? 'border-chart-2 text-chart-2' : 'border-chart-1 text-chart-1')}
    >
      <Icon className="size-5" />
    </div>
  )
}

/** One request travelling through the five layers, and the answer coming back. */
function RequestPath() {
  const container = useRef<HTMLDivElement>(null)
  const ui = useRef<HTMLDivElement>(null)
  const api = useRef<HTMLDivElement>(null)
  const agents = useRef<HTMLDivElement>(null)
  const retrieval = useRef<HTMLDivElement>(null)
  const cloud = useRef<HTMLDivElement>(null)
  const beam = { containerRef: container, gradientStartColor: 'var(--chart-1)', gradientStopColor: 'var(--chart-2)', duration: 4 }
  return (
    <div ref={container} dir="ltr" aria-hidden="true" className="relative flex items-center justify-between px-2 py-8">
      <LayerNode layer="ui" nodeRef={ui} />
      <LayerNode layer="api" nodeRef={api} />
      <LayerNode layer="agents" nodeRef={agents} />
      <LayerNode layer="retrieval" nodeRef={retrieval} />
      <LayerNode layer="cloud" nodeRef={cloud} />
      <AnimatedBeam {...beam} fromRef={ui} toRef={api} />
      <AnimatedBeam {...beam} fromRef={api} toRef={agents} delay={0.4} />
      <AnimatedBeam {...beam} fromRef={agents} toRef={retrieval} delay={0.8} />
      <AnimatedBeam {...beam} fromRef={retrieval} toRef={cloud} delay={1.2} />
      <AnimatedBeam {...beam} fromRef={cloud} toRef={ui} curvature={-56} reverse duration={6} delay={2} gradientStartColor="var(--chart-2)" gradientStopColor="var(--chart-1)" />
    </div>
  )
}

export function BuildSection() {
  const { projects } = useContent()
  const c = useCopy()
  const b = c.build
  const [l0, blue, l1, violet, l2] = b.lead

  return (
    <section id="stack" className="flex scroll-mt-20 flex-col gap-8 pb-16 md:pb-32">
      <SectionHead
        num={b.num}
        title={b.title}
        lead={
          <>
            {l0}<span className="text-chart-1">{blue}</span>{l1}<span className="text-chart-2">{violet}</span>{l2}
          </>
        }
      />

      <Reveal>
        <Card className="gap-6 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {layerOrder.map((layer) => {
              const l = b.layers[layer]
              const ai = aiLayers.includes(layer)
              return (
                <Card key={layer} size="sm" className="gap-2 px-4 ring-foreground/10">
                  <Eyebrow className={ai ? 'text-chart-2' : 'text-chart-1'}>{l.name}</Eyebrow>
                  <b className="text-base">{l.title}</b>
                  <span className="text-sm text-muted-foreground">{l.tools}</span>
                </Card>
              )
            })}
          </div>

          <RequestPath />
          <div aria-hidden="true" className="-mt-4 flex justify-between font-mono text-xs text-muted-foreground">
            <span>{b.request}</span>
            <span>{b.response}</span>
          </div>

          <Separator />
          <div className="flex flex-col gap-2">
            <Eyebrow className="pb-1">{b.coverageLabel}</Eyebrow>
            {coverage.map((row) => {
              const project = projects.find((p) => p.slug === row.slug)
              const labels = (b.coverage[row.slug] ?? '').split('|')
              return (
                <div key={row.slug} className="grid grid-cols-6 items-center gap-2">
                  <span className="text-xs font-semibold md:text-sm">{project?.title}</span>
                  {row.spans.map((span, j) => (
                    <span
                      key={span}
                      className={cn('flex h-7 items-center truncate rounded-lg px-2.5 text-xs font-semibold text-white', barTone[row.tone], span)}
                    >
                      <span className="max-md:sr-only">{labels[j] ?? ''}</span>
                    </span>
                  ))}
                </div>
              )
            })}
          </div>
        </Card>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {b.principles.map((p, i) => (
          <Reveal key={p.title} step={i}>
            <Card className="h-full gap-2 p-6">
              <b className={cn('font-mono text-sm font-medium', p.tone === 'ai' ? 'text-chart-2' : 'text-chart-1')}>{p.title}</b>
              <p className="leading-relaxed text-foreground/80">{p.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
