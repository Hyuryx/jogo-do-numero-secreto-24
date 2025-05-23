
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Rocket, Star } from 'lucide-react';
import { Player, BoardState, GameMode, GameStats } from './tic-tac-toe/types';
import { calculateWinner, findBestMove } from './tic-tac-toe/utils';
import Board from './tic-tac-toe/Board';
import GameStatsDisplay from './tic-tac-toe/GameStats';
import SelectedLetters from './tic-tac-toe/SelectedLetters';
import GameModeSelector from './tic-tac-toe/GameModeSelector';
import { addSecretNumberAttempts } from './SecretNumberGame';
import { Input } from './ui/input';
import { Label } from './ui/label';

const TicTacToeGame = () => {
  const { toast } = useToast();
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [gameStats, setGameStats] = useState<GameStats>({
    xWins: 0,
    oWins: 0,
    draws: 0,
  });
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [gameMode, setGameMode] = useState<GameMode>('player');
  const [playerNames, setPlayerNames] = useState({
    x: localStorage.getItem('ticTacToePlayerX') || 'Jogador X',
    o: localStorage.getItem('ticTacToePlayerO') || 'Jogador O'
  });
  const [editingNames, setEditingNames] = useState(false);

  // Carregar estatísticas do localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('ticTacToeStats');
    if (savedStats) {
      setGameStats(JSON.parse(savedStats));
    }
  }, []);

  // Fazer o computador jogar quando for sua vez
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !winner) {
      // Pequeno atraso para simular "pensamento" do computador
      const timerId = setTimeout(() => {
        const bestMove = findBestMove([...board]);
        if (bestMove >= 0) {
          handleClick(bestMove);
        }
      }, 700);
      
      return () => clearTimeout(timerId);
    }
  }, [isXNext, gameMode, winner, board]);

  // Salvar estatísticas no localStorage
  const saveStats = (stats: GameStats) => {
    setGameStats(stats);
    localStorage.setItem('ticTacToeStats', JSON.stringify(stats));
  };

  // Função para recompensar o jogador com tentativas aleatórias
  const rewardSecretNumberAttempts = () => {
    // Determina quantas tentativas o jogador ganha (1-3)
    const random = Math.random();
    let attempts = 1; // 85% de chance = 1 tentativa
    
    if (random > 0.85 && random <= 0.95) {
      attempts = 2; // 10% de chance = 2 tentativas
    } else if (random > 0.95) {
      attempts = 3; // 5% de chance = 3 tentativas
    }
    
    // Adiciona as tentativas ao jogo do número secreto
    const newAttempts = addSecretNumberAttempts(attempts);
    
    if (newAttempts > 0) {
      toast({
        title: "Recompensa!",
        description: `Você ganhou +${attempts} tentativa${attempts > 1 ? 's' : ''} para o Jogo do Número Secreto!`,
      });
    }
  };

  const handleClick = (index: number) => {
    // Ignorar clique se o espaço estiver ocupado ou jogo finalizado
    if (board[index] || winner) {
      return;
    }
    
    // Ignorar clique se for a vez do AI
    if (gameMode === 'ai' && !isXNext) {
      return;
    }

    // Criar novo estado do tabuleiro
    const newBoard = [...board];
    const currentPlayer = isXNext ? 'X' : 'O';
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    // Adicionar à lista de letras selecionadas
    setSelectedLetters(prev => [...prev, currentPlayer]);

    // Verificar vencedor
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      
      // Atualizar estatísticas
      const newStats = { ...gameStats };
      if (gameWinner === 'X') {
        newStats.xWins += 1;
        
        // Adicionar tentativas aleatórias ao jogo do número secreto (1-3)
        rewardSecretNumberAttempts();
        
        toast({
          title: `${playerNames.x} venceu!`,
          description: "Parabéns pela vitória!",
        });
      } else {
        newStats.oWins += 1;
        
        // No modo AI, só damos recompensa se o jogador humano ganhar
        if (!(gameMode === 'ai' && gameWinner === 'O')) {
          rewardSecretNumberAttempts();
        }
        
        toast({
          title: gameMode === 'ai' ? "Computador venceu!" : `${playerNames.o} venceu!`,
          description: gameMode === 'ai' ? "Tente novamente!" : "Parabéns pela vitória!",
        });
      }
      saveStats(newStats);
    } else if (!newBoard.includes(null)) {
      // Jogo empatado
      setWinner('draw');
      const newStats = { ...gameStats };
      newStats.draws += 1;
      saveStats(newStats);
      
      // Também dá recompensa no empate, mas com chances menores
      const random = Math.random();
      if (random < 0.5) { // 50% de chance de ganhar uma tentativa
        const newAttempts = addSecretNumberAttempts(1);
        if (newAttempts > 0) {
          toast({
            title: "Empate!",
            description: "Você ganhou +1 tentativa para o Jogo do Número Secreto!",
          });
        }
      } else {
        toast({
          title: "Empate!",
          description: "O jogo terminou empatado.",
        });
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setSelectedLetters([]);
    toast({
      title: "Novo Jogo",
      description: "O tabuleiro foi reiniciado!",
    });
  };

  const getStatus = () => {
    if (winner === 'draw') {
      return 'Empate!';
    } else if (winner) {
      if (gameMode === 'ai' && winner === 'O') {
        return 'Computador venceu!';
      }
      return `Vencedor: ${winner === 'X' ? playerNames.x : playerNames.o}`;
    } else {
      if (gameMode === 'ai' && !isXNext) {
        return 'Turno do Computador';
      }
      return `Próximo jogador: ${isXNext ? playerNames.x : (gameMode === 'ai' ? 'Computador' : playerNames.o)}`;
    }
  };

  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  };

  const handleNameChange = (player: 'x' | 'o', name: string) => {
    setPlayerNames(prev => ({ ...prev, [player]: name }));
    localStorage.setItem(`ticTacToePlayer${player.toUpperCase()}`, name);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <GameModeSelector 
          gameMode={gameMode} 
          onModeChange={handleGameModeChange}
        />
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold text-white light:text-space-dark">
            {getStatus()} {isXNext ? <Rocket className="inline-block w-5 h-5 text-neon-blue" /> : <Star className="inline-block w-5 h-5 text-neon-pink" />}
          </p>
          
          <NeonButton variant="outline" onClick={() => setEditingNames(!editingNames)}>
            {editingNames ? 'Salvar Nomes' : 'Editar Nomes'}
          </NeonButton>
        </div>
        
        {editingNames && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="player-x">Jogador X</Label>
              <Input 
                id="player-x" 
                value={playerNames.x} 
                onChange={(e) => handleNameChange('x', e.target.value)}
                className="bg-space-accent/50 dark:bg-space-accent/50 light:bg-white/80 text-white light:text-space-dark"
              />
            </div>
            {gameMode !== 'ai' && (
              <div>
                <Label htmlFor="player-o">Jogador O</Label>
                <Input 
                  id="player-o" 
                  value={playerNames.o} 
                  onChange={(e) => handleNameChange('o', e.target.value)}
                  className="bg-space-accent/50 dark:bg-space-accent/50 light:bg-white/80 text-white light:text-space-dark"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center mb-6">
        <Board 
          board={board}
          onClick={handleClick}
          winner={winner}
          isXNext={isXNext}
          gameMode={gameMode}
        />
      </div>

      <SelectedLetters letters={selectedLetters} />

      <NeonButton onClick={resetGame} className="w-full">
        Reiniciar Jogo
      </NeonButton>

      <GameStatsDisplay stats={gameStats} />
    </div>
  );
};

export default TicTacToeGame;
