export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  description: string
  rating: number
  reviews: number
  brand?: string
  sku?: string
  inStock: boolean
  stockCount?: number
  tags?: string[]
  features?: string[]
  specifications?: Record<string, string>
  isNew?: boolean
  isBestseller?: boolean
  isOnSale?: boolean
  discountPercentage?: number
  colors?: string[]
  sizes?: string[]
  weight?: string
  dimensions?: string
  warranty?: string
}

export interface CartItem extends Product {
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

export interface WishlistItem {
  id: string
  product: Product
  addedAt: Date
}

export interface ComparisonItem {
  id: string
  product: Product
}

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  rating: number
  brands: string[]
  inStock: boolean
  onSale: boolean
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'bestseller'
}