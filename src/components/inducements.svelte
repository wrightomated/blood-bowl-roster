<script lang="ts">
    import { inducementData } from '../data/inducements.data';
    import type { Team } from '../models/team.model';
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { filterInducement } from '../helpers/inducementFilter';
    import { showAllInducements } from '../store/showAllInducements.store';
    import { rosterSpecialRules } from '../store/rosterSpecialRules.store';
    import { formatNumberInThousands } from '../helpers/formatTotalToThousands';
    import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
    import { gameSettings } from '../store/gameSettings.store';

    export let selectedTeam: Team | CustomTeam;

    $: searchTerm = '';

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
            cost: $rosterSpecialRules.includes(
                inducement?.reducedCost?.specialRule
            )
                ? inducement.reducedCost.cost
                : inducement.cost,
        }))
        .filter((inducement) =>
            filterInducement(inducement, {
                ...(selectedTeam as Team),
                specialRules: $rosterSpecialRules,
            })
        )
        .filter((i) =>
            searchTerm
                ? i.displayName.toLowerCase().includes(searchTerm.toLowerCase())
                : i
        )
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
    $: totalInducements = Object.values($roster.inducements).reduce(
        (p, c) => p + c,
        0
    );

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

<table class="inducement-table" class:no-print={totalInducements === 0}>
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
                    cyData="toggle-inducements"
                /></td
            >
        </tr>
    </thead>
    <tbody>
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
        {#if $showAllInducements && $roster.format !== 'dungeon bowl'}
            <tr class="no-print"
                ><td colspan="4">
                    <div class="inducement__search">
                        <input
                            aria-label="Search inducements"
                            placeholder="Search inducements"
                            type="text"
                            bind:value={searchTerm}
                        />
                        <span class="inducement__clear-search">
                            <MaterialButton
                                hoverText="Clear"
                                symbol="clear"
                                clickFunction={() => {
                                    searchTerm = '';
                                }}
                            />
                        </span>
                    </div>
                </td>
            </tr>
        {/if}
        {#each newFilteredInducements as ind}
            {#if $roster.inducements?.[ind.id] > 0 || $showAllInducements}
                <tr>
                    <td class="inducement__display-name">{ind.displayName}</td>
                    <td>{$roster.inducements?.[ind.id] || 0} / {ind.max}</td>
                    <td>
                        {formatNumberInThousands(ind.cost)}
                    </td>
                    <td class="inducement__control">
                        <div class="flex-container">
                            {#if $roster.inducements?.[ind.id] > 0}
                                <MaterialButton
                                    hoverText="Remove inducement"
                                    symbol="remove_circle"
                                    clickFunction={() =>
                                        removeInducement(ind.id)}
                                />
                            {:else}
                                <i
                                    class="material-symbols-outlined no-op no-transition no-print"
                                    >block</i
                                >
                            {/if}
                            {#if ($roster.inducements?.[ind.id] || 0) < ind.max}
                                <MaterialButton
                                    hoverText="Add inducement"
                                    symbol="add_circle"
                                    clickFunction={() => addInducement(ind.id)}
                                />
                            {:else}
                                <i
                                    class="material-symbols-outlined no-op no-transition no-print"
                                    >block</i
                                >
                            {/if}
                        </div>
                    </td>
                </tr>
            {/if}
        {/each}
        {#if $showAllInducements}
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
        {/if}
    </tbody>
</table>

<style lang="scss">
    table {
        min-width: 470px;
    }
    .inducement {
        &__display-name {
            text-align: left;
        }

        &__search {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        &__clear-search {
            height: 24px;
        }

        &__qty {
            min-width: 44px;
        }
    }
    .flex-container {
        display: flex;
    }

    @media screen and (max-width: 783px) {
        table {
            width: 100%;
        }
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
