import { useQuickView } from '@/contexts/QuickViewContext'
import ProductQuickView from '@/components/ProductQuickView'

export default function GlobalQuickView() {
  const { currentProduct, isOpen, closeQuickView } = useQuickView()

  return (
    <ProductQuickView 
      product={currentProduct}
      isOpen={isOpen}
      onClose={closeQuickView}
    />
  )
}
