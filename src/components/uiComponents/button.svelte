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
    @use "../../styles/mixins/roundedButton";
    .button {
        @include roundedButton.rounded-button;
    }
</style>
