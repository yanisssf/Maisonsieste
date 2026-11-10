import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '../lib/utils'

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function Head({ eyebrow, title, children, center, dark }: { eyebrow: string; title: ReactNode; children?: ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <Reveal className={cn('grid max-w-[680px] gap-5', center && 'mx-auto justify-items-center text-center')}>
      <p className={cn('eyebrow', dark ? 'text-steel' : 'text-mute')}>{eyebrow}</p>
      <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold">{title}</h2>
      {children && <p className={cn('max-w-[56ch] text-lg', dark ? 'text-steel' : 'text-mute')}>{children}</p>}
    </Reveal>
  )
}

export function Btn({
  children,
  variant = 'dark',
  className,
  ...rest
}: { children: ReactNode; variant?: 'dark' | 'light' | 'line'; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        'sheen inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[4px] px-7 text-[15px] font-semibold tracking-wide transition-colors',
        variant === 'dark' && 'bg-ink text-white hover:bg-graphite',
        variant === 'light' && 'bg-white text-ink hover:bg-paper',
        variant === 'line' && 'text-ink ring-1 ring-ink/25 hover:ring-ink',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function LinkBtn({ children, href, variant = 'dark', className }: { children: ReactNode; href: string; variant?: 'dark' | 'light' | 'line'; className?: string }) {
  return (
    <a
      href={href}
      className={cn(
        'sheen inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] px-7 text-[15px] font-semibold tracking-wide transition-colors',
        variant === 'dark' && 'bg-ink text-white hover:bg-graphite',
        variant === 'light' && 'bg-white text-ink hover:bg-paper',
        variant === 'line' && 'text-ink ring-1 ring-ink/25 hover:ring-ink',
        className,
      )}
    >
      {children}
    </a>
  )
}
