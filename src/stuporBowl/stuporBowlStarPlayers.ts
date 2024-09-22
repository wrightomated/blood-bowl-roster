import type { StarPlayer } from '../models/player.model';

const daFreezer: StarPlayer = {
    id: 1000,
    position: 'Da Freezer',
    playerStats: [4, 4, 5, 5, 10],
    playsFor: [],
    skills: [711, 66, 13, 55, 58, 52, 54, 22, 1000], // Loner (3+), Bonehead, Block, Mighty Blow (+1), Stand Firm, Grab, Juggernaut, Sure Hands, Fan Favorite
    cost: 170,
    specialRules: ['Stupor Bowl Star Player'],
};

const drunkyQB: StarPlayer = {
    id: 1001,
    position: 'Drunky QB',
    playerStats: [6, 3, 3, 2, 9],
    playsFor: [],
    skills: [711, 46, 37, 38, 39, 93, 22, 43, 42, 1000], // Loner (3+), Pass, Accurate, Cannoneer, Cloud Burster, Drunkard, Sure Hands, Leader, Hail Mary Pass, Fan Favorite
    cost: 160,
    specialRules: ['Stupor Bowl Star Player'],
};

const sourness: StarPlayer = {
    id: 1002,
    position: 'Sourness',
    playerStats: [7, 3, 3, 4, 9],
    playsFor: [],
    skills: [711, 13, 7, 22, 12, 16, 1000], // Loner (3+), Block, Leap, Sure Hands, Sure Feet, Fend, Fan Favorite
    cost: 155,
    specialRules: ['Stupor Bowl Star Player'],
};

const spike: StarPlayer = {
    id: 1003,
    position: 'Spike',
    playerStats: [7, 3, 3, 4, 9],
    playsFor: [],
    skills: [711, 13, 23, 3, 43, 52, 58, 5, 1000], // Loner (3+), Block, Tackle, Diving Tackle, Leader, Grab, Stand Firm, Defensive, Fan Favorite
    cost: 195,
    specialRules: ['Stupor Bowl Star Player'],
};

const killieGault: StarPlayer = {
    id: 1004,
    position: 'Killie Gault',
    playerStats: [8, 3, 3, 5, 8],
    playsFor: [],
    skills: [711, 1, 4, 45, 9, 11, 1000], // Loner (3+), Catch, Dodge, On the Ball, Sidestep, Sprint, Fan Favorite
    cost: 140,
    specialRules: ['Stupor Bowl Star Player'],
};

const skevinButthead: StarPlayer = {
    id: 1005,
    position: 'Skevin "Butthead"',
    playerStats: [6, 3, 3, 5, 9],
    playsFor: [],
    skills: [711, 18, 15, 10, 1000], // Loner (3+), Kick, Dirty Player (+1), Sneaky Git, Fan Favorite
    cost: 100,
    specialRules: ['Stupor Bowl Star Player'],
};

const uglyBoy: StarPlayer = {
    id: 1006,
    position: 'Ugly Boy',
    playerStats: [7, 3, 3, 5, 9],
    playsFor: [],
    skills: [711, 13, 29, 53, 23, 1000], // Loner (3+), Block, Foul Appearance, Guard, Tackle, Fan Favorite
    cost: 115,
    specialRules: ['Stupor Bowl Star Player'],
};

const mongoMcMongrel: StarPlayer = {
    id: 1007,
    position: 'Mongo McMongrel',
    playerStats: [6, 4, 5, 6, 9],
    playsFor: [],
    skills: [711, 24, 23, 54, 5, 1000], // Loner (3+), Wrestle, Tackle, Juggernaut, Defensive, Fan Favorite
    cost: 145,
    specialRules: ['Stupor Bowl Star Player'],
};

const dickBent: StarPlayer = {
    id: 1008,
    position: 'Dick Bent',
    playerStats: [7, 3, 3, 4, 9],
    playsFor: [],
    skills: [711, 13, 20, 45, 2, 1000], // Loner (3+), Block, Shadowing, On the Ball, Diving Catch, Fan Favorite
    cost: 125,
    specialRules: ['Stupor Bowl Star Player'],
};

const dennisMcKillon: StarPlayer = {
    id: 1009,
    position: 'Dennis McKillon',
    playerStats: [8, 3, 3, 5, 8],
    playsFor: [],
    skills: [711, 1, 4, 2, 8, 1000], // Loner (3+), Catch, Dodge, Diving Catch, Safe Pair Of Hands, Fan Favorite
    cost: 120,
    specialRules: ['Stupor Bowl Star Player'],
};

const mattSpooey: StarPlayer = {
    id: 1010,
    position: 'Matt Spooey',
    playerStats: [7, 3, 3, 4, 9],
    playsFor: [],
    skills: [711, 13, 12, 22, 8, 1000], // Loner (3+), Block, Sure Feet, Sure Hands, Safe Pair Of Hands, Fan Favorite
    cost: 125,
    specialRules: ['Stupor Bowl Star Player'],
};

const scaryFencedick: StarPlayer = {
    id: 1011,
    position: 'Scary Fencedick',
    playerStats: [8, 3, 3, 4, 8],
    playsFor: [],
    skills: [711, 13, 11, 23, 45, 1000], // Loner (3+), Block, Sprint, Tackle, On the Ball, Fan Favorite
    cost: 125,
    specialRules: ['Stupor Bowl Star Player'],
};

const skeevePuller: StarPlayer = {
    id: 1012,
    position: 'Skeeve Puller',
    playerStats: [6, 3, 3, 2, 9],
    playsFor: [],
    skills: [711, 40, 45, 46, 47, 22, 1000], // Loner (3+), Dump-off, On the Ball, Pass, Running Pass, Sure Hands, Fan Favorite
    cost: 110,
    specialRules: ['Stupor Bowl Star Player'],
};

export const stuporBowlStarPlayers: StarPlayer[] = [
    daFreezer,
    drunkyQB,
    sourness,
    spike,
    killieGault,
    skevinButthead,
    uglyBoy,
    mongoMcMongrel,
    dickBent,
    dennisMcKillon,
    mattSpooey,
    scaryFencedick,
    skeevePuller,
];
