<script lang="ts">
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import MatchHistoryInfo from './matchHistoryInfo.svelte';

    export let opponentName;
    let showBody = false;

    let date1 = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

    function toggleBody() {
        showBody = !showBody;
    }
</script>

<section class="match-record-card">
    <div class="match-date">{date1.toLocaleDateString(undefined)}</div>
    <header class="header" on:click={toggleBody}>
        <div class="result">W</div>
        <div>vs</div>
        <div class="opponent-name">{opponentName}</div>
        <div class="score">3 - 0</div>
        <i class="material-icons" title={showBody ? 'Shrink' : 'Expand'}
            >{showBody ? 'arrow_drop_up' : 'arrow_drop_down'}</i
        >

        <!-- <MaterialButton
            symbol={showBody ? 'arrow_drop_up' : 'arrow_drop_down'}
            clickFunction={toggleBody}
            hoverText="open"
            pushRight={true}
        /> -->
    </header>
    {#if showBody}
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
        height: 100%;
        border: 2px solid var(--secondary-colour);
        margin-left: var(--l-offset);
        margin-top: var(--t-offset);

        padding: 8px 16px 8px 36px;
        // &.danger {
        //     border-color: var(--main-colour);
        // }
    }
    .result {
        position: absolute;
        font-size: 2em;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        line-height: 48px;
        background-color: var(--secondary-colour);
        border: 2px solid var(--secondary-colour);
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
