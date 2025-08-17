import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download, Share2 } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface ImagePreviewModalProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
  productName?: string
}

export default function ImagePreviewModal({ 
  images, 
  isOpen, 
  onClose, 
  initialIndex = 0,
  productName = 'Product'
}: ImagePreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  // Reset states when modal opens/closes or image changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setZoom(1)
      setRotation(0)
      setDragOffset({ x: 0, y: 0 })
    }
  }, [isOpen, initialIndex])

  useEffect(() => {
    setZoom(1)
    setRotation(0)
    setDragOffset({ x: 0, y: 0 })
  }, [currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          e.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          goToNext()
          break
        case '+':
        case '=':
          e.preventDefault()
          handleZoomIn()
          break
        case '-':
          e.preventDefault()
          handleZoomOut()
          break
        case '0':
          e.preventDefault()
          resetView()
          break
        case 'r':
        case 'R':
          e.preventDefault()
          handleRotate()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const resetView = () => {
    setZoom(1)
    setRotation(0)
    setDragOffset({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setDragOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(images[currentIndex])
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${productName}-image-${currentIndex + 1}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      toast.success('Image downloaded successfully')
    } catch (error) {
      toast.error('Failed to download image')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${productName} - Image ${currentIndex + 1}`,
          text: `Check out this image of ${productName}`,
          url: images[currentIndex]
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(images[currentIndex])
        toast.success('Image URL copied to clipboard')
      } catch (error) {
        toast.error('Failed to copy image URL')
      }
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none overflow-hidden">
        <div className="relative w-full h-[95vh] flex flex-col">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h2 className="font-semibold text-lg">{productName}</h2>
                <p className="text-sm text-white/70">
                  {currentIndex + 1} of {images.length} images
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Zoom controls */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.5}
                  className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-white text-sm min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>

                {/* Rotate */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRotate}
                  className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>

                {/* Download */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDownload}
                  className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                >
                  <Download className="h-4 w-4" />
                </Button>

                {/* Share */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleShare}
                  className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                >
                  <Share2 className="h-4 w-4" />
                </Button>

                {/* Close */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onClose}
                  className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Image Area */}
          <div 
            className="flex-1 relative overflow-hidden cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg) translate(${dragOffset.x / zoom}px, ${dragOffset.y / zoom}px)`,
                  transformOrigin: 'center center'
                }}
              >
                <OptimizedImage
                  src={images[currentIndex]}
                  alt={`${productName} - Image ${currentIndex + 1}`}
                  width={800}
                  height={600}
                  priority={true}
                  className="max-w-[90vw] max-h-[80vh] object-contain"
                />
              </div>
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 z-40"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 z-40"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300",
                      currentIndex === index
                        ? "border-white shadow-lg scale-110"
                        : "border-white/30 hover:border-white/60"
                    )}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`${productName} thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Keyboard shortcuts help */}
          <div className="absolute bottom-4 left-4 text-white/70 text-xs space-y-1 z-40">
            <div>← → Navigate</div>
            <div>+ - Zoom</div>
            <div>R Rotate</div>
            <div>0 Reset</div>
            <div>ESC Close</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
