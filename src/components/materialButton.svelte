<script lang="ts">
    export let symbol: string;
    export let clickFunction: Function;
</script>

<style lang="scss">
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
    }
</style>

<button class="symbol-control" on:click={() => clickFunction()}><i
        class="material-icons">{symbol}</i></button>
