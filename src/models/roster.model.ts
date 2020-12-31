import type { Player } from "./player.model";
import type { TeamName } from "./team.model";

export interface Roster {
  teamId: number;
  teamName: string;
  teamType: TeamName;
  players: RosterPlayerRecord[];
  rerolls: number;
  extra?: ExtraRosterInfo;
  inducements: ExtraRosterInfo;
  starPlayers: number[];
}

export interface RosterPlayerRecord {
  player: Player;
  playerName: string;
  starPlayer?: boolean;
}

// interface RosteredInducement {
//     name: string;
//     cost: number;
//     amount: number;
//     id: string;
// }

interface ExtraRosterInfo {
    [key: string]: number;
}
