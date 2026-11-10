// Layout inspired by 21st.dev "Hero Section" (ravikatiyar162): two columns, animated headline,
// actions, key figures, and an image collage. Images are the real Cloud Pillow photos.
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ArrowRight, MoonStar } from 'lucide-react'
import { COLORS, PHOTO_LIT, SIZE, type ColorId, colorOf } from '../data'
import { SkyCloud } from './Cloud'
import { cn } from '../lib/utils'

const STATS = [
  ['30', 'nuits d’essai'],
  ['2', 'hauteurs en 1'],
  ['5', 'coloris'],
]

export function Hero({ color, setColor }: { color: ColorId; setColor: (c: ColorId) => void }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 70, damping: 20 })
  const sy = useSpring(my, { stiffness: 70, damping: 20 })

  const onMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current!.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  const line1 = 'Dors sur'.split(' ')

  return (
    <section ref={ref} id="top" onPointerMove={onMove} className="grain relative isolate overflow-hidden bg-gradient-to-b from-sky via-sky to-sky-2 pt-6 pb-20 sm:pt-10 lg:pb-28">
      <SkyCloud className="pointer-events-none absolute top-24 -left-16 -z-10 w-72 opacity-70" />
      <SkyCloud className="pointer-events-none absolute -right-20 bottom-10 -z-10 w-96 opacity-60" />

      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-cloud px-4 py-2 text-sm font-bold shadow-sm ring-1 ring-line"
          >
            <span className="size-2 animate-pulse rounded-full bg-peach" aria-hidden="true" />
            Nouveau · le Cloud Pillow
          </motion.div>

          <h1 className="text-[clamp(3.2rem,8.4vw,6.8rem)] leading-[0.95] font-bold">
            {line1.map((w, i) => (
              <motion.span
                key={w}
                className="mr-[0.22em] inline-block"
                initial={{ opacity: 0, y: 50, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.1 + i * 0.12 }}
              >
                {w}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-dusk via-lilac to-peach bg-clip-text pb-2 text-transparent"
              initial={{ opacity: 0, y: 50, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            >
              un nuage.
            </motion.span>
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-6 max-w-[36ch] text-xl text-mute">
            L’oreiller en mousse à mémoire de forme, double face : un côté bas pour le dos, un côté haut pour le côté.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#offre" className="btn-sun group inline-flex min-h-14 items-center gap-2 rounded-full px-7 font-display text-lg font-semibold">
              Je veux mon nuage
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#histoire" className="inline-flex min-h-14 items-center gap-2 rounded-full px-6 font-display text-lg font-semibold ring-2 ring-line transition hover:ring-dusk">
              Découvrir
            </a>
          </motion.div>

          <motion.dl initial="h" animate="s" transition={{ staggerChildren: 0.1, delayChildren: 1 }} className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map(([n, l]) => (
              <motion.div key={l} variants={{ h: { opacity: 0, y: 12 }, s: { opacity: 1, y: 0 } }} className="grid">
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-4xl font-bold text-dusk tabular-nums">{n}</dd>
                <dd className="text-[15px] font-bold text-mute">{l}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* collage */}
        <div className="relative grid grid-cols-[1.25fr_1fr] grid-rows-[auto_auto] gap-4 sm:gap-5">
          <Tile sx={sx} sy={sy} depth={10} delay={0.2} className="row-span-2 overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgb(24_32_74/0.55)]">
            <img src={PHOTO_LIT} alt="Une femme dort sur le dos, la nuque posée sur le Cloud Pillow bleu nuit" className="h-full min-h-[340px] w-full object-cover object-[58%_center] sm:min-h-[460px]" width={1416} height={1278} />
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-2xl bg-cloud/85 px-4 py-3 text-sm font-bold backdrop-blur-md">
              <MoonStar className="size-4 shrink-0 text-dusk" aria-hidden="true" />
              Nuque soutenue, sur le dos comme sur le côté
            </div>
          </Tile>

          <Tile sx={sx} sy={sy} depth={22} delay={0.35} className="clay grid content-between gap-3 rounded-[28px] p-4">
            <ColorStage color={color} />
            <div role="radiogroup" aria-label="Couleur du Cloud Pillow" className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={color === c.id}
                  aria-label={c.name}
                  title={c.name}
                  onClick={() => setColor(c.id)}
                  className={cn('size-8 cursor-pointer rounded-full ring-2 ring-offset-2 ring-offset-cloud transition', color === c.id ? 'ring-dusk' : 'ring-transparent hover:ring-line')}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </Tile>

          <Tile sx={sx} sy={sy} depth={34} delay={0.5} className="grid content-center gap-1 rounded-[28px] bg-dusk p-5 text-on-dusk">
            <span className="font-display text-sm font-semibold tracking-[0.14em] uppercase opacity-80">Le duo</span>
            <span className="font-display text-4xl font-bold">79 €</span>
            <span className="text-[15px] font-semibold opacity-85">au lieu de 98 € · {SIZE}</span>
          </Tile>

          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 right-6 font-display text-4xl font-bold text-dusk"
            animate={reduce ? undefined : { opacity: [0, 1, 0], y: [0, -40], x: [0, 16] }}
            transition={{ duration: 3.4, repeat: Infinity }}
          >
            z
          </motion.span>
        </div>
      </div>
    </section>
  )
}

export function ColorStage({ color, className }: { color: ColorId; className?: string }) {
  const c = colorOf(color)
  return (
    <div className={cn('relative grid aspect-[1.55] place-items-center overflow-hidden rounded-[20px]', className)} style={{ background: `radial-gradient(circle at 50% 60%, ${c.hex}55, transparent 70%)` }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={c.id}
          src={c.src}
          alt={`Cloud Pillow coloris ${c.name}`}
          className="w-[92%] drop-shadow-[0_18px_18px_rgb(24_32_74/0.28)]"
          initial={{ opacity: 0, scale: 0.85, rotate: -6, y: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotate: 6, y: -10 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          width={1068}
          height={656}
        />
      </AnimatePresence>
      <span className="absolute top-2 left-3 text-sm font-bold text-ink/80">{c.name}</span>
    </div>
  )
}

function Tile({
  children,
  className,
  sx,
  sy,
  depth,
  delay,
}: {
  children: ReactNode
  className?: string
  sx: MotionValue<number>
  sy: MotionValue<number>
  depth: number
  delay: number
}) {
  const x = useTransform(sx, (v) => v * -depth)
  const y = useTransform(sy, (v) => v * -depth)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 16, delay }}
      className={cn('relative', className?.includes('row-span-2') && 'row-span-2')}
    >
      <motion.div style={{ x, y }} className={cn('relative h-full', className?.replace('row-span-2', ''))}>
        {children}
      </motion.div>
    </motion.div>
  )
}
