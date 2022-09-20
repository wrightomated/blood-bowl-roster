import type { StarPlayer } from '../models/player.model';

const theBlackGobbo: StarPlayer = {
    id: 200,
    position: 'The Black Gobbo',
    playerStats: [6, 2, 3, 3, 9],
    playsFor: ['Badlands Brawl', 'Underworld Challenge'],
    skills: [65, 27, 4, 711, 9, 10, 80, 81],
    cost: 225,
    specialRules: ['Sneakiest of the Lot'],
};
const deeprootStrongbranch: StarPlayer = {
    id: 201,
    position: 'Deeproot Strongbranch',
    playerStats: [2, 7, 5, 4, 11],
    playsFor: ['Halfling Thimble Cup', 'Old World Classic'],
    skills: [13, 71, 551, 58, 59, 60, 86, 87],
    cost: 280,
    specialRules: ['Reliable'],
};
const eldrilSidewinder: StarPlayer = {
    id: 202,
    position: 'Eldril Sidewinder',
    playerStats: [8, 3, 2, 5, 8],
    playsFor: ['Elven Kingdoms League'],
    skills: [1, 4, 69, 71, 44, 45],
    cost: 230,
    specialRules: ['Mesmerizing Dance'],
};
const glartSmarshrip: StarPlayer = {
    id: 203,
    position: 'Glart Smarshrip',
    playerStats: [5, 4, 4, 0, 9],
    playsFor: ['Favoured of...', 'Underworld Challenge'],
    skills: [13, 26, 52, 54, 71, 58],
    cost: 195,
    specialRules: ['Frenzied Rush'],
};
const glorielSummerbloom: StarPlayer = {
    id: 204,
    position: 'Gloriel Summerbloom',
    playerStats: [7, 2, 2, 2, 8],
    playsFor: ['Elven Kingdoms League'],
    skills: [37, 4, 711, 46, 9, 22],
    cost: 150,
    specialRules: ['Shot to Nothing'],
};
const grak: StarPlayer = {
    id: 205,
    position: 'Grak',
    playerStats: [5, 5, 4, 4, 10],
    playsFor: [],
    skills: [66, 70, 71, 55, 60],
    cost: 250,
    specialRules: ['Two for One'],
    twoForOne: 206,
};
const crumbleberry: StarPlayer = {
    id: 206,
    position: 'Crumbleberry',
    playerStats: [5, 2, 3, 6, 7],
    playsFor: [],
    skills: [4, 71, 78, 81, 22],
    cost: 0,
    specialRules: ['Two for One'],
    twoForOne: 205,
};
const gretchen: StarPlayer = {
    id: 207,
    position: 'Gretchen Wächter',
    playerStats: [7, 3, 2, 0, 9],
    playsFor: ['Sylvanian Spotlight'],
    skills: [27, 4, 29, 6, 71, 72, 77, 20, 9],
    cost: 260,
    specialRules: ['Incorporeal'],
};
const griff: StarPlayer = {
    id: 208,
    position: 'Griff Oberwald',
    playerStats: [7, 4, 2, 3, 9],
    playsFor: ['Halfling Thimble Cup', 'Old World Classic'],
    skills: [13, 4, 16, 711, 11, 12],
    cost: 280,
    specialRules: ['Consummate Professional'],
};
const grim: StarPlayer = {
    id: 209,
    position: 'Grim Ironjaw',
    playerStats: [5, 4, 3, 0, 9],
    playsFor: [
        'Halfling Thimble Cup',
        'Old World Classic',
        'Worlds Edge Superleague',
    ],
    skills: [13, 14, 17, 71, 56, 60],
    cost: 200,
    specialRules: ['Slayer'],
};
const hakflem: StarPlayer = {
    id: 210,
    position: 'Hakflem Skuttlespike',
    playerStats: [9, 3, 2, 3, 8],
    playsFor: ['Favoured of...', 'Underworld Challenge'],
    skills: [4, 28, 71, 33, 35],
    cost: 210,
    specialRules: ['Treacherous'],
};
const helmut: StarPlayer = {
    id: 211,
    position: 'Helmut Wulf',
    playerStats: [6, 3, 3, 0, 9],
    playsFor: [],
    skills: [67, 71, 19, 79, 58],
    cost: 140,
    specialRules: ['Old Pro'],
};
const karla: StarPlayer = {
    id: 212,
    position: 'Karla Von Kill',
    playerStats: [6, 4, 3, 4, 9],
    playsFor: [
        'Halfling Thimble Cup',
        'Lustrian Superleague',
        'Old World Classic',
    ],
    skills: [13, 14, 4, 6, 71],
    cost: 210,
    specialRules: ['Indomitable'],
};
const lordBorak: StarPlayer = {
    id: 213,
    position: 'Lord Borak',
    playerStats: [5, 5, 3, 5, 10],
    playsFor: ['Favoured of...'],
    skills: [13, 151, 71, 55, 10],
    cost: 260,
    specialRules: ['Lord of Chaos'],
};
const mightyZug: StarPlayer = {
    id: 214,
    position: 'Mighty Zug',
    playerStats: [4, 5, 4, 6, 10],
    playsFor: [
        'Halfling Thimble Cup',
        'Lustrian Superleague',
        'Old World Classic',
    ],
    skills: [13, 71, 55],
    cost: 220,
    specialRules: ['Crushing Blow'],
};
const morg: StarPlayer = {
    id: 215,
    position: "Morg 'n' Thorg",
    playerStats: [6, 6, 3, 4, 11],
    playsFor: [],
    doesNotPlayFor: ['Sylvanian Spotlight'],
    skills: [13, 71, 551, 60, 86],
    cost: 380,
    specialRules: ['The Ballista'],
};
const roxanna: StarPlayer = {
    id: 216,
    position: 'Roxanna Darknail',
    playerStats: [8, 3, 1, 4, 8],
    playsFor: ['Elven Kingdoms League'],
    skills: [4, 17, 6, 54, 7, 71],
    cost: 270,
    specialRules: ['Burst of Speed'],
};
const rumbelow: StarPlayer = {
    id: 217,
    position: 'Rumbelow Sheepskin',
    playerStats: [6, 3, 3, 0, 8],
    playsFor: [
        'Halfling Thimble Cup',
        'Old World Classic',
        'Worlds Edge Superleague',
    ],
    skills: [13, 30, 54, 71, 72, 23, 60],
    cost: 170,
    specialRules: ['Ram'],
};
const skrull: StarPlayer = {
    id: 218,
    position: 'Skrull Halfheight',
    playerStats: [6, 3, 4, 4, 9],
    playsFor: ['Sylvanian Spotlight', 'Worlds Edge Superleague'],
    skills: [37, 71, 44, 46, 77, 22, 60],
    cost: 150,
    specialRules: ['Strong Passing Game'],
};
const lucien: StarPlayer = {
    id: 219,
    position: 'Lucian Swift',
    playerStats: [7, 3, 2, 5, 9],
    playsFor: ['Elven Kingdoms League'],
    skills: [13, 71, 55, 23],
    cost: 340,
    specialRules: ['Two for One'],
    twoForOne: 220,
};
const valen: StarPlayer = {
    id: 220,
    position: 'Valen Swift',
    playerStats: [7, 3, 2, 2, 8],
    playsFor: ['Elven Kingdoms League'],
    skills: [37, 71, 44, 46, 48, 22],
    cost: 0,
    specialRules: ['Two for One'],
    twoForOne: 219,
};
const varag: StarPlayer = {
    id: 221,
    position: 'Varag Ghoul-Chewer',
    playerStats: [6, 5, 3, 5, 10],
    playsFor: ['Badlands Brawl', 'Underworld Challenge'],
    skills: [13, 6, 71, 55, 60],
    cost: 280,
    specialRules: ['Crushing Blow'],
};
const grombrindal: StarPlayer = {
    id: 222,
    position: 'Grombrindal, the White Dwarf',
    playerStats: [5, 3, 3, 4, 10],
    playsFor: [
        'Halfling Thimble Cup',
        'Lustrian Superleague',
        'Old World Classic',
        'Worlds Edge Superleague',
    ],
    skills: [13, 14, 71, 55, 58, 60],
    cost: 210,
    specialRules: ['Wisdom of the White Dwarf'],
};
const willow: StarPlayer = {
    id: 223,
    position: 'Willow Rosebark',
    playerStats: [5, 4, 3, 6, 9],
    playsFor: ['Elven Kingdoms League'],
    skills: [14, 71, 9, 60],
    cost: 150,
    specialRules: ['Indomitable'],
};
const zolcath: StarPlayer = {
    id: 224,
    position: 'Zolcath the Zoat',
    playerStats: [5, 5, 4, 5, 10],
    playsFor: ['Lustrian Superleague', 'Elven Kingdoms League'],
    skills: [27, 54, 71, 55, 33, 77, 12],
    cost: 230,
    specialRules: ['Excuse Me, Are You a Zoat?'],
};
const akhorne: StarPlayer = {
    id: 225,
    position: 'Akhorne the Squirrel',
    playerStats: [7, 1, 2, 0, 6],
    playsFor: [],
    skills: [26, 14, 4, 17, 6, 71, 72, 9, 81, 85],
    cost: 80,
    specialRules: ['Blind Rage'],
};
const frankNStein: StarPlayer = {
    id: 226,
    position: "Frank 'N' Stein",
    playerStats: [4, 5, 4, 0, 10],
    playsFor: ['Old World Classic', 'Sylvanian Spotlight'],
    skills: [51, 71, 55, 77, 58, 60],
    cost: 250,
    specialRules: ['Brutal Block'],
};
const whilhelmChaney: StarPlayer = {
    id: 227,
    position: 'Wilhelm Chaney',
    playerStats: [8, 4, 3, 4, 9],
    playsFor: ['Sylvanian Spotlight'],
    skills: [1, 26, 17, 71, 77, 24],
    cost: 220,
    specialRules: ['Savage Mauling'],
};

const kreek: StarPlayer = {
    id: 228,
    position: 'Kreek, "The Verminator" Rustgouger',
    playerStats: [5, 7, 4, 0, 10],
    playsFor: ['Favoured of...', 'Underworld Challenge'],
    skills: [64, 71, 55, 72, 33, 79],
    cost: 170,
    specialRules: ["I'll be back"],
};

const grashnak: StarPlayer = {
    id: 229,
    position: 'Grashnak Blackhoof',
    playerStats: [6, 6, 4, 0, 9],
    playsFor: ['Favoured of...'],
    skills: [17, 30, 60, 55, 71, 88],
    cost: 240,
    specialRules: ['Gored by the Bull'],
};

const bryce: StarPlayer = {
    id: 230,
    position: 'Bryce "The Slice" Cambuel',
    playerStats: [5, 3, 4, 0, 9],
    playsFor: ['Sylvanian Spotlight'],
    skills: [67, 71, 77, 79, 58, 60],
    cost: 130,
    specialRules: ['Ghostly Flames'],
};

const scyla: StarPlayer = {
    id: 231,
    position: 'Scyla Anfingrimm',
    playerStats: [5, 5, 4, 0, 10],
    playsFor: ['Favoured of...'],
    skills: [26, 17, 71, 55, 33, 60, 88],
    cost: 200,
    specialRules: ['Fury of the Blood God'],
};

const max: StarPlayer = {
    id: 232,
    position: 'Max Spleenripper',
    playerStats: [5, 4, 4, 0, 9],
    playsFor: ['Favoured of...'],
    skills: [67, 71, 79],
    cost: 130,
    specialRules: ['Maximum Carnage'],
};

const barikFarblast: StarPlayer = {
    id: 233,
    position: 'Barik Farblast',
    playerStats: [6, 3, 4, 3, 9],
    playsFor: [
        'Halfling Thimble Cup',
        'Old World Classic',
        'Worlds Edge Superleague',
    ],
    skills: [42, 71, 46, 79, 38, 22, 60],
    cost: 80,
    specialRules: ['Blast It!'],
};

const bomberDribblesnot: StarPlayer = {
    id: 234,
    position: 'Bomber Dribblesnot',
    playerStats: [6, 2, 3, 3, 8],
    playsFor: ['Badlands Brawl', 'Underworld Challenge'],
    skills: [37, 65, 4, 71, 78, 79, 81],
    cost: 50,
    specialRules: ['Kaboom!'],
};

const fungusTheLoon: StarPlayer = {
    id: 235,
    position: 'Fungus the Loon',
    playerStats: [4, 7, 3, 0, 8],
    playsFor: ['Badlands Brawl', 'Underworld Challenge'],
    skills: [64, 55, 71, 72, 79, 81],
    cost: 80,
    specialRules: ['Whirling Dervish!'],
};

const ivarEriksson: StarPlayer = {
    id: 236,
    position: 'Ivar Eriksson',
    playerStats: [6, 4, 3, 4, 9],
    playsFor: ['Old World Classic'],
    skills: [13, 53, 711, 23],
    cost: 245,
    specialRules: ['Raiding Party'],
};

const skrorgSnowpelt: StarPlayer = {
    id: 237,
    position: 'Skrorg Snowpelt',
    playerStats: [5, 5, 4, 0, 9],
    playsFor: ['Old World Classic'],
    skills: [26, 27, 54, 71, 55],
    cost: 250,
    specialRules: ['Pump Up the Crowd'],
};

const thorssonStoutmead: StarPlayer = {
    id: 238,
    position: 'Thorsson Stoutmead',
    playerStats: [6, 3, 4, 3, 8],
    playsFor: ['Old World Classic'],
    skills: [13, 93, 71, 60],
    cost: 170,
    specialRules: ['Beer Barrel Bash!'],
};

//Boa Kon’ssstriktr
const boa: StarPlayer = {
    id: 239,
    position: 'Boa Kon’ssstriktr',
    playerStats: [6, 0, 0, 0, 0],
    playsFor: ['Lustrian Superleague'],
    skills: [4, 8, 9],
    cost: 0,
    specialRules: ['Look Into My Eyes'],
};

export const starPlayers = {
    starPlayers: [
        theBlackGobbo,
        deeprootStrongbranch,
        eldrilSidewinder,
        glartSmarshrip,
        glorielSummerbloom,
        grak,
        crumbleberry,
        gretchen,
        griff,
        grim,
        hakflem,
        helmut,
        karla,
        lordBorak,
        mightyZug,
        morg,
        roxanna,
        rumbelow,
        skrull,
        lucien,
        valen,
        varag,
        grombrindal,
        willow,
        zolcath,
        akhorne,
        frankNStein,
        whilhelmChaney,
        kreek,
        grashnak,
        bryce,
        scyla,
        max,
        barikFarblast,
        bomberDribblesnot,
        fungusTheLoon,
        ivarEriksson,
        skrorgSnowpelt,
        thorssonStoutmead,
        boa,
    ],
};
