<script>
    import { currentUserStore } from '../../store/currentUser.store';
    import { modalState } from '../../store/modal.store';
    import Button from '../uiComponents/button.svelte';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
</script>

{#if $currentUserStore}
    <FootballSpinner loadingText="Logging out" />
{:else}
    <div class="success">
        <p>Successfully logged out!</p>
        <Button clickFunction={() => modalState.close()}>Okay</Button>
    </div>
{/if}

<style lang="scss">
    .success {
        text-align: center;
        p {
            font-family: var(--display-font);
            font-size: 20px;
        }
    }
</style>
