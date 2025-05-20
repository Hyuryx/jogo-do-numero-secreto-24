
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Player = 'X' | 'O' | null;
type BoardState = Player[];

const TicTacToeGame = () => {
  const { toast } = useToast();
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player>(null);
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
        toast({
          title: "Jogador X venceu!",
          description: "Parabéns pela vitória!",
        });
      } else {
        newStats.oWins += 1;
        toast({
          title: "Jogador O venceu!",
          description: "Parabéns pela vitória!",
        });
      }
      saveStats(newStats);
    } else if (!newBoard.includes(null)) {
      // Jogo empatado
      setWinner('draw' as any);
      const newStats = { ...gameStats };
      newStats.draws += 1;
      saveStats(newStats);
      toast({
        title: "Empate!",
        description: "O jogo terminou empatado.",
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
    <div className="space-card p-6 md:p-8 backdrop-blur-lg relative">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          <span className="text-gradient">JOGO DA VELHA</span>
        </h2>
        <p className="text-gray-300 light:text-gray-700">
          Jogue contra um amigo neste clássico jogo!
        </p>
      </div>

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
