
import React from 'react';

interface HangmanFigureProps {
  wrongGuesses: number;
  gameStatus: "playing" | "won" | "lost";
}

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

const HangmanFigure: React.FC<HangmanFigureProps> = ({ wrongGuesses, gameStatus }) => {
  return (
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
            <p className="text-white">Sequência: {/* This will be filled by the parent component */}</p>
          </div>
        </div>
      )}
      
      {gameStatus === "lost" && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded-lg">
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-neon-pink mb-2">PERDEU!</p>
            <p className="text-white">A palavra era: {/* This will be filled by the parent component */}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HangmanFigure;
