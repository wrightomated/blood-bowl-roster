<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { roster } from '../../store/teamRoster.store';

    export let index: number;
    export let alteration: string;
</script>

{#if $roster.players[index]?.alterations?.[alteration] !== undefined}
    <input
        type="number"
        aria-labelledby="{alteration}-header"
        placeholder="?"
        inputmode="numeric"
        use:blurOnEscapeOrEnter
        bind:value={$roster.players[index].alterations[alteration]}
    />
{:else}0{/if}

<style lang="scss">
    input {
        border: 0;
        border-radius: 0;
        background: none;
        width: 60px;
        text-align: center;
        margin-right: -15px;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
</style>
