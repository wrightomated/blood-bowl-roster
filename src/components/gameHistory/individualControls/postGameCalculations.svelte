<script lang="ts">
    import { onMount } from 'svelte';
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import { filterStarPlayers } from '../../../helpers/starPlayerFilter';
    import type { RosterPlayerRecord } from '../../../models/roster.model';
    import { modalState } from '../../../store/modal.store';
    // import { modalState } from '../../../store/modal.store';
    import { roster } from '../../../store/teamRoster.store';
    import Die from '../../dice/die.svelte';
    import Button from '../../uiComponents/button.svelte';
    import SaveMatchHistory from '../saveMatchHistory.svelte';

    let yourFanCalc: HTMLElement;
    let roll: number;
    let changeDedicatedFans: number = 0;
    let mvpSelected: string;

    $: scoreDiff =
        $roster.matchDraft.gameEventTally.touchdown -
        $roster.matchDraft.gameEventTally.opponentScore;

    $: result = scoreDiff > 0 ? `Won` : scoreDiff === 0 ? 'Drew' : 'Lost';

    $: filteredPlayers = $roster?.players?.filter(
        (p) => !p.deleted || !p.starPlayer
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
    function yourRoll(event) {
        const diceResult = event.detail.result;
        roll = event.detail.result;
        if (result === 'Won' && diceResult >= $roster.extra.dedicated_fans) {
            changeDedicatedFans = 1;
        }
        if (result === 'Lost' && diceResult < $roster.extra.dedicated_fans) {
            changeDedicatedFans = -1;
        }
    }
    function uploadMatchHistory() {
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: false,
            component: SaveMatchHistory,
        });
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
    class="post-game-calculations"
    in:slide|local={{ duration: 300, easing: quadInOut }}
    out:slide|local={{ duration: 300, easing: quadInOut }}
>
    <!-- TODO: forfeit toggle -->
    <div>
        <!-- <h3>You {result}!</h3> -->
        <div>
            <label for="winnings">Winnings</label>
            <input
                type="number"
                bind:value={$roster.matchDraft.playingCoach.winnings}
            />
        </div>
        <!-- <div>
            Opponent Winnings: {formatNumber(opponentWinnings)}
        </div> -->
        <!-- <input
            type="number"
            name="dedicated-fans-change"
            id="dedicated-fans-change"
        /> -->
        <div>
            <label for="dedicated-fans-change">Dedicated Fans</label>
            {#if result !== 'Drew'}
                <span bind:this={yourFanCalc}>
                    {$roster.extra.dedicated_fans}
                    <!-- {result === 'Won' ? '+' : '-'} -->
                    <input
                        type="number"
                        id="fair-weather-fans"
                        aria-label="fair weather fans"
                        max="6"
                        min="1"
                        autocomplete="off"
                        bind:value={roll}
                    />
                    <Die faces={6} on:rolled={yourRoll} /> =
                </span>
                <!-- <input
                    type="number"
                    id="your-fan-factor"
                    max="10"
                    min="2"
                    bind:value={$roster.matchDraft.playingCoach.fanFactor}
                    autocomplete="off"
                    on:change={() => makeTransparent(yourFanCalc)}
                /> -->
            {:else}
                No change.
            {/if}
        </div>
        <label for="league-points">League Points</label>
        <input
            type="number"
            id="league-points"
            name="league-points"
            bind:value={$roster.matchDraft.playingCoach.leaguePoints}
        />
        {#if filteredPlayers.length > 0}
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
        {/if}
        <label for="notes">Notes</label>
        <textarea
            name="notes"
            id="notes"
            cols="30"
            rows="10"
            maxlength="512"
            bind:value={$roster.matchDraft.notes}
        />
        <div>Award star player points</div>
        <Button clickFunction={uploadMatchHistory}>Upload</Button>
    </div>
</div>
