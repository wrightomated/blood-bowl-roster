<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';
    import { roster } from '../store/teamRoster.store';
    import { teamLoadOpen } from '../store/teamLoadOpen.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import FootballSpinner from './uiComponents/footballSpinner.svelte';
    import { currentUserStore } from '../store/currentUser.store';
    import { savedRosterIndex } from '../store/saveDirectory.store';
    import { getSavedRosterFromLocalStorage } from '../helpers/localStorageHelper';
    import {
        showNewTeamDialogue,
        teamSelectionOpen,
    } from '../store/teamSelectionOpen.store';
    import {
        showAvailablePlayers,
        showAvailableStarPlayers,
    } from '../store/showPlayerList.store';
    import { rosterCache } from '../store/rosterCache.store';
    import Button from './uiComponents/button.svelte';
    import TeamPreviews from './teamPreviews.svelte';
    import { currentTeamId } from '../store/currentTeam.store';
    import { loadSecretData } from '../modules/secret-league/secretLeagueHelper';

    let rosterCode: string;

    function toggleLoad() {
        teamLoadOpen.set(!$teamLoadOpen);
    }

    function inputCode() {
        roster.codeToRoster(rosterCode);
        toggleLoad();
    }

    async function loadTeam(savedRoster: { id: number; name?: string }) {
        savedRosterIndex.updateCurrentIndex(savedRoster.id);
        const retrievedRoster = getSavedRosterFromLocalStorage(savedRoster.id);
        if (!retrievedRoster) {
            savedRosterIndex.removeIdFromIndex(savedRoster.id);
            return;
        }
        if (
            typeof retrievedRoster.teamId === 'string' &&
            retrievedRoster.teamId.includes('st')
        ) {
            try {
                await loadSecretData();
            } catch (error) {
                console.error(error);
            }
        }
        currentTeamId.set(retrievedRoster.teamId);
        roster.loadRoster(retrievedRoster);
        teamSelectionOpen.set(false);
        showAvailablePlayers.set(false);
        showAvailableStarPlayers.set(false);
        showNewTeamDialogue.set(false);
        teamLoadOpen.set(false);
    }

    async function getRosterPreviews() {
        if ($rosterCache.rosterPreviews.valid) {
            return $rosterCache.rosterPreviews.cachedItem;
        }
        try {
            const dbService = await import('./auth/firebaseDB.service');
            const rosterPreviewDocument = await dbService.gerRosterPreviews();
            const rosterPreviews = rosterPreviewDocument.data();
            rosterCache.cacheRosterPreviews(rosterPreviews);
            return rosterPreviews;
        } catch {
            throw new Error('');
        }
    }
</script>

<h2 class="page-title">{$_('load.title')}</h2>
<div class="button-container" data-cy="load-team-box">
    <div class="code-box">
        <input
            aria-label={$_('load.code')}
            id="code-input"
            placeholder={$_('load.code')}
            bind:value={rosterCode}
            use:blurOnEscapeOrEnter
        />
        <MaterialButton
            hoverText={$_('load.title')}
            symbol="input"
            clickFunction={inputCode}
        />
    </div>

    {#if $currentUserStore}
        {#await getRosterPreviews()}
            <FootballSpinner />
        {:then rosterPreviews}
            <TeamPreviews {rosterPreviews} />
        {:catch}
            <p style="color: red">{$_('errors.generic')}</p>
        {/await}
    {:else}
        <h3>{$_('load.local')}</h3>
        {#each $savedRosterIndex.index as savedRoster, i}
            <Button clickFunction={() => loadTeam(savedRoster)}
                >{savedRoster.name ||
                    $_('load.saved', { values: { n: i + 1 } })}</Button
            >
        {/each}
    {/if}
</div>

<style lang="scss">
    .code-box {
        display: flex;
        padding: 10px;
        align-items: center;

        input {
            margin-right: 8px;
            font-size: 16px;
        }
    }
</style>
