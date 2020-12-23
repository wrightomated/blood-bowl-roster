export interface Team {
  name: string;
  id: number;
  players: Array<TeamPlayer>;
  reroll: TeamReroll;
  apothecary: boolean;
  tier: TeamTier;
}

export interface TeamList {
  teams: Array<Team>;
}

export interface TeamPlayer {
  id: number;
  max: number;
}

export interface TeamReroll {
  cost: number;
  max: number;
}

export type TeamTier = 1 | 2 | 3;
