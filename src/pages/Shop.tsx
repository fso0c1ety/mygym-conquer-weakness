import { useState, useMemo, useCallback, memo } from 'react';
import { ShoppingCart, Star, Filter, Search, Heart, X, Plus, Minus, Trash2 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { proteinProducts, Product } from '@/lib/products';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import protein images
import wheyChoco from '@/assets/Whey_Choco.webp';
import designerWhey from '@/assets/Designer_Whey_Sb.webp';
import veganProtein from '@/assets/66ea12214cab6f3a7024e8b7-flavcity-all-in-one-vegan-protein-powder.jpg';
import massGainer from '@/assets/719ZohZN1iL._AC_UF894,1000_QL80_.jpg';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<{ [key: string]: { product: Product; quantity: number; flavor?: string; size?: string } }>({});
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedFlavors, setSelectedFlavors] = useState<{ [key: string]: string }>({});
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  // Map product images
  const productImages: Record<string, string> = {
    'protein-whey': wheyChoco,
    'protein-casein': designerWhey,
    'protein-plant': veganProtein,
    'protein-mass': massGainer,
    'supplement-bcaa': wheyChoco,
    'supplement-creatine': designerWhey,
    'preworkout-extreme': massGainer,
    'accessory-shaker': veganProtein,
  };

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'protein', label: 'Protein' },
    { id: 'supplements', label: 'Supplements' },
    { id: 'pre-workout', label: 'Pre-Workout' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const filteredProducts = useMemo(() => proteinProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [selectedCategory, searchQuery]);

  const addToCart = useCallback((product: Product, flavor?: string, size?: string) => {
    const cartKey = `${product.id}-${flavor || 'default'}-${size || 'default'}`;
    const price = size && product.sizePrices ? product.sizePrices[size] : product.price;
    
    setCart(prev => ({
      ...prev,
      [cartKey]: {
        product: { ...product, price }, // Use size-specific price
        quantity: (prev[cartKey]?.quantity || 0) + 1,
        flavor,
        size
      }
    }));
    setCartOpen(true);
    toast({
      title: "Added to Cart",
      description: `${product.name} ${flavor ? `(${flavor})` : ''} ${size ? `- ${size}` : ''} added to your cart`,
    });
  }, [toast]);

  const updateQuantity = useCallback((cartKey: string, change: number) => {
    setCart(prev => {
      const item = prev[cartKey];
      if (!item) return prev;
      
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        const { [cartKey]: _, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [cartKey]: { ...item, quantity: newQuantity }
      };
    });
  }, []);

  const removeFromCart = useCallback((cartKey: string) => {
    setCart(prev => {
      const { [cartKey]: _, ...rest } = prev;
      return rest;
    });
    toast({
      title: "Removed from Cart",
      description: "Item removed successfully",
    });
  }, [toast]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
        toast({
          title: "Removed from Wishlist",
        });
      } else {
        newWishlist.add(productId);
        toast({
          title: "Added to Wishlist",
        });
      }
      return newWishlist;
    });
  }, [toast]);

  const totalItems = useMemo(() => Object.values(cart).reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => Object.values(cart).reduce((sum, item) => sum + (item.product.price * item.quantity), 0), [cart]);

  const handleCheckout = useCallback(() => {
    if (Object.keys(cart).length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive"
      });
      return;
    }

    // Navigate to checkout page with cart data
    navigate('/checkout', {
      state: {
        cart,
        totalPrice
      }
    });
  }, [cart, totalPrice, navigate, toast]);

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
    <div className="min-h-screen pb-24 overflow-x-hidden">
      {/* Static Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none"></div>

      <div className="relative z-10 overflow-x-hidden">
        {/* Header */}
        <header className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border/50 z-40">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gradient-primary">Shop</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Premium fitness nutrition</p>
            </div>
            <div className="relative">
              <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                <SheetTrigger asChild>
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
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                    <SheetDescription>
                      {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
                    {Object.entries(cart).length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground opacity-50 mb-4" />
                        <p className="text-muted-foreground">Your cart is empty</p>
                      </div>
                    ) : (
                      Object.entries(cart).map(([key, item]) => (
                        <div key={key} className="card-gradient rounded-xl p-4 border border-border/50">
                          <div className="flex gap-3">
                            <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                              {productImages[item.product.image] ? (
                                <img 
                                  src={productImages[item.product.image]} 
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-3xl">💪</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1">{item.product.name}</h4>
                              {item.flavor && (
                                <p className="text-xs text-muted-foreground">Flavor: {item.flavor}</p>
                              )}
                              {item.size && (
                                <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                              )}
                              <div className="flex items-center gap-2 mt-2">
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(key, -1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(key, 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 ml-auto text-destructive"
                                  onClick={() => removeFromCart(key)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {Object.entries(cart).length > 0 && (
                    <div className="mt-6 border-t border-border/50 pt-6">
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Shipping:</span>
                          <span className="font-semibold text-green-500">FREE</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Tax:</span>
                          <span className="font-semibold">${(totalPrice * 0.1).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4 pt-4 border-t border-border/50">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-gradient-primary">${(totalPrice * 1.1).toFixed(2)}</span>
                      </div>
                      <Button 
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-primary to-secondary glow-primary h-12 text-base font-bold"
                      >
                        Checkout
                      </Button>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 h-12 bg-muted/50 border-border/50 w-full"
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
        <div className="px-4 sm:px-6 py-4 sm:py-6 max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="card-gradient-glow rounded-xl sm:rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all group max-w-full"
              >
                {/* Product Image */}
                <div className="relative h-40 sm:h-48 bg-muted/30 overflow-hidden">
                  {productImages[product.image] ? (
                    <img 
                      src={productImages[product.image]} 
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <div className="text-6xl">💪</div>
                    </div>
                  )}
                  
                  {/* Badge */}
                  {product.badge && (
                    <Badge className={`absolute top-2 sm:top-3 left-2 sm:left-3 ${getBadgeColor(product.badge)} border text-xs`}>
                      {product.badge}
                    </Badge>
                  )}
                  
                  {/* Wishlist Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-2 sm:top-3 right-2 sm:right-3 h-8 w-8 sm:h-10 sm:w-10 backdrop-blur-sm transition-colors ${
                      wishlist.has(product.id) 
                        ? 'bg-primary/20 hover:bg-primary/30' 
                        : 'bg-background/80 hover:bg-background'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? 'fill-primary text-primary' : ''}`} />
                  </Button>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-lg font-bold text-muted-foreground">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-base sm:text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1 break-words">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
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
                  {product.flavors && product.flavors.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-2">Select Flavor:</p>
                      <Select 
                        value={selectedFlavors[product.id] || product.flavors[0]}
                        onValueChange={(value) => setSelectedFlavors(prev => ({ ...prev, [product.id]: value }))}
                      >
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Select flavor" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.flavors.map(flavor => (
                            <SelectItem key={flavor} value={flavor}>
                              {flavor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-2">Select Size:</p>
                      <Select 
                        value={selectedSizes[product.id] || product.sizes[0]}
                        onValueChange={(value) => setSelectedSizes(prev => ({ ...prev, [product.id]: value }))}
                      >
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map(size => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gradient-primary">
                          ${(() => {
                            const size = selectedSizes[product.id] || (product.sizes && product.sizes[0]);
                            return size && product.sizePrices ? product.sizePrices[size].toFixed(2) : product.price.toFixed(2);
                          })()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => addToCart(
                        product, 
                        product.flavors ? (selectedFlavors[product.id] || product.flavors[0]) : undefined,
                        product.sizes ? (selectedSizes[product.id] || product.sizes[0]) : undefined
                      )}
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
