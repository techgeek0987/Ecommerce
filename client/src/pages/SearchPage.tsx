import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, Grid, List, X, TrendingUp, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'
import { mockProducts } from '@/data/mockData'
import type { FilterOptions } from '@/types'
import { cn } from '@/lib/utils'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    rating: 0,
    brands: [],
    inStock: false,
    onSale: false,
    sortBy: 'name'
  })

  // Update search query from URL params
  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchQuery(query)
  }, [searchParams])

  // Get available categories and brands
  const availableCategories = Array.from(new Set(mockProducts.map(p => p.category)))
  const availableBrands = Array.from(new Set(mockProducts.map(p => p.brand).filter(Boolean))) as string[]
  const priceRange: [number, number] = [
    Math.min(...mockProducts.map(p => p.price)),
    Math.max(...mockProducts.map(p => p.price))
  ]

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      // Search query filter
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Other filters
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category)
      const matchesBrand = filters.brands.length === 0 || (product.brand && filters.brands.includes(product.brand))
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const matchesRating = filters.rating === 0 || product.rating >= filters.rating
      const matchesStock = !filters.inStock || product.inStock
      const matchesSale = !filters.onSale || product.isOnSale

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock && matchesSale
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        case 'bestseller':
          return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchQuery, filters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams({ q: searchQuery })
  }

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      rating: 0,
      brands: [],
      inStock: false,
      onSale: false,
      sortBy: 'name'
    })
  }

  const popularSearches = ['headphones', 'watch', 'electronics', 'fashion', 'home']
  const recentSearches = ['wireless headphones', 'smart watch', 'coffee mug']

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, categories..."
                  className="pl-12 pr-12 h-14 text-lg bg-background/50 backdrop-blur-sm border-2 focus:border-primary/50 shadow-lg"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
            
            {/* Search Suggestions */}
            {!searchQuery && (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchQuery(term)}
                        className="rounded-full"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <Button
                        key={term}
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery(term)}
                        className="rounded-full text-muted-foreground hover:text-foreground"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Header */}
        {searchQuery && (
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Search Results for "{searchQuery}"
                </h1>
                <p className="text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Select value={filters.sortBy} onValueChange={(value) => setFilters({...filters, sortBy: value as any})}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="bestseller">Bestseller</SelectItem>
                  </SelectContent>
                </Select>
                
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
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={cn(
            "lg:col-span-1",
            showFilters ? "block" : "hidden lg:block"
          )}>
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableCategories={availableCategories}
              availableBrands={availableBrands}
              priceRange={priceRange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {searchQuery && filteredProducts.length === 0 ? (
              <Card className="border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">No products found</h2>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any products matching "{searchQuery}". Try adjusting your search or filters.
                  </p>
                  <div className="space-y-4">
                    <Button onClick={handleClearFilters} variant="outline">
                      Clear Filters
                    </Button>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Try searching for:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {popularSearches.map((term) => (
                          <Button
                            key={term}
                            variant="ghost"
                            size="sm"
                            onClick={() => setSearchQuery(term)}
                            className="rounded-full"
                          >
                            {term}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className={cn(
                "grid gap-6",
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              )}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Tips */}
        {!searchQuery && (
          <div className="mt-16">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Search Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Get Better Results</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Use specific product names or brands</li>
                      <li>• Try different keywords or synonyms</li>
                      <li>• Use filters to narrow down results</li>
                      <li>• Check spelling and try shorter terms</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Popular Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableCategories.map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => setSearchQuery(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}