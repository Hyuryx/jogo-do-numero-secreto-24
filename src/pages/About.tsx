
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">Sobre o</span> JOGO
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-space-darker p-2 rounded-lg">
                <TabsTrigger value="about">Sobre</TabsTrigger>
                <TabsTrigger value="history">História</TabsTrigger>
                <TabsTrigger value="team">Nossa Equipe</TabsTrigger>
                <TabsTrigger value="mission">Missão</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6 p-6 bg-space-dark/50 border border-neon-blue/20 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-neon-blue">O Jogo do Número Secreto</h2>
                <p className="text-gray-300">
                  O Jogo do Número Secreto é uma aventura intergaláctica de adivinhação onde sua percepção e 
                  estratégia são suas maiores armas. Em um universo dominado por algoritmos quânticos, você precisa 
                  decifrar o código numérico secreto antes que o tempo acabe.
                </p>
                <p className="text-gray-300 mt-4">
                  Com uma jogabilidade simples mas viciante, o jogo desafia sua intuição e capacidade analítica. 
                  Cada palpite fornece pistas valiosas: "maior", "menor" ou o glorioso "acertou!". 
                  O objetivo é acertar com o menor número de tentativas possível para alcançar o 
                  topo do ranking galáctico.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-space-darker rounded-lg border border-neon-purple/20">
                    <div className="text-3xl text-neon-purple mb-2">🎮</div>
                    <h3 className="font-bold">Divertido</h3>
                  </div>
                  <div className="text-center p-4 bg-space-darker rounded-lg border border-neon-blue/20">
                    <div className="text-3xl text-neon-blue mb-2">🧠</div>
                    <h3 className="font-bold">Estratégico</h3>
                  </div>
                  <div className="text-center p-4 bg-space-darker rounded-lg border border-neon-pink/20">
                    <div className="text-3xl text-neon-pink mb-2">🏆</div>
                    <h3 className="font-bold">Competitivo</h3>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="mt-6 p-6 bg-space-dark/50 border border-neon-blue/20 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-neon-blue">A História do Jogo</h2>
                <p className="text-gray-300">
                  O Jogo do Número Secreto surgiu de uma antiga lenda espacial que conta a história de um cientista 
                  que criou um algoritmo capaz de prever o futuro através de sequências numéricas. O segredo deste 
                  algoritmo estaria escondido em um número específico que muda a cada ciclo lunar.
                </p>
                <p className="text-gray-300 mt-4">
                  Desenvolvido inicialmente como uma ferramenta de treinamento para pilotos estelares aprimorarem 
                  sua capacidade de análise rápida, o jogo logo se tornou uma febre nas estações espaciais e colonias 
                  em todo o sistema solar.
                </p>
                <p className="text-gray-300 mt-4">
                  Hoje, o Jogo do Número Secreto é conhecido em todos os cantos da galáxia como a maneira mais 
                  divertida de treinar o cérebro e competir com amigos em busca da glória intergaláctica.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-neon-purple/20 text-neon-purple text-sm">
                    Lançado em 2025 • Jogado por mais de 1 milhão de pessoas
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="mt-6 p-6 bg-space-dark/50 border border-neon-blue/20 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-neon-blue">Nossa Equipe</h2>
                <p className="text-gray-300">
                  Somos uma equipe apaixonada por desenvolvimento de software e jogos digitais, liderada 
                  por Hyury Alexandre, um desenvolvedor de 32 anos formado em Análise e Desenvolvimento de Sistemas.
                </p>
                <p className="text-gray-300 mt-4">
                  Baseados no Rio de Janeiro, Brasil, trabalhamos constantemente para criar experiências digitais 
                  envolventes e inovadoras. Nossa equipe de desenvolvedores está sempre buscando novos desafios 
                  e maneiras criativas de entreter jogadores em todo o mundo.
                </p>
                <p className="text-gray-300 mt-4">
                  Atualmente, focamos no desenvolvimento de softwares e aplicativos que combinam diversão 
                  e aprendizado, sempre com uma identidade visual única e futurista.
                </p>
                <div className="mt-6 flex justify-center">
                  <a 
                    href="https://github.com/Hyuryx?tab=repositories" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Veja nossos projetos no GitHub
                  </a>
                </div>
              </TabsContent>
              
              <TabsContent value="mission" className="mt-6 p-6 bg-space-dark/50 border border-neon-blue/20 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-neon-blue">Nossa Missão</h2>
                <p className="text-gray-300">
                  Nossa missão é criar jogos e aplicativos que não apenas entretêm, mas também estimulam 
                  o raciocínio lógico e a capacidade analítica dos jogadores, tudo isso em um ambiente 
                  visualmente deslumbrante e futurista.
                </p>
                <p className="text-gray-300 mt-4">
                  Acreditamos que os jogos podem ser mais do que simples passatempos — podem ser ferramentas 
                  de aprendizado, conexão social e desenvolvimento pessoal. O Jogo do Número Secreto representa 
                  esta filosofia em sua forma mais pura, combinando diversão e desafio mental.
                </p>
                <div className="mt-8 bg-space-darker p-6 rounded-lg border border-neon-purple/20">
                  <h3 className="font-bold text-xl text-neon-purple mb-2">Nossos Valores</h3>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Inovação contínua em design e jogabilidade</li>
                    <li>Acessibilidade para jogadores de todos os níveis</li>
                    <li>Comunidade participativa e colaborativa</li>
                    <li>Experiências digitais seguras e confiáveis</li>
                    <li>Estímulo ao pensamento crítico e estratégico</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
