
import React from 'react';
import NeonButton from './NeonButton';
import { Link as ScrollLink } from 'react-scroll';
import { useTheme } from '@/contexts/ThemeContext';
import { Avatar, AvatarFallback } from './ui/avatar';

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-[80vh] flex items-center pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-neon-purple/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-neon-blue/20 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Animated stars */}
      <div className="absolute inset-0 -z-10 dark:block light:hidden">
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
              <span className="text-gradient">JOGO DO</span> <br/>
              <span className="text-white light:text-space-dark">NÚMERO SECRETO</span>
            </h1>
            <p className="text-gray-300 light:text-gray-700 text-lg md:text-xl max-w-xl">
              Teste sua sorte e habilidade adivinhando o número secreto. 
              Use dicas, compare seu desempenho no ranking e divirta-se neste desafio espacial.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <ScrollLink to="game-section" smooth={true} duration={500}>
                <NeonButton>Jogar Agora</NeonButton>
              </ScrollLink>
              <ScrollLink to="how-to-play-section" smooth={true} duration={500}>
                <NeonButton variant="outline">Como Jogar</NeonButton>
              </ScrollLink>
            </div>
            <div className="flex items-center gap-6 pt-6">
              <div>
                <p className="text-3xl font-bold text-neon-blue">1-2000</p>
                <p className="text-gray-400 light:text-gray-600">Faixa de Números</p>
              </div>
              <div className="h-10 w-px bg-gray-700 light:bg-gray-300"></div>
              <div>
                <p className="text-3xl font-bold text-neon-purple">∞</p>
                <p className="text-gray-400 light:text-gray-600">Tentativas</p>
              </div>
              <div className="h-10 w-px bg-gray-700 light:bg-gray-300"></div>
              <div>
                <p className="text-3xl font-bold text-neon-pink">Top 5</p>
                <p className="text-gray-400 light:text-gray-600">Ranking</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border border-neon-purple/30 animate-float">
              <div className="absolute inset-0 bg-space-bg dark:bg-space-bg light:bg-gradient-to-br light:from-blue-50 light:to-purple-50 neon-border"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  {/* Imagem de galáxia e planeta, inspirada nas referências */}
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-60 h-60">
                        {/* Planeta com efeitos de luz */}
                        <div className="absolute inset-0 rounded-full bg-blue-900/70 overflow-hidden flex items-center justify-center">
                          {/* Textura do planeta */}
                          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_10%,transparent_70%)]"></div>
                          
                          {/* Brilho do sol */}
                          <div className="absolute -right-10 top-10 w-20 h-20 bg-yellow-400/70 rounded-full blur-xl"></div>
                          
                          {/* Número secreto como um brilho */}
                          <div className="text-8xl font-bold text-white opacity-90 text-shadow-lg animate-pulse-slow">?</div>
                        </div>
                        
                        {/* Anéis do planeta */}
                        <div className="absolute inset-4 border border-blue-300/30 rounded-full" style={{transform: 'rotate(25deg)'}}></div>
                        <div className="absolute inset-10 border border-purple-300/20 rounded-full" style={{transform: 'rotate(-15deg)'}}></div>
                        
                        {/* Estrelas no fundo */}
                        {[...Array(15)].map((_, i) => (
                          <div 
                            key={i}
                            className="absolute bg-white rounded-full animate-twinkle"
                            style={{
                              width: `${Math.random() * 2 + 1}px`,
                              height: `${Math.random() * 2 + 1}px`,
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 3}s`,
                              opacity: Math.random() * 0.8 + 0.2
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-xl text-white light:text-space-dark mt-8">Qual é o número secreto?</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 animate-float" style={{animationDelay: "1.5s"}}>
              <div className="w-36 h-36 rounded-lg overflow-hidden border border-neon-blue/30">
                <div className="absolute inset-0 bg-space-bg dark:bg-space-bg light:bg-gradient-to-br light:from-blue-50 light:to-purple-50 neon-border"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Avatar futurista animado inspirado na segunda imagem de referência */}
                  <div className="relative">
                    <Avatar className="w-24 h-24 bg-space-darker border-2 border-neon-blue/40">
                      <AvatarFallback className="bg-transparent">
                        <div className="relative w-full h-full">
                          {/* Face com brilhos neon */}
                          <div className="absolute inset-2 rounded-full bg-gradient-to-b from-teal-300/90 to-blue-500/90 flex items-center justify-center">
                            {/* Detalhes do capacete/visor */}
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                              <div className="absolute w-full h-1/2 top-1/4 bg-blue-900/50"></div>
                              <div className="absolute w-3/4 h-3/4 top-1/8 left-1/8 rounded-full bg-gradient-to-tr from-teal-400/30 to-transparent"></div>
                              {/* Olhos grandes e expressivos */}
                              <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full"></div>
                              {/* Sorriso sutil */}
                              <div className="absolute bottom-1/3 w-6 h-1 bg-white/70 rounded-full" style={{left: 'calc(50% - 3px)'}}></div>
                            </div>
                          </div>
                          
                          {/* Efeitos luminosos que dão a ideia de tecnologia */}
                          <div className="absolute w-full h-1 bg-teal-400/80 top-1/3 rounded-full animate-pulse-glow" style={{ animationDuration: '1.5s' }}></div>
                          <div className="absolute w-full h-1 bg-blue-400/80 bottom-1/3 rounded-full animate-pulse-glow" style={{ animationDuration: '2.2s' }}></div>
                          
                          {/* Circuitos luminosos */}
                          <div className="absolute w-1 h-8 bg-teal-400/50 bottom-0 left-1/4 rounded-full animate-pulse-glow" style={{ animationDuration: '1.8s' }}></div>
                          <div className="absolute w-1 h-8 bg-teal-400/50 bottom-0 right-1/4 rounded-full animate-pulse-glow" style={{ animationDuration: '2.4s' }}></div>
                        </div>
                      </AvatarFallback>
                    </Avatar>
                  </div>
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
