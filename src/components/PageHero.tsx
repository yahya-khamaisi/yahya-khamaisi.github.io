import type { IconName } from '../data/content'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

type PageHeroProps = {
  kicker: string
  kickerIcon?: IconName
  title: string
  description: string
}

export function PageHero({
  kicker,
  kickerIcon = 'spark',
  title,
  description,
}: PageHeroProps) {
  return (
    <Reveal>
      <header className="page-hero">
        <div className="section-kicker">
          <Icon name={kickerIcon} />
          <span>{kicker}</span>
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
    </Reveal>
  )
}
