
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { addSecretNumberAttempts } from './SecretNumberGame';

type SudokuGrid = number[][];

const SudokuGame = () => {
  const { toast } = useToast();
  const [grid, setGrid] = useState<SudokuGrid>([]);
  const [initialGrid, setInitialGrid] = useState<SudokuGrid>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [solution, setSolution] = useState<SudokuGrid>([]);

  // Gerar um novo jogo de Sudoku
  useEffect(() => {
    newGame();
  }, [difficulty]);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && !isComplete) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, isComplete]);

  // Gerar um novo jogo
  const newGame = () => {
    // Reiniciar o estado
    setIsComplete(false);
    setHintsUsed(0);
    setTimer(0);
    setSelectedCell(null);
    
    // Gerar um novo puzzle de Sudoku com base na dificuldade
    const { puzzle, solution } = generateSudoku(difficulty);
    setGrid(puzzle);
    setInitialGrid(JSON.parse(JSON.stringify(puzzle)));
    setSolution(solution);
    
    // Iniciar o timer
    setIsActive(true);
    
    toast({
      title: "Novo jogo de Sudoku",
      description: `Dificuldade: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`,
    });
  };

  // Gerar um Sudoku com uma solução válida
  const generateSudoku = (difficulty: string) => {
    // Cria uma grade inicial resolvida
    const solvedGrid = Array(9).fill(null).map(() => Array(9).fill(0));
    
    // Preenchendo a diagonal principal (caixas 3x3) que são independentes
    for (let i = 0; i < 9; i += 3) {
      fillBox(solvedGrid, i, i);
    }
    
    // Resolver o restante do puzzle
    solveSudoku(solvedGrid);
    
    // Clonar a solução
    const solution = JSON.parse(JSON.stringify(solvedGrid));
    
    // Remover números com base na dificuldade para criar o puzzle
    const puzzle = JSON.parse(JSON.stringify(solution));
    const numbersToRemove = {
      easy: 30,
      medium: 40,
      hard: 50
    }[difficulty] || 30;
    
    // Remover números aleatoriamente
    let count = 0;
    while (count < numbersToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        count++;
      }
    }
    
    return { puzzle, solution };
  };

  // Preencher uma caixa 3x3 em uma posição específica
  const fillBox = (grid: number[][], row: number, col: number) => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(nums);
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[row + i][col + j] = nums.pop() || 0;
      }
    }
  };

  // Resolver um puzzle de Sudoku usando backtracking
  const solveSudoku = (grid: number[][]) => {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
      return true; // Puzzle resolvido
    }
    
    const [row, col] = emptyCell;
    
    for (let num = 1; num <= 9; num++) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
        
        if (solveSudoku(grid)) {
          return true;
        }
        
        grid[row][col] = 0; // Backtrack
      }
    }
    
    return false;
  };

  // Encontrar uma célula vazia
  const findEmptyCell = (grid: number[][]) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  };

  // Verificar se um número pode ser colocado em uma posição
  const isValid = (grid: number[][], row: number, col: number, num: number) => {
    // Verificar linha
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num) {
        return false;
      }
    }
    
    // Verificar coluna
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num) {
        return false;
      }
    }
    
    // Verificar caixa 3x3
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRow + i][boxCol + j] === num) {
          return false;
        }
      }
    }
    
    return true;
  };

  // Embaralhar um array
  const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Verificar se o Sudoku está completo e correto
  const checkCompletion = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0 || !isValid(grid, row, col, grid[row][col])) {
          return false;
        }
      }
    }
    
    setIsComplete(true);
    setIsActive(false);
    
    // Recompensar o jogador com base na dificuldade e no tempo
    let reward = 0;
    
    if (difficulty === 'easy') {
      reward = 1;
    } else if (difficulty === 'medium') {
      reward = 2;
    } else { // hard
      reward = 3;
    }
    
    // Reduzir a recompensa se muitas dicas foram usadas
    reward = Math.max(1, reward - Math.floor(hintsUsed / 3));
    
    const newAttempts = addSecretNumberAttempts(reward);
    
    toast({
      title: "Sudoku Completo!",
      description: `Parabéns! Você ganhou ${reward} tentativa${reward !== 1 ? 's' : ''} para o Jogo do Número Secreto!`,
    });
    
    return true;
  };

  // Manipular a entrada de números
  const handleCellChange = (value: string) => {
    if (!selectedCell || initialGrid[selectedCell[0]][selectedCell[1]] !== 0) {
      return;
    }
    
    const num = parseInt(value);
    
    if ((isNaN(num) || num < 1 || num > 9) && value !== '') {
      return;
    }
    
    const newGrid = [...grid];
    newGrid[selectedCell[0]][selectedCell[1]] = value === '' ? 0 : num;
    setGrid(newGrid);
    
    // Verificar se o jogo está completo
    if (newGrid.every(row => row.every(cell => cell !== 0))) {
      checkCompletion();
    }
  };

  // Dar uma dica ao jogador
  const useHint = () => {
    if (selectedCell && initialGrid[selectedCell[0]][selectedCell[1]] === 0) {
      const [row, col] = selectedCell;
      const correctValue = solution[row][col];
      
      const newGrid = [...grid];
      newGrid[row][col] = correctValue;
      setGrid(newGrid);
      
      setHintsUsed(hintsUsed + 1);
      
      toast({
        title: "Dica Utilizada",
        description: `O valor correto para esta célula é ${correctValue}.`,
      });
      
      // Verificar se o jogo está completo
      if (newGrid.every(row => row.every(cell => cell !== 0))) {
        checkCompletion();
      }
    } else {
      toast({
        title: "Não é possível dar dica",
        description: "Selecione uma célula vazia ou editável primeiro.",
        variant: "destructive"
      });
    }
  };

  // Formatar o tempo no formato mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Renderizar a grade do Sudoku
  const renderGrid = () => {
    if (!grid.length) return <p>Carregando...</p>;
    
    return (
      <div className="sudoku-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => {
              const isInitial = initialGrid[rowIndex][colIndex] !== 0;
              const isSelected = selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex;
              const boxRowStart = Math.floor(rowIndex / 3) * 3;
              const boxColStart = Math.floor(colIndex / 3) * 3;
              const isEvenBox = (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0;
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${isInitial ? 'bg-space-accent/40' : 'bg-space-accent/20'} 
                              ${isSelected ? 'border-2 border-neon-blue' : 'border border-neon-purple/30'} 
                              ${isEvenBox ? 'even-box' : ''}`}
                  onClick={() => !isComplete && setSelectedCell([rowIndex, colIndex])}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              );
            })}
          </div>
        ))}
        
        <style>
          {`
          .sudoku-grid {
            display: grid;
            grid-template-rows: repeat(9, 1fr);
            border: 2px solid rgba(149, 97, 226, 0.7);
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
          }
          .sudoku-row {
            display: grid;
            grid-template-columns: repeat(9, 1fr);
          }
          .sudoku-cell {
            aspect-ratio: 1/1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.2s;
          }
          .sudoku-cell:nth-child(3n) {
            border-right: 2px solid rgba(149, 97, 226, 0.7);
          }
          .sudoku-cell:nth-child(1) {
            border-left: 2px solid rgba(149, 97, 226, 0.7);
          }
          .sudoku-row:nth-child(3n) {
            border-bottom: 2px solid rgba(149, 97, 226, 0.7);
          }
          .sudoku-row:nth-child(1) {
            border-top: 2px solid rgba(149, 97, 226, 0.7);
          }
          .even-box {
            background-color: rgba(65, 65, 122, 0.2);
          }
          `}
        </style>
      </div>
    );
  };

  // Renderizar os botões de números para seleção
  const renderNumberButtons = () => {
    return (
      <div className="flex justify-center gap-2 mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            className="w-9 h-9 rounded-full bg-space-accent/30 border border-neon-purple/40 hover:bg-neon-blue/20 transition-colors"
            onClick={() => handleCellChange(num.toString())}
            disabled={isComplete}
          >
            {num}
          </button>
        ))}
        <button
          className="w-9 h-9 rounded-full bg-space-accent/30 border border-neon-purple/40 hover:bg-red-500/20 transition-colors"
          onClick={() => handleCellChange('')}
          disabled={isComplete}
        >
          X
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="text-gradient">SUDOKU</span>
          </h2>
          <p className="text-gray-300 light:text-gray-700">
            Dificuldade: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-300 light:text-gray-700">Tempo</p>
          <p className="text-neon-blue text-xl font-bold">{formatTime(timer)}</p>
        </div>
      </div>

      {renderGrid()}
      {renderNumberButtons()}

      <div className="flex gap-3 mt-6">
        <div className="flex gap-2">
          <NeonButton variant="secondary" onClick={useHint} disabled={isComplete} className="flex-1">
            Dica
          </NeonButton>
          <NeonButton onClick={checkCompletion} disabled={isComplete} className="flex-1">
            Verificar
          </NeonButton>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <NeonButton onClick={() => {setDifficulty('easy'); newGame();}} variant={difficulty === 'easy' ? 'primary' : 'outline'} className="flex-1">
          Fácil
        </NeonButton>
        <NeonButton onClick={() => {setDifficulty('medium'); newGame();}} variant={difficulty === 'medium' ? 'primary' : 'outline'} className="flex-1">
          Médio
        </NeonButton>
        <NeonButton onClick={() => {setDifficulty('hard'); newGame();}} variant={difficulty === 'hard' ? 'primary' : 'outline'} className="flex-1">
          Difícil
        </NeonButton>
      </div>

      <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
        <CardHeader>
          <CardTitle className="text-xl text-neon-blue">Informações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-neon-blue text-xl font-bold">{hintsUsed}</p>
              <p className="text-gray-300 light:text-gray-700">Dicas Usadas</p>
            </div>
            <div>
              <p className="text-neon-pink text-xl font-bold">{isComplete ? "Completo" : "Em progresso"}</p>
              <p className="text-gray-300 light:text-gray-700">Status</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SudokuGame;
