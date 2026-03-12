import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isEditMode?: boolean;
  initialColor?: string;
  initialSize?: string;
  initialQuantity?: number;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  isEditMode = false,
  initialColor = null,
  initialSize = null,
  initialQuantity = 1
}) => {
  const { addToCart, updateCartItem, updateQuantity, removeFromCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string | null>(initialColor);
  const [selectedSize, setSelectedSize] = useState<string | null>(initialSize);
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    if (isOpen) {
      setSelectedColor(initialColor);
      setSelectedSize(initialSize);
      setQuantity(initialQuantity);
    }
  }, [isOpen, initialColor, initialSize, initialQuantity]);

  if (!product) return null;

  const handleAction = () => {
    if (selectedColor && selectedSize) {
      if (isEditMode && initialColor && initialSize) {
        updateCartItem(
          { id: product.id, color: initialColor, size: initialSize },
          { color: selectedColor, size: selectedSize }
        );
        // If quantity changed, we might need to handle that too, 
        // but the prompt says "update item" adds the item chosen.
        // Usually update item just updates the properties.
      } else {
        addToCart(product, selectedColor, selectedSize);
      }
      onClose();
    }
  };

  const isAddDisabled = !selectedColor || !selectedSize;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 transition-all duration-500 ${isEditMode ? 'md:right-[450px]' : ''}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full ${isEditMode ? 'max-w-4xl' : 'max-w-5xl'} bg-brand-cream shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]`}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-6 h-6 stroke-[1.2px]" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-brand-cream relative group">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-serif mb-2">{product.name}</h2>
                  <p className="text-xl font-light text-brand-burgundy">${product.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-brand-burgundy text-brand-burgundy' : 'text-brand-burgundy/20'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-medium text-brand-muted">
                    Reviews ({product.reviewCount})
                  </span>
                </div>

                <button className="text-[10px] uppercase tracking-widest font-bold border-b border-brand-burgundy text-brand-burgundy pb-1 hover:text-brand-mustard hover:border-brand-mustard transition-all">
                  View Full Details
                </button>

                {/* Color Selection */}
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold">
                    Color: <span className="font-light text-black/60 ml-2">{selectedColor || 'Select a color'}</span>
                  </p>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border p-0.5 transition-all ${
                          selectedColor === color.name ? 'border-black' : 'border-transparent'
                        }`}
                      >
                        <div 
                          className="w-full h-full rounded-full" 
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold">
                    Size: <span className="font-light text-black/60 ml-2">{selectedSize || 'Select a size'}</span>
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 text-[11px] border transition-all ${
                          selectedSize === size 
                            ? 'bg-brand-burgundy text-white border-brand-burgundy' 
                            : 'border-brand-burgundy/10 hover:border-brand-burgundy'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection (Visible in Edit Mode as per screenshot) */}
                {isEditMode && (
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold">Qty: {quantity}</p>
                    <div className="flex items-center border border-brand-burgundy/10 w-fit">
                      <button 
                        onClick={() => {
                          if (quantity > 1) {
                            setQuantity(q => q - 1);
                            if (initialColor && initialSize) updateQuantity(product.id, initialColor, initialSize, -1);
                          } else {
                            if (initialColor && initialSize) removeFromCart(product.id, initialColor, initialSize);
                            onClose();
                          }
                        }}
                        className="p-3 hover:bg-brand-burgundy/5"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 text-sm font-medium">{quantity}</span>
                      <button 
                        onClick={() => {
                          setQuantity(q => q + 1);
                          if (initialColor && initialSize) updateQuantity(product.id, initialColor, initialSize, 1);
                        }}
                        className="p-3 hover:bg-brand-burgundy/5"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={handleAction}
                  disabled={isAddDisabled}
                  className={`w-full py-5 text-[11px] uppercase tracking-[0.3em] font-bold transition-all ${
                    isAddDisabled 
                      ? 'bg-brand-burgundy/20 text-white cursor-not-allowed' 
                      : 'bg-brand-burgundy text-white hover:bg-brand-mustard hover:text-brand-ink'
                  }`}
                >
                  {isEditMode ? 'Update Item' : (!selectedColor ? 'Select a color' : !selectedSize ? 'Select a size' : 'Add to Cart')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
