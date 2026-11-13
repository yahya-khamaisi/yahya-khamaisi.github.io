import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useCopy } from '../../i18n/useContent'
import type { Scene } from '../../data/site'
import { Eyebrow, Tag } from '../site'

const TICK_MS = 45
const CHARS_PER_TICK = 3
const DONE = 100000

/** Ticks of each phase of a scene, measured from the start of the scene. */
function phases(scene: Scene) {
  const typed = scene.question.length
  const searched = typed + 10
  const answering = typed + 24
  const written = answering + Math.ceil(scene.answer.length / CHARS_PER_TICK)
  const checked = written + 14
  return { typed, searched, answering, written, checked, end: checked + 70 }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Caret({ ai }: { ai?: boolean }) {
  return <span className={cn('ms-0.5 inline-block h-4 w-2 animate-pulse align-middle', ai ? 'bg-chart-2' : 'bg-chart-1')} />
}

/**
 * "Ask the portfolio": a scripted agent run that types a question, lights up
 * its trace, retrieves sources and streams a cited answer. Everything it says
 * comes from the page itself, and it is labelled as a scripted demo.
 */
export function AgentConsole({ className }: { className?: string }) {
  const c = useCopy()
  const a = c.ask
  const [scene, setScene] = useState(0)
  const [tick, setTick] = useState(() => (prefersReducedMotion() ? DONE : 0))

  const current = a.scenes[scene] ?? a.scenes[0]
  const p = phases(current)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(() => {
      setTick((t) => {
        if (t >= p.end) {
          setScene((s) => (s + 1) % a.scenes.length)
          return 0
        }
        return t + 1
      })
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [p.end, a.scenes.length])

  const status = (from: number, to: number) => (tick < from ? 'wait' : tick < to ? 'run' : 'done')
  const ranges: [number, number][] = [
    [p.typed, p.searched],
    [p.searched, p.answering],
    [p.answering, p.written],
    [p.written, p.checked],
  ]
  const shownSources = tick < p.searched + 2 ? 0 : Math.min(3, Math.floor((tick - p.searched - 2) / 4) + 1)
  const answerLen = Math.max(0, Math.min(current.answer.length, (tick - p.answering) * CHARS_PER_TICK))
  const typing = tick < p.typed
  const answering = tick >= p.answering && answerLen < current.answer.length

  const pick = (i: number) => {
    setScene(i)
    setTick(prefersReducedMotion() ? DONE : 0)
  }

  return (
    <Card id="ask" className={cn('scroll-mt-24 gap-0 py-0', className)}>
      <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3">
        <span className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <span className="size-2 animate-pulse rounded-full bg-chart-2" />
          {a.agent}
        </span>
        <Tabs value={scene} onValueChange={(v) => pick(Number(v))} className="ms-auto">
          <TabsList aria-label={a.examples}>
            {a.scenes.map((s, i) => (
              <TabsTrigger key={s.tab} value={i}>{s.tab}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid min-h-72 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-4 border-b p-5 md:border-e md:border-b-0">
          <Eyebrow>{a.question}</Eyebrow>
          <span className="min-h-14 text-lg leading-snug font-semibold">
            {current.question.slice(0, Math.min(tick, p.typed))}
            {typing && <Caret />}
          </span>
          <Eyebrow>{a.trace}</Eyebrow>
          <div className="flex flex-col gap-0.5">
            {a.steps.map((step, i) => {
              const st = status(...ranges[i])
              return (
                <div
                  key={step.label}
                  className={cn('flex items-center gap-3 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors', st === 'run' && 'bg-muted text-foreground', st === 'done' && 'text-foreground/80')}
                >
                  <span className={cn('size-2 shrink-0 rounded-full border-2 border-border', st === 'run' && 'animate-pulse border-chart-2 bg-chart-2', st === 'done' && 'border-chart-3 bg-chart-3')} />
                  <span className="grow">{step.label}</span>
                  <span className="font-mono text-xs">{st === 'done' ? step.meta(current) : ''}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5">
          <Eyebrow>{a.retrieved}</Eyebrow>
          <div className="flex min-h-7 flex-wrap gap-1.5">
            {current.sources.slice(0, shownSources).map((src, i) => (
              <Badge key={src.title} variant="outline" className="h-7 animate-in gap-1.5 fade-in slide-in-from-left-2" render={<Link to="/" state={{ section: src.href.slice(1) }} />}>
                <span className="font-mono text-chart-2">{i + 1}</span>
                {src.title}
              </Badge>
            ))}
            {shownSources === 0 && <span className="text-sm text-muted-foreground">{a.waiting}</span>}
          </div>
          <Eyebrow>{a.answer}</Eyebrow>
          <p className="min-h-32 leading-relaxed">
            {current.answer.slice(0, answerLen)}
            {answering && <Caret ai />}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-2">
            {tick >= p.checked && <Tag className="text-chart-3">{a.grounded}</Tag>}
            <span className="ms-auto font-mono text-xs text-muted-foreground">{a.disclaimer}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
