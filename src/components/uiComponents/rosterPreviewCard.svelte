<script lang="ts">
    import { teamIndex } from '../../data/teamIndex.data';

    import type { Roster, RosterPreview } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import { getTeamFormatShortDisplay } from '../../types/teamFormat';
    import Button from './button.svelte';

    export let preview: RosterPreview;
    const numberFormat = new Intl.NumberFormat();

    async function loadTeam(rosterId: string) {
        const service = await import('../auth/firebaseDB.service');
        const rosterToLoad = (await service.getRoster(rosterId)).data();
        return roster.loadRoster(rosterToLoad as Roster);
    }
</script>

<section class="roster-preview">
    <p>{preview.teamType} Team</p>
    <h3>{preview.teamName}</h3>
    <p>
        {`${preview.teamType} ${
            preview.format ? getTeamFormatShortDisplay(preview.format) : ''
        } ${preview.mode || ''}`}
    </p>
    <p>
        <span>Treasury: </span>{numberFormat.format(
            preview.treasury
        )}{preview.treasury === 0 ? '' : ',000'}
    </p>
    <Button clickFunction={() => loadTeam(preview.rosterId)}>Load Team</Button>
</section>

<style lang="scss">
    .roster-preview {
        border-radius: 24px;
        position: relative;
        height: 100%;
        text-align: center;
        font-family: var(--display-font);
    }

    h3 {
        font-size: 20px;
        color: var(--main-colour);
    }
</style>
