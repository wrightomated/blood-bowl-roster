<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { roster } from '../../store/teamRoster.store';

    export let index: number;
    export let alteration: string;
    export let player: any = undefined;

    // Use passed player data or fall back to index lookup
    $: rosterPlayer = player || $roster.players[index];
    $: alterationValue = rosterPlayer?.alterations?.[alteration];

    function updateAlteration(value: boolean) {
        // Find the current index in the roster array
        const currentIndex = $roster.players.findIndex(
            (p) => p.playerId === rosterPlayer.playerId
        );
        if (currentIndex >= 0) {
            roster.updatePlayer(
                {
                    ...rosterPlayer,
                    alterations: {
                        ...rosterPlayer.alterations,
                        [alteration]: value,
                    },
                },
                currentIndex
            );
        }
    }
</script>

{#if rosterPlayer?.alterations !== undefined}
    <input
        type="checkbox"
        aria-labelledby="{alteration}-header"
        use:blurOnEscapeOrEnter
        checked={alterationValue}
        on:change={(e) => updateAlteration(e.target.checked)}
    />
{:else}
    -
{/if}
