import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        {/* Desktop Image */}
        <img 
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=2000" 
          alt="La Chambre Collection" 
          className="w-full h-full object-cover hidden lg:block"
          referrerPolicy="no-referrer"
        />
        {/* Mobile Image */}
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="La Chambre Collection Mobile" 
          className="w-full h-full object-cover lg:hidden"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 lg:bg-black/10" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {/* Mobile Text */}
          <div className="lg:hidden">
            <h2 className="text-brand-gold text-6xl font-script mb-8 leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
              La Chambre
            </h2>
            <div className="flex flex-col items-center space-y-6">
              <a 
                href="#shop" 
                className="text-white text-sm uppercase tracking-[0.4em] font-light border-b border-white/40 pb-2"
              >
                Explore the Collection
              </a>
              <button 
                onClick={() => {
                  window.location.hash = '#auth';
                }}
                className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-white transition-colors"
              >
                Sign In / Register
              </button>
            </div>
          </div>

          {/* Desktop Text */}
          <div className="hidden lg:block">
            <h2 className="text-brand-gold text-[8.5rem] font-script mb-8 leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
              La Chambre
            </h2>
            <div className="flex flex-col items-center space-y-8">
              <a 
                href="#shop" 
                className="text-white text-base uppercase tracking-[0.4em] font-light border-b border-white/40 pb-2 hover:border-white transition-all duration-500"
              >
                Explore the Collection
              </a>
              <button 
                onClick={() => {
                  window.location.hash = '#auth';
                }}
                className="text-white/60 text-[11px] uppercase tracking-[0.3em] font-bold hover:text-white transition-colors"
              >
                Sign In / Register
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Gradient for smoother transition to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream to-transparent" />
    </section>
  );
}
