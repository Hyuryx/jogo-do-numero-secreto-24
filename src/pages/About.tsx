
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">Sobre o</span> JOGO
          </h1>
          <div className="space-y-8 text-gray-300">
            <p>
              Página Sobre em desenvolvimento. Em breve mais informações sobre o JOGO.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
