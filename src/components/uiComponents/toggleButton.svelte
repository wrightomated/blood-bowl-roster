<script lang="ts">
    import { _ } from 'svelte-i18n';

    export let options: string[];
    export let selected: Function;
    export let selectedIndex: number = 0;
</script>

<div class="toggle">
    {#each options as option, index}
        <button
            class="toggle__button"
            type="button"
            class:toggle__button--selected={index === selectedIndex}
            on:click={() => {
                selectedIndex = index;
                selected(option);
            }}
        >
            {$_(option)}
        </button>
    {/each}
</div>

<style lang="scss">
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        transition: background-color 100ms linear;
    }

    .toggle {
        display: inline-block;
        border-radius: 12px;
        background-color: white;
        margin: 4px;
        border: var(--secondary-border);

        &__button {
            padding: 10px;
            color: var(--secondary-colour);
            border-right: 1px solid var(--secondary-colour);
            border-radius: 0;
            text-transform: capitalize;
            margin: 0;

            &--selected,
            &:hover {
                background-color: var(--secondary-colour);
                color: white;
                border-color: var(--secondary-colour);
            }
            &:hover {
                box-shadow: 0 5px 15px var(--button-shadow) inset;
            }

            &:first-child {
                border-radius: 5px 0 0 5px;
            }

            &:last-child {
                border-right: 0;
                border-radius: 0 5px 5px 0;
            }
        }
    }
    @media print {
        .toggle {
            display: none;
        }
    }
</style>
