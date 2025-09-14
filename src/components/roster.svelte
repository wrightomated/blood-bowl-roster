<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import type { Player } from '../models/player.model';
    import RosterSave from './rosterSave.svelte';
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
    import { _ } from 'svelte-i18n';

    import { activePlayers } from '../store/activePlayers.store';
    import RosterValidator from './validator/rosterValidator.svelte';
    import AllPlayerPicker from '../modules/secret-league/allPlayerPicker.svelte';
    import { currentTeamId } from '../store/currentTeam.store';
    import { dndzone } from 'svelte-dnd-action';
    import { flip } from 'svelte/animate';

    export let playerTypes: Player[];

    $: nextPlayerIndex =
        $roster.players.findIndex((p) => p.deleted) >= 0
            ? $roster.players.findIndex((p) => p.deleted)
            : $roster.players.length;
    $: activePlayersNumber = $activePlayers.length;

    // For drag and drop functionality - ensure the roster reflects the current order
    $: rosterPlayersForDnd = $activePlayers.map((player, index) => ({
        ...player,
        id: player.playerId || `player-${index}`,
        rosterIndex: $roster.players.findIndex(
            (p) => p.playerId === player.playerId
        ),
    }));

    function handleDndConsider(e) {
        rosterPlayersForDnd = e.detail.items;
    }

    function handleDndFinalize(e) {
        rosterPlayersForDnd = e.detail.items;

        // Create a new players array by reordering only the active players
        const reorderedActivePlayers = e.detail.items.map((item) => {
            const { id, rosterIndex, ...player } = item;
            return player;
        });

        // Rebuild the full players array maintaining deleted players in their positions
        const newPlayersOrder = [];

        // First, add all the reordered active players
        reorderedActivePlayers.forEach((player) => {
            newPlayersOrder.push(player);
        });

        // Then add any deleted players at the end
        $roster.players.forEach((player) => {
            if (player.deleted) {
                newPlayersOrder.push(player);
            }
        });

        roster.reorderPlayers(newPlayersOrder);

        // Update the rosterIndex for each item after reordering
        rosterPlayersForDnd = rosterPlayersForDnd.map((player, index) => ({
            ...player,
            rosterIndex: index,
        }));
    }

    const flipDurationMs = 300;
    // function orderOn(column: ColumnDetails) {
    //     columnSortOrder.set(
    //         $sortedColumn?.name === column.name && $columnSortOrder === 'asc'
    //             ? 'desc'
    //             : 'asc'
    //     );
    //     sortedColumn.set(column);
    //     rosterPlayers = $sortedRosterPlayers;
    // }
</script>

<div class="team-name-container">
    <h2 class="heading">
        <input
            aria-label="team name"
            placeholder={$_('roster.namePlaceholder')}
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
        <Pill
            >{$_('roster.teamType', {
                values: { type: $roster.teamType },
            })}</Pill
        >
        <Pill>{getTeamFormatShortDisplay($roster.format)}</Pill>
        <Pill>{$roster.mode}</Pill>
    </div>
</span>
<SpecialRuleSelector />

<div class="sub-heading-box">
    <p class="sub-heading print-only print-only--larger">{$roster.teamName}</p>
    <p class="sub-heading print-only">
        {$_('roster.teamType', { values: { type: $roster.teamType } })}
    </p>
    <p class="sub-heading print-only" title={$roster.format}>
        {getTeamFormatShortDisplay($roster.format)}
    </p>
    <p class="sub-heading print-only" title={$roster.mode}>
        {$roster.mode}
    </p>
    <RosterSave />
</div>

<RosterDelete />

{#if $rosterViewMode === 'grid'}
    <div
        class="player-cards"
        use:dndzone={{ items: rosterPlayersForDnd, flipDurationMs }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
    >
        {#each rosterPlayersForDnd as player, idx (player.id)}
            <div animate:flip={{ duration: flipDurationMs }}>
                <RosterPlayerCard index={player.rosterIndex} />
            </div>
        {/each}
    </div>

    {#if activePlayersNumber < $gameSettings.maxPlayers}
        <div class="add-player-section">
            <AddPlayerCard {playerTypes} index={nextPlayerIndex} />
        </div>
    {/if}
{:else}
    <div class="table-container">
        <table class="roster-table">
            <thead>
                <tr>
                    {#each $filteredTableColumns as c}
                        <th
                            class={c.headerDetails?.elementClass}
                            id={c.headerDetails?.elementId}
                            colspan={c.colspan || 1}
                            title={$_(c.title || 'roster.column.names.' + c.id)}
                            >{c.headerDetails?.hideName
                                ? ''
                                : c?.customName
                                  ? c.customName
                                  : $_('roster.column.names.' + c.id)}
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody
                use:dndzone={{ items: rosterPlayersForDnd, flipDurationMs }}
                on:consider={handleDndConsider}
                on:finalize={handleDndFinalize}
            >
                {#each rosterPlayersForDnd as player, idx (player.id)}
                    <RosterPlayerRow index={idx} {player} />
                {/each}
            </tbody>
            {#if activePlayersNumber < $gameSettings.maxPlayers}
                <tbody>
                    <AddPlayerToRoster {playerTypes} index={nextPlayerIndex} />
                </tbody>
            {/if}
        </table>
    </div>
{/if}

<!-- Hate to have this secret team if statement here... -->
{#if $currentTeamId === 'st1090'}
    <AllPlayerPicker placeholder="Mala addition" />
{/if}

<RosterStatusToggle />

{#if $roster.format === 'dungeon bowl'}
    <DungeonBowlPlayerCount />
{/if}
{#if $roster.format !== 'dungeon bowl'}
    {#if $roster.mode === 'exhibition' && $roster.format === 'elevens'}
        <RosterValidator />
    {:else}
        <RosterPlayerCount />
    {/if}
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
    .coach {
        margin-left: auto;
    }

    /* Drag and drop styling */
    :global(.dnd-action-draggable-wrapper) {
        cursor: grab;
        transition: all 0.2s ease;
    }

    :global(.dnd-action-draggable-wrapper:hover) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    :global(.dnd-action-draggable-wrapper.dnd-action-is-dragged) {
        cursor: grabbing;
        opacity: 0.8;
        transform: rotate(3deg);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    /* Table specific drag styling */
    .table-container :global(.dnd-action-draggable-wrapper tr) {
        background-color: var(--background-color, white);
        border-radius: 4px;
    }

    .table-container
        :global(.dnd-action-draggable-wrapper.dnd-action-is-dragged tr) {
        background-color: var(--main-colour, #1e40af);
        color: white;
    }

    /* Grid specific drag styling */
    .player-cards :global(.dnd-action-draggable-wrapper) {
        border-radius: 8px;
    }

    .player-cards :global(.dnd-action-draggable-wrapper.dnd-action-is-dragged) {
        border: 2px solid var(--main-colour, #1e40af);
    }

    .add-player-section {
        display: contents;
    }
</style>
