
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameInfo {
  id: string;
  title: string;
  description: string;
  category: string;
}

const games: GameInfo[] = [
  {
    id: 'secretNumber',
    title: 'Jogo do Número Secreto',
    description: 'Tente adivinhar um número de 1 a 2000 com o número mínimo de tentativas.',
    category: 'Adivinhação'
  },
  {
    id: 'ticTacToe',
    title: 'Jogo da Velha',
    description: 'Jogue contra um amigo ou o computador neste clássico jogo de estratégia.',
    category: 'Estratégia'
  },
  {
    id: 'quiz',
    title: 'Quiz',
    description: 'Teste seus conhecimentos com perguntas de diversas categorias.',
    category: 'Conhecimento'
  },
  {
    id: 'hangman',
    title: 'Jogo da Forca',
    description: 'Adivinhe a palavra secreta antes que o boneco seja enforcado.',
    category: 'Palavras'
  },
  {
    id: 'memory',
    title: 'Jogo da Memória',
    description: 'Encontre os pares de cartas com o mesmo símbolo em menos tempo possível.',
    category: 'Memória'
  },
  {
    id: 'quizShow',
    title: 'Quiz Show',
    description: 'Um quiz com formato de programa de TV e pontuações baseadas no tempo de resposta.',
    category: 'Conhecimento'
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Preencha os números nas células vazias seguindo as regras do Sudoku.',
    category: 'Lógica'
  },
  {
    id: 'wordSearch',
    title: 'Caça-Palavras',
    description: 'Encontre palavras escondidas em uma grade de letras.',
    category: 'Palavras'
  }
];

const GamesDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  // Extrair categorias únicas
  const categories = Array.from(new Set(games.map(game => game.category)));

  // Filtrar jogos baseado na busca e categoria selecionada
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || game.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Ordenar os jogos alfabeticamente
  const sortedGames = [...filteredGames].sort((a, b) => a.title.localeCompare(b.title));

  const handleGameSelect = (gameId: string) => {
    localStorage.setItem('selectedGame', gameId);
    // Disparar evento para notificar outros componentes
    const event = new CustomEvent('gameChanged', { 
      detail: { game: gameId }
    });
    window.dispatchEvent(event);
    
    // Navegar para a página principal com o jogo selecionado
    navigate('/#game-section');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="space-card p-6 md:p-8 backdrop-blur-lg relative">
            <h1 className="text-4xl font-bold mb-8">
              <span className="text-gradient">CATÁLOGO DE JOGOS</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Campo de busca */}
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar jogos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-space-accent/50 border-neon-blue/30"
                />
              </div>

              {/* Filtro por categoria */}
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-full border ${
                    selectedCategory === null ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Todos
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full border ${
                      selectedCategory === category ? 'bg-neon-blue/20 border-neon-blue' : 'border-neon-purple/30'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {sortedGames.length === 0 ? (
              <p className="text-center text-gray-300 py-10">Nenhum jogo encontrado para "{searchTerm}"</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedGames.map((game) => (
                  <Card 
                    key={game.id} 
                    className="bg-space-darker/80 border-neon-purple/20 hover:border-neon-blue/50 transition-colors cursor-pointer"
                    onClick={() => handleGameSelect(game.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-neon-blue">{game.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-2">{game.description}</p>
                      <span className="inline-block px-2 py-1 bg-space-light/20 text-xs rounded-full">
                        {game.category}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GamesDirectory;
