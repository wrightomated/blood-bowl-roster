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
    <div class="boxed-div">
        <p>
            {$_('messages.deleteConfirm')}
        </p>
        <button class="rounded-button cancel" on:click={clearRoster}>
            {$_('common.delete')}
        </button>
        <button class="rounded-button" on:click={toggleDelete}
            >{$_('common.cancel')}</button
        >
    </div>
{/if}
