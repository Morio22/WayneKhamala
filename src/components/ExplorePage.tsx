import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const MARQUEE_IMAGES = [
  'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1551298370-9d3d53e40c81?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
];

export default function ExplorePage() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (marqueeRef.current) {
      setDragConstraints({
        left: -(marqueeRef.current.scrollWidth - marqueeRef.current.offsetWidth),
        right: 0
      });
    }
  }, []);

  return (
    <div className="pt-[100px] bg-brand-cream overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=2000" 
            alt="The World of Wayne Khamala" 
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl"
          >
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-white/80 text-[10px] uppercase mb-8 block font-medium"
            >
              ESTABLISHED MMXXVI
            </motion.span>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif mb-10 leading-[1.1] tracking-tight">
              Welcome to the world of <br />
              <span className="italic font-light">Wayne Khamala</span>
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="w-px h-24 bg-white/40 mx-auto mt-8"
            />
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-burgundy mb-6 block font-bold">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">A curated journey through the finest textiles.</h2>
              <p className="text-brand-muted leading-relaxed mb-8 text-lg font-light">
                Wayne Khamala is more than a brand; it is a pursuit of intentionality. We believe that the objects we surround ourselves with should tell a story of quality, heritage, and the quiet beauty of natural materials.
              </p>
              <div className="flex space-x-12 pt-8 border-t border-brand-burgundy/10">
                <div>
                  <span className="block text-2xl font-serif mb-1 text-brand-burgundy">100%</span>
                  <span className="text-[9px] uppercase tracking-widest opacity-50">Natural Fibers</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif mb-1 text-brand-burgundy">Artisanal</span>
                  <span className="text-[9px] uppercase tracking-widest opacity-50">Craftsmanship</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="aspect-[16/10] overflow-hidden bg-brand-cream"
            >
              <img 
                src="https://images.unsplash.com/photo-1551298370-9d3d53e40c81?auto=format&fit=crop&q=80&w=1500" 
                alt="Textile Detail" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Draggable Marquee Section */}
      <section className="py-24 bg-brand-cream">
        <div className="mb-12 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-burgundy font-bold">The Living Space</span>
          <p className="text-[10px] uppercase tracking-widest text-brand-muted mt-2">Click and drag to explore</p>
        </div>
        
        <div className="relative overflow-hidden cursor-grab active:cursor-grabbing" ref={marqueeRef}>
          <motion.div 
            drag="x"
            dragConstraints={dragConstraints}
            className="flex whitespace-nowrap py-4 px-6"
          >
            {MARQUEE_IMAGES.map((src, index) => (
              <div 
                key={index} 
                className="flex-none w-[300px] md:w-[450px] aspect-[4/5] mx-3 overflow-hidden bg-brand-cream pointer-events-none"
              >
                <img 
                  src={src} 
                  alt={`Living space ${index}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* On The Blog Section */}
      <section className="py-32 px-6 max-w-[1800px] mx-auto overflow-hidden">
        <div className="flex justify-between items-end mb-12 px-4">
          <h2 className="text-3xl font-serif">On The Blog</h2>
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={() => {
                if (marqueeRef.current) marqueeRef.current.scrollBy({ left: -500, behavior: 'smooth' });
              }}
              className="w-10 h-10 rounded-full border border-brand-burgundy/20 flex items-center justify-center hover:bg-brand-burgundy hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                if (marqueeRef.current) marqueeRef.current.scrollBy({ left: 500, behavior: 'smooth' });
              }}
              className="w-10 h-10 rounded-full border border-brand-burgundy/20 flex items-center justify-center hover:bg-brand-burgundy hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <motion.div 
            drag="x"
            dragConstraints={{ left: -800, right: 0 }}
            className="flex space-x-10 px-4 cursor-grab active:cursor-grabbing"
          >
            {BLOG_POSTS.map((post, index) => (
              <motion.div 
                key={post.id}
                className="flex-none w-[85vw] md:w-[450px] group"
              >
                <div className="aspect-[16/10] overflow-hidden bg-brand-cream mb-6 relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Conditional arrows on 1st and 3rd images only */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {index === 0 && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.hash = '#blog';
                        }}
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm pointer-events-auto hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}
                    {index === 2 && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.hash = '#blog';
                        }}
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm pointer-events-auto hover:bg-white transition-colors ml-auto"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-3 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-burgundy">{post.category}</span>
                  <h3 className="text-xl font-serif leading-tight group-hover:text-brand-burgundy transition-colors">{post.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="flex justify-center mt-12 space-x-2">
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
          <div className="w-1.5 h-1.5 bg-black/20 rounded-full" />
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-brand-burgundy/5 text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-4xl md:text-5xl font-serif italic leading-relaxed text-brand-burgundy">
            "Quality is not an act, it is a habit. We weave this belief into every thread of our collection."
          </span>
          <div className="mt-12">
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-brand-burgundy">— Wayne Khamala</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
