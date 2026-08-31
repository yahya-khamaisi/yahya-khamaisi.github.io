import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Capabilities } from '../components/Capabilities'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { featuredProjects } from '../data/content'
import { useContent } from '../i18n/useContent'

export function HomePage() {
  const { projects, ui, home } = useContent()
  const featured = featuredProjects(projects)
  const topPicks = featured.slice(0, 3)
  const moreFeatured = featured.slice(3, 6)

  return (
    <>
      <Reveal>
        <Hero />
      </Reveal>

      <Capabilities />

      <section className="section">
        <Reveal>
          <div className="section-head section-head--row">
            <div>
              <div className="section-kicker">
                <Icon name="work" />
                <span>{home.topPicks.kicker}</span>
              </div>
              <h2>{home.topPicks.title}</h2>
              <p>{home.topPicks.description}</p>
            </div>
            <Link className="btn btn-ghost" to="/projects">
              {ui.viewAllProjects}
            </Link>
          </div>
        </Reveal>
        <ul className="project-grid project-grid--top">
          {topPicks.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              size="lg"
            />
          ))}
        </ul>
      </section>

      <section className="section">
        <Reveal>
          <div className="section-head">
            <div className="section-kicker">
              <Icon name="ai" />
              <span>{home.alsoFeatured.kicker}</span>
            </div>
            <h2>{home.alsoFeatured.title}</h2>
            <p>{home.alsoFeatured.description}</p>
          </div>
        </Reveal>
        <ul className="project-grid">
          {moreFeatured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </ul>
      </section>
    </>
  )
}
