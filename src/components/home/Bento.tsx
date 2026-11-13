import { Link } from 'react-router-dom'
import { Sparkle } from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GridPattern } from '@/components/ui/grid-pattern'
import { MagicCard } from '@/components/ui/magic-card'
import { Marquee } from '@/components/ui/marquee'
import { NumberTicker } from '@/components/ui/number-ticker'
import { WordRotate } from '@/components/ui/word-rotate'
import { cn } from '@/lib/utils'
import { useContent, useCopy } from '../../i18n/useContent'
import { featuredTools } from '../../data/site'
import { Reveal } from '../Reveal'
import { Eyebrow, Tag, ToolBadge, pillButton } from '../site'
import { AgentConsole } from './AgentConsole'
import { ToolOrbit } from './ToolOrbit'

/**
 * The first screen: everything a reviewer needs in one glance, as a bento
 * grid — who, proof in numbers, the agent demo, and the toolbelt.
 */
export function Bento() {
  const { profile } = useContent()
  const c = useCopy()
  const h = c.hero
  const s = c.skills

  return (
    <section id="top" className="grid scroll-mt-24 grid-cols-1 gap-4 pt-6 pb-16 md:grid-cols-12 md:pt-10 md:pb-32">
      {/* Intro */}
      <Reveal className="md:col-span-8 md:row-span-2">
        <Card className="relative h-full justify-center gap-6 overflow-hidden p-6 md:p-10">
          <GridPattern width={40} height={40} className="mask-radial-from-10% mask-radial-to-80% mask-radial-at-top-right stroke-border" />
          <div className="relative flex flex-wrap gap-2">
            {h.chips.map((chip, i) => (
              <Tag key={chip}>
                {i === 0 && <span className="size-2 rounded-full bg-chart-3" />}
                {chip}
              </Tag>
            ))}
          </div>
          <h1 className="relative text-5xl leading-none font-bold tracking-tighter md:text-7xl rtl:leading-tight rtl:tracking-normal">
            {h.lead}
            <span className="sr-only">{h.rotating.join(', ')}</span>
            <span aria-hidden="true">
              <WordRotate words={h.rotating} duration={2400} className="bg-linear-to-r from-chart-1 to-chart-2 bg-clip-text pb-1 text-transparent" />
            </span>
            {h.tail}
          </h1>
          <p className="relative max-w-xl text-lg leading-relaxed text-muted-foreground">{h.sub}</p>
          <div className="relative flex flex-wrap gap-3">
            <Link to="/" state={{ section: 'work' }} className={cn(buttonVariants({ size: 'lg' }), pillButton)}>
              {h.primary}
            </Link>
            <a href={profile.cvUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), pillButton)}>
              {c.cv}
            </a>
          </div>
        </Card>
      </Reveal>

      {/* Portrait */}
      <Reveal step={1} className="max-md:order-first md:col-span-4 md:row-span-2">
        <Card className="relative h-full overflow-hidden p-0">
          <img src={profile.photo} alt={profile.photoAlt} width="900" height="934" className="size-full min-h-80 object-cover object-top" />
          <BorderBeam size={180} duration={8} borderWidth={2} colorFrom="var(--chart-1)" colorTo="var(--chart-2)" />
        </Card>
      </Reveal>

      {/* Proof, counted up */}
      {h.proof.map((p, i) => (
        <Reveal key={p.label} step={i} className="md:col-span-3">
          <MagicCard className="h-full rounded-xl" gradientColor="var(--muted)">
            <div className="flex flex-col gap-1 p-6">
              <span dir="ltr" className={cn('text-4xl font-bold tracking-tight rtl:text-end', p.tone === 'ai' && 'text-chart-2', p.tone === 'fs' && 'text-chart-1')}>
                {p.pre}
                <NumberTicker value={p.n} className={cn('tracking-tight', p.tone === 'ai' ? 'text-chart-2' : p.tone === 'fs' ? 'text-chart-1' : 'text-foreground')} />
                {p.suf}
              </span>
              <span className="text-sm text-muted-foreground">{p.label}</span>
            </div>
          </MagicCard>
        </Reveal>
      ))}

      {/* Live agent demo */}
      <Reveal className="md:col-span-7">
        <AgentConsole className="h-full" />
      </Reveal>

      {/* Toolbelt orbit */}
      <Reveal step={1} className="md:col-span-5">
        <Card className="h-full gap-2 p-6">
          <div className="flex items-center justify-between gap-2">
            <Eyebrow>{s.orbitLabel}</Eyebrow>
            <Sparkle className="size-4 text-chart-2" aria-hidden="true" />
          </div>
          <ToolOrbit />
          <p className="text-center text-sm text-muted-foreground">
            {s.orbitTitle[0]} {s.orbitTitle[1]}
          </p>
        </Card>
      </Reveal>

      {/* Tools, always LTR so the marquee loop doesn't jump in Arabic */}
      <Reveal className="md:col-span-12">
        <Card dir="ltr" role="group" aria-label={h.toolsLabel} className="relative gap-0 overflow-hidden py-3">
          <Marquee pauseOnHover>
            {featuredTools.ai.map((t) => <ToolBadge key={t} tone="ai">{t}</ToolBadge>)}
          </Marquee>
          <Marquee reverse pauseOnHover>
            {featuredTools.fs.map((t) => <ToolBadge key={t} tone="fs">{t}</ToolBadge>)}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-linear-to-r from-card" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-linear-to-l from-card" />
        </Card>
      </Reveal>
    </section>
  )
}
