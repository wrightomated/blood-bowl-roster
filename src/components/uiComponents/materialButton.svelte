<script lang="ts">
    export let symbol: string;
    export let clickFunction: Function;
    export let hoverText: string;
    export let cyData: string = undefined;
    export let pushRight: boolean = undefined;
</script>

<button
    class="symbol-control"
    class:pushRight
    on:click={() => clickFunction()}
    data-cy={cyData}
    title={hoverText}><i class="material-symbols-outlined">{symbol}</i></button
>

<style lang="scss">
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        height: 24px;
        font: inherit;
        cursor: pointer;
    }
    .pushRight {
        margin-left: auto;
    }
    @media print {
        button {
            display: none;
        }
    }
</style>
