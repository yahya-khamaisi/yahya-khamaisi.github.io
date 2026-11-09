import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent, useCopy } from '../i18n/useContent'
import { groupOrder, groupTone, projectMeta, type GroupKey } from '../data/site'
import { Reveal } from '../components/Reveal'

export function ProjectsPage() {
  const { projects } = useContent()
  const c = useCopy()
  const t = c.projects
  const [filter, setFilter] = useState<GroupKey | 'all'>('all')

  const inGroup = (g: GroupKey) => projects.filter((p) => projectMeta[p.slug]?.group === g)
  const counts = Object.fromEntries(groupOrder.map((g) => [g, inGroup(g).length])) as Record<GroupKey, number>
  const max = Math.max(...Object.values(counts))
  const shown = groupOrder.filter((g) => filter === 'all' || g === filter)

  return (
    <div className="wrap">
      <Reveal className="page-head">
        <Link to="/" className="case-link">{t.home}</Link>
        <span className="label">{t.label}</span>
        <h1 className="h1">{t.title(projects.length)}</h1>
        <p>{t.lead}</p>
      </Reveal>

      <Reveal className="card dist" role="img" aria-label={`${t.distAria}: ${groupOrder.map((g) => `${t.groups[g].name} ${counts[g]}`).join(', ')}`}>
        {groupOrder.map((g, i) => (
          <div key={g} className="dist-row">
            <span>{t.groups[g].name}</span>
            <span className="dist-track">
              <span className="grow" style={{ width: `${(counts[g] / max) * 100}%`, background: groupTone[g], animationDelay: `${i * 0.1}s` }} />
            </span>
            <span className="mono">{counts[g]}</span>
          </div>
        ))}
      </Reveal>

      <div className="filters" role="group" aria-label={t.filterAria}>
        <button type="button" className="filter" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
          {t.all} <small>{projects.length}</small>
        </button>
        {groupOrder.map((g) => (
          <button key={g} type="button" className="filter" aria-pressed={filter === g} onClick={() => setFilter(g)}>
            {t.groups[g].name} <small>{counts[g]}</small>
          </button>
        ))}
        <span className="legend">
          <span><i className="disc ai" />{t.legend.ai}</span>
          <span><i className="disc fs" />{t.legend.fs}</span>
          <span><i className="disc" />{t.legend.app}</span>
        </span>
      </div>

      <div className="groups">
        {shown.map((g) => (
          <section key={g} className="card group" aria-labelledby={`group-${g}`}>
            <div className="group-head">
              <b id={`group-${g}`}>{t.groups[g].name}</b>
              <span className="mono">{t.groups[g].note}</span>
            </div>
            {inGroup(g).map((p) => {
              const meta = projectMeta[p.slug]
              return (
                <Link key={p.slug} to={`/projects/${p.slug}`} className="prow">
                  <span className="prow-title">
                    <b><i className={`disc ${meta.discipline === 'app' ? '' : meta.discipline}`} />{p.title}</b>
                    <small>{p.role}</small>
                  </span>
                  <p>{p.blurb}</p>
                  <span className="mono">{p.period}</span>
                  <span>
                    <span className={`ev-badge${meta.evidence ? ' has' : ''}`}>
                      {meta.evidence ? t.evidence[meta.evidence] : t.writeUp}
                    </span>
                  </span>
                </Link>
              )
            })}
          </section>
        ))}
      </div>
    </div>
  )
}
