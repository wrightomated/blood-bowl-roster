<script lang="ts">
    import { matchHistorySteps } from '../../store/matchHistorySteps.store';
</script>

<section class="new-match">
    <header>
        <h2>New Match</h2>
        <p>All fields are optional</p>
    </header>

    <form
        class="new-match__form"
        on:submit|preventDefault={(e) => {
            e.preventDefault;
        }}
    >
        {#each $matchHistorySteps as step, i}
            <div class="step step--{step.status}">
                <div class="step-title">
                    <i
                        class="material-symbols-outlined checkmark checkmark--{step.status}"
                        >{step.status === 'complete'
                            ? 'check_circle'
                            : 'circle'}</i
                    >
                    <h3 on:click={() => matchHistorySteps.goToStep(i)}>
                        {step.title}
                    </h3>
                </div>
                {#if step.status === 'current'}
                    <div class="component-container">
                        <svelte:component this={step.component} />
                    </div>
                {/if}
            </div>
        {/each}

        <div class="button-container">
            {#if !$matchHistorySteps.find((x, i) => x.status === 'current' && i === 0)}
                <button on:click={matchHistorySteps.previousStep} type="button"
                    >Previous</button
                >
            {/if}

            {#if $matchHistorySteps.find((x) => x.status === 'current')}
                <button
                    class="next-button"
                    on:click={matchHistorySteps.nextStep}
                    type="button">Next</button
                >
            {/if}
        </div>

        <!-- <GameDetails />
        <PreGameCalculations />
        <h3>Other</h3>

        <PlayerEvents /> -->

        <!-- <label for="new-ctv">New Current Team Value</label>
        <input type="number" id="new-ctv" autocomplete="off" /> -->

        <!-- <label for="score">Result:</label>
        <input
            type="number"
            name="player-score"
            min="0"
            id=""
            bind:value={playerScore}
            autocomplete="off"
            max="999"
        />
        -
        <input
            type="number"
            min="0"
            name="opponent-score"
            bind:value={opponentScore}
            autocomplete="off"
            max="999"
        />
        <p>{result}</p> -->

        <!-- <label for="winnings">Winnings</label>
        <input type="number" name="winnings" id="winnings" autocomplete="off" />
        <label for="league-points">League Points</label>
        <input
            type="number"
            id="league-points"
            name="league-points"
            autocomplete="off"
            max="999"
        />

        <label for="notes">Notes</label>
        <textarea
            name="notes"
            id="notes"
            cols="30"
            rows="10"
            maxlength="512"
            bind:value={$matchHistoryRecordDraft.notes}
        /> -->

        <!-- <button on:click={addMatch}>Add</button> -->
    </form>
</section>

<style lang="scss">
    @use '../../styles/mixins/roundedButton';

    .new-match {
        // width: 90vw;
        &__form {
            display: flex;
            flex-direction: column;
            // gap: 16px;
        }
    }
    .step {
        color: var(--neutral);
        &-title {
            display: flex;
            align-items: center;
            gap: 8px;
            h3 {
                margin: 4px 0;
                text-align: center;
            }
        }
        &:not(.step--current) {
            .step-title h3:hover {
                color: var(--secondary-colour);
                cursor: pointer;
            }
        }

        &--current {
            color: #333;
        }
    }

    .label-input {
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .digits {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        // & input {
        //     max-width: 40px;
        // }
    }
    header {
        text-align: center;
    }

    .button-container {
        display: flex;
        margin-top: 16px;

        button {
            @include roundedButton.rounded-button;
            padding: 8px;
            min-width: 80px;
        }

        // .next-button {
        //     margin-left: auto;
        // }
    }
    // input,
    // select {
    //     margin-bottom: 12px;
    // }

    .checkmark {
        color: var(--secondary-colour);
        &--complete {
            animation: tick 250ms ease-in;
            &:hover {
                font-variation-settings: 'FILL' 1;
            }
        }

        &--current,
        &--future {
            font-variation-settings: 'FILL' 0;
            &:hover {
                font-variation-settings: 'FILL' 0;
            }
        }
    }

    @keyframes tick {
        from {
            font-variation-settings: 'FILL' 0;
        }
        to {
            font-variation-settings: 'FILL' 1;
        }
    }
</style>
