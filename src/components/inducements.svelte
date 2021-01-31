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
    const removeAllInducements = () => {
        roster.removeAllInducements();
    };
</script>

<table>
    <thead>
        <tr>
            <td on:click={toggleShowAllInducements}>Inducement</td>
            <td class="inducement__qty" on:click={toggleShowAllInducements}>
                QTY
            </td>
            <td on:click={toggleShowAllInducements}>Cost</td>
            <td class="inducement__toggle">
                <MaterialButton
                    hoverText="Toggle Inducements"
                    symbol={showAllInducements
                        ? 'arrow_drop_up'
                        : 'arrow_drop_down'}
                    clickFunction={toggleShowAllInducements}
                />
            </td>
        </tr>
    </thead>
    <tbody>
        {#if $roster.mode === 'league' && Object.keys($roster.inducements).length > 0}
            <tr>
                <td colspan="3">Remove all (no refund)</td>
                <td>
                    <MaterialButton
                        hoverText="Remove all inducements"
                        symbol="delete_forever"
                        clickFunction={() => removeAllInducements()}
                    /></td
                >
            </tr>
        {/if}
        {#each filteredInducements as ind}
            {#if ind.displayName === 'Star Player' && showAllInducements}
                <StarPlayerInducement />
            {:else if $roster.inducements?.[ind.id] > 0 || showAllInducements}
                <tr>
                    <td class="inducement__display-name">{ind.displayName}</td>
                    <td>{$roster.inducements?.[ind.id] || 0} / {ind.max}</td>
                    <td>
                        {ind.cost}{#if typeof ind.cost === 'number'},000{/if}
                    </td>
                    <td class="inducement__control">
                        <div class="flex-container">
                            {#if ($roster.inducements?.[ind.id] || 0) < ind.max}
                                <MaterialButton
                                    hoverText="Add inducement"
                                    symbol="add_circle"
                                    clickFunction={() => addInducement(ind.id)}
                                />
                            {/if}
                            {#if $roster.inducements?.[ind.id] > 0}
                                <MaterialButton
                                    hoverText="Remove inducement"
                                    symbol="remove_circle"
                                    clickFunction={() =>
                                        removeInducement(ind.id)}
                                />
                            {/if}
                        </div>
                    </td>
                </tr>
            {/if}
        {/each}
    </tbody>
</table>

<style lang="scss">
    .inducement {
        &__display-name {
            text-align: left;
        }
        &__toggle {
            background: white;
            color: black;
            border: 0;
        }
        &__qty {
            min-width: 44px;
        }
    }
    .flex-container {
        display: flex;
    }
    @media print {
        .inducement {
            &__control,
            &__toggle {
                display: none;
            }
        }
    }
</style>
