<script lang="ts">
    import { inducementData } from '../data/inducements.data';
    import type { Team } from '../models/team.model';
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './materialButton.svelte';
    import StarPlayerInducement from './starPlayerInducement.svelte';
    export let selectedTeam: Team;

    let showAllInducements = false;
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
            cost: selectedTeam.specialRules.includes(
                x?.reducedCost?.specialRule,
            )
                ? x.reducedCost.cost
                : x.cost,
        }));

    const addInducement = (key: string) => {
        roster.addInducement(key);
    };

    const removeInducement = (key: string) => {
        roster.removeInducement(key);
    };

    const toggleShowAllInducements = () => {
        showAllInducements = !showAllInducements;
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
            {#if ind.displayName === 'Star Player' && showAllInducements}
                <StarPlayerInducement />
            {:else if $roster.inducements?.[ind.id] > 0 || showAllInducements}
                <tr>
                    <td class="display-name">{ind.displayName}</td>
                    <td>{$roster.inducements?.[ind.id] || 0} / {ind.max}</td>
                    <td>
                        {ind.cost}{#if typeof ind.cost === 'number'},000{/if}
                    </td>
                    <td>
                        {#if $roster.inducements?.[ind.id] || 0 < ind.max}
                            <MaterialButton
                                symbol="add_circle"
                                clickFunction={() => addInducement(ind.id)} />
                        {/if}
                        {#if $roster.inducements?.[ind.id] > 0}
                            <MaterialButton
                                symbol="remove_circle"
                                clickFunction={() => removeInducement(ind.id)} />
                        {/if}
                    </td>
                </tr>
            {/if}
        {/each}
        {#if !showAllInducements}
            <tr>
                <td class="display-name">Expand Inducements</td>
                <td />
                <td />
                <td>
                    <MaterialButton
                        symbol={showAllInducements ? 'arrow_drop_up_circle' : 'arrow_drop_down_circle'}
                        clickFunction={toggleShowAllInducements} />
                </td>
            </tr>
        {/if}
    </tbody>
</table>