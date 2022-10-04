<script lang="ts">
    import { balls } from '../../../data/ball.data';
    import { matchHistoryRecordDraft } from '../../../store/matchHistoryRecordDraft.store';
    import FanFactorCalc from './fanFactorCalc.svelte';

    import PettyCash from './pettyCash.svelte';
    import StadiaControl from './stadiaControl.svelte';
    import WeatherControl from './weatherControl.svelte';
</script>

<div class="pre-game">
    <h3>Pre-Game Calculations</h3>
    <FanFactorCalc />

    <PettyCash />

    <WeatherControl />

    <StadiaControl />

    <!-- <label for="ball">Ball</label>
    <select name="ball" id="ball">
        {#each balls as ball}
            <option value={ball.id}>{ball.ballName}</option>
        {/each}
    </select> -->

    <!-- <label for="stadium">Stadium</label>
    <input type="text" name="stadium" id="stadium" /> -->
</div>
