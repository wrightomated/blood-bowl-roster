<script lang="ts">
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import PlayerCharacteristics from '../../components/playerCard/playerCharacteristics.svelte';
    import SkillElement from '../../components/skillElement.svelte';

    const bobcat: RosterPlayerRecord = {
        playerName: 'The Bobcat',
        player: {
            id: 0,
            position: '',
            cost: 0,
            bigGuy: false,
            playerStats: [7, 3, 2, 3, 8],
            skills: [40, 41, 18, 71],
        },
        starPlayer: false,
        deleted: false,
    };
</script>

<section class="player-card">
    <header class="header">
        <h3 class="player-name left-align">The Bobcat</h3>
        <div class="player-position left-align">
            <div class="player-controls">TMBBT STAR PLAYER</div>
        </div>
    </header>

    <PlayerCharacteristics rosterPlayer={bobcat} />

    <div class="skills">
        <p class="mini-title">SKILLS:</p>
        <SkillElement
            playerSkillIds={bobcat.player.skills}
            extraSkillIds={[]}
        />
    </div>
</section>

<style lang="scss">
    input {
        border: 0;
        border-radius: 0;
        background: none;
        font-size: 16px;
    }
    .player-card {
        border-radius: 25px;
        position: relative;
        min-width: 300px;
        max-width: 776px;
        height: 100%;
        border: var(--secondary-border);
        background-color: var(--secondary-compliment);
        box-shadow:
            0 2px 3px 0 rgba(60, 64, 67, 0.3),
            0 6px 10px 4px rgba(60, 64, 67, 0.15);
        &.danger {
            border-color: var(--error);
        }
    }
    .header {
        background-color: var(--secondary-colour);

        color: var(--secondary-compliment);
        border-radius: 20px 20px 0 0;
        padding: 10px;
        padding-bottom: 0;
        min-height: 52px;
        border: var(--secondary-border);
        h3 {
            margin: 0;
        }

        input {
            padding: 0;
            color: white;

            &::placeholder {
                color: #ddd;
            }
        }
        &.danger {
            background-color: var(--error);
            border-color: var(--error);
        }
    }
    .content {
        padding: 10px;
    }
    .player-controls {
        display: flex;
        align-items: center;
        gap: 4px;
        height: 46px;
    }

    .big-guys,
    .sevens-over-four {
        color: var(--main-colour);
        font-family: var(--display-font);
        i {
            vertical-align: text-bottom;
        }
    }
    .skills {
        padding: 10px;
    }

    @media print {
        .player-controls {
            display: none;
        }
        .player-name {
            border-right: 0;
        }
    }
</style>
