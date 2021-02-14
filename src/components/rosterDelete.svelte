<script lang="ts">
    import { savedRosterIndex } from '../store/saveDirectory.store';

    import { showDelete } from '../store/showDelete.store';
    import { roster } from '../store/teamRoster.store';

    const clearRoster = () => {
        roster.reset();
        savedRosterIndex.removeRoster();
        toggleDelete();
    };

    const toggleDelete = () => {
        showDelete.set(!$showDelete);
    };
</script>

{#if $showDelete}
    <div class="container">
        <p>
            Are you sure you want to delete {$roster.teamName || 'this roster'}?
            It can not be undone.
        </p>
        <button on:click={clearRoster}>Delete</button>
        <button on:click={toggleDelete}>Cancel</button>
    </div>
{/if}

<style lang="scss">
    @import '../styles/colour';
    .container {
        border-radius: 10px;
        background: $secondary-background-colour;
        padding: 10px;
        margin-bottom: 1em;
    }
    // .share-box {
    //     display: flex;
    //     padding: 10px;
    //     align-items: center;

    //     input {
    //         margin-right: 1em;
    //     }
    //     label {
    //         margin-right: 1em;
    //     }
    //     .saved {
    //         color: green;
    //     }
    // }
</style>
