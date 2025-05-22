
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';

const gameInstructions = {
  secretNumber: [
    {
      id: 1,
      title: "Entenda o Jogo",
      description: "O computador escolhe aleatoriamente um número entre 1 e 100. Seu objetivo é adivinhar esse número com o menor número de tentativas possível.",
      icon: "🎮"
    },
    {
      id: 2,
      title: "Faça seu Palpite",
      description: "Digite um número no campo de entrada e clique em 'Adivinhar'. Após cada tentativa, você receberá uma dica se o número correto é maior ou menor que seu palpite.",
      icon: "🔢"
    },
    {
      id: 3,
      title: "Use as Dicas",
      description: "Se você tiver créditos disponíveis, use o botão 'Usar Dica' para receber uma dica que reduz o intervalo de busca. Isto consumirá 1 crédito e 1 tentativa por dica.",
      icon: "💡"
    },
    {
      id: 4,
      title: "Monitore seu Progresso",
      description: "Acompanhe suas tentativas anteriores no histórico e veja como você se compara aos outros jogadores no ranking.",
      icon: "📊"
    },
    {
      id: 5,
      title: "Ganhe o Jogo",
      description: "Quando acertar o número secreto, você receberá uma celebração! Seu desempenho será salvo no ranking se estiver entre os 5 melhores.",
      icon: "🏆"
    },
    {
      id: 6,
      title: "Compre Créditos",
      description: "Se precisar de mais ajuda, você pode adquirir créditos adicionais para usar em dicas. Quanto menos tentativas você fizer, melhor será sua classificação!",
      icon: "💰"
    }
  ],
  
  ticTacToe: [
    {
      id: 1,
      title: "Objetivo",
      description: "Alinhe três símbolos iguais (X ou O) na horizontal, vertical ou diagonal para vencer.",
      icon: "🎯"
    },
    {
      id: 2,
      title: "Como Jogar",
      description: "Clique em um dos quadrados vazios para marcar com seu símbolo. O jogo alterna automaticamente entre X e O.",
      icon: "👆"
    },
    {
      id: 3,
      title: "Estratégia",
      description: "Bloqueie seu oponente enquanto tenta formar sua própria linha. Os cantos e o centro são posições estratégicas importantes!",
      icon: "🧠"
    },
    {
      id: 4,
      title: "Ganhe Recompensas",
      description: "Ao vencer uma partida, você tem chance de ganhar de 1 a 3 tentativas para o Jogo do Número Secreto.",
      icon: "🎁"
    },
    {
      id: 5,
      title: "Acompanhe Estatísticas",
      description: "O jogo mantém registro de suas vitórias, empates e derrotas para acompanhar seu desempenho.",
      icon: "📈"
    }
  ],
  
  quiz: [
    {
      id: 1,
      title: "Responda Perguntas",
      description: "O quiz apresenta perguntas de diversas categorias como geografia, ciência, esportes e entretenimento.",
      icon: "❓"
    },
    {
      id: 2,
      title: "Tempo Limitado",
      description: "Você tem 20 segundos para responder cada pergunta. Fique atento ao cronômetro!",
      icon: "⏱️"
    },
    {
      id: 3,
      title: "Pontuação",
      description: "Cada resposta correta vale 1 ponto. No final do quiz, seu desempenho determinará sua recompensa.",
      icon: "🏅"
    },
    {
      id: 4,
      title: "Recompensas",
      description: "Com 8+ acertos, ganhe 3 tentativas; com 6-7 acertos, ganhe 2 tentativas; com 3-5 acertos, ganhe 1 tentativa para o Jogo do Número Secreto.",
      icon: "🎁"
    },
    {
      id: 5,
      title: "Estatísticas",
      description: "Acompanhe seu histórico de quizzes, taxa de acerto e melhor pontuação para ver seu progresso.",
      icon: "📊"
    }
  ],
  
  hangman: [
    {
      id: 1,
      title: "Adivinhe a Palavra",
      description: "Uma palavra secreta é escolhida aleatoriamente. Seu objetivo é adivinhar a palavra letra por letra antes que o boneco seja completamente desenhado.",
      icon: "📝"
    },
    {
      id: 2,
      title: "Escolha Letras",
      description: "Clique nas letras do teclado virtual para fazer seus palpites. As letras corretas aparecerão na palavra.",
      icon: "🔤"
    },
    {
      id: 3,
      title: "Erros Limitados",
      description: "Cada letra incorreta adiciona uma parte ao boneco. Após 6 erros, o jogo termina e você perde.",
      icon: "❌"
    },
    {
      id: 4,
      title: "Categorias",
      description: "As palavras são divididas em diferentes categorias como filmes, animais, países e mais.",
      icon: "📚"
    },
    {
      id: 5,
      title: "Ganhe Recompensas",
      description: "Ao vencer, você pode ganhar tentativas adicionais para o Jogo do Número Secreto.",
      icon: "🎁"
    }
  ],
  
  memory: [
    {
      id: 1,
      title: "Encontre os Pares",
      description: "O tabuleiro contém cartas com imagens que formam pares. Seu objetivo é encontrar todos os pares usando sua memória.",
      icon: "🃏"
    },
    {
      id: 2,
      title: "Vire as Cartas",
      description: "Clique em duas cartas para virá-las. Se formarem um par, elas permanecem viradas (marcadas com ✓). Caso contrário, elas viram de volta (marcadas com ✗).",
      icon: "👆"
    },
    {
      id: 3,
      title: "Finalize o Tabuleiro",
      description: "O jogo termina quando todos os pares forem encontrados. Tente completar com o menor número de tentativas!",
      icon: "🏁"
    },
    {
      id: 4,
      title: "Acompanhe o Progresso",
      description: "O jogo conta suas jogadas e o tempo decorrido para calcular sua pontuação final.",
      icon: "⏱️"
    },
    {
      id: 5,
      title: "Ganhe Recompensas",
      description: "Complete o jogo para ganhar tentativas adicionais no Jogo do Número Secreto baseadas no seu desempenho.",
      icon: "🎁"
    }
  ],
  
  quizShow: [
    {
      id: 1,
      title: "Teste seu Conhecimento",
      description: "Responda perguntas de múltipla escolha sobre diversos temas, aumentando o nível de dificuldade conforme avança.",
      icon: "📺"
    },
    {
      id: 2,
      title: "Ajudas Disponíveis",
      description: "Use ajudas como 'Eliminar duas alternativas', 'Pular pergunta' ou 'Consultar os universitários' para facilitar perguntas difíceis.",
      icon: "🆘"
    },
    {
      id: 3,
      title: "Acumule Prêmios",
      description: "Cada resposta correta aumenta seu prêmio virtual. Você pode parar a qualquer momento para garantir o prêmio atual.",
      icon: "💰"
    },
    {
      id: 4,
      title: "Pergunta do Milhão",
      description: "Responda corretamente todas as perguntas para chegar à pergunta final, a pergunta do milhão!",
      icon: "💎"
    },
    {
      id: 5,
      title: "Ganhe Recompensas Reais",
      description: "Seu desempenho no Quiz Show rendará tentativas para o Jogo do Número Secreto baseado em quanto você ganhar.",
      icon: "🎁"
    }
  ]
};

const HowToPlay = () => {
  const [selectedGame, setSelectedGame] = useState('secretNumber');
  const location = useLocation();

  // Detectar o jogo selecionado na URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const game = params.get('game');
    
    if (game && gameInstructions[game as keyof typeof gameInstructions]) {
      setSelectedGame(game);
    } else {
      // Verifica se há um jogo selecionado no armazenamento local
      const storedGame = localStorage.getItem('selectedGame');
      if (storedGame && gameInstructions[storedGame as keyof typeof gameInstructions]) {
        setSelectedGame(storedGame);
      }
    }
  }, [location]);

  // Se inscreve para eventos de mudança de jogo
  useEffect(() => {
    const handleGameChange = (e: CustomEvent) => {
      const newGame = e.detail.game;
      if (newGame && gameInstructions[newGame as keyof typeof gameInstructions]) {
        setSelectedGame(newGame);
      }
    };

    window.addEventListener('gameChanged' as any, handleGameChange);
    
    return () => {
      window.removeEventListener('gameChanged' as any, handleGameChange);
    };
  }, []);

  const steps = gameInstructions[selectedGame as keyof typeof gameInstructions] || gameInstructions.secretNumber;

  return (
    <section id="how-to-play-section" className="py-24 relative bg-space-darker dark:bg-space-darker light:bg-white/50">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-neon-purple/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-blue/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white light:text-space-dark">Como </span>
            <span className="text-gradient">Jogar</span>
          </h2>
          <p className="text-gray-300 light:text-gray-700 max-w-xl mx-auto">
            Siga estes passos para dominar o jogo e conquistar o topo do ranking.
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => setSelectedGame('secretNumber')} 
              className={`px-4 py-2 rounded-lg transition-all ${selectedGame === 'secretNumber' ? 'bg-neon-blue text-white' : 'bg-space-light/20 hover:bg-space-light/30 text-gray-300'}`}
            >
              Número Secreto
            </button>
            <button 
              onClick={() => setSelectedGame('ticTacToe')} 
              className={`px-4 py-2 rounded-lg transition-all ${selectedGame === 'ticTacToe' ? 'bg-neon-blue text-white' : 'bg-space-light/20 hover:bg-space-light/30 text-gray-300'}`}
            >
              Jogo da Velha
            </button>
            <button 
              onClick={() => setSelectedGame('quiz')} 
              className={`px-4 py-2 rounded-lg transition-all ${selectedGame === 'quiz' ? 'bg-neon-blue text-white' : 'bg-space-light/20 hover:bg-space-light/30 text-gray-300'}`}
            >
              Quiz
            </button>
            <button 
              onClick={() => setSelectedGame('hangman')} 
              className={`px-4 py-2 rounded-lg transition-all ${selectedGame === 'hangman' ? 'bg-neon-blue text-white' : 'bg-space-light/20 hover:bg-space-light/30 text-gray-300'}`}
            >
              Jogo da Forca
            </button>
            <button 
              onClick={() => setSelectedGame('memory')} 
              className={`px-4 py-2 rounded-lg transition-all ${selectedGame === 'memory' ? 'bg-neon-blue text-white' : 'bg-space-light/20 hover:bg-space-light/30 text-gray-300'}`}
            >
              Jogo da Memória
            </button>
            <button 
              onClick={() => setSelectedGame('quizShow')} 
              className={`px-4 py-2 rounded-lg transition-all ${selectedGame === 'quizShow' ? 'bg-neon-blue text-white' : 'bg-space-light/20 hover:bg-space-light/30 text-gray-300'}`}
            >
              Quiz Show
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Card key={step.id} className="space-card relative overflow-hidden border-neon-purple/30 hover:border-neon-purple/60 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-space-accent dark:bg-space-accent light:bg-neon-purple/80 px-3 py-1 text-sm text-white">
                Passo {step.id}
              </div>
              <CardContent className="pt-12 pb-8 flex flex-col items-center text-center">
                <div className="text-5xl mb-5">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white light:text-space-dark">{step.title}</h3>
                <p className="text-gray-400 light:text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToPlay;
