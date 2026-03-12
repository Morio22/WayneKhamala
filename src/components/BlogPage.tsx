import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export default function BlogPage() {
  return (
    <div className="pt-[120px] pb-24 bg-brand-cream">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">On The Blog</h1>
          <p className="text-brand-muted uppercase tracking-[0.3em] text-[10px] font-bold">Stories of Intentional Living</p>
        </header>

        {/* Featured Post */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="aspect-[16/10] overflow-hidden bg-brand-cream">
              <img 
                src={BLOG_POSTS[0].image} 
                alt={BLOG_POSTS[0].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-burgundy">{BLOG_POSTS[0].category}</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">{BLOG_POSTS[0].title}</h2>
              <p className="text-lg text-brand-muted leading-relaxed font-light">
                {BLOG_POSTS[0].description}
              </p>
              <button className="text-[11px] uppercase tracking-[0.3em] font-bold border-b border-brand-burgundy pb-1 hover:text-brand-mustard hover:border-brand-mustard transition-all">
                Read More
              </button>
            </div>
          </motion.div>
        </section>

        {/* Blog Grid - 4 Columns on Large Screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {BLOG_POSTS.slice(1).map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden bg-brand-cream mb-6 relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-3 text-center">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-burgundy italic">{post.category}</span>
                <h3 className="text-lg font-serif leading-tight group-hover:text-brand-burgundy transition-colors">{post.title}</h3>
                <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-24 flex justify-center items-center space-x-8">
          <button className="text-[11px] uppercase tracking-widest opacity-30 cursor-not-allowed">Previous</button>
          <div className="flex space-x-4">
            <span className="text-[11px] font-bold border-b border-brand-burgundy text-brand-burgundy">01</span>
            <span className="text-[11px] opacity-40 hover:opacity-100 hover:text-brand-burgundy transition-opacity cursor-pointer">02</span>
            <span className="text-[11px] opacity-40 hover:opacity-100 hover:text-brand-burgundy transition-opacity cursor-pointer">03</span>
          </div>
          <button className="text-[11px] uppercase tracking-widest hover:text-brand-burgundy transition-opacity">Next</button>
        </div>
      </div>
    </div>
  );
}
