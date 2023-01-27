<script lang="ts">
    import type { MatchHistoryRecord } from '../../models/matchHistory.model';
    import { modalState } from '../../store/modal.store';
    import { roster } from '../../store/teamRoster.store';
    import Button from '../uiComponents/button.svelte';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';

    export let matchRecord: MatchHistoryRecord;

    let loading = false;

    async function deleteMatch() {
        loading = true;
        roster.removeMatchSummary(matchRecord.id);
        const service = await import('../auth/firebaseDB.service');

        try {
            await service.deleteMatchHistory(matchRecord.id);
        } catch (error) {
            console.error('Match could not be deleted');
        }
        try {
            await service.uploadRoster($roster);
        } catch (error) {
            console.error('Error saving roster after match history deletion');
        }
        closeModal();
    }

    function closeModal() {
        modalState.close();
    }
</script>

{#if loading}
    <FootballSpinner loadingText="Deleting match history." />
{:else}
    <h3>
        Match Record
        {#if matchRecord?.opponentCoach?.name}
            vs {matchRecord.opponentCoach.name}
        {/if}
    </h3>
    <p>
        Are you sure you want to delete this match record? It can not be undone.
    </p>
    <Button clickFunction={deleteMatch}>Yes, delete this record</Button>
    <Button clickFunction={closeModal}>No, keep this record</Button>
{/if}
