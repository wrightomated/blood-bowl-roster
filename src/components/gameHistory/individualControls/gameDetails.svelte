<script lang="ts">
    import { quintOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import { matchHistoryRecordDraft } from '../../../store/matchHistoryRecordDraft.store';
</script>

<div
    class="game-details"
    transition:slide|local={{ duration: 500, easing: quintOut }}
>
    <div>
        <label for="coach-name">Your Name</label>
        <input
            type="text"
            id="coach-name"
            autocomplete="off"
            bind:value={$matchHistoryRecordDraft.playingCoach.name}
        />
    </div>
    <div>
        <label for="opponent">Opponent's Name</label>
        <input
            type="text"
            id="opponent"
            autocomplete="off"
            bind:value={$matchHistoryRecordDraft.opponentCoach.name}
        />
    </div>
    <div>
        <label for="opponent">Date of match</label>
        <input
            type="date"
            id="date"
            autocomplete="off"
            bind:value={$matchHistoryRecordDraft.time.date}
        />
    </div>
    <div class="league-input">
        <label for="was-league-match">Is this a league match?</label>
        <input
            type="checkbox"
            name="was-league-match"
            id="was-league-match"
            bind:checked={$matchHistoryRecordDraft.isLeagueMatch}
        />
    </div>
</div>

<style lang="scss">
    .game-details {
        display: flex;
        gap: 8px;
        justify-content: space-around;
        flex-flow: row wrap;
        padding: 16px 0;
        > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            // flex: 2 1 40%;

            input[type='text'],
            input[type='date'] {
                height: 36px;
            }
        }
        @media screen and (max-width: 450px) {
            flex-direction: column;
            > div {
                align-items: normal;
            }
        }
    }
    input[type='checkbox'] {
        transform: scale(2);
        margin-top: 10px;
        @media screen and (max-width: 450px) {
            // width: 50%;
        }
    }
    .league-input {
        @media screen and (max-width: 450px) {
        }
    }
</style>
