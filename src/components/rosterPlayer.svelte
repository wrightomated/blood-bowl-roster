<script lang="ts">
    import type { Player } from "../models/player.model";
    import { roster } from "../store/teamRoster.store";
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
    .left-align {
        text-align: left;
    }
</style>

<tr>
    <td>{index + 1}</td>
    <td class="left-align">
        <input bind:value={$roster.players[index].playerName} />
        <button on:click={removePlayer}>-</button>
        {#if index > 0}<button on:click={moveUp}>^</button>{/if}
        {#if index < $roster.players.length - 1}
            <button on:click={moveDown}>d</button>
        {/if}
    </td>
    <td class="left-align">{player.position}</td>
    <!-- <td on:click={addPlayer}>0/{max}</td> -->
    <!-- <td>{player.cost},000</td> -->
    {#each player.playerStats as stat, i}
        <td>{`${stat}${i > 1 ? '+' : ''}`}</td>
    {/each}
    <td class="left-align">None</td>
    <td>{player.cost}</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>{player.cost}</td>
</tr>
