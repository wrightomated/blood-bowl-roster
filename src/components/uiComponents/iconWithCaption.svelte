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
        // font-family: var(--display-font);
        text-align: center;
        margin-top: 8px;
        margin-bottom: 8px;
        border-radius: 10px;
        // background: var(--secondary-background-colour);
        padding: 20px;
        // max-width: 100px;

        p {
            margin-block-start: 0;
            margin-block-end: 0;
        }

        .icon {
            font-size: 36px;
            font-variation-settings: 'FILL' 0;
        }
    }
</style>
