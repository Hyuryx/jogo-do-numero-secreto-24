
import React from 'react';
import NeonButton from './NeonButton';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-neon-purple/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-neon-blue/20 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Animated stars */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse-glow"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient">Explore</span> o Futuro <br/>
              <span className="text-white">dos NFTs Espaciais</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-xl">
              Entre na jornada interplanetária com nossa coleção exclusiva de NFTs. 
              Adquira, comercialize e explore o universo JOGO.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <NeonButton>Explorar Coleção</NeonButton>
              <NeonButton variant="outline">Saiba mais</NeonButton>
            </div>
            <div className="flex items-center gap-6 pt-6">
              <div>
                <p className="text-3xl font-bold text-neon-blue">3.7K+</p>
                <p className="text-gray-400">NFTs Criados</p>
              </div>
              <div className="h-10 w-px bg-gray-700"></div>
              <div>
                <p className="text-3xl font-bold text-neon-purple">18K+</p>
                <p className="text-gray-400">Usuários</p>
              </div>
              <div className="h-10 w-px bg-gray-700"></div>
              <div>
                <p className="text-3xl font-bold text-neon-pink">230+</p>
                <p className="text-gray-400">Artistas</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border border-neon-purple/30 animate-float">
              <div className="absolute inset-0 bg-space-bg neon-border"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://cdn.midjourney.com/e531f614-7d83-4b4e-adca-3d287a8d46bf/0_3.webp" 
                  alt="NFT Espacial" 
                  className="object-cover" 
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 animate-float" style={{animationDelay: "1.5s"}}>
              <div className="w-36 h-36 rounded-lg overflow-hidden border border-neon-blue/30">
                <div className="absolute inset-0 bg-space-bg neon-border"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://cdn.midjourney.com/fde6ce37-72e7-4bf7-a3cf-845937e231e5/0_1.webp" 
                    alt="NFT Espacial Pequeno" 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
