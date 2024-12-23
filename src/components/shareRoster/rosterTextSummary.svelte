<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { spentSpp } from '../../store/spentSpp.store';
    import { roster } from '../../store/teamRoster.store';
    import { getTeamFormatShortDisplay } from '../../types/teamFormat';
    import { rosterToShareModel } from './rosterToTextSummary';
    import { customisationRules } from '../../customisation/customisation.store';

    import SingleSkillColourPicker from '../singleSkillColourPicker.svelte';
    import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';

    $: r = rosterToShareModel($roster);
</script>

<div class="roster-summary">
    <h3>{r.teamName}</h3>
    <div class="pill-box">
        {#if r.coachName || r.nafNumber}
            <span>{r.coachName ?? ''}</span><span
                >{r.nafNumber ? ' ' + r.nafNumber : ''}</span
            >
        {/if}
    </div>
    <div class="pill-box">
        <span>
            {$_('roster.teamType', {
                values: { type: r.teamType },
            })}
        </span>
        <span>{getTeamFormatShortDisplay($roster.format)}</span>
        {$roster.mode}
    </div>
    <div class="pill-box">
        <span>CTV: {r.teamTotal}</span>
        <span>
            {#if r.mode === 'exhibition'}
                {$customisationRules?.allowances?.useSkillPoints
                    ? 'SP: ' + $spentSpp / 7
                    : 'SPP: ' + $spentSpp}
            {/if}
        </span>
    </div>

    {#if r?.specialRule}
        <p>{r.specialRule}</p>
    {/if}
    <dl>
        {#each r.playerSummary as position}
            <dt>
                {#if position.count > 1}
                    {position.count} x
                {/if}
                <strong>{position.position}</strong>

                {#if position.cost}
                    ({formatNumberInThousands(position.cost)})
                {/if}
            </dt>
            <dd>
                {#if position?.extraSkills?.length > 0}
                    {#each position.extraSkills as skill, index}
                        {skill.amount > 1 ? skill.amount + ' x ' : ''}
                        <SingleSkillColourPicker
                            skillId={skill.skill}
                            extraContent={index <
                            position.extraSkills.length - 1
                                ? ', '
                                : ''}
                            allowInput={false}
                        />
                    {/each}
                {/if}
            </dd>
        {/each}
    </dl>

    {#if r.rerolls > 0 || r.dedicatedFans > 0 || r.assistantCoaches > 0 || r.cheerleaders > 0 || r.apothecary}
        <dl>
            <dt class="title"><strong>Extras</strong></dt>
            {#if r.rerolls > 0}
                <dd>{r.rerolls} x Rerolls</dd>
            {/if}
            {#if r.dedicatedFans > 0}
                <dd>{r.dedicatedFans} x Dedicated Fans</dd>
            {/if}
            {#if r.assistantCoaches > 0}
                <dd>{r.assistantCoaches} x Assistant Coaches</dd>
            {/if}
            {#if r.cheerleaders > 0}
                <dd>{r.cheerleaders} x Cheerleaders</dd>
            {/if}
            {#if r.apothecary}
                <dd>Apothecary</dd>
            {/if}
            <dl></dl>
        </dl>
    {/if}

    <!-- inducements -->
    {#if Object.keys(r.inducements).length > 0}
        <dl>
            <dt class="title"><strong>Inducements</strong></dt>
            {#each Object.keys(r.inducements) as inducement}
                <dd>
                    {r.inducements[inducement]} x {$_(
                        'inducements.' + inducement
                    )}
                </dd>
            {/each}
        </dl>
    {/if}
</div>

<style>
    h3 {
        margin-block-end: 0.5rem;
    }
    .pill-box {
        display: flex;
        gap: 12px;
        margin-block-start: 0;
        font-family: var(--display-font);
    }
    p {
        margin-block-start: 0.5rem;
    }
</style>
