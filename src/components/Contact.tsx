import { useState, type FormEvent } from 'react'
import { useContent } from '../i18n/useContent'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const { profile, ui } = useContent()
  const t = ui.form
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    // Bots fill hidden fields; humans don't.
    if (data.get('_honey')) {
      setStatus('sent')
      form.reset()
      return
    }

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setError(t.validationError)
      return
    }

    setStatus('sending')
    setError('')

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            subject: data.get('subject') || t.defaultSubject,
            message,
            _template: 'table',
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Could not send message')
      }

      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
      setError(t.networkError)
    }
  }

  return (
    <div className="contact">
      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: 'none' }}
          />
          <div className="field-row">
            <label className="field">
              <span>{t.name}</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder={t.namePlaceholder}
                disabled={status === 'sending'}
              />
            </label>
            <label className="field">
              <span>{t.email}</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={t.emailPlaceholder}
                disabled={status === 'sending'}
              />
            </label>
          </div>

          <label className="field">
            <span>{t.subject}</span>
            <input
              name="subject"
              type="text"
              placeholder={t.subjectPlaceholder}
              disabled={status === 'sending'}
            />
          </label>

          <label className="field">
            <span>{t.message}</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t.messagePlaceholder}
              disabled={status === 'sending'}
            />
          </label>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t.sending : t.send}
            </button>
            {status === 'sent' && (
              <p className="form-status ok" role="status">
                {t.sent}
              </p>
            )}
            {status === 'error' && (
              <p className="form-status err" role="alert">
                {error}{' '}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            )}
          </div>

          <p className="contact-form__note">{t.note}</p>
        </form>

        <aside className="contact-aside">
          <p className="aside-label">{t.reachDirectly}</p>
          <a className="aside-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="contact-links">
            <a
              className="btn btn-ghost"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn btn-ghost"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
