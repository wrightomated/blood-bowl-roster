<script lang="ts">
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import Pill from '../uiComponents/pill.svelte';
    import MatchHistoryInfo from './matchHistoryInfo.svelte';

    export let opponentName: string;
    export let open = false;
    export let score: [number, number] = [0, 0];

    $: result = score[0] === score[1] ? 'D' : score[0] > score[1] ? 'W' : 'L';

    let date1 = new Date(Date.UTC(2022, 8, 10, 3, 0, 0));

    function toggleBody() {
        open = !open;
    }
</script>

<section class="match-record-card" class:closed={!open} on:click={toggleBody}>
    <div class="match-date">{date1.toLocaleDateString(undefined)}</div>
    <header class="header">
        <div class="result">{result}</div>
        <div>vs</div>
        <div class="opponent-name">{opponentName}</div>
        <div class="score">{score[0]} - {score[1]}</div>
        <Pill variant="filled">League</Pill>
        <i class="material-icons" title={open ? 'Shrink' : 'Expand'}
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
        border-radius: 25px;
        position: relative;
        width: calc(100% - var(--l-offset) - 48px);
        border: var(--secondary-border);
        margin-left: var(--l-offset);
        margin-top: var(--t-offset);

        padding: 8px 16px 8px 36px;
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
        font-family: var(--display-font);
    }
</style>
