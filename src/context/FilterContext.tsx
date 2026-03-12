import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <FilterContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
