import type {
    ExtraRosterInfo,
    PlayerAlterations,
    Roster,
    RosterPlayerRecord,
} from '../models/roster.model';

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
    const alterations = `${
        !rp?.starPlayer ? pAlterations(rp.alterations) : ''
    }`;
    return `p${rp.player.id}${alterations}`;
};

const pAlterations = (alts: PlayerAlterations) => {
    return Object.keys(alts)
        .map((x) => {
            switch (x) {
                case 'spp':
                    if (alts[x] < 1) {
                        return '';
                    }
                    return `s${alts[x]}`;
                case 'ni':
                    if (alts[x] < 1) {
                        return '';
                    }
                    return `n${alts[x]}`;
                case 'mng':
                    return `m1`;
                case 'tr':
                    return `t1`;
                case 'statChange':
                    return `c${alts[x].join('')}`;
                case 'extraSkills':
                    return `e${alts[x].join('.')}`;
                default:
                    break;
            }
        })
        .join('');
};

const getNameString = (roster: Roster) => {
    return encodeNames([
        roster.teamName,
        ...roster.players.map(x => x?.starPlayer ? '' : x.playerName),
    ]);
};

const encodeNames = (names: string[]) => {
    return names.map((n) => encodeName(n)).join(' ').trim().replace(/ /g, '.');
};

const encodeName = (name: string) => {
    return encodeURIComponent(name);
};

export const rosterToString = (roster: Roster) => {
    const extraS = extraToString(roster.extra);
    const inducementS = inducementToString(roster.inducements);
    const players = roster.players.map((x) => playerToString(x)).join('');
    return `t${roster.teamId}t${roster.treasury}${extraS}${inducementS}${players}I${getNameString(roster)}`;
};
