import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, color: string, size: string) => void;
  removeFromCart: (id: string, color: string, size: string) => void;
  updateQuantity: (id: string, color: string, size: string, delta: number) => void;
  updateCartItem: (oldItem: { id: string, color: string, size: string }, newItem: { color: string, size: string }) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, color: string, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === color && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedColor === color && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedColor: color, selectedSize: size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, color: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedColor === color && item.selectedSize === size)));
  };

  const updateQuantity = (id: string, color: string, size: string, delta: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id && i.selectedColor === color && i.selectedSize === size);
      if (item && item.quantity === 1 && delta === -1) {
        return prev.filter(i => !(i.id === id && i.selectedColor === color && i.selectedSize === size));
      }
      return prev.map(item => {
        if (item.id === id && item.selectedColor === color && item.selectedSize === size) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(i => i.quantity > 0);
    });
  };

  const updateCartItem = (oldItem: { id: string, color: string, size: string }, newItem: { color: string, size: string }) => {
    setCart(prev => {
      const itemToUpdate = prev.find(i => i.id === oldItem.id && i.selectedColor === oldItem.color && i.selectedSize === oldItem.size);
      if (!itemToUpdate) return prev;

      // If color/size didn't change, just return
      if (oldItem.color === newItem.color && oldItem.size === newItem.size) return prev;

      // Check if the new color/size combination already exists in the cart
      const existing = prev.find(i => i.id === oldItem.id && i.selectedColor === newItem.color && i.selectedSize === newItem.size);
      
      if (existing) {
        // Merge with existing item
        return prev.filter(i => !(i.id === oldItem.id && i.selectedColor === oldItem.color && i.selectedSize === oldItem.size))
          .map(i => i.id === oldItem.id && i.selectedColor === newItem.color && i.selectedSize === newItem.size
            ? { ...i, quantity: i.quantity + itemToUpdate.quantity }
            : i
          );
      }

      // Just update the item
      return prev.map(i => i.id === oldItem.id && i.selectedColor === oldItem.color && i.selectedSize === oldItem.size
        ? { ...i, selectedColor: newItem.color, selectedSize: newItem.size }
        : i
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, updateCartItem, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
