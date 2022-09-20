<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { maxPlayerNumber, roster } from '../../store/teamRoster.store';

    export let index: number;
    let playerNumber = index + 1;

    const changeNumber = () => {
        if (
            !Number.isInteger(playerNumber) ||
            playerNumber > maxPlayerNumber ||
            playerNumber < 1
        ) {
            playerNumber = index + 1;
        } else {
            roster.updatePlayerNumber(index, playerNumber);
            playerNumber = index + 1;
        }
    };
</script>

<input
    class="player-number"
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
        width: 30px;
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
    }
</style>
