
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface GameState {
  secretNumber: number;
  attempts: number;
  guessHistory: {guess: number, result: string}[];
  gameOver: boolean;
  maxNumber: number;
  credits: number;
  showCelebration: boolean;
}

const SecretNumberGame = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    secretNumber: Math.floor(Math.random() * 100) + 1,
    attempts: 0,
    guessHistory: [],
    gameOver: false,
    maxNumber: 100,
    credits: 5,
    showCelebration: false
  });
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Adivinhe o número entre 1 e 100');
  const [highScores, setHighScores] = useState<{name: string, attempts: number}[]>([
    { name: 'AI-X9', attempts: 4 },
    { name: 'CyberNeon', attempts: 5 },
    { name: 'Astro42', attempts: 6 },
    { name: 'StarDust', attempts: 7 },
    { name: 'GalacticX', attempts: 8 }
  ]);

  // Load high scores from localStorage on component mount
  useEffect(() => {
    const savedScores = localStorage.getItem('secretNumberHighScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  const handleGuess = () => {
    const guess = parseInt(currentGuess);
    if (isNaN(guess) || guess < 1 || guess > gameState.maxNumber) {
      toast({
        title: "Número Inválido",
        description: `Digite um número entre 1 e ${gameState.maxNumber}`,
        variant: "destructive"
      });
      return;
    }

    const newAttempts = gameState.attempts + 1;
    let result = '';
    let newGameOver = false;
    let showCelebration = false;
    
    if (guess === gameState.secretNumber) {
      result = 'Acertou! 🎉';
      newGameOver = true;
      showCelebration = true;
      saveScore(newAttempts);
      toast({
        title: "Parabéns!",
        description: `Você acertou em ${newAttempts} tentativas!`,
        variant: "default"
      });
    } else if (guess < gameState.secretNumber) {
      result = 'Maior ⬆️';
      setMessage(`Tente um número MAIOR que ${guess}`);
    } else {
      result = 'Menor ⬇️';
      setMessage(`Tente um número MENOR que ${guess}`);
    }

    setGameState(prev => ({
      ...prev,
      attempts: newAttempts,
      guessHistory: [...prev.guessHistory, {guess, result}],
      gameOver: newGameOver,
      showCelebration
    }));
    
    setCurrentGuess('');
  };

  const resetGame = () => {
    setGameState({
      secretNumber: Math.floor(Math.random() * 100) + 1,
      attempts: 0,
      guessHistory: [],
      gameOver: false,
      maxNumber: 100,
      credits: gameState.credits,
      showCelebration: false
    });
    setMessage('Adivinhe o número entre 1 e 100');
    setCurrentGuess('');
    toast({
      title: "Novo Jogo",
      description: "Um novo número secreto foi gerado!",
    });
  };

  const saveScore = (attempts: number) => {
    // Check if score qualifies for high scores
    const newHighScores = [...highScores];
    
    // Insert player score if it's better than existing scores
    const playerName = localStorage.getItem('playerName') || 'Jogador';
    const playerScore = {name: playerName, attempts};
    
    newHighScores.push(playerScore);
    newHighScores.sort((a, b) => a.attempts - b.attempts);
    
    if (newHighScores.length > 5) {
      newHighScores.pop(); // Keep only top 5
    }
    
    setHighScores(newHighScores);
    localStorage.setItem('secretNumberHighScores', JSON.stringify(newHighScores));
  };

  const buyCredits = () => {
    setGameState(prev => ({
      ...prev,
      credits: prev.credits + 3
    }));
    
    toast({
      title: "Créditos Adicionados",
      description: "Você ganhou 3 créditos!",
    });
  };

  const useHint = () => {
    if (gameState.credits <= 0) {
      toast({
        title: "Sem Créditos",
        description: "Você não tem créditos suficientes para uma dica!",
        variant: "destructive"
      });
      return;
    }

    const secretNum = gameState.secretNumber;
    const range = Math.floor(gameState.maxNumber * 0.2); // 20% range
    const lowerBound = Math.max(1, secretNum - range);
    const upperBound = Math.min(gameState.maxNumber, secretNum + range);

    setGameState(prev => ({
      ...prev,
      credits: prev.credits - 1
    }));

    setMessage(`Dica: O número está entre ${lowerBound} e ${upperBound}`);
    
    toast({
      title: "Dica Usada",
      description: `Créditos restantes: ${gameState.credits - 1}`,
    });
  };

  return (
    <div className="space-card p-6 md:p-8 backdrop-blur-lg relative">
      {gameState.showCelebration && (
        <div className="celebration">
          <div className="firework"></div>
          <div className="celebration-text">
            PARABÉNS!<br/>
            Você acertou em {gameState.attempts} tentativas!
          </div>
        </div>
      )}
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-gradient">JOGO DO NÚMERO SECRETO</span>
            </h2>
            <p className="text-gray-300 light:text-gray-700">{message}</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <Input
                type="number"
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value)}
                placeholder="Digite um número..."
                className="bg-space-accent/50 dark:bg-space-accent/50 light:bg-white/80 text-white light:text-space-dark border-neon-blue/30"
                disabled={gameState.gameOver}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !gameState.gameOver) {
                    handleGuess();
                  }
                }}
              />
              <NeonButton onClick={handleGuess} disabled={gameState.gameOver}>
                Adivinhar
              </NeonButton>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 light:text-gray-600">Tentativas: 
                  <span className="text-neon-blue font-bold"> {gameState.attempts}</span>
                </p>
              </div>
              <div>
                <p className="text-gray-400 light:text-gray-600">Créditos: 
                  <span className="text-neon-purple font-bold"> {gameState.credits}</span>
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <NeonButton variant="secondary" onClick={useHint} disabled={gameState.gameOver || gameState.credits <= 0}>
                Usar Dica (1 crédito)
              </NeonButton>
              <NeonButton variant="outline" onClick={buyCredits}>
                Comprar Créditos
              </NeonButton>
            </div>
            
            {gameState.gameOver && (
              <div className="mt-6">
                <NeonButton onClick={resetGame} className="w-full">
                  Jogar Novamente
                </NeonButton>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20">
            <CardHeader>
              <CardTitle className="text-xl text-neon-blue">Histórico de Tentativas</CardTitle>
            </CardHeader>
            <CardContent>
              {gameState.guessHistory.length === 0 ? (
                <p className="text-gray-400 light:text-gray-600 text-center">Nenhuma tentativa ainda</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {gameState.guessHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-neon-blue/10 pb-2">
                      <span className="text-white light:text-space-dark">#{index + 1}: {item.guess}</span>
                      <span className={item.result === 'Acertou! 🎉' ? 'text-neon-blue' : 'text-gray-300 light:text-gray-700'}>
                        {item.result}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20">
            <CardHeader>
              <CardTitle className="text-xl text-neon-purple">Ranking de Jogadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {highScores.map((score, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={index === 0 ? "text-neon-blue" : "text-gray-300 light:text-gray-700"}>
                        #{index + 1}
                      </span>
                      <span className="text-white light:text-space-dark">{score.name}</span>
                    </div>
                    <span className="font-bold text-white light:text-space-dark">{score.attempts} tentativas</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecretNumberGame;
