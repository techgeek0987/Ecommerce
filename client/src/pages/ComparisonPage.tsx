import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GitCompare, X, ShoppingCart, Heart, Star, Check, Minus, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useComparison } from '@/contexts/ComparisonContext'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function ComparisonPage() {
  const { items: comparisonItems, removeItem, clearComparison } = useComparison()
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist } = useWishlist()
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const handleRemoveFromComparison = (productId: string, productName: string) => {
    removeItem(productId)
    toast.success(`${productName} removed from comparison`, {
      description: "Item removed from comparison list"
    })
  }

  const handleAddToCart = (product: any) => {
    addItem(product)
    toast.success(`${product.name} added to cart`, {
      description: "Item successfully added to your cart"
    })
  }

  const handleAddToWishlist = (product: any) => {
    if (!isInWishlist(product.id)) {
      addToWishlist(product)
      toast.success(`${product.name} added to wishlist`, {
        description: "Item saved to your wishlist"
      })
    }
  }

  const handleClearAll = () => {
    clearComparison()
    toast.success('Comparison cleared', {
      description: "All items removed from comparison"
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Comparison link copied!', {
      description: "Share this comparison with others"
    })
  }

  // Get all unique features from all products
  const allFeatures = Array.from(
    new Set(
      comparisonItems.flatMap(item => 
        Object.keys(item.product.specifications || {})
      )
    )
  )

  if (comparisonItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto animate-in fade-in duration-500">
            <div className="relative mb-8">
              <GitCompare className="h-32 w-32 text-muted-foreground/50 mx-auto animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-muted-foreground/20 border-t-blue-500 rounded-full animate-spin" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              No products to compare
            </h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Add products to compare their features, specifications, and prices.
              <br />
              <span className="text-blue-500 font-medium">Make informed decisions!</span>
            </p>
            <div className="space-y-4">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>Compare Features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Find Best Value</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Product Comparison
              </h1>
              <p className="text-muted-foreground">
                Comparing {comparisonItems.length} {comparisonItems.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              
              <Button
                variant="destructive"
                onClick={handleClearAll}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Product Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {comparisonItems.map((item) => (
                <Card key={item.id} className="relative overflow-hidden shadow-xl border-0 bg-gradient-to-b from-background to-background/95">
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-3 right-3 z-10 shadow-lg"
                    onClick={() => handleRemoveFromComparison(item.product.id, item.product.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <CardContent className="p-0">
                    <Link to={`/product/${item.product.id}`}>
                      <div className="aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/60">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {item.product.category}
                        </Badge>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-bold text-lg hover:text-primary transition-colors line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(item.product.rating)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{item.product.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-2xl text-primary">
                          ${item.product.price.toFixed(2)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAddToCart(item.product)}
                          className="flex-1 bg-gradient-to-r from-primary to-primary/90"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleAddToWishlist(item.product)}
                          className={cn(
                            "hover:bg-red-50 hover:border-red-200",
                            isInWishlist(item.product.id) && "bg-red-50 border-red-200"
                          )}
                        >
                          <Heart className={cn(
                            "h-4 w-4",
                            isInWishlist(item.product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                          )} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Specifications Comparison */}
            {allFeatures.length > 0 && (
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitCompare className="h-5 w-5 text-primary" />
                    Detailed Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <div className="font-semibold text-muted-foreground">Brand</div>
                      {comparisonItems.map((item) => (
                        <div key={`brand-${item.id}`} className="font-medium">
                          {item.product.brand || 'N/A'}
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <div className="font-semibold text-muted-foreground">Stock Status</div>
                      {comparisonItems.map((item) => (
                        <div key={`stock-${item.id}`} className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            item.product.inStock ? "bg-green-500" : "bg-red-500"
                          )} />
                          <span className={cn(
                            "font-medium",
                            item.product.inStock ? "text-green-600" : "text-red-600"
                          )}>
                            {item.product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Features Comparison */}
                    {item.product.features && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          <div className="font-semibold text-muted-foreground">Key Features</div>
                          {comparisonItems.map((item) => (
                            <div key={`features-${item.id}`} className="space-y-1">
                              {item.product.features?.slice(0, 3).map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <Check className="h-3 w-3 text-green-500" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                              {(item.product.features?.length || 0) > 3 && (
                                <div className="text-xs text-muted-foreground">
                                  +{(item.product.features?.length || 0) - 3} more
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <Separator />
                      </>
                    )}
                    
                    {/* Specifications */}
                    {allFeatures.map((feature) => (
                      <div key={feature}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-2">
                          <div className="font-semibold text-muted-foreground">{feature}</div>
                          {comparisonItems.map((item) => (
                            <div key={`${feature}-${item.id}`} className="font-medium">
                              {item.product.specifications?.[feature] || (
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Minus className="h-3 w-3" />
                                  N/A
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Add More Products */}
        <div className="mt-12">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Compare More Products</h2>
              <p className="text-muted-foreground mb-6">
                Add up to {4 - comparisonItems.length} more products to get a comprehensive comparison
              </p>
              <Button asChild size="lg" variant="outline">
                <Link to="/products">
                  <GitCompare className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}