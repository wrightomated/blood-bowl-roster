<script lang="ts">
    import { starPlayers } from '../data/starPlayer.data';
    import { teamCreationSpecialRules } from '../store/rosterSpecialRules.store';
    import StarPlayerRow from './starPlayerRow.svelte';
    import { filterStarPlayers } from '../helpers/starPlayerFilter';
    import { _ } from 'svelte-i18n';
    import { customisationRules } from '../customisation/customisation.store';

    $: customStarPlayers =
        $customisationRules?.starPlayerSettings?.customStarPlayers;
    $: excludedStarPlayers =
        $customisationRules?.starPlayerSettings?.excludeStarPlayers || [];

    $: filteredStarPlayers = filterStarPlayers(
        starPlayers.starPlayers.concat(customStarPlayers || []),
        $teamCreationSpecialRules,
        excludedStarPlayers
    );
</script>

<div class="table-container">
    <table>
        <thead>
            <tr>
                <th class="left-align">{$_('roster.column.names.2')}</th>
                <th>{$_('tables.cost')}</th>
                <th>{$_('roster.column.names.5')}</th>
                <th>{$_('roster.column.names.6')}</th>
                <th>{$_('roster.column.names.7')}</th>
                <th>{$_('roster.column.names.8')}</th>
                <th>{$_('roster.column.names.9')}</th>
                <th class="skills-header left-align"
                    >{$_('roster.column.names.10')}</th
                >
                <th>{$_('common.specialRules')}</th>
            </tr>
        </thead>
        <tbody>
            {#each filteredStarPlayers as starPlayer}
                <StarPlayerRow {starPlayer} />
            {/each}
        </tbody>
    </table>
</div>

<style lang="scss">
    .skills-header {
        min-width: 200px;
    }
    .table-container {
        max-width: 100%;
        overflow-x: auto;
    }
</style>
