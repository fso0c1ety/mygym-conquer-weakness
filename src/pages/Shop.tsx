import { useState } from 'react';
import { ShoppingCart, Star, Filter, Search, Heart } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { proteinProducts, Product } from '@/lib/products';
import { useToast } from '@/components/ui/use-toast';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'protein', label: 'Protein' },
    { id: 'supplements', label: 'Supplements' },
    { id: 'pre-workout', label: 'Pre-Workout' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const filteredProducts = proteinProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart`,
    });
  };

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'New':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Sale':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 pt-8 pb-6 sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border/50 z-40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gradient-primary">Shop</h1>
              <p className="text-sm text-muted-foreground mt-1">Premium fitness nutrition</p>
            </div>
            <div className="relative">
              <Button 
                size="icon" 
                className="bg-gradient-to-br from-primary to-secondary glow-primary relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full text-xs flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 h-12 bg-muted/50 border-border/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id 
                  ? 'bg-gradient-to-r from-primary to-secondary glow-primary whitespace-nowrap' 
                  : 'whitespace-nowrap border-border/50 hover:border-primary/50'
                }
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </header>

        {/* Products Grid */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="card-gradient-glow rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all group"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-muted/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-6xl">💪</div>
                  </div>
                  
                  {/* Badge */}
                  {product.badge && (
                    <Badge className={`absolute top-3 left-3 ${getBadgeColor(product.badge)} border`}>
                      {product.badge}
                    </Badge>
                  )}
                  
                  {/* Wishlist Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-lg font-bold text-muted-foreground">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                  </div>

                  {/* Flavors/Sizes */}
                  {product.flavors && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Flavors:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.flavors.slice(0, 3).map(flavor => (
                          <Badge key={flavor} variant="outline" className="text-xs border-border/50">
                            {flavor}
                          </Badge>
                        ))}
                        {product.flavors.length > 3 && (
                          <Badge variant="outline" className="text-xs border-border/50">
                            +{product.flavors.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gradient-primary">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-primary"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Shop;
