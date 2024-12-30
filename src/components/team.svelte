<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import {
        currentTeam,
        currentTeamId,
        currentTeamIsDungeonBowl,
        isSecretTeam,
        playerTypes,
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
    import { customisationRules } from '../customisation/customisation.store';
    import { loadSecretData } from '../modules/secret-league/secretLeagueHelper';

    $: teamList = $availableTeams;

    const toggleStarPlayers = () => {
        showAvailableStarPlayers.set(!$showAvailableStarPlayers);
        sendEventToAnalytics('toggle-star-players', {
            players: $showAvailableStarPlayers,
        });
    };

    // This should be moved to a helper function
    async function populateCurrentTeam() {
        if ($currentTeamId && $isSecretTeam) {
            const secretData = await loadSecretData();
            if (
                $roster.players.some(
                    (p) => p.player?.position === 'unknown-position'
                )
            ) {
                const secretPlayers = $roster.players.map((p) => {
                    if (p.player.position === 'unknown-position') {
                        return {
                            ...p,
                            player: secretData.secretPlayers.find(
                                (sp) => sp.id === p.player.id
                            ),
                        };
                    } else {
                        return p;
                    }
                });
                roster.set({
                    ...$roster,
                    players: secretPlayers,
                });
                console.log($roster);
            }
            if ($roster.teamType.toLowerCase() === 'unknown') {
                roster.set({
                    ...$roster,
                    teamType: secretData.secretTeams.find(
                        (st) => st.id === $currentTeamId
                    ).name,
                });
            }
            return;
        } else {
            return;
        }
    }

    async function loadSecretPlayers() {
        if ($isSecretTeam) {
            await loadSecretData();
            return;
        } else {
            return;
        }
    }
</script>

<LocalStorageController />
<DocumentTitleWriter />

<span class="no-print">
    <TeamSelector {teamList} />
    <DungeonBowlContainer />
</span>
{#await populateCurrentTeam() then _nothing}
    {#if $currentTeam}
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
            {#await loadSecretPlayers() then _nothing}
                <Roster playerTypes={$playerTypes} />
                <RerollsTable selectedTeam={$currentTeam} />
                {#if !$customisationRules?.hideProfile}
                    <MatchHistoryRecords />
                {/if}
            {/await}
        {/if}
    {/if}
{/await}

<style lang="scss">
    .header-container {
        display: flex;
        margin-top: 1em;
        caption {
            font-family: var(--display-font);
        }
    }
</style>
