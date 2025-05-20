
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NeonButton from '@/components/NeonButton';
import { useToast } from '@/components/ui/use-toast';

const Marketplace = () => {
  const { toast } = useToast();

  const tokens = [
    {
      id: 1,
      name: "Dica Básica",
      credits: 10,
      price: "5,00",
      description: "Receba uma dica simples que reduz o intervalo de busca em 10%",
      color: "border-blue-500/30",
      glow: "shadow-blue-500/20",
      benefits: ["1 dica por compra", "Validade: 7 dias"]
    },
    {
      id: 2,
      name: "Dica Avançada",
      credits: 30,
      price: "12,00",
      description: "Receba uma dica precisa que reduz o intervalo de busca em 25%",
      color: "border-purple-500/30",
      glow: "shadow-purple-500/20",
      benefits: ["1 dica por compra", "Validade: 15 dias"]
    },
    {
      id: 3,
      name: "Pacote Premium",
      credits: 100,
      price: "25,00",
      description: "Créditos premium para múltiplas dicas e recursos exclusivos",
      color: "border-yellow-500/30",
      glow: "shadow-yellow-500/20",
      benefits: ["Até 10 dicas por jogo", "Validade: 30 dias", "Acesso a temas exclusivos"]
    },
    {
      id: 4,
      name: "Pacote Ilimitado",
      credits: "∞",
      price: "50,00",
      description: "Dicas ilimitadas para dominar o jogo com facilidade",
      color: "border-neon-pink/30",
      glow: "shadow-pink-500/20",
      benefits: ["Dicas ilimitadas", "Validade: 60 dias", "Acesso a todos os recursos premium", "Posição destacada no ranking"]
    },
    {
      id: 5,
      name: "Bônus de Chance",
      credits: 5,
      price: "2,50",
      description: "Um bônus que oferece uma chance extra em caso de erro",
      color: "border-green-500/30",
      glow: "shadow-green-500/20",
      benefits: ["1 chance extra", "Uso único", "Validade: 3 dias"]
    },
    {
      id: 6,
      name: "Pacote VIP",
      credits: 500,
      price: "100,00",
      description: "O pacote definitivo para jogadores dedicados com recursos exclusivos",
      color: "border-neon-blue/30",
      glow: "shadow-blue-500/20",
      benefits: ["Dicas ilimitadas", "Validade: 1 ano", "Todos os benefícios premium", "Emblemas exclusivos", "Suporte prioritário"]
    }
  ];

  const handleBuyToken = (tokenName: string, tokenPrice: string) => {
    toast({
      title: "Compra fictícia realizada!",
      description: `Você comprou ${tokenName} por R$ ${tokenPrice}. Este é um marketplace fictício para demonstração.`,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Marketplace</span> JOGO
          </h1>
          
          <p className="text-lg text-gray-300 max-w-3xl mb-12">
            Adquira tokens especiais para melhorar sua experiência no Jogo do Número Secreto. 
            Receba dicas valiosas e aumente suas chances de vencer! 
            <span className="text-neon-blue"> (Marketplace fictício apenas para demonstração)</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokens.map((token) => (
              <div 
                key={token.id} 
                className={`bg-space-darker ${token.color} hover:${token.glow} border rounded-lg p-6 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{token.name}</h3>
                  <div className="bg-space-accent/50 px-3 py-1 rounded text-white font-bold">
                    {typeof token.credits === "string" ? token.credits : `${token.credits} créditos`}
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4 h-12">{token.description}</p>
                
                <div className="space-y-2 mb-6">
                  {token.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <span className="text-neon-blue mr-2">✓</span>
                      {benefit}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-white">R$ {token.price}</div>
                  <NeonButton 
                    variant={token.id === 4 || token.id === 6 ? "secondary" : "primary"} 
                    onClick={() => handleBuyToken(token.name, token.price)}
                  >
                    Comprar
                  </NeonButton>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-space-darker border border-neon-blue/20 rounded-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Como funciona?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center text-neon-blue text-2xl mx-auto mb-3">1</div>
                <h3 className="font-bold mb-2">Escolha seu token</h3>
                <p className="text-gray-400 text-sm">Selecione o token que melhor se adapta às suas necessidades de jogo</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center text-neon-blue text-2xl mx-auto mb-3">2</div>
                <h3 className="font-bold mb-2">Realize o pagamento</h3>
                <p className="text-gray-400 text-sm">Marketplace fictício! Nenhum pagamento real é processado</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center text-neon-blue text-2xl mx-auto mb-3">3</div>
                <h3 className="font-bold mb-2">Use durante o jogo</h3>
                <p className="text-gray-400 text-sm">Utilize seus créditos para obter dicas e vantagens no jogo</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
