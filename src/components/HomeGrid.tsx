import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function HomeGrid() {
  // We need exactly 7 photos for the homepage grid
  const homeProducts = products.slice(0, 7);

  return (
    <section className="py-24 max-w-[1800px] mx-auto px-6 md:px-10">
      <div className="space-y-8">
        {/* Grid 2-1-4 */}
        
        {/* First 2 photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {homeProducts.slice(0, 2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 1 Big photo */}
        <div className="w-full">
          {homeProducts[2] && (
            <ProductCard 
              key={homeProducts[2].id} 
              product={homeProducts[2]} 
              isFullWidth={true}
              customAspect="aspect-[21/7]"
            />
          )}
        </div>

        {/* 4 photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 !mt-4">
          {homeProducts.slice(3, 7).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
