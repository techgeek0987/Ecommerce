import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck, Shield, Headphones, RefreshCw, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductGridSkeleton } from '@/components/ui/product-skeleton'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { mockProducts } from '@/data/mockData'
import { useLoading, LoadingKeys } from '@/hooks/useLoading'
import { useEffect } from 'react'

export default function HomePage() {
    const { isLoading, withLoading } = useLoading()
    const featuredProducts = mockProducts.slice(0, 8)

    // Simulate loading featured products
    useEffect(() => {
        withLoading(LoadingKeys.PRODUCTS, async () => {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1200))
        }, 600) // Minimum 600ms for better UX
    }, [])

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent_50%)]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 animate-in slide-in-from-left duration-1000">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-2">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 animate-pulse">
                                        ✨ New Collection 2024
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        Limited Edition
                                    </Badge>
                                </div>

                                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                    <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                                        Discover Your
                                    </span>
                                    <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent block">
                                        Perfect Style
                                    </span>
                                </h1>

                                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                                    Explore our curated collection of premium products designed for the modern lifestyle.
                                    <span className="text-primary font-medium"> Quality meets elegance.</span>
                                </p>

                                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span>Free Shipping</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                        <span>30-Day Returns</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                        <span>Premium Quality</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="group shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                                    <Link to="/products">
                                        Shop Collection
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="lg" className="group hover:bg-primary/5 transition-all duration-300">
                                    <Star className="mr-2 h-4 w-4 group-hover:text-yellow-500 transition-colors" />
                                    View Lookbook
                                </Button>
                            </div>

                            <div className="flex items-center space-x-8 pt-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">10K+</div>
                                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">500+</div>
                                    <div className="text-sm text-muted-foreground">Premium Products</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">4.9</div>
                                    <div className="text-sm text-muted-foreground">Rating</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative animate-in slide-in-from-right duration-1000 delay-300">
                            <div className="relative">
                                {/* Main hero image container */}
                                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden shadow-2xl">
                                    {/* Animated background elements */}
                                    <div className="absolute inset-0">
                                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
                                        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/15 rounded-full blur-lg animate-pulse delay-1000" />
                                        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/20 rounded-full blur-md animate-pulse delay-500" />
                                    </div>

                                    {/* Center logo */}
                                    <div className="relative z-10 text-9xl font-bold text-primary/30 animate-pulse">
                                        E
                                    </div>

                                    {/* Floating product cards */}
                                    <div className="absolute top-8 right-8 w-20 h-20 bg-background rounded-xl shadow-lg flex items-center justify-center animate-bounce delay-1000">
                                        <ShoppingCart className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="absolute bottom-8 left-8 w-16 h-16 bg-background rounded-lg shadow-lg flex items-center justify-center animate-bounce delay-500">
                                        <Heart className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div className="absolute top-1/2 left-4 w-12 h-12 bg-background rounded-full shadow-lg flex items-center justify-center animate-bounce delay-700">
                                        <Star className="h-5 w-5 text-yellow-500" />
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-sm" />
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-md" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge variant="outline" className="mb-4">Why Choose EliteStore</Badge>
                        <h2 className="text-3xl font-bold mb-4">Premium Shopping Experience</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We're committed to providing you with the best shopping experience through our premium services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Truck,
                                title: "Free Shipping",
                                description: "Free shipping on orders over $100",
                                color: "text-green-600",
                                bgColor: "bg-green-100",
                                delay: "delay-0"
                            },
                            {
                                icon: Shield,
                                title: "Secure Payment",
                                description: "100% secure payment processing",
                                color: "text-blue-600",
                                bgColor: "bg-blue-100",
                                delay: "delay-100"
                            },
                            {
                                icon: RefreshCw,
                                title: "Easy Returns",
                                description: "30-day return policy",
                                color: "text-purple-600",
                                bgColor: "bg-purple-100",
                                delay: "delay-200"
                            },
                            {
                                icon: Headphones,
                                title: "24/7 Support",
                                description: "Round-the-clock customer service",
                                color: "text-orange-600",
                                bgColor: "bg-orange-100",
                                delay: "delay-300"
                            }
                        ].map((feature, index) => (
                            <Card
                                key={index}
                                className={`group text-center border-0 shadow-lg bg-background/50 backdrop-blur-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${feature.delay} animate-in slide-in-from-bottom`}
                            >
                                <CardContent className="pt-8 pb-6">
                                    <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        <feature.icon className={`h-8 w-8 ${feature.color}`} />
                                    </div>
                                    <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <div className="mt-4 w-12 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Discover our handpicked selection of premium products that combine style, quality, and value.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {isLoading(LoadingKeys.PRODUCTS) ? (
                            // Use ProductGridSkeleton but only show 8 items
                            Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="animate-in slide-in-from-bottom" style={{ animationDelay: `${index * 100}ms` }}>
                                    <Card className="group relative overflow-hidden shadow-lg">
                                        <CardContent className="p-0">
                                            <div className="relative aspect-square overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted animate-pulse" />
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div className="space-y-2">
                                                    <div className="h-6 bg-muted rounded animate-pulse" />
                                                    <div className="h-6 bg-muted rounded w-3/4 animate-pulse" />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex space-x-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <div key={i} className="h-4 w-4 bg-muted rounded-full animate-pulse" />
                                                            ))}
                                                        </div>
                                                        <div className="h-4 w-8 bg-muted rounded animate-pulse" />
                                                    </div>
                                                    <div className="h-5 w-16 bg-muted rounded-full animate-pulse" />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                                                    <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            featuredProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="animate-in slide-in-from-bottom"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))
                        )}
                    </div>

                    <div className="text-center">
                        <Button size="lg" variant="outline" asChild>
                            <Link to="/products">
                                View All Products
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-gradient-to-b from-background to-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge variant="outline" className="mb-4">Explore Collections</Badge>
                        <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Discover our carefully curated categories, each designed to meet your unique style and needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Electronics",
                                description: "Latest gadgets and tech accessories",
                                gradient: "from-blue-500/20 via-blue-400/10 to-blue-300/5",
                                textColor: "text-blue-600",
                                icon: "📱",
                                count: "120+ Products"
                            },
                            {
                                name: "Fashion",
                                description: "Trendy clothing and accessories",
                                gradient: "from-purple-500/20 via-purple-400/10 to-purple-300/5",
                                textColor: "text-purple-600",
                                icon: "👗",
                                count: "200+ Products"
                            },
                            {
                                name: "Home & Living",
                                description: "Beautiful items for your home",
                                gradient: "from-green-500/20 via-green-400/10 to-green-300/5",
                                textColor: "text-green-600",
                                icon: "🏠",
                                count: "150+ Products"
                            }
                        ].map((category, index) => (
                            <Card
                                key={index}
                                className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg"
                            >
                                <CardContent className="p-0">
                                    <div className={`aspect-[4/3] bg-gradient-to-br ${category.gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
                                        {/* Background pattern */}
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-current rounded-full" />
                                            <div className="absolute top-8 right-8 w-4 h-4 border border-current rounded-full" />
                                            <div className="absolute bottom-6 left-8 w-6 h-6 border border-current rounded-full" />
                                            <div className="absolute bottom-4 right-4 w-3 h-3 bg-current rounded-full" />
                                        </div>

                                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                            {category.icon}
                                        </div>
                                        <span className={`text-3xl font-bold ${category.textColor} group-hover:scale-105 transition-transform duration-300`}>
                                            {category.name}
                                        </span>

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Product count badge */}
                                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {category.count}
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gradient-to-b from-background to-background/50">
                                        <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-4">
                                            {category.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-primary">
                                                Explore Collection
                                            </span>
                                            <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}