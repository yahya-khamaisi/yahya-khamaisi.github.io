import { useContent } from '../i18n/useContent'
import { Pane } from '../components/Shell'
import { Sym } from '../components/Sym'

export function ExperiencePage() {
  const { experience, profile, ui, mac } = useContent()
  return (
    <Pane
      title={mac.sections[2].label}
      subtitle={mac.t.yearsCompanies(6, experience.length)}
      actions={
        <a className="g-btn" href={profile.cvUrl} target="_blank" rel="noreferrer">
          <Sym name="down" />
          {ui.downloadCv}
        </a>
      }
    >
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.company} className="tl-item">
            <span className="tl-when">{job.period}</span>
            <span className="tl-rail" aria-hidden="true" />
            <article className="card">
              <header className="card-head">
                <h2>
                  {job.role} <span>· {job.company}</span>
                </h2>
                {job.partner && <span className="pill">{job.partner}</span>}
              </header>
              <p className="muted small">
                {job.place} · {job.focus}
              </p>
              <p>{job.summary}</p>
              {job.engagements ? (
                job.engagements.map((e) => (
                  <div key={e.label} className="engagement">
                    <h3>
                      {e.label} <span>· {e.kind}</span>
                    </h3>
                    <ul className="bullets">
                      {e.points.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <ul className="bullets">
                  {(job.highlights ?? []).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
              <ul className="tags">
                {job.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Pane>
  )
}
