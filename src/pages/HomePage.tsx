import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Capabilities } from '../components/Capabilities'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { featuredProjects } from '../data/content'

export function HomePage() {
  const topPicks = featuredProjects.slice(0, 3)
  const moreFeatured = featuredProjects.slice(3, 6)

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
                <span>Top picks</span>
              </div>
              <h2>The three that show the range</h2>
              <p>
                A production AI portal, an airline voucher platform, and the
                Azure middleware that keeps a travel app running — full-stack
                delivery at enterprise scale.
              </p>
            </div>
            <Link className="btn btn-ghost" to="/projects">
              View all projects
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
              <span>Also featured</span>
            </div>
            <h2>Retrieval, search, and the research platform</h2>
            <p>
              The systems that turned AI prototypes into measurable production
              services — plus Factory6G, where the same reliability question is
              studied on the research side.
            </p>
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
