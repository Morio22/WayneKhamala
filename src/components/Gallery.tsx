import { motion } from 'motion/react';

const GALLERY_IMAGES = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1000',
    title: 'Morning Light'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=1000',
    title: 'The Bath'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000',
    title: 'Linen Details'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000',
    title: 'Sanctuary'
  }
];

export default function Gallery() {
  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-end items-end">
        <div className="hidden md:block text-[10px] uppercase tracking-widest text-brand-burgundy font-bold">
          Scroll to explore →
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-12 px-6 gap-6 snap-x snap-mandatory no-scrollbar">
        {GALLERY_IMAGES.map((item) => (
          <motion.div 
            key={item.id}
            className="flex-none w-[85vw] md:w-[450px] aspect-[4/5] snap-center relative group overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-burgundy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-white text-[11px] uppercase tracking-[0.3em] font-medium border border-white/40 px-6 py-3 backdrop-blur-sm hover:bg-brand-mustard hover:text-brand-ink transition-colors">
                View Story
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
