import { brands, type BrandKey } from '../data/brands'

/** A brand logo in its own colour, sized for the skill chips. */
export function BrandMark({
  brand,
  size = 18,
}: {
  brand: BrandKey
  size?: number
}) {
  const mark = brands[brand]
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
    >
      <path d={mark.path} fill={mark.color} />
    </svg>
  )
}
