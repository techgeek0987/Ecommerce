import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { cn } from '@/lib/utils'

const tabs = [
  {
    icon: Home,
    label: 'Home',
    path: '/',
    badge: null
  },
  {
    icon: Search,
    label: 'Search',
    path: '/products',
    badge: null
  },
  {
    icon: ShoppingCart,
    label: 'Cart',
    path: '/cart',
    badge: 'cart'
  },
  {
    icon: Heart,
    label: 'Wishlist',
    path: '/wishlist',
    badge: 'wishlist'
  },
  {
    icon: User,
    label: 'Profile',
    path: '/profile',
    badge: null
  }
]

// Hook for responsive detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return isMobile
}

export default function MobileBottomNav() {
  const location = useLocation()
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const isMobile = useIsMobile()

  const getBadgeCount = (badgeType: string) => {
    switch (badgeType) {
      case 'cart':
        return cartItems.reduce((sum, item) => sum + item.quantity, 0)
      case 'wishlist':
        return wishlistItems.length
      default:
        return 0
    }
  }

  // Don't show on desktop/tablet
  if (!isMobile) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2 px-4 safe-area-pb">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || 
            (tab.path === '/products' && location.pathname.startsWith('/search'))
          const badgeCount = tab.badge ? getBadgeCount(tab.badge) : 0
          const IconComponent = tab.icon

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                "relative flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-300 min-w-[60px]",
                "hover:bg-muted/50 active:scale-95",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <IconComponent 
                  className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive && "scale-110"
                  )} 
                />
                
                {/* Badge */}
                {badgeCount > 0 && (
                  <Badge
                    variant="destructive"
                    className={cn(
                      "absolute -top-2 -right-2 min-w-[18px] h-[18px] p-0 flex items-center justify-center text-[10px] font-bold",
                      "animate-in zoom-in duration-300",
                      badgeCount > 99 ? "px-1" : ""
                    )}
                  >
                    {badgeCount > 99 ? '99+' : badgeCount}
                  </Badge>
                )}
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-in zoom-in duration-300" />
                )}
              </div>
              
              <span 
                className={cn(
                  "text-[10px] font-medium mt-1 transition-all duration-300",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
      
      {/* Safe area padding for iOS */}
      <div className="h-safe-area-inset-bottom bg-background/95" />
    </nav>
  )
}

// Export hook for use in other components
export { useIsMobile as useMobileView }
