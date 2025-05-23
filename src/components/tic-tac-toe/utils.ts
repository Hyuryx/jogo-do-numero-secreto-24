
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

// Função completamente reescrita para encontrar o melhor movimento para o AI
export const findBestMove = (currentBoard: BoardState): number => {
  // Cópias para trabalhar
  const board = [...currentBoard];
  
  // 1. Verificar se o AI pode vencer na próxima jogada
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      // Tenta este movimento
      board[i] = 'O';
      if (calculateWinner(board) === 'O') {
        // Ação vencedora, retorna essa jogada
        return i;
      }
      // Desfaz o movimento para continuar testando
      board[i] = null;
    }
  }
  
  // 2. Bloquear movimento vencedor do jogador
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      // Tenta como se fosse o jogador
      board[i] = 'X';
      if (calculateWinner(board) === 'X') {
        // Bloqueia essa jogada
        return i;
      }
      // Desfaz para continuar testando
      board[i] = null;
    }
  }
  
  // 3. Tenta ocupar o centro
  if (board[4] === null) {
    return 4;
  }
  
  // 4. Tenta pegar os cantos
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === null);
  if (availableCorners.length > 0) {
    const randomCornerIndex = Math.floor(Math.random() * availableCorners.length);
    return availableCorners[randomCornerIndex];
  }
  
  // 5. Pega qualquer espaço livre
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      return i;
    }
  }
  
  // Se chegou aqui é porque não há jogadas válidas (não deveria acontecer)
  return -1;
};

// Função para recompensar tentativas do jogo de número secreto
export const addSecretNumberAttempts = (attempts: number): number => {
  const currentAttempts = parseInt(localStorage.getItem('secretNumberAttempts') || '0');
  const newAttempts = currentAttempts + attempts;
  localStorage.setItem('secretNumberAttempts', newAttempts.toString());
  return newAttempts;
};
