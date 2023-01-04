<script lang="ts">
    import { roster } from '../../../store/teamRoster.store';
    function updatePettyCash(event) {
        roster.setPettyCash(event.target.value);
    }
</script>

<div class="petty-cash-box boxed-div">
    <label for="petty-cash">Petty Cash</label>
    <input
        type="number"
        autocomplete="off"
        id="petty-cash"
        step="1000"
        min="0"
        max="9999999"
        bind:value={$roster.matchDraft.playingCoach.pettyCash}
        on:change={updatePettyCash}
    />
</div>

<style>
    .boxed-div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    label {
        margin-bottom: 4px;
    }
</style>
