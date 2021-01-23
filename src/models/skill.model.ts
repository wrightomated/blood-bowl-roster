export interface Skill {
    id: number;
    name: string;
    category: SkillCategory;
}

export type SkillCategory = 'A' | 'M' | 'P' | 'G' | 'S' | 'T' | 'NA';

export const categoryToName: Map<SkillCategory, string> = new Map([
    ['A', 'Agility'],
    ['M', 'Mutation'],
    ['P', 'Passing'],
    ['G', 'General'],
    ['S', 'Strength'],
]);
