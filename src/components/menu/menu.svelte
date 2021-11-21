<script lang="ts">
    import { sendEventToAnalytics } from '../../analytics/plausible';
    import { teamIndex } from '../../data/teamIndex.data';

    import { showDungeonBowl } from '../../store/showDungeonBowl.store';

    import { teamLoadOpen } from '../../store/teamLoadOpen.store';
    import { roster } from '../../store/teamRoster.store';

    import { teamSelectionOpen } from '../../store/teamSelectionOpen.store';

    import Button from '../uiComponents/button.svelte';
    import MaterialButton from '../uiComponents/materialButton.svelte';

    // have menu store
    let isOpen = false;
    const toggleDrawer = () => {
        isOpen = !isOpen;
    };
    const currentTeam = () => {
        teamSelectionOpen.set(false);
        teamLoadOpen.set(false);
        showDungeonBowl.set(false);
        isOpen = false;
    };
    const newTeam = () => {
        teamSelectionOpen.set(true);
        teamLoadOpen.set(false);
        showDungeonBowl.set(false);
        isOpen = false;
    };
    const loadTeam = () => {
        teamLoadOpen.set(true);
        teamSelectionOpen.set(false);
        showDungeonBowl.set(false);
        isOpen = false;
    };
    const dungeonBowl = () => {
        teamLoadOpen.set(false);
        teamSelectionOpen.set(false);
        showDungeonBowl.set(true);
        sendEventToAnalytics('dungeon-bowl');
        isOpen = false;
    };
</script>

<span class="menu__icon" class:menu__icon--close={isOpen}>
    <MaterialButton
        cyData="menu-button"
        symbol={isOpen ? 'close' : 'menu'}
        hoverText={isOpen ? 'Close menu' : 'Open menu'}
        clickFunction={toggleDrawer}
    />
</span>

<nav class="menu__drawer" class:menu__drawer--open={isOpen}>
    <header>
        <h1>BB Roster</h1>
    </header>
    <div class="menu__buttons" class:menu__buttons--hidden={!isOpen}>
        {#if $roster.teamType}
            <Button cyData="current-team" clickFunction={currentTeam}
                >Current Team{$roster.teamName
                    ? ': ' + $roster.teamName
                    : ''}</Button
            >
        {/if}
        <Button cyData="new-team" clickFunction={newTeam}>New Team</Button>
        <Button cyData="load-team" clickFunction={loadTeam}>Load Team</Button>
        <Button cyData="dungeon-bowl" clickFunction={dungeonBowl}
            >Dungeon Bowl</Button
        >
    </div>
</nav>
<div class="overlay" on:click={toggleDrawer} class:overlay--visible={isOpen} />

<style lang="scss">
    header {
        z-index: 8;
        width: 100%;
        text-align: center;
        border-bottom: var(--secondary-colour) 2px solid;
        background-color: white;
        h1 {
            margin: 12px 0;
            color: var(--main-colour);
        }
    }
    .menu {
        &__icon {
            position: absolute;
            top: 16px;
            left: 8px;
            z-index: 9;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background-color: white;
            &--close {
                position: fixed;
            }
            @media print {
                display: none;
            }
        }
        &__drawer {
            z-index: 7;

            width: 100%;
            position: fixed;
            left: 0;
            top: -334px;
            transition: transform 250ms ease-in-out;
            background: white;
            height: 135px;
            border-bottom: 2px solid var(--secondary-colour);
            &--open {
                transform: translateY(334px);
            }
        }
        &__buttons {
            display: flex;
            padding: 16px;
            // margin-top: 20px;
            &--hidden {
                display: none;
            }
        }
        @media screen and (max-width: 783px) {
            &__drawer {
                // position: fixed;
                height: 100%;
                top: -101%;

                &--open {
                    transform: translateY(101%);
                }
            }
            &__buttons {
                flex-direction: column;
            }
        }
    }
    .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.33);
        display: none;
        &--visible {
            display: block;
        }
    }
</style>
