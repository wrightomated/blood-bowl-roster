import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../types/teamFormat';
import type { CollegeName } from './dungeonBowl.model';
import type { GameHistory } from './gameHistory.model';
import type { Player } from './player.model';
import type { TeamName } from './team.model';

export interface Roster {
    /** Used for firebase storage */
    rosterId?: string;
    teamId: number;
    teamName: string;
    teamType: TeamName | CollegeName;
    players: RosterPlayerRecord[];
    extra?: ExtraRosterInfo;
    inducements: ExtraRosterInfo;
    treasury?: number;
    mode?: RosterMode;
    format?: TeamFormat;
    leagueRosterStatus?: LeagueRosterStatus;
    gameHistory?: string[][];
}

export type RosterPreviews = { [key: string]: RosterPreview };

export type RosterPreview = Omit<Roster, 'players' | 'extra' | 'inducements'>;

export function getRosterPreview(roster: Roster): RosterPreview {
    const { players, extra, inducements, ...preview } = roster;
    return preview;
}

export interface RosterPlayerRecord {
    player: Player;
    deleted?: boolean;
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
    journeyman?: boolean; // j
}

export type LeagueRosterStatus = 'draft' | 'commenced';
