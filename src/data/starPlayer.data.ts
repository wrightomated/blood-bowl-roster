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
    megaStar: true,
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
    megaStar: true,
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
    megaStar: true,
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
    megaStar: true,
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
    megaStar: true,
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
    playsFor: ['Favoured of Khorne'],
    skills: [26, 17, 71, 55, 33, 60, 88],
    cost: 200,
    specialRules: ['Fury of the Blood God'],
};

const max: StarPlayer = {
    id: 232,
    position: 'Max Spleenripper',
    playerStats: [5, 4, 4, 0, 9],
    playsFor: ['Favoured of Khorne'],
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
    megaStar: true,
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
    playerStats: [6, 3, 3, 4, 9],
    playsFor: ['Lustrian Superleague'],
    skills: [4, 69, 71, 33, 8, 9],
    cost: 200,
    specialRules: ['Look Into My Eyes'],
};

const estelle: StarPlayer = {
    id: 240,
    position: 'Estelle la Veneaux',
    playerStats: [6, 3, 3, 4, 8],
    playsFor: ['Lustrian Superleague'],
    skills: [27, 4, 53, 71, 9],
    cost: 190,
    specialRules: ['Baleful Hex'],
};
const glotl: StarPlayer = {
    id: 241,
    position: 'Glotl Stop',
    playerStats: [6, 6, 5, 0, 10],
    playsFor: ['Lustrian Superleague'],
    skills: [61, 17, 71, 55, 33, 58, 60],
    cost: 270,
    specialRules: ['Primal Savegery!'],
};
const puggy: StarPlayer = {
    id: 242,
    position: 'Puggy Baconbreath',
    playerStats: [5, 3, 3, 4, 7],
    playsFor: ['Halfling Thimble Cup', 'Old World Classic'],
    skills: [13, 4, 711, 44, 78, 81],
    cost: 120,
    specialRules: ['Halfling Luck'],
};
const cindy: StarPlayer = {
    id: 243,
    position: 'Cindy Piewhistle',
    playerStats: [5, 2, 3, 3, 7],
    playsFor: ['Halfling Thimble Cup', 'Old World Classic'],
    skills: [37, 65, 4, 71, 79, 81],
    cost: 50,
    specialRules: ['All You Can Eat'],
    megaStar: true,
};
const dribl: StarPlayer = {
    id: 244,
    position: 'Dribl',
    playerStats: [8, 2, 3, 4, 8],
    playsFor: ['Lustrian Superleague'],
    skills: [15, 4, 71, 9, 10, 81],
    cost: 190,
    twoForOne: 245,
    specialRules: ['A Sneaky Pair'],
};
const drul: StarPlayer = {
    id: 245,
    position: 'Drull',
    playerStats: [8, 2, 3, 4, 8],
    playsFor: ['Lustrian Superleague'],
    skills: [4, 71, 9, 80, 81],
    cost: 0,
    twoForOne: 244,
    specialRules: ['A Sneaky Pair'],
};
const bilerot: StarPlayer = {
    id: 246,
    position: 'Bilerot Vomitflesh',
    playerStats: [4, 5, 4, 6, 10],
    playsFor: ['Favoured of Nurgle'],
    skills: [15, 27, 29, 71],
    cost: 180,
    specialRules: ['Putrid Regeneration'],
};
const ripper: StarPlayer = {
    id: 247,
    position: 'Ripper Bolgrot',
    playerStats: [4, 6, 5, 4, 10],
    playsFor: ['Badlands Brawl', 'Underworld Challenge'],
    skills: [52, 71, 55, 77, 86],
    cost: 250,
    specialRules: [`Thinking Man's Troll`],
};
const nobbla: StarPlayer = {
    id: 248,
    position: 'Nobbla Blackwart',
    playerStats: [6, 2, 3, 0, 8],
    playsFor: ['Badlands Brawl', 'Underworld Challenge'],
    skills: [13, 67, 4, 71, 79, 81],
    cost: 120,
    specialRules: [`Kick 'em While They're down!`],
};
const scrappa: StarPlayer = {
    id: 249,
    position: 'Scrappa Sorehead',
    playerStats: [7, 2, 3, 5, 8],
    playsFor: ['Badlands Brawl', 'Underworld Challenge'],
    skills: [15, 4, 71, 74, 78, 11, 81, 12],
    cost: 130,
    specialRules: [`Yoink!`],
};
const withergrasp: StarPlayer = {
    id: 250,
    position: 'Withergrasp Doubledrool',
    playerStats: [6, 3, 4, 4, 9],
    playsFor: ['Favoured of...'],
    skills: [71, 33, 23, 34, 35, 24],
    cost: 170,
    specialRules: [`Watch Out!`],
};
const ivanTheAnimal: StarPlayer = {
    id: 251,
    position: "Ivan 'the Animal' Deathshroud",
    playerStats: [6, 4, 4, 5, 9],
    playsFor: ['Sylvanian Spotlight'],
    skills: [13, 27, 54, 71, 77, 21, 23],
    cost: 190,
    specialRules: ['Dwarfen Scourge'],
};
const countLuthorVonDrakenborg: StarPlayer = {
    id: 252,
    position: 'Count Luthor von Drakenborg',
    playerStats: [6, 5, 2, 3, 10],
    playsFor: ['Sylvanian Spotlight'],
    skills: [13, 69, 71, 77, 9],
    cost: 340,
    specialRules: ['Star of the Show'],
};

const captainKarinaVonRiesz: StarPlayer = {
    id: 253,
    position: 'Captain Karina von Riesz',
    playerStats: [7, 4, 2, 4, 9],
    playsFor: ['Sylvanian Spotlight'],
    skills: [96, 4, 69, 6, 71, 77],
    cost: 230,
    specialRules: ['Tasty Morsel'],
};
// SKITTER STAB-STAB
const skitter: StarPlayer = {
    id: 254,
    position: 'Skitter Stab-Stab',
    playerStats: [9, 2, 2, 4, 8],
    playsFor: ['Favoured of...', 'Underworld Challenge'],
    skills: [4, 71, 33, 20, 80],
    cost: 150,
    specialRules: ['Master Assassin'],
};

const rodneyRoachbait: StarPlayer = {
    id: 255,
    position: 'Rodney Roachbait',
    playerStats: [6, 2, 3, 4, 7],
    playsFor: ['Halfling Thimble Cup'],
    skills: [1, 2, 6, 71, 45, 9, 81, 24],
    cost: 70,
    specialRules: ['Catch of the Day'],
};

const rowanaForestfoot: StarPlayer = {
    id: 256,
    position: 'Rowana Forestfoot',
    playerStats: [6, 3, 3, 4, 8],
    playsFor: ['Halfling Thimble Cup'],
    skills: [4, 40, 53, 30, 6, 7, 71],
    cost: 160,
    specialRules: ['Bounding Leap'],
};
const kirotKrakeneye: StarPlayer = {
    id: 257,
    position: 'Kiroth Krakeneye',
    playerStats: [7, 3, 2, 3, 9],
    playsFor: ['Elven Kingdoms League'],
    skills: [27, 29, 71, 45, 23, 34],
    cost: 160,
    specialRules: ['Black Ink'],
};
const jordellFreshbreeze: StarPlayer = {
    id: 258,
    position: 'Jordell Freshbreeze',
    playerStats: [8, 3, 1, 3, 8],
    playsFor: ['Elven Kingdoms League'],
    skills: [13, 2, 4, 7, 71, 9],
    cost: 250,
    specialRules: ['Swift as the Breeze'],
};
const zzhargMadeye: StarPlayer = {
    id: 259,
    position: 'Zzharg Madeye',
    playerStats: [4, 4, 4, 3, 10],
    playsFor: ['Favoured of Hashut', 'Badlands Brawl'],
    skills: [38, 42, 71, 44, 79, 22, 60],
    cost: 130,
    specialRules: ["Then I started Blastin'!"],
};

const htharkTheUnstoppable: StarPlayer = {
    id: 260,
    position: "H'thark The Unstoppable",
    playerStats: [6, 6, 4, 6, 10],
    playsFor: ['Badlands Brawl', 'Favoured of Hashut'],
    skills: [13, 51, 5, 54, 71, 11, 12, 60],
    cost: 300,
    specialRules: ['Unstoppable Momentim'],
};

const rashnackBackstabber: StarPlayer = {
    id: 261,
    position: 'Rashnack Backstabber',
    playerStats: [7, 3, 3, 5, 8],
    playsFor: ['Badlands Brawl'],
    skills: [71, 20, 9, 10, 80],
    cost: 130,
    specialRules: ['Toxin Conniseur'],
};

// anqi Panqi
const anqi: StarPlayer = {
    id: 262,
    position: 'Anqi Panqi',
    playerStats: [7, 4, 5, 6, 10],
    playsFor: ['Lustrian Superleague'],
    skills: [13, 52, 71, 58],
    cost: 190,
    specialRules: ['Savage Blow'],
};

// Swiftvine Glimmershard
const swiftvine: StarPlayer = {
    id: 263,
    position: 'Swiftvine Glimmershard',
    playerStats: [7, 2, 3, 5, 7],
    playsFor: ['Elven Kingdoms League', 'Halfling Thimble Cup'],
    skills: [27, 16, 71, 9, 80, 81],
    cost: 110,
    specialRules: ['Furious Outburst'],
};

const maple: StarPlayer = {
    id: 264,
    position: 'Maple Highgrove',
    playerStats: [3, 5, 5, 5, 11],
    playsFor: [
        'Elven Kingdoms League',
        'Halfling Thimble Cup',
        'Old World Classic',
    ],
    skills: [50, 52, 71, 55, 58, 34, 60],
    cost: 210,
    specialRules: ['Vicious Vines'],
};

const guffle: StarPlayer = {
    id: 265,
    position: 'Guffle Pussmaw',
    playerStats: [5, 3, 3, 5, 10],
    playsFor: ['Favoured of Nurgle'],
    skills: [29, 71, 32, 73],
    cost: 180,
    specialRules: ['Bite'],
};

const jeremiahKool: StarPlayer = {
    id: 266,
    position: 'Jeremiah Kool',
    playerStats: [8, 3, 1, 3, 9],
    playsFor: ['Elven Kingdoms League'],
    skills: [13, 2, 4, 40, 71, 44, 45, 46, 9],
    cost: 320,
    specialRules: ['The Flashing Blade'],
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
        estelle,
        glotl,
        puggy,
        cindy,
        dribl,
        drul,
        bilerot,
        ripper,
        nobbla,
        scrappa,
        withergrasp,
        ivanTheAnimal,
        countLuthorVonDrakenborg,
        captainKarinaVonRiesz,
        skitter,
        rodneyRoachbait,
        rowanaForestfoot,
        kirotKrakeneye,
        jordellFreshbreeze,
        zzhargMadeye,
        htharkTheUnstoppable,
        rashnackBackstabber,
        anqi,
        swiftvine,
        maple,
        guffle,
        jeremiahKool,
    ],
};
