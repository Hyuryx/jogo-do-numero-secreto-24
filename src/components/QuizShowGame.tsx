import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { addSecretNumberAttempts } from './SecretNumberGame';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'fácil' | 'médio' | 'difícil';
  category: string;
}

const questions: Question[] = [
  // Perguntas Fáceis
  {
    question: "Qual é o nome do mascote do Brasil na Copa do Mundo de 2014?",
    options: ["Canarinho", "Fuleco", "Zakumi", "Zé Gotinha"],
    correctAnswer: 1,
    difficulty: 'fácil',
    category: "Esportes"
  },
  {
    question: "Qual é a capital da Austrália?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: 2,
    difficulty: 'fácil',
    category: "Geografia"
  },
  {
    question: "Qual é o maior planeta do Sistema Solar?",
    options: ["Terra", "Saturno", "Júpiter", "Netuno"],
    correctAnswer: 2,
    difficulty: 'fácil',
    category: "Astronomia"
  },
  {
    question: "Quem pintou a Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: 1,
    difficulty: 'fácil',
    category: "Arte"
  },
  {
    question: "Qual é o animal mais rápido do mundo?",
    options: ["Leopardo", "Águia", "Guepardo", "Tubarão"],
    correctAnswer: 2,
    difficulty: 'fácil',
    category: "Biologia"
  },
  
  // Perguntas Médias
  {
    question: "Qual é o segundo elemento mais abundante no universo?",
    options: ["Hidrogênio", "Hélio", "Oxigênio", "Carbono"],
    correctAnswer: 1,
    difficulty: 'médio',
    category: "Ciência"
  },
  {
    question: "Qual é a montanha mais alta do Brasil?",
    options: ["Pico da Neblina", "Pico da Bandeira", "Monte Roraima", "Pedra da Mina"],
    correctAnswer: 0,
    difficulty: 'médio',
    category: "Geografia"
  },
  {
    question: "Em que ano foi fundada a Microsoft?",
    options: ["1975", "1980", "1985", "1990"],
    correctAnswer: 0,
    difficulty: 'médio',
    category: "Tecnologia"
  },
  {
    question: "Qual o único país que participou de todas as edições da Copa do Mundo de Futebol?",
    options: ["Alemanha", "Itália", "Argentina", "Brasil"],
    correctAnswer: 3,
    difficulty: 'médio',
    category: "Esportes"
  },
  {
    question: "Quem escreveu 'Dom Quixote'?",
    options: ["Miguel de Cervantes", "Gabriel García Márquez", "Jorge Luis Borges", "Carlos Ruiz Zafón"],
    correctAnswer: 0,
    difficulty: 'médio',
    category: "Literatura"
  },
  
  // Perguntas Difíceis
  {
    question: "Qual é o teorema que diz que não existe um conjunto de números reais que corresponda exatamente aos números racionais?",
    options: ["Teorema de Pitágoras", "Teorema de Cantor", "Teorema de Fermat", "Teorema de Gödel"],
    correctAnswer: 1,
    difficulty: 'difícil',
    category: "Matemática"
  },
  {
    question: "Quem foi o primeiro cientista a propor a existência dos buracos negros, com base na Teoria da Relatividade Geral?",
    options: ["Albert Einstein", "Stephen Hawking", "Karl Schwarzschild", "Roger Penrose"],
    correctAnswer: 2,
    difficulty: 'difícil',
    category: "Física"
  },
  {
    question: "Qual dessas obras NÃO foi escrita por William Shakespeare?",
    options: ["Otelo", "Rei Lear", "Doutor Fausto", "Macbeth"],
    correctAnswer: 2,
    difficulty: 'difícil',
    category: "Literatura"
  },
  {
    question: "Em que ano ocorreu a Revolução Francesa?",
    options: ["1776", "1789", "1799", "1804"],
    correctAnswer: 1,
    difficulty: 'difícil',
    category: "História"
  },
  {
    question: "Qual desses compostos químicos não contém carbono?",
    options: ["Etanol", "Metano", "Dióxido de Carbono", "Hidróxido de Sódio"],
    correctAnswer: 3,
    difficulty: 'difícil',
    category: "Química"
  },
  
  // A pergunta do milhão (extra difícil)
  {
    question: "Qual é o único número primo que é também um número de Fibonacci?",
    options: ["3", "5", "13", "89"],
    correctAnswer: 3, // 89 é o único número que é tanto primo quanto Fibonacci (além do 2, 3, 5, 13)
    difficulty: 'difícil',
    category: "Matemática"
  },
];

interface PrizeLevel {
  value: string;
  milestone: boolean;
}

const prizeLevels: PrizeLevel[] = [
  { value: "R$ 1.000.000,00", milestone: true },
  { value: "R$ 500.000,00", milestone: false },
  { value: "R$ 250.000,00", milestone: false },
  { value: "R$ 100.000,00", milestone: true },
  { value: "R$ 50.000,00", milestone: false },
  { value: "R$ 25.000,00", milestone: false },
  { value: "R$ 10.000,00", milestone: true },
  { value: "R$ 5.000,00", milestone: false },
  { value: "R$ 1.000,00", milestone: false },
  { value: "R$ 500,00", milestone: true },
  { value: "R$ 0,00", milestone: false },
];

const QuizShowGame = () => {
  const { toast } = useToast();
  
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(10); // Índice no array prizeLevels (começa com R$ 500,00)
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasQuit, setHasQuit] = useState(false);
  const [finalPrize, setFinalPrize] = useState("R$ 0,00");
  const [timeLeft, setTimeLeft] = useState(30); // Tempo em segundos

  // Ajudas disponíveis
  const [helpAvailable, setHelpAvailable] = useState({
    university: true,      // Ajuda dos universitários
    fiftyFifty: true,      // Eliminar duas alternativas
    skip: true             // Pular pergunta
  });
  
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [universityHelp, setUniversityHelp] = useState<number[]>([]); // Porcentagens para cada opção
  
  // Efeito para gerenciar o tempo
  useEffect(() => {
    if (!gameStarted || gameOver || hasQuit || !isAnswerConfirmed || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, hasQuit, isAnswerConfirmed, timeLeft]);

  // Shuffle questions on game start
  const shuffleQuestions = () => {
    // Separa as questões por dificuldade
    const easyQuestions = questions.filter(q => q.difficulty === 'fácil');
    const mediumQuestions = questions.filter(q => q.difficulty === 'médio');
    const hardQuestions = questions.filter(q => q.difficulty === 'difícil');
    
    // Embaralha cada grupo
    const shuffledEasy = [...easyQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);
    const shuffledMedium = [...mediumQuestions].sort(() => 0.5 - Math.random()).slice(0, 4);
    const shuffledHard = [...hardQuestions].sort(() => 0.5 - Math.random()).slice(0, 1);
    
    // Questão do milhão está sempre no final
    const millionQuestion = questions[questions.length - 1];
    
    // Retorna a sequência ordenada por dificuldade
    return [...shuffledEasy, ...shuffledMedium, ...shuffledHard, millionQuestion];
  };
  
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);

  const startGame = () => {
    setGameQuestions(shuffleQuestions());
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setCurrentLevel(10);
    setSelectedOption(null);
    setIsAnswerConfirmed(true);
    setGameOver(false);
    setHasQuit(false);
    setFinalPrize("R$ 0,00");
    setTimeLeft(30);
    setHelpAvailable({
      university: true,
      fiftyFifty: true,
      skip: true
    });
    setEliminatedOptions([]);
    setUniversityHelp([]);
    
    toast({
      title: "Bem-vindo ao Quiz Show!",
      description: "Responda corretamente para ganhar prêmios!",
    });
  };

  const handleTimeout = () => {
    toast({
      title: "Tempo Esgotado!",
      description: "Você não respondeu a tempo.",
      variant: "destructive",
    });
    
    // O jogador perde e ganha o último prêmio de marco garantido
    handleGameOver(false);
  };

  // Modificado para permitir selecionar opção mesmo que outra já esteja selecionada, enquanto o tempo estiver correndo
  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswerConfirmed || gameOver) return;
    
    setSelectedOption(optionIndex);
  };
  
  const confirmAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerConfirmed(true); // Agora só travamos a resposta quando confirmar
    
    const isCorrect = selectedOption === gameQuestions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      toast({
        title: "Correto!",
        description: "Parabéns, sua resposta está certa!",
      });
      
      // Avança para o próximo nível
      const nextLevel = currentLevel - 1;
      setCurrentLevel(nextLevel);
      
      // Verifica se chegou ao final do jogo (ganhou um milhão)
      if (nextLevel === 0) {
        setFinalPrize(prizeLevels[0].value);
        handleGameOver(true);
      } else {
        // Avança para a próxima pergunta
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedOption(null);
          setIsAnswerConfirmed(false); // Reseta para permitir selecionar na próxima pergunta
          setTimeLeft(30);
          setEliminatedOptions([]);
          setUniversityHelp([]);
        }, 2000);
      }
    } else {
      toast({
        title: "Incorreto!",
        description: `A resposta correta era: ${gameQuestions[currentQuestionIndex].options[gameQuestions[currentQuestionIndex].correctAnswer]}`,
        variant: "destructive",
      });
      
      // Busca o último marco garantido
      let guaranteedLevel = 10; // Por padrão, zero
      for (let i = currentLevel; i <= 10; i++) {
        if (prizeLevels[i].milestone) {
          guaranteedLevel = i;
          break;
        }
      }
      
      setFinalPrize(prizeLevels[guaranteedLevel].value);
      handleGameOver(false);
    }
  };
  
  const handleGameOver = (isWinner: boolean) => {
    setGameOver(true);
    
    // Calcula recompensa baseada no prêmio
    let attempts = 0;
    
    if (isWinner) {
      // Se ganhou o milhão, ganha 10 tentativas
      attempts = 10;
      toast({
        title: "Vencedor do Milhão!",
        description: `Você ganhou ${attempts} tentativas para o Jogo do Número Secreto!`,
      });
    } else if (finalPrize === "R$ 500,00") {
      attempts = 1;
    } else if (finalPrize === "R$ 10.000,00") {
      attempts = 3;
    } else if (finalPrize === "R$ 100.000,00") {
      attempts = 5;
    }
    
    if (attempts > 0) {
      const newAttempts = addSecretNumberAttempts(attempts);
      
      if (!isWinner) {
        toast({
          title: "Jogo Encerrado",
          description: `Você ganhou ${attempts} tentativa(s) para o Jogo do Número Secreto!`,
        });
      }
    }
  };
  
  const quit = () => {
    setHasQuit(true);
    setFinalPrize(prizeLevels[currentLevel].value);
    
    // Determine reward based on current prize
    let attempts = 0;
    if (currentLevel <= 7 && currentLevel > 4) { // R$5.000 - R$50.000
      attempts = 2;
    } else if (currentLevel <= 4 && currentLevel > 0) { // R$100.000 - R$500.000
      attempts = 4;
    }
    
    if (attempts > 0) {
      const newAttempts = addSecretNumberAttempts(attempts);
      
      toast({
        title: "Você Parou!",
        description: `Você ganhou ${attempts} tentativas para o Jogo do Número Secreto!`,
      });
    } else {
      toast({
        title: "Você Parou!",
        description: `Você garantiu ${prizeLevels[currentLevel].value}`,
      });
    }
  };
  
  // Usar ajuda dos universitários
  const useUniversityHelp = () => {
    if (!helpAvailable.university || gameOver || !isAnswerConfirmed) return;
    
    // Simulação da ajuda dos universitários - probabilidades baseadas na dificuldade
    const correctAnswer = gameQuestions[currentQuestionIndex].correctAnswer;
    const difficulty = gameQuestions[currentQuestionIndex].difficulty;
    
    // Define a precisão baseada na dificuldade
    let correctProb = 0;
    switch (difficulty) {
      case 'fácil':
        correctProb = 0.7; // 70% chance para a resposta certa
        break;
      case 'médio':
        correctProb = 0.5; // 50% chance para a resposta certa
        break;
      case 'difícil':
        correctProb = 0.4; // 40% chance para a resposta certa
        break;
    }
    
    // Gera porcentagens para cada opção
    let percentages: number[] = [];
    let remaining = 100;
    
    // Primeiro, aloca para a resposta correta
    const correctPercentage = Math.floor(correctProb * 100);
    percentages[correctAnswer] = correctPercentage;
    remaining -= correctPercentage;
    
    // Distribui o restante entre as outras opções
    const otherOptions = [0, 1, 2, 3].filter(opt => opt !== correctAnswer && !eliminatedOptions.includes(opt));
    
    for (let i = 0; i < otherOptions.length; i++) {
      if (i === otherOptions.length - 1) {
        // Último item recebe o restante
        percentages[otherOptions[i]] = remaining;
      } else {
        // Distribui aleatoriamente
        const rand = Math.floor(Math.random() * (remaining / 2)) + 1;
        percentages[otherOptions[i]] = rand;
        remaining -= rand;
      }
    }
    
    // Opções eliminadas recebem 0%
    eliminatedOptions.forEach(opt => {
      percentages[opt] = 0;
    });
    
    setUniversityHelp(percentages);
    setHelpAvailable(prev => ({ ...prev, university: false }));
    
    toast({
      title: "Ajuda dos Universitários",
      description: "Os universitários deram suas opiniões!",
    });
  };
  
  // Usar 50:50 (eliminar duas alternativas incorretas)
  const useFiftyFifty = () => {
    if (!helpAvailable.fiftyFifty || gameOver || !isAnswerConfirmed) return;
    
    const correctAnswer = gameQuestions[currentQuestionIndex].correctAnswer;
    
    // Encontra as opções incorretas
    const incorrectOptions = [0, 1, 2, 3].filter(opt => opt !== correctAnswer);
    
    // Escolhe duas opções incorretas aleatoriamente para eliminar
    const shuffled = [...incorrectOptions].sort(() => 0.5 - Math.random());
    const toEliminate = shuffled.slice(0, 2);
    
    setEliminatedOptions(toEliminate);
    setHelpAvailable(prev => ({ ...prev, fiftyFifty: false }));
    
    toast({
      title: "Eliminar duas alternativas",
      description: "Duas alternativas incorretas foram eliminadas!",
    });
  };
  
  // Usar pular pergunta
  const useSkip = () => {
    if (!helpAvailable.skip || gameOver || !isAnswerConfirmed) return;
    
    // Avança para a próxima pergunta sem penalidade
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedOption(null);
    setEliminatedOptions([]);
    setUniversityHelp([]);
    setHelpAvailable(prev => ({ ...prev, skip: false }));
    
    toast({
      title: "Pular Pergunta",
      description: "Você pulou esta pergunta!",
    });
  };
  
  // Se o jogo não tiver iniciado, mostra tela inicial
  if (!gameStarted) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">QUIZ SHOW</span>
          </h2>
          <p className="text-gray-300 light:text-gray-700 mb-6">
            Teste seu conhecimento e tente ganhar o prêmio máximo!
          </p>
          
          <NeonButton onClick={startGame} className="w-full md:w-auto">
            Iniciar Jogo
          </NeonButton>
        </div>
        
        <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20">
          <CardHeader>
            <CardTitle className="text-xl text-neon-blue">Como Jogar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300 light:text-gray-700">
              Responda perguntas cada vez mais difíceis para ganhar prêmios. Quanto mais você avançar, maior será sua recompensa!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-space-accent/20 p-4 rounded-lg">
                <h3 className="font-bold text-neon-blue mb-2">Ajudas</h3>
                <p className="text-gray-400 light:text-gray-600 text-sm">
                  Use as três ajudas disponíveis: Universitários, Eliminar Duas Alternativas e Pular Pergunta.
                </p>
              </div>
              <div className="bg-space-accent/20 p-4 rounded-lg">
                <h3 className="font-bold text-neon-purple mb-2">Marcos</h3>
                <p className="text-gray-400 light:text-gray-600 text-sm">
                  Marcos garantidos: R$500, R$10.000 e R$100.000. Se errar, você ainda leva o último marco alcançado.
                </p>
              </div>
              <div className="bg-space-accent/20 p-4 rounded-lg">
                <h3 className="font-bold text-neon-pink mb-2">Parar</h3>
                <p className="text-gray-400 light:text-gray-600 text-sm">
                  A qualquer momento você pode parar e garantir o prêmio atual. Decida com sabedoria!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Se o jogo terminou (ganhou ou perdeu) ou o jogador desistiu
  if (gameOver || hasQuit) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-gradient">FIM DO JOGO!</span>
          </h2>
          
          <div className="mt-6 mb-4">
            <p className="text-4xl font-bold text-neon-blue mb-2">{finalPrize}</p>
            <p className="text-gray-300 light:text-gray-700">
              {gameOver && finalPrize === "R$ 1.000.000,00" 
                ? "Parabéns! Você ganhou o prêmio máximo!" 
                : hasQuit 
                  ? "Você decidiu parar com segurança!" 
                  : "Jogo encerrado!"}
            </p>
          </div>
          
          <NeonButton onClick={startGame} className="w-full mt-6">
            Jogar Novamente
          </NeonButton>
        </div>
        
        <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
          <CardHeader>
            <CardTitle className="text-xl text-neon-blue">Resumo do Jogo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300 light:text-gray-700">Questões respondidas:</span>
                <span className="text-white light:text-space-dark">{currentQuestionIndex + (gameOver && !hasQuit ? 1 : 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 light:text-gray-700">Prêmio ganho:</span>
                <span className="text-neon-purple font-bold">{finalPrize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 light:text-gray-700">Ajudas usadas:</span>
                <span className="text-white light:text-space-dark">
                  {(!helpAvailable.university ? 1 : 0) + (!helpAvailable.fiftyFifty ? 1 : 0) + (!helpAvailable.skip ? 1 : 0)}/3
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Renderizar jogo em progresso
  const currentQuestion = gameQuestions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className="text-center py-10">
        <p className="text-white">Carregando perguntas...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Cabeçalho com informações */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div>
          <p className="text-neon-purple text-sm">
            {currentQuestion.category} - Dificuldade: {currentQuestion.difficulty}
          </p>
          <p className="text-gray-300 light:text-gray-700">
            Pergunta {currentQuestionIndex + 1}/{gameQuestions.length}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-300 light:text-gray-700">Prêmio atual</p>
          <p className="text-neon-blue text-xl font-bold">{prizeLevels[currentLevel].value}</p>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full h-2 bg-space-light/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-neon-blue"
          style={{ width: `${(timeLeft / 30) * 100}%`, transition: 'width 1s linear' }}
        ></div>
      </div>
      <p className="text-right text-gray-300 light:text-gray-700 text-sm">
        Tempo: {timeLeft}s
      </p>

      {/* Pergunta e Opções */}
      <div className="bg-space-accent/20 border border-neon-purple/30 rounded-lg p-4">
        <h3 className="text-xl text-white light:text-space-dark font-semibold mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            // Skip eliminated options (50:50)
            const isEliminated = eliminatedOptions.includes(index);
            
            return (
              <div key={index} className="relative">
                <button
                  onClick={() => handleOptionSelect(index)}
                  disabled={isEliminated || isAnswerConfirmed}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    isEliminated 
                    ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed' 
                    : isAnswerConfirmed 
                      ? selectedOption === index 
                        ? 'bg-neon-blue/40 border border-neon-blue' 
                        : 'bg-space-light/10' 
                      : selectedOption === index 
                        ? 'bg-neon-blue/40 border border-neon-blue' 
                        : 'hover:bg-space-light/30 bg-space-light/10'
                  }`}
                >
                  <span className={`${isEliminated ? 'text-gray-600' : 'text-white light:text-space-dark'}`}>
                    {String.fromCharCode(65 + index)}. {isEliminated ? '-------' : option}
                  </span>
                </button>
                
                {/* University help percentages */}
                {universityHelp.length > 0 && !isEliminated && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                    <div className="bg-neon-blue/30 px-2 py-1 rounded text-sm">
                      {universityHelp[index] || 0}%
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls - Confirm, Quit, Help */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <NeonButton 
            onClick={confirmAnswer} 
            disabled={selectedOption === null || isAnswerConfirmed} 
            className="w-full"
          >
            Confirmar Resposta
          </NeonButton>
        </div>
        <div>
          <NeonButton 
            variant="secondary" 
            onClick={quit} 
            disabled={!isAnswerConfirmed}
            className="w-full"
          >
            Parar
          </NeonButton>
        </div>
      </div>
      
      {/* Help Options */}
      <div className="grid grid-cols-3 gap-3">
        <NeonButton 
          variant={helpAvailable.university ? "outline" : "primary"} 
          onClick={useUniversityHelp}
          disabled={!helpAvailable.university || !isAnswerConfirmed}
          className="w-full"
        >
          Universitários {helpAvailable.university ? "✓" : "✗"}
        </NeonButton>
        <NeonButton 
          variant={helpAvailable.fiftyFifty ? "outline" : "primary"} 
          onClick={useFiftyFifty}
          disabled={!helpAvailable.fiftyFifty || !isAnswerConfirmed}
          className="w-full"
        >
          50:50 {helpAvailable.fiftyFifty ? "✓" : "✗"}
        </NeonButton>
        <NeonButton 
          variant={helpAvailable.skip ? "outline" : "primary"} 
          onClick={useSkip}
          disabled={!helpAvailable.skip || !isAnswerConfirmed}
          className="w-full"
        >
          Pular {helpAvailable.skip ? "✓" : "✗"}
        </NeonButton>
      </div>
      
      {/* Prize ladder */}
      <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-2">
        <CardHeader className="py-2">
          <CardTitle className="text-md text-neon-blue">Escada de Prêmios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {prizeLevels.map((prize, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-1 rounded ${
                  currentLevel === idx 
                    ? 'bg-neon-blue/30 border border-neon-blue' 
                    : prize.milestone 
                      ? 'bg-neon-purple/20 border border-neon-purple/30' 
                      : ''
                }`}
              >
                <span className={`text-sm ${idx === currentLevel ? 'text-white font-bold' : 'text-gray-300'}`}>
                  {prize.value}
                </span>
                {prize.milestone && (
                  <span className="text-xs text-neon-purple">Marco</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizShowGame;
