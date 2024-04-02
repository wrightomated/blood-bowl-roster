<script>
    import { _ } from 'svelte-i18n';

    export let loadingText = '';
</script>

<i class="material-symbols-outlined spinner">sports_football</i>
{#if loadingText}
    <p>{$_(loadingText)}</p>
{/if}

<style lang="scss">
    .spinner {
        display: block;
        color: var(--main-colour);
        font-size: 80px;
        width: 80px;
        margin: 0 auto;
        text-align: center;
        animation-name: spin;
        animation-duration: 1000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    p {
        text-align: center;
        font-family: var(--display-font);
        font-size: 20px;
        color: var(--main-colour);
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
