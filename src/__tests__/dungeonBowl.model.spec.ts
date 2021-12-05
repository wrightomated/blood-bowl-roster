import { dbCollegeToTeam } from '../models/dungeonBowl.model';

test('should convert dungeon bowl college into team', () => {
    expect(
        dbCollegeToTeam({
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
        })
    ).toEqual({
        characteristics: {
            aggression: 2,
            power: 4,
            resilience: 2,
            skill: 4,
            speed: 5,
        },
        id: 108,
        name: 'Heavens',
        players: [
            { dungeonBowlRole: 'linemen', id: 43, max: 16 },
            { dungeonBowlRole: 'blitzers', id: 3, max: 4 },
            { dungeonBowlRole: 'throwers', id: 40, max: 2 },
            { dungeonBowlRole: 'blockers', id: 45, max: 6 },
            { dungeonBowlRole: 'special', id: 44, max: 2 },
        ],
        reroll: {
            cost: 50,
            max: 8,
        },
        specialRules: [],
        tier: 1,
        allowedApothecary: false,
    });
});

test('should return null with a malformed team', () => {
    expect(dbCollegeToTeam(null)).toBeNull();
});
