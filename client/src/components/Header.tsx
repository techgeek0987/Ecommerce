import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X, User, Heart, Sparkles, GitCompare, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useComparison } from '@/contexts/ComparisonContext'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { items: comparisonItems } = useComparison()
  const location = useLocation()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length
  const comparisonCount = comparisonItems.length

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => location.pathname === path

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "bg-background/95 backdrop-blur-md shadow-lg border-b" 
        : "bg-background/80 backdrop-blur-sm border-b border-border/40"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-lg">E</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                EliteStore
              </span>
              <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">
                Premium Collection
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/products', label: 'Products' },
              { path: '#', label: 'Categories' },
              { path: '#', label: 'About' },
              { path: '#', label: 'Contact' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group",
                  isActive(item.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                {item.label}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search premium products..."
                className="pl-10 pr-4 bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const query = (e.target as HTMLInputElement).value
                    if (query.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(query)}`
                    }
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Enhanced Right Actions */}
          <div className="flex items-center space-x-1">
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden lg:flex relative group hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex relative group hover:bg-primary/10 hover:text-red-500 transition-all duration-200"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white animate-pulse"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Comparison */}
            <Link to="/comparison">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex relative group hover:bg-primary/10 hover:text-blue-500 transition-all duration-200"
              >
                <GitCompare className="h-5 w-5" />
                {comparisonCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-500 text-white animate-pulse"
                  >
                    {comparisonCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {/* User Account */}
            <Link to="/profile">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Shopping Cart */}
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative group hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground animate-pulse"
                  >
                    {itemCount}
                  </Badge>
                )}
                {itemCount > 0 && (
                  <div className="absolute inset-0 rounded-md bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-200" />
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-5 h-5">
                <Menu className={cn("h-5 w-5 absolute transition-all duration-200", isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0")} />
                <X className={cn("h-5 w-5 absolute transition-all duration-200", isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90")} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out",
          isMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        )}>
          <div className="pt-4 space-y-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search products..."
                className="pl-10 pr-4 bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <nav className="flex flex-col space-y-1">
              {[
                { path: '/', label: 'Home', icon: '🏠' },
                { path: '/products', label: 'Products', icon: '🛍️' },
                { path: '#', label: 'Categories', icon: '📂' },
                { path: '#', label: 'About', icon: 'ℹ️' },
                { path: '#', label: 'Contact', icon: '📞' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive(item.path) && <Sparkles className="h-3 w-3 ml-auto" />}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center justify-center space-x-4 pt-4 border-t">
              <Button variant="outline" size="sm" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}