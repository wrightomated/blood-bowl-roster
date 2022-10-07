<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { maxPlayerNumber, roster } from '../../store/teamRoster.store';

    export let index: number;
    export let variant: 'default' | 'card';
    let playerNumber = updatePlayerNumber();

    const changeNumber = () => {
        if (
            !Number.isInteger(playerNumber) ||
            playerNumber > maxPlayerNumber ||
            playerNumber < 1
        ) {
            playerNumber = updatePlayerNumber();
        } else {
            roster.updatePlayerNumber(index, playerNumber);
        }
    };

    // TODO: reactive solution for this
    roster.subscribe((x) => (playerNumber = updatePlayerNumber()));

    function updatePlayerNumber() {
        return $roster.players[index]?.alterations?.playerNumber;
    }
</script>

<input
    class="player-number player-number--{variant}"
    aria-label="Player Number"
    type="number"
    inputmode="numeric"
    min="1"
    max={maxPlayerNumber}
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
            background-color: white;
            color: var(--secondary-colour);
            position: absolute;
            padding: 0;
        }
    }
</style>
