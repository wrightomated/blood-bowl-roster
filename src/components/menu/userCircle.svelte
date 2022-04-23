<script lang="ts">
    import { currentUserStore } from '../../store/currentUser.store';
</script>

{#if $currentUserStore}
    <div class="initial">
        {$currentUserStore.displayName?.charAt(0)?.toUpperCase() || '?'}
    </div>
{:else}
    <i class="material-icons">account_circle</i>
{/if}

<style lang="scss">
    .initial {
        font-family: var(--display-font);
        color: var(--secondary-colour);
        background-color: white;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid;

        &:hover {
            background-color: var(--secondary-colour);
            color: white;
            border-color: var(--secondary-colour);
        }
    }
    i {
        font-size: 36px;
    }
</style>
