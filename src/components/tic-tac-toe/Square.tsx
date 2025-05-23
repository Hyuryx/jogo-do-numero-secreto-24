
import React from 'react';
import { Player } from './types';
import { Rocket, Star } from 'lucide-react';

interface SquareProps {
  value: Player;
  onClick: () => void;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, disabled }) => {
  // Renderiza um ícone espacial para X ou O
  const renderPlayerIcon = (player: Player) => {
    if (player === 'X') {
      return <Rocket className="w-7 h-7 md:w-10 md:h-10 text-neon-blue" />;
    } else if (player === 'O') {
      return <Star className="w-7 h-7 md:w-10 md:h-10 text-neon-pink" />;
    }
    return null;
  };

  return (
    <button
      className={`aspect-square w-full flex items-center justify-center rounded border border-neon-purple/30 
        ${!value && !disabled ? 'hover:bg-space-light/20' : ''} 
        ${value === 'X' ? 'text-neon-blue' : 'text-neon-pink'}
        bg-space-accent/20`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Square ${value || ''}`}
    >
      {renderPlayerIcon(value)}
    </button>
  );
};

export default Square;
