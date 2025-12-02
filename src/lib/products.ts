export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'protein' | 'supplements' | 'pre-workout' | 'accessories';
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: 'Best Seller' | 'New' | 'Sale';
  flavors?: string[];
  sizes?: string[];
}

export const proteinProducts: Product[] = [
  {
    id: 'whey-1',
    name: 'Premium Whey Protein',
    description: '100% pure whey protein isolate for muscle recovery and growth',
    price: 49.99,
    originalPrice: 69.99,
    image: 'protein-whey',
    category: 'protein',
    rating: 4.8,
    reviews: 342,
    inStock: true,
    badge: 'Best Seller',
    flavors: ['Chocolate', 'Vanilla', 'Strawberry', 'Cookies & Cream'],
    sizes: ['1kg', '2kg', '5kg']
  },
  {
    id: 'casein-1',
    name: 'Slow Release Casein',
    description: 'Night-time protein formula for sustained muscle recovery',
    price: 44.99,
    originalPrice: 59.99,
    image: 'protein-casein',
    category: 'protein',
    rating: 4.6,
    reviews: 198,
    inStock: true,
    badge: 'Sale',
    flavors: ['Chocolate', 'Vanilla'],
    sizes: ['1kg', '2kg']
  },
  {
    id: 'plant-1',
    name: 'Plant-Based Protein',
    description: 'Vegan protein blend from peas, rice, and hemp',
    price: 39.99,
    image: 'protein-plant',
    category: 'protein',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    badge: 'New',
    flavors: ['Chocolate', 'Vanilla', 'Berry'],
    sizes: ['1kg', '2kg']
  },
  {
    id: 'mass-1',
    name: 'Mass Gainer Pro',
    description: 'High-calorie protein blend for serious muscle mass',
    price: 54.99,
    image: 'protein-mass',
    category: 'protein',
    rating: 4.5,
    reviews: 221,
    inStock: true,
    flavors: ['Chocolate', 'Vanilla', 'Banana'],
    sizes: ['3kg', '5kg']
  },
  {
    id: 'bcaa-1',
    name: 'BCAA Energy Boost',
    description: 'Branch chain amino acids for recovery and energy',
    price: 29.99,
    originalPrice: 39.99,
    image: 'supplement-bcaa',
    category: 'supplements',
    rating: 4.6,
    reviews: 287,
    inStock: true,
    badge: 'Sale',
    flavors: ['Lemon', 'Watermelon', 'Grape'],
    sizes: ['300g', '500g']
  },
  {
    id: 'creatine-1',
    name: 'Pure Creatine Monohydrate',
    description: 'Micronized creatine for strength and power',
    price: 24.99,
    image: 'supplement-creatine',
    category: 'supplements',
    rating: 4.9,
    reviews: 412,
    inStock: true,
    badge: 'Best Seller',
    sizes: ['250g', '500g', '1kg']
  },
  {
    id: 'pre-1',
    name: 'Extreme Pre-Workout',
    description: 'Maximum energy and focus for intense workouts',
    price: 34.99,
    image: 'preworkout-extreme',
    category: 'pre-workout',
    rating: 4.7,
    reviews: 324,
    inStock: true,
    badge: 'Best Seller',
    flavors: ['Fruit Punch', 'Blue Raspberry', 'Green Apple'],
    sizes: ['300g', '600g']
  },
  {
    id: 'shaker-1',
    name: 'Premium Shaker Bottle',
    description: 'Leak-proof shaker with mixing ball and measurements',
    price: 12.99,
    image: 'accessory-shaker',
    category: 'accessories',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    badge: 'Best Seller'
  }
];

export const getProductsByCategory = (category?: string) => {
  if (!category) return proteinProducts;
  return proteinProducts.filter(p => p.category === category);
};

export const getProductById = (id: string) => {
  return proteinProducts.find(p => p.id === id);
};
