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
  hintsUsed: number;
  lastHintRange: {min: number, max: number};
  attemptLimit: number;
}

// Contexto global para compartilhar tentativas entre jogos
export const addSecretNumberAttempts = (amount: number) => {
  const currentGameState = JSON.parse(localStorage.getItem('secretNumberGameState') || '{}');
  
  if (currentGameState.attemptLimit) {
    const newAttemptLimit = Math.min(currentGameState.attemptLimit + amount, 50); // Limite máximo de 50 tentativas
    currentGameState.attemptLimit = newAttemptLimit;
    localStorage.setItem('secretNumberGameState', JSON.stringify(currentGameState));
    
    return newAttemptLimit;
  }
  
  return 0;
};

const SecretNumberGame = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    secretNumber: Math.floor(Math.random() * 2000) + 1, // Aumentado para 2000
    attempts: 0,
    guessHistory: [],
    gameOver: false,
    maxNumber: 2000, // Aumentado para 2000
    credits: 5,
    showCelebration: false,
    hintsUsed: 0,
    lastHintRange: {min: 1, max: 2000}, // Aumentado para 2000
    attemptLimit: 20 // Limite inicial de tentativas
  });
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Adivinhe o número entre 1 e 2000'); // Atualizado a mensagem
  const [highScores, setHighScores] = useState<{name: string, attempts: number}[]>([
    { name: 'AI-X9', attempts: 6 },
    { name: 'CyberNeon', attempts: 7 },
    { name: 'Astro42', attempts: 9 },
    { name: 'StarDust', attempts: 11 },
    { name: 'GalacticX', attempts: 12 }
  ]);

  // Frases de encorajamento para as dicas
  const hintMessages = [
    "Você está no caminho certo! Continue tentando!",
    "Muito bom! Estamos reduzindo as possibilidades!",
    "Impressionante! Você está cada vez mais perto!",
    "Quase lá! Mais algumas dicas e você acerta!",
    "Uau! Você está quase adivinhando o número!",
    "Excelente! O número está bem próximo agora!",
    "Incrível! Falta pouco para descobrir o segredo!",
    "Sensacional! Continue assim e logo vai acertar!",
    "Fantástico! A resposta está ao seu alcance!",
    "Espetacular! Você está a um passo da vitória!"
  ];

  // Load high scores and game state from localStorage on component mount
  useEffect(() => {
    const savedScores = localStorage.getItem('secretNumberHighScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
    
    // Carrega o estado do jogo, incluindo o limite de tentativas
    const savedGameState = localStorage.getItem('secretNumberGameState');
    if (savedGameState) {
      const parsedState = JSON.parse(savedGameState);
      setGameState(prevState => ({
        ...prevState,
        credits: parsedState.credits || prevState.credits,
        attemptLimit: parsedState.attemptLimit || 20
      }));
    }
  }, []);
  
  // Salvar estado do jogo no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('secretNumberGameState', JSON.stringify({
      credits: gameState.credits,
      attemptLimit: gameState.attemptLimit
    }));
  }, [gameState.credits, gameState.attemptLimit]);

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
    
    // Verifica se ainda tem tentativas
    if (gameState.attempts >= gameState.attemptLimit) {
      toast({
        title: "Sem Tentativas",
        description: "Suas tentativas acabaram! Ganhe mais jogando outros jogos ou comprando créditos.",
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
    
    // Mostrar tentativas restantes
    if (!newGameOver) {
      const remaining = gameState.attemptLimit - newAttempts;
      toast({
        title: "Tentativas restantes",
        description: `Você ainda tem ${remaining} tentativa${remaining !== 1 ? 's' : ''}.`,
      });
    }
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      secretNumber: Math.floor(Math.random() * 2000) + 1, // Aumentado para 2000
      attempts: 0,
      guessHistory: [],
      gameOver: false,
      showCelebration: false,
      hintsUsed: 0,
      lastHintRange: {min: 1, max: 2000} // Aumentado para 2000
    }));
    setMessage('Adivinhe o número entre 1 e 2000'); // Atualizado a mensagem
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
      credits: prev.credits + 3,
      attemptLimit: prev.attemptLimit + 5 // Adicionar 5 tentativas ao comprar créditos
    }));
    
    toast({
      title: "Tentativas Adicionadas",
      description: "Você ganhou +5 tentativas e +3 créditos!",
    });
  };

  // Modificar a função useHint para tornar as dicas mais difíceis
  const useHint = () => {
    if (gameState.credits <= 0) {
      toast({
        title: "Sem Créditos",
        description: "Você não tem créditos suficientes para uma dica!",
        variant: "destructive"
      });
      return;
    }

    // Verifica se ainda tem tentativas
    if (gameState.attempts >= gameState.attemptLimit) {
      toast({
        title: "Sem Tentativas",
        description: "Suas tentativas acabaram! Ganhe mais jogando outros jogos ou comprando créditos.",
        variant: "destructive"
      });
      return;
    }

    // Calcula uma nova faixa menor baseada na quantidade de dicas já usadas
    const secretNum = gameState.secretNumber;
    const newHintsUsed = gameState.hintsUsed + 1;
    
    // Reduzir a eficácia das dicas para o jogo ser mais difícil
    // Com o intervalo maior, as dicas reduzem menos o espaço de busca
    const shrinkFactor = Math.min(0.8, 0.3 + (newHintsUsed * 0.03)); 
    
    // Use a última faixa de dicas como base para calcular a nova
    const lastMin = gameState.lastHintRange.min;
    const lastMax = gameState.lastHintRange.max;
    
    // Calcula nova faixa, cada vez mais próxima do número secreto, mas menos eficaz
    let newMin = secretNum < lastMin 
      ? secretNum 
      : Math.floor(lastMin + (secretNum - lastMin) * (1 - shrinkFactor));
    
    let newMax = secretNum > lastMax 
      ? secretNum 
      : Math.ceil(secretNum + (lastMax - secretNum) * shrinkFactor);
    
    // Garantir que o intervalo não fica muito pequeno nos estágios iniciais
    // Para um intervalo de 1-2000, manter intervalos maiores
    const minRange = Math.max(100, 2000 / Math.pow(2, newHintsUsed));
    
    if (newMax - newMin < minRange && newHintsUsed < 10) {
      if (secretNum - newMin < newMax - secretNum) {
        newMax = Math.min(newMin + minRange, gameState.maxNumber);
      } else {
        newMin = Math.max(1, newMax - minRange);
      }
    }
    
    // Só depois de muitas dicas (10+) começamos a reduzir significativamente
    if (newHintsUsed >= 10 && newHintsUsed < 15) {
      const narrowRange = 50;
      if (newMax - newMin > narrowRange) {
        newMin = Math.max(1, secretNum - narrowRange/2);
        newMax = Math.min(gameState.maxNumber, secretNum + narrowRange/2);
      }
    }
    
    // Nas últimas dicas (15+), reduz para um intervalo muito pequeno
    if (newHintsUsed >= 15) {
      const veryNarrowRange = 10;
      newMin = Math.max(1, secretNum - veryNarrowRange/2);
      newMax = Math.min(gameState.maxNumber, secretNum + veryNarrowRange/2);
    }
    
    // Seleciona uma mensagem de dica aleatória
    const randomIndex = Math.floor(Math.random() * hintMessages.length);
    const hintMessage = hintMessages[randomIndex];
    
    // Usar uma dica também consome uma tentativa
    const newAttempts = gameState.attempts + 1;
    
    setGameState(prev => ({
      ...prev,
      credits: prev.credits - 1,
      attempts: newAttempts,
      hintsUsed: newHintsUsed,
      lastHintRange: {min: newMin, max: newMax}
    }));

    // Atualiza a mensagem com a nova dica e o encorajamento
    setMessage(`Dica: O número está entre ${newMin} e ${newMax}. ${hintMessage}`);
    
    // Mostrar tentativas restantes após usar a dica
    const remaining = gameState.attemptLimit - newAttempts;
    
    toast({
      title: "Dica Usada",
      description: `Créditos restantes: ${gameState.credits - 1}. Você ainda tem ${remaining} tentativa${remaining !== 1 ? 's' : ''}.`,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !gameState.gameOver) {
      handleGuess();
    }
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
              disabled={gameState.gameOver || gameState.attempts >= gameState.attemptLimit}
              onKeyDown={handleKeyDown}
            />
            <NeonButton 
              onClick={handleGuess} 
              disabled={gameState.gameOver || gameState.attempts >= gameState.attemptLimit}
            >
              Adivinhar
            </NeonButton>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 light:text-gray-600">Tentativas: 
                <span className="text-neon-blue font-bold"> {gameState.attempts}/{gameState.attemptLimit}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-400 light:text-gray-600">Créditos: 
                <span className="text-neon-purple font-bold"> {gameState.credits}</span>
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <NeonButton 
              variant="secondary" 
              onClick={useHint} 
              disabled={gameState.gameOver || gameState.credits <= 0 || gameState.attempts >= gameState.attemptLimit}
            >
              Usar Dica (1 crédito)
            </NeonButton>
            <NeonButton variant="outline" onClick={buyCredits}>
              Comprar Tentativas (+5)
            </NeonButton>
          </div>
          
          {(gameState.gameOver || gameState.attempts >= gameState.attemptLimit) && (
            <div className="mt-6">
              <NeonButton onClick={resetGame} className="w-full">
                Jogar Novamente
              </NeonButton>
            </div>
          )}
        </div>
      
        <div className="mt-6 space-y-6">
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
