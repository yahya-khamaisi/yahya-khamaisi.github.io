import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/content'
import { useContent } from '../i18n/useContent'
import { Pane } from '../components/Shell'
import { Sym } from '../components/Sym'
import { Icon } from '../components/Icon'
import { BrandMark } from '../components/BrandMark'

/** System Settings–style tile colours, one per pane. */
const tints = ['#0a84ff', '#5e5ce6', '#30a46c', '#0e9fb0']

function usedIn(projects: Project[], tool: string) {
  const t = tool.toLowerCase()
  return projects.filter((p) => p.stack.some((s) => s.toLowerCase().includes(t)))
}

export function SkillsPage() {
  const { skillGroups, researchToolkit, projects, mac } = useContent()
  const [active, setActive] = useState(0)
  const isResearch = active === skillGroups.length
  const group = skillGroups[active]

  const proven: Project[] = []
  if (group) {
    const related = projects.find((p) => p.slug === group.relatedProjectSlug)
    if (related) proven.push(related)
    for (const tool of group.tools) {
      for (const p of usedIn(projects, tool.name)) {
        if (!proven.includes(p) && proven.length < 4) proven.push(p)
      }
    }
  }

  return (
    <Pane title={mac.sections[3].label}>
      <div className="settings">
        <ul className="settings-list" role="tablist" aria-orientation="vertical">
          {skillGroups.map((g, i) => (
            <li key={g.title}>
              <button
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`side-item${active === i ? ' is-on' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="s-tile" style={{ background: tints[i % tints.length] }}>
                  <Icon name={g.icon} />
                </span>
                <span>{g.title}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              role="tab"
              aria-selected={isResearch}
              className={`side-item${isResearch ? ' is-on' : ''}`}
              onClick={() => setActive(skillGroups.length)}
            >
              <span className="s-tile" style={{ background: '#8e8e93' }}>
                <Icon name="research" />
              </span>
              <span>{researchToolkit.title}</span>
            </button>
          </li>
        </ul>

        <div className="settings-pane" role="tabpanel">
          {group ? (
            <>
              <header className="s-head">
                <span className="s-tile s-tile--lg" style={{ background: tints[active % tints.length] }}>
                  <Icon name={group.icon} />
                </span>
                <div>
                  <h2>{group.title}</h2>
                  <p className="muted">{group.description}</p>
                </div>
              </header>
              <h3 className="group-title">{mac.t.tools}</h3>
              <div className="group">
                {group.tools.map((tool) => {
                  const n = usedIn(projects, tool.name).length
                  return (
                    <Link
                      key={tool.name}
                      className="group-row"
                      to={`/projects?q=${encodeURIComponent(tool.name)}`}
                    >
                      <span className="logo-tile">
                        <BrandMark brand={tool.brand} size={16} />
                      </span>
                      <span className="grow">{tool.name}</span>
                      {n > 0 && <small className="muted">{mac.t.usedIn(n)}</small>}
                      <Sym name="chevron" className="chev flip-rtl" />
                    </Link>
                  )
                })}
              </div>
              {proven.length > 0 && (
                <>
                  <h3 className="group-title">{mac.t.provenIn}</h3>
                  <div className="group">
                    {proven.map((p) => (
                      <Link key={p.slug} className="group-row" to={`/projects/${p.slug}`}>
                        <span className={`row-ic row-ic--${p.category}`}>
                          <Sym name="grid" />
                        </span>
                        <span className="grow">
                          {p.title}
                          <small className="muted block">{p.tag}</small>
                        </span>
                        <Sym name="chevron" className="chev flip-rtl" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <header className="s-head">
                <span className="s-tile s-tile--lg" style={{ background: '#8e8e93' }}>
                  <Icon name="research" />
                </span>
                <div>
                  <h2>{researchToolkit.title}</h2>
                  <p className="muted">{researchToolkit.description}</p>
                </div>
              </header>
              <div className="group">
                {researchToolkit.items.map((item) => (
                  <div key={item} className="group-row">
                    <span className="row-ic">
                      <Sym name="flask" />
                    </span>
                    <span className="grow">{item}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Pane>
  )
}
