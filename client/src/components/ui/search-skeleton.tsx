import { Skeleton } from '@/components/ui/skeleton'
import { ProductGridSkeleton } from './product-skeleton'

export function SearchResultsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      
      {/* Filters and sorting */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <div className="lg:w-64 space-y-6">
          {/* Categories */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-20" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-6 ml-auto" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Price range */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-16" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
          
          {/* Brand */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-12" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Rating */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-14" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="h-3 w-3 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {/* Sort and view options */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          
          {/* Products grid */}
          <ProductGridSkeleton count={12} />
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SearchSuggestionsSkeleton() {
  return (
    <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg mt-2 p-2 z-50">
      <div className="space-y-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 px-3 py-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SearchBarSkeleton() {
  return (
    <div className="relative">
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  )
}
