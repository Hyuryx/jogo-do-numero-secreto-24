
import React from 'react';
import { normalizeText } from './utils';

interface KeyboardProps {
  word: string;
  guessedLetters: string[];
  gameStatus: "playing" | "won" | "lost";
  onGuess: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ word, guessedLetters, gameStatus, onGuess }) => {
  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  
  return (
    <div className="mt-6">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-1">
          {row.map((letter) => {
            const normalizedLetter = normalizeText(letter);
            const isGuessed = guessedLetters.includes(normalizedLetter);
            const isCorrect = word.includes(normalizedLetter);
            
            return (
              <button
                key={letter}
                onClick={() => onGuess(normalizedLetter)}
                disabled={isGuessed || gameStatus !== "playing"}
                className={`w-8 h-10 flex items-center justify-center rounded text-sm font-medium transition-colors 
                  ${isGuessed 
                    ? isCorrect 
                      ? 'bg-neon-blue/30 text-neon-blue border border-neon-blue' 
                      : 'bg-neon-pink/20 text-neon-pink/50 border border-neon-pink/30'
                    : 'bg-space-light/20 hover:bg-space-light/40 text-white border border-neon-purple/30'}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
