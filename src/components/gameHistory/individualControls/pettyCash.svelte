<script lang="ts">
    import { roster } from '../../../store/teamRoster.store';

    roster;
</script>

<div class="petty-cash">
    <!-- <div>
        <label for="your-tv">Your TV</label>
        <input type="number" name="your-tv" id="your-tv" autocomplete="off" />
    </div>
    <div>
        <label for="op-tv">Opponent TV</label>
        <input type="number" name="op-tv" id="op-tv" autocomplete="off" />
    </div> -->

    <label for="petty-cash">Petty Cash</label>
    <input
        type="number"
        autocomplete="off"
        id="petty-cash"
        step="1000"
        bind:value={$roster.matchDraft.playingCoach.pettyCash}
    />
</div>

<style>
    .petty-cash {
        margin-top: 16px;
    }
    label {
        margin-bottom: 4px;
    }
</style>
