<script lang="ts">
    import type { MatchHistoryInducements } from '../../../models/matchHistory.model';

    export let inducements: MatchHistoryInducements;
</script>

<!-- TODO refactor this and matchInducements to be common -->
<div class="inducements-container">
    <h3>Inducements</h3>
</div>

<style lang="scss">
    .inducements-container {
        flex: 3;
        border-radius: 12px;
        h3 {
            margin: 12px;
            text-align: center;
        }
    }
    .inducements {
        border-radius: 12px;
        display: flex;
        flex-flow: row wrap;
        gap: 8px;
        p {
            text-align: center;
            width: 100%;
        }
        div {
            flex: 1 1 40%;
            margin: 0;
            background-color: var(--secondary-background-colour);
            border-radius: 8px;
            padding: 12px;
            font-size: 14px;
            @media screen and (max-width: 600px) {
                flex-basis: 90%;
            }
        }
    }
</style>
