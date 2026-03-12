import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import Auth from './Auth';
import Payment from './Payment';
import { CartItem } from '../types';

export default function CartPage() {
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'auth' | 'payment'>('cart');

  const handleCheckoutClick = () => {
    if (!user) {
      setCheckoutStep('auth');
    } else {
      setCheckoutStep('payment');
    }
  };

  const handleAuthSuccess = () => {
    setCheckoutStep('payment');
  };

  const handlePaymentSuccess = () => {
    clearCart();
    window.location.hash = '';
  };

  // Recommendations: products of the same category as items in cart
  const cartCategories = Array.from(new Set(cart.map(item => item.category)));
  const recommendations = products
    .filter(p => cartCategories.includes(p.category) && !cart.find(item => item.id === p.id))
    .slice(0, 4);

  // If no recommendations from same categories, just show some best sellers
  const finalRecommendations = recommendations.length > 0 ? recommendations : products.slice(0, 4);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20 px-6 text-center bg-brand-cream">
        <h2 className="text-4xl font-serif mb-8">Your Bag is Empty</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#new-arrivals" 
            className="inline-block bg-brand-burgundy text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-mustard hover:text-brand-ink transition-all min-w-[280px]"
          >
            Shop New Arrivals
          </a>
          <a 
            href="#best-sellers" 
            className="inline-block border border-brand-burgundy text-brand-burgundy px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-burgundy hover:text-white transition-all min-w-[280px]"
          >
            Shop Best Sellers
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 bg-brand-cream">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10">
        <AnimatePresence mode="wait">
          {checkoutStep === 'cart' ? (
            <motion.div 
              key="cart"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col lg:flex-row gap-16"
            >
              {/* Left Side: Cart Items */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-black/5">
                  <h2 className="text-3xl font-serif">Your Bag ({cart.reduce((acc, i) => acc + i.quantity, 0)})</h2>
                </div>

                {/* Free Shipping Banner */}
                <div className="bg-brand-cream p-6 mb-12 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&q=80&w=100" 
                        alt="Promo" 
                        className="w-8 h-8 object-cover"
                      />
                    </div>
                    <p className="text-[11px] tracking-wider uppercase">
                      Order <span className="italic font-serif">Wayne Khamala's Pacific Natural Everywhere</span> now and receive a free coaster set.
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-8 pb-12 border-b border-black/5">
                      <div className="w-40 aspect-[3/4] bg-brand-cream overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-serif mb-2">{item.name}</h3>
                            <p className="text-xs text-black/40 uppercase tracking-widest mb-1">
                              {item.selectedColor}, {item.selectedSize}
                            </p>
                            <p className="text-xs text-black/40">${item.price.toFixed(2)}</p>
                          </div>
                          <p className="text-lg font-light">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        <div className="flex items-center justify-between mt-8">
                          <div className="flex items-center border border-black/10">
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}
                              className="p-3 hover:bg-black/5"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-8 text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}
                              className="p-3 hover:bg-black/5"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex space-x-6">
                            <button 
                              onClick={() => setEditingItem(item)}
                              className="text-[11px] uppercase tracking-widest font-bold border-b border-black/20 pb-1"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                              className="text-[11px] uppercase tracking-widest font-bold border-b border-black/20 pb-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Summary */}
              <div className="w-full lg:w-[450px]">
                <div className="bg-brand-cream p-10 sticky top-40 border border-black/5">
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-center">
                      <span className="text-sm uppercase tracking-widest font-medium">Est. Total:</span>
                      <span className="text-xl font-light">${totalPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-black/60 text-right">
                      Or 4 interest-free payments of ${(totalPrice / 4).toFixed(2)} by <span className="bg-black text-white px-1.5 py-0.5 rounded font-bold">Afterpay</span> ⓘ
                    </p>
                  </div>

                  <button 
                    onClick={handleCheckoutClick}
                    className="w-full bg-brand-burgundy text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-mustard hover:text-brand-ink transition-all mb-8"
                  >
                    Checkout
                  </button>

                  <div className="relative group cursor-pointer overflow-hidden aspect-[4/3] mb-8">
                    <img 
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" 
                      alt="Rewards" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-white p-8 text-center">
                      <p className="text-xs uppercase tracking-[0.2em] mb-4">Get {Math.floor(totalPrice)} points on this order with WK Rewards.</p>
                      <button 
                        onClick={() => window.location.hash = '#auth'}
                        className="border border-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all"
                      >
                        Join Now / Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : checkoutStep === 'auth' ? (
            <motion.div 
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <button 
                onClick={() => setCheckoutStep('cart')}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-8 hover:text-brand-burgundy transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Bag
              </button>
              <Auth onAuthSuccess={handleAuthSuccess} />
            </motion.div>
          ) : (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <button 
                onClick={() => setCheckoutStep('cart')}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-8 hover:text-brand-burgundy transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Bag
              </button>
              <div className="bg-white p-10 shadow-2xl rounded-2xl">
                <Payment totalPrice={totalPrice} onSuccess={handlePaymentSuccess} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recommendations Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-serif mb-12">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {finalRecommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <QuickViewModal 
        product={editingItem}
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        isEditMode={true}
        initialColor={editingItem?.selectedColor}
        initialSize={editingItem?.selectedSize}
        initialQuantity={editingItem?.quantity}
      />
    </div>
  );
}
