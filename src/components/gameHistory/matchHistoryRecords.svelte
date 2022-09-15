<script lang="ts">
    import MatchHistoryCard from './matchHistoryCard.svelte';
</script>

<div class="match-history no-print">
    <h2>Match History</h2>
    <div class="matches">
        <MatchHistoryCard opponentName="Bob" />
        <MatchHistoryCard opponentName="Alberto the great Alberto the great" />
        <MatchHistoryCard opponentName="Alfonse" />
    </div>
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
