import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Heart, ShoppingCart, Eye, Plus, Zap, Award, GitCompare, Sparkles, Timer, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useComparison } from '@/contexts/ComparisonContext'
import type { Product } from '@/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { addItem: addToComparison, removeItem: removeFromComparison, isInComparison, canAddMore } = useComparison()
  const [isLoading, setIsLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const isLiked = isInWishlist(product.id)
  const isComparing = isInComparison(product.id)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 400))
    
    addItem(product)
    toast.success(`${product.name} added to cart`, {
      description: "Item successfully added to your cart",
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart"
      }
    })
    setIsLoading(false)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLiked) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist', {
        description: "Item removed from your wishlist"
      })
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist', {
        description: "Item saved to your wishlist",
        action: {
          label: "View Wishlist",
          onClick: () => console.log("Navigate to wishlist")
        }
      })
    }
  }

  const handleComparison = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isComparing) {
      removeFromComparison(product.id)
      toast.success('Removed from comparison', {
        description: "Item removed from comparison"
      })
    } else {
      if (canAddMore) {
        addToComparison(product)
        toast.success('Added to comparison', {
          description: "Item added to comparison list",
          action: {
            label: "Compare Now",
            onClick: () => console.log("Navigate to comparison")
          }
        })
      } else {
        toast.error('Comparison limit reached', {
          description: "You can compare up to 4 products at once"
        })
      }
    }
  }

  const discountPercentage = product.discountPercentage || Math.floor(Math.random() * 30) + 10
  const isOnSale = product.isOnSale || Math.random() > 0.6
  const isBestseller = product.isBestseller || product.rating > 4.5
  const isNew = product.isNew || Math.random() > 0.8
  const originalPrice = product.originalPrice || (isOnSale ? product.price * 1.3 : null)
  const stockLevel = product.stockCount || Math.floor(Math.random() * 50) + 1
  const isLowStock = stockLevel < 10

  return (
    <Card 
      className="group relative overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-b from-background to-background/95 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <Link to={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/60">
            {/* Image with loading state */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br from-muted/50 to-muted animate-pulse",
              imageLoaded && "opacity-0"
            )} />
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            {/* Animated border on hover */}
            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-500 rounded-lg" />
            
            {/* Top badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              <Badge 
                variant="secondary" 
                className="bg-background/95 backdrop-blur-md text-xs font-semibold shadow-lg border border-border/50"
              >
                {product.category}
              </Badge>
              {isOnSale && (
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold shadow-lg animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  -{discountPercentage}%
                </Badge>
              )}
              {isBestseller && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                  <Award className="h-3 w-3 mr-1" />
                  Bestseller
                </Badge>
              )}
              {isNew && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold shadow-lg">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New
                </Badge>
              )}
              {isLowStock && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold shadow-lg animate-pulse">
                  <Timer className="h-3 w-3 mr-1" />
                  Only {stockLevel} left
                </Badge>
              )}
            </div>

            {/* Stock indicator */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg font-bold px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
            
            {/* Enhanced action buttons with staggered animation */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
              <Button 
                size="icon" 
                variant="secondary" 
                className={cn(
                  "bg-background/95 backdrop-blur-md hover:bg-background shadow-xl border border-border/50 transition-all duration-300",
                  "opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 delay-100",
                  isLiked && "bg-red-50 border-red-200"
                )}
                onClick={handleWishlist}
              >
                <Heart className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isLiked ? "fill-red-500 text-red-500 scale-110" : "text-muted-foreground hover:text-red-500"
                )} />
              </Button>
              
              <Button 
                size="icon" 
                variant="secondary" 
                className={cn(
                  "bg-background/95 backdrop-blur-md hover:bg-background shadow-xl border border-border/50 transition-all duration-300",
                  "opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 delay-150",
                  isComparing && "bg-blue-50 border-blue-200"
                )}
                onClick={handleComparison}
              >
                <GitCompare className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isComparing ? "text-blue-600 scale-110" : "text-muted-foreground hover:text-blue-600"
                )} />
              </Button>
              
              <Button 
                size="icon" 
                variant="secondary" 
                className={cn(
                  "bg-background/95 backdrop-blur-md hover:bg-background shadow-xl border border-border/50 transition-all duration-300",
                  "opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 delay-200"
                )}
                asChild
              >
                <Link to={`/product/${product.id}`}>
                  <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </Link>
              </Button>
            </div>
            
            {/* Quick add button with enhanced animation */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 delay-150">
              <Button 
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl backdrop-blur-md border border-primary/20 font-semibold"
                size="sm"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Adding...</span>
                  </div>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    <span>Quick Add</span>
                  </>
                )}
              </Button>
            </div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </Link>
        
        <div className="p-6 space-y-4 bg-gradient-to-b from-background to-background/80">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-lg hover:text-primary transition-colors line-clamp-2 leading-tight group-hover:text-primary">
              {product.name}
            </h3>
          </Link>
          
          {/* Enhanced rating section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4 transition-all duration-200",
                      i < Math.floor(product.rating)
                        ? 'text-yellow-500 fill-current drop-shadow-sm'
                        : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              {product.reviews} reviews
            </span>
          </div>
          
          {/* Enhanced price section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-xl text-primary">
                ${product.price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through bg-muted/50 px-2 py-1 rounded">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={handleAddToCart}
              disabled={isLoading}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-lg"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Enhanced product highlights */}
          <div className="space-y-3 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <div className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  product.inStock ? "bg-green-500" : "bg-red-500"
                )} />
                {product.inStock ? (isLowStock ? `Only ${stockLevel} left` : 'In Stock') : 'Out of Stock'}
              </span>
              <span className="text-muted-foreground">Free Shipping</span>
            </div>
            
            {/* Brand and additional info */}
            <div className="flex items-center justify-between text-xs">
              {product.brand && (
                <span className="text-primary font-medium">by {product.brand}</span>
              )}
              {product.rating > 4.7 && (
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="font-medium">Top Rated</span>
                </div>
              )}
            </div>
            
            {/* Quick features preview */}
            {isHovered && product.features && (
              <div className="animate-in slide-in-from-bottom duration-300">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Features: </span>
                  {product.features.slice(0, 2).join(', ')}
                  {product.features.length > 2 && '...'}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}