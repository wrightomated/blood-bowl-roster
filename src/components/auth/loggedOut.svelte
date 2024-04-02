<script>
    import { _ } from 'svelte-i18n';
    import { currentUserStore } from '../../store/currentUser.store';
    import { modalState } from '../../store/modal.store';
    import Button from '../uiComponents/button.svelte';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
</script>

{#if $currentUserStore}
    <FootballSpinner loadingText="Logging out" />
{:else}
    <div class="success">
        <p>{$_('auth.logoutSuccess')}</p>
        <Button clickFunction={() => modalState.close()}
            >{$_('common.ok')}</Button
        >
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
