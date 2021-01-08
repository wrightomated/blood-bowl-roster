<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import ExtraRosterAdditionsRow from './extraRosterAdditionsRow.svelte';
    import type { Team } from '../models/team.model';
    import type { Extra } from '../models/extra.model';
    import { calculateInducementTotal } from '../helpers/totalInducementAmount';
    import Inducements from './inducements.svelte';

    export let selectedTeam: Team;

    const extras: Extra[] = [
        {
            extraString: 'rerolls',
            cost: selectedTeam.reroll.cost,
            max: selectedTeam.reroll.max,
        },
        { extraString: 'assistant_coaches', cost: 10, max: 12 },
        { extraString: 'cheerleaders', cost: 10, max: 10 },
        { extraString: 'dedicated_fans', cost: 10, max: 6, min: 1 },
    ].concat(
        selectedTeam.apothecary
            ? [{ extraString: 'apothecary', cost: 50, max: 1 }]
            : [],
    );

    $: teamTotal =
        $roster.players.map((x) => x.player.cost).reduce((a, b) => a + b, 0) +
        extras
            .map((e) => $roster.extra[e.extraString] * e.cost || 0)
            .reduce((a, b) => a + b, 0) +
        calculateInducementTotal($roster.inducements) -
        10;
</script>

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

<div class="tables">
    <table class="table">
        {#each extras as extra}
            <ExtraRosterAdditionsRow {extra} />
        {/each}
    </table>
    <table class="table">
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
    </table>
    <Inducements {selectedTeam} />
</div>
