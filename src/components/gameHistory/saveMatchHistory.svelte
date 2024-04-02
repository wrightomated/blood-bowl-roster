<script lang="ts">
    import { onMount } from 'svelte';
    import { saveMatchHistoryToLocal } from '../../helpers/localStorageHelper';
    import type { SaveMatchOptions } from '../../models/matchHistory.model';
    import { modalState } from '../../store/modal.store';
    import { rosterCache } from '../../store/rosterCache.store';
    import { roster } from '../../store/teamRoster.store';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
    import { _ } from 'svelte-i18n';

    export let saveOptions: SaveMatchOptions;
    let loading = true;
    let success = false;

    onMount(async () => {
        const backupRoster = JSON.stringify($roster);
        try {
            await saveMatchHistory();
        } catch (error) {
            console.error(error);
            roster.set(JSON.parse(backupRoster));
            loading = false;
            modalState.update((state) => {
                return {
                    ...state,
                    canClose: true,
                };
            });
        }
    });

    async function saveMatchHistory() {
        roster.matchDraftUpdateRoster(saveOptions);

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
        success = true;
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
{:else if success}
    <h3 class="center">Match history updated</h3>
{:else}
    <h3>{$_('errors.generic')}</h3>
{/if}
