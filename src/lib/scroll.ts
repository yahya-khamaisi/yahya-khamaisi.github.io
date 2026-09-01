const HEADER_OFFSET_REM = 4

/**
 * Scroll a section id into view, clear of the sticky header. Retries a few
 * times because the element may not be in the DOM yet right after a route
 * change. Returns a cleanup that cancels any pending retry.
 */
export function scrollToSection(id: string) {
  let tries = 0
  let timer = 0
  const jump = () => {
    const el = id && document.getElementById(id)
    if (el) {
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      )
      window.scrollTo(
        0,
        el.getBoundingClientRect().top +
          window.scrollY -
          (rem * HEADER_OFFSET_REM + 8),
      )
      return
    }
    if (id && tries++ < 20) timer = window.setTimeout(jump, 50)
  }
  jump()
  return () => window.clearTimeout(timer)
}
