import type { Player } from "./player.model";

export interface Roster {
  teamId: number;
  players: RosterPlayerRecord[];
  rerolls: number;
  extra?: unknown;
}

export interface RosterPlayerRecord {
  player: Player;
  playerName: string;
}
