<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import RosterRow from './rosterPlayer.svelte';
    import type { Player } from '../models/player.model';
    import RosterSave from './rosterSave.svelte';
    import MaterialButton from './materialButton.svelte';
    import Export from './export.svelte';

    export let playerTypes: Player[];
    let selected: Player;
    let newName: string = '';

    const addPlayer = () => {
        roster.addPlayer({
            playerName: newName,
            player: { ...selected },
            alterations: { spp: 0, ni: 0 },
        });
        newName = '';
    };
</script>

<div class="team-name-container">
    <h2 class="heading">
        <input
            aria-label="team name"
            placeholder="Team Name"
            id="team-name"
            bind:value={$roster.teamName}
        />
    </h2>
</div>
<div class="sub-heading-box">
    <p class="sub-heading">{$roster.teamType} Team</p>
    <RosterSave />
</div>
<Export />
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
                <td id="spp-header">Unspent Spp</td>
                {#if $roster.mode !== 'exhibition'}
                    <td id="mng-header" title="Miss next game">Mng</td>
                    <td>Ni</td>
                    <td id="tr-header" title="Temporarily Retiring">TR</td>
                {/if}
                <td>Current Value</td>
            </tr>
        </thead>
        <tbody>
            {#each $roster.players as _, index}
                <RosterRow {index} />
            {/each}
            {#if $roster.players.length < 16}
                <tr class="add-player-row">
                    <td />
                    <td class="left-align">
                        <input
                            aria-labelledby="name-header"
                            placeholder="Player Name"
                            bind:value={newName}
                            class="name-input"
                        />
                    </td>
                    <td class="left-align">
                        <MaterialButton
                            hoverText="Add new player"
                            symbol="add_circle"
                            clickFunction={addPlayer}
                        />
                    </td>
                    <td class="position left-align">
                        <select
                            aria-labelledby="position-header"
                            bind:value={selected}
                        >
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
                    {#if $roster.mode !== 'exhibition'}
                        <td />
                        <td />
                        <td />
                    {/if}
                    <td />
                </tr>
            {/if}
        </tbody>
    </table>
</div>

<style lang="scss">
    .sub-heading-box {
        display: flex;
        align-items: flex-end;
    }
    .table-container {
        max-width: 100%;
        overflow-x: auto;
    }
    input {
        border: 0;
        border-radius: 0;
        background: none;
    }
    .heading {
        font-size: large;
        margin-block-end: 0;

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
    @media print {
        h2 {
            font-size: 14px;
        }
        .team-name-container {
            page-break-before: always;
        }
        .table-container {
            overflow: inherit;
        }
        .add-player-row {
            display: none;
        }
    }
</style>
