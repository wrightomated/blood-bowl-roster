<script lang="ts">
    import { onMount } from 'svelte';
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import type { RosterPlayerRecord } from '../../../models/roster.model';

    import { roster } from '../../../store/teamRoster.store';
    import Die from '../../dice/die.svelte';
    import ToggleButton from '../../uiComponents/toggleButton.svelte';
    import DedicatedFansChange from './dedicatedFansChange.svelte';

    let mvpSelected: string;

    $: scoreDiff =
        $roster.matchDraft.gameEventTally.touchdown -
        $roster.matchDraft.gameEventTally.opponentScore;

    let result: 'Won' | 'Lost' | 'Drew';
    $: result =
        $roster.matchDraft.concession === 'player' || scoreDiff < 0
            ? `Lost`
            : $roster.matchDraft.concession === 'opponent' || scoreDiff > 0
            ? 'Won'
            : 'Drew';

    $: filteredPlayers = $roster?.players?.filter(
        (p) => !p.deleted && !p.starPlayer
    );

    const concessionOptions = ['none', 'player', 'opponent'];
    $: concessionOption = $roster.matchDraft.concession ?? concessionOptions[0];

    function winnings(
        fanFactor: number,
        opponentFanFactor: number,
        touchdowns: number,
        concession?: 'player' | 'opponent' | 'none'
    ) {
        if (concession === 'player') return 0;
        const denominator = concession === 'opponent' ? 1 : 2;
        const winnings =
            10000 *
            ((fanFactor + opponentFanFactor) / denominator + touchdowns);
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
            number: player?.alterations?.playerNumber,
            name: player.playerName || player.player.position,
        };
    }
    function randomMvp(event) {
        const diceResult = event.detail.result;
        mvpSelected = filteredPlayers[diceResult - 1].playerId;
        selectMvp();
    }

    function concession(concession: string) {
        if (concession === 'player') {
            $roster.matchDraft.concession = 'player';
            $roster.matchDraft.playingCoach.winnings = 0;
            delete $roster.matchDraft.playingCoach.mvp;
        } else if (concession === 'opponent') {
            $roster.matchDraft.concession = 'opponent';
        } else {
            $roster.matchDraft.concession = 'none';
        }
        $roster.matchDraft.playingCoach.winnings = winnings(
            $roster.matchDraft.playingCoach.fanFactor,
            $roster.matchDraft.opponentCoach.fanFactor,
            $roster.matchDraft.gameEventTally.touchdown,
            $roster.matchDraft.concession
        );
    }

    onMount(() => {
        roster.updateDraftEventTotals();
        mvpSelected = $roster.matchDraft?.playingCoach?.mvp?.id;
        if (!$roster.matchDraft.playingCoach.winnings) {
            $roster.matchDraft.playingCoach.winnings = winnings(
                $roster.matchDraft.playingCoach.fanFactor,
                $roster.matchDraft.opponentCoach.fanFactor,
                $roster.matchDraft.gameEventTally.touchdown,
                $roster.matchDraft.concession
            );
        }
        if (
            $roster?.matchDraft?.isLeagueMatch &&
            $roster.matchDraft.playingCoach.leaguePoints === 0
        ) {
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
    {#if $roster.mode === 'league'}
        <div class="boxed-div">
            <label for="winnings">Winnings</label>
            <input
                type="number"
                bind:value={$roster.matchDraft.playingCoach.winnings}
            />
        </div>
    {/if}

    {#if $roster?.matchDraft?.isLeagueMatch}
        <div class="boxed-div">
            <label for="league-points"
                >{$roster.mode === 'league' ? 'League' : 'Tournament'} Points</label
            >
            <input
                type="number"
                id="league-points"
                name="league-points"
                bind:value={$roster.matchDraft.playingCoach.leaguePoints}
            />
        </div>
    {/if}
    {#if $roster.mode === 'league'}
        <div class="boxed-div">
            <div class="concession-label">Concession</div>
            <ToggleButton
                options={concessionOptions}
                selectedIndex={concessionOptions.findIndex(
                    (x) => x === concessionOption
                )}
                selected={concession}
            />
        </div>
        <DedicatedFansChange
            {result}
            concession={$roster.matchDraft?.concession}
        />
    {/if}

    {#if $roster.matchDraft.concession !== 'player' && $roster.format !== 'sevens' && $roster.mode === 'league' && filteredPlayers.length > 0}
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
    .concession-label {
        margin-bottom: 4px;
        font-family: var(--display-font);
        font-weight: bold;
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
