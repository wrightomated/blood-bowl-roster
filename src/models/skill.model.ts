export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
}

export type SkillCategory = "A" | "M" | "P" | "G" | "S" | "T";
