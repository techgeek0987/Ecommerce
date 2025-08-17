// import { useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Separator } from '@/components/ui/separator'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'
// import ProductCard from '@/components/ProductCard'
// import ImagePreviewModal from '@/components/ImagePreviewModal'
// import { useCart } from '@/contexts/CartContext'
// import { mockProducts } from '@/data/mockData'
// import { toast } from 'sonner'
// import { cn } from '@/lib/utils'

// export default function ProductDetailPage() {
//   const { id } = useParams<{ id: string }>()
//   const { addItem } = useCart()
//   const [quantity, setQuantity] = useState(1)
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false)

//   const product = mockProducts.find(p => p.id === id)
  
//   if (!product) {
//     return (
//       <div className="min-h-screen">
//         <Header />
//         <div className="container mx-auto px-4 py-16 text-center">
//           <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
//           <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
//           <Button asChild>
//             <Link to="/products">Back to Products</Link>
//           </Button>
//         </div>
//         <Footer />
//       </div>
//     )
//   }

//   const relatedProducts = mockProducts
//     .filter(p => p.category === product.category && p.id !== product.id)
//     .slice(0, 4)

//   const handleAddToCart = () => {
//     for (let i = 0; i < quantity; i++) {
//       addItem(product)
//     }
//     toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart`)
//   }

//   const productImages = [
//     product.image,
//     product.image,
//     product.image,
//     product.image
//   ]

//   return (
//     <div className="min-h-screen">
//       <Header />
      
//       <div className="container mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
//           <Link to="/" className="hover:text-primary">Home</Link>
//           <span>/</span>
//           <Link to="/products" className="hover:text-primary">Products</Link>
//           <span>/</span>
//           <span className="text-foreground">{product.name}</span>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-16 mb-20">
//           {/* Product Images */}
//           <div className="space-y-6">
//             <div className="relative group">
//               <button 
//                 onClick={() => setIsImagePreviewOpen(true)}
//                 className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/60 shadow-2xl cursor-zoom-in"
//               >
//                 <img
//                   src={productImages[selectedImage]}
//                   alt={product.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 {/* Image overlay with zoom hint */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   Click to zoom
//                 </div>
//               </button>
                
//                 {/* Premium badge */}
//                 <div className="absolute top-4 left-4">
//                   <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg">
//                     Premium Quality
//                   </Badge>
//                 </div>
//               </div>
              
//               {/* Decorative elements */}
//               <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-sm" />
//               <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-md" />
//             </div>
            
//             <div className="grid grid-cols-4 gap-4">
//               {productImages.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={cn(
//                     "aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md hover:shadow-lg",
//                     selectedImage === index 
//                       ? 'border-primary shadow-primary/25 scale-105' 
//                       : 'border-border hover:border-primary/50'
//                   )}
//                 >
//                   <img
//                     src={image}
//                     alt={`${product.name} ${index + 1}`}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                   />
//                   {selectedImage === index && (
//                     <div className="absolute inset-0 bg-primary/10" />
//                   )}
//                 </button>
//               ))}
//             </div>
            
//             {/* Image counter */}
//             <div className="text-center text-sm text-muted-foreground">
//               {selectedImage + 1} of {productImages.length} images
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-8">
//             <div className="space-y-6">
//               <div className="flex items-center gap-3">
//                 <Badge 
//                   variant="secondary" 
//                   className="bg-primary/10 text-primary border-primary/20 font-semibold"
//                 >
//                   {product.category}
//                 </Badge>
//                 <Badge variant="outline" className="text-xs">
//                   SKU: ES-{product.id}
//                 </Badge>
//                 {product.rating > 4.5 && (
//                   <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
//                     ⭐ Bestseller
//                   </Badge>
//                 )}
//               </div>
              
//               <h1 className="text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
//                 {product.name}
//               </h1>
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={cn(
//                           "h-5 w-5 transition-colors",
//                           i < Math.floor(product.rating)
//                             ? 'text-yellow-500 fill-current drop-shadow-sm'
//                             : 'text-gray-300'
//                         )}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-lg font-semibold text-foreground">
//                     {product.rating}
//                   </span>
//                   <span className="text-muted-foreground">
//                     ({product.reviews} reviews)
//                   </span>
//                 </div>
//                 <Button variant="outline" size="sm" className="gap-2">
//                   <Star className="h-4 w-4" />
//                   Write Review
//                 </Button>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="flex items-baseline gap-4">
//                   <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
//                     ${product.price.toFixed(2)}
//                   </p>
//                   {Math.random() > 0.5 && (
//                     <div className="flex items-center gap-2">
//                       <span className="text-xl text-muted-foreground line-through">
//                         ${(product.price * 1.3).toFixed(2)}
//                       </span>
//                       <Badge className="bg-red-500 text-white">
//                         Save ${((product.price * 1.3) - product.price).toFixed(2)}
//                       </Badge>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex items-center gap-4 text-sm">
//                   <div className="flex items-center gap-2 text-green-600">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                     <span className="font-medium">In Stock</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-blue-600">
//                     <Truck className="h-4 w-4" />
//                     <span>Free shipping on orders over $100</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-6 rounded-2xl border border-border/50">
//                 <p className="text-muted-foreground leading-relaxed text-lg">
//                   {product.description}
//                 </p>
//               </div>
//             </div>

//             {/* Quantity and Add to Cart */}
//             <div className="space-y-6">
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="font-semibold text-lg">Quantity:</span>
//                   <div className="flex items-center bg-muted/50 rounded-xl border border-border/50 shadow-sm">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="h-12 w-12 hover:bg-primary/10 hover:text-primary"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span className="px-6 py-3 min-w-[4rem] text-center font-bold text-lg">
//                       {quantity}
//                     </span>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="h-12 w-12 hover:bg-primary/10 hover:text-primary"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
                
//                 <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
//                   Total: <span className="font-bold text-primary text-lg">${(product.price * quantity).toFixed(2)}</span>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <Button 
//                   size="lg" 
//                   onClick={handleAddToCart} 
//                   className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg py-6"
//                 >
//                   <ShoppingCart className="mr-3 h-5 w-5" />
//                   Add to Cart
//                 </Button>
//                 <Button 
//                   size="lg" 
//                   variant="outline"
//                   className="border-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300 font-semibold text-lg py-6"
//                 >
//                   <Heart className="mr-3 h-5 w-5" />
//                   Save for Later
//                 </Button>
//               </div>
              
//               <Button 
//                 size="lg" 
//                 className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-lg py-6"
//               >
//                 Buy Now - ${(product.price * quantity).toFixed(2)}
//               </Button>
//             </div>

//             {/* Enhanced Features */}
//             <div className="bg-gradient-to-r from-muted/30 to-muted/20 p-6 rounded-2xl border border-border/50">
//               <h3 className="font-bold text-lg mb-4 text-center">Why Choose This Product?</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                 {[
//                   {
//                     icon: Truck,
//                     title: "Free Shipping",
//                     description: "On orders over $100",
//                     color: "text-green-600",
//                     bgColor: "bg-green-100"
//                   },
//                   {
//                     icon: Shield,
//                     title: "Secure Payment",
//                     description: "100% protected",
//                     color: "text-blue-600",
//                     bgColor: "bg-blue-100"
//                   },
//                   {
//                     icon: RefreshCw,
//                     title: "Easy Returns",
//                     description: "30-day policy",
//                     color: "text-purple-600",
//                     bgColor: "bg-purple-100"
//                   }
//                 ].map((feature, index) => (
//                   <div key={index} className="flex flex-col items-center text-center space-y-3 group">
//                     <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
//                       <feature.icon className={`h-6 w-6 ${feature.color}`} />
//                     </div>
//                     <div>
//                       <p className="font-bold text-sm">{feature.title}</p>
//                       <p className="text-xs text-muted-foreground">{feature.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Product Details Tabs */}
//         <Tabs defaultValue="description" className="mb-20">
//           <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-2xl shadow-lg border border-border/50">
//             <TabsTrigger 
//               value="description" 
//               className="rounded-xl font-semibold data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300"
//             >
//               📝 Description
//             </TabsTrigger>
//             <TabsTrigger 
//               value="specifications" 
//               className="rounded-xl font-semibold data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300"
//             >
//               ⚙️ Specifications
//             </TabsTrigger>
//             <TabsTrigger 
//               value="reviews" 
//               className="rounded-xl font-semibold data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300"
//             >
//               ⭐ Reviews ({product.reviews})
//             </TabsTrigger>
//           </TabsList>
          
//           <TabsContent value="description" className="mt-8">
//             <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-background/95">
//               <CardContent className="pt-8 pb-8">
//                 <div className="space-y-8">
//                   <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20">
//                     <p className="text-foreground leading-relaxed text-lg">
//                       {product.description}
//                     </p>
//                   </div>
                  
//                   <Separator className="my-8" />
                  
//                   <div className="space-y-6">
//                     <h3 className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
//                       ✨ Key Features
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {[
//                         { icon: "🏆", title: "Premium Quality", desc: "Made with the finest materials" },
//                         { icon: "💪", title: "Durable Construction", desc: "Built to last for years" },
//                         { icon: "🎨", title: "Modern Design", desc: "Contemporary aesthetic appeal" },
//                         { icon: "⚡", title: "Easy to Use", desc: "User-friendly and intuitive" }
//                       ].map((feature, index) => (
//                         <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors">
//                           <span className="text-2xl">{feature.icon}</span>
//                           <div>
//                             <h4 className="font-semibold text-foreground">{feature.title}</h4>
//                             <p className="text-sm text-muted-foreground">{feature.desc}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
          
//           <TabsContent value="specifications" className="mt-6">
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="font-semibold mb-4">General</h3>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Brand:</span>
//                         <span>EliteStore</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Category:</span>
//                         <span>{product.category}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">SKU:</span>
//                         <span>ES-{product.id}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-4">Details</h3>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Weight:</span>
//                         <span>1.2 kg</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Dimensions:</span>
//                         <span>25 x 15 x 10 cm</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Warranty:</span>
//                         <span>1 Year</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
          
//           <TabsContent value="reviews" className="mt-8">
//             <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-background/95">
//               <CardContent className="pt-8 pb-8">
//                 <div className="space-y-8">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
//                         Customer Reviews
//                       </h3>
//                       <p className="text-muted-foreground mt-1">
//                         See what our customers are saying about this product
//                       </p>
//                     </div>
//                     <Button className="bg-gradient-to-r from-primary to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
//                       ✍️ Write a Review
//                     </Button>
//                   </div>
                  
//                   {/* Review Summary */}
//                   <div className="bg-gradient-to-r from-muted/30 to-muted/20 p-6 rounded-2xl border border-border/50">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                       <div className="text-center">
//                         <div className="text-4xl font-bold text-primary">{product.rating}</div>
//                         <div className="flex items-center justify-center mt-2">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={cn(
//                                 "h-5 w-5",
//                                 i < Math.floor(product.rating)
//                                   ? 'text-yellow-500 fill-current'
//                                   : 'text-gray-300'
//                               )}
//                             />
//                           ))}
//                         </div>
//                         <div className="text-sm text-muted-foreground mt-1">
//                           Based on {product.reviews} reviews
//                         </div>
//                       </div>
//                       <div className="col-span-2 space-y-2">
//                         {[5, 4, 3, 2, 1].map((stars) => (
//                           <div key={stars} className="flex items-center space-x-3">
//                             <span className="text-sm w-8">{stars}★</span>
//                             <div className="flex-1 bg-muted rounded-full h-2">
//                               <div 
//                                 className="bg-yellow-500 h-2 rounded-full" 
//                                 style={{ width: `${Math.random() * 80 + 20}%` }}
//                               />
//                             </div>
//                             <span className="text-sm text-muted-foreground w-12">
//                               {Math.floor(Math.random() * 50 + 10)}%
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-6">
//                     {[
//                       { name: "Sarah Johnson", rating: 5, date: "2 days ago", review: "Absolutely love this product! The quality exceeded my expectations and shipping was incredibly fast. Highly recommend!", verified: true },
//                       { name: "Mike Chen", rating: 5, date: "1 week ago", review: "Great product! Exactly what I was looking for. High quality materials and excellent craftsmanship.", verified: true },
//                       { name: "Emma Davis", rating: 4, date: "2 weeks ago", review: "Very satisfied with my purchase. Good value for money and arrived well packaged.", verified: false }
//                     ].map((review, index) => (
//                       <div key={index} className="bg-muted/20 p-6 rounded-2xl border border-border/50 hover:bg-muted/30 transition-colors">
//                         <div className="flex items-start justify-between mb-4">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
//                               {review.name.charAt(0)}
//                             </div>
//                             <div>
//                               <div className="flex items-center space-x-2">
//                                 <span className="font-semibold">{review.name}</span>
//                                 {review.verified && (
//                                   <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
//                                     ✓ Verified Purchase
//                                   </Badge>
//                                 )}
//                               </div>
//                               <div className="flex items-center space-x-2 mt-1">
//                                 <div className="flex items-center">
//                                   {[...Array(5)].map((_, i) => (
//                                     <Star
//                                       key={i}
//                                       className={cn(
//                                         "h-4 w-4",
//                                         i < review.rating
//                                           ? 'text-yellow-500 fill-current'
//                                           : 'text-gray-300'
//                                       )}
//                                     />
//                                   ))}
//                                 </div>
//                                 <span className="text-sm text-muted-foreground">{review.date}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <p className="text-foreground leading-relaxed">
//                           {review.review}
//                         </p>
//                         <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
//                           <button className="hover:text-primary transition-colors">👍 Helpful (12)</button>
//                           <button className="hover:text-primary transition-colors">Reply</button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   <div className="text-center">
//                     <Button variant="outline" size="lg" className="font-semibold">
//                       Load More Reviews
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div>
//             <h2 className="text-2xl font-bold mb-8">Related Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {relatedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </div>
//         )}
//         </div>

//         <Footer />
        
//         {/* Image Preview Modal */}
//         <ImagePreviewModal
//           images={productImages}
//           isOpen={isImagePreviewOpen}
//           onClose={() => setIsImagePreviewOpen(false)}
//           initialIndex={selectedImage}
//           productName={product.name}
//         />
//       </div>
//   )
// }

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ImagePreviewModal from '@/components/ImagePreviewModal'
import { useCart } from '@/contexts/CartContext'
import { mockProducts } from '@/data/mockData'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false)

  const product = mockProducts.find(p => p.id === id)
  
  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart`)
  }

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative group">
              <button 
                onClick={() => setIsImagePreviewOpen(true)}
                className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/60 shadow-2xl cursor-zoom-in"
              >
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Image overlay with zoom hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to zoom
                </div>
              </button>
                
              {/* Premium badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg">
                  Premium Quality
                </Badge>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-sm" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-md" />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md hover:shadow-lg",
                    selectedImage === index 
                      ? 'border-primary shadow-primary/25 scale-105' 
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-primary/10" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Image counter */}
            <div className="text-center text-sm text-muted-foreground">
              {selectedImage + 1} of {productImages.length} images
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border-primary/20 font-semibold"
                >
                  {product.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  SKU: ES-{product.id}
                </Badge>
                {product.rating > 4.5 && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                    ⭐ Bestseller
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {product.name}
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5 transition-colors",
                          i < Math.floor(product.rating)
                            ? 'text-yellow-500 fill-current drop-shadow-sm'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    {product.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Star className="h-4 w-4" />
                  Write Review
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </p>
                  {Math.random() > 0.5 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-muted-foreground line-through">
                        ${(product.price * 1.3).toFixed(2)}
                      </span>
                      <Badge className="bg-red-500 text-white">
                        Save ${((product.price * 1.3) - product.price).toFixed(2)}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">In Stock</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-6 rounded-2xl border border-border/50">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">Quantity:</span>
                  <div className="flex items-center bg-muted/50 rounded-xl border border-border/50 shadow-sm">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-12 w-12 hover:bg-primary/10 hover:text-primary"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-6 py-3 min-w-[4rem] text-center font-bold text-lg">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-12 w-12 hover:bg-primary/10 hover:text-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  Total: <span className="font-bold text-primary text-lg">${(product.price * quantity).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  size="lg" 
                  onClick={handleAddToCart} 
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg py-6"
                >
                  <ShoppingCart className="mr-3 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300 font-semibold text-lg py-6"
                >
                  <Heart className="mr-3 h-5 w-5" />
                  Save for Later
                </Button>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-lg py-6"
              >
                Buy Now - ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Enhanced Features */}
            <div className="bg-gradient-to-r from-muted/30 to-muted/20 p-6 rounded-2xl border border-border/50">
              <h3 className="font-bold text-lg mb-4 text-center">Why Choose This Product?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: Truck,
                    title: "Free Shipping",
                    description: "On orders over $100",
                    color: "text-green-600",
                    bgColor: "bg-green-100"
                  },
                  {
                    icon: Shield,
                    title: "Secure Payment",
                    description: "100% protected",
                    color: "text-blue-600",
                    bgColor: "bg-blue-100"
                  },
                  {
                    icon: RefreshCw,
                    title: "Easy Returns",
                    description: "30-day policy",
                    color: "text-purple-600",
                    bgColor: "bg-purple-100"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center space-y-3 group">
                    <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-20">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-2xl shadow-lg border border-border/50">
            <TabsTrigger 
              value="description" 
              className="rounded-xl font-semibold data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300"
            >
              📝 Description
            </TabsTrigger>
            <TabsTrigger 
              value="specifications" 
              className="rounded-xl font-semibold data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300"
            >
              ⚙️ Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-xl font-semibold data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300"
            >
              ⭐ Reviews ({product.reviews})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-background/95">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20">
                    <p className="text-foreground leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </div>
                  
                  <Separator className="my-8" />
                  
                  <div className="space-y-6">
                    <h3 className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      ✨ Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: "🏆", title: "Premium Quality", desc: "Made with the finest materials" },
                        { icon: "💪", title: "Durable Construction", desc: "Built to last for years" },
                        { icon: "🎨", title: "Modern Design", desc: "Contemporary aesthetic appeal" },
                        { icon: "⚡", title: "Easy to Use", desc: "User-friendly and intuitive" }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors">
                          <span className="text-2xl">{feature.icon}</span>
                          <div>
                            <h4 className="font-semibold text-foreground">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">General</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Brand:</span>
                        <span>EliteStore</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SKU:</span>
                        <span>ES-{product.id}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weight:</span>
                        <span>1.2 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span>25 x 15 x 10 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Warranty:</span>
                        <span>1 Year</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-background/95">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        Customer Reviews
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        See what our customers are saying about this product
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                      ✍️ Write a Review
                    </Button>
                  </div>
                  
                  {/* Review Summary */}
                  <div className="bg-gradient-to-r from-muted/30 to-muted/20 p-6 rounded-2xl border border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary">{product.rating}</div>
                        <div className="flex items-center justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5",
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Based on {product.reviews} reviews
                        </div>
                      </div>
                      <div className="col-span-2 space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center space-x-3">
                            <span className="text-sm w-8">{stars}★</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-yellow-500 h-2 rounded-full" 
                                style={{ width: `${Math.random() * 80 + 20}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12">
                              {Math.floor(Math.random() * 50 + 10)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { name: "Sarah Johnson", rating: 5, date: "2 days ago", review: "Absolutely love this product! The quality exceeded my expectations and shipping was incredibly fast. Highly recommend!", verified: true },
                      { name: "Mike Chen", rating: 5, date: "1 week ago", review: "Great product! Exactly what I was looking for. High quality materials and excellent craftsmanship.", verified: true },
                      { name: "Emma Davis", rating: 4, date: "2 weeks ago", review: "Very satisfied with my purchase. Good value for money and arrived well packaged.", verified: false }
                    ].map((review, index) => (
                      <div key={index} className="bg-muted/20 p-6 rounded-2xl border border-border/50 hover:bg-muted/30 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">{review.name}</span>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                    ✓ Verified Purchase
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        "h-4 w-4",
                                        i < review.rating
                                          ? 'text-yellow-500 fill-current'
                                          : 'text-gray-300'
                                      )}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-foreground leading-relaxed">
                          {review.review}
                        </p>
                        <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
                          <button className="hover:text-primary transition-colors">👍 Helpful (12)</button>
                          <button className="hover:text-primary transition-colors">Reply</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <Button variant="outline" size="lg" className="font-semibold">
                      Load More Reviews
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      
      {/* Image Preview Modal */}
      <ImagePreviewModal
        images={productImages}
        isOpen={isImagePreviewOpen}
        onClose={() => setIsImagePreviewOpen(false)}
        initialIndex={selectedImage}
        productName={product.name}
      />
    </div>
  )
}