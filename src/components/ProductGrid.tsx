import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { useFilter } from '../context/FilterContext';

export default function ProductGrid({ isBestSellers }: { isBestSellers?: boolean }) {
  const { selectedCategory, setSelectedCategory } = useFilter();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Featured');

  const filteredProducts = (isBestSellers ? products.slice(0, 12) : products).filter(p => {
    if (selectedCategory === 'All') return true;
    const cat = p.category.toLowerCase();
    const sel = selectedCategory.toLowerCase();
    
    // Direct match
    if (cat.includes(sel) || sel.includes(cat)) return true;
    
    // Grouping
    if (sel === 'bedding' && (cat.includes('bed') || cat.includes('duvet') || cat.includes('pillow'))) return true;
    if (sel === 'bath' && (cat.includes('bath') || cat.includes('towel') || cat.includes('robe'))) return true;
    if (sel === 'living' && (cat.includes('throw') || cat.includes('curtain') || cat.includes('pillow'))) return true;
    
    return false;
  });

  const categories = ['All', 'Bedding', 'Bath', 'Curtains', 'Robes', 'Throws'];
  const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

  return (
    <section id="shop-all" className="pt-32 pb-24 min-h-screen bg-brand-cream">
      {/* Header - Contained */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 pb-8">
          <div>
            <h2 className="text-4xl font-serif mb-4">{isBestSellers ? 'Best-Sellers' : 'Shop All'}</h2>
            <div className="flex items-center space-x-6 text-[11px] uppercase tracking-widest font-medium">
              <span className="text-brand-muted">{filteredProducts.length} Products</span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`${selectedCategory === cat ? 'border-b border-brand-burgundy text-brand-burgundy' : 'opacity-40 hover:opacity-100 hover:text-brand-burgundy'} transition-all pb-1`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <button className="text-[11px] uppercase tracking-[0.2em] font-medium border-b border-brand-burgundy text-brand-burgundy pb-1 hover:text-brand-mustard hover:border-brand-mustard transition-all">
              Filters
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="text-[11px] uppercase tracking-[0.2em] font-medium border-b border-brand-burgundy text-brand-burgundy pb-1 hover:text-brand-mustard hover:border-brand-mustard transition-all flex items-center"
              >
                Sort: {selectedSort}
                <ChevronDown className={`ml-2 w-3 h-3 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-48 bg-brand-cream shadow-xl border border-black/5 z-30 py-4"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedSort(option);
                          setIsSortOpen(false);
                        }}
                        className="w-full text-left px-6 py-2 text-[11px] uppercase tracking-widest hover:bg-brand-cream hover:text-brand-burgundy transition-colors flex items-center justify-between"
                      >
                        {option}
                        {selectedSort === option && <div className="w-1.5 h-1.5 bg-brand-burgundy rounded-full" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 4 Items per row */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg font-serif opacity-40">No products found in this category.</p>
        </div>
      )}
    </section>
  );
}
