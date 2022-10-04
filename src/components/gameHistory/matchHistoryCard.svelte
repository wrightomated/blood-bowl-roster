<script lang="ts">
    import type { MatchHistorySummary } from '../../models/matchHistory.model';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import Pill from '../uiComponents/pill.svelte';
    import MatchHistoryInfo from './matchHistoryInfo.svelte';

    export let matchSummary: MatchHistorySummary;
    export let open = false;
    // export let score: [number, number] = [0, 0];
    $: opponentScore = matchSummary.opponent.score;
    $: score = matchSummary.playerScores.touchdowns;

    $: result =
        score === opponentScore ? 'D' : score > opponentScore ? 'W' : 'L';

    // let date1 = new Date(Date.UTC(2022, 8, 10, 3, 0, 0));

    function toggleBody() {
        open = !open;
    }
</script>

<section class="match-record-card" class:closed={!open}>
    {#if matchSummary.matchDate}
        <div class="match-date">
            {matchSummary.matchDate.toLocaleDateString()}
        </div>
    {/if}

    <header class="header" class:open on:click={toggleBody}>
        <div class="result">{result}</div>
        <div>vs</div>
        <div class="opponent-name">{matchSummary.opponent.name}</div>
        <div class="score">{score} - {opponentScore}</div>
        {#if matchSummary.isLeagueMatch}
            <Pill variant="filled">League</Pill>
        {/if}

        <i class="material-symbols-outlined" title={open ? 'Shrink' : 'Expand'}
            >{open ? 'arrow_drop_up' : 'arrow_drop_down'}</i
        >

        <!-- <MaterialButton
            symbol={open ? 'arrow_drop_up' : 'arrow_drop_down'}
            clickFunction={toggleBody}
            hoverText="open"
            pushRight={true}
        /> -->
    </header>
    {#if open}
        <MatchHistoryInfo />
    {/if}
</section>

<style lang="scss">
    :root {
        --l-offset: 20px;
        --t-offset: 12px;
    }
    .match-record-card {
        border-radius: 24px;
        position: relative;
        width: 100%;
        width: calc(100% - var(--l-offset));
        border: var(--secondary-border);
        margin-left: var(--l-offset);
        margin-top: var(--t-offset);

        // padding: 8px 16px 8px 36px;
    }
    .result {
        position: absolute;
        font-size: 2em;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        line-height: 48px;
        background-color: var(--secondary-colour);
        border: var(--secondary-border);
        background: white;
        text-align: center;
        color: var(--secondary-colour);
        top: calc(var(--t-offset) * -2);
        left: calc(var(--l-offset) * -1);
        font-family: var(--display-font);
    }

    .header {
        font-family: var(--display-font);
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        padding: 8px 16px 8px 36px;
        // transition: background-color 0.2s, color 0.2s;
        // border-radius: 0 20px 0 0;

        // &.open {
        //     background-color: var(--secondary-colour);
        //     color: white;
        // }

        *:last-child {
            margin-left: auto;
        }
    }

    .opponent-name,
    .score {
        font-size: 1.5em;
    }

    .score {
        white-space: nowrap;
    }

    .match-date {
        position: absolute;
        top: -20px;
        left: 36px;
        font-family: var(--display-font);
    }
</style>
