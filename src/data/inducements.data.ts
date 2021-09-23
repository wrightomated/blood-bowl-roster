import type { Inducement } from '../models/inducement.model';

export const inducementData: { inducements: Inducement[] } = {
    inducements: [
        {
            id: 'i1',
            displayName: 'Temp Agency Cheerleader',
            cost: 20,
            max: 4,
            sevensMax: 2,
            sevensCost: 30,
        },
        {
            id: 'i2',
            displayName: 'Part-time Assistant Coach',
            cost: 20,
            max: 3,
            sevensMax: 1,
            sevensCost: 30,
        },
        {
            id: 'i3',
            displayName: 'Weather Mage',
            cost: 30,
            max: 1,
            sevensMax: 0,
        },
        { id: 'i4', displayName: 'Bloodweiser Keg', cost: 50, max: 2 },
        { id: 'i5', displayName: 'Special Play', cost: 100, max: 5 },
        {
            id: 'i6',
            displayName: 'Extra Team Training',
            cost: 100,
            max: 8,
            sevensCost: 150,
        },
        {
            id: 'i7',
            displayName: 'Bribe',
            cost: 100,
            reducedCost: { specialRule: 'Bribery and Corruption', cost: 50 },
            max: 3,
        },
        {
            id: 'i8',
            displayName: 'Wandering Apothecary',
            cost: 100,
            max: 2,
            requiresApothecary: true,
        },
        {
            id: 'i9',
            displayName: 'Mortuary Assistant',
            cost: 100,
            max: 1,
            requiresSpecialRule: 'Sylvanian Spotlight',
        },
        {
            id: 'i10',
            displayName: 'Plague Doctor',
            cost: 100,
            max: 1,
            requiresSpecialRule: 'Favoured of Nurgle',
        },
        {
            id: 'i11',
            displayName: 'Riotous Rookies',
            cost: 100,
            max: 1,
            requiresSpecialRule: 'Low Cost Linemen',
            sevensMax: 0,
        },
        {
            id: 'i12',
            displayName: 'Halfling Master Chef',
            cost: 300,
            reducedCost: { specialRule: 'Halfling Thimble Cup', cost: 100 },
            max: 1,
        },
        { id: 'i13', displayName: 'Mercenary Player', cost: 30, max: 16 },
        { id: 'i14', displayName: 'Star Player', cost: 0, max: 2 },
        {
            id: 'i15',
            displayName: '(In)Famous Coaching Staff: Josef Bugman',
            cost: 100,
            max: 1,
            sevensMax: 0,
        },
        {
            id: 'i18',
            displayName: '(In)Famous Coaching Staff: Kari Coldsteel',
            cost: 50,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: [
                'Elven Kingdoms League',
                'Lustrian Superleague',
                'Old World Classic',
                'Worlds Edge Superleague',
            ],
        },
        {
            id: 'i19',
            displayName: '(In)Famous Coaching Staff: Papa Skullbones',
            cost: 80,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: [
                'Favoured of Khorne',
                'Favoured of Nurgle',
                'Favoured of...',
                'Underworld Challenge',
            ],
        },
        {
            id: 'i20',
            displayName: '(In)Famous Coaching Staff: Glandril Silverwater',
            cost: 40,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: 'Elven Kingdoms League',
        },
        {
            id: 'i21',
            displayName: '(In)Famous Coaching Staff: Krot Shockwhisker',
            cost: 70,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: 'Underworld Challenge',
        },
        {
            id: 'i22',
            displayName: '(In)Famous Coaching Staff: Ayleen Andar',
            cost: 100,
            max: 1,
            sevensMax: 0,
        },
        {
            id: 'i23',
            displayName: '(In)Famous Coaching Staff: Professor Frönkelheim',
            cost: 130,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: 'Sylvanian Spotlight',
        },
        {
            id: 'i24',
            displayName: '(In)Famous Coaching Staff: Mungo Spinecracker',
            cost: 80,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: [
                'Badlands Brawl',
                'Old World Classic',
                'Underworld Challenge',
            ],
        },
        {
            id: 'i25',
            displayName: '(In)Famous Coaching Staff: Fink Da Fixer',
            cost: 90,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: ['Badlands Brawl', 'Underworld Challenge'],
        },
        {
            id: 'i26',
            displayName: '(In)Famous Coaching Staff: Schielund Scharlitan',
            cost: 90,
            max: 1,
            sevensMax: 0,
        },
        {
            id: 'i16',
            displayName: 'Wizard: Hireling Sports-Wizard',
            cost: 150,
            max: 1,
            sevensMax: 0,
        },
        {
            id: 'i27',
            displayName: 'Wizard: Chaos Sorcerer',
            cost: 150,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: [
                'Favoured of...',
                'Favoured of Nurgle',
                'Favoured of Khorne',
                'Underworld Challenge',
            ],
        },
        {
            id: 'i28',
            displayName: 'Wizard: Druchii Sorceress',
            cost: 150,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: [
                'Elven Kingdoms League',
                'Favoured of Khorne',
                'Favoured of Nurgle',
                'Favoured of...',
            ],
        },
        {
            id: 'i29',
            displayName: 'Wizard: Asur High Mage',
            cost: 150,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: 'Elven Kingdoms League',
        },
        {
            id: 'i30',
            displayName: 'Wizard: Slann Mage Priest',
            cost: 200,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: 'Lustrian Superleague',
        },
        {
            id: 'i31',
            displayName: 'Wizard: Horticulturalist of Nurgle',
            cost: 150,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: ['Favoured of Nurgle', 'Underworld Challenge'],
        },
        {
            id: 'i32',
            displayName: 'Wizard: Sports Necrotheurge',
            cost: 150,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: 'Sylvanian Spotlight',
        },
        {
            id: 'i33',
            displayName: 'Wizard: Wicked Witch',
            cost: 150,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: [
                'Old World Classic',
                'Sylvanian Spotlight',
                'Underworld Challenge',
            ],
        },
        {
            id: 'i34',
            displayName: 'Wizard: Warlock Engineer',
            cost: 150,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: 'Underworld Challenge',
        },
        {
            id: 'i35',
            displayName: 'Wizard: Ogre Firebelly',
            cost: 150,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: 'Badlands Brawl',
        },
        {
            id: 'i36',
            displayName: 'Wizard: Night Goblin Shaman',
            cost: 150,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: ['Badlands Brawl', 'Underworld Challenge'],
        },
        {
            id: 'i37',
            displayName: 'Named Wizard: Horatio X. Schottenheim',
            cost: 80,
            max: 1,
            sevensMax: 0,
        },
        {
            id: 'i17',
            displayName: 'Biased Referee',
            cost: 120,
            reducedCost: { specialRule: 'Bribery and Corruption', cost: 80 },
            max: 2,
            sevensMax: 0,
        },
        {
            id: 'i38',
            displayName: "Biased Referee: Ranulf 'Red' Hokuli",
            cost: 130,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: ['Lustrian Superleague', 'Old World Classic'],
        },
        {
            id: 'i39',
            displayName: 'Biased Referee: Thoron Korensson',
            cost: 120,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: 'Worlds Edge Superleague',
        },
        {
            id: 'i40',
            displayName: 'Biased Referee: Jorm the Ogre',
            cost: 120,
            max: 1,
            sevensMax: 0,
            reducedCost: { specialRule: 'Bribery and Corruption', cost: 80 },
        },
        {
            id: 'i41',
            displayName: 'Biased Referee: The Trundlefoot Triplets',
            cost: 80,
            max: 1,
            sevensMax: 0,
            reducedCost: { specialRule: 'Halfling Thimble Cup', cost: 40 },
        },
        {
            id: 'i42',
            displayName: 'WAAAGH! Drummer',
            cost: 50,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: 'Badlands Brawl',
        },
        {
            id: 'i43',
            displayName: 'Cavorting Nurgling',
            cost: 30,
            max: 3,
            sevensMax: 0,
            requiresSpecialRule: 'Favoured of Nurgle',
        },
        {
            id: 'i44',
            displayName: 'Dwarfen Runesmith',
            cost: 50,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: [
                'Old World Classic',
                'Worlds Edge Superleague',
            ],
        },
        {
            id: 'i45',
            displayName: 'Halfling Hot Pot',
            cost: 80,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: ['Halfling Thimble Cup', 'Old World Classic'],
            reducedCost: { specialRule: 'Halfling Thimble Cup', cost: 60 },
        },
        {
            id: 'i46',
            displayName: 'Master of Ballistics',
            cost: 40,
            max: 1,
            sevensMax: 0,
            requiresSpecialRule: ['Halfling Thimble Cup', 'Old World Classic'],
            reducedCost: { specialRule: 'Halfling Thimble Cup', cost: 30 },
        },
        {
            id: 'i47',
            displayName: 'Bottles of Heady Brew',
            cost: 40,
            max: 3,
            sevensMax: 0,
            requiresTier: 3,
        },
        {
            id: 'i48',
            displayName: 'Team Mascot',
            cost: 30,
            max: 1,
            sevensMax: 0,
        },
        {
            id: 'i49',
            displayName: 'Medical Unguent',
            cost: 60,
            max: 1,
            sevensMax: 0,
        },
    ],
};
