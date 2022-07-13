<script lang="ts">
    import { inducementData } from '../../data/inducements.data';

    import { roster } from '../../store/teamRoster.store';
    $: opponentScore = 0;
    $: playerScore = 0;
    ``;
    $: result =
        playerScore === opponentScore
            ? 'Drawer'
            : playerScore > opponentScore
            ? 'Win'
            : 'Loss';
    $: inducements = Object.entries($roster.inducements).map(
        ([key, number]) => {
            return (
                (number > 1 ? `${number} x ` : ``) +
                inducementData.inducements.find((i) => i.id === key).displayName
            );
        }
    );
</script>

<h2>New Match</h2>

<form>
    <div class="label-input">
        <label for="opponent">Opponent:</label>
        <input type="text" id="opponent" />
    </div>

    <div class="label-input">
        <label for="was-league-match">League Match:</label>
        <input type="checkbox" name="was-league-match" id="was-league-match" />
    </div>

    <label for="fan-factor">Fan Factor:</label>
    <input
        type="number"
        id="fan-factor"
        value={$roster.extra['dedicated_fans'] || 0}
    />

    <label for="petty-cash">Petty Cash</label>
    <input type="text" id="petty-cash" />

    <label for="inducements-hired">Inducements Hired</label>
    <p>{inducements.join(', ')}</p>

    <label for="new-ctv">New Current Team Value</label>
    <input type="number" id="new-ctv" />

    <!-- <label for="result">Result:</label>
    <select name="" id="">
        <option value="u">-----</option>
        <option value="w">Win</option>
        <option value="l">Loss</option>
        <option value="d">Drawer</option>
    </select> -->

    <label for="score">Result:</label>
    <input type="number" name="player-score" id="" bind:value={playerScore} /> -
    <input type="number" name="opponent-score" bind:value={opponentScore} />
    <p>{result}</p>

    <label for="winnings">Winnings</label>
    <input type="number" name="winnings" id="winnings" autocomplete="off" />
    <label for="league-points">League Points</label>
    <input type="number" id="league-points" name="league-points" />

    <label for="notes">Notes</label>
    <textarea name="notes" id="notes" cols="30" rows="10" />

    <div class="digits">
        <div class="label-input">
            <label for="casualties">Casualties:</label>
            <input type="number" name="casualties" id="casualties" value="0" />
        </div>
        <div class="label-input">
            <label for="touchdowns">Touchdowns:</label>
            <input type="number" name="touchdowns" id="touchdowns" value="0" />
        </div>
        <div class="label-input">
            <label for="passes">Passes:</label>
            <input type="number" name="passes" id="passes" value="0" />
        </div>
        <div class="label-input">
            <label for="kills">Kills:</label>
            <input type="number" name="kills" id="kills" value="0" />
        </div>
    </div>

    <label for="weather">Weather</label>
    <input type="text" name="weather" id="weather" />
    <label for="ball">Ball</label>
    <input type="text" name="ball" id="ball" />
    <label for="stadium">Stadium</label>
    <input type="text" name="stadium" id="stadium" />
</form>

<style lang="scss">
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
</style>
