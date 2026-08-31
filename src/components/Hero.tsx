import { Link } from 'react-router-dom'
import { useContent } from '../i18n/useContent'
import { Icon } from './Icon'
import { Magnetic } from './Magnetic'

type HeroProps = {
  compact?: boolean
}

export function Hero({ compact = false }: HeroProps) {
  const { profile, highlights, heroStack, ui } = useContent()
  return (
    <section className={`hero${compact ? ' hero--compact' : ''}`}>
      <div className="hero-copy">
        <p className="hero-eyebrow">
          <span className="dot" aria-hidden="true" />
          {ui.heroEyebrow(profile.location)}
        </p>
        <h1 className="brand">{profile.name}</h1>
        <p className="hero-tagline">{profile.headline}</p>
        <p className="lede">{profile.summary}</p>
        <div className="cta-row">
          <Magnetic strength={12}>
            <Link className="btn btn-primary" to="/projects">
              {ui.seeProjects}
            </Link>
          </Magnetic>
          <Magnetic strength={12}>
            <a
              className="btn btn-ghost"
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
            >
              {ui.downloadCv}
            </a>
          </Magnetic>
          <Magnetic strength={12}>
            <Link className="btn btn-ghost" to="/contact">
              {ui.contact}
            </Link>
          </Magnetic>
        </div>
        <ul className="hero-stack" aria-label="Core stack">
          {heroStack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>

      <Magnetic className="hero-portrait-wrap" strength={10}>
        <div className="hero-portrait">
          <img
            className="hero-photo"
            src={profile.photo}
            alt={profile.photoAlt}
            width={420}
            height={420}
            fetchPriority="high"
          />
        </div>
      </Magnetic>

      {!compact && (
        <ul className="highlight-strip">
          {highlights.map((item, i) => (
            <li
              key={item.label}
              className="highlight-item"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="highlight-icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <div>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
