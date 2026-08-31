import { Experience } from '../components/Experience'
import { PageHero } from '../components/PageHero'

export function ExperiencePage() {
  return (
    <div className="page-stack">
      <PageHero
        kicker="Career"
        kickerIcon="experience"
        title="Experience"
        description="Five roles, most recent first — from a first backend job to owning an insurance AI portfolio. Education is listed separately."
      />
      <Experience hideIntro />
    </div>
  )
}
