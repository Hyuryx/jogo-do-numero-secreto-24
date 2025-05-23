
import React from 'react';
import Square from './Square';
import { BoardState, Player, GameMode } from './types';

interface BoardProps {
  board: BoardState;
  onClick: (index: number) => void;
  winner: Player | 'draw' | null;
  isXNext: boolean;
  gameMode: GameMode;
}

const Board: React.FC<BoardProps> = ({ board, onClick, winner, isXNext, gameMode }) => {
  const renderSquare = (index: number) => {
    const isDisabled = 
      !!winner || 
      !!board[index] || 
      (gameMode === 'ai' && !isXNext);
    
    return (
      <Square
        key={index}
        value={board[index]}
        onClick={() => onClick(index)}
        disabled={isDisabled}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-[320px] md:max-w-[380px]">
      {Array(9).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          {renderSquare(index)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Board;
