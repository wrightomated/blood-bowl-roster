<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import { playerCatalogue } from '../data/players.data';
    import {
        currentTeam,
        currentTeamIsDungeonBowl,
    } from '../store/currentTeam.store';
    import Roster from './roster.svelte';
    import RerollsTable from './rerollsTable.svelte';
    import TeamSelector from './teamSelector.svelte';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import { teamSelectionOpen } from '../store/teamSelectionOpen.store';
    import { teamLoadOpen } from '../store/teamLoadOpen.store';
    import StarPlayers from './starPlayers.svelte';
    import LocalStorageController from './localStorageController.svelte';
    import { showAvailableStarPlayers } from '../store/showPlayerList.store';
    import DocumentTitleWriter from './documentTitleWriter.svelte';
    import { sendEventToAnalytics } from '../analytics/plausible';
    import DungeonBowlContainer from './dungeonBowl/dungeonBowlContainer.svelte';
    import { showDungeonBowl } from '../store/showDungeonBowl.store';
    import MatchHistoryRecords from './gameHistory/matchHistoryRecords.svelte';
    import AvailablePlayers from './availablePlayers.svelte';
    import { availableTeams } from '../store/availableTeams.store';

    $: teamList = $availableTeams;

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
        <RerollsTable selectedTeam={$currentTeam} />
        <MatchHistoryRecords />
    {/if}
{/if}

<style lang="scss">
    .header-container {
        display: flex;
        margin-top: 1em;
        caption {
            font-family: var(--display-font);
        }
    }
</style>
