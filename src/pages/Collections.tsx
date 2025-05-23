
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Collections = () => {
  const universalAchievements = [
    { 
      name: "Explorador", 
      description: "Jogou todos os tipos de jogos disponíveis na plataforma.", 
      rarity: "Raro",
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      icon: "🌎"
    },
    { 
      name: "Maratonista", 
      description: "Jogou por mais de 5 horas em um único dia.", 
      rarity: "Épico",
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
      icon: "⏱️"
    },
    { 
      name: "Desafiador", 
      description: "Completou 50 jogos no total (qualquer tipo).", 
      rarity: "Comum",
      color: "bg-gradient-to-r from-green-400 to-green-600",
      icon: "🏅"
    },
    { 
      name: "Viciado", 
      description: "Jogou todos os dias por uma semana seguida.", 
      rarity: "Raro",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      icon: "📅"
    },
    { 
      name: "Lendário", 
      description: "Acumulou mais de 10.000 pontos no total.", 
      rarity: "Lendário",
      color: "bg-gradient-to-r from-red-500 to-orange-500",
      icon: "👑"
    },
    { 
      name: "Colecionador", 
      description: "Desbloqueou 15 conquistas de qualquer tipo.", 
      rarity: "Épico",
      color: "bg-gradient-to-r from-pink-500 to-pink-700",
      icon: "🏆"
    }
  ];

  const numberGameAchievements = [
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

  const quizAchievements = [
    { 
      name: "Einstein", 
      description: "Respondeu corretamente 10 perguntas seguidas no Quiz.", 
      rarity: "Épico",
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
      icon: "🧪"
    },
    { 
      name: "Conhecimento Diversificado", 
      description: "Acertou perguntas em 5 categorias diferentes.", 
      rarity: "Raro",
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      icon: "📚"
    },
    { 
      name: "Velocista", 
      description: "Respondeu corretamente uma pergunta em menos de 3 segundos.", 
      rarity: "Comum",
      color: "bg-gradient-to-r from-green-400 to-green-600",
      icon: "⚡"
    },
    { 
      name: "Especialista", 
      description: "Acertou todas as perguntas de uma categoria específica.", 
      rarity: "Épico",
      color: "bg-gradient-to-r from-pink-500 to-pink-700",
      icon: "🎓"
    }
  ];

  const wordGameAchievements = [
    { 
      name: "Vocabulário Vasto", 
      description: "Acertou 10 palavras diferentes no Jogo da Forca.", 
      rarity: "Raro",
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      icon: "📝"
    },
    { 
      name: "Caçador de Palavras", 
      description: "Encontrou 20 palavras no Caça-Palavras.", 
      rarity: "Épico",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      icon: "🔍"
    },
    { 
      name: "Sobrevivente", 
      description: "Ganhou o Jogo da Forca com apenas uma vida restante.", 
      rarity: "Raro",
      color: "bg-gradient-to-r from-red-500 to-orange-500",
      icon: "❤️"
    }
  ];

  const strategicAchievements = [
    { 
      name: "Invicto", 
      description: "Ganhou 5 partidas seguidas no Jogo da Velha.", 
      rarity: "Raro",
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      icon: "🎮"
    },
    { 
      name: "Estrategista", 
      description: "Completou um Sudoku difícil em menos de 10 minutos.", 
      rarity: "Épico",
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
      icon: "🧩"
    },
    { 
      name: "Mestre da Memória", 
      description: "Completou o Jogo da Memória sem cometer nenhum erro.", 
      rarity: "Lendário",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      icon: "🧠"
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
            Desbloqueie emblemas especiais de conquistas ao jogar e vencer desafios em nossos jogos. 
            Colecione todos e mostre sua habilidade!
          </p>
          
          <Tabs defaultValue="universal" className="mb-8">
            <TabsList className="mb-6 bg-space-darker/80 border border-neon-purple/30">
              <TabsTrigger value="universal" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">
                Universais
              </TabsTrigger>
              <TabsTrigger value="numberGame" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">
                Jogo dos Números
              </TabsTrigger>
              <TabsTrigger value="quizGame" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">
                Quiz
              </TabsTrigger>
              <TabsTrigger value="wordGame" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">
                Jogos de Palavras
              </TabsTrigger>
              <TabsTrigger value="strategicGame" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">
                Jogos Estratégicos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="universal">
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">Conquistas Universais</h2>
              <p className="text-gray-300 mb-6">Estas conquistas podem ser obtidas em qualquer jogo da plataforma.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {universalAchievements.map((achievement, index) => (
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
            </TabsContent>
            
            <TabsContent value="numberGame">
              <h2 className="text-2xl font-bold mb-4 text-neon-purple">Conquistas do Jogo dos Números</h2>
              <p className="text-gray-300 mb-6">Conquistas específicas para o Jogo do Número Secreto.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {numberGameAchievements.map((achievement, index) => (
                  <div key={index} className="bg-space-darker border border-neon-purple/20 rounded-lg p-6 hover:border-neon-purple/50 transition-colors">
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
            </TabsContent>
            
            <TabsContent value="quizGame">
              <h2 className="text-2xl font-bold mb-4 text-neon-pink">Conquistas dos Jogos de Quiz</h2>
              <p className="text-gray-300 mb-6">Conquistas específicas para os jogos de Quiz e Quiz Show.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizAchievements.map((achievement, index) => (
                  <div key={index} className="bg-space-darker border border-neon-pink/20 rounded-lg p-6 hover:border-neon-pink/50 transition-colors">
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
            </TabsContent>
            
            <TabsContent value="wordGame">
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">Conquistas dos Jogos de Palavras</h2>
              <p className="text-gray-300 mb-6">Conquistas específicas para o Jogo da Forca e Caça-Palavras.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wordGameAchievements.map((achievement, index) => (
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
            </TabsContent>
            
            <TabsContent value="strategicGame">
              <h2 className="text-2xl font-bold mb-4 text-neon-purple">Conquistas dos Jogos Estratégicos</h2>
              <p className="text-gray-300 mb-6">Conquistas específicas para o Jogo da Velha, Memória e Sudoku.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {strategicAchievements.map((achievement, index) => (
                  <div key={index} className="bg-space-darker border border-neon-purple/20 rounded-lg p-6 hover:border-neon-purple/50 transition-colors">
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
