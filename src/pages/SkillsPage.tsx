import { Link } from 'react-router-dom'
import { Skills } from '../components/Skills'
import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { skillGroups, researchToolkit } from '../data/content'

export function SkillsPage() {
  const domainCount = skillGroups.length
  const toolCount = skillGroups.reduce((sum, g) => sum + g.items.length, 0)
  const expertCount = skillGroups.reduce(
    (sum, g) => sum + g.items.filter((i) => i.level >= 5).length,
    0,
  )

  const stats = [
    {
      icon: 'skills' as const,
      label: `${domainCount} domains`,
      detail: 'grouped by how they show up in production',
    },
    {
      icon: 'chip' as const,
      label: `${toolCount} tools & platforms`,
      detail: 'across backend, AI, data, and full stack',
    },
    {
      icon: 'spark' as const,
      label: `${expertCount} at expert level`,
      detail: 'the tools reached for first',
    },
    {
      icon: 'years' as const,
      label: '6+ years',
      detail: 'all of it applied in production',
    },
  ]

  return (
    <div className="page-stack">
      <PageHero
        kicker="Capabilities"
        kickerIcon="skills"
        title="Skills"
        description="Full-stack engineering for AI products — backend, retrieval, data, and cloud. Levels are self-rated, and every domain is linked to a project where it was applied."
      />

      <ul className="skills-stats">
        {stats.map((stat) => (
          <li key={stat.label}>
            <span className="skills-stats__icon" aria-hidden="true">
              <Icon name={stat.icon} />
            </span>
            <div>
              <strong>{stat.label}</strong>
              <span>{stat.detail}</span>
            </div>
          </li>
        ))}
      </ul>

      <Skills hideIntro />

      <section className="research-toolkit">
        <div>
          <div className="section-kicker">
            <Icon name="research" />
            <span>Secondary</span>
          </div>
          <h2>{researchToolkit.title}</h2>
          <p>{researchToolkit.description}</p>
        </div>
        <ul className="research-toolkit__list">
          {researchToolkit.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link className="btn btn-ghost" to="/research">
          See the research
        </Link>
      </section>
    </div>
  )
}
