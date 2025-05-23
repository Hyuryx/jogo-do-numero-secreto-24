
// Normaliza texto (remove acentos)
export const normalizeText = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Seleciona uma palavra aleatória da categoria selecionada
export const selectRandomWord = (category: string): string => {
  const words = CATEGORIES[category as keyof typeof CATEGORIES];
  const randomIndex = Math.floor(Math.random() * words.length);
  
  // A palavra é armazenada já normalizada (sem acentos) e em maiúsculas
  return normalizeText(words[randomIndex].toUpperCase());
};

// Import the CATEGORIES constant
import { CATEGORIES } from './types';
