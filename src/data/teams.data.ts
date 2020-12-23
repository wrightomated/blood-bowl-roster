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
  ],
};
