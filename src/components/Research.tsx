import { useContent } from '../i18n/useContent'
import { Icon } from './Icon'

export function Research() {
  const { publications } = useContent()
  return (
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
  )
}
