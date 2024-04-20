<script lang="ts">
    import { customisationRules } from '../../customisation/customisation.store';
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';
    import type { StarPlayer } from '../../models/player.model';
    import { rosterMode } from '../../store/rosterMode.store';
    import { roster } from '../../store/teamRoster.store';
    import SkillElement from '../skillElement.svelte';
    import MngCheckbox from './mngCheckbox.svelte';

    export let index: number;

    $: rosterPlayer = $roster.players[index];
    $: currentCost =
        rosterPlayer?.alterations?.mng || rosterPlayer?.alterations?.tr
            ? 0
            : ((rosterPlayer.player.id === 56 ||
                  rosterPlayer.player.id === 73) &&
              $roster.mode !== 'exhibition' &&
              $roster.format !== 'dungeon bowl'
                  ? 0
                  : rosterPlayer.player.cost) +
              (rosterPlayer.alterations?.valueChange || 0);

    //   CHAOS CUP
    $: starPlayerCost = $customisationRules?.starPlayerCost;
    $: sppText = rosterPlayer?.starPlayer
        ? getSppForPlayer(starPlayerCost)
        : rosterPlayer?.alterations?.spp * -1 || '-';

    function getSppForPlayer(starPlayerCost?: {
        star: number;
        megaStar: number;
    }) {
        const starPlayer = rosterPlayer.player as StarPlayer;
        if (!!starPlayer?.twoForOne && starPlayer.twoForOne < starPlayer.id) {
            return '-';
        }
        if (starPlayer.megaStar) {
            return starPlayerCost?.megaStar || '-';
        } else {
            return starPlayerCost?.star || '-';
        }
    }
</script>

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

<div class="extraDetails">
    <div><span class="mini-title">SPP:</span> {sppText}</div>
    <!-- {#if $roster.format !== 'sevens'}
        {#if $roster.players[index]?.alterations?.spp !== undefined}
            <label
                ><span class="mini-title">SPP:</span>
                <input
                    class="spp-input"
                    type="number"
                    placeholder="?"
                    inputmode="numeric"
                    use:blurOnEscapeOrEnter
                    bind:value={$roster.players[index].alterations.spp}
                />
            </label>
        {:else if !rosterPlayer.starPlayer}0{/if}
    {/if} -->

    {#if $roster.mode !== 'exhibition' && !rosterPlayer.starPlayer}
        <MngCheckbox {index} />
        {#if $roster.format !== 'sevens'}
            <label>
                <span class="mini-title">NI:</span>
                <input
                    class="spp-input"
                    type="number"
                    placeholder="?"
                    inputmode="numeric"
                    use:blurOnEscapeOrEnter
                    bind:value={$roster.players[index].alterations.ni}
                />
            </label>

            <label>
                <span class="mini-title">TR:</span>
                <input
                    type="checkbox"
                    class="checkbox"
                    use:blurOnEscapeOrEnter
                    bind:checked={$roster.players[index].alterations.tr}
                />
            </label>
        {/if}
    {/if}
</div>

<p>
    <span class="mini-title">Hiring Fee:</span>
    {rosterPlayer.player.cost > 0 && !rosterPlayer?.alterations?.journeyman
        ? `${formatNumberInThousands(rosterPlayer.player.cost)}`
        : '-'}
</p>
{#if $rosterMode !== 'exhibition'}
    <p class="current-value">
        <span class="mini-title">Current Value:</span>
        {formatNumberInThousands(currentCost)}
    </p>
{/if}

<style lang="scss">
    input {
        border: 0;
        border-radius: 0;
        background: none;
        font-size: 16px;
    }
    .current-value {
        margin-bottom: 0;
    }
    .extraDetails {
        display: flex;
        margin-bottom: 10px;
        & label {
            & span {
                vertical-align: middle;
            }
            & input {
                padding: 0;
                vertical-align: middle;
                &.checkbox {
                    margin: 3px;
                    margin-right: 10px;
                }
            }
        }
    }
    .spp-input {
        width: 40px;
    }
    .skills {
        margin-bottom: 10px;
    }
</style>
