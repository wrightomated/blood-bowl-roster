<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';

    const numberFormat = new Intl.NumberFormat();

    const noEmptyTreasury = () => {
        editTreasury = !editTreasury;
        if (!$roster.treasury && $roster.treasury !== 0) {
            roster.updateTreasury(0);
        }
    };

    let editTreasury = false;

    const toggleNumber = () => {
        editTreasury = !editTreasury;
    };
</script>

<div class="treasury__container">
    {#if !editTreasury}
        <div on:click={toggleNumber} on:focus={toggleNumber} tabindex="0">
            {numberFormat.format($roster.treasury)}{$roster.treasury === 0
                ? ''
                : ',000'}
        </div>
    {:else}
        <input
            aria-label="treasury"
            bind:value={$roster.treasury}
            type="number"
            inputmode="numeric"
            class="treasury__input"
            autofocus
            on:blur={() => noEmptyTreasury()}
            use:blurOnEscapeOrEnter
        />
    {/if}
</div>

<style lang="scss">
    .treasury {
        &__container {
            min-width: 150px;
            div {
                font-style: italic;
            }
        }
        &__input {
            border: none;
            text-align: center;
            width: 100px;
            padding: 0;
            font-size: 16px;

            &:focus {
                border: none;
            }
        }
    }
</style>
