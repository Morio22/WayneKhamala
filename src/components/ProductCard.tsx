import React, { useState } from 'react';
import { Product } from '../types';
import { motion } from 'motion/react';
import QuickViewModal from './QuickViewModal';

const ProductCard: React.FC<{ product: Product; customAspect?: string; isFullWidth?: boolean; isLarge?: boolean }> = ({ product, customAspect, isFullWidth, isLarge }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <>
      <motion.div 
        className={`group cursor-pointer ${isFullWidth ? 'w-full' : ''} ${isLarge ? 'h-full flex flex-col' : ''}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div 
          className={`${customAspect || (isLarge ? 'aspect-[3/5]' : 'aspect-[3/4]')} overflow-hidden bg-brand-cream ${isFullWidth ? 'mb-8' : 'mb-6'} relative ${isLarge ? 'flex-1' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            style={{ 
              transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
              transform: isHovered ? 'scale(1.5)' : 'scale(1)'
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/40 backdrop-blur-sm pointer-events-none">
            <div className={`${isFullWidth ? 'max-w-7xl mx-auto px-6' : ''} pointer-events-auto`}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsQuickViewOpen(true);
                }}
                className="w-full py-2 text-[11px] uppercase tracking-widest font-medium border border-brand-burgundy text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-colors"
              >
                Quick View
              </button>
            </div>
          </div>
        </div>
        
        <div className={`${isFullWidth ? 'max-w-7xl mx-auto px-6 text-center' : ''} space-y-1`}>
          <h3 className={`${isFullWidth ? 'text-2xl md:text-3xl' : 'text-lg'} font-serif tracking-wide group-hover:text-brand-burgundy transition-colors`}>{product.name}</h3>
          <p className="text-sm font-medium mt-2 text-brand-burgundy">${product.price.toFixed(2)}</p>
          
          {/* Color Circles */}
          <div className={`flex space-x-2 mt-3 ${isFullWidth ? 'justify-center' : ''}`}>
            {product.colors.slice(0, 2).map((color) => (
              <div 
                key={color.name}
                className="w-4 h-4 rounded-full border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <QuickViewModal 
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

export default ProductCard;
