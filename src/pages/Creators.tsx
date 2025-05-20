
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Creators = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">Criadores</span>
          </h1>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-space-darker border border-neon-blue/20 rounded-xl p-8 mb-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-neon-glow opacity-30 rounded-full blur-md"></div>
                  <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-neon-blue flex items-center justify-center bg-space-dark">
                    <span className="text-6xl">H</span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Hyury Alexandre</h2>
                  <p className="text-neon-blue font-medium mb-4">Desenvolvedor Principal</p>
                  <p className="text-gray-300">
                    Desenvolvedor apaixonado e criador do Jogo do Número Secreto. 
                    Especialista em criar aplicações web interativas com foco na experiência do usuário.
                  </p>
                  
                  <div className="mt-4 flex gap-4">
                    <a 
                      href="https://github.com/Hyuryx?tab=repositories"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-neon-blue transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a 
                      href="mailto:hyuryoficial@gmail.com"
                      className="text-white hover:text-neon-blue transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-400 mb-6">
                O Jogo do Número Secreto foi desenvolvido com ♥ no Rio de Janeiro, Brasil.
              </p>
              
              <div className="inline-flex items-center justify-center px-4 py-2 border border-neon-purple/30 rounded-md bg-space-accent/20">
                <span className="text-neon-purple font-medium">Versão 1.0</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Creators;
