import { Link } from 'react-router-dom'
import { skillGroups } from '../data/content'
import { Icon } from './Icon'

export function Skills({ hideIntro = false }: { hideIntro?: boolean }) {
  return (
    <section className="section skills-section">
      {!hideIntro && (
        <div className="section-head">
          <div className="section-kicker">
            <Icon name="skills" />
            <span>Capabilities</span>
          </div>
          <h2>Skills</h2>
          <p>
            Full-stack engineering for AI products — backend, retrieval, data,
            and cloud. Every domain is linked to a project where it was applied.
          </p>
        </div>
      )}
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div key={group.title} className="skill-group">
            <div className="skill-group__head">
              <span className="skill-icon" aria-hidden="true">
                <Icon name={group.icon} />
              </span>
              <h3>{group.title}</h3>
            </div>
            <p className="skill-group__desc">{group.description}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item.label}>
                  <span className="skill-item-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <div className="skill-item__body">
                    <span>{item.label}</span>
                    <span
                      className="skill-level"
                      role="img"
                      aria-label={`Proficiency ${item.level} out of 5`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={i < item.level ? 'is-filled' : undefined}
                        />
                      ))}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            {group.relatedProjectSlug && (
              <Link
                className="skill-group__link"
                to={`/projects/${group.relatedProjectSlug}`}
              >
                See it in a project
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
