<script lang="ts">
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';
    import { currentUserStore } from '../store/currentUser.store';
    import { roster } from '../store/teamRoster.store';

    currentUserStore.subscribe((value) => {
        if ($roster.coachName === undefined) {
            $roster.coachName = value?.displayName;
        }
    });
</script>

<!-- Coach name that inits with the name in the current user store and is bound to the roster -->

<div class="coach-name-container">
    <label for="coach-name" class="heading">Coach:</label>
    <input
        placeholder="Coach Name"
        id="coach-name"
        data-cy="coach-name"
        class="heading__input no-print"
        bind:value={$roster.coachName}
        use:blurOnEscapeOrEnter
    />
</div>

<style lang="scss">
    // Center input
    .coach-name-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        margin: 1rem 0;
    }
</style>
