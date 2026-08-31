import { useMemo, useState } from 'react'
import { type ProjectCategory } from '../data/content'
import { useContent } from '../i18n/useContent'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'

export function ProjectsPage() {
  const { projects, projectCategories, pageHero, ui } = useContent()
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const byCategory =
      filter === 'all' ? projects : projects.filter((p) => p.category === filter)
    const q = query.trim().toLowerCase()
    if (!q) return byCategory
    return byCategory.filter((p) =>
      [p.title, p.tag, p.blurb, ...p.stack].join(' ').toLowerCase().includes(q),
    )
  }, [filter, query, projects])

  const total = projects.length

  return (
    <div className="page-stack">
      <PageHero
        kicker={pageHero.projects.kicker}
        kickerIcon="work"
        title={pageHero.projects.title}
        description={ui.projectsDescription(total)}
      />

      <Reveal>
        <div className="project-controls">
          <div className="filter-bar" role="toolbar" aria-label={ui.filterProjects}>
            {projectCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`filter-chip${filter === item.id ? ' is-active' : ''}`}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="project-search">
            <Icon name="search" />
            <input
              type="search"
              placeholder={ui.searchPlaceholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label={ui.searchProjects}
            />
          </label>
        </div>
      </Reveal>

      <p className="project-count" aria-live="polite">
        {ui.showingCount(filtered.length, total)}
      </p>

      {filtered.length > 0 ? (
        <ul className="project-grid">
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </ul>
      ) : (
        <p className="empty-state">{ui.noMatch(query, filter !== 'all')}</p>
      )}
    </div>
  )
}
