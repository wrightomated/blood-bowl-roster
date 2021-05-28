<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import { playerCatalogue } from '../data/players.data';
    import { teamData } from '../data/teams.data';
    import { currentTeam } from '../store/currentTeam.store';
    import PlayerRow from './player.svelte';
    import Roster from './roster.svelte';
    import RerollsTable from './rerollsTable.svelte';
    import TeamSelector from './teamSelector.svelte';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { teamSelectionOpen } from '../store/teamSelectionOpen.store';
    import { teamLoadOpen } from '../store/teamLoadOpen.store';
    import StarPlayers from './starPlayers.svelte';
    import LocalStorageController from './localStorageController.svelte';
    import {
        showAvailablePlayers,
        showAvailableStarPlayers,
    } from '../store/showPlayerList.store';

    const teamList = teamData.teams;

    $: selectedTeam = $currentTeam;

    const playerById = (id?: number) => {
        return playerCatalogue.players.find((x) => x.id === id);
    };

    const togglePlayers = () => {
        showAvailablePlayers.set(!$showAvailablePlayers);
    };

    const toggleStarPlayers = () => {
        showAvailableStarPlayers.set(!$showAvailableStarPlayers);
    };
</script>

<LocalStorageController />

<TeamSelector {teamList} />

{#if selectedTeam}
    <div class="header-container">
        <caption class="team-player-caption" on:click={togglePlayers}>
            {`${selectedTeam.name} Team Players`}
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
                    {#each selectedTeam.players as teamPlayer}
                        <PlayerRow
                            max={teamPlayer.max}
                            player={playerById(teamPlayer.id)}
                        />
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
    <div class="header-container">
        <caption class="team-star-player-caption" on:click={toggleStarPlayers}>
            {`${selectedTeam.name} Team Star Players`}
        </caption>
        <MaterialButton
            hoverText={$showAvailableStarPlayers
                ? 'Hide available star players'
                : 'Show available star players'}
            symbol={$showAvailableStarPlayers
                ? 'arrow_drop_up'
                : 'arrow_drop_down'}
            clickFunction={toggleStarPlayers}
        />
    </div>
    {#if $showAvailableStarPlayers}
        <StarPlayers />
    {/if}

    {#if !$teamSelectionOpen && !$teamLoadOpen && $roster.teamType}
        <Roster
            playerTypes={selectedTeam.players.map((x) => playerById(x.id))}
        />
        <RerollsTable {selectedTeam} />
    {/if}
{/if}

<style lang="scss">
    @import '../styles/font';

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
            font-family: $display-font;
        }
    }
</style>
