
export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface QuizGameStats {
  gamesPlayed: number;
  bestScore: number;
  totalCorrect: number;
  totalQuestions: number;
}
