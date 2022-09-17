<script lang="ts">
    import { balls } from '../../data/ball.data';

    import { inducementData } from '../../data/inducements.data';
    import { weatherTables } from '../../data/weatherData.data';
    import {
        inducementAndStarsInRoster,
        inducementsSummary,
    } from '../../store/currentInducements.store';

    import { roster } from '../../store/teamRoster.store';
    let opponentScore = 0;
    let playerScore = 0;
    ``;
    $: result =
        playerScore === opponentScore
            ? 'Draw'
            : playerScore > opponentScore
            ? 'Win'
            : 'Loss';

    function addMatch() {
        roster.addMatch();
    }

    const tables = weatherTables;
</script>

<section class="new-match">
    <h2>New Match</h2>

    <form class="new-match__form">
        <label for="opponent">Opponent:</label>
        <input type="text" id="opponent" autocomplete="off" />

        <label for="opponent">Date:</label>
        <input type="date" id="date" autocomplete="off" />

        <div class="label-input">
            <label for="was-league-match">League Match:</label>
            <input
                type="checkbox"
                name="was-league-match"
                id="was-league-match"
            />
        </div>

        <label for="fan-factor">Fan Factor:</label>
        <input
            type="number"
            id="fan-factor"
            value={$roster.extra['dedicated_fans'] || 0}
            autocomplete="off"
        />

        <label for="petty-cash">Petty Cash</label>
        <input type="number" autocomplete="off" id="petty-cash" />

        <label for="inducements-hired">Inducements Hired</label>
        <p>{$inducementsSummary.join(', ')}</p>
        <p>{JSON.stringify($inducementAndStarsInRoster)}</p>

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
        />
        -
        <input
            type="number"
            min="0"
            name="opponent-score"
            bind:value={opponentScore}
            autocomplete="off"
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

        <label for="weather">Weather</label>
        <select name="weather" id="weather">
            {#each tables as table}
                <option value={table.type}>{table.type}</option>
            {/each}
        </select>
        <label for="ball">Ball</label>
        <select name="ball" id="ball">
            {#each balls as ball}
                <option value={ball.id}>{ball.ballName}</option>
            {/each}
        </select>

        <label for="stadium">Stadium</label>
        <input type="text" name="stadium" id="stadium" />

        <label for="notes">Notes</label>
        <textarea name="notes" id="notes" cols="30" rows="10" />

        <button on:click={addMatch}>Add</button>
    </form>
</section>

<style lang="scss">
    .new-match {
        &__form {
            display: grid;
        }
    }
    // input {
    //     border: 0;
    //     border-radius: 0;
    //     background: none;
    //     font-size: 16px;
    // }
    .label-input {
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .digits {
        display: flex;
        gap: 8px;

        & input {
            max-width: 40px;
        }
    }
    select[name='weather'] {
        option {
            text-transform: capitalize;
        }
    }
</style>
