
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
                  {/* Universo futurístico com galáxia */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-neon-blue/20 animate-pulse-glow" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-2 rounded-full bg-space-darker"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl font-bold text-neon-blue animate-float" style={{ animationDuration: '4s' }}>?</div>
                    </div>
                    {/* Pequenos planetas/estrelas orbitando */}
                    <div className="absolute w-3 h-3 bg-neon-purple rounded-full" 
                      style={{
                        top: '20%',
                        left: '15%',
                        boxShadow: '0 0 15px 5px rgba(155, 48, 255, 0.5)',
                        animation: 'float 7s ease-in-out infinite'
                      }}
                    ></div>
                    <div className="absolute w-2 h-2 bg-neon-pink rounded-full" 
                      style={{
                        bottom: '25%',
                        right: '20%',
                        boxShadow: '0 0 10px 3px rgba(255, 44, 223, 0.5)',
                        animation: 'float 5s ease-in-out infinite reverse'
                      }}
                    ></div>
                    {/* Anéis */}
                    <div className="absolute inset-4 border-4 border-neon-blue/10 rounded-full"
                      style={{transform: 'rotate(25deg)'}}
                    ></div>
                    <div className="absolute inset-8 border-2 border-neon-purple/10 rounded-full"
                      style={{transform: 'rotate(-15deg)'}}
                    ></div>
                  </div>
                  <div className="text-xl text-white light:text-space-dark mt-8">Qual é o número secreto?</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 animate-float" style={{animationDelay: "1.5s"}}>
              <div className="w-36 h-36 rounded-lg overflow-hidden border border-neon-blue/30">
                <div className="absolute inset-0 bg-space-bg dark:bg-space-bg light:bg-gradient-to-br light:from-blue-50 light:to-purple-50 neon-border"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Avatar futurista animado */}
                  <div className="relative">
                    <Avatar className="w-24 h-24 bg-space-darker border-2 border-neon-purple/40">
                      <AvatarFallback className="bg-transparent">
                        <div className="relative w-full h-full">
                          {/* Rosto robótico */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-5xl font-bold text-neon-purple animate-pulse-glow" style={{ animationDuration: '2s' }}>?</div>
                          </div>
                          {/* Efeitos de luz */}
                          <div className="absolute w-full h-1 bg-neon-blue/50 top-1/3 rounded-full animate-pulse-glow" style={{ animationDuration: '1.5s' }}></div>
                          <div className="absolute w-full h-1 bg-neon-pink/50 bottom-1/3 rounded-full animate-pulse-glow" style={{ animationDuration: '2.2s' }}></div>
                          {/* Círculos concêntricos animados */}
                          <div className="absolute inset-1 rounded-full border border-neon-blue/20 animate-pulse-glow" style={{ animationDuration: '3s' }}></div>
                          <div className="absolute inset-3 rounded-full border border-neon-purple/20 animate-pulse-glow" style={{ animationDuration: '4s' }}></div>
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
