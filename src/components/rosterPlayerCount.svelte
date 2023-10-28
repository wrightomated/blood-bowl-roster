<script lang="ts">
    import { gameSettings } from '../store/gameSettings.store';
    import { specialistsAmount } from '../store/specialistsAmount.store';
    import { roster } from '../store/teamRoster.store';

    $: availablePlayers = $roster.players.filter((p) => !p.deleted);
</script>

<div class="no-print player-count__container">
    <!-- If under min display warning -->
    <!-- Get players that aren't deleted and check agains min -->
    {#if availablePlayers.length < $gameSettings?.minPlayers}
        <div class="player-count__player-row player-count__player-row--danger">
            <div class="player-count__player-group">Minimum players</div>
            <div>
                {availablePlayers.length}/{$gameSettings?.minPlayers}
            </div>
        </div>
    {:else}
        <div class="player-count__player-row">
            <div class="player-count__player-group">Players</div>
            <div>
                {availablePlayers.length}/{$gameSettings?.maxPlayers}
            </div>
        </div>
    {/if}

    <!-- If over specialists display warning -->
    {#if $specialistsAmount > $gameSettings?.maxSpecialists}
        <div class="player-count__player-row player-count__player-row--danger">
            <div class="player-count__player-group">Specialists</div>
            <div>
                {$specialistsAmount} / {$gameSettings.maxSpecialists}
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .player-count {
        &__container {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;
            column-gap: 16px;
        }
        &__player-group {
            text-transform: capitalize;
            font-family: var(--display-font);
        }
        &__player-row {
            display: flex;
            align-items: center;
            column-gap: 8px;
            &--danger {
                color: var(--main-colour);
            }
        }
    }
</style>
