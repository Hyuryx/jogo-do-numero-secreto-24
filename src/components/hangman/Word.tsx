
import React from 'react';

interface WordProps {
  word: string;
  guessedLetters: string[];
}

const Word: React.FC<WordProps> = ({ word, guessedLetters }) => {
  return (
    <div className="mb-6 flex justify-center">
      {word.split('').map((letter, index) => (
        <span 
          key={index} 
          className="inline-block mx-1 text-center w-8 pb-1 border-b-2 border-neon-purple"
        >
          <span className={`text-2xl font-bold ${guessedLetters.includes(letter) ? 'text-neon-blue' : 'invisible'}`}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Word;
