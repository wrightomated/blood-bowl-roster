<script lang="ts">
    import { currentUserStore } from '../store/currentUser.store';

    import { savedRosterIndex } from '../store/saveDirectory.store';

    import { showDelete } from '../store/showDelete.store';
    import { roster } from '../store/teamRoster.store';

    async function clearRoster() {
        if ($currentUserStore) {
        }
        roster.reset();
        savedRosterIndex.removeRoster();
        toggleDelete();
    }

    async function deleteRoster() {
        const service = await import('./auth/firebaseDB.service');
        await service.deleteRoster($roster?.rosterId);
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
