/** Used to be compatible with normal rosters */
export interface DungeonBowlTeam {
    name: CollegeName;
    id: number;
    characteristics: CollegeCharacteristics;
    players: DungeonBowlPlayer[];
    reroll: {
        cost: number;
        max: number;
    };
    // Needed so everything doesn't break. TODO: refactor
    specialRules: [];
    tier: number;
    allowedApothecary: boolean;
}

export interface DungeonBowlCollege {
    name: CollegeName;
    id: number;
    characteristics: CollegeCharacteristics;
    players: DBCollegePlayers;
}

export interface PlayerGroup {
    max: number;
    playerIds: number[];
}

export interface DungeonBowlPlayer {
    id: number;
    dungeonBowlRole: DungeonBowlRole;
    max: number;
}

export interface DBRole {
    linemen: number;
    runners?: number;
    blitzers?: number;
    throwers?: number;
    blockers?: number;
    special?: number;
    bigGuys?: number;
}

interface DBCollegePlayers {
    linemen: PlayerGroup;
    runners?: PlayerGroup;
    blitzers?: PlayerGroup;
    throwers?: PlayerGroup;
    blockers?: PlayerGroup;
    special?: PlayerGroup;
    bigGuys?: PlayerGroup;
}

export interface CollegeCharacteristics {
    speed: number;
    power: number;
    skill: number;
    aggression: number;
    resilience: number;
}

export const dbCollegeToTeam: (college: DungeonBowlCollege) => DungeonBowlTeam =
    (college) => {
        return {
            name: college.name,
            id: college.id,
            characteristics: college.characteristics,
            players: convertPlayers(college.players),
            reroll: {
                cost: 50,
                max: 8,
            },
            specialRules: [],
            tier: 1,
            allowedApothecary: false,
        };
    };

const convertPlayers = (players: DBCollegePlayers) => {
    const keys = Object.keys(players);
    return keys
        .map((key) =>
            players[key].playerIds.map((id: number) => ({
                id,
                dungeonBowlRole: key,
                max: players[key].max,
            }))
        )
        .flat();
};

export type CollegeName =
    | 'Fire'
    | 'Shadow'
    | 'Metal'
    | 'Light'
    | 'Death'
    | 'Life'
    | 'Beasts'
    | 'Heavens';

export type DungeonBowlRole =
    | 'linemen'
    | 'runners'
    | 'blitzers'
    | 'throwers'
    | 'blockers'
    | 'special'
    | 'bigGuy';
