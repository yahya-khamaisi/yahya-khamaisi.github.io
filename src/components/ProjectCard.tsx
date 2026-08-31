import { Link } from 'react-router-dom'
import type { Project } from '../data/content'
import { MockUi } from './MockUi'
import { Reveal } from './Reveal'

const categoryLabels: Record<Project['category'], string> = {
  industry: 'Industry AI',
  research: 'Research',
  github: 'GitHub',
  personal: 'Personal',
  earlier: 'Earlier work',
}

export function ProjectCard({
  project,
  index,
  size = 'md',
}: {
  project: Project
  index: number
  /** 'lg' gives a top-pick project extra visual weight without changing the card design */
  size?: 'md' | 'lg'
}) {
  return (
    <Reveal
      as="li"
      className={`project-card${size === 'lg' ? ' project-card--lg' : ''}`}
      delay={Math.min(index * 50, 320)}
    >
      <Link
        className="project-card__link"
        to={`/projects/${project.slug}`}
        aria-label={`${project.title} — project details`}
      >
        <div className="project-card__visual" aria-hidden="true">
          <MockUi kind={project.mock} />
          {project.tier === 'featured' && (
            <span className="project-card__badge">Featured</span>
          )}
        </div>
        <div className="project-card__body">
          <div className="project-card__meta">
            <span className="project-tag">{project.tag}</span>
            <span className={`category-pill category-pill--${project.category}`}>
              {categoryLabels[project.category]}
            </span>
          </div>
          <h3 className="project-title">
            {project.title}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </h3>
          <p className="project-card__role">
            {project.role} · {project.period}
          </p>
          <p className="project-blurb">{project.blurb}</p>
          {size === 'lg' && (
            <ul className="detail-list">
              {project.impact.slice(0, 2).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
          <ul className="stack stack-row">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Link>
    </Reveal>
  )
}
