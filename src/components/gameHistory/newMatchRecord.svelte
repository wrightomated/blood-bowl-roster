<script lang="ts">
    import { matchHistoryRecordDraft } from '../../store/matchHistoryRecordDraft.store';
    import { onMount } from 'svelte';
    import GameDetails from './individualControls/gameDetails.svelte';
    import PreGameCalculations from './individualControls/preGameCalculations.svelte';
    onMount(() => {
        document.getElementById('coach-name')?.focus();
    });
    let opponentScore = 0;
    let playerScore = 0;
    ``;
    $: result =
        playerScore === opponentScore
            ? 'Draw'
            : playerScore > opponentScore
            ? 'Win'
            : 'Loss';

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
        <GameDetails />
        <PreGameCalculations />
        <h3>Other</h3>

        <div class="digits">
            <div class="label-input">
                <label for="casualties">Casualties:</label>
                <input
                    type="number"
                    name="casualties"
                    id="casualties"
                    value="0"
                    min="0"
                    max="999"
                />
            </div>
            <div class="label-input">
                <label for="touchdowns">Touchdowns:</label>
                <input
                    type="number"
                    name="touchdowns"
                    id="touchdowns"
                    value="0"
                    min="0"
                    max="999"
                />
            </div>
            <div class="label-input">
                <label for="passes">Passes:</label>
                <input
                    type="number"
                    name="passes"
                    id="passes"
                    value="0"
                    min="0"
                    max="999"
                />
            </div>
            <div class="label-input">
                <label for="kills">Kills:</label>
                <input
                    type="number"
                    name="kills"
                    id="kills"
                    value="0"
                    min="0"
                    max="999"
                />
            </div>
        </div>

        <label for="new-ctv">New Current Team Value</label>
        <input type="number" id="new-ctv" autocomplete="off" />

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

        <label for="winnings">Winnings</label>
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
        />

        <button on:click={addMatch}>Add</button>
    </form>
</section>

<style lang="scss">
    .new-match {
        // width: 90vw;
        &__form {
            display: flex;
            flex-direction: column;
            // gap: 16px;
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
    // input,
    // select {
    //     margin-bottom: 12px;
    // }
</style>
