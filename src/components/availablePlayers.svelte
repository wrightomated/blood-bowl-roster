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
                        <th>QTY</th>
                        <th class="left-align">Position</th>
                        <th>Cost</th>
                        <th>MA</th>
                        <th>ST</th>
                        <th>AG</th>
                        <th>PA</th>
                        <th>AV</th>
                        <th class="skills-header left-align">Skills</th>
                        <th>Primary</th>
                        <th>Secondary</th>
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
