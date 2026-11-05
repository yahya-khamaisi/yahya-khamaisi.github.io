import { useMemo, useState, type MouseEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { type Project, type ProjectCategory } from '../data/content'
import { useContent } from '../i18n/useContent'
import { Pane } from '../components/Shell'
import { Sym } from '../components/Sym'
import { Thumb } from '../components/Thumb'
import { Outcomes } from '../components/Outcomes'

const INSPECTOR_QUERY = '(min-width: 1100px)'

export function ProjectsPage() {
  const { projects, projectCategories, categoryLabels, ui, mac } = useContent()
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [inspector, setInspector] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)
  const query = params.get('q') ?? ''

  const filtered = useMemo(() => {
    const byCategory =
      filter === 'all' ? projects : projects.filter((p) => p.category === filter)
    const q = query.trim().toLowerCase()
    if (!q) return byCategory
    return byCategory.filter((p) =>
      [p.title, p.tag, p.blurb, ...p.stack].join(' ').toLowerCase().includes(q),
    )
  }, [filter, query, projects])

  const current =
    filtered.find((p) => p.slug === selected) ?? filtered[0] ?? null

  // Finder behaviour where the inspector is showing: first click selects,
  // second click (or the inspector button) opens. Elsewhere, links just open.
  function onItemClick(event: MouseEvent, slug: string) {
    const showing = inspector && window.matchMedia(INSPECTOR_QUERY).matches
    if (showing && current?.slug !== slug) {
      event.preventDefault()
      setSelected(slug)
    }
  }

  function setQuery(value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set('q', value)
    else next.delete('q')
    setParams(next, { replace: true })
  }

  return (
    <Pane
      title={mac.sections[1].label}
      subtitle={mac.t.projectsCount(projects.length)}
      actions={
        <>
          <div className="seg" role="group" aria-label={ui.filterProjects}>
            <button
              type="button"
              aria-pressed={view === 'grid'}
              aria-label={mac.t.gridView}
              title={mac.t.gridView}
              onClick={() => setView('grid')}
            >
              <Sym name="grid" />
            </button>
            <button
              type="button"
              aria-pressed={view === 'list'}
              aria-label={mac.t.listView}
              title={mac.t.listView}
              onClick={() => setView('list')}
            >
              <Sym name="list" />
            </button>
          </div>
          <label className="g-field">
            <Sym name="search" />
            <input
              type="search"
              value={query}
              placeholder={ui.searchPlaceholder}
              aria-label={ui.searchProjects}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="g-btn icon inspector-toggle"
            aria-pressed={inspector}
            aria-label={mac.t.toggleInspector}
            title={mac.t.toggleInspector}
            onClick={() => setInspector((v) => !v)}
          >
            <Sym name="info" />
          </button>
        </>
      }
    >
      <div className={`work${inspector ? ' work--inspector' : ''}`}>
        <div className="work-main">
          <div className="chips" role="toolbar" aria-label={ui.filterProjects}>
            {projectCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`chip${filter === item.id ? ' is-on' : ''}`}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.id !== 'all' && <i className={`dot dot--${item.id}`} aria-hidden="true" />}
                {item.label}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {ui.showingCount(filtered.length, projects.length)}
          </p>

          {filtered.length === 0 && (
            <p className="empty">{ui.noMatch(query, filter !== 'all')}</p>
          )}

          {view === 'grid' ? (
            <ul className="gallery">
              {filtered.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/projects/${p.slug}`}
                    className={`item${current?.slug === p.slug ? ' is-sel' : ''}`}
                    onClick={(e) => onItemClick(e, p.slug)}
                    onDoubleClick={() => setSelected(p.slug)}
                  >
                    <Thumb project={p} />
                    <b>{p.title}</b>
                    <span>{p.period}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="listview">
              {filtered.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/projects/${p.slug}`}
                    className={`list-row${current?.slug === p.slug ? ' is-sel' : ''}`}
                    onClick={(e) => onItemClick(e, p.slug)}
                  >
                    <b>{p.title}</b>
                    <span className="list-track">
                      <i className={`dot dot--${p.category}`} aria-hidden="true" />
                      {categoryLabels[p.category]}
                    </span>
                    <span>{p.period}</span>
                    <span className="list-stack">{p.stack.slice(0, 2).join(' · ')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {current && <Inspector project={current} />}
      </div>
    </Pane>
  )
}

function Inspector({ project }: { project: Project }) {
  const { categoryLabels, ui, mac } = useContent()
  const study = mac.caseStudies[project.slug]
  return (
    <aside className="inspector" aria-label={project.title}>
      <Thumb project={project} />
      <div>
        <h2>{project.title}</h2>
        <p className="muted">{project.tag}</p>
      </div>
      <dl className="kv">
        <dt>{ui.role}</dt>
        <dd>{project.role}</dd>
        <dt>{mac.t.period}</dt>
        <dd>{project.period}</dd>
        <dt>{ui.track}</dt>
        <dd>
          <i className={`dot dot--${project.category}`} aria-hidden="true" />{' '}
          {categoryLabels[project.category]}
        </dd>
      </dl>
      <p className="muted">
        {study ? (
          <>
            <b>{mac.t.problem}.</b> {study.problem}
          </>
        ) : (
          project.blurb
        )}
      </p>
      {study && <Outcomes items={study.outcomes} />}
      <ul className="tags">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <Link className="g-btn tint inspector-open" to={`/projects/${project.slug}`}>
        <Sym name="open" />
        {mac.t.openCaseStudy}
      </Link>
    </aside>
  )
}
