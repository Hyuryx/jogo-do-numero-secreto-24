
import React, { useState, useEffect } from 'react';
import NeonButton from './NeonButton';
import { Link as ScrollLink } from 'react-scroll';
import { useTheme } from '@/contexts/ThemeContext';
import { Avatar, AvatarFallback } from './ui/avatar';

const Hero = () => {
  const { theme } = useTheme();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [location, setLocation] = useState("Buscando localização...");

  // Array of motivational quotes from inventors and creators
  const quotes = [
    { text: "A imaginação é mais importante que o conhecimento.", author: "Albert Einstein" },
    { text: "A melhor maneira de prever o futuro é inventá-lo.", author: "Alan Kay" },
    { text: "Não tenha medo de falhar. Tenha medo de não tentar.", author: "Roy T. Bennett" },
    { text: "A persistência é o caminho do êxito.", author: "Charles Chaplin" },
    { text: "Todo progresso acontece fora da zona de conforto.", author: "Michael John Bobak" },
    { text: "Se você pode sonhar, você pode realizar.", author: "Walt Disney" },
    { text: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", author: "Robert Collier" },
    { text: "O fracasso é a oportunidade de começar de novo, com mais inteligência.", author: "Henry Ford" },
    { text: "Não é a carga que o derruba, mas a maneira como você a carrega.", author: "Lou Holtz" },
    { text: "A inovação distingue entre um líder e um seguidor.", author: "Steve Jobs" },
    { text: "Tudo é possível quando você acredita.", author: "Thomas Edison" },
    { text: "A verdadeira genialidade reside na capacidade de avaliar informações incertas e contraditórias.", author: "Winston Churchill" },
    { text: "O segredo para seguir em frente é começar.", author: "Mark Twain" },
    { text: "Cada dia é uma nova oportunidade para mudar sua vida.", author: "Ken Poirot" },
    { text: "A distância entre a insanidade e a genialidade é medida pelo sucesso.", author: "Bruce Feirstein" }
  ];

  useEffect(() => {
    // Select a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote.text);
    setAuthor(randomQuote.author);
    
    // Update time and date
    const updateTimeDate = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString('pt-BR'));
    };
    
    updateTimeDate();
    const timeInterval = setInterval(updateTimeDate, 1000);
    
    // Get user location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || '';
            const state = data.address.state || '';
            const country = data.address.country || '';
            
            setLocation(`${city}${city && state ? ', ' : ''}${state}${(city || state) && country ? ' - ' : ''}${country}`);
          } catch (error) {
            setLocation("Local desconhecido");
            console.error("Error fetching location:", error);
          }
        },
        () => {
          setLocation("Localização não disponível");
        }
      );
    } else {
      setLocation("Geolocalização não suportada");
    }
    
    return () => clearInterval(timeInterval);
  }, []);

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
                  {/* Motivational Quote instead of planet image */}
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="p-8 backdrop-blur-sm bg-space-darker/30 rounded-xl border border-neon-purple/20 max-w-md">
                        <p className="text-2xl md:text-3xl font-bold text-gradient mb-4">{quote}</p>
                        <p className="text-xl text-neon-blue">— {author}</p>
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
                  {/* Time, date, and location instead of avatar */}
                  <div className="relative p-3">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-neon-blue text-xl font-bold">{currentTime}</span>
                      <span className="text-white/80 text-sm">{currentDate}</span>
                      <div className="w-full h-px bg-neon-purple/30 my-2"></div>
                      <span className="text-neon-pink text-xs leading-tight">{location}</span>
                    </div>
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
