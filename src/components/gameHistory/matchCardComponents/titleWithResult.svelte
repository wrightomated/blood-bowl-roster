<script lang="ts">
    import { formatNumber } from '../../../helpers/formatTotalToThousands';

    export let title: string;
    export let result: number | string;
    export let background: 'none' | 'main' | 'secondary' | 'neutral' =
        'neutral';

    export let clickFunction = undefined;

    $: formattedResult =
        typeof result === 'number' ? formatNumber(result) : result;
</script>

{#if clickFunction}
    <button
        class="container container--clickable {background} "
        on:click={clickFunction}
    >
        <p>{title}</p>
        <p class="result">{formattedResult}</p>
    </button>
{:else}
    <div class="container {background}">
        <p>{title}</p>
        <p class="result">{formattedResult}</p>
    </div>
{/if}

<style lang="scss">
    .container {
        flex: 1;
        text-align: center;
        border-radius: 12px;
        padding: 12px;

        &.neutral {
            background-color: var(--secondary-background-colour);
        }
        &.main {
            background-color: var(--main-colour);
            color: white;
        }
        &.secondary {
            background-color: var(--secondary-colour);
            color: white;
        }
        p {
            margin-block-start: 0;
            margin-block-end: 0;

            &:first-child {
                text-transform: capitalize;
            }
        }

        &--clickable {
            cursor: pointer;
            border: none;
        }

        .result {
            font-size: 20px;
            font-family: var(--display-font);
        }
    }
</style>
