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
    import { _ } from 'svelte-i18n';
    import type { Inducement } from '../models/inducement.model';

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
            cost: inducementReducedCost(inducement),
        }))
        .filter((inducement) =>
            filterInducement(inducement, {
                ...(selectedTeam as Team),
                specialRules: $rosterSpecialRules,
            })
        )
        .filter((i) =>
            searchTerm
                ? $_('inducements.' + i.id)
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                : i
        )
        .sort((a, b) =>
            $_('inducements.' + a.id).localeCompare($_('inducements.' + b.id))
        );
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
            <th on:click={toggleShowAllInducements}>Inducement</th>
            <th class="inducement__qty" on:click={toggleShowAllInducements}>
                {$_('tables.qty')}
            </th>
            <th on:click={toggleShowAllInducements}>{$_('tables.cost')}</th>
            <th class="inducement__toggle"
                ><MaterialButton
                    hoverText={$showAllInducements
                        ? $_('tables.hide')
                        : $_('tables.show')}
                    symbol={$showAllInducements
                        ? 'arrow_drop_up'
                        : 'arrow_drop_down'}
                    clickFunction={toggleShowAllInducements}
                    cyData="toggle-inducements"
                /></th
            >
        </tr>
    </thead>
    <tbody>
        {#if $roster.mode === 'league' && Object.values($roster.inducements).reduce((p, c) => p + c, 0) > 0}
            <tr class="no-print">
                <td colspan="3">{$_('tables.removeAll')}</td>
                <td>
                    <MaterialButton
                        hoverText={$_('common.remove')}
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
                            aria-label={$_('common.search')}
                            placeholder={$_('common.search')}
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
                    <td class="inducement__display-name"
                        >{$_('inducements.' + ind.id)}</td
                    >
                    <td>{$roster.inducements?.[ind.id] || 0} / {ind.max}</td>
                    <td>
                        {formatNumberInThousands(ind.cost)}
                    </td>
                    <td class="inducement__control">
                        <div class="flex-container">
                            {#if $roster.inducements?.[ind.id] > 0}
                                <MaterialButton
                                    hoverText={$_('common.remove')}
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
                                    hoverText={$_('common.add')}
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
                            ? $_('tables.hide')
                            : $_('tables.show')}
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
    // table {
    //     min-width: 470px;
    // }
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
