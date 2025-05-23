
import React from 'react';
import { QuizGameStats } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface QuizStatsProps {
  stats: QuizGameStats;
  totalQuestions: number;
}

const QuizStats: React.FC<QuizStatsProps> = ({ stats, totalQuestions }) => {
  return (
    <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
      <CardHeader>
        <CardTitle className="text-xl text-neon-blue">Estatísticas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-neon-blue text-xl font-bold">{stats.gamesPlayed}</p>
            <p className="text-gray-300 light:text-gray-700">Quizzes Jogados</p>
          </div>
          <div>
            <p className="text-neon-pink text-xl font-bold">{stats.bestScore}/{totalQuestions}</p>
            <p className="text-gray-300 light:text-gray-700">Melhor Pontuação</p>
          </div>
          <div>
            <p className="text-neon-purple text-xl font-bold">
              {stats.totalQuestions > 0 
                ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) 
                : 0}%
            </p>
            <p className="text-gray-300 light:text-gray-700">Taxa de Acerto</p>
          </div>
          <div>
            <p className="text-neon-purple text-xl font-bold">{stats.totalCorrect}</p>
            <p className="text-gray-300 light:text-gray-700">Total de Acertos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizStats;
