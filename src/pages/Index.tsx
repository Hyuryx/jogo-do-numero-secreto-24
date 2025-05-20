
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SecretNumberGame from '@/components/SecretNumberGame';
import PlayerNameModal from '@/components/PlayerNameModal';
import { Element } from 'react-scroll';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PlayerNameModal />
      <main>
        <Hero />
        <Element name="game-section">
          <section className="py-16 relative overflow-hidden" id="howToPlay">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/3 -left-20 w-72 h-72 bg-neon-purple/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-neon-blue/10 rounded-full blur-[120px]"></div>
            </div>
            
            <div className="container mx-auto px-4">
              <SecretNumberGame />
            </div>
          </section>
        </Element>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
