import type { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '../lib/utils'

export function Reveal({ children, className, delay = 0, ...rest }: { children: ReactNode; className?: string; delay?: number } & HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay }}
      {...(rest as object)}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('font-display text-sm font-semibold tracking-[0.14em] text-dusk uppercase', className)}>{children}</p>
}

export function SectionHead({
  eyebrow,
  title,
  children,
  center,
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  center?: boolean
}) {
  return (
    <Reveal className={cn('grid max-w-[640px] gap-4', center && 'mx-auto text-center')}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-[clamp(2.3rem,5vw,3.9rem)] font-bold">{title}</h2>
      {children && <p className="text-lg text-mute">{children}</p>}
    </Reveal>
  )
}
