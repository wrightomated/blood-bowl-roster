export interface Team {
  name: TeamName;
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

export type TeamName = "Imperial Nobility"|"Black Orc"|"Chaos Chosen"|"Dark Elf"|"Dwarf"|"Elven Union"|"Goblin"|"Halfling"|"Human"|"Lizardmen"|"Necromantic Horror"|"Nurgle"|"Ogre"|"Old World Alliance"|"Orc"|"Shambling Undead"|"Skaven"
