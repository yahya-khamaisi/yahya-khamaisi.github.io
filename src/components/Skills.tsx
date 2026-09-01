import { Link } from 'react-router-dom'
import { useContent } from '../i18n/useContent'
import { Icon } from './Icon'

export function Skills() {
  const { skillGroups, ui } = useContent()
  return (
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
                    aria-label={ui.proficiency(item.level)}
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
              {ui.seeItInAProject}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
