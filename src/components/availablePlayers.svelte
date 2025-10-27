<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { currentTeam } from '../store/currentTeam.store';
    import { showAvailablePlayers } from '../store/showPlayerList.store';
    import Player from './player.svelte';
    import { playerCatalogue } from '../store/playerCatalogue.store';

    const togglePlayers = () => {
        showAvailablePlayers.set(!$showAvailablePlayers);
    };
</script>

<span class="no-print">
    <div class="header-container">
        <button
            class="team-player-caption"
            data-cy="selected-team-caption"
            title={$showAvailablePlayers
                ? $_('tables.hide')
                : $_('tables.show')}
            on:click={togglePlayers}
        >
            {$_('tables.caption', {
                values: { team: $currentTeam.name },
            })}
            <i class="material-symbols-outlined"
                >{$showAvailablePlayers
                    ? 'arrow_drop_up'
                    : 'arrow_drop_down'}</i
            >
        </button>
    </div>
    {#if $showAvailablePlayers}
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{$_('tables.qty')}</th>
                        <th class="left-align">{$_('roster.column.names.4')}</th
                        >
                        <th>{$_('tables.cost')}</th>
                        <th>{$_('roster.column.names.5')}</th>
                        <th>{$_('roster.column.names.6')}</th>
                        <th>{$_('roster.column.names.7')}</th>
                        <th>{$_('roster.column.names.8')}</th>
                        <th>{$_('roster.column.names.9')}</th>
                        <th class="skills-header left-align"
                            >{$_('roster.column.names.10')}</th
                        >
                        <th>{$_('common.primary')}</th>
                        <th>{$_('common.secondary')}</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $currentTeam.players as teamPlayer}
                        <Player
                            max={teamPlayer.max}
                            player={$playerCatalogue.find(
                                (player) => player.id === teamPlayer.id
                            )}
                        />
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</span>

<style lang="scss">
    .table-container {
        width: 100%;
        overflow-x: auto;
    }
    .skills-header {
        min-width: 100px;
    }
    .header-container {
        button {
            display: flex;
            align-items: center;
            margin-top: 1em;
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            text-align: left;
            font-family: var(--display-font);
        }
    }
</style>
