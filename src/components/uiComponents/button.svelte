<script lang="ts">
    export let clickFunction: Function = () => {};
    export let cyData: string = undefined;
    export let cancel: boolean = false;
    export let selected: boolean = false;
    export let disabled: boolean = false;
</script>

<button
    class="button"
    class:cancel
    class:selected
    {disabled}
    on:click={() => clickFunction()}
    data-cy={cyData}><slot /></button
>

<style lang="scss">
    .button {
        border-radius: 10px;
        background-color: white;
        color: var(--secondary-colour);
        padding: 10px;
        margin: 4px;
        border: 2px solid var(--secondary-colour);

        &:hover,
        &.selected {
            background-color: var(--secondary-colour);
            color: white;
            border-color: var(--secondary-colour);
            &:disabled {
                background-color: white;
                color: grey;
                border: none;
            }
        }
        &:disabled {
            border: none;
            color: grey;
        }

        &.cancel {
            color: var(--main-colour);
            border-color: var(--main-colour);

            &:hover {
                color: white;
                background-color: var(--main-colour);
            }
        }
    }
</style>
