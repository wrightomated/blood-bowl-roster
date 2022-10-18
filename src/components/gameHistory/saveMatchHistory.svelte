<script lang="ts">
    import { onMount } from 'svelte';
    import { modalState } from '../../store/modal.store';
    import { rosterCache } from '../../store/rosterCache.store';
    import { roster } from '../../store/teamRoster.store';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';

    let loading = true;

    onMount(async () => {
        await saveMatchHistory();
    });

    async function saveMatchHistory() {
        roster.updateDraftEventTotals();
        const matchHistory = $roster.matchDraft;
        const service = await import('../auth/firebaseDB.service');
        await service.addMatchHistory(matchHistory);
        roster.matchDraftToSummary();
        await service.uploadRoster($roster);
        rosterCache.invalidateRoster($roster.rosterId);
        rosterCache.invalidateRosterPreviews();
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
    Match history updated
{/if}
