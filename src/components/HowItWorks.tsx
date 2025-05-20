
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    id: 1,
    title: "Conecte sua Wallet",
    description: "Conecte sua carteira de criptomoedas para começar a explorar o universo JOGO.",
    icon: "👛"
  },
  {
    id: 2,
    title: "Descubra NFTs",
    description: "Navegue pela nossa coleção exclusiva de NFTs espaciais e encontre sua próxima aquisição.",
    icon: "🔍"
  },
  {
    id: 3,
    title: "Faça sua Oferta",
    description: "Selecione seu NFT favorito e faça sua oferta para adquirir esta peça única.",
    icon: "💰"
  },
  {
    id: 4,
    title: "Colecione & Ganhe",
    description: "Adicione à sua coleção e ganhe benefícios exclusivos na plataforma JOGO.",
    icon: "🏆"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative bg-space-darker">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-neon-purple/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-blue/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">Como </span>
            <span className="text-gradient">Funciona</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Siga estes simples passos para começar sua jornada no universo JOGO.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Card key={step.id} className="space-card relative overflow-hidden border-neon-purple/30 hover:border-neon-purple/60 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-space-accent px-3 py-1 text-sm text-white">
                Passo {step.id}
              </div>
              <CardContent className="pt-12 pb-8 flex flex-col items-center text-center">
                <div className="text-5xl mb-5">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
