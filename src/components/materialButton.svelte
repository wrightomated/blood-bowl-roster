<script lang="ts">
    export let symbol: string;
    export let clickFunction: Function;
    export let hoverText: string;
</script>

<button
    class="symbol-control"
    on:click={() => clickFunction()}
    title={hoverText}><i class="material-icons">{symbol}</i></button
>

<style lang="scss">
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
    }
    @media print {
        button {
            display: none;
        }
    }
</style>
