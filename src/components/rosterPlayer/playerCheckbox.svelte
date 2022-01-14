<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { roster } from '../../store/teamRoster.store';

    export let index: number;
    export let alteration: string;
</script>

{#if $roster.players[index].alterations !== undefined}
    <input
        type="checkbox"
        aria-labelledby="{alteration}-header"
        use:blurOnEscapeOrEnter
        bind:checked={$roster.players[index].alterations[alteration]}
    />
{:else}
    -
{/if}
