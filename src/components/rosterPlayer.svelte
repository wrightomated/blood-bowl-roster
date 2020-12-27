<script lang="ts">
    import { slide } from "svelte/transition";

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

<style lang="scss">
    td {
        input {
            margin-bottom: 0;
        }
    }
    .left-align {
        text-align: left;
    }
    .right-align {
        text-align: right;
    }
</style>

<tr>
    <td>{index + 1}</td>
    <td class="left-align">
        <input
            placeholder="Player Name"
            bind:value={$roster.players[index].playerName} />
    </td>
    <td class="right-align">
        {#if index > 0}<button on:click={moveUp}>^</button>{/if}
        {#if index < $roster.players.length - 1}
            <button on:click={moveDown}>d</button>
        {/if}
        <button on:click={removePlayer}>-</button>
    </td>
    <td class="left-align">{player.position}</td>

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
