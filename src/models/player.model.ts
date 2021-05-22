import type { SkillCategory } from './skill.model';
import type { TeamSpecialRule } from './team.model';

export interface StarPlayer {
    playsFor: TeamSpecialRule[];
    specialRules: string[];
    id: number;
    position: string;
    playerStats: number[];
    cost: number;
    skills: number[];
    twoForOne?: number;
    doesNotPlayFor?: TeamSpecialRule[];
}

export interface Player {
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
