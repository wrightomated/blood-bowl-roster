<script>
    export let loadingText = '';
</script>

<i class="material-icons spinner">sports_football</i>
{#if loadingText}
    <p>{loadingText}</p>
{/if}

<style lang="scss">
    .spinner {
        display: block;
        color: var(--main-colour);
        font-size: 80px;
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
