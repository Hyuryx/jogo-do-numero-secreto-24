
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
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
    description: "Se você tiver créditos disponíveis, use o botão 'Usar Dica' para receber uma dica que reduz o intervalo de busca. Isto consumirá 1 crédito por dica.",
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
];

const HowToPlay = () => {
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
            Siga estes passos para dominar o Jogo do Número Secreto e conquistar o topo do ranking.
          </p>
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
