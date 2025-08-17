import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  quality?: number
  className?: string
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  quality = 75,
  className,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const [imageSrc, setImageSrc] = useState(priority ? src : '')

  // Generate optimized image URLs
  const generateOptimizedUrl = (originalSrc: string, width?: number, quality?: number) => {
    // For now, just return the original src to ensure images work
    // In production, this would integrate with CDN services
    if (!originalSrc) return ''
    
    // For external URLs or if optimization fails, return original
    if (originalSrc.startsWith('http') || originalSrc.startsWith('data:')) {
      return originalSrc
    }
    
    // For relative URLs, ensure they work
    try {
      const url = new URL(originalSrc, window.location.origin)
      return url.toString()
    } catch (error) {
      console.warn('Failed to parse image URL:', originalSrc, error)
      return originalSrc
    }
  }

  // Generate srcSet for responsive images (disabled for now to fix basic functionality)
  const generateSrcSet = (originalSrc: string) => {
    // Temporarily disabled to ensure basic image loading works
    return undefined
  }

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          setImageSrc(src)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1
      }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [priority, src])

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  // Handle image error
  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Generate blur placeholder
  const blurPlaceholder = blurDataURL || `data:image/svg+xml;base64,${btoa(
    `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
    </svg>`
  )}`

  return (
    <div 
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-muted",
        className
      )}
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        minHeight: height || 200
      }}
    >
      {/* Placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
            isLoaded ? "opacity-0" : "opacity-100"
          )}
          style={{
            backgroundImage: `url(${blurPlaceholder})`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)' // Prevent blur edges
          }}
        />
      )}

      {/* Loading shimmer */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
      )}

      {/* Main image */}
      {(isInView || priority) && !hasError && (
        <img
          src={generateOptimizedUrl(imageSrc, width, quality)}
          srcSet={generateSrcSet(imageSrc)}
          sizes={sizes || (width ? `${width}px` : '100vw')}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-all duration-700",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <svg
              className="h-12 w-12 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!isLoaded && !hasError && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  )
}

// Hook for preloading images
export function useImagePreloader() {
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
  }

  const preloadImages = async (sources: string[]): Promise<void[]> => {
    return Promise.all(sources.map(preloadImage))
  }

  return { preloadImage, preloadImages }
}

// Utility for generating WebP sources with fallback
export function getWebPSource(src: string, width?: number, quality?: number): string {
  // This would typically be handled by your image optimization service
  // For demonstration, we'll return the original source
  try {
    const url = src.startsWith('http') 
      ? new URL(src) 
      : new URL(src, window.location.origin)
    
    if (width) {
      url.searchParams.set('w', width.toString())
    }
    if (quality) {
      url.searchParams.set('q', quality.toString())
    }
    url.searchParams.set('f', 'webp')
    
    return url.toString()
  } catch (error) {
    console.warn('Failed to generate WebP URL:', src, error)
    return src
  }
}
