import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Maximize2, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CONTACT, WORK_CATEGORIES, type WorkCategoryId, type WorkItem } from '../data/site'
import { WORK_ITEMS } from '../data/work'
import { selectService } from '../lib/contact'
import { InstagramIcon } from './icons'
import { Reveal, SectionHead } from './ui'

const S = { stroke: '#d9e1ff', fill: 'none', strokeWidth: 1.4 }

/** Abstract line illustrations, one per category, in the badge's outline style. */
function Art({ id }: { id: WorkCategoryId }) {
  const common = 'h-full w-full transition-transform duration-700 group-hover:scale-105'
  switch (id) {
    case 'social':
      return (
        <svg viewBox="0 0 200 150" className={common} aria-hidden="true">
          {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={46 + c * 38} y={14 + r * 42} width="32" height="36" rx="6" {...S} opacity={r === 1 && c === 1 ? 1 : 0.4} stroke={r === 1 && c === 1 ? '#7c9cff' : S.stroke} />
          )))}
          <path d="M96 70l8 8 12-14" {...S} stroke="#7c9cff" />
        </svg>
      )
    case 'campaigns':
      return (
        <svg viewBox="0 0 200 150" className={common} aria-hidden="true">
          {[30, 48, 40, 66, 58, 88].map((h, i) => (
            <rect key={i} x={40 + i * 22} y={125 - h} width="14" height={h} rx="3" {...S} opacity={0.35 + i * 0.12} />
          ))}
          <path d="M40 92 L70 80 L100 86 L130 58 L168 30" {...S} stroke="#7c9cff" strokeWidth={2} />
          <path d="M156 28 L168 30 L164 42" {...S} stroke="#7c9cff" strokeWidth={2} />
        </svg>
      )
    case 'websites':
      return (
        <svg viewBox="0 0 200 150" className={common} aria-hidden="true">
          <rect x="36" y="20" width="128" height="104" rx="8" {...S} />
          <path d="M36 36h128" {...S} opacity={0.5} />
          {[44, 52, 60].map((x) => <circle key={x} cx={x} cy="28" r="2" fill="#d9e1ff" opacity={0.6} />)}
          <rect x="48" y="48" width="60" height="8" rx="2" {...S} stroke="#7c9cff" />
          <rect x="48" y="62" width="40" height="4" rx="2" {...S} opacity={0.5} />
          <rect x="48" y="78" width="30" height="10" rx="5" {...S} stroke="#7c9cff" />
          <rect x="118" y="48" width="34" height="62" rx="5" {...S} opacity={0.5} />
        </svg>
      )
    case 'portfolios':
      return (
        <svg viewBox="0 0 200 150" className={common} aria-hidden="true">
          <rect x="58" y="16" width="84" height="118" rx="12" {...S} />
          <circle cx="100" cy="54" r="18" {...S} stroke="#7c9cff" />
          <path d="M76 96h48M84 106h32" {...S} opacity={0.6} />
          <path d="M40 75 L58 66 M160 75 L142 66" {...S} opacity={0.3} />
          <ellipse cx="100" cy="75" rx="74" ry="28" {...S} opacity={0.25} strokeDasharray="4 6" />
        </svg>
      )
    case 'video':
      return (
        <svg viewBox="0 0 200 150" className={common} aria-hidden="true">
          <rect x="44" y="20" width="112" height="72" rx="8" {...S} />
          <path d="M92 44 L114 56 L92 68 Z" {...S} stroke="#7c9cff" />
          <path d="M44 112h112" {...S} opacity={0.4} />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={44 + i * 29} y="104" width="24" height="16" rx="3" {...S} opacity={i === 1 ? 1 : 0.35} stroke={i === 1 ? '#7c9cff' : S.stroke} />)}
          <path d="M88 98v28" stroke="#7c9cff" strokeWidth={2} />
        </svg>
      )
    case 'branding':
      return (
        <svg viewBox="0 0 200 150" className={common} aria-hidden="true">
          <rect x="72" y="14" width="56" height="122" rx="28" {...S} />
          <rect x="80" y="22" width="40" height="106" rx="20" {...S} opacity={0.3} />
          <path d="M60 75h80" {...S} stroke="#7c9cff" />
          <circle cx="100" cy="48" r="9" {...S} opacity={0.6} />
          <path d="M92 100l8-12 8 12z" {...S} opacity={0.6} />
        </svg>
      )
  }
}

type Preview = { kind: 'item'; item: WorkItem } | { kind: 'category'; id: WorkCategoryId }

function Lightbox({ preview, onClose }: { preview: Preview; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [onClose])
  const cat = WORK_CATEGORIES.find((c) => c.id === (preview.kind === 'item' ? preview.item.category : preview.id))!
  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-void/85 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={preview.kind === 'item' ? preview.item.title : cat.title}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="glass relative w-full max-w-3xl overflow-hidden rounded-3xl bg-ink/90"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} autoFocus className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-void/70 text-frost hover:bg-void" aria-label="Close preview">
          <X className="h-5 w-5" />
        </button>
        {preview.kind === 'item' ? (
          <>
            <img src={preview.item.image} alt={preview.item.alt} className="max-h-[70vh] w-full object-contain bg-void" />
            <div className="p-6">
              <p className="eyebrow">{cat.title}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-frost">{preview.item.title}</h3>
              {preview.item.description && <p className="mt-2 text-mist">{preview.item.description}</p>}
              {preview.item.link && (
                <a href={preview.item.link} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-5">View project <ArrowUpRight className="h-4 w-4" /></a>
              )}
            </div>
          </>
        ) : (
          <div className="grid gap-0 sm:grid-cols-2">
            <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-steel/60 to-void p-8 sm:aspect-auto"><Art id={preview.id} /></div>
            <div className="p-7 sm:p-8">
              <p className="eyebrow">Our Work</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-frost">{cat.title}</h3>
              <p className="mt-3 text-mist">{cat.text}</p>
              <p className="mt-4 text-sm text-mist/80">Project samples for this category are being added to the site. See our latest posts and reels on Instagram in the meantime.</p>
              <div className="mt-6 flex flex-col gap-3">
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost"><InstagramIcon className="h-4 w-4" /> See it on Instagram</a>
                <button type="button" className="btn-primary" onClick={() => { onClose(); selectService(cat.service) }}>Discuss a project like this</button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  const [filter, setFilter] = useState<'all' | WorkCategoryId>('all')
  const [preview, setPreview] = useState<Preview | null>(null)
  const hasItems = WORK_ITEMS.length > 0
  const items = useMemo(() => WORK_ITEMS.filter((w) => filter === 'all' || w.category === filter), [filter])
  const cats = WORK_CATEGORIES.filter((c) => filter === 'all' || c.id === filter)

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-site">
        <SectionHead
          eyebrow="Our Work"
          title="Ideas, made visible."
          accent={['visible.']}
          intro="A look at the kinds of work we create, from scroll-stopping social designs to conversion-focused websites. Tap any tile to take a closer look."
        />

        <Reveal>
          <div className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter work by category">
            {[{ id: 'all' as const, title: 'All work' }, ...WORK_CATEGORIES].map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${filter === c.id ? 'text-white' : 'glass text-mist hover:text-frost'}`}
              >
                {filter === c.id && <motion.span layoutId="work-tab" className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-cyan-deep to-violet-deep shadow-[0_8px_24px_-8px_rgba(124,100,255,0.8)]" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                <span className="relative">{c.title}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {hasItems
              ? items.map((w) => (
                  <motion.button
                    layout key={w.title} type="button"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setPreview({ kind: 'item', item: w })}
                    className="group glass relative aspect-[4/3] overflow-hidden rounded-3xl text-left"
                  >
                    <img src={w.image} alt={w.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                    <span className="absolute bottom-0 p-5">
                      <span className="block text-xs uppercase tracking-widest text-cyan">{WORK_CATEGORIES.find((c) => c.id === w.category)?.title}</span>
                      <span className="mt-1 block font-display text-lg font-semibold text-frost">{w.title}</span>
                    </span>
                    <Maximize2 className="absolute right-4 top-4 h-5 w-5 text-frost opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.button>
                ))
              : cats.map((c, i) => (
                  <motion.button
                    layout key={c.id} type="button"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setPreview({ kind: 'category', id: c.id })}
                    className={`group glass glow-border relative flex flex-col overflow-hidden rounded-3xl text-left ${i === 0 && filter === 'all' ? 'lg:col-span-2' : ''}`}
                    aria-label={`Preview ${c.title}`}
                  >
                    <span className="relative block h-56 bg-gradient-to-br from-steel/50 via-ink to-void p-6 sm:h-64">
                      <span className="grid-lines absolute inset-0 opacity-50" />
                      <span className="relative block h-full"><Art id={c.id} /></span>
                      <Maximize2 className="absolute right-4 top-4 h-5 w-5 text-frost opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="block p-6">
                      <span className="block font-display text-lg font-semibold text-frost">{c.title}</span>
                      <span className="mt-1 block text-sm text-mist">{c.text}</span>
                    </span>
                  </motion.button>
                ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-10 text-center">
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <InstagramIcon className="h-4 w-4" /> See our latest work on Instagram
          </a>
        </Reveal>
      </div>

      {createPortal(<AnimatePresence>{preview && <Lightbox preview={preview} onClose={() => setPreview(null)} />}</AnimatePresence>, document.body)}
    </section>
  )
}
