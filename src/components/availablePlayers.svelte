<script lang="ts">
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
            {`${$currentTeam.name} Team Players`}
        </caption>
        <MaterialButton
            hoverText={$showAvailablePlayers
                ? 'Hide available players'
                : 'Show available players'}
            symbol={$showAvailablePlayers ? 'arrow_drop_up' : 'arrow_drop_down'}
            clickFunction={togglePlayers}
        />
    </div>
    {#if $showAvailablePlayers}
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <td>QTY</td>
                        <td class="left-align">Position</td>
                        <td>Cost</td>
                        <td>MA</td>
                        <td>ST</td>
                        <td>AG</td>
                        <td>PA</td>
                        <td>AV</td>
                        <td class="skills-header left-align">Skills</td>
                        <td>Primary</td>
                        <td>Secondary</td>
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
    .left-align {
        text-align: left;
    }
    .header-container {
        display: flex;
        margin-top: 1em;
        caption {
            font-family: var(--display-font);
        }
    }
</style>
