<script lang="ts">
    import { playerCatalogue } from '../../data/players.data';

    import type { DungeonBowlCollege } from '../../models/dungeonBowl.model';

    export let college: DungeonBowlCollege;

    const getPlayerPosition = (id: number) =>
        playerCatalogue.players.find((p) => p.id === id).position;
</script>

<div class="college-card college-card--{college.name.toLowerCase()}">
    <div class="college-card__header"><h3>College of {college.name}</h3></div>
    <div class="college-card__content">
        {#each Object.keys(college.players) as playerGroup}
            <div class="college-card__player-group">
                <div class="college-card__player-group-heading">
                    0-{college.players[playerGroup].max}
                    {playerGroup === 'bigGuys' ? 'Big Guys' : playerGroup}
                </div>
                {#each college.players[playerGroup].playerIds as id}
                    <p class="college-card__position">
                        {getPlayerPosition(id)}
                    </p>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    $colleges: 'fire', 'shadow', 'metal', 'light', 'death', 'life', 'beasts',
        'heavens';
    .college-card {
        margin-top: 12px;
        border-radius: 25px;
        position: relative;
        height: 100%;
        min-width: 100px;
        margin-bottom: 12px;

        @each $college in $colleges {
            &--#{$college} {
                border: 2px solid var(--#{$college});

                & .college-card__header {
                    background-color: var(--#{$college});
                    border: 2px solid var(--#{$college});
                }
            }
        }
        &--heavens {
            .college-card__header {
                color: #333;
            }
        }
        &__content {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
            // justify-content: space-around;
            padding: 16px;

            @media screen and (max-width: 650px) {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
        }
        &__header {
            color: white;
            border-radius: 20px 20px 0 0;
            padding-left: 16px;
            padding-bottom: 0;
            min-height: 52px;
        }

        &__position {
            margin-top: 0;
            margin-bottom: 0;
        }
        &__player-group {
            // flex-basis: 0;
        }

        &__player-group-heading {
            text-transform: capitalize;
            font-family: var(--display-font);
        }
    }
</style>
