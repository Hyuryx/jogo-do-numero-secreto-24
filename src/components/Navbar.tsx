
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NeonButton from './NeonButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when navigating to a new route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className="fixed w-full top-0 z-50 bg-space-darker/80 backdrop-blur-md border-b border-neon-blue/20">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl font-bold text-gradient">JOGO</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`${location.pathname === '/' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`${location.pathname === '/about' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors`}
          >
            Sobre
          </Link>
          <Link 
            to="/marketplace" 
            className={`${location.pathname === '/marketplace' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors`}
          >
            Marketplace
          </Link>
          <Link 
            to="/collections" 
            className={`${location.pathname === '/collections' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors`}
          >
            Coleções
          </Link>
          <Link 
            to="/creators" 
            className={`${location.pathname === '/creators' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors`}
          >
            Criadores
          </Link>
          <Link 
            to="/roadmap" 
            className={`${location.pathname === '/roadmap' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors`}
          >
            Roadmap
          </Link>
          <Link 
            to="/contact" 
            className={`${location.pathname === '/contact' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors`}
          >
            Contato
          </Link>
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
            <Link to="/" className={`${location.pathname === '/' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors py-2`}>Home</Link>
            <Link to="/about" className={`${location.pathname === '/about' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors py-2`}>Sobre</Link>
            <Link to="/marketplace" className={`${location.pathname === '/marketplace' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors py-2`}>Marketplace</Link>
            <Link to="/collections" className={`${location.pathname === '/collections' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors py-2`}>Coleções</Link>
            <Link to="/creators" className={`${location.pathname === '/creators' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors py-2`}>Criadores</Link>
            <Link to="/roadmap" className={`${location.pathname === '/roadmap' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors py-2`}>Roadmap</Link>
            <Link to="/contact" className={`${location.pathname === '/contact' ? 'text-neon-blue' : 'text-white'} hover:text-neon-blue transition-colors py-2`}>Contato</Link>
            <NeonButton className="w-full mt-2">Conectar Wallet</NeonButton>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
