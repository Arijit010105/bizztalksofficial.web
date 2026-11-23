import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import logo from '../assets/logo-badge-sm.webp'
import { BRAND, NAV } from '../data/site'
import { plainWhatsapp } from '../lib/contact'
import { WhatsAppIcon } from './icons'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-2.5' : 'py-4 sm:py-5'}`}>
      <div className="container-site">
        <nav
          aria-label="Main"
          className={`flex items-center justify-between rounded-full px-3 py-2 pl-3 transition-all duration-500 sm:pl-4 ${scrolled ? 'glass !bg-void/90 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]' : 'border border-transparent'}`}
        >
          <a href="#home" className="flex items-center gap-2.5" aria-label={`${BRAND.name} home`}>
            <img src={logo} alt={`${BRAND.name} logo`} width={30} height={39} className="h-9 w-auto drop-shadow-[0_0_10px_rgba(124,156,255,0.35)]" />
            <span className="font-display text-lg font-bold tracking-tight text-frost">{BRAND.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active === n.id ? 'text-frost' : 'text-mist hover:text-frost'}`}
                >
                  {active === n.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={plainWhatsapp()} target="_blank" rel="noopener noreferrer" className="btn-wa !px-4 !py-2.5 text-[13px]">
              <WhatsAppIcon className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp Us</span>
              <span className="sm:hidden">Chat</span>
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 -z-10 bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-site flex h-full flex-col justify-center gap-2">
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block py-2 font-display text-4xl font-semibold tracking-tight text-frost">
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
