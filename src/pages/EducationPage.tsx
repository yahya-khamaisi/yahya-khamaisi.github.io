import { Link } from 'react-router-dom'
import { useContent } from '../i18n/useContent'
import { Pane } from '../components/Shell'
import { Icon } from '../components/Icon'

export function EducationPage() {
  const { education, pageHero, ui, mac } = useContent()
  return (
    <Pane title={mac.sections[4].label} subtitle={pageHero.education.description}>
      <ol className="stack-list">
        {education.map((item) => (
          <li key={item.school} className="card">
            <header className="card-head">
              <span className="s-tile s-tile--md" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <div className="grow">
                <h2>{item.degree}</h2>
                <p className="muted small">
                  {item.school} · {item.location} · {item.period}
                </p>
              </div>
              <span className={`badge ${item.status === 'in-progress' ? 'run' : 'ok'}`}>
                {item.status === 'in-progress' ? ui.inProgress : ui.completed}
              </span>
            </header>
            <p>{item.focus}</p>
            {(item.gpa || item.honors) && (
              <ul className="tags">
                {item.gpa && (
                  <li>
                    {ui.gpa} {item.gpa}
                  </li>
                )}
                {item.honors?.map((h) => <li key={h}>{h}</li>)}
              </ul>
            )}
            <ul className="bullets">
              {item.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            {item.relatedProjectSlug && (
              <Link className="g-btn" to={`/projects/${item.relatedProjectSlug}`}>
                {ui.seeRelatedProject}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </Pane>
  )
}
