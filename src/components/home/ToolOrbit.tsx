import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'
import { useContent, useCopy } from '../../i18n/useContent'
import { orbitTools } from '../../data/site'

/** AI tools on the inner ring, full-stack tools on the outer ring, you in the middle. */
export function ToolOrbit() {
  const { profile } = useContent()
  const s = useCopy().skills
  return (
    <div
      dir="ltr"
      role="img"
      aria-label={`${s.inner}: ${orbitTools.ai.join(', ')}. ${s.outer}: ${orbitTools.fs.join(', ')}.`}
      className="relative flex aspect-square w-full items-center justify-center overflow-hidden"
    >
      <Avatar className="size-16 ring-2 ring-chart-2">
        <AvatarImage src={profile.photo} alt="" className="object-cover object-top" />
        <AvatarFallback>YK</AvatarFallback>
      </Avatar>
      <OrbitingCircles radius={150} duration={70} iconSize={1}>
        {orbitTools.fs.map((t) => (
          <Badge key={t} variant="outline" className="bg-card text-xs whitespace-nowrap shadow-sm">{t}</Badge>
        ))}
      </OrbitingCircles>
      <OrbitingCircles radius={84} duration={46} iconSize={1} reverse>
        {orbitTools.ai.map((t) => (
          <Badge key={t} variant="outline" className="border-chart-2/60 bg-card text-xs whitespace-nowrap shadow-sm">{t}</Badge>
        ))}
      </OrbitingCircles>
    </div>
  )
}
