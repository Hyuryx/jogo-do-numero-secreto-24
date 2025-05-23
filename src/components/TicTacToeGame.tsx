
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { addSecretNumberAttempts } from './SecretNumberGame';
import { Rocket, Star, Moon, Bot, User } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Player = 'X' | 'O' | null;
type BoardState = Player[];
type GameMode = 'player' | 'ai';

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
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [gameMode, setGameMode] = useState<GameMode>('player');

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
        makeAIMove();
      }, 700);
      
      return () => clearTimeout(timerId);
    }
  }, [isXNext, gameMode, winner]);

  // Salvar estatísticas no localStorage
  const saveStats = (stats: typeof gameStats) => {
    setGameStats(stats);
    localStorage.setItem('ticTacToeStats', JSON.stringify(stats));
  };

  const makeAIMove = () => {
    // Verificar se já há um vencedor ou empate
    if (winner || board.every(square => square !== null)) {
      return;
    }
    
    // Estratégia do AI
    let move = findBestMove(board);
    
    // Fazer a jogada
    handleClick(move);
  };

  // Encontrar o melhor movimento para o AI usando o algoritmo minimax
  const findBestMove = (currentBoard: BoardState): number => {
    // Primeiro, verificar se há um movimento vencedor
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        // Tentar o movimento
        const newBoard = [...currentBoard];
        newBoard[i] = 'O';
        
        // Ver se é uma jogada vencedora
        if (calculateWinner(newBoard) === 'O') {
          return i;
        }
      }
    }
    
    // Segundo, bloquear movimento vencedor do adversário
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        // Simular jogada do adversário
        const newBoard = [...currentBoard];
        newBoard[i] = 'X';
        
        // Ver se seria uma jogada vencedora para o adversário
        if (calculateWinner(newBoard) === 'X') {
          return i;
        }
      }
    }
    
    // Terceiro, tentar pegar o centro
    if (currentBoard[4] === null) {
      return 4;
    }
    
    // Quarto, tentar pegar cantos
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => currentBoard[corner] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Por último, pegar qualquer posição disponível
    const availableMoves = currentBoard
      .map((square, index) => square === null ? index : -1)
      .filter(index => index !== -1);
      
    if (availableMoves.length > 0) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    
    // Caso não tenha movimentos disponíveis (não deveria acontecer)
    return 0;
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
          title: "Jogador X venceu!",
          description: "Parabéns pela vitória!",
        });
      } else {
        newStats.oWins += 1;
        
        // No modo AI, só damos recompensa se o jogador humano ganhar
        if (!(gameMode === 'ai' && gameWinner === 'O')) {
          rewardSecretNumberAttempts();
        }
        
        toast({
          title: gameMode === 'ai' ? "Computador venceu!" : "Jogador O venceu!",
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
    setSelectedLetters([]);
    toast({
      title: "Novo Jogo",
      description: "O tabuleiro foi reiniciado!",
    });
  };

  // Renderiza um ícone espacial para X ou O
  const renderPlayerIcon = (player: Player) => {
    if (player === 'X') {
      return <Rocket className="w-7 h-7 md:w-10 md:h-10 text-neon-blue" />;
    } else if (player === 'O') {
      return <Star className="w-7 h-7 md:w-10 md:h-10 text-neon-pink" />;
    }
    return null;
  };

  const renderSquare = (index: number) => {
    return (
      <button
        className={`aspect-square w-full flex items-center justify-center rounded border border-neon-purple/30 
          ${!board[index] && !winner ? 'hover:bg-space-light/20' : ''} 
          ${board[index] === 'X' ? 'text-neon-blue' : 'text-neon-pink'}
          bg-space-accent/20`}
        onClick={() => handleClick(index)}
        disabled={!!winner || (gameMode === 'ai' && !isXNext)}
        aria-label={`Square ${index}`}
      >
        {renderPlayerIcon(board[index])}
      </button>
    );
  };

  const getStatus = () => {
    if (winner === 'draw') {
      return 'Empate!';
    } else if (winner) {
      if (gameMode === 'ai' && winner === 'O') {
        return 'Computador venceu!';
      }
      return `Vencedor: ${winner}`;
    } else {
      if (gameMode === 'ai' && !isXNext) {
        return 'Turno do Computador';
      }
      return `Próximo jogador: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <RadioGroup 
          defaultValue={gameMode} 
          className="flex space-x-4 mb-4"
          onValueChange={(value) => {
            setGameMode(value as GameMode);
            resetGame();
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="player" id="player" />
            <Label htmlFor="player" className="flex items-center gap-1">
              <User className="h-4 w-4" /> vs <User className="h-4 w-4" />
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ai" id="ai" />
            <Label htmlFor="ai" className="flex items-center gap-1">
              <User className="h-4 w-4" /> vs <Bot className="h-4 w-4" />
            </Label>
          </div>
        </RadioGroup>
        
        <p className="text-xl font-semibold text-white light:text-space-dark">
          {getStatus()} {isXNext ? <Rocket className="inline-block w-5 h-5 text-neon-blue" /> : <Star className="inline-block w-5 h-5 text-neon-pink" />}
        </p>
      </div>

      <div className="flex justify-center mb-6">
        {/* Tabuleiro com tamanho ajustado para ser médio e responsivo */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[320px] md:max-w-[380px]">
          {Array(9).fill(null).map((_, index) => (
            <React.Fragment key={index}>
              {renderSquare(index)}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Letras Selecionadas */}
      <div className="mb-4">
        <div className="text-sm text-gray-300 light:text-gray-700 mb-1">Selecionadas:</div>
        <div className="flex flex-wrap gap-2">
          {selectedLetters.map((letter, index) => (
            <span 
              key={index} 
              className={`px-2 py-1 rounded text-xs ${letter === 'X' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-neon-pink/20 text-neon-pink'}`}
            >
              {letter === 'X' ? <Rocket className="inline-block w-3 h-3 mr-1" /> : <Star className="inline-block w-3 h-3 mr-1" />}
              {letter}
            </span>
          ))}
          {selectedLetters.length === 0 && (
            <span className="text-gray-500">Nenhuma jogada ainda</span>
          )}
        </div>
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
              <p className="text-gray-300 light:text-gray-700">Vitórias <Rocket className="inline-block w-4 h-4" /></p>
            </div>
            <div>
              <p className="text-neon-purple text-xl font-bold">{gameStats.draws}</p>
              <p className="text-gray-300 light:text-gray-700">Empates</p>
            </div>
            <div>
              <p className="text-neon-pink text-xl font-bold">{gameStats.oWins}</p>
              <p className="text-gray-300 light:text-gray-700">Vitórias <Star className="inline-block w-4 h-4" /></p>
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
