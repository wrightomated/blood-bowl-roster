import type { Player, PlayerCatalogue } from "../models/player.model";

const imperialLineman: Player = {
  id: 1,
  position: "Imperial Retainer Lineman",
  playerStats: [6, 3, 4, 4, 8],
  cost: 45,
  skills: [16],
  primary: ["G"],
  secondary: ["A", "S"],
};
const imperialThrower: Player = {
  id: 2,
  position: "Imperial Thrower",
  playerStats: [6, 3, 3, 3, 9],
  cost: 75,
  skills: [46, 47],
  primary: ["G", "P"],
  secondary: ["A", "S"],
};

const nobleBlitzer: Player = {
  id: 3,
  position: "Noble Blitzer",
  playerStats: [7, 3, 3, 4, 9],
  cost: 105,
  skills: [13, 1],
  primary: ["A", "G"],
  secondary: ["P", "S"],
};

const bodyguard: Player = {
  id: 4,
  position: "Bodyguard",
  playerStats: [6, 3, 3, 5, 9],
  cost: 90,
  skills: [58, 24],
  primary: ["G", "S"],
  secondary: ["A"],
};

const ogre: Player = {
  id: 5,
  position: "Ogre",
  playerStats: [5, 5, 4, 5, 10],
  cost: 140,
  skills: [66, 71, 55, 60, 86],
  primary: ["S"],
  secondary: ["A", "G"],
};

const goblinBruiserLineman: Player = {
  id: 6,
  position: "Goblin Bruiser Lineman",
  playerStats: [6, 3, 2, 4, 8],
  cost: 45,
  skills: [4, 78, 81, 60],
  primary: ["A"],
  secondary: ["G", "P", "S"],
};

const blackOrc: Player = {
  id: 7,
  position: "Black Orc",
  playerStats: [6, 3, 3, 5, 9],
  cost: 90,
  skills: [50, 52],
  primary: ["G", "S"],
  secondary: ["A", "P"],
};

const trainedTroll: Player = {
  id: 8,
  position: "Trained Troll",
  playerStats: [4, 5, 5, 5, 10],
  cost: 115,
  skills: [63, 711, 55, 75, 76, 77, 86],
  primary: ["S"],
  secondary: ["A", "G", "P"],
};

const beastmanRunnerLineman: Player = {
  id: 9,
  position: "Beastman Runner Lineman",
  playerStats: [6, 3, 3, 4, 9],
  cost: 60,
  skills: [30],
  primary: ["G", "M", "S"],
  secondary: ["A", "P"],
};

const chosenBlocker: Player = {
  id: 10,
  position: "Chosen Blocker",
  playerStats: [5, 4, 3, 5, 10],
  cost: 60,
  skills: [],
  primary: ["G", "M", "S"],
  secondary: ["A", "P"],
};
const untrainedTroll: Player = {
  ...trainedTroll,
  id:64,
  skills: [63, 71, 55, 75, 76, 77, 86],
  position: 'Untrained Troll'
}
const chaosTroll: Player = {
  ...untrainedTroll,
  id: 11,
  position: "Chaos Troll",
  primary: ["M", "S"],
  secondary: ["A", "G"],
};

const chaosOgre: Player = {
  ...ogre,
  id: 12,
  position: "Chaos Ogre",
  primary: ["M", "S"],
  secondary: ["A", "G"],
};

const minotaur: Player = {
  id: 13,
  position: "Minotaur",
  playerStats: [5, 5, 4, 0, 9],
  cost: 150,
  skills: [71,17,30,55,60,88],
  primary: ["M", "S"],
  secondary: ["A", "G"],
};

const darkElfLineman: Player = {
  id: 14,
  position: "Dark Elf Lineman",
  playerStats: [6, 3, 2, 4, 9],
  cost: 70,
  skills: [],
  primary: ["A", "G"],
  secondary: ["S"],
};

const darkElfRunner: Player = {
  id: 15,
  position: "Runner",
  playerStats: [7, 3, 2, 3, 8],
  cost: 80,
  skills: [40],
  primary: ["A", "G", "P"],
  secondary: ["S"],
};

const darkElfBlitzer: Player = {
  id: 16,
  position: "Blitzer",
  playerStats: [7, 3, 2, 4, 9],
  cost: 100,
  skills: [13],
  primary: ["A", "G"],
  secondary: ["P", "S"],
};

const assassin: Player = {
  id: 17,
  position: "Assassin",
  playerStats: [7, 3, 2, 5, 8],
  cost: 85,
  skills: [20,80],
  primary: ["A", "G"],
  secondary: ["P", "S"],
};

const witchElf: Player = {
  id: 18,
  position: "Witch Elf",
  playerStats: [7, 3, 2, 5, 8],
  cost: 110,
  skills: [4,17,6],
  primary: ["A", "G"],
  secondary: ["P", "S"],
};

const dwarfBlockerLineman: Player = {
  id: 19,
  position: "Dwarf Blocker Lineman",
  playerStats: [4, 3, 4, 5, 10],
  cost: 70,
  skills: [13, 23, 60],
  primary: ["G", "S"],
  secondary: ["A"],
};

const dwarfRunner: Player = {
  id: 20,
  position: "Runner",
  playerStats: [6, 3, 3, 4, 9],
  cost: 85,
  skills: [22, 60],
  primary: ["G", "P"],
  secondary: ["A", "S"],
};

const dwarfBlitzer: Player = {
  id: 21,
  position: "Blitzer",
  playerStats: [5, 3, 3, 4, 10],
  cost: 80,
  skills: [13, 60],
  primary: ["G", "S"],
  secondary: ["A", "P"],
};

const trollSlayer: Player = {
  id: 22,
  position: "Troll Slayer",
  playerStats: [5, 3, 4, 0, 9],
  cost: 95,
  skills: [13, 14, 17, 60],
  primary: ["G", "S"],
  secondary: ["A"],
};

const deathroller: Player = {
  id: 23,
  position: "Deathroller",
  playerStats: [4, 7, 5, 0, 11],
  cost: 170,
  skills: [51, 15, 54, 710, 55, 72, 79, 58],
  primary: ["G", "S"],
  secondary: ["A"],
};

const unionLineman: Player = {
  id: 24,
  position: "Lineman",
  playerStats: [6, 3, 2, 4, 8],
  cost: 60,
  skills: [],
  primary: ["A", "G"],
  secondary: ["S"],
};

const unionThrower: Player = {
  id: 25,
  position: "Thrower",
  playerStats: [6, 3, 2, 2, 8],
  cost: 75,
  skills: [46],
  primary: ["A", "G", "P"],
  secondary: ["S"],
};

const unionCatcher: Player = {
  id: 26,
  position: "Catcher",
  playerStats: [8, 3, 2, 4, 8],
  cost: 100,
  skills: [1, 44],
  primary: ["A", "G"],
  secondary: ["S"],
};

const unionBlitzer: Player = {
  id: 27,
  position: "Blitzer",
  playerStats: [7, 3, 2, 3, 9],
  cost: 115,
  skills: [13, 9],
  primary: ["A", "G"],
  secondary: ["P", "S"],
};

const goblinLineman: Player = {
  id: 28,
  position: "Goblin Lineman",
  playerStats: [6, 2, 3, 4, 8],
  cost: 40,
  skills: [4, 78, 81],
  primary: ["A"],
  secondary: ["G", "P", "S"],
}

const bomma: Player = {
  id: 29,
  position: "Bomma",
  playerStats: [6, 2, 3, 4, 8],
  cost: 45,
  skills: [65, 4, 79, 81],
  primary: ["A"],
  secondary: ["G", "P", "S"],
}

const looney: Player = {
  id: 30,
  position: "Looney",
  playerStats: [6, 2, 3, 0, 8],
  cost: 40,
  skills: [67, 79, 81],
  primary: ["A"],
  secondary: ["G", "S"],
}

const fanatic: Player = {
  id: 31,
  position: "Fanatic",
  playerStats: [3, 7, 3, 0, 8],
  cost: 70,
  skills: [64, 72, 79, 81],
  primary: ["S"],
  secondary: ["A", "G"],
}

const pogoer: Player = {
  id: 32,
  position: "Pogoer",
  playerStats: [7, 2, 3, 5, 8],
  cost: 75,
  skills: [4, 74, 81],
  primary: ["S"],
  secondary: ["A", "G"],
}

const ooligan: Player = {
  id: 33,
  position: "'Ooligan'",
  playerStats: [6, 2, 3, 6, 8],
  cost: 65,
  skills: [15, 27, 4, 78, 81],
  primary: ["A"],
  secondary: ["G", "P", "S"],
}
const doomDiver: Player = {
  id: 34,
  position: "Doom Diver",
  playerStats: [6, 2, 3, 6, 8],
  cost: 60,
  skills: [78, 81, 83],
  primary: ["A"],
  secondary: ["G", "S"],
}
const halflingHopefulLineman: Player = {
  id: 35,
  position: "Halfling Hopeful Lineman",
  playerStats: [5, 2, 3, 4, 7],
  cost: 30,
  skills: [4, 78, 81],
  primary: ["A"],
  secondary: ["G", "S"],
}
const heftys: Player = {
  id: 36,
  position: "Halfling Heftys",
  playerStats: [5, 2, 3, 3, 8],
  cost: 50,
  skills: [4, 16, 81],
  primary: ["A", "P"],
  secondary: ["G", "S"],
}

const halflingCatcher: Player = {
  id: 37,
  position: "Halfling Catcher",
  playerStats: [5, 2, 3, 5, 7],
  cost: 55,
  skills: [1, 4, 78, 11, 81],
  primary: ["A"],
  secondary: ["G", "S"],
}

const treeman: Player = {
  id: 38,
  position: "Forest Treeman",
  playerStats: [2, 6, 5, 5, 11],
  cost: 120,
  skills: [55, 58, 59, 84, 60, 86, 87],
  primary: ["S"],
  secondary: ["A","G", "P"],
}

const humanLineman: Player = {
  id: 39,
  position: "Human Lineman",
  playerStats: [6, 3, 3, 4, 9],
  cost: 50,
  skills: [],
  primary: ["G"],
  secondary: ["A", "S"],
}

const humanThrower: Player = {
  id: 40,
  position: "Thrower",
  playerStats: [6, 3, 3, 2, 9],
  cost: 80,
  skills: [46, 22],
  primary: ["G", "P"],
  secondary: ["A", "S"],
}

const humanCatcher: Player = {
  id: 41,
  position: "Catcher",
  playerStats: [8, 2, 3, 5, 8],
  cost: 65,
  skills: [1, 4],
  primary: ["A", "G"],
  secondary: ["P", "S"],
}

const humanBlitzer: Player = {
  id: 42,
  position: "Blitzer",
  playerStats: [7, 3, 3, 4, 9],
  cost: 85,
  skills: [13],
  primary: ["A", "G"],
  secondary: ["P", "S"],
}

const skinkRunnerLineman: Player = {
  id: 43,
  position: "Skink Runner Lineman",
  playerStats: [8, 2, 3, 4, 8],
  cost: 60,
  skills: [4, 81],
  primary: ["A"],
  secondary: ["G", "P", "S"],
}

const chameleonSkink: Player = {
  id: 44,
  position: "Chameleon Skinks",
  playerStats: [7, 2, 3, 3, 8],
  cost: 70,
  skills: [4, 45, 20, 81],
  primary: ["A"],
  secondary: ["G", "P", "S"],
}

const saurusBlocker: Player = {
  id: 45,
  position: "Saurus Blocker",
  playerStats: [6, 4, 5, 6, 10],
  cost: 85,
  skills: [],
  primary: ["G", "S"],
  secondary: ["A"],
}

const kroxigor: Player = {
  id: 46,
  position: "Kroxigor",
  playerStats: [6, 5, 5, 0, 10],
  cost: 140,
  skills: [66, 71, 55, 33, 60],
  primary: ["S"],
  secondary: ["A", "G"],
}

const zombieLineman: Player = {
  id: 47,
  position: "Zombie Lineman",
  playerStats: [4, 3, 4, 0, 9],
  cost: 40,
  skills: [77],
  primary: ["G"],
  secondary: ["A", "S"],
}

const ghoulRunner: Player = {
  id: 48,
  position: "Ghoul Runner",
  playerStats: [7, 3, 3, 4, 8],
  cost: 75,
  skills: [4],
  primary: ["A", "G"],
  secondary: ["P","S"],
}
const wraith: Player = {
  id: 49,
  position: "Wraith",
  playerStats: [6, 3, 3, 0, 9],
  cost: 95,
  skills: [13, 29, 72, 77, 9],
  primary: ["G", "S"],
  secondary: ["A"],
}
const werewolf: Player = {
  id: 50,
  position: "Werewolf",
  playerStats: [8, 3, 3, 4, 9],
  cost: 125,
  skills: [26, 17, 77],
  primary: ["A", "G"],
  secondary: ["P", "S"],
}
const fleshGolem: Player = {
  id: 51,
  position: "Flesh Golem",
  playerStats: [4, 4, 4, 0, 10],
  cost: 70,
  skills: [77, 58, 60],
  primary: ["G", "S"],
  secondary: ["A"],
}
const rotterLineman: Player = {
  id: 52,
  position: "Rotter Lineman",
  playerStats: [5, 3, 4, 6, 9],
  cost: 35,
  skills: [68, 73],
  primary: ["G", "M"],
  secondary: ["A", "S"],
}
const pestigor: Player = {
  id: 53,
  position: "Pestigor",
  playerStats: [6, 3, 4, 4, 9],
  cost: 75,
  skills: [30, 73, 77],
  primary: ["G", "M", "S"],
  secondary: ["A", "P"],
}
const bloater: Player = {
  id: 54,
  position: "Bloater",
  playerStats: [4, 4, 4, 6, 10],
  cost: 115,
  skills: [27, 29, 73, 77],
  primary: ["G", "M", "S"],
  secondary: ["A"],
}
const rotspawn: Player = {
  id: 55,
  position: "Rotspawn",
  playerStats: [4, 5, 5, 0, 10],
  cost: 140,
  skills: [27, 29, 71, 55, 73, 76, 77, 34],
  primary: ["S"],
  secondary: ["A", "G", "M"],
}
const gnoblarLineman: Player = {
  id: 56,
  position: "Gnoblar Lineman",
  playerStats: [5, 1, 3, 5, 6],
  cost: 15,
  skills: [4, 78, 9, 81, 85],
  primary: ["A"],
  secondary: ["G"],
}
const ogreRuntPunter: Player = {
  id: 57,
  position: "Ogre Runt Punter",
  playerStats: [5, 5, 4, 4, 10],
  cost: 145,
  skills: [66, 70, 55, 60],
  primary: ["P", "S"],
  secondary: ["A", "G"],
}

const ogreBlocker: Player = {
  id: 58,
  position: "Ogre Blocker",
  playerStats: [5, 5, 4, 5, 10],
  cost: 140,
  skills: [66, 55, 60, 86],
  primary: ["S"],
  secondary: ["A", "G", "P"],
}

const orcLineman: Player = {
  id: 59,
  position: "Orc Lineman",
  playerStats: [5, 3, 3, 4, 10],
  cost: 50,
  skills: [62],
  primary: ["G"],
  secondary: ["A", "S"],
}
const orcThrower: Player = {
  id: 60,
  position: "Thrower",
  playerStats: [5, 3, 3, 3, 9],
  cost: 65,
  skills: [62, 46, 22],
  primary: ["G", "P"],
  secondary: ["A", "S"],
}
const orcBlitzer: Player = {
  id: 61,
  position: "Orc Blitzer",
  playerStats: [6, 3, 3, 4, 10],
  cost: 80,
  skills: [62, 13],
  primary: ["G", "S"],
  secondary: ["A", "P"],
}
const bigUnBlocker: Player = {
  id: 62,
  position: "Big Un Blocker",
  playerStats: [6, 3, 3, 4, 10],
  cost: 90,
  skills: [62],
  primary: ["G", "S"],
  secondary: ["A", "P"],
}
const orcGoblin: Player = {
  ...goblinLineman,
  id: 63,
  secondary: ["G","S"]
}
const skeletonLineman: Player = {
  id: 65,
  position: "Skeleton Lineman",
  playerStats: [5, 3, 4, 6, 8],
  cost: 40,
  skills: [77,60],
  primary: ["G",],
  secondary: ["A", "S"],
}
const wightBlitzer: Player = {
  id: 66,
  position: "Wight Blitzer",
  playerStats: [6, 3, 3, 5, 9],
  cost: 90,
  skills: [13,77],
  primary: ["G","S"],
  secondary: ["A", "P"],
}
const mummy: Player = {
  id: 67,
  position: "Mummy",
  playerStats: [3, 5, 5, 0, 10],
  cost: 125,
  skills: [55,77],
  primary: ["S"],
  secondary: ["A", "G"],
}
const skavenClanratLineman: Player = {
  id: 68,
  position: "Skaven Clanrat Lineman",
  playerStats: [7, 3, 3, 4,8],
  cost: 50,
  skills: [],
  primary: ["G"],
  secondary: ["A", "M", "S"],
}
const skavenThrower: Player = {
  id: 69,
  position: "Thower",
  playerStats: [7, 3, 3, 2,8],
  cost: 85,
  skills: [46,22],
  primary: ["G","P"],
  secondary: ["A", "M", "S"],
}
const gutterRunner: Player = {
  id: 70,
  position: "Gutter Runner",
  playerStats: [9, 2, 2, 4,8],
  cost: 85,
  skills: [4],
  primary: ["A","G"],
  secondary: ["M", "P", "S"],
}
const skavenBlitzer: Player = {
  id: 71,
  position: "Blitzer",
  playerStats: [7, 3, 3, 5,9],
  cost: 90,
  skills: [13],
  primary: ["G","S"],
  secondary: ["A", "M", "P"],
}
const ratOgre: Player = {
  id: 72,
  position: "Rat Ogre",
  playerStats: [6,5,4,0,9],
  cost: 150,
  skills: [61,17,71,55,33],
  primary: ["S"],
  secondary: ["A", "G", "M"],
}
const snotlingLineman: Player = {
  id: 73,
  position: "Snotling Lineman",
  playerStats: [5,1,3,5,6],
  cost: 15,
  skills: [4,78,9,81,82,85],
  primary: ["A"],
  secondary: ["G"],
}
const fungusFlinga: Player = {
  id: 74,
  position: "Fungus Flinga",
  playerStats: [5,1,3,4,6],
  cost: 30,
  skills: [65,4,78,79,9,81],
  primary: ["A", "P"],
  secondary: ["G"],
}
const funHoppa: Player = {
  id: 75,
  position: "Fun-hoppa",
  playerStats: [6,1,3,5,6],
  cost: 20,
  skills: [4,74,78,9,81],
  primary: ["A"],
  secondary: ["G"],
}
const stiltyRunna: Player = {
  id: 76,
  position: "Stilty Runna",
  playerStats: [6,1,3,5,6],
  cost: 20,
  skills: [4,78,9,11,81],
  primary: ["A"],
  secondary: ["G"],
}
const pumpWagon: Player = {
  id: 77,
  position: "Pump Wagon",
  playerStats: [4,5,5,0,9],
  cost: 105,
  skills: [15,54,55,76,79,58],
  primary: ["S"],
  secondary: ["A","G"],
}
const woodElfLineman: Player = {
  id: 78,
  position: "Wood Elf Lineman",
  playerStats: [7,3,2,4,8],
  cost: 70,
  skills: [],
  primary: ["A", "G"],
  secondary: ["S"],
}
const weThrower: Player = {
  id: 79,
  position: "Thrower",
  playerStats: [7,3,2,2,8],
  cost: 95,
  skills: [46],
  primary: ["A", "G","P"],
  secondary: ["S"],
}
const weCatcher: Player = {
  id: 80,
  position: "Catcher",
  playerStats: [8,2,2,4,8],
  cost: 90,
  skills: [1,4],
  primary: ["A", "G"],
  secondary: ["P","S"],
}
const wardancer: Player = {
  id: 81,
  position: "Wardancer",
  playerStats: [8,3,2,4,8],
  cost: 125,
  skills: [13,4,7],
  primary: ["A", "G"],
  secondary: ["P","S"],
}


export const playerCatalogue: PlayerCatalogue = {
  players: [
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
    wardancer
  ],
};
