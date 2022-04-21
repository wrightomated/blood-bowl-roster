<script lang="ts">
    import type { Roster, RosterPreview } from '../../models/roster.model';
    import { modalState } from '../../store/modal.store';
    import { teamLoadOpen } from '../../store/teamLoadOpen.store';
    import { roster } from '../../store/teamRoster.store';
    import { getTeamFormatShortDisplay } from '../../types/teamFormat';
    import FootballSpinner from './footballSpinner.svelte';
    import ModalText from './modalText.svelte';

    export let preview: RosterPreview;
    const numberFormat = new Intl.NumberFormat();

    async function loadTeam(rosterId: string) {
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: false,
            component: FootballSpinner,
            componentProps: {
                loadingText: `Loading ${preview?.teamName || 'roster'}`,
            },
        });
        try {
            const service = await import('../auth/firebaseDB.service');
            const rosterToLoad = (await service.getRoster(rosterId)).data();
            roster.loadRoster(rosterToLoad as Roster);
            teamLoadOpen.set(false);
            modalState.close();
        } catch (error) {
            console.error(error);
            modalState.set({
                ...$modalState,
                isOpen: true,
                canClose: true,
                component: ModalText,
                componentProps: {
                    text: `Something went wrong`,
                },
            });
        }
    }
</script>

<div class="roster-preview" on:click={() => loadTeam(preview.rosterId)}>
    <p>{preview.teamType} Team</p>
    <h3>{preview.teamName || 'Unnamed'}</h3>
    <p>
        {preview.format ? getTeamFormatShortDisplay(preview.format) + ' ' : ''}
        <span class="mode-title">{preview.mode || ''}</span>
    </p>
    <p>
        <span>Treasury: </span>{numberFormat.format(
            preview.treasury
        )}{preview.treasury === 0 ? '' : ',000'}
    </p>
</div>

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

        &:hover {
            cursor: pointer;
            box-shadow: none;
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
