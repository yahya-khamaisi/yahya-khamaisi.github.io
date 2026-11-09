import { useContent, useCopy } from '../../i18n/useContent'
import { careerSpans } from '../../data/site'
import { Reveal } from '../Reveal'

const AXIS_START = 2020
const AXIS_YEARS = 7
const barTone = [
  'linear-gradient(90deg, var(--blue), var(--violet))',
  'var(--blue)',
  'var(--violet)',
  'color-mix(in srgb, var(--blue) 70%, var(--fill))',
  'color-mix(in srgb, var(--blue) 50%, var(--fill))',
]

export function ExperienceSection() {
  const { experience } = useContent()
  const c = useCopy()
  const e = c.experience
  const pct = (year: number) => ((year - AXIS_START) / AXIS_YEARS) * 100

  return (
    <section id="experience" className="section">
      <Reveal className="sec-head">
        <span className="sec-num">{e.num}</span>
        <h2 className="h2">{e.title}</h2>
      </Reveal>

      <Reveal className="card gantt" role="img" aria-label={e.timelineAria}>
        <div className="gantt-row">
          <span />
          <div className="gantt-axis">
            {Array.from({ length: AXIS_YEARS }, (_, i) => <span key={i}>{AXIS_START + i}</span>)}
          </div>
        </div>
        {experience.map((job, i) => {
          const [from, to] = careerSpans[i] ?? [AXIS_START, AXIS_START]
          return (
            <div key={job.company} className="gantt-row">
              <span>{job.company}</span>
              <div className="gantt-track">
                <span
                  className="gantt-bar grow"
                  style={{
                    insetInlineStart: `${pct(from)}%`,
                    width: `${pct(to) - pct(from)}%`,
                    background: barTone[i],
                    animationDelay: `${(experience.length - i) * 0.2}s`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </Reveal>

      <Reveal className="card evolution">
        <div className="evolution-head">
          <span className="label">{e.evolutionLabel}</span>
          <span className="mono">
            <span className="tone-fs">{e.evolutionPath[0]}</span> → <span className="tone-fs">{e.evolutionPath[1]}</span> →{' '}
            <span className="tone-ai">{e.evolutionPath[2]}</span>
          </span>
        </div>
        <div className="eras">
          {e.eras.map((era, i) => {
            const body = (
              <div className="era">
                <span className="era-when">{era.when}</span>
                <b>{era.title}</b>
                <span className="chips" style={{ gap: 4 }}>
                  {era.tools.map(([tool, tone]) => (
                    <span key={tool} className={`chip tone-${tone}`}>{tool}</span>
                  ))}
                </span>
              </div>
            )
            const last = i === e.eras.length - 1
            return (
              <Reveal key={era.when} delay={i * 120} className={last ? 'ring thin' : ''}>
                {body}
              </Reveal>
            )
          })}
        </div>
      </Reveal>

      <div className="roles">
        {experience.map((job, i) => (
          <Reveal key={job.company} className="card role-card">
            <div className="role-when">
              <span className="mono">{job.period}</span>
              {i < 2 && <span>{job.place}</span>}
            </div>
            <div className="role-body">
              <span className="role-title">{job.role} · {job.company}</span>
              {i < 2 && <p>{job.summary}</p>}
              <span className="chips" style={{ gap: 6 }}>
                {(e.chips[i] ?? []).map((chip) => <span key={chip} className="chip">{chip}</span>)}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
