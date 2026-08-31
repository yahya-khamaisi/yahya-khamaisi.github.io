import { useMemo, useState } from 'react'
import {
  projects,
  projectCategories,
  type ProjectCategory,
} from '../data/content'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'

export function ProjectsPage() {
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
  }, [filter, query])

  const total = projects.length

  return (
    <div className="page-stack">
      <PageHero
        kicker="Portfolio"
        kickerIcon="work"
        title="Projects"
        description={`${total} projects across enterprise AI, full-stack delivery, open source, and the research track — ordered by career weight. Filter by track or search by name, client, or stack.`}
      />

      <Reveal>
        <div className="project-controls">
          <div className="filter-bar" role="toolbar" aria-label="Filter projects">
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
              placeholder="Search projects, clients, stack…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search projects"
            />
          </label>
        </div>
      </Reveal>

      <p className="project-count" aria-live="polite">
        Showing {filtered.length} of {total} projects
      </p>

      {filtered.length > 0 ? (
        <ul className="project-grid">
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </ul>
      ) : (
        <p className="empty-state">
          No projects match "{query}"{filter !== 'all' ? ' in this filter' : ''}.
          Try a different search term or clear the filter.
        </p>
      )}
    </div>
  )
}
