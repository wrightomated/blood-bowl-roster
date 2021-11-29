import type { DungeonBowlCollege } from '../models/dungeonBowl.model';
import type { Team } from '../models/team.model';

const collegeOfFire: DungeonBowlCollege = {
    name: 'Fire',
    id: 101,
    characteristics: {
        speed: 2,
        power: 4,
        skill: 2,
        aggression: 3,
        resilience: 4,
    },
    players: {
        linemen: {
            max: 16,
            playerIds: [19, 56, 140],
        },
        runners: {
            max: 2,
            playerIds: [20],
        },
        blitzers: {
            max: 2,
            playerIds: [21],
        },
        special: {
            max: 2,
            playerIds: [22],
        },
        bigGuys: {
            max: 3,
            playerIds: [58, 57],
        },
    },
};

const collegeOfShadows: DungeonBowlCollege = {
    name: 'Shadow',
    id: 102,
    characteristics: {
        speed: 5,
        power: 2,
        skill: 4,
        aggression: 2,
        resilience: 2,
    },
    players: {
        linemen: {
            max: 16,
            playerIds: [14, 68, 28],
        },
        runners: {
            max: 4,
            playerIds: [70, 15],
        },
        blitzers: {
            max: 2,
            playerIds: [16, 71],
        },
        throwers: {
            max: 2,
            playerIds: [69],
        },
        special: {
            max: 2,
            playerIds: [18, 17],
        },
    },
};

const collegeOfMetal: DungeonBowlCollege = {
    name: 'Metal',
    id: 103,
    characteristics: {
        speed: 3,
        power: 3,
        skill: 3,
        aggression: 3,
        resilience: 3,
    },
    players: {
        linemen: {
            max: 16,
            playerIds: [6, 59, 39],
        },
        blitzers: {
            max: 4,
            playerIds: [61, 42],
        },
        throwers: {
            max: 2,
            playerIds: [60],
        },
        blockers: {
            max: 6,
            playerIds: [7, 62, 4, 142],
        },
    },
};

const collegeOfLight: DungeonBowlCollege = {
    name: 'Light',
    id: 104,
    characteristics: {
        speed: 4,
        power: 3,
        skill: 5,
        aggression: 1,
        resilience: 2,
    },
    players: {
        linemen: {
            max: 16,
            playerIds: [24, 1],
        },
        runners: {
            max: 4,
            playerIds: [26, 41],
        },
        blitzers: {
            max: 2,
            playerIds: [27],
        },
        throwers: {
            max: 2,
            playerIds: [25, 2],
        },
    },
};

const collegeOfDeath: DungeonBowlCollege = {
    name: 'Death',
    id: 105,
    characteristics: {
        speed: 2,
        power: 4,
        skill: 2,
        aggression: 4,
        resilience: 3,
    },
    players: {
        linemen: {
            max: 16,
            playerIds: [65, 47],
        },
        blitzers: {
            max: 4,
            playerIds: [49, 66],
        },
        runners: {
            max: 4,
            playerIds: [48],
        },
        blockers: {
            max: 4,
            playerIds: [51],
        },
        bigGuys: {
            max: 2,
            playerIds: [67],
        },
    },
};

const collegeOfLife: DungeonBowlCollege = {
    name: 'Life',
    id: 106,
    characteristics: {
        speed: 4,
        power: 3,
        skill: 3,
        aggression: 2,
        resilience: 3,
    },
    players: {
        linemen: {
            max: 16,
            playerIds: [35, 52, 73, 78],
        },
        runners: {
            max: 4,
            playerIds: [76, 37, 80],
        },
        blitzers: {
            max: 2,
            playerIds: [81],
        },
        throwers: {
            max: 2,
            playerIds: [79],
        },
        blockers: {
            max: 4,
            playerIds: [36, 54],
        },
        special: {
            max: 4,
            playerIds: [74, 75],
        },
        bigGuys: {
            max: 2,
            playerIds: [38, 8, 55],
        },
    },
};

const collegeOfBeasts: DungeonBowlCollege = {
    name: 'Beasts',
    id: 107,
    characteristics: {
        speed: 2,
        power: 5,
        skill: 1,
        aggression: 4,
        resilience: 3,
    },
    players: {
        linemen: {
            max: 16,
            playerIds: [9],
        },
        runners: {
            max: 2,
            playerIds: [50],
        },
        blitzers: {
            max: 4,
            playerIds: [53, 141],
        },
        blockers: {
            max: 4,
            playerIds: [10],
        },
        bigGuys: {
            max: 3,
            playerIds: [13, 46, 72, 143],
        },
    },
};
const collegeOfHeavens: DungeonBowlCollege = {
    name: 'Heavens',
    id: 108,
    characteristics: {
        speed: 5,
        power: 4,
        skill: 4,
        aggression: 2,
        resilience: 2,
    },
    players: {
        linemen: {
            max: 16,
            playerIds: [43],
        },
        blitzers: {
            max: 4,
            playerIds: [3],
        },
        throwers: {
            max: 2,
            playerIds: [40],
        },
        blockers: {
            max: 6,
            playerIds: [45],
        },
        special: {
            max: 2,
            playerIds: [44],
        },
    },
};

export const dungeonBowlColleges = {
    colleges: [
        collegeOfFire,
        collegeOfShadows,
        collegeOfMetal,
        collegeOfLight,
        collegeOfDeath,
        collegeOfLife,
        collegeOfBeasts,
        collegeOfHeavens,
    ],
};
