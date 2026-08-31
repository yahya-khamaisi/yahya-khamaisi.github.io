import { useContent } from '../i18n/useContent'
import { Icon } from './Icon'

export function Footer() {
  const { profile, ui } = useContent()
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-meta">
          <p className="footer-copy">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <span className="footer-dot" aria-hidden="true" />
          <p className="footer-tagline">{ui.builtWith}</p>
        </div>

        <div className="footer-actions">
          <div className="footer-socials">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              title="Email"
            >
              <Icon name="mail" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <Icon name="code" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Icon name="network" />
            </a>
          </div>

          <button
            type="button"
            className="footer-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>{ui.backToTop}</span>
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
