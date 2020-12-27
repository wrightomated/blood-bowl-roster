import type { Player } from "./player.model";
import type { TeamName } from "./team.model";

export interface Roster {
  teamId: number;
  teamName: string;
  teamType: TeamName;
  players: RosterPlayerRecord[];
  rerolls: number;
  extra?: unknown;
}

export interface RosterPlayerRecord {
  player: Player;
  playerName: string;
}
