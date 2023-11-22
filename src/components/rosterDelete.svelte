<script lang="ts">
    import { currentUserStore } from '../store/currentUser.store';
    import { modalState } from '../store/modal.store';

    import { savedRosterIndex } from '../store/saveDirectory.store';

    import { showDelete } from '../store/showDelete.store';
    import { roster } from '../store/teamRoster.store';
    import FootballSpinner from './uiComponents/footballSpinner.svelte';
    import ModalText from './uiComponents/modalText.svelte';

    async function clearRoster() {
        if ($currentUserStore) {
            await deleteRoster();
        }
        roster.reset();
        savedRosterIndex.removeRoster();
        toggleDelete();
    }

    async function deleteRoster() {
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: false,
            component: FootballSpinner,
            componentProps: { loadingText: 'Deleting roster' },
        });
        try {
            const service = await import('./auth/firebaseDB.service');
            await service.deleteRoster($roster?.rosterId);
            modalState.close();
        } catch (error) {
            console.error(error);
            modalState.set({
                ...$modalState,
                isOpen: true,
                canClose: true,
                component: ModalText,
                componentProps: { text: 'Something went wrong' },
            });
        }
    }

    function toggleDelete() {
        showDelete.set(!$showDelete);
    }
</script>

{#if $showDelete}
    <div class="boxed-div">
        <p>
            Are you sure you want to delete {$roster.teamName || 'this roster'}?
            It can not be undone.
        </p>
        <button class="rounded-button cancel" on:click={clearRoster}
            >Delete</button
        >
        <button class="rounded-button" on:click={toggleDelete}>Cancel</button>
    </div>
{/if}
