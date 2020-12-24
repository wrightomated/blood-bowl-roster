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
  skills: [],
  primary: ["A"],
  secondary: ["G", "P", "S"],
};

const blackOrc: Player = {
  id: 7,
  position: "Black Orc",
  playerStats: [4, 4, 4, 5, 10],
  cost: 90,
  skills: [],
  primary: ["G", "S"],
  secondary: ["A", "P"],
};

const trainedTroll: Player = {
  id: 8,
  position: "Trained Troll",
  playerStats: [4, 5, 5, 5, 10],
  cost: 115,
  skills: [],
  primary: ["S"],
  secondary: ["A", "G", "P"],
};

const beastmanRunnerLineman: Player = {
  id: 9,
  position: "Beastman Runner Lineman",
  playerStats: [6, 3, 3, 4, 9],
  cost: 60,
  skills: [],
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

const chaosTroll: Player = {
  ...trainedTroll,
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
  skills: [],
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
  skills: [],
  primary: ["A", "G", "P"],
  secondary: ["S"],
};

const darkElfBlitzer: Player = {
  id: 16,
  position: "Blitzer",
  playerStats: [7, 3, 2, 4, 9],
  cost: 100,
  skills: [],
  primary: ["A", "G"],
  secondary: ["P", "S"],
};

const assassin: Player = {
  id: 17,
  position: "Assassin",
  playerStats: [7, 3, 2, 5, 8],
  cost: 85,
  skills: [],
  primary: ["A", "G"],
  secondary: ["P", "S"],
};

const witchElf: Player = {
  id: 18,
  position: "Witch Elf",
  playerStats: [7, 3, 2, 5, 8],
  cost: 110,
  skills: [],
  primary: ["A", "G"],
  secondary: ["P", "S"],
};

const dwarfBlockerLineman: Player = {
  id: 19,
  position: "Dwarf Blocker Lineman",
  playerStats: [4, 3, 4, 5, 10],
  cost: 70,
  skills: [13,23,60],
  primary: ["G", "S"],
  secondary: ["A"],
};

const dwarfRunner: Player = {
  id: 20,
  position: "Runner",
  playerStats: [6, 3, 3, 4, 9],
  cost: 85,
  skills: [22,60],
  primary: ["G", "P"],
  secondary: ["A", "S"],
};

const dwarfBlitzer: Player = {
  id: 21,
  position: "Blitzer",
  playerStats: [5, 3, 3, 4, 10],
  cost: 80,
  skills: [13,60],
  primary: ["G", "S"],
  secondary: ["A", "P"],
};

const trollSlayer: Player = {
  id: 22,
  position: "Troll Slayer",
  playerStats: [5, 3, 4, 0, 9],
  cost: 95,
  skills: [13,14,17,60],
  primary: ["G", "S"],
  secondary: ["A"],
};

const deathroller: Player = {
  id: 23,
  position: "Deathroller",
  playerStats: [4, 7, 5, 0, 11],
  cost: 170,
  skills: [51,15,54,71,55,72,79,58],
  primary: ["G", "S"],
  secondary: ["A"],
};

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
    deathroller
  ],
};
