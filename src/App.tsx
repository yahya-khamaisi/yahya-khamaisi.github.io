import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LangProvider } from './i18n/LangProvider'
import { SettingsProvider } from './settings/SettingsProvider'
import { SiteLayout } from './layouts/SiteLayout'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import './App.css'

/** Old multi-page routes now map to sections of the single page. */
const legacyRedirects: Record<string, string> = {
  '/experience': 'experience',
  '/education': 'education',
  '/skills': 'skills',
  '/research': 'education',
  '/contact': 'contact',
}

export default function App() {
  return (
    <LangProvider>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<HomePage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectDetailPage />} />
              {Object.entries(legacyRedirects).map(([from, section]) => (
                <Route
                  key={from}
                  path={from}
                  element={
                    <Navigate to="/" state={{ section }} replace />
                  }
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </LangProvider>
  )
}
