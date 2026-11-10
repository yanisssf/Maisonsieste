// Adapted from 21st.dev "Features With Panel" (scrollxui): numbered list + sticky media panel.
// Media are animated cut-outs of the real product photo.
import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../lib/utils'
import { SectionHead } from './ui'
import { COLORS, SIZE, colorOf } from '../data'

const loop = { repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' } as const
const NAVY = colorOf('marine').src

function Frame({ children }: { children: ReactNode }) {
  return <div className="relative grid size-full place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_65%,var(--lilac)_0%,transparent_65%)]">{children}</div>
}

const ITEMS: { title: string; text: string; spec: string; media: ReactNode }[] = [
  {
    title: 'Mousse à mémoire de forme',
    text: 'Elle s’adapte à ta tête et à ta nuque, quelle que soit ta position, puis reprend doucement sa forme.',
    spec: 'Soutien enveloppant',
    media: (
      <Frame>
        <motion.img src={NAVY} alt="" className="w-[78%] drop-shadow-[0_30px_25px_rgb(24_32_74/0.35)]" style={{ originY: 1 }}
          animate={{ scaleY: [1, 0.9, 0.9, 1], scaleX: [1, 1.03, 1.03, 1] }} transition={{ duration: 3.2, ...loop }} />
        <motion.span className="absolute left-1/2 size-20 -translate-x-1/2 rounded-full bg-peach/80 blur-[2px]"
          animate={{ top: ['-10%', '30%', '30%', '-10%'], opacity: [0, 1, 1, 0] }} transition={{ duration: 3.2, ...loop }} />
      </Frame>
    ),
  },
  {
    title: 'Double face, double hauteur',
    text: 'Un côté bas pour dormir sur le dos, un côté haut pour dormir sur le côté. Tu le retournes, c’est tout.',
    spec: '2 hauteurs en 1',
    media: (
      <Frame>
        <motion.img src={NAVY} alt="" className="w-[74%] drop-shadow-[0_30px_25px_rgb(24_32_74/0.35)]"
          animate={{ rotateX: [0, 0, 180, 180, 360] }} transition={{ duration: 5, ...loop }} style={{ transformPerspective: 900 }} />
        <motion.span className="absolute top-[12%] font-display text-3xl font-semibold text-dusk" animate={{ opacity: [1, 1, 0, 0, 1] }} transition={{ duration: 5, ...loop }}>côté bas</motion.span>
        <motion.span className="absolute top-[12%] font-display text-3xl font-semibold text-peach" animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 5, ...loop }}>côté haut</motion.span>
      </Frame>
    ),
  },
  {
    title: 'Housse amovible et lavable',
    text: 'Elle s’enlève en quelques secondes et passe à la machine. La mousse, elle, s’aère simplement.',
    spec: 'Lavable en machine · 5 coloris',
    media: <CyclingColors />,
  },
  {
    title: 'Livré roulé sous vide',
    text: 'Il arrive dans un colis compact. Tu l’ouvres, et il reprend sa forme en quelques heures.',
    spec: `${SIZE} une fois déployé`,
    media: (
      <Frame>
        <motion.img src={NAVY} alt="" className="relative z-0 w-[70%] drop-shadow-[0_30px_25px_rgb(24_32_74/0.35)]" style={{ originY: 1 }}
          animate={{ scale: [0.3, 0.3, 1, 1, 0.3], y: [60, 60, -20, -20, 60] }} transition={{ duration: 4.5, ...loop }} />
        <span className="absolute bottom-[10%] z-10 h-[22%] w-[42%] rounded-2xl bg-peach shadow-xl" />
      </Frame>
    ),
  },
]

function CyclingColors() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % COLORS.length), 1600)
    return () => clearInterval(t)
  }, [])
  const c = COLORS[i]
  return (
    <Frame>
      <AnimatePresence mode="popLayout">
        <motion.img key={c.id} src={c.src} alt="" className="w-[76%] drop-shadow-[0_30px_25px_rgb(24_32_74/0.3)]"
          initial={{ x: 120, opacity: 0, rotate: 8 }} animate={{ x: 0, opacity: 1, rotate: 0 }} exit={{ x: -120, opacity: 0, rotate: -8 }} transition={{ type: 'spring', stiffness: 160, damping: 18 }} />
      </AnimatePresence>
      <span className="absolute bottom-[10%] rounded-full bg-cloud px-4 py-1.5 text-sm font-bold shadow">{c.name}</span>
    </Frame>
  )
}

export function Features() {
  const [active, setActive] = useState(0)
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <SectionHead eyebrow="Ce qu’il y a dedans" title="Simple, et bien fait." />
            <ul className="mt-10 flex flex-col gap-2">
              {ITEMS.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07, ease: 'easeOut' }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={active === i}
                    className={cn(
                      'w-full cursor-pointer rounded-3xl p-5 text-left transition-all duration-200',
                      active === i ? 'clay ring-2 ring-dusk' : 'ring-2 ring-transparent hover:bg-cloud/60',
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={cn(
                          'grid size-10 shrink-0 place-items-center rounded-full font-display text-lg font-semibold transition-colors',
                          active === i ? 'bg-dusk text-on-dusk' : 'bg-foam text-mute',
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className={cn('font-display text-xl font-semibold', active !== i && 'text-mute')}>{item.title}</span>
                    </span>
                    <AnimatePresence initial={false}>
                      {active === i && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          className="block overflow-hidden"
                        >
                          <span className="block pt-3 pl-14 text-mute">{item.text}</span>
                          <span className="block pt-2 pl-14 font-display font-semibold text-dusk">{item.spec}</span>
                          <span className="mt-4 block aspect-[4/3] overflow-hidden rounded-3xl bg-foam lg:hidden">{item.media}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="sticky top-28 hidden lg:block">
            <div className="clay relative aspect-[4/3] w-full overflow-hidden rounded-[36px] bg-foam">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 bg-foam"
                >
                  {ITEMS[active].media}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
