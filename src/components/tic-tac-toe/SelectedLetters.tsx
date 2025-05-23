
import React from 'react';
import { Rocket, Star } from 'lucide-react';

interface SelectedLettersProps {
  letters: string[];
}

const SelectedLetters: React.FC<SelectedLettersProps> = ({ letters }) => {
  return (
    <div className="mb-4">
      <div className="text-sm text-gray-300 light:text-gray-700 mb-1">Selecionadas:</div>
      <div className="flex flex-wrap gap-2">
        {letters.map((letter, index) => (
          <span 
            key={index} 
            className={`px-2 py-1 rounded text-xs ${letter === 'X' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-neon-pink/20 text-neon-pink'}`}
          >
            {letter === 'X' ? <Rocket className="inline-block w-3 h-3 mr-1" /> : <Star className="inline-block w-3 h-3 mr-1" />}
            {letter}
          </span>
        ))}
        {letters.length === 0 && (
          <span className="text-gray-500">Nenhuma jogada ainda</span>
        )}
      </div>
    </div>
  );
};

export default SelectedLetters;
