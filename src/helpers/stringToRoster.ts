import { dungeonBowlColleges } from '../data/dungeonBowlColleges.data';
import { playerCatalogue } from '../data/players.data';
import { starPlayers } from '../data/starPlayer.data';
import { teamData } from '../data/teams.data';
import type { Player } from '../models/player.model';
import type {
    InducementsRecord,
    PlayerAlterations,
    Roster,
    RosterPlayerRecord,
} from '../models/roster.model';
import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../types/teamFormat';

/*
t1t0m0d1r2 p1 p1 p1 p1 p4 p4 p2 p3 p4 p4 p5 I The%20Altdorf%20Deamons:Bob
*/

export const stringToRoster = (code: string) => {
    const decodedString = decodeURIComponent(code);
    const [rosterString, ...rest] = decodedString.split('I');
    const rosterNames = rest.join('I');
    const [teamDetails, ...players] = rosterString.split('p');
    const [id, treasury, ...extras] = itemsInString(teamDetails);
    const teamId = getNumber(id);

    const roster: Roster = {
        teamId,
        extra: stringToExtra(
            extras.filter(
                (x) => !x.includes('i') && !x.includes('m') && !x.includes('f')
            )
        ),
        players: expandPlayers(players),
        teamName: '',
        teamType: getTeamType(teamId),
        inducements: mapInducements(extras.filter((x) => x.includes('i'))),
        treasury: getNumber(treasury),
        mode: getMode(extras.find((x) => x.includes('m')) || 'm1'),
        format: getFormat(extras.find((x) => x.includes('f')) || 'f0'),
    };
    return rosterNames.length > 0
        ? addNamesToRoster(roster, rosterNames)
        : roster;
};

const expandPlayers = (players: string[]) => {
    return players.map((p) => expandPlayer(p));
};

const expandPlayer: (playerString: string) => RosterPlayerRecord = (
    playerString
) => {
    const [id, ...other] = itemsInString(playerString);
    const nId = parseInt(id);
    const starPlayer = nId >= 200;
    const player = findPlayer(nId);
    const alterations = constructAlterations(other);

    const obj = { player, playerName: starPlayer ? player?.position : '' };
    if (nId === 0) {
        return { ...obj, deleted: true, alterations };
    } else if (starPlayer) {
        return { ...obj, starPlayer: true };
    } else {
        return { ...obj, alterations };
    }
};

const findPlayer = (id: number) => {
    if (id === 0) {
        return deletedPlayer();
    } else if (id >= 200) {
        return starPlayers.starPlayers.find((p) => p.id === id);
    } else {
        return playerCatalogue.players.find((p) => p.id === id);
    }
};

const mapInducements = (inducements: string[]) => {
    const inducementObj = {};
    inducements.forEach((i) => {
        const [key, value] = i.split('.');
        inducementObj[key] = parseInt(value);
    });
    return inducementObj;
};

const constructAlterations = (other: string[]) => {
    const alterations: PlayerAlterations = { spp: 0, ni: 0 };
    other.forEach((o) => {
        switch (o[0]) {
            case 's':
                alterations['spp'] = getNumber(o);
                break;
            case 'n':
                alterations['ni'] = getNumber(o);
                break;
            case 'm':
                alterations['mng'] = true;
                break;
            case 't':
                alterations['tr'] = true;
                break;
            case 'c':
                alterations['statChange'] = statChangeArray(o);
                break;
            case 'e':
                alterations['extraSkills'] = skillArray(o);
                break;
            case 'v':
                alterations['valueChange'] = getNumber(o);
                break;
            case 'a':
                alterations['advancements'] = getNumber(o);
                break;
            case 'i':
                alterations['injuries'] = statChangeArray(o);
                break;
            case 'j':
                alterations['journeyman'] = true;
                break;
            case 'x':
                alterations['playerNumber'] = getNumber(o);
                break;
            default:
                break;
        }
    });
    return alterations;
};

const statChangeArray = (statString: string) => {
    const matchArray = statString.substring(1).match(/-?\d/g) ?? [];
    return matchArray.map((x) => parseInt(x, 10));
};

const skillArray = (skillString: string) => {
    return skillString
        .substring(1)
        .split('.')
        .map((x) => parseInt(x, 10));
};

const stringToExtra: (extras: string[]) => InducementsRecord = (extras) => {
    const charToExtraMap = {
        r: 'rerolls',
        a: 'assistant_coaches',
        c: 'cheerleaders',
        d: 'dedicated_fans',
        y: 'apothecary',
        s: 'special_rule',
    };
    const extraObject = {};
    extras.forEach(
        (match) =>
            (extraObject[charToExtraMap[match.charAt(0)]] = getNumber(match))
    );
    return extraObject;
};

const itemsInString = (rosterSection: string) => {
    return rosterSection.match(/[a-z]?[\d.-]+/g) ?? [];
};

const getNumber = (match: string) => {
    return parseInt(match.substring(1), 10);
};

const decodeName = (name: string) => {
    return decodeURIComponent(name);
};

const addNamesToRoster: (roster: Roster, rosterNames: string) => Roster = (
    roster,
    rosterNames
) => {
    const [teamName, ...playerNames] = rosterNames
        .split(':')
        .map((n) => decodeName(n));
    return {
        ...roster,
        teamName: teamName || '',
        players: roster.players.map((p, i) =>
            !p.starPlayer && playerNames?.[i]
                ? { ...p, playerName: playerNames[i] }
                : p
        ),
    };
};

const getMode: (modeMatch: string) => RosterMode = (modeMatch) => {
    return getNumber(modeMatch) === 0 ? 'league' : 'exhibition';
};

const getFormat: (modeMatch: string) => TeamFormat = (modeMatch) => {
    return {
        0: 'elevens',
        1: 'sevens',
        2: 'dungeon bowl',
    }[getNumber(modeMatch)] as TeamFormat;
};

const getTeamType = (teamId: number) => {
    const teamType =
        teamId < 100
            ? teamData.teams.find((t) => t.id === teamId)?.name
            : dungeonBowlColleges.colleges.find((t) => t.id === teamId)?.name;
    if (!teamType) throw new Error('No team type found');
    return teamType;
};

export const deletedPlayer: () => Player = () => {
    return {
        id: 0,
        position: '',
        playerStats: [0, 0, 0, 0, 0],
        cost: 0,
        skills: [],
    };
};
