<script lang="ts">
    import { onMount } from 'svelte';
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import type { RosterPlayerRecord } from '../../../models/roster.model';

    import { roster } from '../../../store/teamRoster.store';
    import Die from '../../dice/die.svelte';
    import DedicatedFansChange from './dedicatedFansChange.svelte';

    let mvpSelected: string;

    $: scoreDiff =
        $roster.matchDraft.gameEventTally.touchdown -
        $roster.matchDraft.gameEventTally.opponentScore;

    $: result = scoreDiff > 0 ? `Won` : scoreDiff === 0 ? 'Drew' : 'Lost';

    $: filteredPlayers = $roster?.players?.filter(
        (p) => !p.deleted && !p.starPlayer
    );

    function winnings(
        fanFactor: number,
        opponentFanFactor: number,
        touchdowns: number
    ) {
        const winnings =
            10000 * ((fanFactor + opponentFanFactor) / 2 + touchdowns);
        return winnings || 0;
    }

    function playerShort(player: RosterPlayerRecord) {
        return (
            player.alterations.playerNumber +
            ' ' +
            (player.playerName || player.player.position)
        );
    }

    function selectMvp() {
        const player = $roster.players.find((p) => p.playerId === mvpSelected);
        $roster.matchDraft.playingCoach.mvp = {
            id: mvpSelected,
            number: player.alterations.playerNumber,
            name: player.playerName || player.player.position,
        };
    }
    function randomMvp(event) {
        const diceResult = event.detail.result;
        mvpSelected = filteredPlayers[diceResult - 1].playerId;
        selectMvp();
    }

    onMount(() => {
        roster.updateDraftEventTotals();
        mvpSelected = $roster.matchDraft?.playingCoach?.mvp?.id;
        if (!$roster.matchDraft.playingCoach.winnings) {
            $roster.matchDraft.playingCoach.winnings = winnings(
                $roster.matchDraft.playingCoach.fanFactor,
                $roster.matchDraft.opponentCoach.fanFactor,
                $roster.matchDraft.gameEventTally.touchdown
            );
        }
        if ($roster.matchDraft.playingCoach.leaguePoints === 0) {
            if (result === 'Won')
                $roster.matchDraft.playingCoach.leaguePoints = 3;
            if (result === 'Drew')
                $roster.matchDraft.playingCoach.leaguePoints = 1;
        }
    });
</script>

<div
    class="post-game"
    in:slide|local={{ duration: 300, easing: quadInOut }}
    out:slide|local={{ duration: 300, easing: quadInOut }}
>
    <div class="boxed-div">
        <label for="winnings">Winnings</label>
        <input
            type="number"
            bind:value={$roster.matchDraft.playingCoach.winnings}
        />
    </div>

    <div class="boxed-div">
        <label for="league-points">League Points</label>
        <input
            type="number"
            id="league-points"
            name="league-points"
            bind:value={$roster.matchDraft.playingCoach.leaguePoints}
        />
    </div>
    <DedicatedFansChange {result} />
    {#if $roster.format !== 'sevens' && $roster.mode === 'league' && filteredPlayers.length > 0}
        <div class="boxed-div">
            <label for="choose-mvp">MVP</label>
            <select
                id="choose-mvp"
                name="choose-mvp"
                bind:value={mvpSelected}
                on:change={selectMvp}
            >
                {#each filteredPlayers as p}
                    <option value={p.playerId}> {playerShort(p)}</option>
                {/each}
            </select>
            <Die
                faces={filteredPlayers.length}
                defaultDisplay="Random MVP"
                on:rolled={randomMvp}
            />
        </div>
    {/if}
    <div class="boxed-div notes-box">
        <label for="notes">Notes</label>
        <textarea
            name="notes"
            class="notes-area"
            id="notes"
            rows="4"
            maxlength="512"
            bind:value={$roster.matchDraft.notes}
        />
    </div>
</div>

<style lang="scss">
    .notes-area {
        width: 100%;
    }
    label {
        margin-bottom: 4px;
    }
    .post-game {
        margin: 16px 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        .notes-box {
            grid-column-start: span 2;
        }
        select {
            background-color: white;
        }
        @media screen and (max-width: 600px) {
            grid-template-columns: 1fr;
            .notes-box {
                grid-column-start: 1;
            }
        }
    }
</style>
