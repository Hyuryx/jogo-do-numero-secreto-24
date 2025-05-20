
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">Contato</span>
          </h1>
          
          <div className="space-y-8 text-gray-300 max-w-3xl mx-auto">
            <p className="text-xl">
              Ficou com alguma dúvida ou sugestão? Entre em contato conosco:
            </p>
            
            <div className="space-y-4 bg-space-darker p-6 rounded-lg border border-neon-blue/20">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="text-neon-blue font-medium min-w-[100px]">Email:</span>
                <a href="mailto:hyuryoficial@gmail.com" className="text-white hover:text-neon-purple transition-colors">
                  hyuryoficial@gmail.com
                </a>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="text-neon-blue font-medium min-w-[100px]">GitHub:</span>
                <a href="https://github.com/Hyuryx?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon-purple transition-colors">
                  github.com/Hyuryx
                </a>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-neon-blue/20">
              <p className="text-center text-gray-400">
                Responderemos sua mensagem o mais rápido possível!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
