import type { Project } from '../data/content'
import { ProductScreen } from './ProductScreen'

/** A project's product screen on a tinted backdrop, sized by its container. */
export function Thumb({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <span className={`thumb thumb--${project.category}${large ? ' thumb--lg' : ''}`}>
      <ProductScreen kind={project.mock} title={project.title} />
    </span>
  )
}
