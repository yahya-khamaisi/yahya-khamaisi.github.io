import { useContent, useCopy } from '../../i18n/useContent'
import { orbitTools } from '../../data/site'
import { Reveal } from '../Reveal'

/** Places `n` chips evenly on a circle, as percentages of the ring box. */
function ringPositions(n: number, offsetDeg = 0) {
  return Array.from({ length: n }, (_, i) => {
    const a = ((offsetDeg + (360 / n) * i) * Math.PI) / 180
    return { left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }
  })
}

function Ring({ tools, inner }: { tools: string[]; inner?: boolean }) {
  const spots = ringPositions(tools.length)
  return (
    <div className={`ring-o${inner ? ' inner' : ''}`}>
      {tools.map((tool, i) => (
        <span key={tool} className="orbit-pos" style={spots[i]}>
          <span className="orbit-counter">
            <span className={`ochip${inner ? ' ai' : ''}`}>{tool}</span>
          </span>
        </span>
      ))}
    </div>
  )
}

export function SkillsSection() {
  const { profile } = useContent()
  const c = useCopy()
  const s = c.skills
  const list = (title: string, rows: [string, string][], tone: 'ai' | 'fs') => (
    <Reveal className="card skill-card">
      <span className={`label tone-${tone}`}>{title}</span>
      {rows.map(([skill, where]) => (
        <div key={skill} className="skill-row">
          <b>{skill}</b>
          <span>{where}</span>
        </div>
      ))}
    </Reveal>
  )

  return (
    <section id="skills" className="section">
      <Reveal className="sec-head">
        <span className="sec-num">{s.num}</span>
        <h2 className="h2">{s.title}</h2>
        <p className="lead">{s.lead}</p>
      </Reveal>

      <Reveal className="card orbit-card">
        <div className="orbit" role="img" aria-label={`${s.inner}: ${orbitTools.ai.join(', ')}. ${s.outer}: ${orbitTools.fs.join(', ')}.`}>
          <Ring tools={orbitTools.fs} />
          <Ring tools={orbitTools.ai} inner />
          <div className="orbit-core">
            <img src={profile.photo} alt="" />
          </div>
        </div>
        <div className="orbit-copy">
          <span className="label">{s.orbitLabel}</span>
          <h3>
            {s.orbitTitle[0]}
            <br />
            <span>{s.orbitTitle[1]}</span>
          </h3>
          <div className="orbit-legend">
            <span><i className="legend-ring ai" />{s.inner}</span>
            <span><i className="legend-ring" />{s.outer}</span>
          </div>
          <p>{s.orbitBody}</p>
        </div>
      </Reveal>

      <div className="skill-lists">
        {list(s.aiTitle, s.ai, 'ai')}
        {list(s.fsTitle, s.fs, 'fs')}
      </div>
    </section>
  )
}
