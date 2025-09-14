<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { MAX_PLAYER_NUMBER, roster } from '../../store/teamRoster.store';

    export let index: number;
    export let variant: 'default' | 'card' = 'default';
    export let player: any = undefined;

    // Use passed player data or fall back to index lookup
    $: rosterPlayer = player || $roster.players[index];
    let playerNumber = rosterPlayer?.alterations?.playerNumber;

    const changeNumber = () => {
        if (
            !Number.isInteger(playerNumber) ||
            playerNumber > MAX_PLAYER_NUMBER ||
            playerNumber < 0
        ) {
            playerNumber = rosterPlayer?.alterations?.playerNumber;
        } else {
            // Find the current index in the roster array
            const currentIndex = $roster.players.findIndex(
                (p) => p.playerId === rosterPlayer.playerId
            );
            if (currentIndex >= 0) {
                roster.updatePlayerNumber(currentIndex, playerNumber);
            }
        }
    };

    // Only update local playerNumber when rosterPlayer changes from external source
    // but don't interfere with user typing
    let lastRosterPlayerNumber = rosterPlayer?.alterations?.playerNumber;
    $: if (rosterPlayer?.alterations?.playerNumber !== lastRosterPlayerNumber) {
        lastRosterPlayerNumber = rosterPlayer?.alterations?.playerNumber;
        playerNumber = rosterPlayer?.alterations?.playerNumber;
    }
</script>

<input
    class="player-number player-number--{variant}"
    aria-label="Player Number"
    type="number"
    inputmode="numeric"
    min="0"
    max={MAX_PLAYER_NUMBER}
    on:blur={changeNumber}
    bind:value={playerNumber}
    use:blurOnEscapeOrEnter
/>

<style lang="scss">
    input {
        border: 0;
        border-radius: 0;
        background: none;
        margin-bottom: 0;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
    .player-number {
        text-align: center;
        font-style: italic;
        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        /* Firefox */
        &[type='number'] {
            -moz-appearance: textfield;
        }

        &--card {
            font-style: normal;
            width: 25px;
            line-height: 25px;
            border-radius: 50%;
            font-family: var(--display-font);
            right: 10px;
            top: 10px;
            background-color: var(--secondary-compliment);
            color: var(--secondary-colour);
            position: absolute;
            padding: 0;
        }
    }
</style>
