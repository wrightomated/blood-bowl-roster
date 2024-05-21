<script lang="ts">
    import { customisationRules } from '../../customisation/customisation.store';
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import type { StarPlayer } from '../../models/player.model';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';

    export let index: number;

    $: rosterPlayer = $roster.players[index];
    $: sppValue = calculateSpp(
        rosterPlayer,
        $customisationRules?.starPlayerSettings?.starPlayerCost
    );

    function calculateSpp(rosterPlayer: RosterPlayerRecord, starPlayerCost) {
        // Itza rule
        if (rosterPlayer.player.id === 1000) {
            return '-';
        }
        let playerSpp: number | '-' = rosterPlayer?.alterations?.spp;
        if (rosterPlayer?.starPlayer) {
            if (starPlayerCost) {
                if ((rosterPlayer?.player as StarPlayer)?.megaStar) {
                    playerSpp = -1 * starPlayerCost.megaStar;
                } else {
                    playerSpp = -1 * starPlayerCost.star;
                }
            } else {
                playerSpp = '-';
            }
        }
        if (
            $customisationRules?.allowances?.useSkillPoints &&
            playerSpp !== '-'
        ) {
            playerSpp = (playerSpp / 6) * -1;
        }
        return playerSpp;
    }
</script>

{#if rosterPlayer.starPlayer || sppValue === '-' || $customisationRules?.allowances?.blockSppEditing}
    {sppValue}
{:else}
    <input
        type="number"
        aria-labelledby="spp-header"
        placeholder="?"
        inputmode="numeric"
        use:blurOnEscapeOrEnter
        bind:value={$roster.players[index].alterations.spp}
    />
{/if}

<style lang="scss">
    input {
        border: 0;
        border-radius: 0;
        background: none;
        width: 60px;
        text-align: center;
        margin-right: -15px;
        font-style: italic;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
</style>
