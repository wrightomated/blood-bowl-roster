import type { Player } from "./player.model";
import type { TeamName } from "./team.model";

export interface Roster {
  teamId: number;
  teamName: string;
  teamType: TeamName;
  players: RosterPlayerRecord[];
  rerolls: number;
  extra?: ExtraRosterInfo;
}

export interface RosterPlayerRecord {
  player: Player;
  playerName: string;
}

interface ExtraRosterInfo {
    [key: string]: number;
}
