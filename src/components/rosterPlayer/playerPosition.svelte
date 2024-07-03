<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { journeymanPosition } from '../../helpers/journeymenHelper';
    import { currentTeam, specialistIds } from '../../store/currentTeam.store';
    import { gameSettings } from '../../store/gameSettings.store';
    import { modalState } from '../../store/modal.store';
    import { specialistsAmount } from '../../store/specialistsAmount.store';

    import { roster } from '../../store/teamRoster.store';
    import EditPlayer from '../playerCard/editPlayer.svelte';
    import MaterialButton from '../uiComponents/materialButton.svelte';

    export let index: number;
    $: rosterPlayer = $roster.players[index];

    $: numberOfPlayerType = $roster.players.filter(
        (x) => x.player.id === rosterPlayer.player.id
    ).length;
    $: maxOfPlayerType =
        $currentTeam.players.find((x) => x.id === rosterPlayer.player.id)
            ?.max || 0;
    $: danger = numberOfPlayerType > maxOfPlayerType;
    $: tooManyBigGuys =
        rosterPlayer.player.bigGuy &&
        $currentTeam.maxBigGuys <
            $roster.players.filter((x) => x.player.bigGuy).length;

    const buyJourneyman = () => {
        const extraSkills = rosterPlayer.alterations.extraSkills.filter(
            (id) => id !== 71 && id !== 710
        );
        roster.updatePlayer(
            {
                ...rosterPlayer,
                alterations: {
                    ...rosterPlayer.alterations,
                    extraSkills,
                    journeyman: false,
                },
            },
            index
        );
        roster.updateTreasury(-rosterPlayer.player.cost);
    };

    const toggleShowSkills = () => {
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: true,
            component: EditPlayer,
            componentProps: {
                index,
            },
            compact: true,
        });
    };
</script>

{#if rosterPlayer.starPlayer}
    Star Player
{:else if rosterPlayer?.alterations?.journeyman}
    {journeymanPosition(rosterPlayer.player.position)}
    <span class="add-skill">
        <MaterialButton
            hoverText="Purchase journeyman"
            symbol="paid"
            clickFunction={buyJourneyman}
        />
    </span>
{:else}
    <!-- {rosterPlayer.player.position} -->
    {$_('players.' + rosterPlayer.player.id)}
    {#if danger}
        <span class="danger">
            <i class="material-symbols-outlined no-transition">warning</i>
            {numberOfPlayerType}/{maxOfPlayerType}
        </span>
    {/if}
    <span class="add-skill">
        <MaterialButton
            hoverText="Player advancement"
            symbol="elevator"
            clickFunction={toggleShowSkills}
            cyData={`player-${index}-advancement`}
        />
    </span>
{/if}
{#if tooManyBigGuys}
    <br />
    <span class="danger">
        {$roster.players.filter((x) => x.player.bigGuy)
            .length}/{$currentTeam.maxBigGuys} Big Guys
    </span>
{/if}
{#if $specialistIds?.includes(rosterPlayer.player.id) && $specialistsAmount > $gameSettings?.maxSpecialists}
    <br />
    <span class="danger"
        >{$specialistsAmount}/{$gameSettings?.maxSpecialists} Specialists</span
    >
{/if}

<style lang="scss">
    .add-skill {
        vertical-align: middle;
    }
    .danger {
        color: var(--error);
        i {
            vertical-align: text-bottom;
        }
    }
</style>
