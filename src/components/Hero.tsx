import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Component, Suspense, lazy, useRef, useState, type ReactNode } from 'react'
import { EASE } from './ui'

const HeroScene = lazy(() => import('./HeroScene'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

/** Lightweight CSS version shown while 3D loads or where WebGL isn't available. */
function SceneFallback() {
  return (
    <div className="relative grid h-full w-full place-items-center" aria-hidden="true">
      <div className="h-[62%] w-[46%] rounded-full border-2 border-ice/70 shadow-[0_0_40px_rgba(124,156,255,0.25)]" />
      <div className="absolute h-[26%] w-[26%] rotate-45 rounded-[28%] bg-gradient-to-br from-steel to-ink shadow-[0_0_60px_rgba(124,156,255,0.25)]" />
    </div>
  )
}

const TAGS = [
  { label: 'Meta Ads', cls: 'left-[2%] top-[18%]' },
  { label: 'Reels & Video', cls: 'right-[0%] top-[10%]' },
  { label: 'Websites', cls: 'right-[4%] bottom-[22%]' },
  { label: 'Automation', cls: 'left-[6%] bottom-[14%]' },
]

const CATEGORIES = ['Digital Marketing', 'Social Media Management', 'Meta Ads', 'Google Ads', 'Website Development', 'Video Editing', 'Content Creation', 'Marketing Automation', 'SEO']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [webgl] = useState(hasWebGL)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  const line = (text: ReactNode, i: number) => (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.35 + i * 0.12, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  )

  return (
    <section id="home" ref={ref} className="noise relative flex min-h-[100svh] flex-col overflow-hidden pt-28 lg:pt-24">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="aurora pointer-events-none absolute -right-24 top-[18%] h-[460px] w-[460px] sm:h-[560px] sm:w-[560px]" aria-hidden="true" />

      <div className="flex flex-1 items-center pb-10">
      <div className="container-site relative grid items-center gap-6 lg:grid-cols-[1.08fr_1fr] lg:gap-4">
        <div className="relative z-10 order-2 lg:order-1">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-7"
          >
            <span className="eyebrow">Digital growth &amp; creative agency</span>
          </motion.div>

          <h1 className="h-display !leading-[0.9] text-[3rem] sm:text-7xl xl:text-[6rem]" aria-label="We turn ideas into digital growth.">
            <span aria-hidden="true">
              {line('We turn', 0)}
              {line('ideas into', 1)}
              {line(<>digital <span className="accent">growth.</span></>, 2)}
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
          >
            From powerful digital marketing strategies to stunning websites and creative content, BizzTalks helps businesses build their online presence and turn attention into opportunities.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#contact" className="btn-primary group">
              Let&rsquo;s Work Together
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#services" className="btn-ghost">Explore Our Services</a>
          </motion.div>
        </div>

        <motion.div
          style={reduce ? undefined : { y: sceneY, opacity: sceneOpacity }}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          className="relative order-1 mx-auto aspect-square w-full max-w-[320px] sm:max-w-[460px] lg:order-2 lg:max-w-none"
        >
          {webgl ? (
            <SceneBoundary fallback={<SceneFallback />}>
              <Suspense fallback={<SceneFallback />}><HeroScene /></Suspense>
            </SceneBoundary>
          ) : <SceneFallback />}
          {TAGS.map((t, i) => (
            <motion.span
              key={t.label}
              initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.15 }}
              className={`glass pointer-events-none absolute hidden rounded-full px-3.5 py-1.5 text-xs font-medium text-ice sm:block ${t.cls}`}
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan align-middle shadow-[0_0_8px_#7c9cff]" />
              {t.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
      </div>

      <a href="#about" className="relative mx-auto mb-6 hidden flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-mist transition-colors hover:text-frost sm:flex" aria-label="Scroll to About section">
        Scroll
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>

      {/* what we do, scrolling — service areas, not client logos */}
      <div className="relative border-y border-cyan/10 bg-ink/40 py-4 backdrop-blur-sm" aria-label="Service areas">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />
        <div className="overflow-hidden">
          <ul className="flex w-max animate-marquee gap-10 whitespace-nowrap text-sm font-medium text-mist">
            {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((c, i) => (
              <li key={i} className="flex items-center gap-10" aria-hidden={i >= CATEGORIES.length ? 'true' : undefined}>
                {c}<span className="h-1 w-1 rounded-full bg-gradient-to-r from-cyan to-violet" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
