
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Roadmap = () => {
  const roadmapItems = [
    {
      quarter: "Q2 2025",
      title: "Lançamento Inicial",
      color: "border-neon-blue/30",
      items: [
        "Versão beta pública do Jogo do Número Secreto",
        "Sistema básico de ranking",
        "Interface futurista temática espacial",
        "Marketplace de tokens fictícios"
      ],
      status: "Completo"
    },
    {
      quarter: "Q3 2025",
      title: "Expansão Social",
      color: "border-neon-purple/30",
      items: [
        "Modo multijogador em tempo real",
        "Desafios diários com recompensas",
        "Perfis personalizáveis de jogador",
        "Sistema de amigos e convites"
      ],
      status: "Em Desenvolvimento"
    },
    {
      quarter: "Q4 2025",
      title: "Experiência Avançada",
      color: "border-green-500/30",
      items: [
        "Novos modos de jogo com diferentes regras",
        "Sistema de conquistas com recompensas",
        "Eventos sazonais temáticos",
        "Integração com plataformas de streaming"
      ],
      status: "Planejado"
    },
    {
      quarter: "Q1 2026",
      title: "Expansão Multiplataforma",
      color: "border-yellow-500/30",
      items: [
        "Lançamento da versão mobile (iOS e Android)",
        "Sincronização de progresso entre dispositivos",
        "Mini-jogos exclusivos para mobile",
        "Notificações push para eventos e desafios"
      ],
      status: "Planejado"
    },
    {
      quarter: "Q2 2026",
      title: "Universo Expandido",
      color: "border-pink-500/30",
      items: [
        "Modo história com personagens e narrativa",
        "Sistema de liga competitiva com temporadas",
        "Torneios semanais com prêmios",
        "Colaborações com outros jogos e marcas"
      ],
      status: "Visão Futura"
    },
    {
      quarter: "Q3 2026",
      title: "Inovação Tecnológica",
      color: "border-orange-500/30",
      items: [
        "Integração com tecnologias de IA para dicas personalizadas",
        "Modo de realidade aumentada para mobile",
        "Sistema de análise de desempenho avançado",
        "Suporte para dispositivos de realidade virtual"
      ],
      status: "Visão Futura"
    }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completo":
        return "bg-green-500";
      case "Em Desenvolvimento":
        return "bg-blue-500";
      case "Planejado":
        return "bg-yellow-500";
      default:
        return "bg-purple-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Roadmap</span> do Projeto
          </h1>
          
          <p className="text-lg text-gray-300 max-w-3xl mb-12">
            Conheça nossos planos para o futuro do Jogo do Número Secreto. 
            Estamos constantemente trabalhando para trazer novas funcionalidades e melhorias.
          </p>
          
          <div className="relative">
            {/* Linha vertical do tempo */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-neon-blue/30 z-0"></div>
            
            <div className="space-y-12 relative">
              {roadmapItems.map((item, index) => (
                <div key={index} className="relative z-10">
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'}`}>
                    <div className={`bg-space-darker p-6 rounded-lg border ${item.color} relative`}>
                      {/* Indicador de tempo conectando à linha central */}
                      <div className="absolute top-1/2 -translate-y-1/2 md:block hidden 
                        w-8 h-1 bg-neon-blue/30
                        ${index % 2 === 0 ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'}"></div>
                      
                      {/* Círculo na linha do tempo */}
                      <div className="absolute top-1/2 -translate-y-1/2 md:block hidden
                        w-5 h-5 rounded-full bg-space-dark border-2 border-neon-blue
                        ${index % 2 === 0 ? 'left-0 -ml-[18px] -translate-x-full' : 'right-0 -mr-[18px] translate-x-full'}"></div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">{item.quarter}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(item.status)} text-white`}>
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <ul className="space-y-2">
                        {item.items.map((listItem, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-neon-blue mr-2 mt-1">✓</span>
                            <span className="text-gray-300">{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Tem sugestões para nosso roadmap?</h2>
            <p className="text-gray-300 mb-6">
              Adoramos ouvir nossos jogadores! Envie suas ideias e ajude a moldar o futuro do jogo.
            </p>
            <a 
              href="mailto:hyuryoficial@gmail.com" 
              className="inline-flex items-center px-6 py-3 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/30 rounded-md text-white transition-colors"
            >
              Enviar sugestão
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Roadmap;
