import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { Product, ComparisonItem } from '@/types'

interface ComparisonState {
  items: ComparisonItem[]
  maxItems: number
}

type ComparisonAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_COMPARISON' }

const comparisonReducer = (state: ComparisonState, action: ComparisonAction): ComparisonState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id)
      
      if (existingItem) {
        return state // Item already in comparison
      }
      
      if (state.items.length >= state.maxItems) {
        return state // Max items reached
      }
      
      const newItem: ComparisonItem = {
        id: `comparison-${action.payload.id}`,
        product: action.payload
      }
      
      return {
        ...state,
        items: [...state.items, newItem]
      }
    }
    
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload)
      }
    }
    
    case 'CLEAR_COMPARISON':
      return { ...state, items: [] }
    
    default:
      return state
  }
}

interface ComparisonContextType extends ComparisonState {
  addItem: (product: Product) => boolean
  removeItem: (productId: string) => void
  clearComparison: () => void
  isInComparison: (productId: string) => boolean
  canAddMore: boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(comparisonReducer, { items: [], maxItems: 4 })

  const addItem = (product: Product): boolean => {
    if (state.items.length >= state.maxItems) {
      return false
    }
    dispatch({ type: 'ADD_ITEM', payload: product })
    return true
  }

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  const clearComparison = () => {
    dispatch({ type: 'CLEAR_COMPARISON' })
  }

  const isInComparison = (productId: string) => {
    return state.items.some(item => item.product.id === productId)
  }

  const canAddMore = state.items.length < state.maxItems

  return (
    <ComparisonContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      clearComparison,
      isInComparison,
      canAddMore
    }}>
      {children}
    </ComparisonContext.Provider>
  )
}

export const useComparison = () => {
  const context = useContext(ComparisonContext)
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider')
  }
  return context
}