<script lang="ts">
    import { balls } from '../../data/ball.data';
    import { currentUserStore } from '../../store/currentUser.store';

    import { inducementData } from '../../data/inducements.data';
    import { weatherTables } from '../../data/weatherData.data';
    import {
        inducementAndStarsInRoster,
        inducementsSummary,
    } from '../../store/currentInducements.store';

    import { roster } from '../../store/teamRoster.store';
    import WeatherControl from './individualControls/weatherControl.svelte';
    import PettyCash from './individualControls/pettyCash.svelte';
    import { matchHistoryRecordDraft } from '../../store/matchHistoryRecordDraft.store';
    import { onMount } from 'svelte';
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
        <label for="coach-name">Your Coach Name:</label>
        <input
            type="text"
            id="coach-name"
            autocomplete="off"
            bind:value={$matchHistoryRecordDraft.playingCoach.name}
        />

        <label for="opponent">Opponent Coach Name:</label>
        <input
            type="text"
            id="opponent"
            autocomplete="off"
            bind:value={$matchHistoryRecordDraft.opponentCoach.name}
        />

        <label for="opponent">Date of match:</label>
        <input
            type="date"
            id="date"
            autocomplete="off"
            bind:value={$matchHistoryRecordDraft.time.date}
        />

        <div class="label-input">
            <label for="was-league-match">League Match:</label>
            <input
                type="checkbox"
                name="was-league-match"
                id="was-league-match"
                bind:checked={$matchHistoryRecordDraft.isLeagueMatch}
            />
        </div>

        <label for="fan-factor">Fan Factor:</label>
        <input
            type="number"
            id="fan-factor"
            max="10"
            min="0"
            bind:value={$matchHistoryRecordDraft.playingCoach.fanFactor}
            autocomplete="off"
        />
        <PettyCash
            bind:value={$matchHistoryRecordDraft.playingCoach.pettyCash}
        />

        <label for="new-ctv">New Current Team Value</label>
        <input type="number" id="new-ctv" autocomplete="off" />

        <label for="score">Result:</label>
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
        <p>{result}</p>

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

        <div class="digits">
            <div class="label-input">
                <label for="casualties">Casualties:</label>
                <input
                    type="number"
                    name="casualties"
                    id="casualties"
                    value="0"
                    min="0"
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
                />
            </div>
        </div>
        <WeatherControl />

        <label for="ball">Ball</label>
        <select name="ball" id="ball">
            {#each balls as ball}
                <option value={ball.id}>{ball.ballName}</option>
            {/each}
        </select>

        <label for="stadium">Stadium</label>
        <input type="text" name="stadium" id="stadium" />

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
            // display: flex;
            // flex-direction: column;
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

        & input {
            max-width: 40px;
        }
    }
    header {
        text-align: center;
    }
    // input,
    // select {
    //     margin-bottom: 12px;
    // }
    input[type='checkbox'] {
        transform: scale(1.5);
    }
</style>
