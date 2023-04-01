<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import { playerCatalogue } from '../data/players.data';
    import { teamData } from '../data/teams.data';
    import {
        currentTeam,
        currentTeamIsDungeonBowl,
    } from '../store/currentTeam.store';
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
    import DocumentTitleWriter from './documentTitleWriter.svelte';
    import { sendEventToAnalytics } from '../analytics/plausible';
    import DungeonBowlContainer from './dungeonBowl/dungeonBowlContainer.svelte';
    import { showDungeonBowl } from '../store/showDungeonBowl.store';
    import DungeonBowlPlayerCount from './dungeonBowl/dungeonBowlPlayerCount.svelte';
    import MatchHistoryRecords from './gameHistory/matchHistoryRecords.svelte';
    import AvailablePlayers from './availablePlayers.svelte';

    const teamList = teamData.teams;

    const playerById = (id?: number) => {
        return playerCatalogue.players.find((x) => x.id === id);
    };

    const toggleStarPlayers = () => {
        showAvailableStarPlayers.set(!$showAvailableStarPlayers);
        sendEventToAnalytics('toggle-star-players', {
            players: $showAvailableStarPlayers,
        });
    };
</script>

<LocalStorageController />
<DocumentTitleWriter />

<span class="no-print">
    <TeamSelector {teamList} />
    <DungeonBowlContainer />
</span>

{#if $currentTeam}
    {#if $teamSelectionOpen && !$currentTeamIsDungeonBowl}
        <span class="no-print">
            <AvailablePlayers />
            <div class="header-container">
                <caption
                    class="team-star-player-caption"
                    on:click={toggleStarPlayers}
                >
                    {`${$currentTeam.name} Team Star Players`}
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
        </span>
    {/if}

    {#if !$teamSelectionOpen && !$teamLoadOpen && !$showDungeonBowl && $roster.teamType}
        <Roster
            playerTypes={$currentTeam.players.map((x) => playerById(x.id))}
        />
        {#if $roster.format === 'dungeon bowl'}
            <DungeonBowlPlayerCount />
        {/if}
        <RerollsTable selectedTeam={$currentTeam} />
        <MatchHistoryRecords />
    {/if}
{/if}

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
