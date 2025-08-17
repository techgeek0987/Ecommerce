import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { Product, WishlistItem } from '@/types'

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id)
      
      if (existingItem) {
        return state // Item already in wishlist
      }
      
      const newItem: WishlistItem = {
        id: `wishlist-${action.payload.id}`,
        product: action.payload,
        addedAt: new Date()
      }
      
      return {
        items: [...state.items, newItem]
      }
    }
    
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(item => item.product.id !== action.payload)
      }
    }
    
    case 'CLEAR_WISHLIST':
      return { items: [] }
    
    default:
      return state
  }
}

interface WishlistContextType extends WishlistState {
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
  }

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.product.id === productId)
  }

  return (
    <WishlistContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      clearWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}