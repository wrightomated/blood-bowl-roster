import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
import { extrasForTeam } from '../helpers/extrasForTeam';
import { calculateInducementTotal } from '../helpers/totalInducementAmount';
import type { Roster } from '../models/roster.model';

export type RosterValidationResult = {
    valid: boolean;
    invalid: {
        tooFew?: boolean;
        tooMany?: boolean;
        tooBigGuy?: boolean;
        moreThanFourOfTheSameSkill?: string[];
        tooManySecondarySkills?: number;
        sppBalance?: number;
        tooManyOfPlayerType?: number[];
        teamTotalValue?: number;
    };
};

export type RosterValidationOptions = {
    sppAllowance: number;
    currentTeam: CustomTeam;
    budget: number;
    maxOfSkillId?: number;
    maxPlayers?: number;
    minPlayers?: number;
    starPlayerSpp?: number;
    secondaryAllowance?: number;
};

export function invalidRoster(
    roster: Roster,
    {
        sppAllowance,
        currentTeam,
        budget,
        maxOfSkillId,
        maxPlayers,
        minPlayers,
        starPlayerSpp,
        secondaryAllowance,
    }: RosterValidationOptions
): RosterValidationResult {
    try {
        const tooFew = tooFewPlayers(roster, minPlayers || 11);
        const tooMany = tooManyPlayers(roster, maxPlayers || 16);
        const tooBigGuy = tooManyBigGuy(roster, currentTeam?.maxBigGuys);
        const moreThanMaxOfSameSkill = moreThanMaxSkills(roster, maxOfSkillId);
        const sppBalance = excessSpp(roster, sppAllowance, starPlayerSpp);
        const tooManyOfPlayerType = tooManyOfPlayerTypeCalc(
            roster,
            currentTeam
        );
        const teamTotalValue = teamTotal(roster);
        const budgetValid = budget ? teamTotalValue <= budget : true;
        let tooManySecondarySkills = 0;
        if (secondaryAllowance) {
            const advancements = allAdvancements(roster);
            const secondarySkills = advancements.filter(
                (x) =>
                    x.type === 'secondaryselect' || x.type === 'secondaryrandom'
            );
            tooManySecondarySkills =
                secondarySkills.length - secondaryAllowance;
        }

        const valid =
            !tooFew &&
            !tooMany &&
            !tooBigGuy &&
            !(moreThanMaxOfSameSkill.length > 0) &&
            sppBalance >= 0 &&
            !(tooManyOfPlayerType.length > 0) &&
            budgetValid &&
            tooManySecondarySkills <= 0;

        return {
            valid,
            invalid: {
                tooFew,
                tooMany,
                tooBigGuy,
                moreThanFourOfTheSameSkill: moreThanMaxOfSameSkill,
                sppBalance,
                tooManyOfPlayerType,
                teamTotalValue,
                tooManySecondarySkills,
            },
        };
    } catch (error) {
        return {
            valid: false,
            invalid: {},
        };
    }
}

export function tooFewPlayers(roster: Roster, minimum: number): boolean {
    return (
        roster.players.filter((x) => !x.deleted && !x.starPlayer).length <
        minimum
    );
}

export function tooManyPlayers(roster: Roster, maximum: number): boolean {
    return (
        roster.players.filter((x) => !x.deleted && !x.starPlayer).length >
        maximum
    );
}

export function tooManyBigGuy(roster: Roster, bigGuyMax?: number): boolean {
    const bigGuys = roster.players.filter(
        (x) => !x.deleted && x.player.bigGuy
    ).length;
    return bigGuys > (bigGuyMax || 1);
}

function tooManyOfPlayerTypeCalc(
    roster: Roster,
    currentTeam: CustomTeam
): number[] {
    const playerAllowance = currentTeam.players;
    const players = roster.players.filter((x) => !x.deleted);
    const tooMany = playerAllowance
        .map((x) => {
            const count = players.filter((y) => y.player.id === x.id).length;
            return count > x.max ? x.id : undefined;
        })
        .filter((x) => x !== undefined);
    return tooMany;
}

export function advancementBreakdown(roster: Roster) {
    const advancements = allAdvancements(roster);
    const breakdown = advancements.reduce(
        (a, b) => {
            if (a[b.type] !== undefined) {
                a[b.type]++;
            }
            return a;
        },
        {
            primaryselect: 0,
            primaryrandom: 0,
            characteristic: 0,
            secondaryselect: 0,
            secondaryrandom: 0,
        }
    );
    return breakdown;
}
/**
 * return any skillids that appear more than skillMax times in the advancements
 */
export function moreThanMaxSkills(roster: Roster, skillMax: number) {
    if (typeof skillMax !== 'number') return [];

    const advancements = allAdvancements(roster);
    const skillIds = advancements
        .filter((x) => x.type !== 'characteristic')
        .map((x) => x.advancementValue);
    const counts = skillIds.reduce((a, b) => {
        a[b] = a[b] ? a[b] + 1 : 1;
        return a;
    }, {});
    const moreThanMaxSkillIds = Object.keys(counts).filter(
        (x) => counts[x] > skillMax
    );

    return moreThanMaxSkillIds;
}

function allAdvancements(roster: Roster) {
    const skills = roster.players
        .filter((x) => !x.deleted)
        .map((x) => x?.alterations?.specificAdvancements || [])
        .flat();
    return skills;
}

export function excessSpp(
    roster: Roster,
    allowance: number,
    starPlayerSpp: number = 0
) {
    const spp = roster.players
        .filter((x) => !x.deleted)
        .map((x) => x.alterations?.spp || 0)
        .reduce((a, b) => a + b, 0);

    return allowance + spp - starPlayerSpp;
}

/** Including dedicated fans */
export function teamTotal(roster: Roster) {
    const players = roster.players.filter((x) => !x.deleted);
    const playerTotal = players.reduce((a, b) => a + b.player.cost, 0);
    const inducementTotal = calculateInducementTotal(
        roster.inducements,
        roster.teamId,
        roster.format
    );
    const extraTotal = extrasForTeam(roster.teamId, roster.mode, roster.format)
        .map((x) => roster.extra[x.extraString] * x.cost || 0)
        .reduce((a, b) => a + b, 0);
    return playerTotal + inducementTotal + extraTotal;
}
