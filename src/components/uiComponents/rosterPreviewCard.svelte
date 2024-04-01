<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';
    import type { Roster, RosterPreview } from '../../models/roster.model';
    import { modalState } from '../../store/modal.store';
    import { rosterCache } from '../../store/rosterCache.store';
    import { teamLoadOpen } from '../../store/teamLoadOpen.store';
    import { roster } from '../../store/teamRoster.store';
    import { getTeamFormatShortDisplay } from '../../types/teamFormat';

    export let preview: RosterPreview;

    async function loadTeam(rosterId: string) {
        if ($rosterCache.rosters?.[rosterId]?.valid) {
            const cachedRoster = $rosterCache.rosters[rosterId].cachedItem;
            roster.loadRoster(cachedRoster);
            teamLoadOpen.set(false);
            return;
        }
        modalState.modalLoading();

        try {
            const service = await import('../auth/firebaseDB.service');
            const rosterToLoad = (
                await service.getRoster(rosterId)
            ).data() as Roster;
            roster.loadRoster(rosterToLoad);
            rosterCache.cacheRoster(rosterToLoad);
            teamLoadOpen.set(false);
            modalState.close();
        } catch (error) {
            console.error(error);
            modalState.modalError('Something went wrong loading roster');
        }
    }
</script>

<button class="roster-preview" on:click={() => loadTeam(preview.rosterId)}>
    <p>{$_('roster.teamType', { values: { type: preview.teamType } })}</p>
    <h3>{preview.teamName || 'Unnamed'}</h3>
    <p>
        {preview.format ? getTeamFormatShortDisplay(preview.format) + ' ' : ''}
        <span class="mode-title">{preview.mode || ''}</span>
    </p>
    <p>
        <span>{$_('tables.treasury')}: </span>{formatNumberInThousands(
            preview.treasury
        )}
    </p>
</button>

<style lang="scss">
    .roster-preview {
        border-radius: 24px;
        position: relative;
        height: 100%;
        text-align: center;
        font-family: var(--display-font);
        background-color: white;
        box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
            0 6px 10px 4px rgba(60, 64, 67, 0.15);
        padding: 12px;
        border: 2px solid white;

        &:hover {
            cursor: pointer;

            border: var(--secondary-border);
        }
    }

    .mode-title {
        text-transform: capitalize;
    }

    h3 {
        font-size: 20px;
        color: var(--main-colour);
    }
</style>
