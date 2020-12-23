import type { PlayerCatalogue } from "../models/player.model";

export const playerCatalogue: PlayerCatalogue = {
  players: [
    {
      id: 1,
      position: "Lineman",
      playerStats: [6, 3, 4, 4, 8],
      cost: 45,
      skills: [],
      primary: ["G"],
      secondary: ["A", "S"],
    },
    {
      id: 2,
      position: "Thrower",
      playerStats: [6, 3, 3, 3, 9],
      cost: 75,
      skills: [],
      primary: ["G", "P"],
      secondary: ["A", "S"],
    },
    {
      id: 3,
      position: "Blitzer",
      playerStats: [7, 3, 3, 4, 9],
      cost: 105,
      skills: [],
      primary: ["A", "G"],
      secondary: ["P", "S"],
    },
    {
      id: 4,
      position: "Bodyguard",
      playerStats: [6, 3, 3, 5, 9],
      cost: 90,
      skills: [],
      primary: ["G", "S"],
      secondary: ["A"],
    },
    {
      id: 5,
      position: "Ogre",
      playerStats: [5, 5, 4, 5, 10],
      cost: 140,
      skills: [],
      primary: ["S"],
      secondary: ["A", "G"],
    },
    {
      id: 6,
      position: "Goblin Bruiser Lineman",
      playerStats: [6, 3, 2, 4, 8],
      cost: 45,
      skills: [],
      primary: ["A"],
      secondary: ["G", "P", "S"],
    },
    {
      id: 7,
      position: "Black Orc",
      playerStats: [4, 4, 4, 5, 10],
      cost: 90,
      skills: [],
      primary: ["G", "S"],
      secondary: ["A", "P"],
    },
    {
      id: 8,
      position: "Trained Troll",
      playerStats: [4, 5, 5, 5, 10],
      cost: 115,
      skills: [],
      primary: ["S"],
      secondary: ["A", "G", "P"],
    },
  ],
};

// Goblin	45	12		0
// Black Orc	90	6		0
// Troll	115	1		0
