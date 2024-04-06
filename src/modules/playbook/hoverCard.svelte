<script lang="ts">
    import PlayerCharacteristics from '../../components/playerCard/playerCharacteristics.svelte';
    import SkillElement from '../../components/skillElement.svelte';
    import { journeymanPosition } from '../../helpers/journeymenHelper';
    import { roster } from '../../store/teamRoster.store';
    export let index: number;
    $: rosterPlayer = $roster.players[index];
</script>

<section class="hover-card" style="display: none;">
    <header class="header">
        <h3 class="player-name left-align">
            {#if rosterPlayer.starPlayer}
                {rosterPlayer.player.position}
            {:else if rosterPlayer.playerName}
                {rosterPlayer.playerName}
            {/if}
        </h3>
        <div>
            <div class="player-number">
                {rosterPlayer.alterations.playerNumber}
            </div>
        </div>
        <div class="player-position left-align">
            <div class="player-controls">
                {#if rosterPlayer.starPlayer}
                    <p>Star Player</p>
                {:else if rosterPlayer?.alterations?.journeyman}
                    <p>{journeymanPosition(rosterPlayer.player.position)}</p>
                {:else}
                    <p>
                        {rosterPlayer.player.position}
                    </p>
                {/if}
            </div>
        </div>
    </header>
    <PlayerCharacteristics {rosterPlayer} />
    <div class="skills">
        <p class="mini-title">SKILLS:</p>
        {#if rosterPlayer.player.skills.length + (rosterPlayer?.alterations?.extraSkills?.length || 0) > 0}
            <SkillElement
                playerSkillIds={rosterPlayer.player.skills}
                extraSkillIds={rosterPlayer?.alterations?.extraSkills || []}
            />
        {:else}
            None
        {/if}
    </div>
</section>

<style lang="scss">
    .hover-card {
        pointer-events: none;
        border-radius: 25px;
        position: relative;
        max-width: 776px;
        height: auto;
        border: var(--secondary-border);
        background-color: white;
        box-shadow:
            0 2px 3px 0 rgba(60, 64, 67, 0.3),
            0 6px 10px 4px rgba(60, 64, 67, 0.15);
    }
    .player-number {
        font-style: normal;
        width: 25px;
        line-height: 25px;
        border-radius: 50%;
        font-family: var(--display-font);
        right: 10px;
        top: 10px;
        background-color: white;
        color: var(--secondary-colour);
        position: absolute;
        padding: 0;
        text-align: center;
    }
    .header {
        background-color: var(--secondary-colour);

        color: white;
        border-radius: 20px 20px 0 0;
        padding: 10px;
        padding-bottom: 0;
        min-height: 52px;
        border: var(--secondary-border);
        h3 {
            margin: 0;
        }
    }
    .skills {
        padding: 10px;
        margin-top: 10px;
    }
</style>
