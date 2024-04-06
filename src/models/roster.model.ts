import type { AdvancementCombination } from '../data/advancementCost.data';
import type { CharacteristicType } from '../data/statOrder.data';
import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../types/teamFormat';
import type { CoachDetails } from './coach.model';
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
    version?: string;
    /** Used for firebase storage */
    rosterId?: string;
    /** Changed from number to string in v2 */
    teamId: string;
    teamName: string;
    teamType: TeamName | CollegeName | string;
    players: RosterPlayerRecord[];
    /** Extra info in relation to the game */
    extra?: RosterExtraRecords;
    inducements: InducementsRecord;
    treasury?: number;
    pettyCash?: number;
    /** League or exhibition */
    mode?: RosterMode;
    /** Elevens, sevens or dungeon bowl */
    format?: TeamFormat;
    leagueRosterStatus?: LeagueRosterStatus;
    matchSummary?: MatchHistorySummary[];
    matchDraft?: MatchHistoryRecord;
    coachDetails?: CoachDetails;
    notes?: string;
    config?: RosterConfig;
    // setUps?: Record<
    //     string,
    //     { playerId: string; position: { x: number; y: number } }[]
    // >;
    setUps?: {
        draft: RosterSetUp;
    };
}

export type RosterSetUp = {
    id?: string;
    name?: string;
    players: { playerId: string; position: { x: number; y: number } }[];
};

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
    injuries?: number[]; // i
    journeyman?: boolean; // j
    gameRecords?: Partial<Record<PlayerGameAchievement, number>>; // g
    playerNumber?: number; // x
    /** v2: Details of each advancement, not for share code */
    specificAdvancements?: SpecificAdvancement[];
    /** v2: not for share code */
    gamesPlayed?: number;
}

export type LeagueRosterStatus = 'draft' | 'commenced';

export type NewRosterOptions = {
    teamId: string;
    teamType: TeamName | CollegeName | string;
    mode: RosterMode;
    format: TeamFormat;
    fans: number;
    specialRule?: TeamSpecialRule;
    version?: string;
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

export interface RosterConfig {
    customSkillColour: Record<number, string>;
}
