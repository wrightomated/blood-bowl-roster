<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import ExtraRosterAdditionsRow from './extraRosterAdditionsRow.svelte';
    import type { Team } from '../models/team.model';
    import Inducements from './inducements.svelte';
    import { extrasForTeam } from '../helpers/extrasForTeam';
    import MaterialButton from './uiComponents/materialButton.svelte';

    export let selectedTeam: Team;

    const extras = extrasForTeam(selectedTeam.id, $roster.mode, $roster.format);
    let showTreasury = false;

    $: teamTotal = $roster.players
        .filter((p) => !p?.starPlayer)
        .map((x) => x.player.cost + (x?.alterations?.valueChange || 0))
        .reduce((a, b) => a + b, 0);

    $: teamExtrasTotal = extrasForTeam(
        selectedTeam.id,
        $roster.mode,
        $roster.format,
    )
        .filter((e) => e.extraString !== 'dedicated_fans')
        .map((e) => $roster.extra[e.extraString] * e.cost || 0)
        .reduce((a, b) => a + b, 0);

    $: currentTotal = $roster.players
        .filter((p) => !p?.starPlayer)
        .filter((p) => !p?.alterations.tr && !p?.alterations.mng)
        .map(
            (x) =>
                ((x.player.id === 56 || x.player.id === 73) &&
                $roster.mode !== 'exhibition'
                    ? 0
                    : x.player.cost) + (x?.alterations?.valueChange || 0),
        )
        .reduce((a, b) => a + b, 0);

    const noEmptyTreasury = () => {
        if (!$roster.treasury && $roster.treasury !== 0) {
            roster.set({ ...$roster, treasury: 0 });
        }
    };
</script>

<div class="tables">
    <table class="table">
        {#each extras as extra}
            <ExtraRosterAdditionsRow {extra} />
        {/each}
    </table>
    <table class="table">
        <tr>
            <th>Team Value</th>
            <td colspan="2">
                {(teamTotal + teamExtrasTotal)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')},000
            </td>
        </tr>
        <tr>
            <th>Current TV</th>
            <td colspan="2">
                {(currentTotal + teamExtrasTotal)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')},000
            </td>
        </tr>

        <tr>
            <th>Treasury</th>
            <td>
                {($roster?.treasury || 0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')},000
            </td>
            <td>
                <MaterialButton
                    hoverText="Toggle treasury"
                    symbol={showTreasury ? 'arrow_drop_up' : 'arrow_drop_down'}
                    clickFunction={() => {
                        showTreasury = !showTreasury;
                    }}
                /></td
            >
        </tr>
        {#if showTreasury}
            <tr>
                <td colspan="3">
                    <input
                        aria-label="treasury"
                        bind:value={$roster.treasury}
                        type="number"
                        class="treasury"
                        on:blur={() => noEmptyTreasury()}
                    />,000</td
                >
            </tr>
        {/if}
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
    .treasury {
        width: 80px;
    }
</style>
