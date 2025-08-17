import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import HomePage from '@/pages/HomePage'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import ProfilePage from '@/pages/ProfilePage'
import WishlistPage from '@/pages/WishlistPage'
import ComparisonPage from '@/pages/ComparisonPage'
import SearchPage from '@/pages/SearchPage'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { ComparisonProvider } from '@/contexts/ComparisonContext'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ecommerce-theme">
      <CartProvider>
        <WishlistProvider>
          <ComparisonProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/comparison" element={<ComparisonPage />} />
                  <Route path="/search" element={<SearchPage />} />
                </Routes>
                <Toaster 
                  position="top-right"
                  expand={true}
                  richColors
                  closeButton
                />
              </div>
            </Router>
          </ComparisonProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App