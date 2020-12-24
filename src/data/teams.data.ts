import type { TeamList } from "../models/team.model";

export const teamData: TeamList = {
  teams: [
    {
      name: "Imperial Nobility",
      id: 1,
      players: [
        { id: 1, max: 12 },
        { id: 2, max: 2 },
        { id: 3, max: 2 },
        { id: 4, max: 4 },
        { id: 5, max: 1 },
      ],
      reroll: { cost: 70, max: 8 },
      apothecary: true,
      tier: 2,
    },
    {
      name: "Black Orc",
      id: 2,
      players: [
        { id: 6, max: 12 },
        { id: 7, max: 6 },
        { id: 8, max: 1 },
      ],
      reroll: { cost: 60, max: 8 },
      apothecary: true,
      tier: 2,
    },
    {
      name: "Chaos Chosen",
      id: 3,
      players: [
        { id: 9, max: 16 },
        { id: 10, max: 4 },
        { id: 11, max: 1 },
        { id: 12, max: 1 },
        { id: 13, max: 1 },
      ],
      reroll: { cost: 60, max: 8 },
      apothecary: true,
      tier: 2,
    },
    {
      name: "Dark Elf",
      id: 4,
      players: [
        { id: 14, max: 12 },
        { id: 15, max: 2 },
        { id: 16, max: 4 },
        { id: 17, max: 2 },
        { id: 18, max: 2 },
      ],
      reroll: { cost: 50, max: 8 },
      apothecary: true,
      tier: 1,
    },
    {
      name: "Dwarf",
      id: 5,
      players: [
        { id: 19, max: 12 },
        { id: 20, max: 2 },
        { id: 21, max: 2 },
        { id: 22, max: 2 },
        { id: 23, max: 1 },
      ],
      reroll: { cost: 50, max: 8 },
      apothecary: true,
      tier: 1,
    },
  ],
};
