import { playerCatalogue } from '../data/players.data';
import { starPlayers } from '../data/starPlayer.data';
import { teamData } from '../data/teams.data';
import type { ExtraRosterInfo, PlayerAlterations, Roster } from '../models/roster.model';

export const stringToRoster = (code: string) => {
    const [rosterString, rosterNames] = code.split('I');
    const [teamDetails, ...players] = rosterString.split('p');
    const [id, treasury, ...extras] = itemsInString(teamDetails);
    const teamId = getNumber(id);
    const roster: Roster = {
        teamId,
        extra: stringToExtra(extras.filter((x) => !x.includes('i'))),
        players: expandPlayers(players),
        teamName: '',
        teamType: teamData.teams.find((t) => t.id === teamId).name,
        inducements: mapInducements(extras.filter((x) => x.includes('i'))),
        treasury: getNumber(treasury),
    };
    return addNamesToRoster(roster, rosterNames);
};

const expandPlayers = (players: string[]) => {
    return players.map((p) => expandPlayer(p));
};

const expandPlayer = (playerString: string) => {
    const [id, ...other] = itemsInString(playerString);
    const nId = parseInt(id);
    const starPlayer = nId >= 200;
    const player = findPlayer(nId);
    const alterations = constructAlterations(other);

    const obj = { player, playerName: starPlayer ? player.position : '' };
    if (starPlayer) {
        return { ...obj, starPlayer: true };
    } else {
        return { ...obj, alterations };
    }
};

const findPlayer = (id: number) => {
    if (id >= 200) {
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
            default:
                break;
        }
    });
    return alterations;
};

const statChangeArray = (statString: string) => {
    return statString
        .substring(1)
        .match(/-?\d/g)
        .map((x) => parseInt(x, 10));
};

const skillArray = (skillString: string) => {
    return skillString
        .substring(1)
        .split('.')
        .map((x) => parseInt(x, 10));
};

const stringToExtra: (extras: string[]) => ExtraRosterInfo = (extras) => {
    const map = {
        r: 'rerolls',
        a: 'assistant_coaches',
        c: 'cheerleaders',
        d: 'dedicated_fans',
        y: 'apothecary',
    };
    const extraObject = {};
    extras.forEach(
        (match) => (extraObject[map[match.charAt(0)]] = getNumber(match)),
    );
    return extraObject;
};

const itemsInString = (rosterSection: string) => {
    return rosterSection.match(/[a-z]?[\d.-]+/g);
};

const getNumber = (match: string) => {
    return parseInt(match.substring(1), 10);
};

const decodeName = (name: string) => {
    return decodeURIComponent(name);
};

const addNamesToRoster: (roster: Roster, rosterNames: string) => Roster = (roster, rosterNames) => {
    const [teamName, ...playerNames] = rosterNames
        .split('.')
        .map((n) => decodeName(n));
    return {
        ...roster,
        teamName: teamName || '',
        players: roster.players.map((p, i) =>
            !p.starPlayer && playerNames?.[i]
                ? { ...p, playerName: playerNames[i] }
                : p,
        ),
    };
};
