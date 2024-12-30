import type { CustomTeam } from '../../customisation/types/CustomiseTeamList.type';
import { chaosSpecialRules } from '../../data/teams.data';

export const secretTeamData: CustomTeam[] = [
    {
        name: 'Albion',
        id: 'st1000',
        players: [
            {
                id: 1000,
                max: 16,
            },
            {
                id: 1001,
                max: 4,
            },
            {
                id: 1002,
                max: 2,
            },
            {
                id: 1003,
                max: 1,
            },
            {
                id: 1004,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Araby',
        id: 'st1001',
        players: [
            {
                id: 1005,
                max: 16,
            },
            {
                id: 1006,
                max: 2,
            },
            {
                id: 1007,
                max: 2,
            },
            {
                id: 1008,
                max: 4,
            },
            {
                id: 1009,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Avelorn',
        id: 'st1002',
        players: [
            {
                id: 1010,
                max: 16,
            },
            {
                id: 1011,
                max: 4,
            },
            {
                id: 1012,
                max: 2,
            },
        ],
        reroll: {
            cost: 50,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Elven Kingdoms League'],
    },
    {
        name: 'Beastmen',
        id: 'st1003',
        players: [
            {
                id: 1013,
                max: 16,
            },
            {
                id: 1014,
                max: 4,
            },
            {
                id: 1015,
                max: 4,
            },
            {
                id: 1016,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: [],
        pickSpecialRule: chaosSpecialRules,
    },
    {
        name: 'Black Dwarf',
        id: 'st1004',
        players: [
            {
                id: 1017,
                max: 16,
            },
            {
                id: 1018,
                max: 2,
            },
            {
                id: 1019,
                max: 2,
            },
            {
                id: 1020,
                max: 2,
            },
            {
                id: 1021,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: [],
        pickSpecialRule: chaosSpecialRules,
    },
    {
        name: 'Bretonnian',
        id: 'st1005',
        players: [
            {
                id: 1022,
                max: 16,
            },
            {
                id: 1023,
                max: 2,
            },
            {
                id: 1024,
                max: 2,
            },
            {
                id: 1025,
                max: 4,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Border Princes',
        id: 'st1006',
        players: [
            {
                id: 1026,
                max: 16,
            },
            {
                id: 1027,
                max: 2,
            },
            {
                id: 1028,
                max: 2,
            },
            {
                id: 1029,
                max: 4,
            },
            {
                id: 1030,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Slaanesh',
        id: 'st1007',
        players: [
            {
                id: 1031,
                max: 16,
            },
            {
                id: 1032,
                max: 4,
            },
            {
                id: 1033,
                max: 4,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Favoured of Slaanesh'],
    },
    {
        name: 'Tzeentch',
        id: 'st1008',
        players: [
            {
                id: 1034,
                max: 16,
            },
            {
                id: 1035,
                max: 4,
            },
            {
                id: 1036,
                max: 4,
            },
            {
                id: 1037,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Favoured of Tzeentch'],
    },
    {
        name: 'Daemons of Khorne',
        id: 'st1009',
        players: [
            {
                id: 1038,
                max: 16,
            },
            {
                id: 1039,
                max: 6,
            },
            {
                id: 1040,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Favoured of Khorne'],
    },
    {
        name: 'Daemons of Nurgle',
        id: 'st1010',
        players: [
            {
                id: 1041,
                max: 16,
            },
            {
                id: 1042,
                max: 6,
            },
            {
                id: 1043,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Favoured of Nurgle'],
    },
    {
        name: 'Daemons Slaanesh',
        id: 'st1011',
        players: [
            {
                id: 1044,
                max: 16,
            },
            {
                id: 1045,
                max: 6,
            },
            {
                id: 1046,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 1,
        specialRules: ['Favoured of Slaanesh'],
    },
    {
        name: 'Daemons Tzeentch',
        id: 'st1012',
        players: [
            {
                id: 1047,
                max: 16,
            },
            {
                id: 1048,
                max: 4,
            },
            {
                id: 1049,
                max: 2,
            },
            {
                id: 1050,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 3,
        specialRules: ['Favoured of Tzeentch'],
    },
    {
        name: 'Daemons of Malal',
        id: 'st1013',
        players: [
            {
                id: 1051,
                max: 16,
            },
            {
                id: 1052,
                max: 4,
            },
            {
                id: 1053,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Favoured of Chaos Undivided'],
    },
    {
        name: 'Centigor',
        id: 'st1014',
        players: [
            {
                id: 1054,
                max: 16,
            },
            {
                id: 1055,
                max: 6,
            },
            {
                id: 1056,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: [],
        pickSpecialRule: chaosSpecialRules,
    },
    {
        name: 'Cult of Ulric',
        id: 'st1015',
        players: [
            {
                id: 1057,
                max: 16,
            },
            {
                id: 1058,
                max: 2,
            },
            {
                id: 1059,
                max: 2,
            },
            {
                id: 1060,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Black Ark',
        id: 'st1016',
        players: [
            {
                id: 1061,
                max: 16,
            },
            {
                id: 1062,
                max: 2,
            },
            {
                id: 1063,
                max: 2,
            },
            {
                id: 1064,
                max: 4,
            },
        ],
        reroll: {
            cost: 0,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Elven Kingdoms League'],
    },
    {
        name: 'Khainite Assassins',
        id: 'st1017',
        players: [
            {
                id: 1065,
                max: 16,
            },
            {
                id: 1066,
                max: 4,
            },
            {
                id: 1067,
                max: 2,
            },
            {
                id: 1068,
                max: 1,
            },
        ],
        reroll: {
            cost: 50,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Elven Kingdoms League'],
    },
    {
        name: 'Dryad',
        id: 'st1018',
        players: [
            {
                id: 1069,
                max: 16,
            },
            {
                id: 1070,
                max: 4,
            },
            {
                id: 1071,
                max: 2,
            },
            {
                id: 1072,
                max: 2,
            },
        ],
        reroll: {
            cost: 0,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Eight Peak',
        id: 'st1019',
        players: [
            {
                id: 1073,
                max: 16,
            },
            {
                id: 1074,
                max: 2,
            },
            {
                id: 1075,
                max: 2,
            },
            {
                id: 1076,
                max: 2,
            },
        ],
        reroll: {
            cost: 0,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic', 'Worlds Edge Superleague'],
    },
    {
        name: 'Engineer',
        id: 'st1020',
        players: [
            {
                id: 1077,
                max: 16,
            },
            {
                id: 1078,
                max: 2,
            },
            {
                id: 1079,
                max: 2,
            },
            {
                id: 1080,
                max: 1,
            },
            {
                id: 1081,
                max: 1,
            },
            {
                id: 1082,
                max: 1,
            },
            {
                id: 1083,
                max: 1,
            },
        ],
        reroll: {
            cost: 0,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: [
            'Old World Classic',
            'Worlds Edge Superleague',
            'Bribery and Corruption',
        ],
    },
    {
        name: 'Ironbreaker',
        id: 'st1021',
        players: [
            {
                id: 1084,
                max: 16,
            },
            {
                id: 1085,
                max: 2,
            },
            {
                id: 1086,
                max: 4,
            },
            {
                id: 1087,
                max: 1,
            },
        ],
        reroll: {
            cost: 0,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Old World Classic', 'Worlds Edge Superleague'],
    },
    {
        name: 'Norse Dwarf',
        id: 'st1022',
        players: [
            {
                id: 1088,
                max: 16,
            },
            {
                id: 1089,
                max: 2,
            },
            {
                id: 1090,
                max: 2,
            },
            {
                id: 1091,
                max: 2,
            },
            {
                id: 1092,
                max: 2,
            },
            {
                id: 1093,
                max: 2,
            },
        ],
        reroll: {
            cost: 0,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Old World Classic', 'Worlds Edge Superleague'],
    },
    {
        name: 'Slayer',
        id: 'st1023',
        players: [
            {
                id: 1094,
                max: 16,
            },
            {
                id: 1095,
                max: 2,
            },
            {
                id: 1096,
                max: 2,
            },
            {
                id: 1097,
                max: 2,
            },
            {
                id: 1098,
                max: 1,
            },
        ],
        reroll: {
            cost: 0,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic', 'Worlds Edge Superleague'],
    },
    {
        name: 'Elemental',
        id: 'st1024',
        players: [
            {
                id: 1099,
                max: 16,
            },
            {
                id: 1100,
                max: 16,
            },
            {
                id: 1101,
                max: 16,
            },
            {
                id: 1102,
                max: 16,
            },
            {
                id: 1103,
                max: 1,
            },
            {
                id: 1104,
                max: 1,
            },
            {
                id: 1105,
                max: 1,
            },
            {
                id: 1106,
                max: 1,
            },
        ],
        reroll: {
            cost: 50,
            max: 8,
        },
        allowedApothecary: true,
        tier: null,
        maxBigGuys: 1,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Estalia',
        id: 'st1025',
        players: [
            {
                id: 1107,
                max: 16,
            },
            {
                id: 1108,
                max: 2,
            },
            {
                id: 1109,
                max: 2,
            },
            {
                id: 1110,
                max: 2,
            },
            {
                id: 1111,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Ethereal',
        id: 'st1026',
        players: [
            {
                id: 1112,
                max: 16,
            },
            {
                id: 1113,
                max: 2,
            },
            {
                id: 1114,
                max: 2,
            },
            {
                id: 1115,
                max: 2,
            },
        ],
        reroll: {
            cost: 50,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight', 'Masters of Undeath'],
    },
    {
        name: 'Fimir',
        id: 'st1027',
        players: [
            {
                id: 1116,
                max: 16,
            },
            {
                id: 1117,
                max: 4,
            },
            {
                id: 1118,
                max: 2,
            },
            {
                id: 1119,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: [],
        pickSpecialRule: chaosSpecialRules,
    },
    {
        name: 'Forest Goblins',
        id: 'st1028',
        players: [
            {
                id: 1120,
                max: 16,
            },
            {
                id: 1121,
                max: 4,
            },
            {
                id: 1122,
                max: 2,
            },
            {
                id: 1123,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Badlands Brawl'],
    },
    {
        name: 'Forest Halflings',
        id: 'st1029',
        players: [
            {
                id: 1124,
                max: 16,
            },
            {
                id: 1125,
                max: 2,
            },
            {
                id: 1126,
                max: 2,
            },
            {
                id: 1127,
                max: 4,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Halfling Thimble Cup', 'Old World Classic'],
    },
    {
        name: 'Four Nations',
        id: 'st1030',
        players: [
            {
                id: 1128,
                max: 16,
            },
            {
                id: 1129,
                max: 1,
            },
            {
                id: 1130,
                max: 2,
            },
            {
                id: 1131,
                max: 4,
            },
            {
                id: 1132,
                max: 2,
            },
        ],
        reroll: {
            cost: 50,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Giant',
        id: 'st1031',
        players: [
            {
                id: 1133,
                max: 16,
            },
            {
                id: 1134,
                max: 4,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Old World Classic', 'Worlds Edge Superleague'],
    },
    {
        name: 'Gnoblar',
        id: 'st1032',
        players: [
            {
                id: 1135,
                max: 16,
            },
            {
                id: 1136,
                max: 2,
            },
            {
                id: 1137,
                max: 2,
            },
            {
                id: 1138,
                max: 2,
            },
            {
                id: 1139,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: [
            'Badlands Brawl',
            'Old World Classic',
            'Bribery and Corruption',
        ],
    },
    {
        name: 'Gnome Tinkers',
        id: 'st1033',
        players: [
            {
                id: 1140,
                max: 16,
            },
            {
                id: 1141,
                max: 2,
            },
            {
                id: 1142,
                max: 2,
            },
            {
                id: 1143,
                max: 1,
            },
            {
                id: 1144,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Old World Classic', 'Worlds Edge Superleague'],
    },
    {
        name: 'Flesh Golem',
        id: 'st1034',
        players: [
            {
                id: 1145,
                max: 16,
            },
            {
                id: 1146,
                max: 4,
            },
            {
                id: 1147,
                max: 4,
            },
            {
                id: 1148,
                max: 4,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight', 'Masters of Undeath'],
    },
    {
        name: 'Half-Elf',
        id: 'st1035',
        players: [
            {
                id: 1149,
                max: 16,
            },
            {
                id: 1150,
                max: 2,
            },
            {
                id: 1151,
                max: 4,
            },
            {
                id: 1152,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Elven Kingdoms League', 'Old World Classic'],
    },
    {
        name: 'Half-Orc',
        id: 'st1036',
        players: [
            {
                id: 1153,
                max: 16,
            },
            {
                id: 1154,
                max: 2,
            },
            {
                id: 1155,
                max: 2,
            },
            {
                id: 1156,
                max: 4,
            },
            {
                id: 1157,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Badlands Brawl'],
    },
    {
        name: 'Hill Goblin',
        id: 'st1037',
        players: [
            {
                id: 1158,
                max: 16,
            },
            {
                id: 1159,
                max: 2,
            },
            {
                id: 1160,
                max: 2,
            },
            {
                id: 1161,
                max: 2,
            },
            {
                id: 1162,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Badlands Brawl', 'Bribery and Corruption'],
    },
    {
        name: 'Hobgoblin',
        id: 'st1038',
        players: [
            {
                id: 1163,
                max: 16,
            },
            {
                id: 1164,
                max: 2,
            },
            {
                id: 1165,
                max: 4,
            },
            {
                id: 1166,
                max: 2,
            },
            {
                id: 1167,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: [
            'Badlands Brawl',
            'Worlds Edge Superleague',

            'Bribery and Corruption',
        ],
        pickSpecialRule: chaosSpecialRules,
    },
    {
        name: 'Hobgoblin Slavers',
        id: 'st1039',
        players: [
            {
                id: 1168,
                max: 16,
            },
            {
                id: 1169,
                max: 4,
            },
            {
                id: 1170,
                max: 4,
            },
            {
                id: 1171,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: [
            'Badlands Brawl',
            'Worlds Edge Superleague',

            'Bribery and Corruption',
        ],
        pickSpecialRule: chaosSpecialRules,
    },
    {
        name: 'Hung',
        id: 'st1040',
        players: [
            {
                id: 1172,
                max: 16,
            },
            {
                id: 1173,
                max: 4,
            },
            {
                id: 1174,
                max: 2,
            },
            {
                id: 1175,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: [],
        pickSpecialRule: chaosSpecialRules,
    },
    {
        name: 'Kingdom of Ind',
        id: 'st1041',
        players: [
            {
                id: 1176,
                max: 16,
            },
            {
                id: 1177,
                max: 4,
            },
            {
                id: 1178,
                max: 2,
            },
            {
                id: 1179,
                max: 1,
            },
            {
                id: 1180,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: [],
        pickSpecialRule: ['Old World Classic', 'Favoured of Tzeentch'],
    },
    {
        name: 'Kurgan',
        id: 'st1042',
        players: [
            {
                id: 1181,
                max: 16,
            },
            {
                id: 1182,
                max: 4,
            },
            {
                id: 1183,
                max: 2,
            },
            {
                id: 1184,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: [],
        pickSpecialRule: chaosSpecialRules,
    },
    {
        name: 'Dust Goblin',
        id: 'st1043',
        players: [
            {
                id: 1185,
                max: 16,
            },
            {
                id: 1186,
                max: 2,
            },
            {
                id: 1187,
                max: 2,
            },
            {
                id: 1188,
                max: 2,
            },
            {
                id: 1189,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 3,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Ka-Sabar',
        id: 'st1044',
        players: [
            {
                id: 1190,
                max: 16,
            },
            {
                id: 1191,
                max: 2,
            },
            {
                id: 1192,
                max: 4,
            },
            {
                id: 1193,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Lybaras',
        id: 'st1045',
        players: [
            {
                id: 1194,
                max: 16,
            },
            {
                id: 1195,
                max: 4,
            },
            {
                id: 1196,
                max: 2,
            },
            {
                id: 1197,
                max: 1,
            },
            {
                id: 1198,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Mahrak',
        id: 'st1046',
        players: [
            {
                id: 1199,
                max: 16,
            },
            {
                id: 1200,
                max: 2,
            },
            {
                id: 1201,
                max: 2,
            },
            {
                id: 1202,
                max: 4,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Numas',
        id: 'st1047',
        players: [
            {
                id: 1203,
                max: 16,
            },
            {
                id: 1204,
                max: 16,
            },
            {
                id: 1205,
                max: 2,
            },
            {
                id: 1206,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Rasetra',
        id: 'st1048',
        players: [
            {
                id: 1207,
                max: 16,
            },
            {
                id: 1208,
                max: 2,
            },
            {
                id: 1209,
                max: 2,
            },
            {
                id: 1210,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Zandri',
        id: 'st1049',
        players: [
            {
                id: 1211,
                max: 16,
            },
            {
                id: 1212,
                max: 2,
            },
            {
                id: 1213,
                max: 2,
            },
            {
                id: 1214,
                max: 2,
            },
            {
                id: 1215,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Lumbria',
        id: 'st1050',
        players: [
            {
                id: 1216,
                max: 16,
            },
            {
                id: 1217,
                max: 6,
            },
            {
                id: 1218,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Halfling Thimble Cup', 'Old World Classic'],
    },
    {
        name: 'Minotaur',
        id: 'st1051',
        players: [
            {
                id: 1219,
                max: 16,
            },
            {
                id: 1220,
                max: 5,
            },
            {
                id: 1221,
                max: 1,
            },
        ],
        reroll: {
            cost: 0,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: [],
        pickSpecialRule: chaosSpecialRules,
    },
    {
        name: 'Myrmidia',
        id: 'st1052',
        players: [
            {
                id: 1222,
                max: 16,
            },
            {
                id: 1223,
                max: 2,
            },
            {
                id: 1224,
                max: 4,
            },
            {
                id: 1225,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Nautican',
        id: 'st1053',
        players: [
            {
                id: 1226,
                max: 16,
            },
            {
                id: 1227,
                max: 4,
            },
            {
                id: 1228,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Lustrian Superleague'],
    },
    {
        name: 'Night Goblin',
        id: 'st1054',
        players: [
            {
                id: 1229,
                max: 16,
            },
            {
                id: 1230,
                max: 2,
            },
            {
                id: 1231,
                max: 2,
            },
            {
                id: 1232,
                max: 2,
            },
            {
                id: 1233,
                max: 2,
            },
            {
                id: 1234,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Badlands Brawl', 'Bribery and Corruption'],
    },
    {
        name: 'Ninja Flings',
        id: 'st1055',
        players: [
            {
                id: 1235,
                max: 16,
            },
            {
                id: 1236,
                max: 2,
            },
            {
                id: 1237,
                max: 2,
            },
            {
                id: 1238,
                max: 1,
            },
            {
                id: 1239,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Halfling Thimble Cup', 'Old World Classic'],
    },
    {
        name: 'Nippon',
        id: 'st1056',
        players: [
            {
                id: 1240,
                max: 16,
            },
            {
                id: 1241,
                max: 4,
            },
            {
                id: 1242,
                max: 2,
            },
            {
                id: 1243,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Northern Nippon',
        id: 'st1057',
        players: [
            {
                id: 1244,
                max: 16,
            },
            {
                id: 1245,
                max: 4,
            },
            {
                id: 1246,
                max: 2,
            },
            {
                id: 1247,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Favoured of Tzeentch'],
    },
    {
        name: 'Nuln',
        id: 'st1058',
        players: [
            {
                id: 1248,
                max: 16,
            },
            {
                id: 1249,
                max: 4,
            },
            {
                id: 1250,
                max: 2,
            },
            {
                id: 1251,
                max: 2,
            },
            {
                id: 1252,
                max: 1,
            },
        ],
        reroll: {
            cost: 0,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: [
            'Old World Classic',
            'Worlds Edge Superleague',
            'Bribery and Corruption',
        ],
    },
    {
        name: 'Ogre Kingdom',
        id: 'st1059',
        players: [
            {
                id: 1253,
                max: 16,
            },
            {
                id: 1254,
                max: 1,
            },
            {
                id: 1255,
                max: 1,
            },
            {
                id: 1256,
                max: 1,
            },
            {
                id: 1257,
                max: 1,
            },
            {
                id: 1258,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: [
            'Badlands Brawl',
            'Old World Classic',
            'Low Cost Linemen',
        ],
    },
    {
        name: 'Pirates of Sartosa',
        id: 'st1060',
        players: [
            {
                id: 1259,
                max: 16,
            },
            {
                id: 1260,
                max: 2,
            },
            {
                id: 1261,
                max: 2,
            },
            {
                id: 1262,
                max: 2,
            },
            {
                id: 1263,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic', 'Worlds Edge Superleague'],
    },
    {
        name: 'Savage Orc',
        id: 'st1061',
        players: [
            {
                id: 1264,
                max: 16,
            },
            {
                id: 1265,
                max: 4,
            },
            {
                id: 1266,
                max: 4,
            },
            {
                id: 1267,
                max: 1,
            },
            {
                id: 1268,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Badlands Brawl'],
    },
    {
        name: 'Sea Elf',
        id: 'st1062',
        players: [
            {
                id: 1269,
                max: 16,
            },
            {
                id: 1270,
                max: 2,
            },
            {
                id: 1271,
                max: 2,
            },
            {
                id: 1272,
                max: 4,
            },
        ],
        reroll: {
            cost: 50,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Elven Kingdoms League'],
    },
    {
        name: 'Clan Eshin',
        id: 'st1063',
        players: [
            {
                id: 1273,
                max: 16,
            },
            {
                id: 1274,
                max: 16,
            },
            {
                id: 1275,
                max: 4,
            },
            {
                id: 1276,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Underworld Challenge'],
    },
    {
        name: 'Mordkin',
        id: 'st1064',
        players: [
            {
                id: 1277,
                max: 16,
            },
            {
                id: 1278,
                max: 4,
            },
            {
                id: 1279,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Underworld Challenge'],
    },
    {
        name: 'Clan Mors',
        id: 'st1065',
        players: [
            {
                id: 1280,
                max: 16,
            },
            {
                id: 1281,
                max: 4,
            },
            {
                id: 1282,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Underworld Challenge'],
    },
    {
        name: 'Clan Moulder',
        id: 'st1066',
        players: [
            {
                id: 1283,
                max: 16,
            },
            {
                id: 1284,
                max: 6,
            },
            {
                id: 1285,
                max: 4,
            },
            {
                id: 1286,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Underworld Challenge'],
    },
    {
        name: 'Clan Pestilens',
        id: 'st1067',
        players: [
            {
                id: 1287,
                max: 16,
            },
            {
                id: 1288,
                max: 2,
            },
            {
                id: 1289,
                max: 2,
            },
            {
                id: 1290,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Underworld Challenge'],
    },
    {
        name: 'Clan Skryre',
        id: 'st1068',
        players: [
            {
                id: 1291,
                max: 16,
            },
            {
                id: 1292,
                max: 2,
            },
            {
                id: 1293,
                max: 2,
            },
            {
                id: 1294,
                max: 2,
            },
            {
                id: 1295,
                max: 1,
            },
            {
                id: 1296,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Underworld Challenge', 'Bribery and Corruption'],
    },
    {
        name: 'Sisters Of Sigmar',
        id: 'st1069',
        players: [
            {
                id: 1297,
                max: 16,
            },
            {
                id: 1298,
                max: 2,
            },
            {
                id: 1299,
                max: 2,
            },
            {
                id: 1300,
                max: 4,
            },
            {
                id: 1301,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Lustrian Superleague'],
    },
    {
        name: 'Skink',
        id: 'st1070',
        players: [
            {
                id: 1302,
                max: 16,
            },
            {
                id: 1303,
                max: 2,
            },
            {
                id: 1304,
                max: 2,
            },
            {
                id: 1305,
                max: 4,
            },
        ],
        reroll: {
            cost: 50,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Lustrian Superleague'],
    },
    {
        name: 'Snakemen',
        id: 'st1071',
        players: [
            {
                id: 1306,
                max: 16,
            },
            {
                id: 1307,
                max: 4,
            },
            {
                id: 1308,
                max: 2,
            },
            {
                id: 1309,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: [],
        pickSpecialRule: ['Favoured of Slaanesh', 'Lustrian Superleague'],
    },
    {
        name: 'Sons of Stromfels',
        id: 'st1072',
        players: [
            {
                id: 1310,
                max: 16,
            },
            {
                id: 1311,
                max: 2,
            },
            {
                id: 1312,
                max: 4,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic', 'Worlds Edge Superleague'],
    },
    {
        name: 'Squig',
        id: 'st1073',
        players: [
            {
                id: 1313,
                max: 16,
            },
            {
                id: 1314,
                max: 2,
            },
            {
                id: 1315,
                max: 4,
            },
            {
                id: 1316,
                max: 1,
            },
            {
                id: 1317,
                max: 1,
            },
            {
                id: 1318,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Badlands Brawl', 'Bribery and Corruption'],
    },
    {
        name: 'Tilea',
        id: 'st1074',
        players: [
            {
                id: 1319,
                max: 16,
            },
            { id: 1, max: 1 },
            { id: 2, max: 1 },
            { id: 3, max: 1 },
            { id: 4, max: 1 },
            { id: 5, max: 1 },
            { id: 19, max: 1 },
            { id: 20, max: 1 },
            { id: 21, max: 1 },
            { id: 22, max: 1 },
            { id: 23, max: 1 },
            { id: 35, max: 1 },
            { id: 36, max: 1 },
            { id: 37, max: 1 },
            { id: 38, max: 1 },
            { id: 39, max: 1 },
            { id: 40, max: 1 },
            { id: 41, max: 1 },
            { id: 42, max: 1 },
            { id: 35, max: 1 },
            { id: 5, max: 1 },
            { id: 100, max: 1 },
            { id: 101, max: 1 },
            { id: 102, max: 1 },
            { id: 103, max: 1 },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Treemen',
        id: 'st1075',
        players: [
            {
                id: 1320,
                max: 16,
            },
            {
                id: 1321,
                max: 6,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Troll',
        id: 'st1076',
        players: [
            {
                id: 1322,
                max: 16,
            },
            {
                id: 1323,
                max: 6,
            },
            {
                id: 1324,
                max: 2,
            },
            {
                id: 1325,
                max: 2,
            },
            {
                id: 1326,
                max: 2,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 3,
        specialRules: ['Badlands Brawl', 'Bribery and Corruption'],
    },
    {
        name: 'Undead Pirates',
        id: 'st1077',
        players: [
            {
                id: 1327,
                max: 16,
            },
            {
                id: 1328,
                max: 2,
            },
            {
                id: 1329,
                max: 2,
            },
            {
                id: 1330,
                max: 2,
            },
            {
                id: 1331,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight', 'Masters of Undeath'],
    },
    {
        name: 'Valkyrie',
        id: 'st1078',
        players: [
            {
                id: 1332,
                max: 16,
            },
            {
                id: 1333,
                max: 2,
            },
            {
                id: 1334,
                max: 2,
            },
            {
                id: 1335,
                max: 4,
            },
            {
                id: 1336,
                max: 1,
            },
            {
                id: 1337,
                max: 1,
            },
            {
                id: 1338,
                max: 1,
            },
            {
                id: 1339,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Old World Classic'],
    },
    {
        name: 'Blood Dragons',
        id: 'st1079',
        players: [
            {
                id: 1340,
                max: 16,
            },
            {
                id: 1341,
                max: 4,
            },
            {
                id: 1342,
                max: 2,
            },
            {
                id: 1343,
                max: 6,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Lahmian',
        id: 'st1080',
        players: [
            {
                id: 1344,
                max: 16,
            },
            {
                id: 1345,
                max: 2,
            },
            {
                id: 1346,
                max: 6,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Necrarch',
        id: 'st1081',
        players: [
            {
                id: 1347,
                max: 16,
            },
            {
                id: 1348,
                max: 2,
            },
            {
                id: 1349,
                max: 4,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 1,
        specialRules: ['Sylvanian Spotlight', 'Masters of Undeath'],
    },
    {
        name: 'Strigoi',
        id: 'st1082',
        players: [
            {
                id: 1350,
                max: 16,
            },
            {
                id: 1351,
                max: 2,
            },
            {
                id: 1352,
                max: 6,
            },
            {
                id: 1353,
                max: 4,
            },
            {
                id: 1354,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Von Carstein',
        id: 'st1083',
        players: [
            {
                id: 1355,
                max: 16,
            },
            {
                id: 1356,
                max: 6,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Were',
        id: 'st1084',
        players: [
            {
                id: 1357,
                max: 16,
            },
            {
                id: 1358,
                max: 4,
            },
            {
                id: 1359,
                max: 2,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Sylvanian Spotlight'],
    },
    {
        name: 'Witch Hunter',
        id: 'st1085',
        players: [
            {
                id: 1360,
                max: 16,
            },
            {
                id: 1361,
                max: 4,
            },
            {
                id: 1362,
                max: 2,
            },
            {
                id: 1363,
                max: 2,
            },
            {
                id: 1364,
                max: 1,
            },
        ],
        reroll: {
            cost: 60,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Lustrian Superleague'],
    },
    {
        name: 'Kurnous',
        id: 'st1086',
        players: [
            {
                id: 1365,
                max: 16,
            },
            {
                id: 1366,
                max: 2,
            },
            {
                id: 1367,
                max: 2,
            },
            {
                id: 1368,
                max: 2,
            },
            {
                id: 1369,
                max: 1,
            },
        ],
        reroll: {
            cost: 50,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Elven Kingdoms League'],
    },
    {
        name: 'Isha',
        id: 'st1087',
        players: [
            {
                id: 1370,
                max: 16,
            },
            {
                id: 1371,
                max: 4,
            },
            {
                id: 1372,
                max: 4,
            },
            {
                id: 1373,
                max: 1,
            },
        ],
        reroll: {
            cost: 0,
            max: 8,
        },
        allowedApothecary: false,
        tier: 2,
        specialRules: ['Elven Kingdoms League'],
    },
    {
        name: 'Zoat',
        id: 'st1088',
        players: [
            {
                id: 1374,
                max: 16,
            },
            {
                id: 1375,
                max: 4,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 2,
        specialRules: ['Lustrian Superleague'],
    },
    {
        name: 'Spawn of Chaos',
        id: 'st1089',
        players: [
            {
                id: 1376,
                max: 4,
            },
            {
                id: 1377,
                max: 4,
            },
            {
                id: 1378,
                max: 4,
            },
            {
                id: 1379,
                max: 4,
            },
            {
                id: 1380,
                max: 4,
            },
            {
                id: 1381,
                max: 1,
            },
            {
                id: 1382,
                max: 1,
            },
            {
                id: 1383,
                max: 1,
            },
            {
                id: 1384,
                max: 1,
            },
            {
                id: 1385,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: [],
        pickSpecialRule: chaosSpecialRules,
    },
    {
        name: 'Malal',
        id: 'st1090',
        players: [
            {
                id: 1386,
                max: 16,
            },
            {
                id: 1387,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Favoured of Chaos Undivided'],
    },
    {
        name: 'Werewolf',
        id: 'st1091',
        players: [
            {
                id: 1388,
                max: 16,
            },
            {
                id: 1389,
                max: 1,
            },
        ],
        reroll: {
            cost: 70,
            max: 8,
        },
        allowedApothecary: true,
        tier: 1,
        specialRules: ['Sylvanian Spotlight'],
    },
];
