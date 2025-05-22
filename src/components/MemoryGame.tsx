
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { addSecretNumberAttempts } from './SecretNumberGame';

type CardType = {
  id: number;
  content: string;
  flipped: boolean;
  matched: boolean;
};

type Difficulty = 'easy' | 'medium' | 'hard';

interface GameStats {
  gamesPlayed: number;
  wins: number;
  bestTime: {
    easy: number;
    medium: number;
    hard: number;
  };
  movesRecord: {
    easy: number;
    medium: number;
    hard: number;
  };
}

const THEMES = {
  space: ['🚀', '🌙', '👽', '🛸', '🌌', '✨', '🪐', '☄️', '👨‍🚀', '🌠', '🌑', '🌕'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🐸'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧁', '🍩', '🍦', '🍓', '🥑', '🌮', '🍣'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🥊', '🏊‍♂️']
};

const DIFFICULTIES = {
  'easy': { pairs: 6, columns: 3 },
  'medium': { pairs: 8, columns: 4 },
  'hard': { pairs: 12, columns: 4 }
};

const MemoryGame = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [theme, setTheme] = useState<keyof typeof THEMES>('space');
  const [stats, setStats] = useState<GameStats>({
    gamesPlayed: 0,
    wins: 0,
    bestTime: {
      easy: Infinity,
      medium: Infinity,
      hard: Infinity
    },
    movesRecord: {
      easy: Infinity,
      medium: Infinity,
      hard: Infinity
    }
  });

  // Carregar estatísticas
  useEffect(() => {
    const savedStats = localStorage.getItem('memoryGameStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Timer para o jogo
  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval>;
    
    if (gameStarted && !gameOver) {
      timerInterval = setInterval(() => {
        const now = Date.now();
        setElapsedTime(Math.floor((now - startTime) / 1000));
      }, 1000);
    }
    
    return () => clearInterval(timerInterval);
  }, [gameStarted, gameOver, startTime]);

  // Inicializa o jogo
  const initializeGame = (selectedDifficulty: Difficulty, selectedTheme: keyof typeof THEMES) => {
    const { pairs } = DIFFICULTIES[selectedDifficulty];
    const themeEmojis = THEMES[selectedTheme].slice(0, pairs);
    
    // Cria os pares de cartas
    const newCards: CardType[] = [];
    themeEmojis.forEach((emoji, index) => {
      // Par 1
      newCards.push({
        id: index * 2,
        content: emoji,
        flipped: false,
        matched: false
      });
      // Par 2
      newCards.push({
        id: index * 2 + 1,
        content: emoji,
        flipped: false,
        matched: false
      });
    });
    
    // Embaralha as cartas
    const shuffledCards = [...newCards].sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setGameOver(false);
    setDifficulty(selectedDifficulty);
    setTheme(selectedTheme);
    
    // Inicia o timer
    const now = Date.now();
    setStartTime(now);
    setGameStarted(true);
  };

  // Lida com o click nas cartas
  const handleCardClick = (index: number) => {
    // Ignora clicks em cartas já viradas ou quando já existem duas cartas viradas
    if (
      cards[index].flipped ||
      cards[index].matched ||
      flippedIndices.length >= 2
    ) {
      return;
    }
    
    // Vira a carta
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    
    // Adiciona o índice às cartas viradas
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    
    // Se temos duas cartas viradas, verifica se são iguais
    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].content === cards[secondIndex].content) {
        // É um par!
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].matched = true;
          matchedCards[secondIndex].matched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          
          // Verifica se o jogo acabou
          if (matchedCards.every(card => card.matched)) {
            const endTime = Date.now();
            const gameTimeInSeconds = Math.floor((endTime - startTime) / 1000);
            finishGame(gameTimeInSeconds);
          }
        }, 500);
      } else {
        // Não é um par, vira as cartas de volta
        setTimeout(() => {
          const unmatchedCards = [...cards];
          unmatchedCards[firstIndex].flipped = false;
          unmatchedCards[secondIndex].flipped = false;
          setCards(unmatchedCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  // Finaliza o jogo
  const finishGame = (timeInSeconds: number) => {
    setGameOver(true);
    setGameStarted(false);
    setGameTime(timeInSeconds);
    
    // Atualiza as estatísticas
    const newStats = { ...stats };
    newStats.gamesPlayed++;
    newStats.wins++;
    
    // Atualiza recordes de tempo e movimentos se necessário
    if (timeInSeconds < newStats.bestTime[difficulty] || newStats.bestTime[difficulty] === Infinity) {
      newStats.bestTime[difficulty] = timeInSeconds;
    }
    
    if (moves < newStats.movesRecord[difficulty] || newStats.movesRecord[difficulty] === Infinity) {
      newStats.movesRecord[difficulty] = moves;
    }
    
    setStats(newStats);
    localStorage.setItem('memoryGameStats', JSON.stringify(newStats));
    
    // Determina a recompensa baseada na dificuldade e desempenho
    let rewardAttempts = 1; // Recompensa padrão
    
    if (difficulty === 'hard') {
      // Recompensa para dificuldade difícil
      if (moves <= newStats.movesRecord[difficulty] && timeInSeconds <= newStats.bestTime[difficulty]) {
        rewardAttempts = 3; // Novo recorde de tempo E movimentos = 3 tentativas
      } else if (moves <= newStats.movesRecord[difficulty] || timeInSeconds <= newStats.bestTime[difficulty]) {
        rewardAttempts = 2; // Novo recorde em um dos dois = 2 tentativas
      }
    } else if (difficulty === 'medium') {
      // Recompensa para dificuldade média
      if (moves <= newStats.movesRecord[difficulty] && timeInSeconds <= newStats.bestTime[difficulty]) {
        rewardAttempts = 2; // Novo recorde de tempo E movimentos = 2 tentativas
      }
    }
    
    // Adiciona as tentativas
    const newAttempts = addSecretNumberAttempts(rewardAttempts);
    
    toast({
      title: "Jogo Concluído!",
      description: `Você completou em ${timeInSeconds}s com ${moves} movimentos! +${rewardAttempts} tentativa${rewardAttempts > 1 ? 's' : ''} para o Jogo do Número Secreto.`,
    });
  };

  // Formata o tempo para exibição (mm:ss)
  const formatTime = (seconds: number) => {
    if (seconds === Infinity) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Se o jogo não começou, mostra tela de configuração
  if (!gameStarted && !gameOver) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">JOGO DA MEMÓRIA</span>
          </h2>
          <p className="text-gray-300 light:text-gray-700 mb-6">
            Encontre todos os pares de cartas
          </p>
          
          <div className="space-y-6">
            <div>
              <p className="text-white mb-2 font-medium">Dificuldade:</p>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setDifficulty('easy')}
                  className={`p-3 rounded-lg border ${difficulty === 'easy' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                >
                  <span className="text-white">Fácil</span>
                </button>
                <button 
                  onClick={() => setDifficulty('medium')}
                  className={`p-3 rounded-lg border ${difficulty === 'medium' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                >
                  <span className="text-white">Médio</span>
                </button>
                <button 
                  onClick={() => setDifficulty('hard')}
                  className={`p-3 rounded-lg border ${difficulty === 'hard' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                >
                  <span className="text-white">Difícil</span>
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-white mb-2 font-medium">Tema:</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(THEMES).map(([themeKey, emojis]) => (
                  <button 
                    key={themeKey}
                    onClick={() => setTheme(themeKey as keyof typeof THEMES)}
                    className={`p-3 rounded-lg border ${theme === themeKey ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                  >
                    <div>
                      <span className="text-white capitalize">{themeKey}</span>
                      <div className="flex flex-wrap justify-center mt-1">
                        {emojis.slice(0, 5).map((emoji, i) => (
                          <span key={i} className="text-xl">{emoji}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <NeonButton onClick={() => initializeGame(difficulty, theme)} className="w-full">
              Iniciar Jogo
            </NeonButton>
          </div>
        </div>
        
        <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
          <CardHeader>
            <CardTitle className="text-xl text-neon-blue">Recordes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-y-4">
              <p className="text-gray-300 light:text-gray-700">Partidas Jogadas:</p>
              <p className="text-white font-bold text-right">{stats.gamesPlayed}</p>
              
              <p className="text-gray-300 light:text-gray-700">Partidas Vencidas:</p>
              <p className="text-white font-bold text-right">{stats.wins}</p>
              
              <p className="text-gray-300 light:text-gray-700">Melhor Tempo (Fácil):</p>
              <p className="text-neon-blue font-bold text-right">{formatTime(stats.bestTime.easy)}</p>
              
              <p className="text-gray-300 light:text-gray-700">Melhor Tempo (Médio):</p>
              <p className="text-neon-blue font-bold text-right">{formatTime(stats.bestTime.medium)}</p>
              
              <p className="text-gray-300 light:text-gray-700">Melhor Tempo (Difícil):</p>
              <p className="text-neon-blue font-bold text-right">{formatTime(stats.bestTime.hard)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de fim de jogo
  if (gameOver) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">JOGO COMPLETO!</span>
          </h2>
          
          <div className="space-y-4">
            <div className="bg-space-accent/20 border border-neon-purple/30 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-gray-300 light:text-gray-700">Tempo</p>
                  <p className="text-neon-blue text-2xl font-bold">{formatTime(gameTime)}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 light:text-gray-700">Movimentos</p>
                  <p className="text-neon-purple text-2xl font-bold">{moves}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300 light:text-gray-700">Dificuldade:</span>
                  <span className="text-white font-medium capitalize">{difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 light:text-gray-700">Tema:</span>
                  <span className="text-white font-medium capitalize">{theme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 light:text-gray-700">Recorde de tempo:</span>
                  <span className={`font-medium ${gameTime <= stats.bestTime[difficulty] ? 'text-neon-blue' : 'text-white'}`}>
                    {formatTime(stats.bestTime[difficulty])}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 light:text-gray-700">Recorde de movimentos:</span>
                  <span className={`font-medium ${moves <= stats.movesRecord[difficulty] ? 'text-neon-pink' : 'text-white'}`}>
                    {stats.movesRecord[difficulty] === Infinity ? '--' : stats.movesRecord[difficulty]}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <NeonButton 
                onClick={() => initializeGame(difficulty, theme)} 
                variant="primary"
              >
                Jogar Novamente
              </NeonButton>
              <NeonButton 
                onClick={() => {
                  setGameOver(false);
                  setGameStarted(false);
                }} 
                variant="outline"
              >
                Mudar Configurações
              </NeonButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grade do jogo
  const { columns } = DIFFICULTIES[difficulty];
  const cardWidth = difficulty === 'easy' ? 'w-1/3' : 'w-1/4';
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          <span className="text-gradient">JOGO DA MEMÓRIA</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-gray-300 light:text-gray-700 text-xs">Tempo</p>
            <p className="text-neon-blue font-bold">{formatTime(elapsedTime)}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 light:text-gray-700 text-xs">Movimentos</p>
            <p className="text-neon-purple font-bold">{moves}</p>
          </div>
        </div>
      </div>
      
      <div className={`grid grid-cols-${columns} gap-2`} 
        style={{gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`}}
      >
        {cards.map((card, index) => (
          <div key={index} className={`${cardWidth} aspect-square`}>
            <button
              onClick={() => handleCardClick(index)}
              className={`w-full h-full rounded-lg border flex items-center justify-center text-3xl transition-all duration-300
                ${card.flipped || card.matched 
                  ? 'bg-space-light/30 border-neon-blue transform rotate-0 scale-100' 
                  : 'bg-space-accent/20 border-neon-purple/30 transform rotate-0 scale-100 hover:scale-105'}`}
              disabled={card.matched}
            >
              {card.flipped || card.matched ? card.content : ''}
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <NeonButton 
          onClick={() => {
            setGameStarted(false);
            setGameOver(false);
          }} 
          variant="outline"
          className="px-3"
        >
          Reiniciar
        </NeonButton>
        <div className="text-xs text-right">
          <p className="text-gray-400 light:text-gray-600">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} • {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </p>
          <p className="text-gray-400 light:text-gray-600">
            Melhor: {formatTime(stats.bestTime[difficulty])}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
