<script lang="ts">
    import { inducementData } from '../data/inducements.data';
    import type { Team } from '../models/team.model';
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import StarPlayerInducement from './starPlayerInducement.svelte';
    import type { Inducement } from '../models/inducement.model';
    import { filterInducement } from '../helpers/inducementFilter';
    import { showAllInducements } from '../store/showAllInducements.store';
    export let selectedTeam: Team;

    const filteredInducements = inducementData.inducements
        .filter(
            (inducement) =>
                ($roster.format === 'elevens' && inducement.max > 0) ||
                ($roster.format === 'sevens' && inducement.sevensMax !== 0)
        )
        .filter((inducement) => filterInducement(inducement, selectedTeam))
        .map((inducement: Inducement) => ({
            ...inducement,
            cost: selectedTeam.specialRules.includes(
                inducement?.reducedCost?.specialRule
            )
                ? inducement.reducedCost.cost
                : $roster.format === 'sevens' && inducement.sevensCost
                ? inducement.sevensCost
                : inducement.cost,
            max:
                $roster.format === 'elevens' || !inducement.sevensMax
                    ? inducement.max
                    : inducement.sevensMax,
        }));

    const addInducement = (key: string) => {
        roster.addInducement(key);
    };

    const removeInducement = (key: string) => {
        roster.removeInducement(key);
    };

    const toggleShowAllInducements = () => {
        showAllInducements.set(!$showAllInducements);
    };
    const removeAllInducements = () => {
        roster.removeAllInducements();
    };
</script>

<table class:no-print={$roster.inducements?.length < 1}>
    <thead>
        <tr>
            <td on:click={toggleShowAllInducements}>Inducement</td>
            <td class="inducement__qty" on:click={toggleShowAllInducements}>
                QTY
            </td>
            <td on:click={toggleShowAllInducements}>Cost</td>
            <td class="inducement__toggle"
                ><MaterialButton
                    hoverText={$showAllInducements
                        ? 'Hide inducements'
                        : 'Show inducements'}
                    symbol={$showAllInducements
                        ? 'arrow_drop_up'
                        : 'arrow_drop_down'}
                    clickFunction={toggleShowAllInducements}
                /></td
            >
        </tr>
    </thead>
    <tbody>
        {#if $roster.format !== 'sevens'}
            <StarPlayerInducement />
        {/if}
        {#if $roster.mode === 'league' && Object.values($roster.inducements).reduce((p, c) => p + c, 0) > 0}
            <tr class="no-print">
                <td colspan="3">Remove all inducements below (no refund)</td>
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
            {#if (ind.displayName !== 'Star Player' && $roster.inducements?.[ind.id] > 0) || $showAllInducements}
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

        <tr class="no-print"
            ><td colspan="4">
                <MaterialButton
                    hoverText={$showAllInducements
                        ? 'Hide inducements'
                        : 'Show inducements'}
                    symbol={$showAllInducements
                        ? 'arrow_drop_up'
                        : 'arrow_drop_down'}
                    clickFunction={toggleShowAllInducements}
                /></td
            ></tr
        >
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
        .no-print {
            display: none;
        }
        .inducement {
            &__control,
            &__toggle {
                display: none;
            }
        }
    }
</style>
