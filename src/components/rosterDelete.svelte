<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { currentUserStore } from '../store/currentUser.store';
    import { modalState } from '../store/modal.store';

    import { savedRosterIndex } from '../store/saveDirectory.store';

    import { showDelete } from '../store/showDelete.store';
    import { roster } from '../store/teamRoster.store';

    async function clearRoster() {
        if ($currentUserStore) {
            await deleteRoster();
        }
        roster.reset();
        savedRosterIndex.removeRoster();
        toggleDelete();
    }

    async function deleteRoster() {
        modalState.modalLoading($_('messages.deleting'));
        try {
            const service = await import('./auth/firebaseDB.service');
            await service.deleteRoster($roster?.rosterId);
            modalState.close();
        } catch (error) {
            console.error(error);
            modalState.modalError($_('errors.generic'));
        }
    }

    function toggleDelete() {
        showDelete.set(!$showDelete);
    }
</script>

{#if $showDelete}
    <div class="container">
        <p>
            {$_('messages.deleteConfirm')}
        </p>
        <button class="delete" on:click={clearRoster}>
            {$_('common.delete')}
        </button>
        <button on:click={toggleDelete}>{$_('common.cancel')}</button>
    </div>
{/if}

<style lang="scss">
    .container {
        border-radius: 12px;
        background: var(--secondary-background-colour);
        padding: 10px;
        margin-bottom: 1em;
    }
    button {
        border-radius: 12px;
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
