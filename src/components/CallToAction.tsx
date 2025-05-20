
import React from 'react';
import NeonButton from './NeonButton';

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-space-bg opacity-90"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Entre para o <span className="text-gradient">Universo JOGO</span> Hoje
          </h2>
          <p className="text-gray-300 text-lg">
            Não perca a oportunidade de fazer parte desta revolução. 
            Conecte sua carteira agora e comece sua jornada no mundo dos NFTs espaciais.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <NeonButton>Conectar Wallet</NeonButton>
            <NeonButton variant="outline">Ver Roadmap</NeonButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
