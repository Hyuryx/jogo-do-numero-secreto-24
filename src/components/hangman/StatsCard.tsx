
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { GameStats } from './types';

interface StatsCardProps {
  stats: GameStats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
      <CardHeader>
        <CardTitle className="text-xl text-neon-blue">Estatísticas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-neon-blue text-xl font-bold">{stats.wins}</p>
            <p className="text-gray-300 light:text-gray-700">Vitórias</p>
          </div>
          <div>
            <p className="text-neon-pink text-xl font-bold">{stats.losses}</p>
            <p className="text-gray-300 light:text-gray-700">Derrotas</p>
          </div>
          <div>
            <p className="text-neon-purple text-xl font-bold">{stats.currentStreak}</p>
            <p className="text-gray-300 light:text-gray-700">Sequência Atual</p>
          </div>
          <div>
            <p className="text-neon-purple text-xl font-bold">{stats.streakRecord}</p>
            <p className="text-gray-300 light:text-gray-700">Melhor Sequência</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
