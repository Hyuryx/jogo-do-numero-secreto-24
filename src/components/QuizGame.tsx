import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { addSecretNumberAttempts } from './SecretNumberGame';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

const questions: Question[] = [
  {
    question: "Qual é a capital do Brasil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: 2,
    category: "Geografia"
  },
  {
    question: "Quem pintou a Mona Lisa?",
    options: ["Van Gogh", "Leonardo da Vinci", "Michelangelo", "Pablo Picasso"],
    correctAnswer: 1,
    category: "Arte"
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Marte", "Júpiter", "Vênus"],
    correctAnswer: 2,
    category: "Astronomia"
  },
  {
    question: "Qual desses não é um filme da Marvel?",
    options: ["Homem de Ferro", "Batman", "Thor", "Capitão América"],
    correctAnswer: 1,
    category: "Cinema"
  },
  {
    question: "Quanto é 9 × 8?",
    options: ["56", "64", "72", "81"],
    correctAnswer: 2,
    category: "Matemática"
  },
  {
    question: "Qual clube de futebol tem mais títulos da Champions League?",
    options: ["Barcelona", "Bayern de Munique", "Liverpool", "Real Madrid"],
    correctAnswer: 3,
    category: "Esportes"
  },
  {
    question: "Qual elemento químico tem o símbolo 'O'?",
    options: ["Ouro", "Ósmio", "Oxigênio", "Olívio"],
    correctAnswer: 2,
    category: "Ciência"
  },
  {
    question: "Em que ano o homem pisou na Lua pela primeira vez?",
    options: ["1969", "1971", "1965", "1973"],
    correctAnswer: 0,
    category: "História"
  },
  {
    question: "Qual é a linguagem de programação mais utilizada para desenvolvimento web front-end?",
    options: ["Java", "Python", "C++", "JavaScript"],
    correctAnswer: 3,
    category: "Tecnologia"
  },
  {
    question: "Qual é o nome do criador do Facebook?",
    options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos"],
    correctAnswer: 2,
    category: "Tecnologia"
  },
  {
    question: "Qual é o rio mais longo do mundo?",
    options: ["Amazonas", "Nilo", "Mississippi", "Yangtzé"],
    correctAnswer: 1,
    category: "Geografia"
  },
  {
    question: "Quantas Copas do Mundo o Brasil já venceu?",
    options: ["4", "5", "3", "6"],
    correctAnswer: 1,
    category: "Esportes"
  },
  {
    question: "Qual é o resultado de 3² + 4²?",
    options: ["25", "7", "49", "9"],
    correctAnswer: 0,
    category: "Matemática"
  },
  {
    question: "Quem é o autor de 'Dom Quixote'?",
    options: ["Miguel de Cervantes", "Shakespeare", "Jorge Amado", "Machado de Assis"],
    correctAnswer: 0,
    category: "Literatura"
  },
  {
    question: "Qual é o animal mais rápido do mundo?",
    options: ["Leopardo", "Águia", "Guepardo", "Falcão-peregrino"],
    correctAnswer: 2,
    category: "Biologia"
  },
  {
    question: "Qual é o maior oceano do mundo?",
    options: ["Atlântico", "Índico", "Pacífico", "Ártico"],
    correctAnswer: 2,
    category: "Geografia"
  },
  {
    question: "Qual o nome da galáxia que contém o Sistema Solar?",
    options: ["Andrômeda", "Via Láctea", "Triangulum", "Centaurus A"],
    correctAnswer: 1,
    category: "Astronomia"
  },
  {
    question: "Quem escreveu 'O Pequeno Príncipe'?",
    options: ["Antoine de Saint-Exupéry", "Jules Verne", "Victor Hugo", "Albert Camus"],
    correctAnswer: 0,
    category: "Literatura"
  },
  {
    question: "Em que ano foi fundado o Google?",
    options: ["1996", "1998", "2000", "2002"],
    correctAnswer: 1,
    category: "Tecnologia"
  },
  {
    question: "Qual destas não é uma linguagem de programação?",
    options: ["Python", "HTML", "Ruby", "Kotlin"],
    correctAnswer: 1,
    category: "Tecnologia"
  },
  {
    question: "Qual é o elemento químico mais abundante no universo?",
    options: ["Oxigênio", "Carbono", "Hélio", "Hidrogênio"],
    correctAnswer: 3,
    category: "Ciência"
  },
  {
    question: "Qual é o menor país do mundo?",
    options: ["Mônaco", "Vaticano", "Nauru", "San Marino"],
    correctAnswer: 1,
    category: "Geografia"
  },
  {
    question: "Quantos lados tem um hexágono?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    category: "Matemática"
  },
  {
    question: "Qual é o ano de lançamento do primeiro iPhone?",
    options: ["2005", "2007", "2009", "2011"],
    correctAnswer: 1,
    category: "Tecnologia"
  },
  {
    question: "Qual artista pintou 'A Noite Estrelada'?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Salvador Dalí"],
    correctAnswer: 0,
    category: "Arte"
  },
  {
    question: "Quantos planetas existem no Sistema Solar?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 1,
    category: "Astronomia"
  },
  {
    question: "Qual destes países não está na Europa?",
    options: ["Suécia", "Portugal", "Marrocos", "Áustria"],
    correctAnswer: 2,
    category: "Geografia"
  },
  {
    question: "Quem foi o primeiro ser humano a ir ao espaço?",
    options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "Alan Shepard"],
    correctAnswer: 1,
    category: "História"
  },
  {
    question: "Qual o nome do criador da teoria da relatividade?",
    options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"],
    correctAnswer: 1,
    category: "Ciência"
  },
  {
    question: "Qual instrumento musical tem 88 teclas?",
    options: ["Órgão", "Acordeão", "Piano", "Sintetizador"],
    correctAnswer: 2,
    category: "Música"
  }
];

const QuizGame = () => {
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(20); // 20 segundos por questão
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizStats, setQuizStats] = useState({
    gamesPlayed: 0,
    bestScore: 0,
    totalCorrect: 0,
    totalQuestions: 0
  });

  // Selecionar perguntas aleatórias quando o componente é montado
  useEffect(() => {
    // Embaralhar questões e pegar 10
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 10));
    
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
      const newAttempts = addSecretNumberAttempts(attempts);
      
      toast({
        title: "Desempenho Excelente!",
        description: `Você ganhou ${attempts} tentativas para o Jogo do Número Secreto!`,
      });
    } else if (score >= 6) { // 6-7 acertos (60-70%)
      // Recompensa média (2 tentativas)
      const attempts = 2;
      const newAttempts = addSecretNumberAttempts(attempts);
      
      toast({
        title: "Bom Desempenho!",
        description: `Você ganhou ${attempts} tentativas para o Jogo do Número Secreto!`,
      });
    } else if (score >= 3) { // 3-5 acertos (30-50%)
      // Recompensa mínima (1 tentativa)
      const attempts = 1;
      const newAttempts = addSecretNumberAttempts(attempts);
      
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
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 10));
    
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
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-gradient">FIM DO QUIZ!</span>
          </h2>
          
          <div className="mt-6 mb-4">
            <p className="text-4xl font-bold text-neon-blue mb-2">{score}/{quizQuestions.length}</p>
            <p className="text-gray-300 light:text-gray-700">
              {score >= 8 ? "Excelente!" : score >= 6 ? "Muito bom!" : score >= 3 ? "Bom trabalho!" : "Continue tentando!"}
            </p>
          </div>
          
          <NeonButton onClick={restartQuiz} className="w-full mt-6">
            Jogar Novamente
          </NeonButton>
        </div>
        
        <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
          <CardHeader>
            <CardTitle className="text-xl text-neon-blue">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-neon-blue text-xl font-bold">{quizStats.gamesPlayed}</p>
                <p className="text-gray-300 light:text-gray-700">Quizzes Jogados</p>
              </div>
              <div>
                <p className="text-neon-pink text-xl font-bold">{quizStats.bestScore}/{quizQuestions.length}</p>
                <p className="text-gray-300 light:text-gray-700">Melhor Pontuação</p>
              </div>
              <div>
                <p className="text-neon-purple text-xl font-bold">
                  {quizStats.totalQuestions > 0 
                    ? Math.round((quizStats.totalCorrect / quizStats.totalQuestions) * 100) 
                    : 0}%
                </p>
                <p className="text-gray-300 light:text-gray-700">Taxa de Acerto</p>
              </div>
              <div>
                <p className="text-neon-purple text-xl font-bold">{quizStats.totalCorrect}</p>
                <p className="text-gray-300 light:text-gray-700">Total de Acertos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-300 light:text-gray-700">
            Pergunta {currentQuestionIndex + 1}/{quizQuestions.length}
          </p>
          <p className="text-neon-purple text-sm">
            Categoria: {currentQuestion.category}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-300 light:text-gray-700">Pontuação</p>
          <p className="text-neon-blue text-xl font-bold">{score}</p>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full h-2 bg-space-light/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-neon-blue"
          style={{ width: `${(timeLeft / 20) * 100}%`, transition: 'width 1s linear' }}
        ></div>
      </div>
      <p className="text-right text-gray-300 light:text-gray-700 text-sm">
        Tempo: {timeLeft}s
      </p>

      <div className="bg-space-accent/20 border border-neon-purple/30 rounded-lg p-4">
        <h3 className="text-xl text-white light:text-space-dark font-semibold mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-3 rounded-md transition-colors ${
                selectedOption === null 
                  ? 'hover:bg-space-light/30 bg-space-light/10' 
                  : selectedOption === index 
                    ? index === currentQuestion.correctAnswer 
                      ? 'bg-green-500/40 border border-green-500' 
                      : 'bg-red-500/40 border border-red-500'
                    : index === currentQuestion.correctAnswer
                      ? 'bg-green-500/40 border border-green-500'
                      : 'bg-space-light/10'
              }`}
            >
              <span className="text-white light:text-space-dark">
                {String.fromCharCode(65 + index)}. {option}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
