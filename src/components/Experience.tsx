import { useContent } from '../i18n/useContent'
import { MockUi } from './MockUi'
import { Reveal } from './Reveal'

export function Experience() {
  const { experience } = useContent()
  return (
    <ol className="exp-timeline">
      {experience.map((job, index) => (
        <Reveal key={job.company} as="li" className="exp-entry" delay={index * 90}>
          <div className="exp-entry__rail" aria-hidden="true">
            <span className="exp-entry__dot" />
          </div>

          <article className="exp-entry__card">
            <header className="exp-entry__header">
              <div className="exp-entry__when">
                <span className="exp-entry__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="project-tag">{job.period}</span>
                <span className="place">{job.place}</span>
              </div>
              <p className="exp-entry__focus">{job.focus}</p>
              <h3 className="exp-entry__title">
                <span className="exp-entry__role">{job.role}</span>
                <span className="exp-entry__company">
                  {job.company}
                  {job.partner && (
                    <span className="exp-entry__partner">{job.partner}</span>
                  )}
                </span>
              </h3>
              <p className="project-blurb">{job.summary}</p>
            </header>

            <div className="exp-entry__layout">
              <div className="exp-entry__visual">
                <MockUi kind={job.mock} />
              </div>

              <div className="exp-entry__body">
                {job.engagements ? (
                  <ul className="engagement-list">
                    {job.engagements.map((item) => (
                      <li key={item.label} className="engagement">
                        <div className="engagement__head">
                          <strong>{item.label}</strong>
                          <span>{item.kind}</span>
                        </div>
                        <ul className="detail-list">
                          {item.points.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="detail-list">
                    {(job.highlights ?? []).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                )}

                <ul className="stack stack-row">
                  {job.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </ol>
  )
}
