
import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addSecretNumberAttempts } from '../SecretNumberGame';
import { GameStats, Category, CATEGORIES } from './types';
import { normalizeText, selectRandomWord } from './utils';
import HangmanFigure from './HangmanFigure';
import Word from './Word';
import Keyboard from './Keyboard';
import StatsCard from './StatsCard';
import CategorySelector from './CategorySelector';
import GameOver from './GameOver';

const HangmanGame: React.FC = () => {
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

  // Inicia um novo jogo
  const startNewGame = useCallback((category: string) => {
    const newWord = selectRandomWord(category);
    setWord(newWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus("playing");
    setSelectedCategory(category);
  }, []);

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

  // Seleção de categoria
  if (!selectedCategory) {
    return (
      <div className="space-y-6">
        <CategorySelector 
          categories={categories} 
          onSelectCategory={startNewGame} 
        />
        <StatsCard stats={stats} />
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
      
      <HangmanFigure 
        wrongGuesses={wrongGuesses}
        gameStatus={gameStatus} 
      />
      
      <div className="mb-8 text-center">
        <div className="mb-6 min-h-[50px]">
          <Word word={word} guessedLetters={guessedLetters} />
        </div>
        
        <div className="mt-6">
          {gameStatus === "playing" ? (
            <Keyboard 
              word={word}
              guessedLetters={guessedLetters}
              gameStatus={gameStatus}
              onGuess={handleGuess}
            />
          ) : (
            <GameOver 
              gameStatus={gameStatus}
              selectedCategory={selectedCategory}
              categories={categories}
              onPlayAgain={startNewGame}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HangmanGame;
