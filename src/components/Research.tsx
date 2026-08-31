import { publications } from '../data/content'
import { Icon } from './Icon'

export function Research({ hideIntro = false }: { hideIntro?: boolean }) {
  return (
    <section className="section research-section">
      {!hideIntro ? (
        <div className="section-head">
          <div className="section-kicker">
            <Icon name="paper" />
            <span>Publications</span>
          </div>
          <h2>Research & writing</h2>
          <p>
            Publications spanning computer vision, 6G URLLC for Industry 5.0,
            VoIP security, and AI ethics.
          </p>
        </div>
      ) : (
        <div className="section-head">
          <div className="section-kicker">
            <Icon name="paper" />
            <span>Writing</span>
          </div>
          <h2>Publications</h2>
          <p>
            Papers spanning computer vision, 6G URLLC for Industry 5.0, VoIP
            security, and AI ethics.
          </p>
        </div>
      )}
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
