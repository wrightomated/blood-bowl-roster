<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { roster } from '../../store/teamRoster.store';

    export let index: number;
    export let alteration: string;
    export let player: any = undefined;

    // Use passed player data or fall back to index lookup
    $: rosterPlayer = player || $roster.players[index];
    $: alterationValue = rosterPlayer?.alterations?.[alteration];

    function updateAlteration(value: number) {
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

{#if rosterPlayer?.alterations?.[alteration] !== undefined}
    <input
        type="number"
        aria-labelledby="{alteration}-header"
        placeholder="?"
        inputmode="numeric"
        use:blurOnEscapeOrEnter
        value={alterationValue}
        on:input={(e) => updateAlteration(parseInt(e.target.value) || 0)}
    />
{:else}-{/if}

<style lang="scss">
    input {
        border: 0;
        border-radius: 0;
        background: none;
        width: 60px;
        text-align: center;
        margin-right: -15px;
        font-style: italic;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
</style>
