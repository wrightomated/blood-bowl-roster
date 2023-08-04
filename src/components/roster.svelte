<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import type { Player } from '../models/player.model';
    import RosterSave from './rosterSave.svelte';
    import Export from './export.svelte';
    import { rosterViewMode } from '../store/rosterDisplayMode.store';
    import RosterDelete from './rosterDelete.svelte';
    import AddPlayerCard from './playerCard/addPlayerCard.svelte';
    import AddPlayerToRoster from './addPlayerToRoster.svelte';
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';
    import { filteredTableColumns } from '../store/filteredTableColumns.store';
    import RosterPlayerRow from './rosterPlayer/rosterPlayerRow.svelte';
    import RosterPlayerCard from './rosterPlayer/rosterPlayerCard.svelte';
    import Pill from './uiComponents/pill.svelte';
    import { getTeamFormatShortDisplay } from '../types/teamFormat';
    import RosterStatusToggle from './rosterStatusToggle.svelte';
    import SpecialRuleSelector from './specialRuleSelector.svelte';
    import AvailablePlayers from './availablePlayers.svelte';
    import { gameSettings } from '../store/gameSettings.store';
    import DungeonBowlPlayerCount from './dungeonBowl/dungeonBowlPlayerCount.svelte';
    import RosterPlayerCount from './rosterPlayerCount.svelte';

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
            class="heading__input"
            bind:value={$roster.teamName}
            use:blurOnEscapeOrEnter
        />
    </h2>
</div>
<span class="no-print">
    <div class="pill-box">
        <Pill>{$roster.teamType + ' Team'}</Pill>
        <Pill>{getTeamFormatShortDisplay($roster.format)}</Pill>
        <Pill>{$roster.mode}</Pill>
    </div>
</span>
<SpecialRuleSelector />

<div class="sub-heading-box">
    <p class="sub-heading print-only print-only--larger">{$roster.teamName}</p>
    <p class="sub-heading print-only">
        {$roster.teamType} Team
    </p>
    <p class="sub-heading print-only" title={$roster.format}>
        {getTeamFormatShortDisplay($roster.format)}
    </p>
    <p class="sub-heading print-only" title={$roster.mode}>
        {$roster.mode}
    </p>
    <RosterSave />
</div>
<Export />
<RosterDelete />

{#if $rosterViewMode === 'grid'}
    <div class="player-cards">
        {#each $roster.players as player, index (player.playerId)}
            {#if !player?.deleted}
                <RosterPlayerCard {index} />
            {/if}
        {/each}

        {#if activePlayersNumber < $gameSettings.maxPlayers}
            <AddPlayerCard {playerTypes} index={nextPlayerIndex} />
        {/if}
    </div>
{:else}
    <div class="table-container">
        <table class="roster-table">
            <thead>
                <tr>
                    {#each $filteredTableColumns as c}
                        <td
                            class={c.headerDetails?.elementClass}
                            id={c.headerDetails?.elementId}
                            colspan={c.colspan || 1}
                            title={c.title || c.name}
                            >{c.headerDetails?.hideName
                                ? ''
                                : c?.customName
                                ? c.customName
                                : c.name}
                        </td>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each $roster.players as player, index}
                    {#if !player?.deleted}
                        <RosterPlayerRow {index} />
                    {/if}
                {/each}
                {#if activePlayersNumber < $gameSettings.maxPlayers}
                    <AddPlayerToRoster {playerTypes} index={nextPlayerIndex} />
                {/if}
            </tbody>
        </table>
    </div>
{/if}
<RosterStatusToggle />
{#if $roster.format === 'dungeon bowl'}
    <DungeonBowlPlayerCount />
{:else}
    <RosterPlayerCount />
{/if}
{#if $roster.format !== 'dungeon bowl'}
    <AvailablePlayers />
{/if}

<style lang="scss">
    .sub-heading-box {
        display: flex;
        align-items: flex-end;
        gap: 8px;
    }
    .player-cards {
        display: grid;
        align-items: start;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        column-gap: 12px;
        row-gap: 16px;
        margin-bottom: 20px;
    }
    .table-container {
        max-width: 100%;
        overflow-x: auto;
    }
    .pill-box {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-block-end: 32px;
    }
    input {
        border: 0;
        border-radius: 0;
        background: none;
    }
    .heading {
        margin-top: 16px;
        margin-block-end: 0;

        &__input {
            display: block;
            font-family: var(--display-font);
            font-weight: 600;
            font-size: 48px;
            -webkit-padding: 0;
            padding: 0;
            box-sizing: inherit;
            border: none;
            color: var(--main-colour);
            margin: 0;
            text-align: center;
            width: 100%;
        }
    }
    @media screen and (max-width: 800px) {
        .heading {
            &__input {
                font-size: 32px;
            }
        }
        .pill-box {
            margin-block-end: 24px;
        }
    }
    @media screen and (max-width: 450px) {
        .heading {
            &__input {
                font-size: 20px;
            }
        }
        .pill-box {
            margin-block-end: 16px;
        }
    }
    .sub-heading {
        margin-block-end: 4px;
        font-family: var(--display-font);
        text-transform: capitalize;

        &--format {
            color: var(--main-colour);
        }
    }
    .left-align {
        text-align: left;
    }
    .skills {
        min-width: 200px;
    }

    .print-only {
        display: none;
    }

    .dungeon-bowl-callout {
        text-align: center;
    }
    @media print {
        .heading {
            display: none;
        }
        .print-only {
            display: inline-block;
            &--larger {
                font-size: 16px;
            }
        }
        .table-container {
            overflow: inherit;
        }
    }
</style>
