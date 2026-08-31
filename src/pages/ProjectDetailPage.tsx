import { Link, useParams } from 'react-router-dom'
import {
  getAdjacentProjects,
  getProjectBySlug,
  type Project,
} from '../data/content'
import { MockUi } from '../components/MockUi'
import { Reveal } from '../components/Reveal'

const categoryLabels: Record<Project['category'], string> = {
  industry: 'Industry AI',
  research: 'Research',
  github: 'GitHub',
  personal: 'Personal',
  earlier: 'Earlier work',
}

function externalLinkLabel(href: string) {
  if (href.includes('github.com')) return 'View on GitHub'
  return 'Visit live site'
}

export function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getProjectBySlug(slug)
  const { prev, next } = getAdjacentProjects(slug)

  if (!project) {
    return (
      <div className="page-stack">
        <header className="page-hero">
          <h1>Project not found</h1>
          <p>That slug does not match a project in the portfolio.</p>
        </header>
        <Link className="btn btn-primary" to="/projects">
          Back to projects
        </Link>
      </div>
    )
  }

  return (
    <div className="page-stack">
      <Reveal>
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/projects">Projects</Link>
          <span aria-hidden="true">/</span>
          <span>{project.title}</span>
        </nav>
      </Reveal>

      <article className="project-detail">
        <Reveal>
          <header className="project-detail__head">
            <div className="project-card__meta">
              <span className="project-tag">{project.tag}</span>
              <span className={`category-pill category-pill--${project.category}`}>
                {categoryLabels[project.category]}
              </span>
            </div>
            <h1>{project.title}</h1>
            <p className="project-card__role project-detail__role">
              {project.role} · {project.period}
            </p>
            <p className="lede">{project.blurb}</p>
            <div className="cta-row">
              {project.href && (
                <a
                  className="btn btn-primary"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {externalLinkLabel(project.href)}
                </a>
              )}
              <Link className="btn btn-ghost" to="/contact">
                Discuss this work
              </Link>
            </div>
          </header>
        </Reveal>

        <div className="project-detail__layout">
          <Reveal delay={60}>
            <div className="project-detail__visual">
              <MockUi kind={project.mock} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="project-detail__body">
              <h2>Overview</h2>
              <p className="project-detail__overview">{project.overview}</p>

              <h2>What shipped</h2>
              <ul className="detail-list">
                {project.details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              <h2>Impact</h2>
              <ul className="impact-list">
                {project.impact.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              <h2>Stack</h2>
              <ul className="stack stack-row">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </article>

      <nav className="project-pager" aria-label="Adjacent projects">
        {prev ? (
          <Link className="pager-link" to={`/projects/${prev.slug}`}>
            <span>Previous</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="pager-link pager-link--next" to={`/projects/${next.slug}`}>
            <span>Next</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
