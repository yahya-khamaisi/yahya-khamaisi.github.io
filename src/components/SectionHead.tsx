import type { ReactNode } from 'react'
import type { IconName } from '../data/content'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

type SectionHeadProps = {
  kicker?: string
  icon?: IconName
  title: string
  description?: string
  /** Optional right-aligned control (e.g. a "view all" link). */
  action?: ReactNode
  /** `sub` renders a lighter divider heading for a second block in one section. */
  variant?: 'main' | 'sub'
}

export function SectionHead({
  kicker,
  icon = 'spark',
  title,
  description,
  action,
  variant = 'main',
}: SectionHeadProps) {
  const className = [
    'section-head',
    variant === 'sub' && 'section-head--sub',
    action && 'section-head--row',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Reveal>
      <div className={className}>
        <div className="section-head__text">
          {kicker && (
            <div className="section-kicker">
              <Icon name={icon} />
              <span>{kicker}</span>
            </div>
          )}
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action}
      </div>
    </Reveal>
  )
}
