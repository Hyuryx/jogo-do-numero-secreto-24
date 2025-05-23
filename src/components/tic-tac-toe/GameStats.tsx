
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Rocket, Star } from 'lucide-react';
import { GameStats } from './types';

interface GameStatsProps {
  stats: GameStats;
}

const GameStatsDisplay: React.FC<GameStatsProps> = ({ stats }) => {
  return (
    <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
      <CardHeader>
        <CardTitle className="text-xl text-neon-blue">Estatísticas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-neon-blue text-xl font-bold">{stats.xWins}</p>
            <p className="text-gray-300 light:text-gray-700">Vitórias <Rocket className="inline-block w-4 h-4" /></p>
          </div>
          <div>
            <p className="text-neon-purple text-xl font-bold">{stats.draws}</p>
            <p className="text-gray-300 light:text-gray-700">Empates</p>
          </div>
          <div>
            <p className="text-neon-pink text-xl font-bold">{stats.oWins}</p>
            <p className="text-gray-300 light:text-gray-700">Vitórias <Star className="inline-block w-4 h-4" /></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStatsDisplay;
