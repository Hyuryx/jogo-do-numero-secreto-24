
import React from 'react';
import { Category } from './types';
import NeonButton from '../NeonButton';

interface GameOverProps {
  gameStatus: "playing" | "won" | "lost";
  selectedCategory: string;
  categories: string[];
  onPlayAgain: (category: string) => void;
}

const GameOver: React.FC<GameOverProps> = ({ gameStatus, selectedCategory, categories, onPlayAgain }) => {
  if (gameStatus === "playing") {
    return null;
  }

  return (
    <div>
      <div className="mt-6">
        <NeonButton onClick={() => onPlayAgain(selectedCategory)} className="w-full">
          Jogar Novamente
        </NeonButton>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {categories
          .filter(cat => cat !== selectedCategory)
          .map(category => (
            <button
              key={category}
              onClick={() => onPlayAgain(category)}
              className="p-3 bg-space-light/10 hover:bg-space-light/30 rounded-lg border border-neon-purple/30"
            >
              <span className="text-gray-300 font-medium">{category}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default GameOver;
