import type { ReactNode } from 'react'
import type { IconName } from '../data/content'

export function Icon({
  name,
  className = '',
}: {
  name: IconName
  className?: string
}) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

const paths: Record<IconName, ReactNode> = {
  api: (
    <>
      <path d="M4 8h16M4 16h16" />
      <rect x="7" y="5" width="4" height="4" rx="1" />
      <rect x="13" y="15" width="4" height="4" rx="1" />
    </>
  ),
  cloud: (
    <path d="M7 18h10a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.7 1.5A3.5 3.5 0 0 0 7 18Z" />
  ),
  ai: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  code: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m14 5-4 14" />
    </>
  ),
  security: (
    <path d="M12 3 5 6v5c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Z" />
  ),
  docker: (
    <>
      <rect x="4" y="10" width="3.2" height="3.2" rx="0.4" />
      <rect x="8" y="10" width="3.2" height="3.2" rx="0.4" />
      <rect x="12" y="10" width="3.2" height="3.2" rx="0.4" />
      <rect x="8" y="6" width="3.2" height="3.2" rx="0.4" />
      <rect x="12" y="6" width="3.2" height="3.2" rx="0.4" />
      <path d="M3 15.5c1.5 2.2 4 3.5 9 3.5 5.5 0 8-2 9.5-4.5" />
    </>
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
    </>
  ),
  python: (
    <>
      <path d="M12 4c-3 0-4 1.5-4 4v2h8V8c0-2.5-1-4-4-4Z" />
      <path d="M12 20c3 0 4-1.5 4-4v-2H8v2c0 2.5 1 4 4 4Z" />
      <circle cx="10" cy="7" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14" cy="17" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4" />
    </>
  ),
  network: (
    <>
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="12" cy="17" r="2" />
      <path d="M8 7h8M7.5 8.5 11 15M16.5 8.5 13 15" />
    </>
  ),
  years: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 2.5" />
    </>
  ),
  research: (
    <>
      <path d="M9 3h6v7l2.5 5.5a2.5 2.5 0 0 1-2.3 3.5H8.8a2.5 2.5 0 0 1-2.3-3.5L9 10V3Z" />
      <path d="M9 3h6" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  spark: (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  ),
  work: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </>
  ),
  skills: (
    <>
      <path d="M4 17 10 5l4 8 2-4 4 8" />
    </>
  ),
  experience: (
    <>
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <rect x="4" y="7" width="16" height="14" rx="2" />
      <path d="M4 12h16" />
    </>
  ),
  paper: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-5-6Z" />
      <path d="M14 3v6h6M9 13h6M9 17h6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 8 9 6 9-6" />
    </>
  ),
  education: (
    <>
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 11.5v4.5c2 1.5 8 1.5 10 0v-4.5" />
      <path d="M21 9v7" />
    </>
  ),
}
