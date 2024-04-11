import type { SkillCategory } from './skill.model';
import type { TeamSpecialRule } from './team.model';

export interface StarPlayer {
    playsFor: TeamSpecialRule[];
    specialRules: string[];
    /** This id references the id in the player data file */
    id: number;
    position: string;
    playerStats: number[];
    cost: number;
    skills: number[];
    twoForOne?: number;
    doesNotPlayFor?: TeamSpecialRule[];
    megaStar?: boolean;
}

export interface Player {
    /** This id references the id in the player data file */
    id: number;
    position: string;
    playerStats: number[];
    cost: number;
    skills: number[];
    primary?: SkillCategory[];
    secondary?: SkillCategory[];
    bigGuy?: boolean;
}

export interface PlayerCatalogue {
    players: Player[];
}
