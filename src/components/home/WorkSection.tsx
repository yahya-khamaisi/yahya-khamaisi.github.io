import { Link } from 'react-router-dom'
import { useContent, useCopy } from '../../i18n/useContent'
import { aiLayers, caseStudySlugs, groupOrder, groupTone, projectMeta, type CaseStudySlug } from '../../data/site'
import { Reveal } from '../Reveal'
import { ClaimsScreen, PortalScreen, VoucherScreen } from '../Screens'
import { ChatbotFlow, OcrFlow } from '../Diagrams'

const screens: Record<CaseStudySlug, () => React.JSX.Element> = {
  'te-ai-portal': PortalScreen,
  'reimbursement-portal': ClaimsScreen,
  mhvoucher: VoucherScreen,
}

const apps = [
  { slug: 'lucent', cover: false },
  { slug: 'vitals', cover: false },
  { slug: 'driftly', cover: false },
  { slug: 'albert-roi', cover: true },
]

export function WorkSection() {
  const { projects } = useContent()
  const c = useCopy()
  const w = c.work
  const bySlug = (slug: string) => projects.find((p) => p.slug === slug)
  const counts = groupOrder.map((g) => projects.filter((p) => projectMeta[p.slug]?.group === g).length)

  return (
    <section id="work" className="section">
      <Reveal className="sec-head">
        <span className="sec-num">{w.num}</span>
        <h2 className="h2">{w.title}</h2>
        <p className="lead">{w.lead}</p>
      </Reveal>

      {caseStudySlugs.map((slug, i) => {
        const project = bySlug(slug)
        const cs = w.cases[slug]
        const Screen = screens[slug]
        if (!project) return null
        return (
          <Reveal key={slug} as="article" className={`card case${i % 2 ? ' flip' : ''}`}>
            <div className="case-copy">
              <span className="label">{cs.meta}</span>
              <h3 className="case-title">{project.title}</h3>
              <div className="layer-tags">
                {cs.layers.map((l) => (
                  <span key={l} className={`chip ${aiLayers.includes(l) ? 'tone-ai' : 'tone-fs'}`}>
                    {w.layerTags[l]}
                  </span>
                ))}
              </div>
              <div>
                <div className="pao"><span className="label">{w.problem}</span><span>{cs.problem}</span></div>
                <div className="pao"><span className="label">{w.built}</span><span>{cs.built}</span></div>
                <div className="pao"><span className="label">{w.outcome}</span><span>{cs.outcome}</span></div>
              </div>
              <Link to={`/projects/${slug}`} className="case-link">{w.readCase}</Link>
            </div>
            <div className="figure-col">
              <Screen />
              <span className="proof-note">{w.rebuilt}</span>
            </div>
          </Reveal>
        )
      })}

      <div className="evidence-grid">
        <Reveal as="article" className="card ev-card">
          <span className="label">{bySlug('te-ocr-backend')?.tag}</span>
          <h3><Link to="/projects/te-ocr-backend">{bySlug('te-ocr-backend')?.title}</Link></h3>
          <OcrFlow />
          <span className="proof-note">{w.redrawn}</span>
        </Reveal>
        <Reveal as="article" className="card ev-card" delay={80}>
          <span className="label">{bySlug('serverless-ai-chatbot')?.tag}</span>
          <h3><Link to="/projects/serverless-ai-chatbot">{bySlug('serverless-ai-chatbot')?.title}</Link></h3>
          <ChatbotFlow />
          <span className="proof-note">{w.redrawn}</span>
        </Reveal>
        <Reveal as="article" className="card ev-card" delay={160}>
          <span className="label">{bySlug('factory6g')?.tag}</span>
          <h3><Link to="/projects/factory6g">{bySlug('factory6g')?.title}</Link></h3>
          <img className="ev-img" src="/work/f6g-ppo.jpg" alt="PPO training curves for DRL and reliability-aware DRL" loading="lazy" width="1200" height="671" />
          <span className="proof-note">{w.thesis}</span>
        </Reveal>
      </div>

      <div className="apps">
        {apps.map(({ slug, cover }, i) => {
          const project = bySlug(slug)
          const meta = projectMeta[slug]
          if (!project || !meta?.image) return null
          return (
            <Reveal key={slug} as="figure" className="card app-card" delay={i * 60}>
              <Link to={`/projects/${slug}`} className={`app-shot${cover ? ' cover' : ''}`}>
                <img src={meta.image} alt={project.title} loading="lazy" />
              </Link>
              <figcaption>
                <b>{project.title}</b>
                <span>{cover ? w.brandSite : w.macApp}</span>
              </figcaption>
            </Reveal>
          )
        })}
      </div>

      <Reveal>
        <Link to="/projects" className="card index-teaser">
          <span>
            <span className="label">{w.indexLabel}</span>
            <strong>{w.indexTitle(projects.length)}</strong>
            <p>{w.indexSub}</p>
          </span>
          <span className="dist-bar" role="img" aria-label={groupOrder.map((g, i) => `${c.projects.groups[g].name} ${counts[i]}`).join(', ')}>
            {groupOrder.map((g, i) => (
              <span key={g} className="grow" style={{ flex: counts[i], background: groupTone[g], animationDelay: `${i * 0.1}s` }} />
            ))}
          </span>
          <span className="btn btn-primary">{w.browse(projects.length)}</span>
        </Link>
      </Reveal>
    </section>
  )
}
