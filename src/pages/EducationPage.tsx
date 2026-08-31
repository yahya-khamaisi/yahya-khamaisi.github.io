import { Link } from 'react-router-dom'
import { education } from '../data/content'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'

export function EducationPage() {
  return (
    <div className="page-stack">
      <PageHero
        kicker="Background"
        kickerIcon="education"
        title="Education"
        description="Three degrees, one thread — computer engineering fundamentals, an MSc toward systems and AI, and a part-time PhD in applied AI running alongside full-time engineering."
      />

      <ol className="edu-timeline">
        {education.map((item, index) => (
          <Reveal key={item.school} as="li" className="edu-entry" delay={index * 90}>
            <div className="edu-entry__rail" aria-hidden="true">
              <span className="edu-entry__dot" />
            </div>

            <article className="edu-entry__card">
              <header className="edu-entry__header">
                <div className="edu-entry__meta">
                  <span className="edu-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <span className="project-tag">{item.period}</span>
                    <span className="place">{item.location}</span>
                  </div>
                  <span
                    className={`edu-status edu-status--${item.status}`}
                  >
                    {item.status === 'in-progress' ? 'In progress' : 'Completed'}
                  </span>
                </div>
                <h2 className="edu-entry__degree">{item.degree}</h2>
                <p className="edu-entry__school">{item.school}</p>
                <p className="project-blurb">{item.focus}</p>
              </header>

              {(item.gpa || item.honors) && (
                <div className="edu-entry__badges">
                  {item.gpa && <span className="edu-badge">GPA {item.gpa}</span>}
                  {item.honors?.map((h) => (
                    <span key={h} className="edu-badge edu-badge--honor">
                      {h}
                    </span>
                  ))}
                </div>
              )}

              <ul className="detail-list">
                {item.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              {item.relatedProjectSlug && (
                <div className="cta-row">
                  <Link
                    className="btn btn-ghost"
                    to={`/projects/${item.relatedProjectSlug}`}
                  >
                    See related project
                  </Link>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
