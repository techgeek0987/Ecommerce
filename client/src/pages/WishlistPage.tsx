import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, X, Share2, Filter, Grid, List, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useWishlist } from '@/contexts/WishlistContext'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function WishlistPage() {
  const { items: wishlistItems, removeItem } = useWishlist()
  const { addItem } = useCart()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeItem(productId)
    toast.success(`${productName} removed from wishlist`, {
      description: "Item removed from your wishlist"
    })
  }

  const handleAddToCart = (product: any) => {
    addItem(product)
    toast.success(`${product.name} added to cart`, {
      description: "Item successfully added to your cart",
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart"
      }
    })
  }

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => addItem(item.product))
    toast.success(`${wishlistItems.length} items added to cart`, {
      description: "All wishlist items added to your cart"
    })
  }

  const handleShareWishlist = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Wishlist link copied!', {
      description: "Share your wishlist with friends and family"
    })
  }

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.product.price - b.product.price
      case 'price-high':
        return b.product.price - a.product.price
      case 'name':
        return a.product.name.localeCompare(b.product.name)
      case 'newest':
      default:
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    }
  })

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto animate-in fade-in duration-500">
            <div className="relative mb-8">
              <Heart className="h-32 w-32 text-muted-foreground/50 mx-auto animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-muted-foreground/20 border-t-red-500 rounded-full animate-spin" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Your wishlist is empty
            </h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Save items you love for later. 
              <br />
              <span className="text-red-500 font-medium">Start building your dream collection!</span>
            </p>
            <div className="space-y-4">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Discover Products
                </Link>
              </Button>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span>Save Favorites</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>Share Lists</span>
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
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleShareWishlist}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              
              {wishlistItems.length > 0 && (
                <Button
                  onClick={handleAddAllToCart}
                  className="gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add All to Cart
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className={cn(
          "grid gap-6",
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        )}>
          {sortedItems.map((item) => (
            <Card 
              key={item.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-b from-background to-background/95"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Link to={`/product/${item.product.id}`}>
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/60">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                  
                  {/* Remove button */}
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                    onClick={() => handleRemoveFromWishlist(item.product.id, item.product.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {item.product.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="font-bold text-lg hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {item.product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl text-primary">
                        ${item.product.price.toFixed(2)}
                      </span>
                      {item.product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item.product)}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveFromWishlist(item.product.id, item.product.name)}
                      className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  
                  {/* Stock status */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        item.product.inStock ? "bg-green-500" : "bg-red-500"
                      )} />
                      {item.product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span>Free Shipping</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">You might also like</h2>
              <p className="text-muted-foreground mb-6">
                Discover more products based on your wishlist preferences
              </p>
              <Button asChild size="lg" variant="outline">
                <Link to="/products">
                  Explore Similar Products
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