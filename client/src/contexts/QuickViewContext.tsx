import { createContext, useContext, useState, ReactNode } from 'react'
import type { Product } from '@/types'

interface QuickViewContextType {
  currentProduct: Product | null
  isOpen: boolean
  openQuickView: (product: Product) => void
  closeQuickView: () => void
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined)

export function useQuickView() {
  const context = useContext(QuickViewContext)
  if (!context) {
    throw new Error('useQuickView must be used within a QuickViewProvider')
  }
  return context
}

interface QuickViewProviderProps {
  children: ReactNode
}

export function QuickViewProvider({ children }: QuickViewProviderProps) {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openQuickView = (product: Product) => {
    setCurrentProduct(product)
    setIsOpen(true)
  }

  const closeQuickView = () => {
    setIsOpen(false)
    // Delay clearing the product to allow for exit animations
    setTimeout(() => setCurrentProduct(null), 300)
  }

  return (
    <QuickViewContext.Provider
      value={{
        currentProduct,
        isOpen,
        openQuickView,
        closeQuickView
      }}
    >
      {children}
    </QuickViewContext.Provider>
  )
}
