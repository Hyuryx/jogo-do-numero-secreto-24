
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">Termos de Serviço</span>
          </h1>
          
          <div className="prose prose-invert max-w-4xl mx-auto">
            <p className="text-gray-300">
              Última atualização: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">1. Termos</h2>
            <p className="text-gray-300">
              Ao acessar o site Jogo do Número Secreto, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. Uso de Licença</h2>
            <p className="text-gray-300">
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Jogo do Número Secreto, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 text-gray-300">
              <li>Modificar ou copiar os materiais;</li>
              <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública;</li>
              <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site;</li>
              <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
              <li>Transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">3. Isenção de responsabilidade</h2>
            <p className="text-gray-300">
              Os materiais no site da Jogo do Número Secreto são fornecidos 'como estão'. O Jogo do Número Secreto não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Limitações</h2>
            <p className="text-gray-300">
              Em nenhum caso o Jogo do Número Secreto ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em seu site, mesmo que o Jogo do Número Secreto ou um representante autorizado tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. Modificações dos Termos</h2>
            <p className="text-gray-300">
              O Jogo do Número Secreto pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
