<script lang="ts">
    import { matchHistoryRecordDraft } from '../../store/matchHistoryRecordDraft.store';
    import Button from '../uiComponents/button.svelte';
    import MatchHistoryCard from './matchHistoryCard.svelte';
    import NewMatchRecord from './newMatchRecord.svelte';
</script>

<div class="match-history no-print">
    <!-- <NewMatchRecord /> -->
    <h2>Match History</h2>
    <!-- <Button>New Match</Button> -->
    <div class="matches">
        <MatchHistoryCard opponentName="Bob" score={[3, 0]} />
        <MatchHistoryCard opponentName="Alberto The Great" open={false} />
        <MatchHistoryCard opponentName="Alfonse" open={false} score={[0, 1]} />
    </div>
    {JSON.stringify($matchHistoryRecordDraft, null, 2)}
</div>

<style lang="scss">
    .match-history {
        h2 {
            font-size: 36px;
            text-align: center;
        }
    }
    .matches {
        display: flex;
        /* flex: 1 1 0px; */
        gap: 20px;
        flex-direction: column;
        align-items: center;
        max-width: 800px;
        margin: 0 auto;
    }
</style>
