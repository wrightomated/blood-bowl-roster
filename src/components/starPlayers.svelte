<script lang="ts">
    import { starPlayers } from '../data/starPlayer.data';
    import { teamCreationSpecialRules } from '../store/rosterSpecialRules.store';
    import StarPlayerRow from './starPlayerRow.svelte';
    import { filterStarPlayers } from '../helpers/starPlayerFilter';

    $: filteredStarPlayers = filterStarPlayers(
        starPlayers,
        $teamCreationSpecialRules
    );
</script>

<div class="table-container">
    <table>
        <thead>
            <tr>
                <th class="left-align">Name</th>
                <th>Cost</th>
                <th>MA</th>
                <th>ST</th>
                <th>AG</th>
                <th>PA</th>
                <th>AV</th>
                <th class="skills-header left-align">Skills</th>
                <th>Special Rules</th>
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
    .left-align {
        text-align: left;
    }
    .table-container {
        max-width: 100%;
        overflow-x: auto;
    }
</style>
