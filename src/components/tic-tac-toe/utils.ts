
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

// Minimax algorithm
export const minimax = (board: BoardState, depth: number, isMaximizing: boolean): number => {
  // Terminal conditions
  const winner = calculateWinner(board);
  
  if (winner === 'O') return 10 - depth;  // AI wins (O player)
  if (winner === 'X') return depth - 10;  // Human wins (X player)
  if (!board.includes(null)) return 0;    // Draw
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

// Encontrar o melhor movimento para o AI usando o algoritmo minimax
export const findBestMove = (currentBoard: BoardState): number => {
  let bestScore = -Infinity;
  let bestMove = 0;
  
  // For each available move
  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] === null) {
      // Try the move
      currentBoard[i] = 'O';
      const score = minimax(currentBoard, 0, false);
      currentBoard[i] = null;
      
      // Update best move if this is better
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  
  return bestMove;
};

// Função para recompensar tentativas do jogo de número secreto
export const addSecretNumberAttempts = (attempts: number): number => {
  const currentAttempts = parseInt(localStorage.getItem('secretNumberAttempts') || '0');
  const newAttempts = currentAttempts + attempts;
  localStorage.setItem('secretNumberAttempts', newAttempts.toString());
  return newAttempts;
};
