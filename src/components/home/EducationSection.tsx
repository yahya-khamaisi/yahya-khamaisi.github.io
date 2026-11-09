import { useContent, useCopy } from '../../i18n/useContent'
import { Reveal } from '../Reveal'

/** "Venue, 2025" → ["Venue", "2025"] so the year can sit in its own column. */
function splitVenue(venue: string): [string, string] {
  const match = venue.match(/^(.*?),?\s*(\d{4})$/)
  return match ? [match[1], match[2]] : [venue, '']
}

export function EducationSection() {
  const { education, publications } = useContent()
  const c = useCopy()
  const ed = c.education
  // Oldest first, so the path reads BSc → MSc → PhD and ends on the ring.
  const degrees = [...education].reverse()
  const papers = [...publications].sort((a, b) => splitVenue(b.venue)[1].localeCompare(splitVenue(a.venue)[1]))

  return (
    <section id="education" className="section">
      <Reveal className="sec-head">
        <span className="sec-num">{ed.num}</span>
        <h2 className="h2">{ed.title}</h2>
      </Reveal>

      <div className="degrees">
        {degrees.map((d, i) => {
          const current = d.status === 'in-progress'
          const card = (
            <div className="card degree">
              <span className="mono" style={{ fontSize: 13, color: 'var(--muted)' }}>
                {d.period}
                {current ? ` · ${ed.inProgress}` : ''}
              </span>
              <b>{d.degree}</b>
              <span>{d.school}</span>
            </div>
          )
          return (
            <Reveal key={d.degree} delay={i * 80} className={current ? 'ring thin' : ''}>
              {card}
            </Reveal>
          )
        })}
      </div>

      <Reveal className="areas">
        <span className="label">{ed.researchAreas}</span>
        <span className="seq">
          {ed.areas.map(([area, tone]) => (
            <span key={area} className="tool">
              <i className={`tool-dot${tone === 'ai' ? ' ai' : ''}`} />
              {area}
            </span>
          ))}
        </span>
      </Reveal>

      <Reveal className="card papers rows-in">
        {papers.map((paper) => {
          const [venue, year] = splitVenue(paper.venue)
          return (
            <a key={paper.href} className="paper" href={paper.href} target="_blank" rel="noreferrer">
              <span className="mono" style={{ fontSize: 13, color: 'var(--muted)' }}>{year}</span>
              <span>
                <b>{paper.title}</b>
                <small>{venue}</small>
              </span>
            </a>
          )
        })}
      </Reveal>
    </section>
  )
}
