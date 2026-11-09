import { Link, useParams } from 'react-router-dom'
import { useContent, useCopy } from '../i18n/useContent'
import { getAdjacentProjects } from '../data/content'
import { projectMeta } from '../data/site'
import { Reveal } from '../components/Reveal'
import { AskScreen, ClaimsScreen, VoucherScreen } from '../components/Screens'
import { ChatbotFlow, OcrFlow, RenewalFlow } from '../components/Diagrams'

/** The evidence block for projects that have one, besides the TE AI Portal story. */
function Evidence({ slug, title }: { slug: string; title: string }) {
  const c = useCopy()
  const meta = projectMeta[slug]
  if (slug === 'reimbursement-portal' || slug === 'mhvoucher') {
    return (
      <>
        {slug === 'mhvoucher' ? <VoucherScreen /> : <ClaimsScreen />}
        <span className="proof-note">{c.work.rebuilt}</span>
      </>
    )
  }
  if (slug === 'te-ocr-backend' || slug === 'serverless-ai-chatbot') {
    return (
      <>
        <div className="card" style={{ padding: 'var(--s6)' }}>
          {slug === 'te-ocr-backend' ? <OcrFlow /> : <ChatbotFlow />}
        </div>
        <span className="proof-note">{c.work.redrawn}</span>
      </>
    )
  }
  if (meta?.image) {
    return (
      <div className="card shot-frame">
        <img src={meta.image} alt={title} />
      </div>
    )
  }
  return null
}

export function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const { projects } = useContent()
  const c = useCopy()
  const t = c.project
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="wrap">
        <div className="project-head">
          <p>{t.notFound}</p>
          <Link to="/projects" className="case-link">{t.back}</Link>
        </div>
      </div>
    )
  }

  const { next } = getAdjacentProjects(projects, slug)
  const meta = projectMeta[slug]
  const isPortal = slug === 'te-ai-portal'
  const hasEvidence = !isPortal && (meta?.image || ['reimbursement-portal', 'mhvoucher', 'te-ocr-backend', 'serverless-ai-chatbot'].includes(slug))
  const isGithub = project.href?.includes('github.com')

  return (
    <>
      <div className="sub-bar">
        <div className="wrap">
          <Link to="/projects">{t.back}</Link>
          <span>{project.tag}</span>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 96 }}>
        <Reveal className="project-head">
          <span className="label">{project.tag}</span>
          <h1 className="h1">{project.title}</h1>
          <p>{project.overview}</p>
          {project.href && (
            <div className="project-links">
              <a className="btn btn-plain" href={project.href} target="_blank" rel="noreferrer">
                {isGithub ? t.github : t.visit}
              </a>
            </div>
          )}
        </Reveal>

        <Reveal className="card facts">
          <div className="fact"><span className="label">{t.role}</span><b>{project.role}</b></div>
          <div className="fact"><span className="label">{t.when}</span><b>{project.period}</b></div>
          <div className="fact"><span className="label">{t.stack}</span><b>{project.stack.join(' · ')}</b></div>
        </Reveal>

        {isPortal && (
          <>
            <section className="project-section">
              <span className="label">{t.product}</span>
              <h2>{t.productTitle}</h2>
              <p>{t.productLead}</p>
              <AskScreen />
              <span className="proof-note">{c.work.rebuilt}</span>
            </section>
            <section className="project-section">
              <span className="label">{t.chain}</span>
              <h2>{t.chainTitle}</h2>
              <div className="card chain">
                {t.chainSteps.map(([step, body]) => (
                  <div key={step}>
                    <span className="mono">{step}</span>
                    <span>{body}</span>
                  </div>
                ))}
              </div>
              <span className="proof-note">{t.chainNote}</span>
            </section>
            <section className="project-section">
              <span className="label">{t.renewal}</span>
              <h2>{t.renewalTitle}</h2>
              <p>{t.renewalLead}</p>
              <RenewalFlow />
              <span className="proof-note">{c.work.redrawn}</span>
            </section>
          </>
        )}

        {hasEvidence && (
          <section className="project-section">
            <span className="label">{t.evidence}</span>
            <Evidence slug={slug} title={project.title} />
          </section>
        )}

        <div className="split2">
          <Reveal className="card list-card">
            <span className="label">{t.built}</span>
            <ul>{project.details.map((d) => <li key={d}>{d}</li>)}</ul>
          </Reveal>
          <Reveal className="card list-card" delay={80}>
            <span className="label">{t.impact}</span>
            <ul>{project.impact.map((d) => <li key={d}>{d}</li>)}</ul>
          </Reveal>
        </div>

        {next && (
          <Link to={`/projects/${next.slug}`} className="card next-card">
            <span>
              <span className="label">{t.next}</span>
              <b>{next.title}</b>
            </span>
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </>
  )
}
