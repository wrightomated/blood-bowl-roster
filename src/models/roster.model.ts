import type { RosterMode } from '../store/rosterMode.store';
import type { Player } from './player.model';
import type { TeamName } from './team.model';

export interface Roster {
    teamId: number;
    teamName: string;
    teamType: TeamName;
    players: RosterPlayerRecord[];
    extra?: ExtraRosterInfo;
    inducements: ExtraRosterInfo;
    treasury?: number;
    mode?: RosterMode;
}

export interface RosterPlayerRecord {
    player: Player;
    playerNumber?: number;
    playerName: string;
    starPlayer?: boolean;
    alterations?: PlayerAlterations;
}

export interface ExtraRosterInfo {
    [key: string]: number;
}

export interface PlayerAlterations {
    spp: number; // s
    ni: number; // n
    mng?: boolean; // m
    tr?: boolean; // t
    statChange?: number[]; // c
    extraSkills?: number[]; // e
    valueChange?: number; // v
    advancements?: number; // a
    injuries?: number[]; // i
}
