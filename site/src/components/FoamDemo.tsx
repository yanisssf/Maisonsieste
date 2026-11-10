import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Hand } from 'lucide-react'
import { Reveal, SectionHead } from './ui'

/** Press the pillow: the memory foam dents under the pointer, then slowly recovers. */
export function FoamDemo() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pct, setPct] = useState(0)
  const [state, setState] = useState<'idle' | 'press' | 'recover' | 'done'>('idle')
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    const stage = stageRef.current!
    const cv = canvasRef.current!
    const ctx = cv.getContext('2d')!
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const N = 160
    const dent = new Float32Array(N)
    let W = 0,
      H = 0,
      raf = 0,
      visible = true
    let press: { x: number; y: number } | null = null
    let pressing = false
    let lastPct = -1
    let lastState = ''
    let wasTouched = false
    const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim()

    const size = () => {
      const r = stage.getBoundingClientRect()
      const dpr = Math.min(2, devicePixelRatio || 1)
      W = r.width
      H = r.height
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new ResizeObserver(size)
    ro.observe(stage)
    size()

    const base = (t: number) => {
      const a = t * Math.PI * 2
      const r = 1 + 0.13 * Math.cos(5 * a + 0.4) + 0.04 * Math.cos(9 * a)
      const x = Math.cos(a) * 1.55 * r
      let y = Math.sin(a) * 0.78 * r
      if (y > 0.45) y = 0.45 + (y - 0.45) * 0.35
      return [x, y]
    }
    const geom = () => ({ cx: W / 2, cy: H * 0.5, s: Math.min(W / 4.3, H / 2.5) })

    const draw = () => {
      const { cx, cy, s } = geom()
      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = 0.1
      ctx.fillStyle = css('--ink')
      ctx.beginPath()
      ctx.ellipse(W / 2, H * 0.8, W * 0.33, H * 0.04, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
      const p: number[][] = []
      for (let i = 0; i < N; i++) {
        const [bx, by] = base(i / N)
        const d = dent[i] * 0.38
        const len = Math.hypot(bx, by) || 1
        p.push([cx + (bx - (bx / len) * d) * s, cy + (by - (by / len) * d) * s])
      }
      const g = ctx.createRadialGradient(W * 0.42, H * 0.3, 10, W / 2, H / 2, W * 0.5)
      g.addColorStop(0, css('--pw-1'))
      g.addColorStop(0.7, css('--pw-2'))
      g.addColorStop(1, css('--pw-3'))
      ctx.fillStyle = g
      ctx.strokeStyle = css('--pw-3')
      ctx.lineWidth = 3
      ctx.beginPath()
      for (let i = 0; i < N; i++) {
        const a = p[i],
          b = p[(i + 1) % N]
        const mx = (a[0] + b[0]) / 2,
          my = (a[1] + b[1]) / 2
        if (i === 0) ctx.moveTo(mx, my)
        else ctx.quadraticCurveTo(a[0], a[1], mx, my)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      if (press && pressing) {
        const rg = ctx.createRadialGradient(press.x, press.y, 0, press.x, press.y, 60)
        rg.addColorStop(0, css('--dusk') + '33')
        rg.addColorStop(1, css('--dusk') + '00')
        ctx.fillStyle = rg
        ctx.beginPath()
        ctx.arc(press.x, press.y, 60, 0, Math.PI * 2)
        ctx.fill()
      }
      let maxD = 0
      for (let i = 0; i < N; i++) maxD = Math.max(maxD, dent[i])
      const pc = Math.round(Math.min(1, maxD) * 100)
      if (pc !== lastPct) {
        lastPct = pc
        setPct(pc)
      }
      const st = pressing ? 'press' : pc > 2 ? 'recover' : wasTouched ? 'done' : 'idle'
      if (st !== lastState) {
        lastState = st
        setState(st as 'idle' | 'press' | 'recover' | 'done')
      }
    }

    const step = () => {
      const { cx, cy, s } = geom()
      if (pressing && press) {
        for (let i = 0; i < N; i++) {
          const [bx, by] = base(i / N)
          const d = Math.hypot(cx + bx * s - press.x, cy + by * s - press.y)
          const target = Math.max(0, 1 - d / (s * 0.75))
          if (target > dent[i]) dent[i] += (target - dent[i]) * 0.18
        }
      } else {
        for (let i = 0; i < N; i++) dent[i] *= reduce ? 0 : 0.975
      }
      for (let k = 0; k < 2; k++)
        for (let i = 0; i < N; i++) {
          const a = dent[(i - 1 + N) % N],
            b = dent[(i + 1) % N]
          dent[i] = dent[i] * 0.6 + (a + b) * 0.2
        }
      draw()
      if (visible) raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(step)
    })
    io.observe(stage)

    const pos = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const down = (e: PointerEvent) => {
      pressing = true
      wasTouched = true
      setTouched(true)
      press = pos(e)
      try {
        stage.setPointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }
    const move = (e: PointerEvent) => {
      if (pressing) press = pos(e)
    }
    const up = () => (pressing = false)
    const kd = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        pressing = true
        wasTouched = true
        setTouched(true)
        press = { x: W / 2, y: H * 0.36 }
      }
    }
    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointermove', move)
    ;['pointerup', 'pointercancel', 'pointerleave'].forEach((t) => stage.addEventListener(t, up))
    stage.addEventListener('keydown', kd)
    stage.addEventListener('keyup', up)
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      stage.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointermove', move)
      ;['pointerup', 'pointercancel', 'pointerleave'].forEach((t) => stage.removeEventListener(t, up))
      stage.removeEventListener('keydown', kd)
      stage.removeEventListener('keyup', up)
    }
  }, [])

  const note =
    state === 'press'
      ? 'La mousse épouse la pression.'
      : state === 'recover'
        ? 'Elle reprend sa forme, lentement…'
        : state === 'done'
          ? 'Revenu à sa forme. Encore ?'
          : 'Appuie ou glisse sur l’oreiller.'

  return (
    <section id="appuie" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHead eyebrow="Essaie-le avec ton doigt" title="Appuie. Regarde-le revenir.">
            Une mousse à mémoire de forme ne rebondit pas comme un coussin classique. Elle se creuse sous la pression, puis remonte doucement. C’est ce qui la rend si enveloppante.
          </SectionHead>
          <Reveal className="mt-8 grid gap-3" aria-live="polite">
            <div className="flex justify-between text-[15px] font-bold">
              <span>Enfoncement</span>
              <span className="tabular-nums">{pct} %</span>
            </div>
            <div className="h-4 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-gradient-to-r from-dusk to-lilac transition-[width] duration-150" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-mute">{note}</p>
          </Reveal>
        </div>
        <Reveal>
          <div
            ref={stageRef}
            tabIndex={0}
            role="img"
            aria-label="Oreiller interactif : appuie dessus (ou touche Entrée) pour voir la mousse se creuser puis reprendre sa forme"
            className="clay relative aspect-[4/3] cursor-pointer touch-none overflow-hidden rounded-[36px] ring-2 ring-line"
          >
            <canvas ref={canvasRef} className="block size-full" />
            <motion.div
              animate={{ opacity: touched ? 0 : 1, y: touched ? 10 : 0 }}
              className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-cloud px-4 py-2 text-[15px] font-bold whitespace-nowrap shadow-lg ring-1 ring-line"
            >
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                <Hand className="size-5 text-dusk" aria-hidden="true" />
              </motion.span>
              Appuie sur le nuage
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
