<script lang="ts">
    import { roster } from "../store/teamRoster.store";
    import RosterRow from "./rosterPlayer.svelte";
    import type { Player } from "../models/player.model";

    export let playerTypes: Player[];
    let selected: Player;
    let newName: string;

    const addPlayer = () => {
        roster.addPlayer({ playerName: newName, player: selected });
        newName = "";
    };
</script>

<style lang="scss">
    .table-container {
        width: 100%;
        overflow-x: auto;
    }
    .heading {
        font-size: large;
        width: 100%;

        input {
            display: block;
            font-family: "Roboto Slab", serif;
            font-weight: 600;
            font-size: 32px;
            -webkit-padding: 0;
            padding: 0;
            margin: 0 0 0.5em 0;
            box-sizing: inherit;
            border: none;
            color: #970f0c;
            margin: 0 auto;
            text-align: center;
        }
    }
    // .sub-heading {
    //     text-align: center;
    // }
    .left-align {
        text-align: left;
    }
</style>

<h3 class="heading">
    <span><input placeholder="Team Name" bind:value={$roster.teamName} /></span>
</h3>
<!-- <p class="sub-heading">{$roster.teamType}</p> -->
<div class="table-container">
    <table>
        <thead>
            <tr>
                <td />
                <td class="left-align" colspan="2">Name</td>
                <td class="left-align">Position</td>
                <td>MA</td>
                <td>ST</td>
                <td>AG</td>
                <td>PA</td>
                <td>AV</td>
                <td>Skills</td>
                <td>Hiring Fee</td>
                <td>Unspent Spp</td>
                <td>Mng</td>
                <td>Ni</td>
                <td>TR</td>
                <td>Current Value</td>
            </tr>
        </thead>
        <tbody>
            {#each $roster.players as rosterPlayer, index}
                <RosterRow {index} player={rosterPlayer.player} />
            {/each}
            <tr>
                {#if $roster.players.length < 16}
                    <td />
                    <td class="left-align">
                        <input
                            placeholder="Player Name"
                            bind:value={newName}
                            class="name-input" />
                    </td>
                    <td />
                    <td class="left-align">
                        <select bind:value={selected}>
                            {#each playerTypes as playerType}
                                <option value={playerType}>
                                    {playerType.position}
                                </option>
                            {/each}
                        </select>
                        <button on:click={addPlayer}>+</button>
                    </td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                {/if}
            </tr>
        </tbody>
    </table>
</div>

<!-- <div>
    Total value:
    {$roster.players.map((x) => x.player.cost).reduce((a, b) => a + b, 0)}
</div> -->
