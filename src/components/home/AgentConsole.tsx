import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCopy } from '../../i18n/useContent'
import type { Scene } from '../../data/site'

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

/**
 * "Ask the portfolio": a scripted agent run that types a question, lights up
 * its trace, retrieves sources and streams a cited answer. Everything it says
 * comes from the page itself, and it is labelled as a scripted demo.
 */
export function AgentConsole() {
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

  const status = (from: number, to: number) => (tick < from ? '' : tick < to ? 'run' : 'done')
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
    <section id="ask" className="ask">
      <div className="card console">
        <div className="console-head">
          <span className="console-live mono">
            <span className="live-dot" />
            {a.agent}
          </span>
          <span className="console-hint">{a.hint}</span>
          <div className="qtabs" role="tablist" aria-label={a.examples}>
            {a.scenes.map((s, i) => (
              <button
                key={s.tab}
                type="button"
                role="tab"
                className="qtab"
                aria-selected={i === scene}
                onClick={() => pick(i)}
              >
                {s.tab}
              </button>
            ))}
          </div>
        </div>
        <div className="console-grid">
          <div className="console-col">
            <span className="label">{a.question}</span>
            <span className="q-text">
              {current.question.slice(0, Math.min(tick, p.typed))}
              {typing && <span className="caret" />}
            </span>
            <span className="label">{a.trace}</span>
            <div className="steps">
              {a.steps.map((step, i) => {
                const st = status(...ranges[i])
                return (
                  <div key={step.label} className={`step ${st}`}>
                    <span className="step-dot" />
                    <span>{step.label}</span>
                    <span className="step-meta">{st === 'done' ? step.meta(current) : ''}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="console-col alt">
            <span className="label">{a.retrieved}</span>
            {current.sources.slice(0, shownSources).map((src, i) => (
              <Link key={src.title} to="/" state={{ section: src.href.slice(1) }} className="src-card">
                <span className="src-n">{i + 1}</span>
                <span className="src-title">
                  <span className="label">{src.kind}</span>
                  {src.title}
                </span>
              </Link>
            ))}
            {shownSources === 0 && <span className="waiting">{a.waiting}</span>}
          </div>
          <div className="console-col">
            <span className="label">{a.answer}</span>
            <p className="answer">
              {current.answer.slice(0, answerLen)}
              {answering && <span className="caret ai" />}
            </p>
            <div className="console-foot">
              {tick >= p.checked && <span className="chip grounded">{a.grounded}</span>}
              <span className="disclaimer mono">{a.disclaimer}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
