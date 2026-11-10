import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { PACKS, type ColorId, type PackId } from './data'

export type Line = { key: string; id: PackId; color: ColorId; qty: number }
type Cart = {
  lines: Line[]
  count: number
  total: number
  open: boolean
  setOpen: (o: boolean) => void
  add: (id: PackId, color?: ColorId) => void
  setQty: (key: string, qty: number) => void
}

const Ctx = createContext<Cart | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([])
  const [open, setOpen] = useState(false)

  const add = useCallback((id: PackId, color: ColorId = 'marine') => {
    const key = `${id}-${color}`
    setLines((ls) => {
      const found = ls.find((l) => l.key === key)
      return found ? ls.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { key, id, color, qty: 1 }]
    })
    setOpen(true)
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.key !== key) : ls.map((l) => (l.key === key ? { ...l, qty } : l))))
  }, [])

  const value = useMemo<Cart>(() => {
    const count = lines.reduce((n, l) => n + l.qty * PACKS[l.id].pillows, 0)
    const total = lines.reduce((n, l) => n + l.qty * PACKS[l.id].price, 0)
    return { lines, count, total, open, setOpen, add, setQty }
  }, [lines, open, add, setQty])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart outside CartProvider')
  return c
}
