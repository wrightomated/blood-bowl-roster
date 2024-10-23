<script lang="ts">
    import { roster } from '../store/teamRoster.store';
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
    import { _ } from 'svelte-i18n';
    import { playerCatalogue } from '../store/playerCatalogue.store';
    import { customisationRules } from '../customisation/customisation.store';

    $: teamList = $availableTeams;

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
    {$currentTeam.id}
    {#if $teamSelectionOpen && !$currentTeamIsDungeonBowl}
        <span class="no-print">
            <AvailablePlayers />
            <div class="header-container">
                <caption
                    class="team-star-player-caption"
                    on:click={toggleStarPlayers}
                >
                    {$_('tables.starCaption', {
                        values: { team: $currentTeam.name },
                    })}
                </caption>
                <MaterialButton
                    hoverText={$showAvailableStarPlayers
                        ? $_('tables.hide')
                        : $_('tables.show')}
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
            playerTypes={$currentTeam.players.map((x) =>
                $playerCatalogue.find((player) => player.id === x.id)
            )}
        />
        <RerollsTable selectedTeam={$currentTeam} />
        {#if !$customisationRules?.hideProfile}
            <MatchHistoryRecords />
        {/if}
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
