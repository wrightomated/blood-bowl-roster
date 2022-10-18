<script lang="ts">
    import type {
        MatchHistoryRecord,
        MatchHistorySummary,
    } from '../../models/matchHistory.model';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import Pill from '../uiComponents/pill.svelte';
    import MatchHistoryInfo from './matchHistoryInfo.svelte';

    export let matchSummary: MatchHistorySummary;
    let open = false;
    let loading = false;

    let match: MatchHistoryRecord;

    const matchDate = !!matchSummary.matchDate
        ? new Date(matchSummary.matchDate).toLocaleDateString()
        : '';

    $: opponentScore = matchSummary.opponent.score;
    $: score = matchSummary.playerScores.touchdowns;

    $: result =
        score === opponentScore ? 'D' : score > opponentScore ? 'W' : 'L';

    // let date1 = new Date(Date.UTC(2022, 8, 10, 3, 0, 0));

    async function toggleBody() {
        if (loading) return;

        if (!match) {
            loading = true;
            const service = await import('../auth/firebaseDB.service');
            const matchDocument = await service.getMatchHistory(
                matchSummary.id
            );
            match = matchDocument.data();
        }
        loading = false;
        open = !open;
    }
</script>

<section class="match-record-card" class:closed={!open}>
    {#if matchSummary.matchDate}
        <div class="match-date">
            {matchDate}
        </div>
    {/if}

    <header class="header" class:open on:click={async () => await toggleBody()}>
        <div class="result">{result}</div>
        <div>vs</div>
        <div class="opponent-name">{matchSummary.opponent.name}</div>
        <div class="score">{score} - {opponentScore}</div>
        {#if matchSummary.isLeagueMatch}
            <Pill variant="filled">League</Pill>
        {/if}

        <i
            class="material-symbols-outlined"
            class:loading
            title={open ? 'Shrink' : 'Expand'}
            >{loading
                ? 'autorenew'
                : open
                ? 'arrow_drop_up'
                : 'arrow_drop_down'}</i
        >

        <!-- <MaterialButton
            symbol={open ? 'arrow_drop_up' : 'arrow_drop_down'}
            clickFunction={toggleBody}
            hoverText="open"
            pushRight={true}
        /> -->
    </header>
    {#if open}
        <MatchHistoryInfo {match} />
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
        box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
            0 6px 10px 4px rgba(60, 64, 67, 0.15);

        @media screen and (max-width: 450px) {
            box-shadow: none;
        }
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

    .loading {
        animation-name: spin;
        animation-duration: 1000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
</style>
