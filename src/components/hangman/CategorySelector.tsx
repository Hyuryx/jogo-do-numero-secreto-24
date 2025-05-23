
import React from 'react';
import { Category } from './types';

interface CategorySelectorProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold mb-4">
        <span className="text-gradient">JOGO DA FORCA</span>
      </h2>
      <p className="text-gray-300 light:text-gray-700 mb-6">
        Escolha uma categoria para começar:
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className="p-3 bg-space-light/20 hover:bg-space-light/30 rounded-lg border border-neon-purple/30 transition-colors"
          >
            <span className="text-white font-medium">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
