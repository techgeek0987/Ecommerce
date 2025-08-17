import type { Product } from '@/types'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    description: 'Experience premium audio with our flagship wireless headphones featuring advanced noise cancellation, 30-hour battery life, and studio-quality sound.',
    rating: 4.8,
    reviews: 124,
    brand: 'AudioTech',
    sku: 'AT-WH-001',
    inStock: true,
    stockCount: 15,
    tags: ['wireless', 'noise-cancelling', 'premium', 'bluetooth'],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge (5 min = 3 hours)',
      'Premium leather headband',
      'Hi-Res Audio certified',
      'Multi-device connectivity'
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 40kHz',
      'Impedance': '32 ohms',
      'Battery Life': '30 hours (ANC on)',
      'Charging Time': '3 hours',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.2, USB-C'
    },
    isOnSale: true,
    discountPercentage: 25,
    colors: ['Black', 'Silver', 'Rose Gold'],
    weight: '250g',
    dimensions: '19 x 16 x 8 cm',
    warranty: '2 years'
  },
  {
    id: '2',
    name: 'Minimalist Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Fashion',
    description: 'Elegant minimalist watch with leather strap and Swiss movement.',
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Smart Fitness Tracker',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
    category: 'Electronics',
    description: 'Advanced fitness tracker with heart rate monitoring and GPS.',
    rating: 4.5,
    reviews: 203
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'Fashion',
    description: 'Comfortable organic cotton t-shirt in various colors.',
    rating: 4.3,
    reviews: 156
  },
  {
    id: '5',
    name: 'Ceramic Coffee Mug',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop',
    category: 'Home',
    description: 'Handcrafted ceramic coffee mug with unique design.',
    rating: 4.7,
    reviews: 67
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'Electronics',
    description: 'Portable Bluetooth speaker with excellent sound quality.',
    rating: 4.4,
    reviews: 98
  },
  {
    id: '7',
    name: 'Leather Wallet',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
    category: 'Fashion',
    description: 'Premium leather wallet with RFID protection.',
    rating: 4.6,
    reviews: 134
  },
  {
    id: '8',
    name: 'Desk Lamp',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    category: 'Home',
    description: 'Modern LED desk lamp with adjustable brightness.',
    rating: 4.5,
    reviews: 78
  },
  {
    id: '9',
    name: 'Wireless Mouse',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'Electronics',
    description: 'Ergonomic wireless mouse with precision tracking.',
    rating: 4.2,
    reviews: 167
  },
  {
    id: '10',
    name: 'Canvas Tote Bag',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Fashion',
    description: 'Durable canvas tote bag perfect for everyday use.',
    rating: 4.4,
    reviews: 92
  },
  {
    id: '11',
    name: 'Plant Pot Set',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop',
    category: 'Home',
    description: 'Set of 3 ceramic plant pots in different sizes.',
    rating: 4.6,
    reviews: 45
  },
  {
    id: '12',
    name: 'Smartphone Case',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=500&h=500&fit=crop',
    category: 'Electronics',
    description: 'Protective smartphone case with wireless charging support.',
    rating: 4.3,
    reviews: 234
  }
]