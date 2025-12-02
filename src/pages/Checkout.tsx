import { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, Package, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/lib/products';

interface CartItem {
  product: Product;
  quantity: number;
  flavor?: string;
  size?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { cart, totalPrice } = location.state as { 
    cart: { [key: string]: CartItem }, 
    totalPrice: number 
  } || { cart: {}, totalPrice: 0 };

  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const shippingCost = shippingMethod === 'express' ? 15.00 : 0;
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || !shippingInfo.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv) {
      toast({
        title: "Missing Information",
        description: "Please fill in all payment details",
        variant: "destructive"
      });
      return;
    }
    setStep('review');
  };

  const handlePlaceOrder = () => {
    toast({
      title: "Processing Order...",
      description: "Please wait while we process your payment",
    });

    setTimeout(() => {
      toast({
        title: "Order Placed Successfully! 🎉",
        description: "You will receive a confirmation email shortly",
      });
      // Navigate to dashboard instead of login page
      navigate('/dashboard');
    }, 2000);
  };

  if (Object.keys(cart).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No items in cart</h2>
          <Button onClick={() => navigate('/shop')}>Go to Shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => step === 'shipping' ? navigate(-1) : setStep(step === 'payment' ? 'shipping' : 'payment')}
              className="p-2 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card transition-colors border border-border/50"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gradient-primary">Checkout</h1>
              <p className="text-sm text-muted-foreground">Complete your purchase</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step !== 'shipping' ? 'bg-primary text-white' : 'bg-primary/20'}`}>
                {step !== 'shipping' ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-sm font-semibold hidden sm:inline">Shipping</span>
            </div>
            <div className="w-8 h-0.5 bg-border"></div>
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'review' ? 'bg-primary text-white' : step === 'payment' ? 'bg-primary/20' : 'bg-muted'}`}>
                {step === 'review' ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className="text-sm font-semibold hidden sm:inline">Payment</span>
            </div>
            <div className="w-8 h-0.5 bg-border"></div>
            <div className={`flex items-center gap-2 ${step === 'review' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'review' ? 'bg-primary/20' : 'bg-muted'}`}>
                3
              </div>
              <span className="text-sm font-semibold hidden sm:inline">Review</span>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Shipping Information */}
              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="card-gradient-glow rounded-2xl p-6 border border-border/50">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">Shipping Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input 
                          id="fullName" 
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input 
                        id="address" 
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        placeholder="123 Main Street, Apt 4B"
                        required
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input 
                          id="city" 
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          placeholder="New York"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          placeholder="NY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input 
                          id="zipCode" 
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="mb-3 block">Shipping Method</Label>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:bg-muted/50">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <span>Standard Shipping (5-7 days)</span>
                              <span className="font-semibold text-green-500">FREE</span>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:bg-muted/50">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <span>Express Shipping (2-3 days)</span>
                              <span className="font-semibold">$15.00</span>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary glow-primary h-12">
                    Continue to Payment
                  </Button>
                </form>
              )}

              {/* Payment Information */}
              {step === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="card-gradient-glow rounded-2xl p-6 border border-border/50">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">Payment Details</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input 
                        id="cardNumber" 
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setPaymentInfo({...paymentInfo, cardNumber: value});
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <Input 
                        id="cardName" 
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                        placeholder="JOHN DOE"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input 
                          id="expiryDate" 
                          value={paymentInfo.expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setPaymentInfo({...paymentInfo, expiryDate: value});
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input 
                          id="cvv" 
                          type="password"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value.replace(/\D/g, '')})}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary glow-primary h-12">
                    Review Order
                  </Button>
                </form>
              )}

              {/* Order Review */}
              {step === 'review' && (
                <div className="space-y-6">
                  <div className="card-gradient-glow rounded-2xl p-6 border border-border/50">
                    <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Name:</span> {shippingInfo.fullName}</p>
                      <p><span className="text-muted-foreground">Email:</span> {shippingInfo.email}</p>
                      <p><span className="text-muted-foreground">Phone:</span> {shippingInfo.phone || 'N/A'}</p>
                      <p><span className="text-muted-foreground">Address:</span> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                      <p><span className="text-muted-foreground">Shipping:</span> {shippingMethod === 'express' ? 'Express (2-3 days)' : 'Standard (5-7 days)'}</p>
                    </div>
                  </div>

                  <div className="card-gradient-glow rounded-2xl p-6 border border-border/50">
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-primary" />
                      <div className="text-sm">
                        <p className="font-semibold">**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                        <p className="text-muted-foreground">{paymentInfo.cardName}</p>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handlePlaceOrder} className="w-full bg-gradient-to-r from-primary to-secondary glow-primary h-12 text-base font-bold">
                    Place Order - ${finalTotal.toFixed(2)}
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="card-gradient-glow rounded-2xl p-6 border border-border/50 sticky top-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {Object.entries(cart).map(([key, item]) => (
                    <div key={key} className="flex gap-3 text-sm">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-lg">
                        💪
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-xs">{item.product.name}</p>
                        {item.flavor && <p className="text-xs text-muted-foreground">Flavor: {item.flavor}</p>}
                        {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/50 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-semibold">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax:</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border/50">
                    <span className="font-bold">Total:</span>
                    <span className="text-xl font-bold text-gradient-primary">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
