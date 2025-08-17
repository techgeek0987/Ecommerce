import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  X, 
  Plus, 
  Minus, 
  Heart, 
  ShoppingCart, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  GitCompare,
  Truck,
  Shield,
  RotateCcw,
  Eye,
  Share2,
  Zap
} from 'lucide-react'
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useComparison } from '@/contexts/ComparisonContext'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface ProductQuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { addItem: addToComparison, isInComparison, canAddMore } = useComparison()

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0)
      setQuantity(1)
      setSelectedSize('')
      setSelectedColor('')
    }
  }, [product])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          e.preventDefault()
          handlePrevImage()
          break
        case 'ArrowRight':
          e.preventDefault()
          handleNextImage()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!product) return null

  // Mock additional data
  const images = [product.image, product.image, product.image, product.image]
  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  const colors = ['Black', 'White', 'Gray', 'Navy']
  const features = product.features || [
    'Premium quality materials',
    'Comfortable fit',
    'Durable construction',
    'Easy care instructions'
  ]

  const isLiked = isInWishlist(product.id)
  const isComparing = isInComparison(product.id)
  const discountPercentage = Math.floor(Math.random() * 30) + 10
  const originalPrice = product.price * 1.3

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleAddToCart = async () => {
    if (!selectedSize && sizes.length > 0) {
      toast.error('Please select a size')
      return
    }
    if (!selectedColor && colors.length > 0) {
      toast.error('Please select a color')
      return
    }

    setIsAddingToCart(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
      
      toast.success(`${product.name} added to cart`, {
        description: `${quantity} item${quantity > 1 ? 's' : ''} added successfully`,
        action: {
          label: "View Cart",
          onClick: () => window.location.href = "/cart"
        }
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleWishlist = () => {
    if (isLiked) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist')
    }
  }

  const handleComparison = () => {
    if (isComparing) {
      // removeFromComparison(product.id) // Implement this
      toast.success('Removed from comparison')
    } else if (canAddMore) {
      addToComparison(product)
      toast.success('Added to comparison')
    } else {
      toast.error('Comparison limit reached', {
        description: "You can compare up to 4 products at once"
      })
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this amazing product: ${product.name}`,
          url: `/product/${product.id}`
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`)
      toast.success('Link copied to clipboard')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="relative bg-gradient-to-br from-muted/30 to-muted/60 p-6">
            {/* Close button */}
            <DialogClose className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background/90 transition-colors">
              <X className="h-4 w-4" />
            </DialogClose>

            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-background/50 mb-4">
              <OptimizedImage
                src={images[selectedImageIndex]}
                alt={product.name}
                width={600}
                height={600}
                priority={true}
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      selectedImageIndex === index
                        ? "bg-primary scale-125"
                        : "bg-background/60 hover:bg-background/80"
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge variant="destructive" className="animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  -{discountPercentage}%
                </Badge>
                {product.rating > 4.5 && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Star className="h-3 w-3 mr-1" />
                    Bestseller
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail navigation */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300",
                    selectedImageIndex === index
                      ? "border-primary scale-105"
                      : "border-transparent hover:border-muted-foreground/30"
                  )}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <OptimizedImage
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    priority={false}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{product.category}</Badge>
                  {product.brand && (
                    <Badge variant="secondary">{product.brand}</Badge>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold mb-3 leading-tight">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.rating)
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    Save ${(originalPrice - product.price).toFixed(2)}
                  </Badge>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {/* Size Selection */}
                {sizes.length > 0 && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Size: {selectedSize && <span className="text-primary">{selectedSize}</span>}
                    </label>
                    <div className="flex gap-2">
                      {sizes.map((size) => (
                        <Button
                          key={size}
                          variant={selectedSize === size ? "default" : "outline"}
                          size="sm"
                          className="min-w-[44px]"
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {colors.length > 0 && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Color: {selectedColor && <span className="text-primary">{selectedColor}</span>}
                    </label>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <Button
                          key={color}
                          variant={selectedColor === color ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold min-w-[3ch] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-medium mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Badges */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <Truck className="h-5 w-5 text-green-600 mb-1" />
                      <span className="text-xs font-medium">Free Shipping</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <RotateCcw className="h-5 w-5 text-blue-600 mb-1" />
                      <span className="text-xs font-medium">30-Day Returns</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Shield className="h-5 w-5 text-purple-600 mb-1" />
                      <span className="text-xs font-medium">2-Year Warranty</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-6 border-t">
              {/* Primary Actions */}
              <div className="flex gap-3">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding...
                    </div>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlist}
                  className={cn(isLiked && "border-red-300 bg-red-50")}
                >
                  <Heart className={cn(
                    "h-4 w-4",
                    isLiked && "fill-red-500 text-red-500"
                  )} />
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link to={`/product/${product.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleComparison}
                  className={cn(isComparing && "border-blue-300 bg-blue-50")}
                >
                  <GitCompare className={cn(
                    "h-4 w-4",
                    isComparing && "text-blue-600"
                  )} />
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
