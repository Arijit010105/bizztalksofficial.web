import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Fade out the loading screen once the app has painted (minimum ~700ms so it doesn't flash).
const started = performance.now()
requestAnimationFrame(() => {
  const wait = Math.max(0, 700 - (performance.now() - started))
  setTimeout(() => document.getElementById('boot')?.classList.add('done'), wait)
})
