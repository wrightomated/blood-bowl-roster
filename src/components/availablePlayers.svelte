<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { playerById } from '../helpers/playerCatalogueHelpers';
    import { currentTeam } from '../store/currentTeam.store';
    import { showAvailablePlayers } from '../store/showPlayerList.store';
    import Player from './player.svelte';
    import MaterialButton from './uiComponents/materialButton.svelte';

    const togglePlayers = () => {
        showAvailablePlayers.set(!$showAvailablePlayers);
    };
</script>

<span class="no-print">
    <div class="header-container">
        <caption
            class="team-player-caption"
            data-cy="selected-team-caption"
            on:click={togglePlayers}
        >
            {$_('tables.teamPlayers.caption', {
                values: { team: $currentTeam.name },
            })}
        </caption>
        <MaterialButton
            hoverText={$showAvailablePlayers
                ? $_('tables.teamPlayers.hide')
                : $_('tables.teamPlayers.show')}
            symbol={$showAvailablePlayers ? 'arrow_drop_up' : 'arrow_drop_down'}
            clickFunction={togglePlayers}
        />
    </div>
    {#if $showAvailablePlayers}
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{$_('tables.teamPlayers.qty')}</th>
                        <th class="left-align">{$_('roster.column.names.4')}</th
                        >
                        <th>{$_('tables.teamPlayers.cost')}</th>
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
                            player={playerById(teamPlayer.id)}
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
        display: flex;
        margin-top: 1em;
        caption {
            font-family: var(--display-font);
        }
    }
</style>
