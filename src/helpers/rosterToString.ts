import type {
    ExtraRosterInfo,
    PlayerAlterations,
    Roster,
    RosterPlayerRecord,
} from '../models/roster.model';
import type { RosterMode } from '../store/rosterMode.store';

const extraToString = (extra: ExtraRosterInfo) => {
    const map = {
        rerolls: 'r',
        assistant_coaches: 'a',
        cheerleaders: 'c',
        dedicated_fans: 'd',
        apothecary: 'y',
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

const playerToString = (rp: RosterPlayerRecord) => {
    const alterations = `${rp?.starPlayer ? '' : pAlterations(rp.alterations)}`;
    return `p${rp.player.id}${alterations}`;
};

const pAlterations = (alts: PlayerAlterations) => {
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

export const rosterToString = (roster: Roster) => {
    const extraS = extraToString(roster.extra);
    const inducementS = inducementToString(roster.inducements);
    const players = roster.players.map((x) => playerToString(x)).join('');
    return `t${roster.teamId}t${roster.treasury}m${getModeInt(
        roster.mode,
    )}${extraS}${inducementS}${players}I${getNameString(roster)}`;
};
