<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { roster } from '../../store/teamRoster.store';
    import type { StarPlayer } from '../../models/player.model';
    import {
        advancementBreakdown,
        invalidRoster,
    } from '../../helpers/validator';
    import { currentTeam } from '../../store/currentTeam.store';
    import { spentSpp } from '../../store/spentSpp.store';
    import { customisationRules } from '../../customisation/customisation.store';
    import { gameSettings } from '../../store/gameSettings.store';
    import RosterPlayerCount from '../../components/rosterPlayerCount.svelte';

    let starPlayers: StarPlayer[];
    $: starPlayers = $roster.players
        .filter((x) => x.starPlayer && !x.deleted)
        .filter((x, _i, a) => {
            const starPlayer = x.player as StarPlayer;
            if (starPlayer?.twoForOne) {
                const other = a.find(
                    (p) => p.player.id === starPlayer?.twoForOne
                );
                if (other.player.id < starPlayer.id) {
                    return false;
                }
            }
            return true;
        })
        .map((x) => x.player as StarPlayer);

    $: tierAllowance =
        $customisationRules?.allowances?.allowancesPerTier?.[$currentTeam.tier];

    $: sppAllowance =
        $customisationRules?.allowances?.allowancesPerTier?.[$currentTeam.tier]
            ?.spp ?? 0;
    $: maxOfSkillId = $customisationRules?.allowances?.maxOfSkillId;
    $: budget = $customisationRules?.treasury || undefined;
    $: starPlayerSpp = starPlayers.reduce(
        (acc, x) =>
            acc +
            ($customisationRules?.starPlayerSettings?.starPlayerCost
                ? x.megaStar
                    ? $customisationRules.starPlayerSettings.starPlayerCost
                          .megaStar
                    : $customisationRules.starPlayerSettings.starPlayerCost.star
                : 0),
        0
    );
    $: invalid = invalidRoster($roster, {
        sppAllowance,
        maxPlayers: $gameSettings.maxPlayers,
        minPlayers: $gameSettings.minPlayers,
        budget,
        currentTeam: $currentTeam,
        maxOfSkillId,
        starPlayerSpp,
        nafOption: {
            primary: tierAllowance?.primarySkill,
            secondary: tierAllowance?.secondarySkill,
        },
    });
    $: adBreakdown = advancementBreakdown($roster);
    $: starPlayerAmount = starPlayers.length;
    $: megaStarPlayerAmount = starPlayers.filter((x) => x.megaStar).length;
</script>

<div class="validator">
    <i
        class="material-symbols-outlined no-transition"
        class:error={!invalid.valid}
        class:valid={invalid.valid}
        title={invalid.valid ? 'Roster is valid' : 'Roster is invalid'}
        >{invalid.valid ? 'checklist_rtl' : 'rule'}</i
    >
    <p>
        <span class="mini-title">Tier:</span>
        {$currentTeam.tier}
    </p>
    {#if sppAllowance > 0}
        <p>
            {#if $customisationRules?.allowances?.useSkillPoints}
                <span class="mini-title">Skill Points:</span>
                {($spentSpp + starPlayerSpp) / 6} / {sppAllowance / 6}
            {:else}
                <span class="mini-title">SPP:</span>
                {$spentSpp + starPlayerSpp} / {sppAllowance}
            {/if}
        </p>
    {/if}
    <p>
        <RosterPlayerCount />
    </p>
    <!-- primary -->
    <p class:error={invalid?.invalid.tooManyPrimarySkills < 0}>
        <span class="mini-title">Primary:</span>
        {adBreakdown?.primaryselect +
            starPlayerAmount * 2 +
            megaStarPlayerAmount * 2} / {tierAllowance?.primarySkill}
        {#if tierAllowance?.primarySkill + tierAllowance?.secondarySkill > tierAllowance?.primarySkill}
            ({tierAllowance?.primarySkill + tierAllowance?.secondarySkill})
        {/if}
    </p>

    <!-- secondary -->
    <p class:error={invalid?.invalid.tooManySecondarySkills < 0}>
        <span class="mini-title">Secondary:</span>
        {adBreakdown.secondaryselect} / {tierAllowance?.secondarySkill}
    </p>
    {#if starPlayers.length > 0}
        <p>
            <span class="mini-title">Star Players:</span>
            {starPlayers.length}
        </p>
    {/if}
</div>
<div class="error-messages">
    {#if invalid?.invalid.tooManyPrimarySkills < 0}
        <p>
            <i class="material-symbols-outlined no-transition">warning</i>
            Too many primary skills.
        </p>
    {/if}

    {#if invalid?.invalid.tooManySecondarySkills < 0}
        <p>
            <i class="material-symbols-outlined no-transition">warning</i>
            Too many secondary skills.
        </p>
    {/if}
    {#if invalid?.invalid?.moreThanFourOfTheSameSkill?.length > 0}
        <p>
            <i class="material-symbols-outlined no-transition">warning</i>
            Have more than 4 of the same skill:
            {#each invalid.invalid.moreThanFourOfTheSameSkill as id}
                {$_(`skills.${id}`)}
            {/each}
        </p>
    {/if}
    {#if invalid.invalid.tooBigGuy}
        <p>
            <i class="material-symbols-outlined no-transition">warning</i> Too many
            Big Guys
        </p>
    {/if}
    {#if invalid.invalid.tooManyOfPlayerType.length > 0}
        <p>
            <i class="material-symbols-outlined no-transition">warning</i> Too
            many of player type:
            {#each invalid.invalid.tooManyOfPlayerType as id}
                {$_(`players.${id}`)}
            {/each}
        </p>
    {/if}
    {#if budget && invalid.invalid.teamTotalValue > budget}
        <p>
            <i class="material-symbols-outlined no-transition">warning</i>
            Budget exceeded by {invalid.invalid.teamTotalValue - budget}k
        </p>
    {/if}
    {#if invalid.invalid.tooMany}
        <p>
            <i class="material-symbols-outlined no-transition">warning</i>
            Too many players
        </p>
    {/if}
    {#if invalid.invalid.tooFew}
        <p>
            <i class="material-symbols-outlined no-transition">warning</i>
            Not enough players in roster.
        </p>
    {/if}
    <!-- {#if $roster.format === 'elevens' && invalid.invalid.sppBalance < 0}
        <p class="error">
            <i class="material-symbols-outlined no-transition">warning</i>
            {-1 * invalid.invalid.sppBalance} SPP over allowance.
        </p>
    {/if} -->
</div>

<style>
    .validator {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
    }
    .valid {
        color: green;
    }
    p {
        padding: 0;
        margin: 0;
    }
    .error-messages {
        margin-bottom: 4px;
    }
    .error-messages p {
        display: flex;
        align-items: flex-end;
        gap: 8px;
    }
    .error-messages i {
        color: var(--error);
    }
    .mini-title {
        font-weight: bold;
        font-family: var(--body-font);
        color: var(--black);
    }
</style>
