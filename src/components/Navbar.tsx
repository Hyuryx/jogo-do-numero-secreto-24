
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NeonButton from './NeonButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed w-full top-0 z-50 bg-space-darker/80 backdrop-blur-md border-b border-neon-blue/20">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl font-bold text-gradient">JOGO</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white hover:text-neon-blue transition-colors">Home</Link>
          <Link to="/about" className="text-white hover:text-neon-blue transition-colors">Sobre</Link>
          <Link to="/marketplace" className="text-white hover:text-neon-blue transition-colors">Marketplace</Link>
          <Link to="/roadmap" className="text-white hover:text-neon-blue transition-colors">Roadmap</Link>
        </nav>
        
        <div className="hidden md:block">
          <NeonButton>Conectar Wallet</NeonButton>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-space-dark border-t border-neon-purple/20">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link to="/" className="text-white hover:text-neon-blue transition-colors py-2">Home</Link>
            <Link to="/about" className="text-white hover:text-neon-blue transition-colors py-2">Sobre</Link>
            <Link to="/marketplace" className="text-white hover:text-neon-blue transition-colors py-2">Marketplace</Link>
            <Link to="/roadmap" className="text-white hover:text-neon-blue transition-colors py-2">Roadmap</Link>
            <NeonButton className="w-full mt-2">Conectar Wallet</NeonButton>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
