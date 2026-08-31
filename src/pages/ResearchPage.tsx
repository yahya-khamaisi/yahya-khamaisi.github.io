import { Link } from 'react-router-dom'
import { Research } from '../components/Research'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { projects } from '../data/content'

export function ResearchPage() {
  const factory = projects.find((p) => p.slug === 'factory6g')

  return (
    <div className="page-stack">
      <PageHero
        kicker="Research"
        kickerIcon="research"
        title="Research & publications"
        description="The secondary track: a part-time PhD in applied AI for reliable networked systems. It runs alongside the engineering work and feeds judgment back into it."
      />

      {factory && (
        <Reveal>
          <section className="research-spotlight">
            <div>
              <span className="project-tag">{factory.tag}</span>
              <h2>{factory.title}</h2>
              <p>{factory.overview}</p>
              <ul className="detail-list">
                {factory.details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="cta-row">
                <Link className="btn btn-primary" to={`/projects/${factory.slug}`}>
                  Project page
                </Link>
                {factory.href && (
                  <a
                    className="btn btn-ghost"
                    href={factory.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      <Research hideIntro />
    </div>
  )
}
