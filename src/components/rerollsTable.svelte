<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import ExtraRosterAdditionsRow from './extraRosterAdditionsRow.svelte';
    import type { Team } from '../models/team.model';
    import { calculateInducementTotal } from '../helpers/totalInducementAmount';
    import Inducements from './inducements.svelte';
    import { rosterMode } from '../store/rosterMode.store';
    import { extrasForTeam } from '../helpers/extrasForTeam';

    export let selectedTeam: Team;

    const extras = extrasForTeam(selectedTeam.id, $rosterMode);

    $: teamTotal =
        $roster.players.map((x) => x.player.cost).reduce((a, b) => a + b, 0) +
        extras
            .filter((e) => e.extraString !== 'dedicated_fans')
            .map((e) => $roster.extra[e.extraString] * e.cost || 0)
            .reduce((a, b) => a + b, 0) +
        calculateInducementTotal($roster.inducements, $roster.teamId);
</script>

<div class="tables">
    <table class="table">
        {#each extras as extra}
            <ExtraRosterAdditionsRow {extra} />
        {/each}
    </table>
    <table class="table">
        <!-- <tr>
            <th>Treasury</th>
            <td>
                {$roster.treasury
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')},000
            </td>
        </tr> -->
        <tr>
            <th>Team Value</th>
            <td>
                {teamTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')},000
            </td>
        </tr>
        <tr>
            <th>Current TV</th>
            <td>
                {teamTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')},000
            </td>
        </tr>

        <tr>
            <th>Treasury</th>
            <td>
                {$roster.treasury
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')},000
            </td>
        </tr>
    </table>
    <Inducements {selectedTeam} />
</div>

<style lang="scss">
    .table {
        margin-block-end: 1em;
        margin-right: 1em;
        th {
            background-color: #970f0c;
            color: white;
            text-align: left;
            text-transform: uppercase;
            font-weight: normal;
            padding: 10px;
        }
    }
    .tables {
        width: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        margin-top: 1em;
    }
</style>
