import { skillCatalogue } from '../data/skills.data';

export const getSkill = (id: number) => {
    return skillCatalogue.find((s) => s.id === id).name;
};
