
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      // Redirect to GitHub
      window.open('https://github.com/Hyuryx?tab=repositories', '_blank');
      toast({
        title: "Inscrição realizada!",
        description: "Você foi redirecionado para o GitHub. Obrigado por se inscrever!",
        duration: 3000,
      });
      setEmail('');
    } else {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um endereço de email válido.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <footer className="bg-space-darker border-t border-neon-blue/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold text-gradient">JOGO</span>
            </Link>
            <p className="text-gray-400 mb-6">
              A plataforma definitiva para o Jogo do Número Secreto, com desafios empolgantes e experiências digitais futuristas.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/Hyuryx?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="mailto:hyuryoficial@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Produtos</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Coleções
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Criadores
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Empresa</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Fique por dentro de todas as novidades e atualizações do Jogo do Número Secreto.
            </p>
            <form className="space-y-4" onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-space-accent border border-neon-blue/30 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-neon-blue"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-neon-blue/80 hover:bg-neon-blue text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neon-blue/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} JOGO. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm">
              Termos de Serviço
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
