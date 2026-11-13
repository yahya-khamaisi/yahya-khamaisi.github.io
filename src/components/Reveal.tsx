import type { ComponentProps } from 'react'
import { BlurFade } from '@/components/ui/blur-fade'

/**
 * Fades and un-blurs its children the first time they scroll into view
 * (Magic UI BlurFade). `step` staggers items that appear together.
 */
export function Reveal({ step = 0, ...props }: Omit<ComponentProps<typeof BlurFade>, 'inView' | 'delay'> & { step?: number }) {
  return <BlurFade inView direction="up" offset={12} duration={0.5} delay={step * 0.08} {...props} />
}
