import type {
    ExtraRosterInfo,
    PlayerAlterations,
    Roster,
    RosterPlayerRecord,
} from '../models/roster.model';
import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../types/teamFormat';

const extraToString = (extra: ExtraRosterInfo) => {
    const map = {
        rerolls: 'r',
        assistant_coaches: 'a',
        cheerleaders: 'c',
        dedicated_fans: 'd',
        apothecary: 'y',
        special_rule: 's',
    };

    return Object.keys(extra)
        .map((x) => (extra[x] > 0 ? `${map[x]}${extra[x]}` : ''))
        .join('');
};

const inducementToString = (inducements: ExtraRosterInfo) => {
    return Object.keys(inducements)
        .map((x) => (inducements[x] > 0 ? `${x}.${inducements[x]}` : ''))
        .join('');
};

const playerToString = (rp: RosterPlayerRecord, index: number) => {
    const alterations = `${
        rp?.starPlayer ? '' : pAlterations(rp.alterations, index)
    }`;
    return `p${rp.player.id}${alterations}`;
};

const pAlterations = (alts: PlayerAlterations, index: number) => {
    return Object.keys(alts)
        .map((x) => {
            switch (x) {
                case 'spp':
                    return charAndNumber('s', alts[x]);
                case 'ni':
                    return charAndNumber('n', alts[x]);
                case 'mng':
                    if (alts[x]) {
                        return `m1`;
                    }
                    break;
                case 'tr':
                    if (alts[x]) {
                        return `t1`;
                    }
                    break;
                case 'statChange':
                    return `c${alts[x].join('')}`;
                case 'injuries':
                    return `i${alts[x].join('')}`;
                case 'extraSkills':
                    return `e${alts[x].join('.')}`;
                case 'valueChange':
                    return charAndNumber('v', alts[x]);
                case 'advancements':
                    return charAndNumber('a', alts[x]);
                case 'journeyman':
                    if (alts[x]) {
                        return `j1`;
                    }
                    break;
                case 'playerNumber':
                    if (typeof alts[x] === 'number' && alts[x] !== index + 1) {
                        return charAndNumber('x', alts[x]);
                    }
                    break;
                default:
                    break;
            }
        })
        .join('');
};

const getNameString = (roster: Roster) => {
    const encodedNames = encodeNames([
        roster.teamName,
        ...roster.players.map((x) => (x?.starPlayer ? '' : x.playerName)),
    ]);
    return compressEncodedNames(encodedNames);
};

const compressEncodedNames = (encodedNames: string) => {
    if (encodedNames?.[0] === ' ') {
        return ('e' + encodedNames).trim().replace(/ /g, ':').substring(1);
    }
    return encodedNames.trim().replace(/ /g, ':');
};

const encodeNames = (names: string[]) => {
    return names.map((n) => encodeName(n)).join(' ');
};

const encodeName = (name: string) => {
    return encodeURIComponent(name);
};

const charAndNumber = (char: string, num: number) => {
    if (num < 1) {
        return '';
    }
    return `${char}${num}`;
};

const getModeInt = (mode: RosterMode) => {
    return mode === 'league' ? 0 : 1;
};

const getFormatInt = (format: TeamFormat) => {
    return {
        elevens: 0,
        sevens: 1,
        'dungeon bowl': 2,
    }[format];
};

export const rosterToString = (roster: Roster) => {
    try {
        const extraS = extraToString(roster.extra);
        const inducementS = inducementToString(roster.inducements);
        const players = roster.players
            .map((x, i) => playerToString(x, i))
            .join('');
        return `t${roster.teamId}t${roster.treasury}m${getModeInt(
            roster.mode
        )}f${getFormatInt(
            roster.format
        )}${extraS}${inducementS}${players}I${getNameString(roster)}`;
    } catch (error) {
        console.error('Could not convert roster to string', error);
        return 'Error';
    }
};
