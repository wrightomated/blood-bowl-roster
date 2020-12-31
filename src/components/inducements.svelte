<script lang="ts">
    import { inducementData } from '../data/inducements.data';
    import type { InducementCostReduction } from '../models/inducement.model';
    import type { Team } from '../models/team.model';
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './materialButton.svelte';
    import StarPlayerInducement from './starPlayerInducement.svelte';
    export let selectedTeam: Team;

    // inducementData
    const filteredInducements = inducementData.inducements
        .filter((x) =>
            x?.requiresApothecary
                ? x.requiresApothecary === selectedTeam.apothecary
                : true,
        )
        .filter((x) =>
            x?.requiresSpecialRule
                ? selectedTeam.specialRules.includes(x.requiresSpecialRule)
                : true,
        )
        .map((x) => ({
            ...x,
            cost:
                x?.reducedCost?.specialRule &&
                selectedTeam.specialRules.includes(x.reducedCost.specialRule)
                    ? x.reducedCost.cost
                    : x.cost,
        }));

    const addInducement = (key: string) => {
        roster.addInducement(key);
    };
</script>

<style lang="scss">
    .display-name {
        text-align: left;
    }
</style>

<table>
    <thead>
        <tr>
            <td>Inducement</td>
            <td>QTY</td>
            <td>Cost</td>
        </tr>
    </thead>
    <tbody>
        {#each filteredInducements as ind}
            {#if ind.displayName === 'Star Player'}
                <StarPlayerInducement />
            {:else}
                <tr>
                    <td class="display-name">{ind.displayName}</td>
                    <td>{$roster.inducements?.[ind.id] || 0} / {ind.max}</td>
                    <td>
                        {ind.cost}{#if typeof ind.cost === 'number'},000{/if}
                    </td>
                    <td>
                        <MaterialButton
                            symbol="add_circle"
                            clickFunction={() => addInducement(ind.id)} />
                    </td>
                </tr>
            {/if}

            <!-- <div>{ind.displayName} | {ind.cost}</div> -->
        {/each}
    </tbody>
</table>
