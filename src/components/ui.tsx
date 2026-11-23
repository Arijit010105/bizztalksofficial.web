import { motion, useInView, useMotionValue, useReducedMotion, useSpring, animate } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const
const strip = (w: string) => w.replace(/[.,?!]/g, '').toLowerCase()

export function Reveal({ children, delay = 0, y = 28, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Splits a heading into words that rise in one after another. */
export function SplitHeading({ text, className = '', as = 'h2', accent }: { text: string; className?: string; as?: 'h1' | 'h2'; accent?: string[] }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag className={className} initial={reduce ? false : 'hidden'} whileInView="show" viewport={{ once: true, margin: '-40px' }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden="true">
          <motion.span
            className={`inline-block ${accent?.some((a) => strip(a) === strip(w)) ? 'accent' : ''}`}
            variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, delay: i * 0.06, ease: EASE } } }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function SectionHead({ eyebrow, title, accent, intro, center }: { eyebrow: string; title: string; accent?: string[]; intro?: string; center?: boolean }) {
  return (
    <div className={`mb-12 max-w-3xl sm:mb-16 ${center ? 'mx-auto text-center' : ''}`}>
      <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
      <SplitHeading text={title} accent={accent} className="h-display mt-5 text-[2.1rem] sm:text-5xl lg:text-[3.6rem]" />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-6 text-base leading-relaxed text-mist sm:text-lg ${center ? 'mx-auto' : ''} max-w-2xl`}>{intro}</p>
        </Reveal>
      )}
    </div>
  )
}

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** Card that tilts toward the pointer on desktop and shows a soft spotlight. */
export function TiltCard({ children, className = '', max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const [enabled] = useState(finePointer)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled || reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set(-(py - 0.5) * max * 2)
    ref.current.style.setProperty('--mx', `${px * 100}%`)
    ref.current.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(124,156,255,0.10), transparent 45%)' }}
      />
      {children}
    </motion.div>
  )
}

export function Counter({ to, suffix = '', label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduce) { ref.current.textContent = `${to}${suffix}`; return }
    const ctrl = animate(0, to, {
      duration: 1.6, ease: EASE,
      onUpdate: (v) => { if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}` },
    })
    return () => ctrl.stop()
  }, [inView, to, suffix, reduce])
  return (
    <div>
      <span ref={ref} className="text-gradient font-display text-5xl font-semibold tracking-tight sm:text-6xl">0{suffix}</span>
      <p className="mt-2 text-sm text-mist">{label}</p>
    </div>
  )
}

/** Soft glow that follows the cursor on desktop only. */
export function CursorGlow() {
  const x = useSpring(useMotionValue(-400), { stiffness: 120, damping: 20 })
  const y = useSpring(useMotionValue(-400), { stiffness: 120, damping: 20 })
  const [on] = useState(finePointer)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!on || reduce) return
    const move = (e: globalThis.PointerEvent) => { x.set(e.clientX - 200); y.set(e.clientY - 200) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [on, reduce, x, y])
  if (!on || reduce) return null
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full"
      style={{ x, y, background: 'radial-gradient(circle, rgba(124,156,255,0.07), transparent 65%)' }}
    />
  )
}
