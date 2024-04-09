<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { redraftTableColumns } from '../../store/filteredTableColumns.store';
    import { roster } from '../../store/teamRoster.store';
    import RedraftPlayerRow from './redraftPlayerRow.svelte';
    import { onMount } from 'svelte';
    import { availableRedraftPlayers } from '../../store/redraftPlayers.store';

    onMount(() => {
        // TODO: remove this to when clicking redraft as roster will be cleared
        availableRedraftPlayers.reset($roster.players);
    });
</script>

<div class="table-container">
    <table class="roster-table">
        <thead>
            <tr>
                {#each $redraftTableColumns as c}
                    <th
                        class={c.headerDetails?.elementClass}
                        id={c.headerDetails?.elementId}
                        colspan={c.colspan || 1}
                        title={$_(c.title || 'roster.column.names.' + c.id)}
                        >{c.headerDetails?.hideName
                            ? ''
                            : c?.customName
                              ? c.customName
                              : $_('roster.column.names.' + c.id)}
                        <!-- {#if c.orderByPropertyPath}
                        <MaterialButton
                            hoverText="Sort"
                            symbol="sort"
                            clickFunction={() => orderOn(c)}
                        />
                    {/if} -->
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each $availableRedraftPlayers as rosterPlayer}
                <RedraftPlayerRow {rosterPlayer} />
            {/each}
        </tbody>
    </table>
</div>

<style>
    .table-container {
        max-width: 100%;
        overflow-x: auto;
    }
</style>
