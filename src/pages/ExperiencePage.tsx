import { Experience } from '../components/Experience'
import { PageHero } from '../components/PageHero'
import { useContent } from '../i18n/useContent'

export function ExperiencePage() {
  const { pageHero } = useContent()
  return (
    <div className="page-stack">
      <PageHero
        kicker={pageHero.experience.kicker}
        kickerIcon="experience"
        title={pageHero.experience.title}
        description={pageHero.experience.description}
      />
      <Experience hideIntro />
    </div>
  )
}
