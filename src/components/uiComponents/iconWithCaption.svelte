<script lang="ts">
    export let icon: string;
    export let caption: string;
</script>

<div class="container">
    <i class="material-symbols-outlined icon no-transition">{icon}</i>
    <p>{caption}</p>
</div>

<style lang="scss">
    .container {
        flex: 1;
        // flex-basis: 100%;
        // font-family: var(--display-font);
        text-align: center;
        margin-top: 8px;
        margin-bottom: 8px;
        border-radius: 12px;
        padding: 12px;
        // color: white;
        // background-color: var(--secondary-background-colour);
        // background: linear-gradient(45deg, var(--secondary-colour), #185b88b2);

        p {
            margin-block-start: 0;
            margin-block-end: 0;
            text-transform: capitalize;
        }

        .icon {
            font-size: 36px;
            font-variation-settings: 'FILL' 0;
        }
    }
</style>
