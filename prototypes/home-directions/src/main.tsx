// PROTOTYPE, throw away: app-shell directions for the home page, switchable via ?variant=F,I,J,K,L,M
// Earlier rounds (B, C, E, G, H; A and D dropped) live in ./variants/archive and are no longer in the switcher.
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Switcher } from './Switcher'
import { VariantF } from './variants/F-app'
import { VariantI } from './variants/I-ide'
import { VariantJ } from './variants/J-dashboard'
import { VariantK } from './variants/K-launcher'
import { VariantL } from './variants/L-workspace'
import { VariantM } from './variants/M-desktop'

export const VARIANTS = [
  { key: 'F', name: 'App shell (original)', Component: VariantF },
  { key: 'I', name: 'IDE', Component: VariantI },
  { key: 'J', name: 'Dashboard app', Component: VariantJ },
  { key: 'K', name: 'Launcher', Component: VariantK },
  { key: 'L', name: 'Light workspace', Component: VariantL },
  { key: 'M', name: 'Desktop', Component: VariantM },
] as const

function readVariant() {
  const v = new URLSearchParams(location.search).get('variant')
  return VARIANTS.some((x) => x.key === v) ? (v as string) : 'F'
}

function App() {
  const [variant, setVariant] = useState(readVariant)
  useEffect(() => {
    const url = new URL(location.href)
    url.searchParams.set('variant', variant)
    history.replaceState(null, '', url)
    window.scrollTo(0, 0)
  }, [variant])
  const current = VARIANTS.find((x) => x.key === variant)!
  return (
    <>
      <current.Component />
      {import.meta.env.DEV && (
        <Switcher variants={VARIANTS} current={variant} onChange={setVariant} />
      )}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
