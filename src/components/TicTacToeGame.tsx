
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { addSecretNumberAttempts } from './SecretNumberGame';

type Player = 'X' | 'O' | null;
type BoardState = Player[];

const TicTacToeGame = () => {
  const { toast } = useToast();
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [gameStats, setGameStats] = useState({
    xWins: 0,
    oWins: 0,
    draws: 0,
  });

  // Carregar estatísticas do localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('ticTacToeStats');
    if (savedStats) {
      setGameStats(JSON.parse(savedStats));
    }
  }, []);

  // Salvar estatísticas no localStorage
  const saveStats = (stats: typeof gameStats) => {
    setGameStats(stats);
    localStorage.setItem('ticTacToeStats', JSON.stringify(stats));
  };

  const handleClick = (index: number) => {
    // Ignorar clique se o espaço estiver ocupado ou jogo finalizado
    if (board[index] || winner) {
      return;
    }

    // Criar novo estado do tabuleiro
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

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
          title: "Jogador X venceu!",
          description: "Parabéns pela vitória!",
        });
      } else {
        newStats.oWins += 1;
        
        // Adicionar tentativas aleatórias ao jogo do número secreto (1-3)
        rewardSecretNumberAttempts();
        
        toast({
          title: "Jogador O venceu!",
          description: "Parabéns pela vitória!",
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

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    toast({
      title: "Novo Jogo",
      description: "O tabuleiro foi reiniciado!",
    });
  };

  const renderSquare = (index: number) => {
    return (
      <button
        className={`aspect-square w-full flex items-center justify-center text-4xl font-bold rounded border border-neon-purple/30 
          ${!board[index] && !winner ? 'hover:bg-space-light/20' : ''} 
          ${board[index] === 'X' ? 'text-neon-blue' : 'text-neon-pink'}
          bg-space-accent/20`}
        onClick={() => handleClick(index)}
        disabled={!!winner}
        aria-label={`Square ${index}`}
      >
        {board[index]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner === 'draw') {
      return 'Empate!';
    } else if (winner) {
      return `Vencedor: ${winner}`;
    } else {
      return `Próximo jogador: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <p className="text-xl font-semibold text-white light:text-space-dark">
          {getStatus()}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {Array(9).fill(null).map((_, index) => (
          <React.Fragment key={index}>
            {renderSquare(index)}
          </React.Fragment>
        ))}
      </div>

      <NeonButton onClick={resetGame} className="w-full">
        Reiniciar Jogo
      </NeonButton>

      <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
        <CardHeader>
          <CardTitle className="text-xl text-neon-blue">Estatísticas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-neon-blue text-xl font-bold">{gameStats.xWins}</p>
              <p className="text-gray-300 light:text-gray-700">Vitórias X</p>
            </div>
            <div>
              <p className="text-neon-purple text-xl font-bold">{gameStats.draws}</p>
              <p className="text-gray-300 light:text-gray-700">Empates</p>
            </div>
            <div>
              <p className="text-neon-pink text-xl font-bold">{gameStats.oWins}</p>
              <p className="text-gray-300 light:text-gray-700">Vitórias O</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Função para calcular o vencedor
const calculateWinner = (squares: BoardState) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
};

export default TicTacToeGame;
