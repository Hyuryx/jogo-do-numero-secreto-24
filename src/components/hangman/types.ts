
export interface GameStats {
  wins: number;
  losses: number;
  streakRecord: number;
  currentStreak: number;
}

export type Category = keyof typeof CATEGORIES;

export const CATEGORIES = {
  Animais: ['GATO', 'CACHORRO', 'ELEFANTE', 'GIRAFA', 'LEAO', 'TIGRE', 'ZEBRA', 'MACACO', 'PANDA', 'COBRA', 'CAVALO', 'LEOPARDO'],
  Frutas: ['BANANA', 'MACA', 'LARANJA', 'UVA', 'MELANCIA', 'ABACAXI', 'MORANGO', 'PERA', 'MANGA', 'KIWI', 'LIMAO', 'COCO'],
  Países: ['BRASIL', 'ARGENTINA', 'PORTUGAL', 'ESPANHA', 'JAPAO', 'CHINA', 'RUSSIA', 'CANADA', 'INGLATERRA', 'AUSTRALIA', 'ITALIA'],
  Tecnologia: ['COMPUTADOR', 'CELULAR', 'INTERNET', 'TECLADO', 'MONITOR', 'MOUSE', 'SOFTWARE', 'HARDWARE', 'PROGRAMACAO', 'BLUETOOTH'],
  Esportes: ['FUTEBOL', 'BASQUETE', 'VOLEI', 'TENIS', 'NATACAO', 'ATLETISMO', 'BOXE', 'CICLISMO', 'SURF', 'GOLFE', 'CORRIDA'],
  Profissões: ['MEDICO', 'PROFESSOR', 'ENGENHEIRO', 'ADVOGADO', 'BOMBEIRO', 'POLICIAL', 'ARQUITETO', 'DENTISTA', 'PROGRAMADOR']
};
