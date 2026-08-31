import { useContent } from '../i18n/useContent'
import { Icon } from './Icon'

export function Research({ hideIntro = false }: { hideIntro?: boolean }) {
  const { publications, ui } = useContent()
  return (
    <section className="section research-section">
      <div className="section-head">
        <div className="section-kicker">
          <Icon name="paper" />
          <span>{hideIntro ? ui.publicationsKicker : ui.researchWritingKicker}</span>
        </div>
        <h2>{hideIntro ? ui.publicationsTitle : ui.researchWritingTitle}</h2>
        <p>{hideIntro ? ui.publicationsDesc : ui.researchWritingDesc}</p>
      </div>
      <ul className="pub-list">
        {publications.map((pub) => (
          <li key={pub.title}>
            <span className="pub-icon" aria-hidden="true">
              <Icon name={pub.icon} />
            </span>
            <div>
              {pub.href ? (
                <a href={pub.href} target="_blank" rel="noreferrer">
                  {pub.title}
                </a>
              ) : (
                <span className="pub-title">{pub.title}</span>
              )}
              <span className="venue">{pub.venue}</span>
              {pub.note && <p className="pub-note">{pub.note}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
