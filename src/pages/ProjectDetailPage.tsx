import { Link, useParams } from 'react-router-dom'
import { getAdjacentProjects, getProjectBySlug } from '../data/content'
import { useContent } from '../i18n/useContent'
import { MockUi } from '../components/MockUi'
import { ProjectDiagram } from '../components/ProjectDiagram'
import { Reveal } from '../components/Reveal'

export function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const { projects, categoryLabels, diagrams, ui } = useContent()
  const project = getProjectBySlug(projects, slug)
  const { prev, next } = getAdjacentProjects(projects, slug)

  if (!project) {
    return (
      <div className="page-stack">
        <header className="page-hero">
          <h1>{ui.projectNotFound}</h1>
          <p>{ui.projectNotFoundBody}</p>
        </header>
        <Link className="btn btn-primary" to="/projects">
          {ui.backToProjects}
        </Link>
      </div>
    )
  }

  const externalLabel =
    project.href && project.href.includes('github.com')
      ? ui.viewOnGithub
      : ui.visitLiveSite

  return (
    <div className="page-stack">
      <Reveal>
        <nav className="crumb" aria-label={ui.breadcrumb}>
          <Link to="/projects">{ui.projectsCrumb}</Link>
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
                  {externalLabel}
                </a>
              )}
              <Link
                className="btn btn-ghost"
                to="/"
                state={{ section: 'contact' }}
              >
                {ui.discussThisWork}
              </Link>
            </div>
          </header>
        </Reveal>

        <div className="project-detail__layout">
          <Reveal delay={80}>
            <div className="project-detail__body">
              <section>
                <h2>{ui.overview}</h2>
                <p className="project-detail__overview">{project.overview}</p>
              </section>

              {project.slug in diagrams && (
                <section className="project-detail__arch">
                  <h2>{ui.architecture}</h2>
                  <ProjectDiagram slug={project.slug} />
                </section>
              )}

              <section>
                <h2>{ui.whatShipped}</h2>
                <ul className="detail-list">
                  {project.details.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2>{ui.impact}</h2>
                <ul className="impact-list">
                  {project.impact.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <aside className="project-detail__rail">
              <div className="project-detail__visual">
                <MockUi kind={project.mock} />
              </div>

              <div className="rail-card">
                <h3>{ui.atAGlance}</h3>
                <dl className="rail-facts">
                  <div>
                    <dt>{ui.role}</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>{ui.timeline}</dt>
                    <dd>{project.period}</dd>
                  </div>
                  <div>
                    <dt>{ui.track}</dt>
                    <dd>{categoryLabels[project.category]}</dd>
                  </div>
                </dl>
              </div>

              <div className="rail-card">
                <h3>{ui.stack}</h3>
                <ul className="stack stack-row">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </article>

      <nav className="project-pager" aria-label={ui.adjacentProjects}>
        {prev ? (
          <Link className="pager-link" to={`/projects/${prev.slug}`}>
            <span>{ui.previous}</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="pager-link pager-link--next" to={`/projects/${next.slug}`}>
            <span>{ui.next}</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
