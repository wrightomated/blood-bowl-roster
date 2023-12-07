<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { dungeonBowlColleges } from '../../data/dungeonBowlColleges.data';

    import type { PlayerGroup } from '../../models/dungeonBowl.model';
    import { roster } from '../../store/teamRoster.store';

    $: college = dungeonBowlColleges.colleges.find(
        (x) => x.id === $roster.teamId
    );
    const getPlayersOfType = (playerGroup) =>
        $roster.players.filter((p) =>
            (college.players[playerGroup] as PlayerGroup).playerIds.includes(
                p.player.id
            )
        ).length;
</script>

<div class="player-count__container">
    {#each Object.keys(college.players) as playerGroup}
        <div
            class="player-count__player-row"
            class:player-count__player-row--danger={getPlayersOfType(
                playerGroup
            ) > college.players[playerGroup].max}
        >
            <div class="player-count__player-group">
                {$_('db.' + playerGroup)}
            </div>
            <div>
                {getPlayersOfType(playerGroup)}/{college.players[playerGroup]
                    .max}
            </div>
        </div>
    {/each}
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
