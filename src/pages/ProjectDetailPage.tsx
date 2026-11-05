import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAdjacentProjects, getProjectBySlug } from '../data/content'
import { useContent } from '../i18n/useContent'
import { Pane } from '../components/Shell'
import { Sym } from '../components/Sym'
import { Thumb } from '../components/Thumb'
import { ProjectDiagram } from '../components/ProjectDiagram'
import { Outcomes } from '../components/Outcomes'

type Tab = 'overview' | 'architecture' | 'stack'

export function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const { projects, categoryLabels, diagrams, ui, mac } = useContent()
  const project = getProjectBySlug(projects, slug)
  const { prev, next } = getAdjacentProjects(projects, slug)
  const [tab, setTab] = useState<Tab>('overview')
  const [copied, setCopied] = useState(false)

  const back = (
    <Link className="g-btn icon" to="/projects" aria-label={mac.t.back} title={mac.t.back}>
      <Sym name="back" className="flip-rtl" />
    </Link>
  )

  if (!project) {
    return (
      <Pane title={ui.projectNotFound} leading={back}>
        <p className="empty">{ui.projectNotFoundBody}</p>
        <Link className="g-btn tint" to="/projects">
          {ui.backToProjects}
        </Link>
      </Pane>
    )
  }

  const study = mac.caseStudies[project.slug]
  const tabs: Tab[] = project.slug in diagrams
    ? ['overview', 'architecture', 'stack']
    : ['overview', 'stack']
  const tabLabel: Record<Tab, string> = {
    overview: ui.overview,
    architecture: ui.architecture,
    stack: ui.stack,
  }

  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: project!.title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* dismissed */
    }
  }

  return (
    <Pane
      title={project.title}
      subtitle={`${mac.sections[1].label} › ${categoryLabels[project.category]}`}
      leading={back}
      actions={
        <>
          <div className="seg" role="tablist" aria-label={project.title}>
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                aria-pressed={tab === t}
                onClick={() => setTab(t)}
              >
                {tabLabel[t]}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="g-btn icon"
            onClick={share}
            aria-label={copied ? mac.t.linkCopied : mac.t.share}
            title={copied ? mac.t.linkCopied : mac.t.share}
          >
            <Sym name={copied ? 'check' : 'share'} />
          </button>
          <Link
            className="g-btn tint"
            to="/contact"
            state={{ subject: `${ui.discussThisWork}: ${project.title}` }}
          >
            <Sym name="mail" />
            <span className="hide-sm">{ui.discussThisWork}</span>
          </Link>
        </>
      }
    >
      {tab === 'overview' && (
        <div className="cs">
          <div className="cs-story">
            <span className={`pill pill--${project.category}`}>{project.tag}</span>
            <p className="cs-lead">{project.overview}</p>
            {study && (
              <>
                <h2>{project.category === 'research' ? mac.t.question : mac.t.problem}</h2>
                <p>{study.problem}</p>
              </>
            )}
            <h2>{ui.whatShipped}</h2>
            <ul className="bullets">
              {project.details.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h2>{study ? mac.t.outcomes : ui.impact}</h2>
            {study ? (
              <Outcomes items={study.outcomes} />
            ) : (
              <ul className="bullets">
                {project.impact.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
            <h2>{ui.role}</h2>
            <p>
              {project.role} · {project.period}
            </p>
            {project.href && (
              <a className="g-btn" href={project.href} target="_blank" rel="noreferrer">
                <Sym name={project.href.includes('github.com') ? 'gh' : 'open'} />
                {project.href.includes('github.com') ? ui.viewOnGithub : ui.visitLiveSite}
              </a>
            )}
          </div>
          <figure className="cs-shot">
            <Thumb project={project} large />
            <figcaption>{mac.t.illustrative}</figcaption>
          </figure>
        </div>
      )}

      {tab === 'architecture' && <ProjectDiagram slug={project.slug} />}

      {tab === 'stack' && (
        <div className="cs-stack">
          <div className="group">
            {project.stack.map((s) => (
              <div key={s} className="group-row">
                <span className="row-ic">
                  <Sym name="spark" />
                </span>
                <span className="grow">{s}</span>
              </div>
            ))}
          </div>
          <div>
            <h2>{ui.impact}</h2>
            <ul className="bullets">
              {project.impact.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <nav className="pager" aria-label={ui.adjacentProjects}>
        {prev ? (
          <Link className="pager-link" to={`/projects/${prev.slug}`}>
            <span>{ui.previous}</span>
            <b>{prev.title}</b>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="pager-link pager-link--next" to={`/projects/${next.slug}`}>
            <span>{ui.next}</span>
            <b>{next.title}</b>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Pane>
  )
}
