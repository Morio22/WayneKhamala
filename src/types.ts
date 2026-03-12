export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  description?: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}
