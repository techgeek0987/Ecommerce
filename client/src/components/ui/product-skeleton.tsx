import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductSkeleton() {
  return (
    <Card className="group relative overflow-hidden shadow-lg">
      <CardContent className="p-0">
        {/* Image skeleton */}
        <div className="relative aspect-square overflow-hidden">
          <Skeleton className="w-full h-full" />
          
          {/* Top badges skeleton */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          
          {/* Action buttons skeleton */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
          
          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
          
          {/* Additional info */}
          <div className="space-y-3 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-18" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image gallery skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-md" />
            ))}
          </div>
        </div>
        
        {/* Product info skeleton */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-12" />
            <span>/</span>
            <Skeleton className="h-4 w-20" />
            <span>/</span>
            <Skeleton className="h-4 w-16" />
          </div>
          
          {/* Title and badges */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
          
          {/* Price */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          {/* Variants */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded-full" />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-5 w-12" />
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL'].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-12 rounded-md" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 w-12" />
          </div>
          
          {/* Features */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-20" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related products */}
      <div className="mt-16">
        <Skeleton className="h-8 w-48 mb-8" />
        <ProductGridSkeleton count={4} />
      </div>
    </div>
  )
}
