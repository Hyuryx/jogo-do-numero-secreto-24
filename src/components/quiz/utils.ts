
import { Question } from './types';

// All quiz questions
export const questions: Question[] = [
  {
    question: "Qual é a capital do Brasil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: 2,
    category: "Geografia"
  },
  {
    question: "Quem pintou a Mona Lisa?",
    options: ["Van Gogh", "Leonardo da Vinci", "Michelangelo", "Pablo Picasso"],
    correctAnswer: 1,
    category: "Arte"
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Marte", "Júpiter", "Vênus"],
    correctAnswer: 2,
    category: "Astronomia"
  },
  {
    question: "Qual desses não é um filme da Marvel?",
    options: ["Homem de Ferro", "Batman", "Thor", "Capitão América"],
    correctAnswer: 1,
    category: "Cinema"
  },
  {
    question: "Quanto é 9 × 8?",
    options: ["56", "64", "72", "81"],
    correctAnswer: 2,
    category: "Matemática"
  },
  {
    question: "Qual clube de futebol tem mais títulos da Champions League?",
    options: ["Barcelona", "Bayern de Munique", "Liverpool", "Real Madrid"],
    correctAnswer: 3,
    category: "Esportes"
  },
  {
    question: "Qual elemento químico tem o símbolo 'O'?",
    options: ["Ouro", "Ósmio", "Oxigênio", "Olívio"],
    correctAnswer: 2,
    category: "Ciência"
  },
  {
    question: "Em que ano o homem pisou na Lua pela primeira vez?",
    options: ["1969", "1971", "1965", "1973"],
    correctAnswer: 0,
    category: "História"
  },
  {
    question: "Qual é a linguagem de programação mais utilizada para desenvolvimento web front-end?",
    options: ["Java", "Python", "C++", "JavaScript"],
    correctAnswer: 3,
    category: "Tecnologia"
  },
  {
    question: "Qual é o nome do criador do Facebook?",
    options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos"],
    correctAnswer: 2,
    category: "Tecnologia"
  },
  {
    question: "Qual é o rio mais longo do mundo?",
    options: ["Amazonas", "Nilo", "Mississippi", "Yangtzé"],
    correctAnswer: 1,
    category: "Geografia"
  },
  {
    question: "Quantas Copas do Mundo o Brasil já venceu?",
    options: ["4", "5", "3", "6"],
    correctAnswer: 1,
    category: "Esportes"
  },
  {
    question: "Qual é o resultado de 3² + 4²?",
    options: ["25", "7", "49", "9"],
    correctAnswer: 0,
    category: "Matemática"
  },
  {
    question: "Quem é o autor de 'Dom Quixote'?",
    options: ["Miguel de Cervantes", "Shakespeare", "Jorge Amado", "Machado de Assis"],
    correctAnswer: 0,
    category: "Literatura"
  },
  {
    question: "Qual é o animal mais rápido do mundo?",
    options: ["Leopardo", "Águia", "Guepardo", "Falcão-peregrino"],
    correctAnswer: 2,
    category: "Biologia"
  },
  {
    question: "Qual é o maior oceano do mundo?",
    options: ["Atlântico", "Índico", "Pacífico", "Ártico"],
    correctAnswer: 2,
    category: "Geografia"
  },
  {
    question: "Qual o nome da galáxia que contém o Sistema Solar?",
    options: ["Andrômeda", "Via Láctea", "Triangulum", "Centaurus A"],
    correctAnswer: 1,
    category: "Astronomia"
  },
  {
    question: "Quem escreveu 'O Pequeno Príncipe'?",
    options: ["Antoine de Saint-Exupéry", "Jules Verne", "Victor Hugo", "Albert Camus"],
    correctAnswer: 0,
    category: "Literatura"
  },
  {
    question: "Em que ano foi fundado o Google?",
    options: ["1996", "1998", "2000", "2002"],
    correctAnswer: 1,
    category: "Tecnologia"
  },
  {
    question: "Qual destas não é uma linguagem de programação?",
    options: ["Python", "HTML", "Ruby", "Kotlin"],
    correctAnswer: 1,
    category: "Tecnologia"
  },
  {
    question: "Qual é o elemento químico mais abundante no universo?",
    options: ["Oxigênio", "Carbono", "Hélio", "Hidrogênio"],
    correctAnswer: 3,
    category: "Ciência"
  },
  {
    question: "Qual é o menor país do mundo?",
    options: ["Mônaco", "Vaticano", "Nauru", "San Marino"],
    correctAnswer: 1,
    category: "Geografia"
  },
  {
    question: "Quantos lados tem um hexágono?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    category: "Matemática"
  },
  {
    question: "Qual é o ano de lançamento do primeiro iPhone?",
    options: ["2005", "2007", "2009", "2011"],
    correctAnswer: 1,
    category: "Tecnologia"
  },
  {
    question: "Qual artista pintou 'A Noite Estrelada'?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Salvador Dalí"],
    correctAnswer: 0,
    category: "Arte"
  },
  {
    question: "Quantos planetas existem no Sistema Solar?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 1,
    category: "Astronomia"
  },
  {
    question: "Qual destes países não está na Europa?",
    options: ["Suécia", "Portugal", "Marrocos", "Áustria"],
    correctAnswer: 2,
    category: "Geografia"
  },
  {
    question: "Quem foi o primeiro ser humano a ir ao espaço?",
    options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "Alan Shepard"],
    correctAnswer: 1,
    category: "História"
  },
  {
    question: "Qual o nome do criador da teoria da relatividade?",
    options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"],
    correctAnswer: 1,
    category: "Ciência"
  },
  {
    question: "Qual instrumento musical tem 88 teclas?",
    options: ["Órgão", "Acordeão", "Piano", "Sintetizador"],
    correctAnswer: 2,
    category: "Música"
  }
];

// Helper to get random subset of questions
export const getRandomQuestions = (count: number): Question[] => {
  // Shuffle questions and take 'count' questions
  return [...questions]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};
