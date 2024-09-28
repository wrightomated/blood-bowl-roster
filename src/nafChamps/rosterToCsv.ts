import { inducementData } from '../data/inducements.data';
import { extrasForTeam } from '../helpers/extrasForTeam';
import { teamTotal } from '../helpers/validator';
import type { Extra } from '../models/extra.model';
import type { Roster, RosterPlayerRecord } from '../models/roster.model';
import { format, unwrapFunctionStore } from 'svelte-i18n';
const $format = unwrapFunctionStore(format);

export function rosterToCsv(roster: Roster) {
    let extras: Extra[] = extrasForTeam(
        roster.teamId,
        roster.mode,
        roster.format
    );
    let csv = '';
    csv += newCsvLine({
        cell1: 'Team Race',
        cell3: roster.teamType,
    });
    csv += newCsvLine({
        cell1: 'Team Name',
        cell3: roster.teamName,
    });
    csv += newCsvLine({
        cell1: 'Coach Name',
        cell3: roster?.coachDetails?.coachName,
    });
    csv += newCsvLine({
        cell1: 'NAF Number',
        cell3: roster?.coachDetails?.nafNumber,
    });
    csv += newCsvLine({});
    // #,Player Position,,Cost,First Upgrade,Skill,Second Upgrade,Skill
    csv += newCsvLine({
        cell1: '#',
        cell2: 'Player Position',
        cell4: 'Cost',
        cell5: 'First Upgrade',
        cell6: 'Skill',
        cell7: 'Second Upgrade',
        cell8: 'Skill',
    });
    roster.players.forEach((player, index) => {
        let { type, value } = getAdvancement(player);
        csv += newCsvLine({
            cell1: (index + 1).toString(),
            cell2: player.player.position,
            cell4: player.player.cost * 1000,
            cell5: type,
            cell6: value,
        });
    });
    if (roster.players?.length < 16) {
        for (let i = roster.players.length; i < 16; i++) {
            csv += newCsvLine({
                cell1: (i + 1).toString(),
            });
        }
    }
    csv += newCsvLine({});
    let rerolls = extras.find((x) => x.extraString === 'rerolls');
    csv += newCsvLine({
        cell1: roster.extra['rerolls'] ?? 0,
        cell2: 'Team Re-Rolls',
        cell3: rerolls?.cost * 1000,
        cell4: (roster.extra['rerolls'] ?? 0) * (rerolls?.cost ?? 0) * 1000,
    });

    let assistantCoaches = extras.find(
        (x) => x.extraString === 'assistant_coaches'
    );
    csv += newCsvLine({
        cell1: roster.extra['assistant_coaches'] ?? 0,
        cell2: 'Assistant Coaches',
        cell3: assistantCoaches?.cost * 1000,
        cell4:
            (roster.extra['assistant_coaches'] ?? 0) *
            (assistantCoaches?.cost ?? 0) *
            1000,
    });

    let cheerleaders = extras.find((x) => x.extraString === 'cheerleaders');
    csv += newCsvLine({
        cell2: 'Cheerleaders',
        cell1: roster.extra['cheerleaders'] ?? 0,
        cell3: cheerleaders?.cost * 1000,
        cell4:
            (roster.extra['cheerleaders'] ?? 0) *
            (cheerleaders?.cost ?? 0) *
            1000,
    });

    let dedicatedFans = extras.find((x) => x.extraString === 'dedicated_fans');
    csv += newCsvLine({
        cell2: 'Dedicated Fans',
        cell1: roster.extra['dedicated_fans'] ?? 0,
        cell3: dedicatedFans?.cost * 1000,
        cell4:
            (roster.extra['dedicated_fans'] ?? 0) *
            (dedicatedFans?.cost ?? 0) *
            1000,
    });

    let apothecary = extras.find((x) => x.extraString === 'apothecary');
    csv += newCsvLine({
        cell2: 'Apothecary',
        cell1: roster.extra['apothecary'] ? 1 : 0,
        cell3: apothecary?.cost * 1000,
        cell4:
            (roster.extra['apothecary'] ? 1 : 0) *
            (apothecary?.cost ?? 0) *
            1000,
    });
    // go through inducements

    Object.keys(roster.inducements).forEach((key) => {
        let inducementD = inducementData.inducements.find((x) => x.id === key);
        csv += newCsvLine({
            cell1: '' + roster.inducements[key],
            cell2: $format('inducements.' + key),
            cell3: inducementD.cost * 1000,
            cell4: roster.inducements[key] * inducementD.cost * 1000,
        });
    });

    csv += newCsvLine({
        cell1: 'Tournament Team Value',
        cell4: teamTotal(roster) * 1000,
    });

    return csv;
}

function getAdvancement(player: RosterPlayerRecord) {
    let advancements = player?.alterations?.specificAdvancements;
    if (!advancements || advancements?.length === 0) {
        return { type: '', value: '' };
    }
    let firstAdvancement = advancements[0];
    return {
        type: firstAdvancement.type.includes('primary')
            ? 'Primary Skill'
            : 'Secondary Skill',
        value: $format(`skills.${firstAdvancement.advancementValue}`),
    };
}

function newCsvLine(options: {
    cell1?: string | number;
    cell2?: string | number;
    cell3?: string | number;
    cell4?: string | number;
    cell5?: string | number;
    cell6?: string | number;
    cell7?: string | number;
    cell8?: string | number;
    cell9?: string | number;
    cell10?: string | number;
}) {
    return `${options.cell1 ?? ''},${options.cell2 ?? ''},${
        options.cell3 ?? ''
    },${options.cell4 ?? ''},${options.cell5 ?? ''},${options.cell6 ?? ''},${
        options.cell7 ?? ''
    },${options.cell8 ?? ''},${options.cell9 ?? ''},${options.cell10 ?? ''}\n`;
}
