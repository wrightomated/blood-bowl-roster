<script lang="ts">
    import { onMount } from 'svelte';
    import { saveMatchHistoryToLocal } from '../../helpers/localStorageHelper';
    import { modalState } from '../../store/modal.store';
    import { rosterCache } from '../../store/rosterCache.store';
    import { roster } from '../../store/teamRoster.store';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';

    let loading = true;

    onMount(async () => {
        await saveMatchHistory();
    });

    async function saveMatchHistory() {
        roster.matchDraftUpdateRoster({
            updateSpp: true,
            removeInducements: true,
            updateTreasury: true,
            removeStarPlayers: true,
        });

        const matchHistory = $roster.matchDraft;
        const service = await import('../auth/firebaseDB.service');
        try {
            await service.addMatchHistory(matchHistory);
        } catch (error) {
            console.error('Error uploading match history', error);
            throw error;
        }
        roster.matchDraftToSummary();
        try {
            await service.uploadRoster($roster);
        } catch (error) {
            console.error('Error saving roster after match history update');
            throw error;
        }
        saveMatchHistoryToLocal(matchHistory.id, matchHistory);
        rosterCache.invalidateRoster($roster.rosterId);
        loading = false;
        modalState.update((state) => {
            return {
                ...state,
                canClose: true,
            };
        });
    }
</script>

{#if loading}
    <FootballSpinner loadingText="Uploading match history" />
{:else}
    <h3 class="center">Match history updated</h3>
{/if}
