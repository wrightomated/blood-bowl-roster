<script lang="ts">
    import type { CustomTeam } from '../../customisation/types/CustomiseTeamList.type';
    import { inducementData } from '../../data/inducements.data';
    import { filterInducement } from '../../helpers/inducementFilter';
    import type { Team } from '../../models/team.model';
    import { gameSettings } from '../../store/gameSettings.store';
    import { rosterSpecialRules } from '../../store/rosterSpecialRules.store';

    import { _ } from 'svelte-i18n';
    import { roster } from '../../store/teamRoster.store';
    import InducementBlock from './inducementBlock.svelte';
    import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';
    import type { Inducement } from '../../models/inducement.model';

    export let selectedTeam: Team | CustomTeam;

    $: newFilteredInducements = inducementData.inducements
        .map((inducement) => ({
            ...inducement,
            max: $gameSettings?.inducementMaxKey
                ? inducement[$gameSettings.inducementMaxKey] || 0
                : inducement.max,
            cost: $gameSettings?.inducementCostKey
                ? inducement[$gameSettings.inducementCostKey] || inducement.cost
                : inducement.cost,
        }))
        .filter((inducement) => inducement.max > 0)
        .map((inducement) => ({
            ...inducement,
            cost: inducementReducedCost(inducement),
        }))
        .filter((inducement) =>
            filterInducement(inducement, {
                ...(selectedTeam as Team),
                specialRules: $rosterSpecialRules,
            })
        )
        .sort((a, b) =>
            $_('inducements.' + a.id).localeCompare($_('inducements.' + b.id))
        );
    $: commonInducements = newFilteredInducements.filter(
        (ind) => ind?.inducementType === 'common'
    );
    $: commonAmount = commonInducements.filter(
        (ind) => $roster.inducements?.[ind.id] > 0
    ).length;
    $: biased = newFilteredInducements.filter(
        (ind) => ind?.inducementType === 'biasedReferee'
    );
    $: biasedAmount = biased.filter(
        (ind) => $roster.inducements?.[ind.id] > 0
    ).length;

    $: infamous = newFilteredInducements.filter(
        (ind) => ind?.inducementType === 'infamousCoach'
    );
    $: infamousAmount = infamous.filter(
        (ind) => $roster.inducements?.[ind.id] > 0
    ).length;

    $: wizzard = newFilteredInducements.filter(
        (ind) => ind?.inducementType === 'wizzard'
    );
    $: wizzardAmount = wizzard.filter(
        (ind) => $roster.inducements?.[ind.id] > 0
    ).length;

    $: other = newFilteredInducements.filter(
        (ind) => ind?.inducementType === 'other'
    );
    $: otherAmount = other.filter(
        (ind) => $roster.inducements?.[ind.id] > 0
    ).length;
    $: totalInducements = Object.values($roster.inducements).reduce(
        (p, c) => p + c,
        0
    );

    function inducementReducedCost(inducement: Inducement) {
        const reducedCost = inducement.reducedCost;

        if (
            $rosterSpecialRules.includes(reducedCost?.specialRule) ||
            reducedCost?.teamName === selectedTeam.name
        ) {
            return reducedCost.cost;
        }

        return inducement.cost;
    }
</script>

<section class="no-print">
    <InducementBlock
        inducements={commonInducements}
        heading={`Common Inducements (${commonAmount})`}
        toggleKey="common"
    />
    <InducementBlock
        inducements={biased}
        heading={`Biased Referee (${biasedAmount}/1)`}
        toggleKey="biasedReferee"
    />
    <InducementBlock
        inducements={infamous}
        heading={`(In)Famous Coaching Staff (${infamousAmount}/2)`}
        toggleKey="infamousCoach"
    />
    <InducementBlock
        inducements={wizzard}
        heading={`Wizzard (${wizzardAmount}/1)`}
        toggleKey="wizzard"
    />
    <InducementBlock
        inducements={other}
        heading={`Other (${otherAmount})`}
        toggleKey="other"
    />
</section>
<table class="print-only">
    {#each newFilteredInducements as inducement}
        {#if $roster.inducements?.[inducement.id] > 0}
            <tr>
                <th>{$_('inducements.' + inducement.id)}</th>
                <td
                    >{$roster.inducements?.[inducement.id]} / {inducement.max}</td
                >
                <td>{formatNumberInThousands(inducement.cost)}</td>
            </tr>
        {/if}
    {/each}
</table>

<style lang="scss">
    section {
        display: grid;
        grid-template-columns: max-content 1fr max-content max-content;
        gap: 8px;
        padding: 0;
        background-color: white;
        align-items: center;
        @media (max-width: 370px) {
            grid-template-columns: 1fr max-content max-content;
            row-gap: 0;
        }
        @media screen and (max-width: 783px) {
            width: 100%;
            margin-right: 0;
        }
    }
    th {
        background-color: var(--main-colour);
        color: white;
        text-align: left;
        text-transform: uppercase;
        font-weight: normal;
        padding: 10px;
    }
    table {
        border: none !important;
    }
</style>
