
import React from 'react';
import QuizStats from './QuizStats';
import NeonButton from '../NeonButton';
import { QuizGameStats } from './types';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  quizStats: QuizGameStats;
  onRestart: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ 
  score, 
  totalQuestions, 
  quizStats, 
  onRestart 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          <span className="text-gradient">FIM DO QUIZ!</span>
        </h2>
        
        <div className="mt-6 mb-4">
          <p className="text-4xl font-bold text-neon-blue mb-2">{score}/{totalQuestions}</p>
          <p className="text-gray-300 light:text-gray-700">
            {score >= 8 ? "Excelente!" : score >= 6 ? "Muito bom!" : score >= 3 ? "Bom trabalho!" : "Continue tentando!"}
          </p>
        </div>
        
        <NeonButton onClick={onRestart} className="w-full mt-6">
          Jogar Novamente
        </NeonButton>
      </div>
      
      <QuizStats stats={quizStats} totalQuestions={totalQuestions} />
    </div>
  );
};

export default QuizResult;
