<script lang="ts">
    import type { Player } from "../models/player.model";
    import { roster } from "../store/teamRoster";
    export let index: number;
    export let player: Player;

    const removePlayer = () => {
        roster.removePlayer(index);
    };
    const moveUp = () => {
        roster.movePlayerUp(index);
    };
    const moveDown = () => {
        roster.movePlayerDown(index);
    };
</script>

<style>
    th,
    td {
        padding: 0.25rem;
        text-align: left;
        border: 1px solid #ccc;
    }
</style>

<tr>
    <th>{index + 1}</th>
    <td>
        <input bind:value={$roster.players[index].playerName} />
        <button on:click={removePlayer}>-</button>
        {#if index > 0}<button on:click={moveUp}>^</button>{/if}
        {#if index < $roster.players.length - 1}
            <button on:click={moveDown}>d</button>
        {/if}
    </td>
    <th>{player.position}</th>
    <!-- <td on:click={addPlayer}>0/{max}</td> -->
    <!-- <td>{player.cost},000</td> -->
    {#each player.playerStats as stat, i}
        <td>{`${stat}${i > 1 ? '+' : ''}`}</td>
    {/each}
    <td>None</td>
    <td>{player.cost}</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>{player.cost}</td>
</tr>
