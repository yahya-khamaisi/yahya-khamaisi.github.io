import { Link } from 'react-router-dom'
import { useContent } from '../i18n/useContent'
import { Icon } from './Icon'
import { BrandMark } from './BrandMark'

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
          <ul className="skill-tools">
            {group.tools.map((tool) => (
              <li key={tool.name} className="skill-tool">
                <span className="skill-tool__mark">
                  <BrandMark brand={tool.brand} />
                </span>
                {tool.name}
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
