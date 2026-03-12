import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext.tsx';
import { FilterProvider } from './context/FilterContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </CartProvider>
  </StrictMode>,
);
