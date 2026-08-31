import { useTheme, type ThemePreference } from '../theme/ThemeProvider'
import { useUi } from '../i18n/useContent'

export function ThemeToggle() {
  const { preference, cyclePreference } = useTheme()
  const ui = useUi()

  const labels: Record<ThemePreference, string> = {
    system: ui.themeUsingSystem,
    light: ui.themeUsingLight,
    dark: ui.themeUsingDark,
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cyclePreference}
      aria-label={`${labels[preference]}. ${ui.themeClickToChange}`}
      title={`${labels[preference]} · ${ui.themeClickToChange}`}
    >
      {preference === 'system' && <SystemIcon />}
      {preference === 'light' && <SunIcon />}
      {preference === 'dark' && <MoonIcon />}
      <span className="theme-toggle-label">{ui.themeShort[preference]}</span>
    </button>
  )
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M8 20h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <path
        d="M19.5 13.2A7.5 7.5 0 0 1 10.8 4.5 7.8 7.8 0 1 0 19.5 13.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}
