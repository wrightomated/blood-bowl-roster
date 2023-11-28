const fs = require('fs');
const jsonObject = {};
const imperialLineman = {
    id: 1,
    position: 'Imperial Lineman',
    playerStats: [6, 3, 4, 4, 8],
    cost: 45,
    skills: [16],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const imperialThrower = {
    id: 2,
    position: 'Imperial Thrower',
    playerStats: [6, 3, 3, 3, 9],
    cost: 75,
    skills: [46, 47],
    primary: ['G', 'P'],
    secondary: ['A', 'S'],
};

const nobleBlitzer = {
    id: 3,
    position: 'Noble Blitzer',
    playerStats: [7, 3, 3, 4, 9],
    cost: 105,
    skills: [13, 1],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};

const bodyguard = {
    id: 4,
    position: 'Bodyguard',
    playerStats: [6, 3, 3, 5, 9],
    cost: 90,
    skills: [58, 24],
    primary: ['G', 'S'],
    secondary: ['A'],
};

const ogre = {
    id: 5,
    position: 'Ogre',
    playerStats: [5, 5, 4, 5, 10],
    cost: 140,
    skills: [66, 71, 55, 60, 86],
    primary: ['S'],
    secondary: ['A', 'G'],
    bigGuy: true,
};

const goblinBruiserLineman = {
    id: 6,
    position: 'Goblin Bruiser Lineman',
    playerStats: [6, 2, 3, 4, 8],
    cost: 45,
    skills: [4, 78, 81, 60],
    primary: ['A'],
    secondary: ['G', 'P', 'S'],
};

const blackOrc = {
    id: 7,
    position: 'Black Orc',
    playerStats: [4, 4, 4, 5, 10],
    cost: 90,
    skills: [50, 52],
    primary: ['G', 'S'],
    secondary: ['A', 'P'],
};

const trainedTroll = {
    id: 8,
    position: 'Trained Troll',
    playerStats: [4, 5, 5, 5, 10],
    cost: 115,
    skills: [63, 711, 55, 75, 76, 77, 86],
    primary: ['S'],
    secondary: ['A', 'G', 'P'],
    bigGuy: true,
};

const beastmanRunnerLineman = {
    id: 9,
    position: 'Beastman Lineman',
    playerStats: [6, 3, 3, 4, 9],
    cost: 60,
    skills: [30],
    primary: ['G', 'M', 'S'],
    secondary: ['A', 'P'],
};

const chosenBlocker = {
    id: 10,
    position: 'Chosen Blocker',
    playerStats: [5, 4, 3, 5, 10],
    cost: 100,
    skills: [],
    primary: ['G', 'M', 'S'],
    secondary: ['A'],
};
const untrainedTroll = {
    ...trainedTroll,
    id: 64,
    skills: [63, 71, 55, 75, 76, 77, 86],
    position: 'Untrained Troll',
};
const chaosTroll = {
    ...untrainedTroll,
    id: 11,
    position: 'Chaos Troll',
    primary: ['M', 'S'],
    secondary: ['A', 'G'],
};

const chaosOgre = {
    ...ogre,
    id: 12,
    position: 'Chaos Ogre',
    primary: ['M', 'S'],
    secondary: ['A', 'G'],
};

const minotaur = {
    id: 13,
    position: 'Minotaur',
    playerStats: [5, 5, 4, 0, 9],
    cost: 150,
    skills: [71, 17, 30, 55, 60, 88],
    primary: ['M', 'S'],
    secondary: ['A', 'G'],
    bigGuy: true,
};

const darkElfLineman = {
    id: 14,
    position: 'Dark Elf Lineman',
    playerStats: [6, 3, 2, 4, 9],
    cost: 70,
    skills: [],
    primary: ['A', 'G'],
    secondary: ['S'],
};

const darkElfRunner = {
    id: 15,
    position: 'Dark Elf Runner',
    playerStats: [7, 3, 2, 3, 8],
    cost: 80,
    skills: [40],
    primary: ['A', 'G', 'P'],
    secondary: ['S'],
};

const darkElfBlitzer = {
    id: 16,
    position: 'Dark Elf Blitzer',
    playerStats: [7, 3, 2, 4, 9],
    cost: 100,
    skills: [13],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};

const assassin = {
    id: 17,
    position: 'Assassin',
    playerStats: [7, 3, 2, 5, 8],
    cost: 85,
    skills: [20, 80],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};

const witchElf = {
    id: 18,
    position: 'Witch Elf',
    playerStats: [7, 3, 2, 5, 8],
    cost: 110,
    skills: [4, 17, 6],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};

const dwarfBlockerLineman = {
    id: 19,
    position: 'Dwarf Lineman',
    playerStats: [4, 3, 4, 5, 10],
    cost: 70,
    skills: [13, 23, 60],
    primary: ['G', 'S'],
    secondary: ['A'],
};

const dwarfRunner = {
    id: 20,
    position: 'Dwarf Runner',
    playerStats: [6, 3, 3, 4, 9],
    cost: 85,
    skills: [22, 60],
    primary: ['G', 'P'],
    secondary: ['A', 'S'],
};

const dwarfBlitzer = {
    id: 21,
    position: 'Dwarf Blitzer',
    playerStats: [5, 3, 3, 4, 10],
    cost: 80,
    skills: [13, 60],
    primary: ['G', 'S'],
    secondary: ['A', 'P'],
};

const trollSlayer = {
    id: 22,
    position: 'Troll Slayer',
    playerStats: [5, 3, 4, 0, 9],
    cost: 95,
    skills: [13, 14, 17, 60],
    primary: ['G', 'S'],
    secondary: ['A'],
};

const deathroller = {
    id: 23,
    position: 'Deathroller',
    playerStats: [4, 7, 5, 0, 11],
    cost: 170,
    skills: [51, 151, 54, 710, 55, 72, 79, 58],
    primary: ['S'],
    secondary: ['A', 'G'],
};

const unionLineman = {
    id: 24,
    position: 'Union Lineman',
    playerStats: [6, 3, 2, 4, 8],
    cost: 60,
    skills: [],
    primary: ['A', 'G'],
    secondary: ['S'],
};

const unionThrower = {
    id: 25,
    position: 'Union Thrower',
    playerStats: [6, 3, 2, 2, 8],
    cost: 75,
    skills: [46],
    primary: ['A', 'G', 'P'],
    secondary: ['S'],
};

const unionCatcher = {
    id: 26,
    position: 'Union Catcher',
    playerStats: [8, 3, 2, 4, 8],
    cost: 100,
    skills: [1, 44],
    primary: ['A', 'G'],
    secondary: ['S'],
};

const unionBlitzer = {
    id: 27,
    position: 'Union Blitzer',
    playerStats: [7, 3, 2, 3, 9],
    cost: 115,
    skills: [13, 9],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};

const goblinLineman = {
    id: 28,
    position: 'Goblin Lineman',
    playerStats: [6, 2, 3, 4, 8],
    cost: 40,
    skills: [4, 78, 81],
    primary: ['A'],
    secondary: ['G', 'P', 'S'],
};

const bomma = {
    id: 29,
    position: 'Bomma',
    playerStats: [6, 2, 3, 4, 8],
    cost: 45,
    skills: [65, 4, 79, 81],
    primary: ['A'],
    secondary: ['G', 'P', 'S'],
};

const looney = {
    id: 30,
    position: 'Looney',
    playerStats: [6, 2, 3, 0, 8],
    cost: 40,
    skills: [67, 79, 81],
    primary: ['A'],
    secondary: ['G', 'S'],
};

const fanatic = {
    id: 31,
    position: 'Fanatic',
    playerStats: [3, 7, 3, 0, 8],
    cost: 70,
    skills: [64, 72, 79, 81],
    primary: ['S'],
    secondary: ['A', 'G'],
};

const pogoer = {
    id: 32,
    position: 'Pogoer',
    playerStats: [7, 2, 3, 5, 8],
    cost: 75,
    skills: [4, 74, 81],
    primary: ['A'],
    secondary: ['G', 'P', 'S'],
};

const ooligan = {
    id: 33,
    position: "'Ooligan'",
    playerStats: [6, 2, 3, 6, 8],
    cost: 65,
    skills: [15, 27, 4, 78, 81],
    primary: ['A'],
    secondary: ['G', 'P', 'S'],
};
const doomDiver = {
    id: 34,
    position: 'Doom Diver',
    playerStats: [6, 2, 3, 6, 8],
    cost: 60,
    skills: [78, 81, 83],
    primary: ['A'],
    secondary: ['G', 'S'],
};
const halflingHopefulLineman = {
    id: 35,
    position: 'Halfling Hopeful Lineman',
    playerStats: [5, 2, 3, 4, 7],
    cost: 30,
    skills: [4, 78, 81],
    primary: ['A'],
    secondary: ['G', 'S'],
};
const heftys = {
    id: 36,
    position: 'Halfling Hefty',
    playerStats: [5, 2, 3, 3, 8],
    cost: 50,
    skills: [4, 16, 81],
    primary: ['A', 'P'],
    secondary: ['G', 'S'],
};

const halflingCatcher = {
    id: 37,
    position: 'Halfling Catcher',
    playerStats: [5, 2, 3, 5, 7],
    cost: 55,
    skills: [1, 4, 78, 11, 81],
    primary: ['A'],
    secondary: ['G', 'S'],
};

const treeman = {
    id: 38,
    position: 'Altern Forest Treeman',
    playerStats: [2, 6, 5, 5, 11],
    cost: 120,
    skills: [55, 58, 59, 84, 60, 86, 87],
    primary: ['S'],
    secondary: ['A', 'G', 'P'],
    bigGuy: true,
};

const humanLineman = {
    id: 39,
    position: 'Human Lineman',
    playerStats: [6, 3, 3, 4, 9],
    cost: 50,
    skills: [],
    primary: ['G'],
    secondary: ['A', 'S'],
};

const humanThrower = {
    id: 40,
    position: 'Human Thrower',
    playerStats: [6, 3, 3, 2, 9],
    cost: 80,
    skills: [46, 22],
    primary: ['G', 'P'],
    secondary: ['A', 'S'],
};

const humanCatcher = {
    id: 41,
    position: 'Human Catcher',
    playerStats: [8, 2, 3, 5, 8],
    cost: 65,
    skills: [1, 4],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};

const humanBlitzer = {
    id: 42,
    position: 'Human Blitzer',
    playerStats: [7, 3, 3, 4, 9],
    cost: 85,
    skills: [13],
    primary: ['G', 'S'],
    secondary: ['A', 'P'],
};

const skinkRunnerLineman = {
    id: 43,
    position: 'Skink Lineman',
    playerStats: [8, 2, 3, 4, 8],
    cost: 60,
    skills: [4, 81],
    primary: ['A'],
    secondary: ['G', 'P', 'S'],
};

const chameleonSkink = {
    id: 44,
    position: 'Chameleon Skinks',
    playerStats: [7, 2, 3, 3, 8],
    cost: 70,
    skills: [4, 45, 20, 81],
    primary: ['A'],
    secondary: ['G', 'P', 'S'],
};

const saurusBlocker = {
    id: 45,
    position: 'Saurus Blocker',
    playerStats: [6, 4, 5, 6, 10],
    cost: 85,
    skills: [],
    primary: ['G', 'S'],
    secondary: ['A'],
};

const kroxigor = {
    id: 46,
    position: 'Kroxigor',
    playerStats: [6, 5, 5, 0, 10],
    cost: 140,
    skills: [66, 71, 55, 33, 60],
    primary: ['S'],
    secondary: ['A', 'G'],
};

const zombieLineman = {
    id: 47,
    position: 'Zombie Lineman',
    playerStats: [4, 3, 4, 0, 9],
    cost: 40,
    skills: [77],
    primary: ['G'],
    secondary: ['A', 'S'],
};

const ghoulRunner = {
    id: 48,
    position: 'Ghoul Runner',
    playerStats: [7, 3, 3, 4, 8],
    cost: 75,
    skills: [4],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};
const wraith = {
    id: 49,
    position: 'Wraith',
    playerStats: [6, 3, 3, 0, 9],
    cost: 95,
    skills: [13, 29, 72, 77, 9],
    primary: ['G', 'S'],
    secondary: ['A'],
};
const werewolf = {
    id: 50,
    position: 'Werewolf',
    playerStats: [8, 3, 3, 4, 9],
    cost: 125,
    skills: [26, 17, 77],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};
const fleshGolem = {
    id: 51,
    position: 'Flesh Golem',
    playerStats: [4, 4, 4, 0, 10],
    cost: 115,
    skills: [77, 58, 60],
    primary: ['G', 'S'],
    secondary: ['A'],
};
const rotterLineman = {
    id: 52,
    position: 'Rotter Lineman',
    playerStats: [5, 3, 4, 6, 9],
    cost: 35,
    skills: [68, 73],
    primary: ['G', 'M'],
    secondary: ['A', 'S'],
};
const pestigor = {
    id: 53,
    position: 'Pestigor',
    playerStats: [6, 3, 3, 4, 9],
    cost: 75,
    skills: [30, 73, 77],
    primary: ['G', 'M', 'S'],
    secondary: ['A', 'P'],
};
const bloater = {
    id: 54,
    position: 'Bloater',
    playerStats: [4, 4, 4, 6, 10],
    cost: 115,
    skills: [27, 29, 73, 77],
    primary: ['G', 'M', 'S'],
    secondary: ['A'],
};
const rotspawn = {
    id: 55,
    position: 'Rotspawn',
    playerStats: [4, 5, 5, 0, 10],
    cost: 140,
    skills: [27, 29, 71, 55, 73, 76, 77, 34],
    primary: ['S'],
    secondary: ['A', 'G', 'M'],
};
const gnoblarLineman = {
    id: 56,
    position: 'Gnoblar Lineman',
    playerStats: [5, 1, 3, 5, 6],
    cost: 15,
    skills: [4, 78, 9, 81, 85],
    primary: ['A'],
    secondary: ['G'],
};
const ogreRuntPunter = {
    id: 57,
    position: 'Ogre Runt Punter',
    playerStats: [5, 5, 4, 4, 10],
    cost: 145,
    skills: [66, 70, 55, 60],
    primary: ['P', 'S'],
    secondary: ['A', 'G'],
};

const ogreBlocker = {
    id: 58,
    position: 'Ogre Blocker',
    playerStats: [5, 5, 4, 5, 10],
    cost: 140,
    skills: [66, 55, 60, 86],
    primary: ['S'],
    secondary: ['A', 'G', 'P'],
};

const orcLineman = {
    id: 59,
    position: 'Orc Lineman',
    playerStats: [5, 3, 3, 4, 10],
    cost: 50,
    skills: [624],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const orcThrower = {
    id: 60,
    position: 'Orc Thrower',
    playerStats: [5, 3, 3, 3, 9],
    cost: 65,
    skills: [620, 46, 22],
    primary: ['G', 'P'],
    secondary: ['A', 'S'],
};
const orcBlitzer = {
    id: 61,
    position: 'Orc Blitzer',
    playerStats: [6, 3, 3, 4, 10],
    cost: 80,
    skills: [620, 13],
    primary: ['G', 'S'],
    secondary: ['A', 'P'],
};
const bigUnBlocker = {
    id: 62,
    position: 'Big Un Blocker',
    playerStats: [5, 4, 4, 0, 10],
    cost: 90,
    skills: [625],
    primary: ['G', 'S'],
    secondary: ['A'],
};
const orcGoblin = {
    ...goblinLineman,
    id: 63,
    secondary: ['G', 'S'],
};
const skeletonLineman = {
    id: 65,
    position: 'Skeleton Lineman',
    playerStats: [5, 3, 4, 6, 8],
    cost: 40,
    skills: [77, 60],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const wightBlitzer = {
    id: 66,
    position: 'Wight Blitzer',
    playerStats: [6, 3, 3, 5, 9],
    cost: 90,
    skills: [13, 77],
    primary: ['G', 'S'],
    secondary: ['A', 'P'],
};
const mummy = {
    id: 67,
    position: 'Mummy',
    playerStats: [3, 5, 5, 0, 10],
    cost: 125,
    skills: [55, 77],
    primary: ['S'],
    secondary: ['A', 'G'],
};
const skavenClanratLineman = {
    id: 68,
    position: 'Skaven Lineman',
    playerStats: [7, 3, 3, 4, 8],
    cost: 50,
    skills: [],
    primary: ['G'],
    secondary: ['A', 'M', 'S'],
};
const skavenThrower = {
    id: 69,
    position: 'Skaven Thrower',
    playerStats: [7, 3, 3, 2, 8],
    cost: 85,
    skills: [46, 22],
    primary: ['G', 'P'],
    secondary: ['A', 'M', 'S'],
};
const gutterRunner = {
    id: 70,
    position: 'Gutter Runner',
    playerStats: [9, 2, 2, 4, 8],
    cost: 85,
    skills: [4],
    primary: ['A', 'G'],
    secondary: ['M', 'P', 'S'],
};
const skavenBlitzer = {
    id: 71,
    position: 'Skaven Blitzer',
    playerStats: [7, 3, 3, 5, 9],
    cost: 90,
    skills: [13],
    primary: ['G', 'S'],
    secondary: ['A', 'M', 'P'],
};
const ratOgre = {
    id: 72,
    position: 'Rat Ogre',
    playerStats: [6, 5, 4, 0, 9],
    cost: 150,
    skills: [61, 17, 71, 55, 33],
    primary: ['S'],
    secondary: ['A', 'G', 'M'],
    bigGuy: true,
};
const snotlingLineman = {
    id: 73,
    position: 'Snotling Lineman',
    playerStats: [5, 1, 3, 5, 6],
    cost: 15,
    skills: [4, 78, 9, 81, 82, 85],
    primary: ['A'],
    secondary: ['G'],
};
const fungusFlinga = {
    id: 74,
    position: 'Fungus Flinga',
    playerStats: [5, 1, 3, 4, 6],
    cost: 30,
    skills: [65, 4, 78, 79, 9, 81],
    primary: ['A', 'P'],
    secondary: ['G'],
};
const funHoppa = {
    id: 75,
    position: 'Fun-hoppa',
    playerStats: [6, 1, 3, 5, 6],
    cost: 20,
    skills: [4, 74, 78, 9, 81],
    primary: ['A'],
    secondary: ['G'],
};
const stiltyRunna = {
    id: 76,
    position: 'Stilty Runna',
    playerStats: [6, 1, 3, 5, 6],
    cost: 20,
    skills: [4, 78, 9, 11, 81],
    primary: ['A'],
    secondary: ['G'],
};
const pumpWagon = {
    id: 77,
    position: 'Pump Wagon',
    playerStats: [4, 5, 5, 0, 9],
    cost: 105,
    skills: [15, 54, 55, 76, 79, 58],
    primary: ['S'],
    secondary: ['A', 'G'],
};
const woodElfLineman = {
    id: 78,
    position: 'Wood Elf Lineman',
    playerStats: [7, 3, 2, 4, 8],
    cost: 70,
    skills: [],
    primary: ['A', 'G'],
    secondary: ['S'],
};
const weThrower = {
    id: 79,
    position: 'Wood Elf Thrower',
    playerStats: [7, 3, 2, 2, 8],
    cost: 95,
    skills: [46],
    primary: ['A', 'G', 'P'],
    secondary: ['S'],
};
const weCatcher = {
    id: 80,
    position: 'Wood Elf Catcher',
    playerStats: [8, 2, 2, 4, 8],
    cost: 90,
    skills: [1, 4],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};
const wardancer = {
    id: 81,
    position: 'Wardancer',
    playerStats: [8, 3, 2, 4, 8],
    cost: 125,
    skills: [13, 4, 7],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};
const weTree = {
    ...treeman,
    id: 82,
    position: 'Loren Forest Treeman',
    skills: [71, 55, 58, 59, 84, 60, 86],
    primary: ['S'],
    secondary: ['A', 'G'],
};
const rHLineman = {
    ...humanLineman,
    id: 83,
    primary: ['G', 'M'],
};
const rHThrower = {
    position: 'Renegade Human Thrower',
    id: 84,
    cost: 75,
    playerStats: [6, 3, 3, 3, 9],
    skills: [620, 46, 8],
    primary: ['G', 'M', 'P'],
    secondary: ['A', 'S'],
};
const rGoblin = {
    ...goblinLineman,
    position: 'Renegade Goblin',
    id: 85,
    skills: [620, 4, 78, 81],
    primary: ['A', 'M'],
    secondary: ['G', 'P'],
};
const rOrc = {
    ...orcLineman,
    position: 'Renegade Orc',
    id: 86,
    playerStats: [5, 3, 3, 5, 10],
    skills: [620],
    primary: ['G', 'M'],
};
const rSkaven = {
    ...skavenClanratLineman,
    position: 'Renegade Skaven',
    id: 87,
    skills: [620],
    primary: ['G', 'M'],
    secondary: ['A', 'S'],
};
const rElf = {
    position: 'Renegade Dark Elf',
    id: 88,
    cost: 75,
    playerStats: [6, 3, 2, 3, 9],
    skills: [620],
    primary: ['A', 'G', 'M'],
    secondary: ['P', 'S'],
};
const rTroll = {
    ...untrainedTroll,
    position: 'Renegade Troll',
    id: 89,
    secondary: ['A', 'G', 'M'],
};
const rOgre = {
    ...ogre,
    position: 'Renegade Ogre',
    id: 90,
    secondary: ['A', 'G', 'M'],
};
const rMinotaur = {
    ...minotaur,
    position: 'Renegade Minotaur',
    id: 91,
    primary: ['S'],
    secondary: ['A', 'G', 'M'],
};
const tribalLinewoman = {
    position: 'Tribal Linewoman',
    id: 92,
    cost: 50,
    playerStats: [6, 3, 3, 4, 8],
    skills: [4],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const eagleThrower = {
    position: 'Eagle Warrior Thrower',
    id: 93,
    cost: 75,
    playerStats: [6, 3, 3, 3, 8],
    skills: [4, 46],
    primary: ['G', 'P'],
    secondary: ['A', 'S'],
};
const piranhaWarrior = {
    position: 'Piranha Warrior Catcher',
    id: 94,
    cost: 75,
    playerStats: [6, 3, 3, 5, 8],
    skills: [1, 4],
    primary: ['A', 'G'],
    secondary: ['S'],
};
const kokoKalim = {
    position: 'Koka Kalim Blitzer',
    id: 95,
    cost: 90,
    playerStats: [6, 3, 3, 5, 8],
    skills: [13, 4],
    primary: ['G', 'S'],
    secondary: ['A'],
};
const hobgoblin = {
    position: 'Hobgoblin Lineman',
    id: 96,
    cost: 40,
    playerStats: [6, 3, 3, 4, 8],
    skills: [],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const chaosDwarf = {
    position: 'Chaos Dwarf Blocker',
    id: 97,
    cost: 70,
    playerStats: [4, 3, 4, 6, 10],
    skills: [13, 23, 60],
    primary: ['G', 'S'],
    secondary: ['A', 'M'],
};
const bullCentaur = {
    position: 'Bull Centaur Blitzer',
    id: 98,
    cost: 130,
    playerStats: [6, 4, 4, 6, 10],
    skills: [11, 12, 60],
    primary: ['G', 'S'],
    secondary: ['A'],
};
const enslavedMin = {
    ...minotaur,
    position: 'Enslaved Minotaur',
    id: 99,
    skills: [61, 17, 30, 71, 55, 60],
    primary: ['S'],
    secondary: ['A', 'G', 'M'],
};
const hELineman = {
    position: 'High Elf Lineman',
    id: 100,
    cost: 70,
    playerStats: [6, 3, 2, 4, 9],
    skills: [],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};
const heThrower = {
    position: 'High Elf Thrower',
    id: 101,
    cost: 100,
    playerStats: [6, 3, 2, 2, 9],
    skills: [39, 46, 48],
    primary: ['A', 'G', 'P'],
    secondary: ['S'],
};
const heCatcher = {
    position: 'High Elf Catcher',
    id: 102,
    cost: 90,
    playerStats: [8, 3, 2, 5, 8],
    skills: [1],
    primary: ['A', 'G'],
    secondary: ['S'],
};
const heBlitzer = {
    position: 'High Elf Blitzer',
    id: 103,
    cost: 100,
    playerStats: [7, 3, 2, 4, 9],
    skills: [13],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};
const norseL = {
    position: 'Norse Lineman',
    id: 104,
    cost: 50,
    playerStats: [6, 3, 3, 4, 8],
    skills: [13],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const norseT = {
    position: 'Norse Thrower',
    id: 105,
    cost: 70,
    playerStats: [6, 3, 3, 3, 8],
    skills: [13, 46],
    primary: ['G', 'P'],
    secondary: ['A', 'S'],
};
const norseC = {
    position: 'Norse Catcher',
    id: 106,
    cost: 90,
    playerStats: [7, 3, 3, 5, 8],
    skills: [13, 14],
    primary: ['A', 'G'],
    secondary: ['S'],
};
const norseB = {
    position: 'Norse Berserker',
    id: 107,
    cost: 90,
    playerStats: [6, 3, 3, 5, 8],
    skills: [13, 17, 6],
    primary: ['G', 'S'],
    secondary: ['A'],
};
const ulfwerner = {
    position: 'Ulfwerner',
    id: 108,
    cost: 105,
    playerStats: [6, 4, 4, 0, 9],
    skills: [17],
    primary: ['G', 'S'],
    secondary: ['A'],
};
const yhetee = {
    position: 'Yhetee',
    id: 109,
    cost: 140,
    playerStats: [5, 5, 5, 0, 9],
    skills: [26, 27, 17, 71, 88],
    primary: ['S'],
    secondary: ['A', 'G'],
};
const anointedT = {
    position: 'Anointed Thrower',
    id: 110,
    cost: 70,
    playerStats: [6, 3, 4, 3, 8],
    skills: [46, 77, 22, 60],
    primary: ['G', 'P'],
    secondary: ['A'],
};
const anointedB = {
    position: 'Anointed Blitzer',
    id: 111,
    cost: 90,
    playerStats: [6, 3, 4, 6, 9],
    skills: [13, 77, 60],
    primary: ['G', 'S'],
    secondary: ['A', 'P'],
};
const tombGuardian = {
    position: 'Tomb Guardian',
    id: 112,
    cost: 100,
    playerStats: [4, 5, 5, 0, 10],
    skills: [68, 77],
    primary: ['S'],
    secondary: ['A', 'G'],
};
const thrallLineman = {
    position: 'Thrall Lineman',
    id: 113,
    cost: 40,
    playerStats: [6, 3, 3, 5, 8],
    skills: [],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const vampire = {
    position: 'Vampire Blitzer',
    id: 114,
    cost: 110,
    playerStats: [6, 4, 2, 3, 9],
    skills: [61, 69, 77],
    primary: ['A', 'G', 'S'],
    secondary: ['P'],
};
const owHL = {
    ...humanLineman,
    position: 'Old World Human Lineman',
    id: 115,
};
const owHT = {
    ...humanThrower,
    playerStats: [6, 3, 3, 3, 9],
    position: 'Old World Human Thrower',
    skills: [621].concat(humanThrower.skills),
    id: 116,
};
const owHC = {
    ...humanCatcher,
    position: 'Old World Human Catcher',
    id: 117,
    skills: [621].concat(humanCatcher.skills),
    secondary: ['S'],
};
const owHB = {
    ...humanBlitzer,
    position: 'Old World Human Blitzer',
    id: 118,
    cost: 90,
    skills: [621].concat(humanBlitzer.skills),
    secondary: ['A'],
};
const owDBlocker = {
    ...dwarfBlockerLineman,
    position: 'Old World Dwarf Blocker',
    id: 119,
    cost: 75,
    skills: [49, 50, 711, 60],
};
const owDR = {
    ...dwarfRunner,
    position: 'Old World Dwarf Runner',
    id: 120,
    cost: 85,
    skills: [711].concat(dwarfRunner.skills),
};
const owDBlitzer = {
    ...dwarfBlitzer,
    position: 'Old World Dwarf Blitzer',
    id: 121,
    skills: [13, 711, 60],
    secondary: ['A'],
};
const owDTS = {
    ...trollSlayer,
    position: 'Old World Dwarf Troll Slayer',
    id: 122,
    skills: [13, 14, 17, 711, 60],
};
const owHH = {
    ...halflingHopefulLineman,
    position: 'Old World Halfling Hopeful',
    id: 123,
    skills: [622].concat(halflingHopefulLineman.skills),
};
const owTree = {
    ...treeman,
    id: 124,
    skills: [71].concat(treeman.skills),
};
const uwGoblin = {
    ...goblinLineman,
    id: 125,
    position: 'Underworld Goblin Lineman',
    primary: ['A', 'M'],
    secondary: ['G', 'S'],
};
const uwSnotling = {
    ...snotlingLineman,
    id: 126,
    position: 'Underworld Snotling',
    primary: ['A', 'M'],
    secondary: ['G'],
};
const uwClanrat = {
    ...skavenClanratLineman,
    id: 127,
    position: 'Skaven Clanrat',
    skills: [623],
    primary: ['G', 'M'],
    secondary: ['A', 'S'],
};
const uwThrower = {
    ...skavenThrower,
    id: 128,
    position: 'Skaven Thrower',
    skills: [623].concat(skavenThrower.skills),
    primary: ['G', 'M', 'P'],
    secondary: ['A', 'S'],
};
const uwRunner = {
    ...gutterRunner,
    id: 129,
    position: 'Gutter Runner',
    skills: [623].concat(gutterRunner.skills),
    primary: ['A', 'G', 'M'],
    secondary: ['P', 'S'],
};
const uwBlitzer = {
    ...skavenBlitzer,
    id: 130,
    position: 'Skaven Blitzer',
    skills: [623].concat(skavenBlitzer.skills),
    primary: ['G', 'M', 'S'],
    secondary: ['A', 'P'],
};
const uwTroll = {
    ...untrainedTroll,
    id: 131,
    position: 'Underworld Troll',
    primary: ['M', 'S'],
    secondary: ['A', 'G', 'P'],
};
const uwRatOgre = {
    ...ratOgre,
    id: 132,
    position: 'Mutant Rat Ogre',
    primary: ['M', 'S'],
    secondary: ['A', 'G'],
};
const pitFighter = {
    position: 'Pit Fighter',
    id: 133,
    cost: 60,
    playerStats: [6, 3, 3, 4, 9],
    skills: [17],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const bloodletter = {
    position: 'Bloodletter Daemon',
    id: 134,
    cost: 80,
    playerStats: [6, 3, 3, 4, 8],
    skills: [30, 54, 77],
    primary: ['G', 'A', 'S'],
    secondary: ['P'],
};
const kHerald = {
    position: 'Khorne Herald',
    id: 135,
    cost: 90,
    playerStats: [6, 3, 3, 5, 9],
    skills: [17, 30, 54],
    primary: ['G', 'S'],
    secondary: ['A', 'P'],
};
const bloodthirster = {
    position: 'Bloodthirster',
    id: 136,
    cost: 180,
    playerStats: [6, 5, 5, 0, 10],
    skills: [26, 17, 30, 54, 71, 88, 77],
    primary: ['S'],
    secondary: ['G', 'A'],
};
const slannLineman = {
    position: 'Lineman',
    id: 137,
    cost: 60,
    playerStats: [6, 3, 3, 4, 9],
    skills: [74, 36],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const slannCatcher = {
    position: 'Catcher',
    id: 138,
    cost: 80,
    playerStats: [7, 2, 2, 4, 8],
    skills: [2, 74, 36],
    primary: ['G', 'A'],
    secondary: ['S', 'P'],
};
const slannBlitzer = {
    position: 'Blitzer',
    id: 139,
    cost: 110,
    playerStats: [7, 3, 3, 4, 9],
    skills: [3, 6, 74, 36],
    primary: ['G', 'A', 'S'],
    secondary: ['P'],
};
const bloodbornMarauderLineman = {
    position: 'Bloodborn Marauder',
    id: 140,
    cost: 50,
    playerStats: [6, 3, 3, 4, 8],
    skills: [17],
    primary: ['G', 'M'],
    secondary: ['A', 'S'],
};
const khorngor = {
    position: 'Khorngor',
    id: 141,
    cost: 70,
    playerStats: [6, 3, 3, 4, 9],
    skills: [30, 54],
    primary: ['G', 'M', 'S'],
    secondary: ['A', 'P'],
};
const bloodseeker = {
    position: 'Bloodseeker',
    id: 142,
    cost: 110,
    playerStats: [5, 4, 4, 6, 10],
    skills: [17],
    primary: ['G', 'M', 'S'],
    secondary: ['A'],
};
const khorneBigGuy = {
    position: 'Bloodspawn',
    id: 143,
    cost: 160,
    playerStats: [5, 5, 4, 0, 9],
    skills: [26, 17, 71, 55, 88],
    primary: ['M', 'S'],
    secondary: ['G', 'A'],
};
const norseRaiderLineman = {
    position: 'Norse Raider Lineman',
    id: 144,
    cost: 50,
    playerStats: [6, 3, 3, 4, 8],
    skills: [13, 93, 60],
    primary: ['G'],
    secondary: ['A', 'P', 'S'],
};
const norseBerserker = {
    position: 'Norse Berserker',
    id: 145,
    cost: 90,
    playerStats: [6, 3, 3, 5, 8],
    skills: [13, 17, 6],
    primary: ['G', 'S'],
    secondary: ['A', 'P'],
};
const norseValkyrie = {
    position: 'Valkyrie',
    id: 146,
    cost: 95,
    playerStats: [7, 3, 3, 3, 8],
    skills: [1, 14, 46, 21],
    primary: ['A', 'G', 'P'],
    secondary: ['S'],
};
const norseUlfwerner = {
    position: 'Ulfwerener',
    id: 147,
    cost: 105,
    playerStats: [6, 4, 4, 0, 9],
    skills: [17],
    primary: ['G', 'S'],
    secondary: ['A'],
};
const norseYhetee = {
    position: 'Yhetee',
    id: 148,
    cost: 140,
    playerStats: [5, 5, 4, 0, 9],
    skills: [26, 27, 17, 71, 88],
    primary: ['S'],
    secondary: ['A', 'G'],
};
const norseBeerBoar = {
    position: 'Beer Boar',
    id: 149,
    cost: 20,
    playerStats: [5, 1, 3, 0, 6],
    skills: [4, 72, 94, 81, 85],
    primary: [],
    secondary: ['A'],
};
const dbGnoblarLineman = {
    ...gnoblarLineman,
    id: 150,
};
const dbSnotling = {
    ...snotlingLineman,
    id: 151,
};
const dbNorseLineman = {
    ...norseRaiderLineman,
    id: 152,
    secondary: ['A', 'S'],
};
const eagleLinewoman = {
    position: 'Eagle Warrior Linewoman',
    id: 153,
    cost: 50,
    playerStats: [6, 3, 3, 4, 8],
    skills: [4],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const piranhaBlitzer = {
    position: 'Piranha Warrior Blitzer',
    id: 154,
    cost: 90,
    playerStats: [7, 3, 3, 5, 8],
    skills: [4, 95, 6],
    primary: ['A', 'G'],
    secondary: ['S'],
};
const pythonThrower = {
    position: 'Python Warrior Thrower',
    id: 155,
    cost: 80,
    playerStats: [6, 3, 3, 3, 8],
    skills: [4, 45, 46, 48],
    primary: ['G', 'P'],
    secondary: ['A', 'S'],
};
const jaguarBlocker = {
    position: 'Jaguar Warrior Blocker',
    id: 156,
    cost: 110,
    playerStats: [6, 4, 3, 5, 9],
    skills: [5, 4],
    primary: ['G', 'S'],
    secondary: ['A'],
};
const dbPiranhaBlitzer = {
    ...piranhaBlitzer,
    id: 157,
};
const dbPythonThrower = {
    ...pythonThrower,
    id: 158,
    cost: 75,
};
const dbJaguarBlocker = {
    ...jaguarBlocker,
    id: 159,
};
const vampireThrower = {
    position: 'Vampire Thrower',
    id: 160,
    cost: 110,
    playerStats: [6, 4, 2, 2, 9],
    // bloodlust 2+, hypnotic gaze, pass, regeneration
    skills: [96, 69, 46, 77],
    primary: ['A', 'G', 'P'],
    secondary: ['S'],
};
const vampireBlitzer = {
    position: 'Vampire Blitzer',
    id: 161,
    cost: 110,
    playerStats: [6, 4, 2, 5, 9],
    // bloodlust 3+, hypnotic gaze, regeneration, juggernaut
    skills: [97, 69, 54, 77],
    primary: ['A', 'G', 'S'],
    secondary: [],
};
const vampireRunner = {
    position: 'Vampire Runner',
    id: 162,
    cost: 100,
    playerStats: [8, 3, 2, 4, 8],
    // bloodlust 2+, hypnotic gaze, regeneration
    skills: [96, 77, 69],
    primary: ['A', 'G'],
    secondary: ['P', 'S'],
};
const thrallLinemanV2 = {
    position: 'Thrall Lineman',
    id: 163,
    cost: 40,
    playerStats: [6, 3, 3, 4, 8],
    skills: [],
    primary: ['G'],
    secondary: ['A', 'S'],
};
const vargheist = {
    position: 'Vargheist',
    id: 164,
    cost: 150,
    playerStats: [5, 5, 4, 0, 10],
    // bloodlust 3+, regeneration, frenzy, claws, loner 4+
    skills: [97, 26, 17, 71, 77],
    primary: ['S'],
    secondary: ['A', 'G'],
};

[
    imperialLineman,
    imperialThrower,
    nobleBlitzer,
    bodyguard,
    ogre,
    goblinBruiserLineman,
    blackOrc,
    trainedTroll,
    beastmanRunnerLineman,
    chosenBlocker,
    chaosTroll,
    chaosOgre,
    minotaur,
    darkElfRunner,
    darkElfLineman,
    darkElfBlitzer,
    assassin,
    witchElf,
    dwarfBlockerLineman,
    dwarfRunner,
    dwarfBlitzer,
    trollSlayer,
    deathroller,
    unionLineman,
    unionThrower,
    unionCatcher,
    unionBlitzer,
    goblinLineman,
    bomma,
    looney,
    fanatic,
    pogoer,
    ooligan,
    doomDiver,
    halflingHopefulLineman,
    heftys,
    halflingCatcher,
    treeman,
    humanLineman,
    humanThrower,
    humanCatcher,
    humanBlitzer,
    skinkRunnerLineman,
    chameleonSkink,
    saurusBlocker,
    kroxigor,
    ghoulRunner,
    wraith,
    werewolf,
    fleshGolem,
    zombieLineman,
    rotterLineman,
    pestigor,
    bloater,
    rotspawn,
    gnoblarLineman,
    ogreRuntPunter,
    ogreBlocker,
    orcLineman,
    orcThrower,
    orcBlitzer,
    bigUnBlocker,
    orcGoblin,
    untrainedTroll,
    skeletonLineman,
    wightBlitzer,
    mummy,
    skavenClanratLineman,
    skavenThrower,
    gutterRunner,
    skavenBlitzer,
    ratOgre,
    snotlingLineman,
    fungusFlinga,
    funHoppa,
    stiltyRunna,
    pumpWagon,
    woodElfLineman,
    weThrower,
    weCatcher,
    wardancer,
    weTree,
    rHLineman,
    rHThrower,
    rGoblin,
    rOrc,
    rSkaven,
    rElf,
    rTroll,
    rOgre,
    rMinotaur,
    tribalLinewoman,
    eagleThrower,
    piranhaWarrior,
    kokoKalim,
    hobgoblin,
    chaosDwarf,
    bullCentaur,
    enslavedMin,
    hELineman,
    heThrower,
    heCatcher,
    heBlitzer,
    norseL,
    norseT,
    norseC,
    norseB,
    ulfwerner,
    yhetee,
    anointedT,
    anointedB,
    tombGuardian,
    thrallLineman,
    vampire,
    owHB,
    owHC,
    owHL,
    owHT,
    owDBlocker,
    owDR,
    owDBlitzer,
    owDTS,
    owHH,
    owTree,
    uwGoblin,
    uwSnotling,
    uwClanrat,
    uwThrower,
    uwRunner,
    uwBlitzer,
    uwTroll,
    uwRatOgre,
    pitFighter,
    bloodletter,
    kHerald,
    bloodthirster,
    slannLineman,
    slannCatcher,
    slannBlitzer,
    bloodbornMarauderLineman,
    khorngor,
    bloodseeker,
    khorneBigGuy,
    norseBerserker,
    norseRaiderLineman,
    norseBeerBoar,
    norseValkyrie,
    norseUlfwerner,
    norseYhetee,
    dbGnoblarLineman,
    dbSnotling,
    dbNorseLineman,
    eagleLinewoman,
    piranhaBlitzer,
    pythonThrower,
    jaguarBlocker,
    dbPiranhaBlitzer,
    dbPythonThrower,
    dbJaguarBlocker,
    vampireThrower,
    vampireBlitzer,
    vampireRunner,
    thrallLinemanV2,
    vargheist,
].forEach((player) => {
    jsonObject[player.id + ''] = player.position;
});

// Convert the JSON object into a string
const jsonS = JSON.stringify(jsonObject, null, 2);

// Write the string to a new file
fs.writeFileSync('./playerPositions.json', jsonS);
