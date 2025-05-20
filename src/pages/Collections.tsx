
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

const Collections = () => {
  const achievements = [
    { 
      name: "Primeira Tentativa", 
      description: "Acertou o número secreto na primeira tentativa!", 
      rarity: "Lendário",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      icon: "🏆"
    },
    { 
      name: "Vidente", 
      description: "Acertou 3 números secretos seguidos em menos de 5 tentativas cada.", 
      rarity: "Épico",
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
      icon: "🔮"
    },
    { 
      name: "Persistente", 
      description: "Conseguiu acertar após mais de 15 tentativas.", 
      rarity: "Comum",
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      icon: "💪"
    },
    { 
      name: "Mentalista", 
      description: "Acertou 5 números secretos em sequência.", 
      rarity: "Raro",
      color: "bg-gradient-to-r from-green-400 to-green-600",
      icon: "🧠"
    },
    { 
      name: "Sortudo", 
      description: "Acertou um número que tinha menos de 1% de chance.", 
      rarity: "Épico",
      color: "bg-gradient-to-r from-pink-500 to-pink-700",
      icon: "🍀"
    },
    { 
      name: "Mestre dos Números", 
      description: "Completou 100 jogos.", 
      rarity: "Lendário",
      color: "bg-gradient-to-r from-red-500 to-orange-500",
      icon: "👑"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">Coleções</span> de Conquistas
          </h1>
          
          <p className="text-gray-300 text-lg max-w-3xl mb-10">
            Desbloqueie emblemas especiais de conquistas ao jogar e vencer desafios no Jogo do Número Secreto. 
            Colecione todos e mostre sua habilidade!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-space-darker border border-neon-blue/20 rounded-lg p-6 hover:border-neon-blue/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${achievement.color} rounded-full flex items-center justify-center text-2xl`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{achievement.name}</h3>
                    <Badge variant="secondary" className="mt-1">{achievement.rarity}</Badge>
                  </div>
                </div>
                <p className="text-gray-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
