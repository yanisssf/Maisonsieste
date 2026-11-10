import { useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, Lock, MoonStar, Truck } from 'lucide-react'
import { PillowArt, SkyCloud } from './Cloud'

const CLOUDS = [
  { x: '4%', y: '14%', w: 'w-40', depth: 30, o: 0.9, dur: 60 },
  { x: '70%', y: '6%', w: 'w-56', depth: 50, o: 0.75, dur: 80 },
  { x: '82%', y: '62%', w: 'w-32', depth: 20, o: 0.85, dur: 55 },
  { x: '-6%', y: '70%', w: 'w-64', depth: 60, o: 0.6, dur: 90 },
  { x: '40%', y: '88%', w: 'w-48', depth: 40, o: 0.7, dur: 70 },
]

type Puff = { id: number; x: number; y: number }

export function Hero({ night }: { night: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const pillowY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const pillowRot = useTransform(sx, [-1, 1], [-4, 4])
  const [puffs, setPuffs] = useState<Puff[]>([])

  const onMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current!.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onClick = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('a,button')) return
    const r = ref.current!.getBoundingClientRect()
    const id = Date.now() + Math.random()
    setPuffs((p) => [...p.slice(-8), { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    setTimeout(() => setPuffs((p) => p.filter((q) => q.id !== id)), 1600)
  }

  const words = ['Dors', 'sur']

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      onPointerDown={onClick}
      className="grain relative isolate overflow-hidden bg-gradient-to-b from-sky via-sky to-sky-2 pt-8 pb-20 sm:pt-12"
    >
      {/* sky: stars at night, sun by day */}
      <AnimatePresence>
        {night ? (
          <motion.div key="stars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className="absolute size-1 rounded-full bg-star"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 70}%`,
                  animation: `twinkle ${2 + (i % 5)}s ease-in-out ${i * 0.17}s infinite`,
                  opacity: 0.4,
                }}
              />
            ))}
            <div className="absolute top-16 right-[12%] size-24 rounded-full bg-star shadow-[0_0_80px_20px_rgb(255_217_168/0.35)]" />
            <div className="absolute top-12 right-[10%] size-24 rounded-full bg-sky" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="pointer-events-none absolute top-14 right-[12%] -z-10 size-28 rounded-full bg-peach/90 shadow-[0_0_120px_40px_rgb(255_148_102/0.35)]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {CLOUDS.map((c, i) => (
        <Drift key={i} c={c} sx={sx} sy={sy} reduce={!!reduce} />
      ))}

      {puffs.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute z-20"
          style={{ left: p.x - 30, top: p.y - 18 }}
          initial={{ scale: 0.2, opacity: 1, y: 0 }}
          animate={{ scale: 1.2, opacity: 0, y: -70 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <SkyCloud className="w-16 drop-shadow-md" />
        </motion.div>
      ))}

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-cloud/70 px-4 py-1.5 font-display text-sm font-semibold tracking-wide text-dusk ring-1 ring-line backdrop-blur"
          >
            <span className="size-2 animate-pulse rounded-full bg-peach" />
            Nouveau · le Cloud Pillow
          </motion.p>
          <h1 className="text-[clamp(3.2rem,9vw,7rem)] font-bold">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className="mr-[0.25em] inline-block"
                initial={{ opacity: 0, y: 40, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.1 + i * 0.12 }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              className="block bg-gradient-to-r from-dusk via-lilac to-peach bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              un nuage.
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 max-w-[34ch] text-xl text-mute"
          >
            L’oreiller à mémoire de forme qui épouse ta nuque, avec deux hauteurs : une pour le dos, une pour le côté.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#offre" className="btn-sun group inline-flex min-h-14 items-center gap-2 rounded-full px-7 font-display text-lg font-semibold">
              Je veux mon nuage
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="font-display font-semibold text-mute">
              dès <b className="text-2xl text-ink">49 €</b> · <span className="text-ink">2 pour 79 €</span>
            </span>
          </motion.div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-bold">
            {[
              [MoonStar, 'Essai 30 nuits'],
              [Truck, 'Livré en France'],
              [Lock, 'Paiement sécurisé'],
            ].map(([Icon, t], i) => {
              const I = Icon as typeof MoonStar
              return (
                <motion.li
                  key={t as string}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15 + i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <I className="size-5 text-dusk" aria-hidden="true" />
                  {t as string}
                </motion.li>
              )
            })}
          </ul>
          <p className="mt-6 hidden text-sm text-mute sm:block">Astuce : clique dans le ciel.</p>
        </div>

        <motion.div style={{ y: reduce ? 0 : pillowY }} className="relative mx-auto w-full max-w-[560px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.3 }}
          >
            <motion.div
              style={{ rotate: reduce ? 0 : pillowRot }}
              animate={reduce ? undefined : { y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PillowArt className="w-full drop-shadow-[0_40px_40px_rgb(79_95_192/0.25)]" />
            </motion.div>
            <div className="mx-auto -mt-4 h-5 w-2/3 rounded-[50%] bg-ink/10 blur-md" aria-hidden="true" />
          </motion.div>
          {['z', 'z', 'z'].map((z, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute font-display font-bold text-dusk"
              style={{ right: `${18 - i * 4}%`, top: `${14 - i * 4}%`, fontSize: 34 - i * 7 }}
              animate={reduce ? undefined : { opacity: [0, 1, 0], x: [0, 20], y: [0, -50] }}
              transition={{ duration: 3.6, repeat: Infinity, delay: i * 1.2 }}
            >
              {z}
            </motion.span>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ type: 'spring', delay: 1.3 }}
            className="absolute bottom-6 left-2 rounded-2xl bg-cloud px-4 py-3 font-display font-semibold shadow-xl ring-1 ring-line sm:left-0"
          >
            <span className="block text-xs tracking-widest text-dusk uppercase">Le duo</span>
            <span className="text-lg">−19 € à deux</span>
          </motion.div>
        </motion.div>
      </div>
      <style>{`@keyframes twinkle{50%{opacity:1;transform:scale(1.6)}}`}</style>
    </section>
  )
}

function Drift({
  c,
  sx,
  sy,
  reduce,
}: {
  c: (typeof CLOUDS)[number]
  sx: ReturnType<typeof useSpring>
  sy: ReturnType<typeof useSpring>
  reduce: boolean
}) {
  const x = useTransform(sx, (v) => v * -c.depth)
  const y = useTransform(sy, (v) => v * -c.depth * 0.5)
  return (
    <motion.div className={`pointer-events-none absolute -z-10 ${c.w}`} style={{ left: c.x, top: c.y, x, y }} aria-hidden="true">
      <motion.div animate={reduce ? undefined : { x: [0, 40, 0] }} transition={{ duration: c.dur / 3, repeat: Infinity, ease: 'easeInOut' }}>
        <SkyCloud opacity={c.o} className="w-full" />
      </motion.div>
    </motion.div>
  )
}
