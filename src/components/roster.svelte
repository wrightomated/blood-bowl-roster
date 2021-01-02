<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import RosterRow from './rosterPlayer.svelte';
    import type { Player } from '../models/player.model';
    import RosterSave from './rosterSave.svelte';
    import MaterialButton from './materialButton.svelte';

    export let playerTypes: Player[];
    let selected: Player;
    let newName: string;

    const addPlayer = () => {
        roster.addPlayer({ playerName: newName, player: selected });
        newName = '';
    };
</script>

<style lang="scss">
    .heading-box {
        margin-top: 50px;
    }
    .sub-heading-box {
        display: flex;
        align-items: flex-end;
    }
    .table-container {
        width: 100%;
        overflow-x: auto;
    }
    .heading {
        font-size: large;
        margin-block-end: 0;
        // margin-top: 50px;

        input {
            display: block;
            font-family: 'Roboto Slab', serif;
            font-weight: 600;
            font-size: 32px;
            -webkit-padding: 0;
            padding: 0;
            box-sizing: inherit;
            border: none;
            color: #970f0c;
            margin: 0;
            text-align: left;

            @media screen and (max-width: 450px) {
                font-size: 24px;
            }
        }
    }
    .sub-heading {
        margin-block-end: 4px;
        font-family: 'Roboto Slab', serif;
        margin-right: 12px;
    }
    .left-align {
        text-align: left;
    }
    .skills {
        min-width: 200px;
    }
    #team-name {
        max-width: 100%;
    }
</style>

<div class="heading-box">
    <h3 class="heading">
        <!-- <label for="team-name">Team name:</label> -->
        <input
            aria-label="team name"
            placeholder="Team Name"
            id="team-name"
            bind:value={$roster.teamName} />
    </h3>
</div>
<div class="sub-heading-box">
    <p class="sub-heading">{$roster.teamType} Team</p>
    <RosterSave />
</div>

<div class="table-container">
    <table>
        <thead>
            <tr>
                <td />
                <td class="left-align" colspan="2" id="name-header">Name</td>
                <td class="left-align" id="position-header">Position</td>
                <td>MA</td>
                <td>ST</td>
                <td>AG</td>
                <td>PA</td>
                <td>AV</td>
                <td class="skills">Skills</td>
                <td>Hiring Fee</td>
                <td>Spp</td>
                <td>Mng</td>
                <td>Ni</td>
                <td>TR</td>
                <td>Current Value</td>
            </tr>
        </thead>
        <tbody>
            {#each $roster.players as rosterPlayer, index}
                <RosterRow {index} {rosterPlayer} />
            {/each}
            <tr>
                {#if $roster.players.length < 16}
                    <td />
                    <td class="left-align">
                        <input
                            aria-labelledby="name-header"
                            placeholder="Player Name"
                            bind:value={newName}
                            class="name-input" />
                    </td>
                    <td class="left-align">
                        <MaterialButton
                            symbol="add_circle"
                            clickFunction={addPlayer} />
                    </td>
                    <td class="position left-align">
                        <select
                            aria-labelledby="position-header"
                            bind:value={selected}>
                            {#each playerTypes as playerType}
                                <option value={playerType}>
                                    {playerType.position}
                                </option>
                            {/each}
                        </select>
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
