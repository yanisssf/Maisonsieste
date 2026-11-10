// Reproduces the 21st.dev "Text Parallax Content" pattern (uniquesonu): a sticky image that
// shrinks and dims as you scroll, with copy that slides through it. Scenes use the real photos.
import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { COLORS, PHOTO_LIT, colorOf } from '../data'
import { SkyCloud } from './Cloud'

const PAD = 12
const TOP = 80 // clears the sticky nav

export function TextParallaxContent({
  scene,
  subheading,
  heading,
  children,
  id,
  light,
}: {
  light?: boolean
  scene: ReactNode
  subheading: string
  heading: string
  children?: ReactNode
  id?: string
}) {
  return (
    <div id={id} style={{ paddingLeft: PAD, paddingRight: PAD }}>
      <div className="relative h-[150vh]">
        <StickyScene light={light}>{scene}</StickyScene>
        <OverlayCopy heading={heading} subheading={subheading} light={light} />
      </div>
      {children}
    </div>
  )
}

function StickyScene({ children, light }: { children: ReactNode; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['end end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const dim = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.div
      ref={ref}
      style={{ height: `calc(100vh - ${TOP + PAD}px)`, top: TOP, scale: reduce ? 1 : scale }}
      className="sticky z-0 overflow-hidden rounded-[36px]"
    >
      {children}
      {!light && <div className="absolute inset-0 bg-gradient-to-t from-[#0F1430]/70 via-[#0F1430]/25 to-[#0F1430]/10" />}
      <motion.div className="absolute inset-0 bg-[#0F1430]/70" style={{ opacity: reduce ? 0 : dim }} />
    </motion.div>
  )
}

function OverlayCopy({ subheading, heading, light }: { subheading: string; heading: string; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [250, -250])
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0])
  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y, opacity }}
      className={`absolute top-0 left-0 flex h-screen w-full flex-col items-center justify-start pt-[24vh] px-4 text-center ${light ? 'text-[#18204A]' : 'text-[#F6F7FF]'}`}
    >
      <p className="mb-3 font-display text-lg font-semibold tracking-[0.14em] uppercase opacity-90 md:text-2xl">{subheading}</p>
      <p className="max-w-[16ch] font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] font-bold [text-shadow:0_6px_30px_rgb(15_20_48/0.35)]">{heading}</p>
    </motion.div>
  )
}

/* ---------- scenes ---------- */

export function PhotoScene() {
  return <img src={PHOTO_LIT} alt="" className="absolute inset-0 size-full object-cover object-[60%_center]" />
}

export function DoubleFaceScene() {
  const reduce = useReducedMotion()
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,#FFFFFF_0%,#FFE1D2_35%,#D9CCFF_75%,#BFC9F5_100%)]">
      <SkyCloud className="absolute top-[12%] left-[6%] w-56" />
      <SkyCloud className="absolute right-[8%] bottom-[18%] w-72 opacity-80" />
      <motion.img
        src={colorOf('marine').src}
        alt=""
        className="absolute top-[68%] left-1/2 w-[min(80%,620px)] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_50px_40px_rgb(24_32_74/0.4)]"
        animate={reduce ? undefined : { rotate: [0, -3, 0, 3, 0], y: [0, -14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export function ColorsScene() {
  const reduce = useReducedMotion()
  return (
    <div className="absolute inset-0 bg-[linear-gradient(160deg,#F6E9FF_0%,#E9EEFF_45%,#FFE3D6_100%)]">
      <div className="absolute inset-0 flex flex-wrap content-center items-center justify-center gap-[2vw] px-[4vw] pt-[38vh]">
        {COLORS.map((c, i) => (
          <motion.img
            key={c.id}
            src={c.src}
            alt=""
            className="w-[min(30vw,300px)] drop-shadow-[0_24px_24px_rgb(24_32_74/0.25)]"
            animate={reduce ? undefined : { y: [0, -16, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}
