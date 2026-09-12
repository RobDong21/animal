import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { Toaster } from '@/components/ui/sonner'
import './index.css'
import App from './App.jsx'

const UPDATE_CHECK_INTERVAL_MS = 5 * 60 * 1000

registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return

    const checkForUpdates = () => {
      registration.update().catch(() => {})
    }

    // iPad home-screen PWAs often stay suspended and miss update checks.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkForUpdates()
    })
    window.addEventListener('focus', checkForUpdates)
    setInterval(checkForUpdates, UPDATE_CHECK_INTERVAL_MS)
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
)
