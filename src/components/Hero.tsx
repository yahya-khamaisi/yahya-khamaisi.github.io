import { useContent } from '../i18n/useContent'
import { useTheme } from '../theme/ThemeProvider'
import { Icon } from './Icon'
import { Magnetic } from './Magnetic'

type HeroProps = {
  compact?: boolean
}

export function Hero({ compact = false }: HeroProps) {
  const { profile, highlights, heroStack, ui } = useContent()
  const { resolved } = useTheme()
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
            src={resolved === 'light' ? profile.photoLight : profile.photo}
            alt={profile.photoAlt}
            width={420}
            height={420}
            fetchPriority="high"
            onError={(e) => {
              // Fall back to the default portrait if the light variant is missing
              const img = e.currentTarget
              if (!img.src.endsWith(profile.photo)) img.src = profile.photo
            }}
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
