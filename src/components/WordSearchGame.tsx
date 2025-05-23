
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { addSecretNumberAttempts } from './SecretNumberGame';

type Cell = {
  letter: string;
  selected: boolean;
  found: boolean;
  row: number;
  col: number;
};

type Word = {
  word: string;
  found: boolean;
  direction?: string;
  startRow?: number;
  startCol?: number;
};

type GridState = Cell[][];

const WordSearchGame = () => {
  const { toast } = useToast();
  const [grid, setGrid] = useState<GridState>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{row: number, col: number} | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{row: number, col: number} | null>(null);
  const [tempSelection, setTempSelection] = useState<{row: number, col: number}[]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Lista de palavras por categoria
  const wordLists = {
    animals: ['GATO', 'CACHORRO', 'ELEFANTE', 'LEAO', 'TIGRE', 'ZEBRA', 'GIRAFA', 'MACACO', 'COBRA', 'PANDA'],
    fruits: ['BANANA', 'MACA', 'UVA', 'LARANJA', 'MORANGO', 'ABACAXI', 'MELANCIA', 'PERA', 'LIMAO', 'MANGA'],
    countries: ['BRASIL', 'CANADA', 'JAPAO', 'ITALIA', 'FRANCA', 'ALEMANHA', 'MEXICO', 'CHINA', 'INDIA', 'RUSSIA'],
    tech: ['PYTHON', 'JAVA', 'REACT', 'INTERNET', 'CELULAR', 'COMPUTADOR', 'SOFTWARE', 'HARDWARE', 'DADOS', 'NUVEM']
  };

  // Categorias e suas respectivas palavras
  const categories = Object.keys(wordLists);
  const [category, setCategory] = useState(categories[0]);

  // Gerar um novo jogo
  useEffect(() => {
    newGame();
  }, [difficulty, category]);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && !gameOver) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, gameOver]);

  // Verificar se o jogo acabou
  useEffect(() => {
    if (words.length > 0 && words.every(word => word.found) && !gameOver) {
      setGameOver(true);
      setIsActive(false);
      
      // Recompensar o jogador com base na dificuldade
      let reward = 0;
      
      if (difficulty === 'easy') {
        reward = 1;
      } else if (difficulty === 'medium') {
        reward = 2;
      } else { // hard
        reward = 3;
      }
      
      // Reduzir a recompensa se muitas dicas foram usadas
      reward = Math.max(1, reward - Math.floor(hintsUsed / 2));
      
      const newAttempts = addSecretNumberAttempts(reward);
      
      toast({
        title: "Caça-Palavras Completo!",
        description: `Parabéns! Você ganhou ${reward} tentativa${reward !== 1 ? 's' : ''} para o Jogo do Número Secreto!`,
      });
    }
  }, [words, gameOver, difficulty, hintsUsed]);

  // Iniciar um novo jogo
  const newGame = () => {
    // Reiniciar estado
    setGameOver(false);
    setHintsUsed(0);
    setTimer(0);
    setIsSelecting(false);
    setSelectionStart(null);
    setSelectionEnd(null);
    setTempSelection([]);
    
    // Definir tamanho da grade com base na dificuldade
    let gridSize;
    let wordCount;
    
    switch (difficulty) {
      case 'easy':
        gridSize = 8;
        wordCount = 5;
        break;
      case 'medium':
        gridSize = 10;
        wordCount = 7;
        break;
      case 'hard':
        gridSize = 12;
        wordCount = 10;
        break;
      default:
        gridSize = 8;
        wordCount = 5;
    }
    
    // Selecionar palavras aleatoriamente da categoria escolhida
    const selectedWords = selectRandomWords(wordLists[category as keyof typeof wordLists], wordCount);
    
    // Criar a grade e colocar as palavras
    const { grid, placedWords } = createGrid(gridSize, selectedWords);
    
    setGrid(grid);
    setWords(placedWords);
    
    // Iniciar o timer
    setIsActive(true);
    
    toast({
      title: "Novo Caça-Palavras",
      description: `Categoria: ${category.charAt(0).toUpperCase() + category.slice(1)} - Dificuldade: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`,
    });
  };

  // Selecionar palavras aleatórias
  const selectRandomWords = (wordList: string[], count: number) => {
    const shuffled = [...wordList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Criar a grade e colocar as palavras
  const createGrid = (size: number, wordList: string[]) => {
    // Inicializar uma grade vazia
    const emptyGrid: GridState = Array(size).fill(null).map((_, row) => 
      Array(size).fill(null).map((_, col) => ({
        letter: '',
        selected: false,
        found: false,
        row,
        col
      }))
    );
    
    const placedWords: Word[] = [];
    
    // Tentar colocar cada palavra na grade
    wordList.forEach(word => {
      const attempts = 50; // Número máximo de tentativas para colocar a palavra
      let placed = false;
      
      for (let i = 0; i < attempts && !placed; i++) {
        // Escolher uma direção aleatória
        const directions = ['horizontal', 'vertical', 'diagonal-down', 'diagonal-up'];
        const direction = directions[Math.floor(Math.random() * directions.length)];
        
        // Calcular posição inicial válida com base na direção
        let startRow, startCol;
        
        switch (direction) {
          case 'horizontal':
            startRow = Math.floor(Math.random() * size);
            startCol = Math.floor(Math.random() * (size - word.length + 1));
            break;
          case 'vertical':
            startRow = Math.floor(Math.random() * (size - word.length + 1));
            startCol = Math.floor(Math.random() * size);
            break;
          case 'diagonal-down':
            startRow = Math.floor(Math.random() * (size - word.length + 1));
            startCol = Math.floor(Math.random() * (size - word.length + 1));
            break;
          case 'diagonal-up':
            startRow = Math.floor(Math.random() * size - 1) + word.length;
            if (startRow >= size) startRow = size - 1;
            startCol = Math.floor(Math.random() * (size - word.length + 1));
            break;
          default:
            startRow = Math.floor(Math.random() * size);
            startCol = Math.floor(Math.random() * size);
        }
        
        // Verificar se a palavra pode ser colocada na posição sem conflitos
        if (canPlaceWord(emptyGrid, word, startRow, startCol, direction)) {
          // Colocar a palavra na grade
          placeWord(emptyGrid, word, startRow, startCol, direction);
          placedWords.push({ word, found: false, direction, startRow, startCol });
          placed = true;
        }
      }
      
      // Se não conseguiu colocar a palavra após várias tentativas
      if (!placed) {
        console.warn(`Não foi possível colocar a palavra: ${word}`);
      }
    });
    
    // Preencher o resto da grade com letras aleatórias
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (emptyGrid[row][col].letter === '') {
          emptyGrid[row][col].letter = getRandomLetter();
        }
      }
    }
    
    return { grid: emptyGrid, placedWords };
  };

  // Verificar se uma palavra pode ser colocada na posição sem conflitos
  const canPlaceWord = (grid: GridState, word: string, startRow: number, startCol: number, direction: string) => {
    const size = grid.length;
    
    for (let i = 0; i < word.length; i++) {
      let row = startRow;
      let col = startCol;
      
      switch (direction) {
        case 'horizontal':
          col += i;
          break;
        case 'vertical':
          row += i;
          break;
        case 'diagonal-down':
          row += i;
          col += i;
          break;
        case 'diagonal-up':
          row -= i;
          col += i;
          break;
      }
      
      // Verificar se a posição está dentro dos limites
      if (row < 0 || row >= size || col < 0 || col >= size) {
        return false;
      }
      
      // Verificar se a célula está vazia ou contém a mesma letra
      if (grid[row][col].letter !== '' && grid[row][col].letter !== word[i]) {
        return false;
      }
    }
    
    return true;
  };

  // Colocar uma palavra na grade
  const placeWord = (grid: GridState, word: string, startRow: number, startCol: number, direction: string) => {
    for (let i = 0; i < word.length; i++) {
      let row = startRow;
      let col = startCol;
      
      switch (direction) {
        case 'horizontal':
          col += i;
          break;
        case 'vertical':
          row += i;
          break;
        case 'diagonal-down':
          row += i;
          col += i;
          break;
        case 'diagonal-up':
          row -= i;
          col += i;
          break;
      }
      
      grid[row][col].letter = word[i];
    }
  };

  // Gerar uma letra aleatória
  const getRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  // Iniciar a seleção de uma palavra
  const handleCellMouseDown = (row: number, col: number) => {
    if (gameOver) return;
    
    setIsSelecting(true);
    setSelectionStart({ row, col });
    setSelectionEnd({ row, col });
    setTempSelection([{ row, col }]);
    
    // Atualizar a grade para mostrar a seleção
    const newGrid = [...grid];
    newGrid[row][col].selected = true;
    setGrid(newGrid);
  };

  // Continuar a seleção de uma palavra
  const handleCellMouseEnter = (row: number, col: number) => {
    if (!isSelecting || gameOver) return;
    
    setSelectionEnd({ row, col });
    
    // Calcular células entre o início e o fim da seleção
    const cellsInBetween = getCellsInLine(
      selectionStart!.row, 
      selectionStart!.col, 
      row, 
      col
    );
    
    setTempSelection(cellsInBetween);
    
    // Atualizar a grade para mostrar a seleção
    const newGrid = [...grid];
    
    // Redefinir todas as células para não selecionadas
    for (let r = 0; r < newGrid.length; r++) {
      for (let c = 0; c < newGrid[r].length; c++) {
        if (!newGrid[r][c].found) {
          newGrid[r][c].selected = false;
        }
      }
    }
    
    // Marcar as células na seleção
    cellsInBetween.forEach(cell => {
      newGrid[cell.row][cell.col].selected = true;
    });
    
    setGrid(newGrid);
  };

  // Finalizar a seleção e verificar se uma palavra foi encontrada
  const handleCellMouseUp = () => {
    if (!isSelecting || !selectionStart || !selectionEnd || gameOver) return;
    
    setIsSelecting(false);
    
    // Extrair a palavra da seleção
    const selectedWord = extractWordFromSelection(tempSelection);
    const reversedWord = selectedWord.split('').reverse().join('');
    
    // Verificar se a palavra está na lista
    const wordIndex = words.findIndex(
      w => w.word === selectedWord || w.word === reversedWord
    );
    
    if (wordIndex !== -1 && !words[wordIndex].found) {
      // Marcar a palavra como encontrada
      const newWords = [...words];
      newWords[wordIndex].found = true;
      setWords(newWords);
      
      // Marcar as células como encontradas
      const newGrid = [...grid];
      tempSelection.forEach(cell => {
        newGrid[cell.row][cell.col].found = true;
      });
      setGrid(newGrid);
      
      toast({
        title: "Palavra Encontrada!",
        description: `Você encontrou "${words[wordIndex].word}"`,
      });
    } else {
      // Limpar a seleção
      const newGrid = [...grid];
      tempSelection.forEach(cell => {
        if (!newGrid[cell.row][cell.col].found) {
          newGrid[cell.row][cell.col].selected = false;
        }
      });
      setGrid(newGrid);
    }
    
    // Limpar a seleção temporária
    setTempSelection([]);
  };

  // Obter as células em uma linha entre dois pontos
  const getCellsInLine = (startRow: number, startCol: number, endRow: number, endCol: number) => {
    const cells: {row: number, col: number}[] = [];
    
    // Determinar a direção da linha
    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;
    
    // Se não for uma linha válida (horizontal, vertical ou diagonal), retornar apenas a célula inicial
    if (rowDiff !== 0 && colDiff !== 0 && Math.abs(rowDiff) !== Math.abs(colDiff)) {
      return [{ row: startRow, col: startCol }];
    }
    
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    
    // Calcular incrementos
    const rowStep = steps === 0 ? 0 : rowDiff / steps;
    const colStep = steps === 0 ? 0 : colDiff / steps;
    
    // Adicionar todas as células na linha
    for (let i = 0; i <= steps; i++) {
      const row = startRow + Math.round(i * rowStep);
      const col = startCol + Math.round(i * colStep);
      
      cells.push({ row, col });
    }
    
    return cells;
  };

  // Extrair a palavra da seleção
  const extractWordFromSelection = (selection: {row: number, col: number}[]) => {
    return selection.map(cell => grid[cell.row][cell.col].letter).join('');
  };

  // Dar uma dica ao jogador
  const useHint = () => {
    // Encontrar uma palavra não encontrada
    const notFoundWords = words.filter(word => !word.found);
    
    if (notFoundWords.length === 0) {
      toast({
        title: "Sem Dicas",
        description: "Todas as palavras já foram encontradas!",
        variant: "destructive"
      });
      return;
    }
    
    // Selecionar uma palavra aleatória não encontrada
    const randomIndex = Math.floor(Math.random() * notFoundWords.length);
    const word = notFoundWords[randomIndex];
    
    // Destacar a primeira letra da palavra
    if (word.startRow !== undefined && word.startCol !== undefined) {
      const newGrid = [...grid];
      // Piscar a primeira letra da palavra
      newGrid[word.startRow][word.startCol].selected = true;
      setGrid(newGrid);
      
      // Remover o destaque após um tempo
      setTimeout(() => {
        const updatedGrid = [...grid];
        if (!updatedGrid[word.startRow!][word.startCol!].found) {
          updatedGrid[word.startRow!][word.startCol!].selected = false;
        }
        setGrid(updatedGrid);
      }, 2000);
      
      setHintsUsed(hintsUsed + 1);
      
      toast({
        title: "Dica Utilizada",
        description: `Procure uma palavra com ${word.word.length} letras começando com "${word.word[0]}"`,
      });
    }
  };

  // Formatar o tempo no formato mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Renderizar a grade
  const renderGrid = () => {
    if (grid.length === 0) return <p>Carregando...</p>;
    
    return (
      <div className="word-search-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="word-search-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`word-search-cell 
                  ${cell.selected && !cell.found ? 'bg-neon-blue/40 text-white' : ''} 
                  ${cell.found ? 'bg-neon-green/40 text-white' : ''}`}
                onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleCellMouseUp}
              >
                {cell.letter}
              </div>
            ))}
          </div>
        ))}
        
        <style>
          {`
          .word-search-grid {
            display: grid;
            grid-template-rows: repeat(${grid.length}, 1fr);
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            user-select: none;
          }
          .word-search-row {
            display: grid;
            grid-template-columns: repeat(${grid[0]?.length || 1}, 1fr);
          }
          .word-search-cell {
            aspect-ratio: 1/1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            border: 1px solid rgba(149, 97, 226, 0.3);
            cursor: pointer;
            transition: all 0.2s;
            font-weight: bold;
            background-color: rgba(65, 65, 122, 0.2);
          }
          `}
        </style>
      </div>
    );
  };

  // Renderizar a lista de palavras
  const renderWordList = () => {
    return (
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2">
        {words.map((word, index) => (
          <div 
            key={index}
            className={`py-1 px-3 rounded text-center ${
              word.found ? 'bg-neon-green/20 text-neon-green' : 'bg-space-accent/20'
            }`}
          >
            {word.word}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="text-gradient">CAÇA-PALAVRAS</span>
          </h2>
          <p className="text-gray-300 light:text-gray-700">
            Categoria: {category.charAt(0).toUpperCase() + category.slice(1)} | 
            Palavras: {words.filter(w => w.found).length}/{words.length}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-300 light:text-gray-700">Tempo</p>
          <p className="text-neon-blue text-xl font-bold">{formatTime(timer)}</p>
        </div>
      </div>

      {renderGrid()}
      {renderWordList()}

      <div className="flex gap-3 mt-6">
        <div className="flex gap-2">
          <NeonButton variant="secondary" onClick={useHint} disabled={gameOver} className="flex-1">
            Dica
          </NeonButton>
          <NeonButton onClick={newGame} className="flex-1">
            {gameOver ? "Novo Jogo" : "Reiniciar"}
          </NeonButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <NeonButton onClick={() => {setDifficulty('easy')}} variant={difficulty === 'easy' ? 'primary' : 'outline'} className="flex-1">
          Fácil
        </NeonButton>
        <NeonButton onClick={() => {setDifficulty('medium')}} variant={difficulty === 'medium' ? 'primary' : 'outline'} className="flex-1">
          Médio
        </NeonButton>
        <NeonButton onClick={() => {setDifficulty('hard')}} variant={difficulty === 'hard' ? 'primary' : 'outline'} className="flex-1">
          Difícil
        </NeonButton>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <NeonButton 
            key={cat} 
            variant={category === cat ? 'secondary' : 'outline'} 
            onClick={() => setCategory(cat)}
            className="flex-1"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </NeonButton>
        ))}
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
              <p className="text-neon-pink text-xl font-bold">
                {words.filter(w => w.found).length}/{words.length}
              </p>
              <p className="text-gray-300 light:text-gray-700">Palavras Encontradas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordSearchGame;
