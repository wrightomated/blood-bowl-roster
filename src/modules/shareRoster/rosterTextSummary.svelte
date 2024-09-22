<script lang="ts">
    import { rosterToShareModel } from './rosterToTextSummary';
    import { roster } from '../../store/teamRoster.store';
    import SingleSkillColourPicker from '../../components/singleSkillColourPicker.svelte';
    import Pill from '../../components/uiComponents/pill.svelte';
    import { _ } from 'svelte-i18n';
    import { getTeamFormatShortDisplay } from '../../types/teamFormat';
    import ToggleButton from '../../components/uiComponents/toggleButton.svelte';

    $: r = rosterToShareModel($roster);

    let options = ['compact', 'individual', 'everything'];
    let displayMode = 'compact';
</script>

<!-- Toggle to determine the display mode-->
<p>Player display</p>
<ToggleButton
    {options}
    selectedIndex={options.indexOf(displayMode)}
    selected={(mode) => {
        displayMode = mode;
    }}
/>

<div class="roster-summary">
    <h2>{r.teamName}</h2>
    <div class="pill-box">
        <Pill
            >{$_('roster.teamType', {
                values: { type: r.teamType },
            })}</Pill
        >
        <Pill>{getTeamFormatShortDisplay($roster.format)}</Pill>
        <Pill>{$roster.mode}</Pill>
    </div>
    {#if r.coachName || r.nafNumber}
        <p>{r.coachName} {r.nafNumber}</p>
    {/if}
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
                    ({position.cost})
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
    <dl>
        <dt class="title"><strong>Extras</strong></dt>
        {#if r?.rerolls > 0}
            <dd>{r.rerolls} x Rerolls</dd>
        {/if}
        {#if r?.dedicatedFans > 0}
            <dd>{r.dedicatedFans} x Dedicated Fans</dd>
        {/if}
        {#if r?.assistantCoaches > 0}
            <dd>{r.assistantCoaches} x Assistant Coaches</dd>
        {/if}
        {#if r?.cheerleaders > 0}
            <dd>{r.cheerleaders} x Cheerleaders</dd>
        {/if}
        {#if r?.apothecary}
            <dd>Apothecary</dd>
        {/if}
        <dl></dl>
    </dl>
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
    h2 {
        margin-block-end: 0;
    }
    .pill-box {
        display: flex;
        gap: 12px;
        margin-block-start: 0;
    }
</style>
