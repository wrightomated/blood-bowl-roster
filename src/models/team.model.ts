import type { CollegeName } from './dungeonBowl.model';

export interface Team {
    name: TeamName | CollegeName;
    id: string;
    players: Array<TeamPlayer>;
    reroll: TeamReroll;
    allowedApothecary: boolean;
    tier: number;
    specialRules: TeamSpecialRule[];
    maxBigGuys?: number;
    retired?: boolean;
    pickSpecialRule?: TeamSpecialRule[];
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

export type TeamTier = 0 | 1 | 2 | 3 | 4 | 5;

export type TeamName =
    | 'Imperial Nobility'
    | 'Black Orc'
    | 'Chaos Chosen'
    | 'Dark Elf'
    | 'Dwarf'
    | 'Elven Union'
    | 'Goblin'
    | 'Halfling'
    | 'Human'
    | 'Lizardmen'
    | 'Necromantic Horror'
    | 'Nurgle'
    | 'Ogre'
    | 'Old World Alliance'
    | 'Orc'
    | 'Shambling Undead'
    | 'Skaven'
    | 'Snotling'
    | 'Underworld Denizens'
    | 'Wood Elf'
    | 'Chaos Renegade'
    | 'Amazon'
    | 'Chaos Dwarf'
    | 'Chaos Dwarf (ToL)'
    | 'High Elf'
    | 'Norse'
    | 'Tomb Kings'
    | 'Vampire'
    | 'Daemons of Khorne'
    | 'Slann'
    | 'Khorne'
    | 'Norse (ToL)'
    | 'Amazon (ToL)'
    | 'Amazon (Incomplete)'
    | 'Vampire (ToL)'
    | 'Vampire (Incomplete)'
    | 'Gnome';

export type TeamSpecialRule =
    | 'Badlands Brawl'
    | 'Bribery and Corruption'
    | 'Favoured of...'
    | 'Favoured of Nurgle'
    | 'Elven Kingdoms League'
    | 'Old World Classic'
    | 'Worlds Edge Superleague'
    | 'Underworld Challenge'
    | 'Halfling Thimble Cup'
    | 'Lustrian Superleague'
    | 'Masters of Undeath'
    | 'Sylvanian Spotlight'
    | 'Low Cost Linemen'
    | 'Favoured of Khorne'
    | 'Favoured of Chaos Undivided'
    | 'Favoured of Slaanesh'
    | 'Favoured of Tzeentch'
    | 'Favoured of Hashut';
