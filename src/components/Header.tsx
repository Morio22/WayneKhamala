import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, User, X, Minus, Plus, LogOut } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useFilter } from '../context/FilterContext';
import { useAuth } from '../context/AuthContext';
import QuickViewModal from './QuickViewModal';
import { CartItem } from '../types';

export default function Header({ isHomePage = true }: { isHomePage?: boolean }) {
  const { scrollY } = useScroll();
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const { setSelectedCategory } = useFilter();
  const { logout, user } = useAuth();
  const [isTop, setIsTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveMegaMenu(null);
    setIsMenuOpen(false);
    
    // If we are on the cart page, go home first
    if (window.location.hash === '#cart') {
      window.location.hash = '#shop-all';
    } else {
      // Scroll to shop all section
      const element = document.getElementById('shop-all');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const showWhiteHeader = !isHomePage || !isTop || !!activeMegaMenu;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsTop(latest <= 0);
  });

  const megaMenuContent: Record<string, any> = {
    'Shop All': {
      categories: [
        {
          title: 'Bedding',
          links: ['All Bedding', 'Beds', 'Bedsheets', 'Duvet Covers', 'Pillowcases']
        },
        {
          title: 'Bath',
          links: ['All Bath', 'Bathroom Accessories', 'Towels', 'Bath Mats', 'Robes']
        },
        {
          title: 'Living',
          links: ['All Living', 'Throws', 'Decorative Pillows', 'Curtains']
        }
      ],
      featured: [
        {
          title: 'Shop The Linen Duvet',
          image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
        },
        {
          title: 'Shop The Waffle Towel',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
        }
      ]
    },
    'Best-Sellers': {
      categories: [
        {
          title: 'Best Sellers',
          links: ['All Best Sellers', 'Most Loved Bedding', 'Top Rated Bath', 'Customer Favorites']
        },
        {
          title: 'Collections',
          links: ['The Linen Collection', 'The Cotton Collection', 'The Wellness Edit', 'The Guest Room Essentials']
        }
      ],
      featured: [
        {
          title: 'Shop The Silk Pillowcase',
          image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800'
        },
        {
          title: 'Shop The Cashmere Throw',
          image: 'https://images.unsplash.com/photo-1580305753412-6a6021082653?auto=format&fit=crop&q=80&w=800'
        }
      ]
    },
    'Explore': {
      categories: [
        {
          title: 'Featured',
          links: ["Wayne's Edit", 'Bedroom Essentials', 'Bathroom Sanctuary']
        },
        {
          title: 'About Us',
          links: ['About Us', 'Stores']
        }
      ],
      featured: [
        {
          title: 'Shop The Raffia Sun Hat',
          image: 'https://images.unsplash.com/photo-1572451479139-6a308211d8be?auto=format&fit=crop&q=80&w=800'
        },
        {
          title: 'Shop Jewelry',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'
        }
      ]
    },
    'Blog': {
      categories: [
        {
          title: 'The Journal',
          links: [
            'How to Style Your Bedroom for Better Sleep',
            '5 Bathroom Essentials for a Spa-Like Experience',
            'The Art of Layering Bedding',
            'Choosing the Right Towels for Your Home',
            'Morning Rituals in the Bathroom'
          ]
        }
      ],
      featured: [
        {
          title: 'Bedroom Styling Guide',
          image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
        },
        {
          title: 'Bathroom Sanctuary Tips',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
        }
      ]
    }
  };

  const navLinks = [
    { name: 'Shop All', href: '#shop-all' },
    { name: 'New Arrivals', href: '#new-arrivals' },
    { name: 'Best-Sellers', href: '#best-sellers' },
    { name: 'Explore', href: '#explore' },
    { name: 'Blog', href: '#blog' }
  ];

  const secondaryLinks = [
    'My Account', 'Rewards', 'Become a WK Member', 'Store Locations', 'Start a Return', 'Customer Service', 'Log In'
  ];

  const Sidebar = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title?: string, children: React.ReactNode }) => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-[#1a1a17] text-white z-[80] shadow-2xl overflow-y-auto"
          >
            <div className="p-6 md:p-10 h-full flex flex-col">
              <div className="flex justify-between items-center mb-12">
                {title ? <h2 className="text-xl font-serif">{title}</h2> : <div />}
                <button onClick={onClose} className="hover:opacity-50 transition-opacity">
                  <X className="w-6 h-6 stroke-[1.2px]" />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#1a1a17] text-white py-2 text-[10px] md:text-[11px] text-center uppercase tracking-[0.2em] font-light z-[60]">
        Restocked by popular demand. <a href="#" className="underline underline-offset-4">Shop the French Linen Duvet Set</a>.
      </div>

      <motion.header 
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
          showWhiteHeader 
            ? 'bg-brand-cream border-black/10 shadow-md' 
            : 'bg-transparent border-transparent' 
        } ${
          isTop ? 'py-4 top-[35px]' : 'py-2 top-0'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-12 relative">
            {/* Left Section */}
            <div className="flex items-center justify-start min-w-[80px] lg:min-w-[300px] space-x-3 md:space-x-4">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className={`lg:hidden hover:opacity-50 transition-all duration-300 ${showWhiteHeader ? 'text-brand-ink' : 'text-white'}`}
              >
                <Menu className="w-5 h-5 stroke-[1.2px]" />
              </button>

              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`lg:hidden hover:opacity-50 transition-all duration-300 ${showWhiteHeader ? 'text-brand-ink' : 'text-white'}`}
              >
                <Search className="w-5 h-5 stroke-[1.2px]" />
              </button>

              <div className="hidden lg:block">
                {isHomePage ? (
                  !isTop && (
                    <a href="#" onClick={() => window.location.hash = ''} className="hover:opacity-50 transition-opacity">
                      <motion.h1 
                        layoutId="logo"
                        className={`font-serif tracking-[0.2em] uppercase text-sm md:text-xl whitespace-nowrap transition-colors duration-500 ${showWhiteHeader ? 'text-brand-ink' : 'text-white'}`}
                      >
                        Wayne khamala
                      </motion.h1>
                    </a>
                  )
                ) : (
                  <a href="#" onClick={() => window.location.hash = ''} className="hover:opacity-50 transition-opacity">
                    <span className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${showWhiteHeader ? 'text-brand-ink' : 'text-white'}`}>
                      Textile
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Center Section - Logo (Top) or Nav (Scrolled) */}
            <div className="flex-1 flex items-center justify-center px-1 overflow-hidden">
              <div className="transition-all duration-500 ease-in-out text-center w-full">
                {isTop ? (
                  <motion.h1 
                    layoutId="logo"
                    className={`font-serif tracking-[0.2em] uppercase text-[12px] xs:text-sm md:text-3xl lg:scale-110 whitespace-nowrap transition-colors duration-500 ${showWhiteHeader ? 'text-brand-ink' : 'text-white'}`}
                  >
                    Wayne khamala
                  </motion.h1>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    {/* On Home Page, the logo is now in the Left Section when scrolled */}
                    {!isHomePage && (
                      /* Mobile Nav hidden on phone preview as requested */
                      null
                    )}

                    <nav className="hidden lg:flex items-center justify-center space-x-8">
                      {navLinks.map((link) => (
                        <div 
                          key={link.name}
                          onMouseEnter={() => megaMenuContent[link.name] && setActiveMegaMenu(link.name)}
                          onMouseLeave={() => setActiveMegaMenu(null)}
                          className="relative h-full flex items-center"
                        >
                          <a 
                            href={link.href} 
                            onClick={() => {
                              setActiveMegaMenu(null);
                              if (link.name === 'Shop All') setSelectedCategory('All');
                            }}
                            className={`text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-50 transition-all duration-300 py-4 ${showWhiteHeader ? 'text-brand-ink' : 'text-white'}`}
                          >
                            {link.name}
                          </a>
                        </div>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className={`flex items-center justify-end space-x-3 md:space-x-6 min-w-[80px] lg:min-w-[200px] transition-colors duration-500 ${showWhiteHeader ? 'text-brand-ink' : 'text-white'}`}>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:block hover:opacity-50 transition-all duration-300"
              >
                <Search className="w-5 h-5 stroke-[1.2px]" />
              </button>
              <button 
                onClick={() => setIsAccountOpen(true)}
                className="hover:opacity-50 transition-all duration-300"
              >
                <User className="w-5 h-5 stroke-[1.2px]" />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="group relative hover:opacity-50 transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.2px]" />
                <span className={`absolute -top-1.5 -right-1.5 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold transition-colors duration-500 ${showWhiteHeader ? 'bg-brand-burgundy text-white' : 'bg-brand-mustard text-brand-ink'}`}>
                  {totalItems}
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Main Nav (Desktop Only, Top Only) */}
          {isTop && (
            <nav className="hidden lg:flex items-center justify-center space-x-10 pt-4 pb-2">
              {navLinks.map((link) => (
                <div 
                  key={link.name}
                  onMouseEnter={() => megaMenuContent[link.name] && setActiveMegaMenu(link.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                  className="relative h-full flex items-center"
                >
                  <a 
                    href={link.href} 
                    onClick={() => setActiveMegaMenu(null)}
                    className={`text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-50 transition-all duration-500 py-2 ${showWhiteHeader ? 'text-brand-ink' : 'text-white'}`}
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </nav>
          )}
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMegaMenu && megaMenuContent[activeMegaMenu] && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="absolute left-0 right-0 bg-brand-cream border-t border-black/5 shadow-xl z-40"
            >
              <div className="max-w-[1800px] mx-auto px-10 py-16 flex gap-20">
                {/* Categories */}
                <div className="flex-1 flex gap-20">
                  {megaMenuContent[activeMegaMenu].categories.map((cat: any) => (
                    <div key={cat.title} className="min-w-[150px]">
                      <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-6">
                        {cat.title}
                      </h3>
                      <ul className="space-y-4">
                        {cat.links.map((link: string) => (
                          <li key={link}>
                            <button 
                              onClick={() => handleCategoryClick(link.replace('All ', ''))}
                              className="text-sm font-light text-black hover:opacity-50 transition-opacity text-left"
                            >
                              {link}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured */}
                <div className="flex gap-8">
                  {megaMenuContent[activeMegaMenu].featured.map((item: any) => (
                    <div 
                      key={item.title} 
                      onClick={() => handleCategoryClick(item.title.replace('Shop The ', ''))}
                      className="w-[280px] group cursor-pointer"
                    >
                      <div className="aspect-[4/5] overflow-hidden mb-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h4 className="text-[10px] uppercase tracking-widest font-medium border-b border-black w-fit pb-1">
                        {item.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay (Left) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#1a1a17] text-white overflow-y-auto"
          >
            <div className="p-6 md:p-10">
              <div className="flex justify-between items-center mb-12">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:opacity-50 transition-opacity"
                >
                  <X className="w-6 h-6 stroke-[1.2px]" />
                </button>
                <h1 className="font-serif tracking-[0.2em] uppercase text-lg">Wayne khamala</h1>
                <div className="w-6" /> {/* Spacer */}
              </div>

              <nav className="flex flex-col space-y-6 mb-16">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (link.name === 'Shop All') setSelectedCategory('All');
                    }}
                    className="text-3xl md:text-4xl font-serif hover:opacity-50 transition-opacity"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="mb-16">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mb-6">Shop by Category</h3>
                <nav className="flex flex-col space-y-4">
                  {['Bedding', 'Bath', 'Curtains', 'Robes', 'Throws'].map((cat, i) => (
                    <motion.button
                      key={cat}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.05) }}
                      onClick={() => handleCategoryClick(cat)}
                      className="text-xl font-serif hover:opacity-50 transition-opacity text-left"
                    >
                      {cat}
                    </motion.button>
                  ))}
                </nav>
              </div>

              <nav className="flex flex-col space-y-4">
                {secondaryLinks.map((link) => (
                  <motion.a
                    key={link}
                    href="#"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm md:text-base font-light opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account Sidebar */}
      <Sidebar isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} title="Account">
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-serif italic mb-2">Welcome to Wayne Khamala</h3>
          {user ? (
            <>
              <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-12">{user.email}</p>
              <nav className="flex flex-col space-y-6 mb-auto">
                {secondaryLinks.filter(link => link !== 'Log In').map((link) => (
                  <a key={link} href="#" className="text-sm font-light hover:opacity-50 transition-opacity">
                    {link}
                  </a>
                ))}
              </nav>
              
              <div className="pt-8 border-t border-white/10">
                <button 
                  onClick={async () => {
                    await logout();
                    setIsAccountOpen(false);
                  }}
                  className="flex items-center space-x-4 text-sm font-light hover:text-brand-burgundy transition-colors"
                >
                  <LogOut className="w-5 h-5 stroke-[1.2px]" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-12">Sign in to manage your orders</p>
              <nav className="flex flex-col space-y-6 mb-auto">
                {secondaryLinks.map((link) => (
                  <a 
                    key={link} 
                    href={link === 'Log In' || link === 'My Account' ? '#auth' : '#'} 
                    onClick={() => (link === 'Log In' || link === 'My Account') && setIsAccountOpen(false)}
                    className="text-sm font-light hover:opacity-50 transition-opacity"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </>
          )}
        </div>
      </Sidebar>

      {/* Cart Sidebar */}
      <Sidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} title={`Your Bag (${totalItems})`}>
        <div className="flex flex-col h-full">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <p className="text-lg font-serif mb-12">Your cart is empty.</p>
              <div className="w-full space-y-4">
                <button 
                  onClick={() => {
                    window.location.hash = '#new-arrivals';
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-[#0a0a0a] text-white py-5 text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-black/80 transition-colors"
                >
                  Shop New Arrivals
                </button>
                <button 
                  onClick={() => {
                    window.location.hash = '#best-sellers';
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-[#0a0a0a] text-white py-5 text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-black/80 transition-colors"
                >
                  Shop Best-Sellers
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {/* Promo Box */}
              <div className="bg-[#f5f2ed] p-6 mb-8 flex gap-4">
                <div className="w-20 h-20 bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1616627987031-f69f102a18e5?auto=format&fit=crop&q=80&w=200" 
                    alt="Promo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-[11px] uppercase tracking-widest font-bold mb-1">Pacific Natural Leather Coaster Set</h4>
                  <p className="text-[10px] leading-relaxed opacity-60">
                    Order <span className="italic">Wayne Khamala's Essentials</span> now and receive a free coaster set.
                  </p>
                </div>
              </div>

              {/* Free Shipping Progress */}
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-widest font-medium mb-2">
                  {totalPrice >= 200 ? "You qualify for free shipping!" : `Spend $${(200 - totalPrice).toFixed(2)} more for free shipping!`}
                </p>
                <div className="h-1 bg-black/10 w-full">
                  <div 
                    className="h-full bg-black transition-all duration-500" 
                    style={{ width: `${Math.min(100, (totalPrice / 200) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-6">
                    <div className="w-24 h-32 bg-brand-cream">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-serif">{item.name}</h4>
                          <p className="text-sm font-light">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-[11px] text-black/40 uppercase tracking-widest">
                          {item.selectedColor}, {item.selectedSize}
                        </p>
                        <p className="text-[11px] text-black/40 mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-black/10">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}
                            className="p-2 hover:bg-black/5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}
                            className="p-2 hover:bg-black/5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex space-x-4">
                          <button 
                            onClick={() => setEditingItem(item)}
                            className="text-[10px] uppercase tracking-widest font-bold border-b border-black/20 pb-0.5"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                            className="text-[10px] uppercase tracking-widest font-bold border-b border-black/20 pb-0.5"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-8 mt-8 border-t border-black/5 space-y-4">
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    window.location.hash = '#cart';
                  }}
                  className="w-full bg-[#33312e] text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-colors"
                >
                  Checkout
                </button>
                <a 
                  href="#cart"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full text-[10px] uppercase tracking-widest font-bold text-center hover:opacity-50 transition-opacity"
                >
                  Go to Full Cart
                </a>
              </div>
            </div>
          )}
        </div>
      </Sidebar>

      {/* Edit Item Modal */}
      <QuickViewModal 
        product={editingItem}
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        isEditMode={true}
        initialColor={editingItem?.selectedColor}
        initialSize={editingItem?.selectedSize}
        initialQuantity={editingItem?.quantity}
      />

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm"
            />
            
            {/* Search Content Overlay */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 z-[100] bg-brand-cream shadow-2xl"
            >
              {/* Search Bar */}
              <div className="border-b border-black/5 py-8 md:py-10">
                <div className="max-w-[1800px] mx-auto px-6 md:px-10 flex items-center">
                  <Search className="w-5 h-5 text-black/40 mr-6 stroke-[1.2px]" />
                  <input 
                    type="text"
                    placeholder="What can we help you find?"
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-base md:text-lg font-light placeholder:text-black/20 text-black"
                  />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-6 hover:opacity-50 transition-opacity"
                  >
                    <X className="w-6 h-6 text-black stroke-[1.2px]" />
                  </button>
                </div>
              </div>

              {/* Search Content */}
              <div className="py-12 md:py-16 max-h-[85vh] overflow-y-auto">
                <div className="max-w-[1800px] mx-auto px-6 md:px-10">
                  {/* Popular Terms Section */}
                  <div className="flex justify-center mb-20">
                    <div className="text-center md:text-left">
                      <h3 className="text-[9px] uppercase tracking-[0.3em] font-bold text-black/40 mb-6">
                        Popular Search Terms
                      </h3>
                      <ul className="space-y-3">
                        {['Cashmere', 'Shoes', 'Cardigan', 'Outerwear', 'Pants'].map((term) => (
                          <li key={term}>
                            <button className="text-sm md:text-base font-light text-black hover:opacity-50 transition-opacity">
                              {term}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Featured Collections Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="group cursor-pointer">
                      <div className="aspect-[16/9] overflow-hidden mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1200" 
                          alt="Effortless Outerwear"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h4 className="text-[10px] uppercase tracking-widest font-medium border-b border-black w-fit pb-1">
                        Effortless Outerwear
                      </h4>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="aspect-[16/9] overflow-hidden mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1200" 
                          alt="Day-To-Night Dresses"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h4 className="text-[10px] uppercase tracking-widest font-medium border-b border-black w-fit pb-1">
                        Day-To-Night Dresses
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
