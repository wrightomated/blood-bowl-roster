<script lang="ts">
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import { roster } from '../../../store/teamRoster.store';

    $: matchTypeString =
        $roster.mode === 'league' ? 'league match' : 'tournament game';
</script>

<div
    class="game-details"
    in:slide|local={{ duration: 300, easing: quadInOut }}
    out:slide|local={{ duration: 300, easing: quadInOut }}
>
    <div class="game-details-container">
        <div>
            <label for="coach-name">Your Name</label>
            <input
                type="text"
                id="coach-name"
                autocomplete="off"
                bind:value={$roster.matchDraft.playingCoach.name}
            />
        </div>
        <div>
            <label for="opponent">Opponent's Name</label>
            <input
                type="text"
                id="opponent"
                autocomplete="off"
                bind:value={$roster.matchDraft.opponentCoach.name}
            />
        </div>
        <div>
            <label for="opponent">Date of match</label>
            <input
                type="date"
                id="date"
                autocomplete="off"
                bind:value={$roster.matchDraft.time.date}
            />
        </div>
        <div class="league-input">
            <label for="was-league-match">Is this a {matchTypeString}?</label>
            <input
                type="checkbox"
                name="was-league-match"
                id="was-league-match"
                bind:checked={$roster.matchDraft.isLeagueMatch}
            />
        </div>
    </div>
</div>

<style lang="scss">
    .game-details-container {
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
        @media screen and (max-width: 764px) {
            // max-width: 450px;
            flex-direction: column;
            > div {
                align-items: normal;
            }
        }
        .league-input {
            @media screen and (max-width: 764px) {
                flex-direction: row;
                gap: 10px;
                align-items: baseline;
                input[type='checkbox'] {
                    margin-top: 0;
                }
            }
        }
    }
    input[type='checkbox'] {
        transform: scale(2);
        margin-top: 10px;
    }
</style>
