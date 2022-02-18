<script lang="ts">
    import { starPlayers } from '../data/starPlayer.data';
    import { currentTeam } from '../store/currentTeam.store';
    import StarPlayerRow from './starPlayerRow.svelte';
    import { filterStarPlayers } from '../helpers/starPlayerFilter';
    import type { Team } from '../models/team.model';

    $: filteredStarPlayers = filterStarPlayers(
        starPlayers,
        $currentTeam as Team
    );
</script>

<div class="table-container">
    <table>
        <thead>
            <tr>
                <td class="left-align">Name</td>
                <td>Cost</td>
                <td>MA</td>
                <td>ST</td>
                <td>AG</td>
                <td>PA</td>
                <td>AV</td>
                <td class="skills-header left-align">Skills</td>
                <td>Special Rules</td>
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
