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
    <div class="container">
        <p>
            Are you sure you want to delete {$roster.teamName || 'this roster'}?
            It can not be undone.
        </p>
        <button class="delete" on:click={clearRoster}>Delete</button>
        <button on:click={toggleDelete}>Cancel</button>
    </div>
{/if}

<style lang="scss">
    .container {
        border-radius: 10px;
        background: var(--secondary-background-colour);
        padding: 10px;
        margin-bottom: 1em;
    }
    button {
        border-radius: 10px;
        background-color: white;
        color: grey;
        padding: 10px;
        margin: 5px;
        border: 2px solid grey;

        &:hover {
            background-color: grey;
            color: white;
        }

        &.delete {
            color: var(--main-colour);
            border-color: var(--main-colour);

            &:hover {
                background-color: var(--main-colour);
                color: white;
            }
        }
    }
</style>
