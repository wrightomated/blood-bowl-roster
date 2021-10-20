<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import RosterRow from './rosterPlayer.svelte';
    import type { Player } from '../models/player.model';
    import RosterSave from './rosterSave.svelte';
    import Export from './export.svelte';
    import RosterPlayerCard from './rosterPlayerCard.svelte';
    import { rosterViewMode } from '../store/rosterDisplayMode.store';
    import RosterDelete from './rosterDelete.svelte';
    import AddPlayerCard from './playerCard/addPlayerCard.svelte';
    import AddPlayerToRoster from './addPlayerToRoster.svelte';
    import { getMaxPlayers } from '../data/gameType.data';
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';

    export let playerTypes: Player[];
    $: nextPlayerIndex =
        $roster.players.findIndex((p) => p.deleted) >= 0
            ? $roster.players.findIndex((p) => p.deleted)
            : $roster.players.length;
    $: activePlayersNumber = $roster.players.filter((p) => !p.deleted).length;
</script>

<div class="team-name-container">
    <h2 class="heading">
        <input
            aria-label="team name"
            placeholder="Team Name"
            id="team-name"
            data-cy="team-name"
            bind:value={$roster.teamName}
            use:blurOnEscapeOrEnter
        />
    </h2>
</div>
<div class="sub-heading-box">
    <p class="sub-heading">
        <span class="print-only-team-name"
            >{$roster.teamName}&nbsp;
        </span>{$roster.teamType} Team
    </p>
    <RosterSave />
</div>
<Export />
<RosterDelete />
{#if $rosterViewMode === 'grid'}
    <div class="player-cards">
        {#each $roster.players as player, index}
            {#if !player?.deleted}
                <RosterPlayerCard {index} />
            {/if}
        {/each}

        {#if activePlayersNumber < getMaxPlayers($roster.format)}
            <AddPlayerCard {playerTypes} index={nextPlayerIndex} />
        {/if}
    </div>
{:else}
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <td />
                    <td class="left-align" colspan="2" id="name-header">Name</td
                    >
                    <td class="left-align" id="position-header">Position</td>
                    <td>MA</td>
                    <td>ST</td>
                    <td>AG</td>
                    <td>PA</td>
                    <td>AV</td>
                    <td class="skills">Skills</td>
                    <td>Hiring Fee</td>
                    {#if $roster.format === 'elevens'}
                        <td id="spp-header">Unspent Spp</td>
                    {/if}
                    {#if $roster.mode !== 'exhibition'}
                        <td id="mng-header" title="Miss next game">Mng</td>
                        {#if $roster.format === 'elevens'}
                            <td>Ni</td>
                            <td id="tr-header" title="Temporarily Retiring"
                                >TR</td
                            >
                        {/if}
                    {/if}
                    <td>Current Value</td>
                </tr>
            </thead>
            <tbody>
                {#each $roster.players as player, index}
                    {#if !player?.deleted}
                        <RosterRow {index} />
                    {/if}
                {/each}
                {#if activePlayersNumber < getMaxPlayers($roster.format)}
                    <AddPlayerToRoster {playerTypes} index={nextPlayerIndex} />
                {/if}
            </tbody>
        </table>
    </div>
{/if}

<style lang="scss">
    .sub-heading-box {
        display: flex;
        align-items: flex-end;
    }
    .player-cards {
        display: grid;
        align-items: start;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        column-gap: 10px;
        row-gap: 15px;
        margin-bottom: 20px;
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
    .print-only-team-name {
        display: none;
    }
    @media print {
        .heading {
            display: none;
        }
        .print-only-team-name {
            display: inline-block;
            font-size: 16px;
        }
        .table-container {
            overflow: inherit;
        }
    }
</style>
