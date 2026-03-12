import { Product } from '../types';

const categories = ['Bedsheets', 'Towels', 'Curtains', 'Robes', 'Throws', 'Duvet Covers', 'Pillowcases', 'Bath Mats'];

export const products: Product[] = Array.from({ length: 60 }).map((_, i) => {
  const category = categories[i % categories.length];
  let name = '';
  let imageUrl = '';
  let price = 0;

  switch (category) {
    case 'Bedsheets':
      name = 'Belgian Linen Duvet Cover';
      imageUrl = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800';
      price = 245;
      break;
    case 'Towels':
      name = 'Turkish Cotton Bath Towel';
      imageUrl = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800';
      price = 48;
      break;
    case 'Curtains':
      name = 'Sheer Linen Curtains';
      imageUrl = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800';
      price = 185;
      break;
    case 'Robes':
      name = 'Cloud Cotton Robe';
      imageUrl = 'https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&q=80&w=800';
      price = 120;
      break;
    case 'Throws':
      name = 'Cashmere Throw Blanket';
      imageUrl = 'https://images.unsplash.com/photo-1580305753412-6a6021082653?auto=format&fit=crop&q=80&w=800';
      price = 325;
      break;
    case 'Duvet Covers':
      name = 'Linen Duvet Cover Set';
      imageUrl = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800';
      price = 285;
      break;
    case 'Pillowcases':
      name = 'Silk Pillowcase Duo';
      imageUrl = 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800';
      price = 85;
      break;
    case 'Bath Mats':
      name = 'Organic Cotton Bath Mat';
      imageUrl = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800';
      price = 65;
      break;
    default:
      name = 'Home Essential';
      imageUrl = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800';
      price = 50;
  }

  return {
    id: `${i + 1}`,
    name,
    price,
    category,
    imageUrl,
    colors: [
      { name: 'Cream', hex: '#f5f5dc' },
      { name: 'Black', hex: '#000000' },
      { name: 'Oatmeal', hex: '#d2b48c' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.5 + Math.random() * 0.5,
    reviewCount: Math.floor(Math.random() * 200) + 50,
    isNew: i < 20, // First 20 are new
  };
});
