<script lang="ts">
    import { onMount } from 'svelte';
    import { modalState } from '../../store/modal.store';
    // import { modalState } from '../../store/modal.store';
    import { rosterCache } from '../../store/rosterCache.store';
    import { roster } from '../../store/teamRoster.store';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';

    let loading = true;

    onMount(async () => {
        await saveMatchHistory();
    });

    async function saveMatchHistory() {
        roster.matchDraftUpdateRoster();

        const matchHistory = $roster.matchDraft;
        const service = await import('../auth/firebaseDB.service');
        try {
            console.error('Saving match history');
            console.log(JSON.stringify($roster, null, 2));
            await service.addMatchHistory(matchHistory);
        } catch (error) {
            console.error('could not save match history innit', error);
            console.log(JSON.stringify(matchHistory, null, 2));
            throw error;
        }
        roster.matchDraftToSummary();
        try {
            await service.uploadRoster($roster);
        } catch (error) {
            console.error('Could not save roster');
            console.log(JSON.stringify($roster, null, 2));
            throw error;
        }

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
