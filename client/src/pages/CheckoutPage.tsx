import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

export default function CheckoutPage() {
    const navigate = useNavigate()
    const { items, total, clearCart } = useCart()
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('card')

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000))

        clearCart()
        toast.success('Order placed successfully!')
        navigate('/')
        setIsProcessing(false)
    }

    const subtotal = total
    const shipping = total > 100 ? 0 : 9.99
    const tax = total * 0.08
    const finalTotal = subtotal + shipping + tax

    if (items.length === 0) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">Add some items to your cart before checking out.</p>
                    <Button asChild>
                        <Link to="/products">Continue Shopping</Link>
                    </Button>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link to="/cart">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Cart
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                    <p className="text-muted-foreground">
                        Complete your order by providing your payment details
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Checkout Form */}
                        <div className="space-y-8">
                            {/* Contact Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            required
                                            className="mt-1"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Shipping Address */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Shipping Address</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            required
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                value={formData.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="state">State</Label>
                                            <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Select state" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="CA">California</SelectItem>
                                                    <SelectItem value="NY">New York</SelectItem>
                                                    <SelectItem value="TX">Texas</SelectItem>
                                                    <SelectItem value="FL">Florida</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="zipCode">ZIP Code</Label>
                                            <Input
                                                id="zipCode"
                                                value={formData.zipCode}
                                                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="country">Country</Label>
                                            <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="US">United States</SelectItem>
                                                    <SelectItem value="CA">Canada</SelectItem>
                                                    <SelectItem value="UK">United Kingdom</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Method */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="card" id="card" />
                                            <Label htmlFor="card" className="flex items-center space-x-2">
                                                <CreditCard className="h-4 w-4" />
                                                <span>Credit Card</span>
                                            </Label>
                                        </div>
                                    </RadioGroup>

                                    {paymentMethod === 'card' && (
                                        <div className="space-y-4 pt-4">
                                            <div>
                                                <Label htmlFor="cardNumber">Card Number</Label>
                                                <Input
                                                    id="cardNumber"
                                                    placeholder="1234 5678 9012 3456"
                                                    value={formData.cardNumber}
                                                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                                    required
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="expiryDate">Expiry Date</Label>
                                                    <Input
                                                        id="expiryDate"
                                                        placeholder="MM/YY"
                                                        value={formData.expiryDate}
                                                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                                        required
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="cvv">CVV</Label>
                                                    <Input
                                                        id="cvv"
                                                        placeholder="123"
                                                        value={formData.cvv}
                                                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                                                        required
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="nameOnCard">Name on Card</Label>
                                                <Input
                                                    id="nameOnCard"
                                                    value={formData.nameOnCard}
                                                    onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                                                    required
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Order Items */}
                                    <div className="space-y-3">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm truncate">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium text-sm">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator />

                                    {/* Pricing */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>${finalTotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Security Features */}
                                    <div className="bg-muted p-4 rounded-lg space-y-2">
                                        <div className="flex items-center space-x-2 text-sm">
                                            <Shield className="h-4 w-4 text-green-600" />
                                            <span>Secure SSL encryption</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm">
                                            <Truck className="h-4 w-4 text-blue-600" />
                                            <span>Free shipping on orders over $100</span>
                                        </div>
                                    </div>

                                    {/* Terms */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" required />
                                        <Label htmlFor="terms" className="text-sm">
                                            I agree to the{' '}
                                            <Link to="#" className="text-primary hover:underline">
                                                Terms of Service
                                            </Link>{' '}
                                            and{' '}
                                            <Link to="#" className="text-primary hover:underline">
                                                Privacy Policy
                                            </Link>
                                        </Label>
                                    </div>

                                    {/* Place Order Button */}
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? 'Processing...' : `Place Order - $${finalTotal.toFixed(2)}`}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}