
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from '../NeonButton';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import QuizStats from './QuizStats';
import QuizTimer from './QuizTimer';
import { Question, QuizGameStats } from './types';
import { getRandomQuestions } from './utils';
import { addSecretNumberAttempts } from '../SecretNumberGame';

const QuizGame = () => {
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(20); // 20 segundos por questão
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizStats, setQuizStats] = useState<QuizGameStats>({
    gamesPlayed: 0,
    bestScore: 0,
    totalCorrect: 0,
    totalQuestions: 0
  });

  // Selecionar perguntas aleatórias quando o componente é montado
  useEffect(() => {
    // Embaralhar questões e pegar 10
    setQuizQuestions(getRandomQuestions(10));
    
    // Carregar estatísticas
    const savedStats = localStorage.getItem('quizStats');
    if (savedStats) {
      setQuizStats(JSON.parse(savedStats));
    }
  }, []);

  // Timer para cada questão
  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    
    if (isTimerActive && timeLeft > 0 && !showResult) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      // Tempo acabou, avança para próxima questão
      handleTimeout();
    }
    
    return () => clearInterval(timerId);
  }, [timeLeft, isTimerActive, showResult]);

  const handleTimeout = () => {
    toast({
      title: "Tempo Esgotado!",
      description: "Você não respondeu a tempo.",
      variant: "destructive",
    });
    
    goToNextQuestion();
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return; // Evita múltiplas seleções
    
    setSelectedOption(optionIndex);
    setIsTimerActive(false); // Para o timer
    
    const isCorrect = optionIndex === quizQuestions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Correto!",
        description: "Você acertou a resposta!",
      });
    } else {
      toast({
        title: "Incorreto!",
        description: `A resposta correta era: ${quizQuestions[currentQuestionIndex].options[quizQuestions[currentQuestionIndex].correctAnswer]}`,
        variant: "destructive",
      });
    }
    
    // Aguarda um momento antes de ir para a próxima pergunta
    setTimeout(() => {
      goToNextQuestion();
    }, 1500);
  };

  const goToNextQuestion = () => {
    setSelectedOption(null);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(20); // Reset do timer
      setIsTimerActive(true);
    } else {
      // Fim do quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setShowResult(true);
    
    // Atualiza estatísticas
    const newStats = {
      gamesPlayed: quizStats.gamesPlayed + 1,
      bestScore: Math.max(quizStats.bestScore, score),
      totalCorrect: quizStats.totalCorrect + score,
      totalQuestions: quizStats.totalQuestions + quizQuestions.length
    };
    
    setQuizStats(newStats);
    localStorage.setItem('quizStats', JSON.stringify(newStats));
    
    // Recompensa baseada na pontuação
    if (score >= 8) { // 8 ou mais acertos (80%+)
      // Recompensa máxima (3 tentativas)
      const attempts = 3;
      addSecretNumberAttempts(attempts);
      
      toast({
        title: "Desempenho Excelente!",
        description: `Você ganhou ${attempts} tentativas para o Jogo do Número Secreto!`,
      });
    } else if (score >= 6) { // 6-7 acertos (60-70%)
      // Recompensa média (2 tentativas)
      const attempts = 2;
      addSecretNumberAttempts(attempts);
      
      toast({
        title: "Bom Desempenho!",
        description: `Você ganhou ${attempts} tentativas para o Jogo do Número Secreto!`,
      });
    } else if (score >= 3) { // 3-5 acertos (30-50%)
      // Recompensa mínima (1 tentativa)
      const attempts = 1;
      addSecretNumberAttempts(attempts);
      
      toast({
        title: "Quiz Concluído",
        description: `Você ganhou ${attempts} tentativa para o Jogo do Número Secreto.`,
      });
    } else {
      toast({
        title: "Quiz Concluído",
        description: "Tente novamente para ganhar tentativas no Jogo do Número Secreto.",
      });
    }
  };

  const restartQuiz = () => {
    // Embaralhar questões e pegar 10
    setQuizQuestions(getRandomQuestions(10));
    
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setTimeLeft(20);
    setIsTimerActive(true);
    
    toast({
      title: "Novo Quiz",
      description: "Boa sorte!",
    });
  };

  // Se as questões ainda não foram carregadas
  if (quizQuestions.length === 0) {
    return (
      <div className="space-card p-6 md:p-8 backdrop-blur-lg relative flex justify-center items-center">
        <p className="text-white text-xl">Carregando perguntas...</p>
      </div>
    );
  }

  // Exibir resultados
  if (showResult) {
    return (
      <QuizResult 
        score={score} 
        totalQuestions={quizQuestions.length} 
        onRestart={restartQuiz}
        quizStats={quizStats} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-300 light:text-gray-700">
            Pergunta {currentQuestionIndex + 1}/{quizQuestions.length}
          </p>
          <p className="text-neon-purple text-sm">
            Categoria: {quizQuestions[currentQuestionIndex].category}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-300 light:text-gray-700">Pontuação</p>
          <p className="text-neon-blue text-xl font-bold">{score}</p>
        </div>
      </div>

      <QuizTimer 
        timeLeft={timeLeft} 
        totalTime={20} 
      />

      <QuizQuestion 
        question={quizQuestions[currentQuestionIndex]} 
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
      />
    </div>
  );
};

export default QuizGame;
