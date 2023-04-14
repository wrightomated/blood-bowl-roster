import type { AdvancementCombination } from '../data/advancementCost.data';
import type { CharacteristicType } from '../data/statOrder.data';
import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../types/teamFormat';
import type { CollegeName } from './dungeonBowl.model';
import type { InducementKey } from './inducement.model';
import type {
    MatchHistoryRecord,
    MatchHistorySummary,
} from './matchHistory.model';
import type { Player } from './player.model';
import type { TeamName, TeamSpecialRule } from './team.model';

export interface Roster {
    /** Used for breaking changes, undefined assumed 1 */
    version?: number;
    /** Used for firebase storage */
    rosterId?: string;
    teamId: number;
    teamName: string;
    teamType: TeamName | CollegeName;
    players: RosterPlayerRecord[];
    /** Extra info in relation to the game */
    extra?: RosterExtraRecords;
    inducements: InducementsRecord;
    treasury?: number;
    pettyCash?: number;
    mode?: RosterMode;
    format?: TeamFormat;
    leagueRosterStatus?: LeagueRosterStatus;
    matchSummary?: MatchHistorySummary[];
    matchDraft?: MatchHistoryRecord;
}

export type RosterPreviews = Record<string, RosterPreview>;

export type RosterPreview = Omit<Roster, 'players' | 'extra' | 'inducements'>;

export function getRosterPreview(roster: Roster): RosterPreview {
    const {
        players,
        extra,
        inducements,
        matchDraft,
        matchSummary,
        ...preview
    } = roster;
    return preview;
}

/**
 * Information specific to the roster should exist at this level.
 * The player object should only contain data of the base player type.
 */
export interface RosterPlayerRecord {
    player: Player;
    deleted?: boolean;
    playerName: string;
    starPlayer?: boolean;
    alterations?: PlayerAlterations;
    /** Unique id for every player */
    playerId?: string;
}

export type RosterExtraRecords = Partial<Record<RosterExtra, number>>;

export type RosterExtra =
    | 'rerolls' // r
    | 'assistant_coaches' // a
    | 'cheerleaders' // c
    | 'dedicated_fans' // d
    | 'apothecary' // y
    | 'special_rule'; // s

export type InducementsRecord = Record<InducementKey, number>;

/**
 * Alterations to a base player for this instance of the player in a roster.
 * Only use lowercase letters for keys in roster -> string
 */
export interface PlayerAlterations {
    spp: number; // s
    ni: number; // n
    mng?: boolean; // m
    tr?: boolean; // t
    statChange?: number[]; // c
    extraSkills?: number[]; // e
    valueChange?: number; // v
    /** How many times a player has advanced*/
    advancements?: number; // a
    /** v2: Details of each advancement */
    specificAdvancements?: SpecificAdvancement[];
    injuries?: number[]; // i
    journeyman?: boolean; // j
    gameRecords?: Partial<Record<PlayerGameAchievement, number>>; // g
    playerNumber?: number; // x
}

export type LeagueRosterStatus = 'draft' | 'commenced';

export type NewRosterOptions = {
    teamId: number;
    teamType: TeamName | CollegeName;
    mode: RosterMode;
    format: TeamFormat;
    fans: number;
    specialRule?: TeamSpecialRule;
};

export type SpecificAdvancement = {
    type: AdvancementCombination;
    /** The advancement cost */
    sppCost: number;
    /** Skill id or characteristic type */
    advancementValue: number | CharacteristicType;
};

export type PlayerGameAchievement =
    | 'casualty'
    | 'pass'
    | 'kill'
    | 'touchdown'
    | 'deflection'
    | 'interception'
    | 'mvp';
