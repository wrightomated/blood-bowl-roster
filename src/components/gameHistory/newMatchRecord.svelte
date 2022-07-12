<script lang="ts">
    import { inducementData } from '../../data/inducements.data';

    import { roster } from '../../store/teamRoster.store';

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
    <label for="opponent">Opponent:</label>
    <input type="text" id="opponent" />

    <label for="was-league-match">League Match:</label>
    <input type="checkbox" name="was-league-match" id="was-league-match" />

    <label for="fan-factor">Fan Factor:</label>
    <input
        type="number"
        id="fan-factor"
        value={$roster.extra['dedicated_fans'] || 0}
    />

    <label for="petty-cash">Petty Cash</label>
    <input type="text" id="petty-cash" />

    <label for="inducements-hired">Inducements Hired</label>
    <div>{inducements.join(', ')}</div>

    <label for="new-ctv">New Current Team Value</label>
    <input type="number" id="new-ctv" />

    <label for="result">Result:</label>
    <select name="" id="">
        <option value="u">-----</option>
        <option value="w">Win</option>
        <option value="l">Loss</option>
        <option value="d">Drawer</option>
    </select>

    <label for="score">Result:</label>
    <input type="number" name="player-score" id="" /> -
    <input type="number" name="opponent-score" />

    <label for="winnings">Winnings</label>
    <input type="number" name="winnings" id="winnings" autocomplete="off" />
    <label for="league-points">League Points</label>
    <input type="number" id="league-points" name="league-points" />

    <label for="notes">Notes</label>
    <textarea name="notes" id="notes" cols="30" rows="10" />
    <p>Optional</p>

    <label for="casualties">Casualties</label>
    <input type="number" name="casualties" id="casualties" />

    <label for="touchdowns">Touchdowns</label>
    <input type="number" name="touchdowns" id="touchdowns" />

    <label for="passes">Passes</label>
    <input type="number" name="passes" id="passes" />

    <label for="kills">kills</label>
    <input type="number" name="kills" id="kills" />
</form>
