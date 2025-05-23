
import React from 'react';
import { Question } from './types';

interface QuizQuestionProps {
  question: Question;
  selectedOption: number | null;
  onOptionSelect: (index: number) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  selectedOption, 
  onOptionSelect
}) => {
  return (
    <div className="bg-space-accent/20 border border-neon-purple/30 rounded-lg p-4">
      <h3 className="text-xl text-white light:text-space-dark font-semibold mb-6">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionSelect(index)}
            disabled={selectedOption !== null}
            className={`w-full text-left p-3 rounded-md transition-colors ${
              selectedOption === null 
                ? 'hover:bg-space-light/30 bg-space-light/10' 
                : selectedOption === index 
                  ? index === question.correctAnswer 
                    ? 'bg-green-500/40 border border-green-500' 
                    : 'bg-red-500/40 border border-red-500'
                  : index === question.correctAnswer
                    ? 'bg-green-500/40 border border-green-500'
                    : 'bg-space-light/10'
            }`}
          >
            <span className="text-white light:text-space-dark">
              {String.fromCharCode(65 + index)}. {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
