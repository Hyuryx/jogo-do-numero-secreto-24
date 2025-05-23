
export type Player = 'X' | 'O' | null;
export type BoardState = Player[];
export type GameMode = 'player' | 'ai';

export type GameStats = {
  xWins: number;
  oWins: number;
  draws: number;
};
