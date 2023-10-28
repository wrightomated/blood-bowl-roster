<script lang="ts">
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';
    import { currentUserStore } from '../store/currentUser.store';
    import { roster } from '../store/teamRoster.store';

    currentUserStore.subscribe((value) => {
        if ($roster?.coachDetails?.coachName === undefined) {
            $roster.coachDetails = {
                ...$roster?.coachDetails,
                coachName: value?.displayName,
            };
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
        bind:value={$roster.coachDetails.coachName}
        use:blurOnEscapeOrEnter
    />
    <label for="naf-number" class="heading">NAF Number:</label>
    <input
        placeholder="NAF Number"
        id="naf-number"
        data-cy="naf-number"
        class="heading__input no-print"
        bind:value={$roster.coachDetails.nafNumber}
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
