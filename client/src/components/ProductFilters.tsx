import { useState } from 'react'
import { Filter, X, Star, DollarSign, Package, Zap, Award, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import type { FilterOptions } from '@/types'
import { cn } from '@/lib/utils'

interface ProductFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  availableCategories: string[]
  availableBrands: string[]
  priceRange: [number, number]
  onClearFilters: () => void
}

export default function ProductFilters({
  filters,
  onFiltersChange,
  availableCategories,
  availableBrands,
  priceRange,
  onClearFilters
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const updateFilters = (updates: Partial<FilterOptions>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category)
    updateFilters({ categories: newCategories })
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter(b => b !== brand)
    updateFilters({ brands: newBrands })
  }

  const activeFiltersCount = 
    filters.categories.length + 
    filters.brands.length + 
    (filters.inStock ? 1 : 0) + 
    (filters.onSale ? 1 : 0) + 
    (filters.rating > 0 ? 1 : 0)

  return (
    <Card className="sticky top-24 shadow-xl border-0 bg-gradient-to-b from-background to-background/95">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-primary" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="bg-primary/10 text-primary">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              {isExpanded ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn(
        "space-y-6 transition-all duration-300",
        !isExpanded && "hidden lg:block"
      )}>
        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <Label className="text-base font-semibold">Price Range</Label>
          </div>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
              max={priceRange[1]}
              min={priceRange[0]}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Categories */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <Label className="text-base font-semibold">Categories</Label>
          </div>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {availableCategories.map((category) => (
              <div key={category} className="flex items-center space-x-3 group">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`category-${category}`} 
                  className="text-sm font-normal group-hover:text-primary transition-colors cursor-pointer flex-1"
                >
                  {category}
                </Label>
                <Badge variant="outline" className="text-xs">
                  {Math.floor(Math.random() * 50) + 5}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Brands */}
        {availableBrands.length > 0 && (
          <>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <Label className="text-base font-semibold">Brands</Label>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {availableBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-3 group">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={(checked) => 
                        handleBrandChange(brand, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`brand-${brand}`} 
                      className="text-sm font-normal group-hover:text-primary transition-colors cursor-pointer flex-1"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Rating */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" />
            <Label className="text-base font-semibold">Minimum Rating</Label>
          </div>
          <div className="space-y-3">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3 group cursor-pointer">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={(checked) => 
                    updateFilters({ rating: checked ? rating : 0 })
                  }
                />
                <Label 
                  htmlFor={`rating-${rating}`} 
                  className="flex items-center space-x-2 cursor-pointer group-hover:text-primary transition-colors"
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < rating
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm">& up</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Quick Filters */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Quick Filters</Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-green-600" />
                <Label htmlFor="in-stock" className="text-sm font-normal">
                  In Stock Only
                </Label>
              </div>
              <Switch
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={(checked) => updateFilters({ inStock: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-red-600" />
                <Label htmlFor="on-sale" className="text-sm font-normal">
                  On Sale
                </Label>
              </div>
              <Switch
                id="on-sale"
                checked={filters.onSale}
                onCheckedChange={(checked) => updateFilters({ onSale: checked })}
              />
            </div>
          </div>
        </div>

        {/* Featured Badges */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-xl border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Special Collections</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              New Arrivals
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Bestsellers
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Premium
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}