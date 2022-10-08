<script lang="ts">
    import {
        matchHistoryRecordDraft,
        matchHistorySteps,
    } from '../../store/matchHistoryRecordDraft.store';
    import { onMount } from 'svelte';
    import GameDetails from './individualControls/gameDetails.svelte';
    import PreGameCalculations from './individualControls/preGameCalculations.svelte';
    import PlayerEvents from './playerEvents.svelte';
    import { newMatchRecordSteps } from '../../data/matchHistorySteps.data';
    onMount(() => {
        document.getElementById('coach-name')?.focus();
    });

    function addMatch(e) {
        e.preventDefault;
        // roster.addMatch();
    }
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
        {#each $matchHistorySteps as step}
            <div class="step step--{step.status}">
                <div class="step-title">
                    <h3>{step.title}</h3>
                    {#if step.status === 'complete'}
                        <i class="material-symbols-outlined checkmark"
                            >check_circle</i
                        >
                    {/if}
                </div>
                {#if step.status === 'current'}
                    <svelte:component this={step.component} />
                {/if}
            </div>
        {/each}

        <div class="button-container">
            <button on:click={matchHistorySteps.previousStep} type="button"
                >Previous</button
            >
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
        &-title {
            display: flex;
            align-items: center;
            gap: 8px;
            h3 {
                margin: 0;
            }
        }

        &--future {
            color: var(--neutral);
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
        animation: tick 100ms ease-in;

        &:hover {
            font-variation-settings: 'FILL' 1;
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
