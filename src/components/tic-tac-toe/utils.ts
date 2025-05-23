
import { BoardState, Player } from './types';

// Função para calcular o vencedor
export const calculateWinner = (squares: BoardState): Player => {
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

// Função para encontrar o melhor movimento para o AI
// Mais simples e mais confiável que o algoritmo minimax anterior
export const findBestMove = (currentBoard: BoardState): number => {
  // Linhas de vitória possíveis
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
  
  // Primeiro, verificar se o AI pode ganhar com a próxima jogada
  for (const line of lines) {
    const [a, b, c] = line;
    // Se dois espaços têm 'O' e o terceiro está vazio, o AI pode ganhar
    if (currentBoard[a] === 'O' && currentBoard[a] === currentBoard[b] && currentBoard[c] === null) {
      return c;
    }
    if (currentBoard[a] === 'O' && currentBoard[a] === currentBoard[c] && currentBoard[b] === null) {
      return b;
    }
    if (currentBoard[b] === 'O' && currentBoard[b] === currentBoard[c] && currentBoard[a] === null) {
      return a;
    }
  }
  
  // Segundo, bloquear jogadas do jogador que poderiam levar à vitória
  for (const line of lines) {
    const [a, b, c] = line;
    // Se dois espaços têm 'X' e o terceiro está vazio, bloquear
    if (currentBoard[a] === 'X' && currentBoard[a] === currentBoard[b] && currentBoard[c] === null) {
      return c;
    }
    if (currentBoard[a] === 'X' && currentBoard[a] === currentBoard[c] && currentBoard[b] === null) {
      return b;
    }
    if (currentBoard[b] === 'X' && currentBoard[b] === currentBoard[c] && currentBoard[a] === null) {
      return a;
    }
  }
  
  // Terceiro, tentar pegar o centro se estiver disponível
  if (currentBoard[4] === null) {
    return 4;
  }
  
  // Quarto, tentar pegar os cantos
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => currentBoard[i] === null);
  if (availableCorners.length > 0) {
    // Escolher aleatoriamente um dos cantos disponíveis
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  
  // Por último, pegar qualquer espaço disponível
  const availableSquares = currentBoard
    .map((square, index) => square === null ? index : -1)
    .filter(index => index !== -1);
    
  if (availableSquares.length > 0) {
    // Escolher aleatoriamente um dos espaços disponíveis
    return availableSquares[Math.floor(Math.random() * availableSquares.length)];
  }
  
  // Não há jogadas disponíveis (improvável chegar aqui)
  return -1;
};

// Função para recompensar tentativas do jogo de número secreto
export const addSecretNumberAttempts = (attempts: number): number => {
  const currentAttempts = parseInt(localStorage.getItem('secretNumberAttempts') || '0');
  const newAttempts = currentAttempts + attempts;
  localStorage.setItem('secretNumberAttempts', newAttempts.toString());
  return newAttempts;
};
