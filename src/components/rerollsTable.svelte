<script lang="ts">
    import { roster } from "../store/teamRoster.store";
    export let selectedTeam;
    $: rerolls = $roster.rerolls;
    $: teamTotal =
        $roster.players.map((x) => x.player.cost).reduce((a, b) => a + b, 0) +
        $roster.rerolls * (selectedTeam?.reroll?.cost || 0);

    const addReroll = () => {
        roster.addReroll();
    };
    const removeReroll = () => {
        roster.removeReroll();
    };
</script>

<style lang="scss">
    .reroll {
        // width: 50%;
        margin-block-start: 1em;
        margin-block-end: 1em;
        th {
            background-color: #970f0c;
            color: white;
            text-align: left;
            text-transform: uppercase;
            font-weight: normal;
            padding: 10px;
        }
    }
</style>

<table class="reroll">
    <tr>
        <th>Rerolls</th>
        <td>{rerolls} / {selectedTeam.reroll.max}</td>
        <td>{selectedTeam.reroll.cost},000</td>
        <td>
            {#if rerolls < selectedTeam.reroll.max}
                <button on:click={addReroll}>+</button>
            {/if}
            {#if rerolls > 0}<button on:click={removeReroll}>-</button>{/if}
        </td>
    </tr>
    <table>
        <tr>
            <th>Total TV</th>
            <td>{teamTotal},000</td>
        </tr>
    </table>
</table>
