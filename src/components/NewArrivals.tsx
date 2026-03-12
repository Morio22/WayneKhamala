import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&q=80&w=2000'
];

export default function NewArrivals() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Featured');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);

  const toggleFilter = (name: string) => {
    setExpandedFilters(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const filterCategories = [
    { name: 'MATERIAL', options: ['Linen', 'Cotton', 'Silk', 'Cashmere'] },
    { name: 'PRODUCT TYPE', options: ['Bedding', 'Bath', 'Curtains', 'Robes'] },
    { name: 'PRICE', options: ['$0 - $100', '$100 - $250', '$250+'] },
    { name: 'SIZE', options: ['XS', 'S', 'M', 'L', 'XL'] },
    { name: 'COLOR', options: ['Cream', 'White', 'Black', 'Oatmeal'] },
    { name: 'DESIGNER', options: ['Wayne Khamala', 'Guest Designer'] }
  ];

  const getSortedProducts = () => {
    let sorted = [...products];
    if (selectedSort === 'Price: Low to High') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'Price: High to Low') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'Newest') {
      sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
    return sorted;
  };

  // Elegant Grid Layout Logic
  // We want a mix of 4 small and 1 big.
  // Pattern: [S, S, S, S, B] repeated.
  // The 4 small photos should be 2x2.
  const renderElegantGrid = () => {
    const items = getSortedProducts();
    const rows = [];
    for (let i = 0; i < items.length; i += 5) {
      const chunk = items.slice(i, i + 5);
      const isEvenRow = (i / 5) % 2 === 0;

      if (isEvenRow) {
        rows.push(
          <div key={i} className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              {chunk.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {chunk[4] && (
              <div className="lg:col-span-1 h-full">
                <ProductCard key={chunk[4].id} product={chunk[4]} isLarge={true} />
              </div>
            )}
          </div>
        );
      } else {
        rows.push(
          <div key={i} className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            {chunk[0] && (
              <div className="lg:col-span-1 h-full">
                <ProductCard key={chunk[0].id} product={chunk[0]} isLarge={true} />
              </div>
            )}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              {chunk.slice(1, 5).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      }
    }
    return rows;
  };

  const newProducts = getSortedProducts();

  return (
    <div className="pt-[100px] bg-brand-cream">
      {/* Hero Carousel */}
      <section className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={HERO_IMAGES[currentHeroIndex]} 
              alt="New Arrivals" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <h1 className="text-white text-5xl md:text-7xl font-serif tracking-tight">New Arrivals</h1>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Filter & Sort Bar */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 py-8 border-b border-black/5 flex justify-between items-center">
        <span className="text-xs text-brand-muted uppercase tracking-widest">{newProducts.length} Products</span>
        <div className="flex items-center space-x-8">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="text-[11px] uppercase tracking-[0.2em] font-medium border-b border-black pb-1 hover:opacity-50 transition-opacity"
          >
            Filters
          </button>
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="text-[11px] uppercase tracking-[0.2em] font-medium border-b border-black pb-1 hover:opacity-50 transition-opacity flex items-center"
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
                      className="w-full text-left px-6 py-2 text-[11px] uppercase tracking-widest hover:bg-brand-cream transition-colors flex items-center justify-between"
                    >
                      {option}
                      {selectedSort === option && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 py-16">
        {renderElegantGrid()}
      </section>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-full md:w-[400px] bg-brand-cream z-[110] shadow-2xl overflow-y-auto"
            >
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-xl font-serif">Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)} className="hover:opacity-50 transition-opacity">
                    <X className="w-6 h-6 stroke-[1.2px]" />
                  </button>
                </div>

                <div className="space-y-4">
                  {filterCategories.map((cat) => (
                    <div key={cat.name} className="border-b border-black/5 pb-4">
                      <button 
                        onClick={() => toggleFilter(cat.name)}
                        className="w-full flex justify-between items-center group py-2"
                      >
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 group-hover:text-black transition-colors">
                          {cat.name}
                        </span>
                        <Plus className={`w-4 h-4 text-black/20 group-hover:text-black transition-transform duration-300 ${expandedFilters.includes(cat.name) ? 'rotate-45' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedFilters.includes(cat.name) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="py-4 space-y-3">
                              {cat.options.map(option => (
                                <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                                  <div className="w-4 h-4 border border-black/20 flex items-center justify-center group-hover:border-black transition-colors">
                                    <div className="w-2 h-2 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                                  </div>
                                  <span className="text-sm font-light text-black/60 group-hover:text-black transition-colors">{option}</span>
                                </label>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-12 space-y-4">
                  <button className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold">
                    Apply Filters
                  </button>
                  <button className="w-full border border-black py-4 text-[10px] uppercase tracking-[0.3em] font-bold">
                    Clear All
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
