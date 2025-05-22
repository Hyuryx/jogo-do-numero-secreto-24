
import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { addSecretNumberAttempts } from './SecretNumberGame';

interface GameStats {
  wins: number;
  losses: number;
  streakRecord: number;
  currentStreak: number;
}

const CATEGORIES = {
  Animais: ['GATO', 'CACHORRO', 'ELEFANTE', 'GIRAFA', 'LEAO', 'TIGRE', 'ZEBRA', 'MACACO', 'PANDA', 'COBRA', 'CAVALO', 'LEOPARDO'],
  Frutas: ['BANANA', 'MACA', 'LARANJA', 'UVA', 'MELANCIA', 'ABACAXI', 'MORANGO', 'PERA', 'MANGA', 'KIWI', 'LIMAO', 'COCO'],
  Países: ['BRASIL', 'ARGENTINA', 'PORTUGAL', 'ESPANHA', 'JAPAO', 'CHINA', 'RUSSIA', 'CANADA', 'INGLATERRA', 'AUSTRALIA', 'ITALIA'],
  Tecnologia: ['COMPUTADOR', 'CELULAR', 'INTERNET', 'TECLADO', 'MONITOR', 'MOUSE', 'SOFTWARE', 'HARDWARE', 'PROGRAMACAO', 'BLUETOOTH'],
  Esportes: ['FUTEBOL', 'BASQUETE', 'VOLEI', 'TENIS', 'NATACAO', 'ATLETISMO', 'BOXE', 'CICLISMO', 'SURF', 'GOLFE', 'CORRIDA'],
  Profissões: ['MEDICO', 'PROFESSOR', 'ENGENHEIRO', 'ADVOGADO', 'BOMBEIRO', 'POLICIAL', 'ARQUITETO', 'DENTISTA', 'PROGRAMADOR']
};

// Normaliza texto (remove acentos)
const normalizeText = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Monta o conteúdo do boneco da forca por etapas
const hangmanParts = [
  () => (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-60 w-40">
      <div className="absolute top-0 left-1/2 w-0.5 h-10 bg-neon-blue"></div>
    </div>
  ),
  () => (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-60 w-40">
      <div className="absolute top-0 left-1/2 w-0.5 h-10 bg-neon-blue"></div>
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-neon-blue"></div>
    </div>
  ),
  () => (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-60 w-40">
      <div className="absolute top-0 left-1/2 w-0.5 h-10 bg-neon-blue"></div>
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-neon-blue"></div>
      <div className="absolute top-[90px] left-1/2 w-0.5 h-16 bg-neon-blue"></div>
    </div>
  ),
  () => (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-60 w-40">
      <div className="absolute top-0 left-1/2 w-0.5 h-10 bg-neon-blue"></div>
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-neon-blue"></div>
      <div className="absolute top-[90px] left-1/2 w-0.5 h-16 bg-neon-blue"></div>
      <div className="absolute top-[100px] left-[calc(50%-20px)] w-0.5 h-10 bg-neon-blue transform rotate-45"></div>
    </div>
  ),
  () => (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-60 w-40">
      <div className="absolute top-0 left-1/2 w-0.5 h-10 bg-neon-blue"></div>
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-neon-blue"></div>
      <div className="absolute top-[90px] left-1/2 w-0.5 h-16 bg-neon-blue"></div>
      <div className="absolute top-[100px] left-[calc(50%-20px)] w-0.5 h-10 bg-neon-blue transform rotate-45"></div>
      <div className="absolute top-[100px] left-[calc(50%+20px)] w-0.5 h-10 bg-neon-blue transform -rotate-45"></div>
    </div>
  ),
  () => (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-60 w-40">
      <div className="absolute top-0 left-1/2 w-0.5 h-10 bg-neon-blue"></div>
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-neon-blue"></div>
      <div className="absolute top-[90px] left-1/2 w-0.5 h-16 bg-neon-blue"></div>
      <div className="absolute top-[100px] left-[calc(50%-20px)] w-0.5 h-10 bg-neon-blue transform rotate-45"></div>
      <div className="absolute top-[100px] left-[calc(50%+20px)] w-0.5 h-10 bg-neon-blue transform -rotate-45"></div>
      <div className="absolute top-[155px] left-[calc(50%-20px)] w-0.5 h-10 bg-neon-blue transform rotate-45"></div>
    </div>
  ),
  () => (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-60 w-40">
      <div className="absolute top-0 left-1/2 w-0.5 h-10 bg-neon-blue"></div>
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-neon-pink"></div>
      <div className="absolute top-[90px] left-1/2 w-0.5 h-16 bg-neon-blue"></div>
      <div className="absolute top-[100px] left-[calc(50%-20px)] w-0.5 h-10 bg-neon-blue transform rotate-45"></div>
      <div className="absolute top-[100px] left-[calc(50%+20px)] w-0.5 h-10 bg-neon-blue transform -rotate-45"></div>
      <div className="absolute top-[155px] left-[calc(50%-20px)] w-0.5 h-10 bg-neon-blue transform rotate-45"></div>
      <div className="absolute top-[155px] left-[calc(50%+20px)] w-0.5 h-10 bg-neon-blue transform -rotate-45"></div>
      
      {/* X nos olhos quando perde */}
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full">
        <div className="absolute top-[3px] left-[3px] w-4 h-4">
          <div className="absolute w-[2px] h-4 bg-neon-pink transform rotate-45 left-1/2 -translate-x-1/2"></div>
          <div className="absolute w-[2px] h-4 bg-neon-pink transform -rotate-45 left-1/2 -translate-x-1/2"></div>
        </div>
        <div className="absolute top-[3px] right-[3px] w-4 h-4">
          <div className="absolute w-[2px] h-4 bg-neon-pink transform rotate-45 left-1/2 -translate-x-1/2"></div>
          <div className="absolute w-[2px] h-4 bg-neon-pink transform -rotate-45 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  ),
];

const HangmanGame = () => {
  const { toast } = useToast();
  const [categories] = useState(Object.keys(CATEGORIES));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [stats, setStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    streakRecord: 0,
    currentStreak: 0
  });

  // Carregar estatísticas
  useEffect(() => {
    const savedStats = localStorage.getItem('hangmanStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Salvar estatísticas
  const saveStats = useCallback((newStats: GameStats) => {
    setStats(newStats);
    localStorage.setItem('hangmanStats', JSON.stringify(newStats));
  }, []);

  // Escolhe uma palavra aleatória da categoria selecionada
  const selectRandomWord = useCallback((category: string) => {
    const words = CATEGORIES[category as keyof typeof CATEGORIES];
    const randomIndex = Math.floor(Math.random() * words.length);
    
    // A palavra é armazenada já normalizada (sem acentos) e em maiúsculas
    return normalizeText(words[randomIndex].toUpperCase());
  }, []);

  // Inicia um novo jogo
  const startNewGame = useCallback((category: string) => {
    const newWord = selectRandomWord(category);
    setWord(newWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus("playing");
    setSelectedCategory(category);
  }, [selectRandomWord]);

  // Verifica o estado do jogo quando as letras adivinhadas mudam
  useEffect(() => {
    if (word && gameStatus === "playing") {
      // Verificar vitória
      const allLettersGuessed = word.split('').every(letter => guessedLetters.includes(letter));
      
      if (allLettersGuessed) {
        setGameStatus("won");
        
        // Atualizar estatísticas
        const newStats = {
          ...stats,
          wins: stats.wins + 1,
          currentStreak: stats.currentStreak + 1,
          streakRecord: Math.max(stats.streakRecord, stats.currentStreak + 1)
        };
        
        saveStats(newStats);
        
        // Recompensa baseada em streak
        let attempts;
        if (newStats.currentStreak >= 5) {
          attempts = 3; // Sequência longa = 3 tentativas
        } else if (newStats.currentStreak >= 3) {
          attempts = 2; // Sequência média = 2 tentativas
        } else {
          attempts = 1; // Sequência curta = 1 tentativa
        }
        
        const newAttempts = addSecretNumberAttempts(attempts);
        toast({
          title: "Vitória!",
          description: `Você ganhou ${attempts} tentativa${attempts > 1 ? 's' : ''} para o Jogo do Número Secreto!`,
        });
      }
      
      // Verificar derrota
      if (wrongGuesses >= 6) {
        setGameStatus("lost");
        
        // Atualizar estatísticas
        const newStats = {
          ...stats,
          losses: stats.losses + 1,
          currentStreak: 0
        };
        
        saveStats(newStats);
        
        toast({
          title: "Você perdeu!",
          description: `A palavra era: ${word}`,
          variant: "destructive",
        });
      }
    }
  }, [guessedLetters, word, wrongGuesses, gameStatus, stats, saveStats, toast]);

  // Lidar com digitação do teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== "playing") return;
      
      const key = e.key.toUpperCase();
      
      // Verificar se é uma letra
      if (/^[A-Z]$/.test(key) && !guessedLetters.includes(key)) {
        handleGuess(key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, guessedLetters]);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || gameStatus !== "playing") return;
    
    // Adicionar a letra às letras adivinhadas
    setGuessedLetters(prev => [...prev, letter]);
    
    // Verificar se a letra está na palavra
    if (!word.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  };

  // Renderiza as letras da palavra, mostrando apenas as adivinhadas
  const renderWord = () => {
    return word.split('').map((letter, index) => (
      <span 
        key={index} 
        className="inline-block mx-1 text-center w-8 pb-1 border-b-2 border-neon-purple"
      >
        <span className={`text-2xl font-bold ${guessedLetters.includes(letter) ? 'text-neon-blue' : 'invisible'}`}>
          {letter}
        </span>
      </span>
    ));
  };

  // Renderiza o teclado virtual
  const renderKeyboard = () => {
    const keyboardRows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    
    return keyboardRows.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center gap-1 mb-1">
        {row.map((letter) => {
          const normalizedLetter = normalizeText(letter);
          const isGuessed = guessedLetters.includes(normalizedLetter);
          const isCorrect = word.includes(normalizedLetter);
          
          return (
            <button
              key={letter}
              onClick={() => handleGuess(normalizedLetter)}
              disabled={isGuessed || gameStatus !== "playing"}
              className={`w-8 h-10 flex items-center justify-center rounded text-sm font-medium transition-colors 
                ${isGuessed 
                  ? isCorrect 
                    ? 'bg-neon-blue/30 text-neon-blue border border-neon-blue' 
                    : 'bg-neon-pink/20 text-neon-pink/50 border border-neon-pink/30'
                  : 'bg-space-light/20 hover:bg-space-light/40 text-white border border-neon-purple/30'}`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    ));
  };

  // Seleção de categoria
  if (!selectedCategory) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">JOGO DA FORCA</span>
          </h2>
          <p className="text-gray-300 light:text-gray-700 mb-6">
            Escolha uma categoria para começar:
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => startNewGame(category)}
                className="p-3 bg-space-light/20 hover:bg-space-light/30 rounded-lg border border-neon-purple/30 transition-colors"
              >
                <span className="text-white font-medium">{category}</span>
              </button>
            ))}
          </div>
        </div>
        
        <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
          <CardHeader>
            <CardTitle className="text-xl text-neon-blue">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-neon-blue text-xl font-bold">{stats.wins}</p>
                <p className="text-gray-300 light:text-gray-700">Vitórias</p>
              </div>
              <div>
                <p className="text-neon-pink text-xl font-bold">{stats.losses}</p>
                <p className="text-gray-300 light:text-gray-700">Derrotas</p>
              </div>
              <div>
                <p className="text-neon-purple text-xl font-bold">{stats.currentStreak}</p>
                <p className="text-gray-300 light:text-gray-700">Sequência Atual</p>
              </div>
              <div>
                <p className="text-neon-purple text-xl font-bold">{stats.streakRecord}</p>
                <p className="text-gray-300 light:text-gray-700">Melhor Sequência</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          <span className="text-gradient">JOGO DA FORCA</span>
        </h2>
        <div>
          <p className="text-neon-purple text-sm text-right">Categoria: {selectedCategory}</p>
          <p className="text-gray-300 light:text-gray-700 text-sm">
            {6 - wrongGuesses} tentativa{wrongGuesses !== 5 ? 's' : ''} restante{wrongGuesses !== 5 ? 's' : ''}
          </p>
        </div>
      </div>
      
      <div className="relative h-60 w-full border border-neon-purple/30 rounded-lg mb-6 flex items-center justify-center">
        {/* Base da forca */}
        <div className="absolute bottom-4 w-40 h-1 bg-neon-purple/60"></div>
        <div className="absolute bottom-4 left-[calc(50%-20px)] w-1 h-60 bg-neon-purple/60"></div>
        <div className="absolute top-4 left-[calc(50%-20px)] w-40 h-1 bg-neon-purple/60"></div>
        
        {/* Desenha o boneco baseado no número de erros */}
        {wrongGuesses > 0 && hangmanParts[wrongGuesses - 1]()}
        
        {/* Mensagem de vitória ou derrota */}
        {gameStatus === "won" && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-lg">
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-neon-blue mb-2">VITÓRIA!</p>
              <p className="text-white">Sequência: {stats.currentStreak}</p>
            </div>
          </div>
        )}
        
        {gameStatus === "lost" && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded-lg">
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-neon-pink mb-2">PERDEU!</p>
              <p className="text-white">A palavra era: {word}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-8 text-center">
        <div className="mb-6 min-h-[50px]">
          {renderWord()}
        </div>
        
        <div className="mt-6">
          {gameStatus === "playing" ? (
            renderKeyboard()
          ) : (
            <NeonButton onClick={() => startNewGame(selectedCategory)} className="w-full">
              Jogar Novamente
            </NeonButton>
          )}
        </div>
      </div>
      
      {gameStatus !== "playing" && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {categories.filter(cat => cat !== selectedCategory).map(category => (
            <button
              key={category}
              onClick={() => startNewGame(category)}
              className="p-3 bg-space-light/10 hover:bg-space-light/30 rounded-lg border border-neon-purple/30"
            >
              <span className="text-gray-300 font-medium">{category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HangmanGame;
