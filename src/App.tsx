import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Gallery from './components/Gallery';
import CartPage from './components/CartPage';
import NewArrivals from './components/NewArrivals';
import HomeGrid from './components/HomeGrid';
import ExplorePage from './components/ExplorePage';
import BlogPage from './components/BlogPage';
import Auth from './components/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { user } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    // Force homepage on initial load
    if (window.location.hash) {
      window.location.hash = '';
      setCurrentHash('');
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const isCartPage = currentHash === '#cart';
  const isNewArrivalsPage = currentHash === '#new-arrivals';
  const isShopAllPage = currentHash === '#shop-all';
  const isBestSellersPage = currentHash === '#best-sellers';
  const isExplorePage = currentHash === '#explore';
  const isBlogPage = currentHash === '#blog';
  const isAuthPage = currentHash === '#auth';
  const isHomePage = !isCartPage && !isNewArrivalsPage && !isShopAllPage && !isBestSellersPage && !isExplorePage && !isBlogPage && !isAuthPage;

  return (
    <div className="min-h-screen">
      <Header isHomePage={isHomePage} />
      <main>
        {isAuthPage ? (
          <div className="pt-32 bg-brand-cream min-h-screen">
            <Auth onAuthSuccess={() => window.location.hash = ''} />
          </div>
        ) : isCartPage ? (
          <CartPage />
        ) : isNewArrivalsPage ? (
          <NewArrivals />
        ) : isExplorePage ? (
          <ExplorePage />
        ) : isBlogPage ? (
          <BlogPage />
        ) : isShopAllPage || isBestSellersPage ? (
          <ProductGrid isBestSellers={isBestSellersPage} />
        ) : (
          <>
            <Hero />
            <HomeGrid />
            <Gallery />
          </>
        )}
        
        {/* Floating UI Elements */}
        <div className="fixed bottom-6 left-6 z-[40]">
          <button className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
            </svg>
          </button>
        </div>
        <div className="fixed bottom-6 right-6 z-[40] flex flex-col items-center space-y-4">
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                onClick={scrollToTop}
                className="w-12 h-12 bg-[#33312e] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-colors"
                aria-label="Scroll to top"
              >
                <ChevronUp className="w-6 h-6 stroke-[1.5px]" />
              </motion.button>
            )}
          </AnimatePresence>
          
          <button className="w-12 h-12 bg-white shadow-xl rounded-lg flex items-center justify-center text-black hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </button>
        </div>

        {/* Footer Placeholder */}
        <footer className="bg-brand-cream py-24 px-6 border-t border-black/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-serif uppercase tracking-widest">Wayne khamala</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Crafting the world's finest essentials.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium">Shop</h4>
              <ul className="text-sm text-brand-muted space-y-2">
                <li><a href="#" className="hover:text-brand-ink transition-colors">Bedsheets</a></li>
                <li><a href="#" className="hover:text-brand-ink transition-colors">Bathroom</a></li>
                <li><a href="#" className="hover:text-brand-ink transition-colors">New Arrivals</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium">Support</h4>
              <ul className="text-sm text-brand-muted space-y-2">
                <li><a href="#" className="hover:text-brand-ink transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-brand-ink transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-brand-ink transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium">Newsletter</h4>
              <div className="flex border-b border-brand-ink pb-2">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-transparent text-sm w-full focus:outline-none"
                />
                <button className="text-[10px] uppercase tracking-widest font-bold">Join</button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-brand-muted uppercase tracking-widest">© 2026 Wayne khamala. All rights reserved.</p>
            <div className="flex space-x-6 text-[10px] text-brand-muted uppercase tracking-widest">
              <a href="#" className="hover:text-brand-ink transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-ink transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
