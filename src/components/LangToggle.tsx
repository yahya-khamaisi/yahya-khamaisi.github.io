import { useLang } from '../i18n/LangProvider'
import { useUi } from '../i18n/useContent'

export function LangToggle() {
  const { lang, toggleLang } = useLang()
  const ui = useUi()

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggleLang}
      aria-label={ui.langSwitchTo}
      title={ui.langSwitchTo}
      lang={lang === 'ar' ? 'en' : 'ar'}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 21.5 12 21c-2.5-.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <span className="lang-toggle__label">{ui.langName}</span>
    </button>
  )
}
