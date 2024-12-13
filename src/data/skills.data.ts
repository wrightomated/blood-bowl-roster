import type { Skill } from '../models/skill.model';

export const skillCatalogue: Skill[] = [
    { id: 1, category: 'A' },
    { id: 2, category: 'A' },
    { id: 3, category: 'A' },
    { id: 4, category: 'A' },
    { id: 5, category: 'A' },
    { id: 6, category: 'A' },
    { id: 7, category: 'A' },
    { id: 8, category: 'A' },
    { id: 9, category: 'A' },
    { id: 10, category: 'A' },
    { id: 11, category: 'A' },
    { id: 12, category: 'A' },
    { id: 13, category: 'G' },
    { id: 14, category: 'G' },
    { id: 15, category: 'G' },
    { id: 151, category: 'NA' },
    { id: 16, category: 'G' },
    { id: 17, category: 'G' },
    { id: 18, category: 'G' },
    { id: 19, category: 'G' },
    { id: 20, category: 'G' },
    { id: 21, category: 'G' },
    { id: 22, category: 'G' },
    { id: 23, category: 'G' },
    { id: 24, category: 'G' },
    { id: 25, category: 'M' },
    { id: 26, category: 'M' },
    { id: 27, category: 'M' },
    { id: 28, category: 'M' },
    { id: 29, category: 'M' },
    { id: 30, category: 'M' },
    { id: 31, category: 'M' },
    { id: 32, category: 'M' },
    { id: 33, category: 'M' },
    { id: 34, category: 'M' },
    { id: 35, category: 'M' },
    { id: 36, category: 'M' },
    { id: 37, category: 'P' },
    { id: 38, category: 'P' },
    { id: 39, category: 'P' },
    { id: 40, category: 'P' },
    { id: 41, category: 'P' },
    { id: 42, category: 'P' },
    { id: 43, category: 'P' },
    { id: 44, category: 'P' },
    { id: 45, category: 'P' },
    { id: 46, category: 'P' },
    { id: 47, category: 'P' },
    { id: 48, category: 'P' },
    { id: 49, category: 'S' },
    { id: 50, category: 'S' },
    { id: 51, category: 'S' },
    { id: 52, category: 'S' },
    { id: 53, category: 'S' },
    { id: 54, category: 'S' },
    { id: 55, category: 'S' },
    { id: 551, category: 'NA' },
    { id: 56, category: 'S' },
    { id: 57, category: 'S' },
    { id: 58, category: 'S' },
    { id: 59, category: 'S' },
    { id: 60, category: 'S' },
    { id: 61, category: 'T' },
    { id: 62, category: 'T' },
    { id: 620, category: 'T' },
    { id: 621, category: 'T' },
    { id: 622, category: 'T' },
    { id: 623, category: 'T' },
    { id: 624, category: 'T' },
    { id: 625, category: 'T' },
    { id: 63, category: 'T' },
    { id: 64, category: 'T' },
    { id: 65, category: 'T' },
    { id: 66, category: 'T' },
    { id: 67, category: 'T' },
    { id: 68, category: 'T' },
    { id: 69, category: 'T' },
    { id: 70, category: 'T' },
    { id: 710, category: 'T' },
    { id: 71, category: 'T' },
    { id: 711, category: 'T' },
    { id: 72, category: 'T' },
    { id: 73, category: 'T' },
    { id: 74, category: 'T' },
    { id: 75, category: 'T' },
    { id: 76, category: 'T' },
    { id: 77, category: 'T' },
    { id: 78, category: 'T' },
    { id: 79, category: 'T' },
    { id: 80, category: 'T' },
    { id: 81, category: 'T' },
    { id: 82, category: 'T' },
    { id: 83, category: 'T' },
    { id: 84, category: 'T' },
    { id: 85, category: 'T' },
    { id: 86, category: 'T' },
    { id: 87, category: 'T' },
    { id: 88, category: 'T' },
    // Dungeon bowl skills
    { id: 89, category: 'G' },
    { id: 90, category: 'P' },
    { id: 91, category: 'P' },
    { id: 92, category: 'P' },
    // norse
    { id: 93, category: 'T' },
    { id: 94, category: 'T' },
    // Amazon
    { id: 95, category: 'T' },
    // Vampire
    { id: 96, category: 'T' },
    { id: 97, category: 'T' },
    // Gnomes
    { id: 98, category: 'T' },
    { id: 99, category: 'T' },
    // "201": "Big Hand*",
    // "202": "Claws*",
    // "203": "Sure Hands*",
    // "204": "Juggernaut**"
    { id: 201, category: 'M' },
    { id: 202, category: 'M' },
    { id: 203, category: 'G' },
    { id: 204, category: 'S' },
    // Chaos dwarf
    { id: 100, category: 'T' },
];

export const dungeonBowlSkillIds = {
    included: [89, 90, 91, 92],
    excluded: [18, 38, 39, 42],
};
