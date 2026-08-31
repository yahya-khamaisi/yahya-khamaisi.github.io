import { Link } from 'react-router-dom'
import { Research } from '../components/Research'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { useContent } from '../i18n/useContent'

export function ResearchPage() {
  const { projects, pageHero, ui } = useContent()
  const factory = projects.find((p) => p.slug === 'factory6g')

  return (
    <div className="page-stack">
      <PageHero
        kicker={pageHero.research.kicker}
        kickerIcon="research"
        title={pageHero.research.title}
        description={pageHero.research.description}
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
                  {ui.projectPage}
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
