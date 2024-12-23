import { PickedSpecialRule } from '../../data/teams.data';
import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';
import { teamTotal } from '../../helpers/validator';
import type { InducementsRecord, Roster } from '../../models/roster.model';
import type { RosterMode } from '../../store/rosterMode.store';
import type { TeamFormat } from '../../types/teamFormat';

type PlayerSummary = {
    position: string;
    count: number;
    extraSkills: { skill: string; amount: number }[];
    cost: number;
};
export type ShareModel = {
    teamName: string;
    teamType: string;
    teamTotal: string;
    format: TeamFormat;
    mode: RosterMode;
    coachName?: string;
    nafNumber?: string;
    rerolls?: number;
    assistantCoaches?: number;
    cheerleaders?: number;
    dedicatedFans?: number;
    apothecary?: number;
    specialRule?: string;
    playerSummary: PlayerSummary[];
    inducements: InducementsRecord;
};

export function rosterToShareModel(roster: Roster): ShareModel {
    const playersByPosition: Record<string, any[]> = {};
    roster.players.forEach((player) => {
        if (!playersByPosition[player.player.position]) {
            playersByPosition[player.player.position] = [];
        }
        playersByPosition[player.player.position].push(player);
    });
    let playerSummary: PlayerSummary[] = [];

    Object.keys(playersByPosition).forEach((position) => {
        const extraSkills: { skill: string; amount: number }[] = [];
        let cost = 0;
        playersByPosition[position].forEach((player) => {
            if (player?.alterations?.extraSkills) {
                player.alterations.extraSkills.forEach((skill) => {
                    const skillIndex = extraSkills.findIndex(
                        (x) => x.skill === skill
                    );
                    if (skillIndex === -1) {
                        extraSkills.push({ skill, amount: 1 });
                    } else {
                        extraSkills[skillIndex].amount++;
                    }
                });
            }
            cost += player.player.cost;
            cost += player.alterations?.valueChange || 0;
        });
        playerSummary.push({
            position,
            count: playersByPosition[position].length,
            extraSkills,
            cost,
        });
    });
    return {
        teamName: roster.teamName,
        teamType: roster.teamType,
        teamTotal: formatNumberInThousands(teamTotal(roster, false)),
        format: roster.format,
        mode: roster.mode,
        coachName: roster.coachDetails?.coachName,
        nafNumber: roster.coachDetails?.nafNumber,
        rerolls: roster.extra['rerolls'],
        assistantCoaches: roster.extra['assistantCoaches'],
        cheerleaders: roster.extra['cheerleaders'],
        dedicatedFans: roster.extra['dedicated_fans'],
        apothecary: roster.extra['apothecary'],
        specialRule: PickedSpecialRule[roster.extra['specialRule']],
        playerSummary,
        inducements: roster.inducements,
    };
}

export function rosterToTextSummary(roster: Roster): string {
    let summary = roster.teamName ? `${roster.teamName}\n` : '';
    summary += `${roster.teamType}\n`;
    // summary += `Team Value: ${teamTotal(roster)}\n`;
    summary += `${roster.format}\n`;
    summary += `${roster.mode}\n`;
    summary += roster?.coachDetails?.coachName
        ? `Coach Name: ${roster.coachDetails.coachName}\n`
        : '';
    summary += roster?.coachDetails?.nafNumber
        ? `NAF Number: ${roster.coachDetails.nafNumber}\n`
        : '';

    Object.keys(roster.extra).forEach((key) => {
        summary += `${key}: ${roster.extra[key]}\n`;
    });

    // Group players by position
    const playersByPosition: Record<string, any[]> = {};
    roster.players.forEach((player) => {
        if (!playersByPosition[player.player.position]) {
            playersByPosition[player.player.position] = [];
        }
        playersByPosition[player.player.position].push(player);
    });

    Object.keys(playersByPosition).forEach((position) => {
        summary += `${playersByPosition[position].length} * ${position}:\n`;
        // Get total of extra skills
        const extraSkills: string[] = [];
        playersByPosition[position].forEach((player) => {
            if (player?.alterations?.extraSkills) {
                player.alterations.extraSkills.forEach((skill) => {
                    extraSkills.push(skill);
                });
            }
        });
        summary += `Extra Skills: ${extraSkills.join(', ')}\n`;
        summary += '\n';
    });

    return summary;
}
