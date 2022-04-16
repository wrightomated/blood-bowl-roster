<i class="material-icons spinner">sports_football</i>

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

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
