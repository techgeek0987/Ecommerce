import { useState, useCallback } from 'react'

interface LoadingState {
  [key: string]: boolean
}

export function useLoading(initialState: LoadingState = {}) {
  const [loadingState, setLoadingState] = useState<LoadingState>(initialState)

  const setLoading = useCallback((key: string, isLoading: boolean) => {
    setLoadingState(prev => ({
      ...prev,
      [key]: isLoading
    }))
  }, [])

  const isLoading = useCallback((key: string) => {
    return loadingState[key] || false
  }, [loadingState])

  const isAnyLoading = useCallback(() => {
    return Object.values(loadingState).some(loading => loading)
  }, [loadingState])

  const startLoading = useCallback((key: string) => {
    setLoading(key, true)
  }, [setLoading])

  const stopLoading = useCallback((key: string) => {
    setLoading(key, false)
  }, [setLoading])

  const withLoading = useCallback(async <T>(
    key: string,
    asyncFn: () => Promise<T>,
    minDuration: number = 0
  ): Promise<T> => {
    startLoading(key)
    const startTime = Date.now()
    
    try {
      const result = await asyncFn()
      
      // Ensure minimum duration for better UX
      if (minDuration > 0) {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, minDuration - elapsed)
        if (remaining > 0) {
          await new Promise(resolve => setTimeout(resolve, remaining))
        }
      }
      
      return result
    } finally {
      stopLoading(key)
    }
  }, [startLoading, stopLoading])

  return {
    isLoading,
    isAnyLoading,
    setLoading,
    startLoading,
    stopLoading,
    withLoading,
    loadingState
  }
}

// Common loading keys for consistency
export const LoadingKeys = {
  PRODUCTS: 'products',
  PRODUCT_DETAIL: 'productDetail',
  CART: 'cart',
  WISHLIST: 'wishlist',
  SEARCH: 'search',
  CHECKOUT: 'checkout',
  USER_PROFILE: 'userProfile',
  CATEGORIES: 'categories',
  RELATED_PRODUCTS: 'relatedProducts',
  ADD_TO_CART: 'addToCart',
  ADD_TO_WISHLIST: 'addToWishlist',
  REMOVE_FROM_CART: 'removeFromCart',
  UPDATE_QUANTITY: 'updateQuantity',
} as const

export type LoadingKey = typeof LoadingKeys[keyof typeof LoadingKeys]
