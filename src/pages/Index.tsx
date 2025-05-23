import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SecretNumberGame from '@/components/SecretNumberGame';
import PlayerNameModal from '@/components/PlayerNameModal';
import HowToPlay from '@/components/HowToPlay';
import { Element } from 'react-scroll';
import TicTacToeGame from '@/components/TicTacToeGame';
import QuizGame from '@/components/QuizGame';
import HangmanGame from '@/components/HangmanGame';
import MemoryGame from '@/components/MemoryGame';
import QuizShowGame from '@/components/QuizShowGame';
import SudokuGame from '@/components/SudokuGame';
import WordSearchGame from '@/components/WordSearchGame';
import { ArrowRight } from 'lucide-react';
import NeonButton from '@/components/NeonButton';

type GameType = 'secretNumber' | 'ticTacToe' | 'quiz' | 'hangman' | 'memory' | 'quizShow' | 'sudoku' | 'wordSearch';

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<GameType>('secretNumber');

  // Carregar o jogo selecionado do localStorage ao montar o componente
  useEffect(() => {
    const savedGame = localStorage.getItem('selectedGame') as GameType;
    if (savedGame) {
      setSelectedGame(savedGame);
    }
  }, []);

  // Salvar o jogo selecionado no localStorage e disparar um evento personalizado
  useEffect(() => {
    localStorage.setItem('selectedGame', selectedGame);
    
    // Criar e disparar evento personalizado para notificar outros componentes
    const event = new CustomEvent('gameChanged', { 
      detail: { game: selectedGame }
    });
    window.dispatchEvent(event);
  }, [selectedGame]);

  const renderSelectedGame = () => {
    switch (selectedGame) {
      case 'secretNumber':
        return <SecretNumberGame />;
      case 'ticTacToe':
        return <TicTacToeGame />;
      case 'quiz':
        return <QuizGame />;
      case 'hangman':
        return <HangmanGame />;
      case 'memory':
        return <MemoryGame />;
      case 'quizShow':
        return <QuizShowGame />;
      case 'sudoku':
        return <SudokuGame />;
      case 'wordSearch':
        return <WordSearchGame />;
      default:
        return <SecretNumberGame />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PlayerNameModal />
      <main>
        <Hero />
        <Element name="game-section">
          <section className="py-16 relative overflow-hidden" id="howToPlay">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/3 -left-20 w-72 h-72 bg-neon-purple/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-neon-blue/10 rounded-full blur-[120px]"></div>
            </div>
            
            <div className="container mx-auto px-4">
              <div className="space-card p-6 md:p-8 backdrop-blur-lg relative">
                <div className="mb-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <h2 className="text-3xl font-bold">
                      <span className="text-gradient">ESCOLHA SEU JOGO</span>
                    </h2>
                    
                    <Link to="/games">
                      <NeonButton variant="outline" className="flex items-center gap-2">
                        Ver todos os jogos <ArrowRight className="w-4 h-4" />
                      </NeonButton>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button 
                      onClick={() => setSelectedGame('secretNumber')} 
                      className={`p-3 rounded-lg border ${selectedGame === 'secretNumber' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                    >
                      <span className="text-white font-medium">Número Secreto</span>
                    </button>
                    <button 
                      onClick={() => setSelectedGame('ticTacToe')} 
                      className={`p-3 rounded-lg border ${selectedGame === 'ticTacToe' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                    >
                      <span className="text-white font-medium">Jogo da Velha</span>
                    </button>
                    <button 
                      onClick={() => setSelectedGame('quiz')} 
                      className={`p-3 rounded-lg border ${selectedGame === 'quiz' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                    >
                      <span className="text-white font-medium">Quiz</span>
                    </button>
                    <button 
                      onClick={() => setSelectedGame('hangman')} 
                      className={`p-3 rounded-lg border ${selectedGame === 'hangman' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                    >
                      <span className="text-white font-medium">Jogo da Forca</span>
                    </button>
                    <button 
                      onClick={() => setSelectedGame('memory')} 
                      className={`p-3 rounded-lg border ${selectedGame === 'memory' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                    >
                      <span className="text-white font-medium">Jogo da Memória</span>
                    </button>
                    <button 
                      onClick={() => setSelectedGame('quizShow')} 
                      className={`p-3 rounded-lg border ${selectedGame === 'quizShow' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                    >
                      <span className="text-white font-medium">Quiz Show</span>
                    </button>
                    <button 
                      onClick={() => setSelectedGame('sudoku')} 
                      className={`p-3 rounded-lg border ${selectedGame === 'sudoku' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                    >
                      <span className="text-white font-medium">Sudoku</span>
                    </button>
                    <button 
                      onClick={() => setSelectedGame('wordSearch')} 
                      className={`p-3 rounded-lg border ${selectedGame === 'wordSearch' ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30 hover:bg-space-light/10'}`}
                    >
                      <span className="text-white font-medium">Caça-Palavras</span>
                    </button>
                  </div>
                </div>
                {renderSelectedGame()}
              </div>
            </div>
          </section>
        </Element>
        <HowToPlay />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
