
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NeonButton from './NeonButton';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  // Close mobile menu when navigating to a new route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className="fixed w-full top-0 z-50 bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 backdrop-blur-md border-b border-neon-blue/20 light:border-neon-blue/10">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl font-bold text-gradient">JOGO</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`${location.pathname === '/' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`${location.pathname === '/about' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors`}
          >
            Sobre
          </Link>
          <Link 
            to="/marketplace" 
            className={`${location.pathname === '/marketplace' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors`}
          >
            Marketplace
          </Link>
          <Link 
            to="/collections" 
            className={`${location.pathname === '/collections' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors`}
          >
            Coleções
          </Link>
          <Link 
            to="/creators" 
            className={`${location.pathname === '/creators' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors`}
          >
            Criadores
          </Link>
          <Link 
            to="/roadmap" 
            className={`${location.pathname === '/roadmap' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors`}
          >
            Roadmap
          </Link>
          <Link 
            to="/contact" 
            className={`${location.pathname === '/contact' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors`}
          >
            Contato
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-space-light/20 hover:bg-space-light/40 text-white light:text-space-dark transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-space-light/20 hover:bg-space-light/40 text-white light:text-space-dark transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white light:text-space-dark p-2"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-space-dark dark:bg-space-dark light:bg-white border-t border-neon-purple/20">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link to="/" className={`${location.pathname === '/' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors py-2`}>Home</Link>
            <Link to="/about" className={`${location.pathname === '/about' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors py-2`}>Sobre</Link>
            <Link to="/marketplace" className={`${location.pathname === '/marketplace' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors py-2`}>Marketplace</Link>
            <Link to="/collections" className={`${location.pathname === '/collections' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors py-2`}>Coleções</Link>
            <Link to="/creators" className={`${location.pathname === '/creators' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors py-2`}>Criadores</Link>
            <Link to="/roadmap" className={`${location.pathname === '/roadmap' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors py-2`}>Roadmap</Link>
            <Link to="/contact" className={`${location.pathname === '/contact' ? 'text-neon-blue' : 'text-white light:text-space-dark'} hover:text-neon-blue transition-colors py-2`}>Contato</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
