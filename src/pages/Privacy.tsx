
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">Política de Privacidade</span>
          </h1>
          
          <div className="prose prose-invert max-w-4xl mx-auto">
            <p className="text-gray-300">
              Última atualização: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">1. Informações que coletamos</h2>
            <p className="text-gray-300">
              Coletamos informações pessoais limitadas quando você usa o Jogo do Número Secreto. Estas informações podem incluir:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 text-gray-300">
              <li>Seu nome ou apelido de jogador</li>
              <li>Endereço de e-mail (se você optar por se inscrever na nossa newsletter)</li>
              <li>Detalhes da partida, como pontuações e estatísticas de jogo</li>
              <li>Informações de uso, como interações no jogo e tempos de sessão</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. Como usamos suas informações</h2>
            <p className="text-gray-300">
              Usamos as informações que coletamos para:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 text-gray-300">
              <li>Proporcionar, manter e melhorar o jogo</li>
              <li>Criar e manter um ranking de jogadores</li>
              <li>Enviar atualizações e novidades sobre o jogo (apenas para usuários inscritos)</li>
              <li>Analisar padrões de uso para melhorar a experiência</li>
              <li>Proteger contra atividades fraudulentas ou abusivas</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">3. Cookies e tecnologias semelhantes</h2>
            <p className="text-gray-300">
              Utilizamos o armazenamento local (localStorage) para salvar seu nome de jogador e preferências, o que melhora sua experiência ao evitar a necessidade de reinseri-los a cada visita. Estas informações são armazenadas apenas no seu dispositivo e não são enviadas para nossos servidores.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Compartilhamento de informações</h2>
            <p className="text-gray-300">
              Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto conforme descrito nesta política de privacidade. Isto não inclui parceiros de hospedagem confiáveis e outras partes que nos auxiliam na operação do nosso site e na condução dos nossos negócios, desde que essas partes concordem em manter essas informações confidenciais.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. Seus direitos</h2>
            <p className="text-gray-300">
              Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco através do e-mail: hyuryoficial@gmail.com
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">6. Alterações na política de privacidade</h2>
            <p className="text-gray-300">
              Podemos atualizar nossa política de privacidade periodicamente. Recomendamos que você revise esta página regularmente para manter-se informado sobre quaisquer alterações.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">7. Contato</h2>
            <p className="text-gray-300">
              Se você tiver alguma dúvida sobre esta política de privacidade, entre em contato conosco pelo e-mail: hyuryoficial@gmail.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
