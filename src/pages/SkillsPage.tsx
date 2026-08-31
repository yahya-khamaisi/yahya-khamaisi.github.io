import { Link } from 'react-router-dom'
import { Skills } from '../components/Skills'
import { PageHero } from '../components/PageHero'
import { Icon } from '../components/Icon'
import { useContent } from '../i18n/useContent'

export function SkillsPage() {
  const { skillGroups, researchToolkit, pageHero, ui } = useContent()
  const domainCount = skillGroups.length
  const toolCount = skillGroups.reduce((sum, g) => sum + g.items.length, 0)
  const expertCount = skillGroups.reduce(
    (sum, g) => sum + g.items.filter((i) => i.level >= 5).length,
    0,
  )

  const stats = [
    {
      icon: 'skills' as const,
      label: ui.skillsStats.domains(domainCount),
      detail: ui.skillsStats.domainsDetail,
    },
    {
      icon: 'chip' as const,
      label: ui.skillsStats.tools(toolCount),
      detail: ui.skillsStats.toolsDetail,
    },
    {
      icon: 'spark' as const,
      label: ui.skillsStats.expert(expertCount),
      detail: ui.skillsStats.expertDetail,
    },
    {
      icon: 'years' as const,
      label: ui.skillsStats.years,
      detail: ui.skillsStats.yearsDetail,
    },
  ]

  return (
    <div className="page-stack">
      <PageHero
        kicker={pageHero.skills.kicker}
        kickerIcon="skills"
        title={pageHero.skills.title}
        description={pageHero.skills.description}
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
            <span>{ui.skillsSecondary}</span>
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
          {ui.seeTheResearch}
        </Link>
      </section>
    </div>
  )
}
