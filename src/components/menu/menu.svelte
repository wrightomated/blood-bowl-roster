<script lang="ts">
    import { sendEventToAnalytics } from '../../analytics/plausible';
    import { showDungeonBowl } from '../../store/showDungeonBowl.store';
    import { teamLoadOpen } from '../../store/teamLoadOpen.store';
    import { roster } from '../../store/teamRoster.store';
    import {
        showNewTeamDialogue,
        teamSelectionOpen,
    } from '../../store/teamSelectionOpen.store';
    import { currentTeam } from '../../store/currentTeam.store';

    import Button from '../uiComponents/button.svelte';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import { teamFormat } from '../../store/teamFormat.store';

    // have menu store?
    let isOpen = false;
    const toggleDrawer = () => {
        isOpen = !isOpen;
    };
    const loadCurrentTeam = () => {
        teamSelectionOpen.set(false);
        showNewTeamDialogue.set(false);
        teamLoadOpen.set(false);
        showDungeonBowl.set(false);
        isOpen = false;
        currentTeam.setCurrentTeamWithId($roster.teamId);
    };
    const newTeam = () => {
        teamSelectionOpen.set($teamFormat !== 'dungeon bowl');
        showNewTeamDialogue.set(true);
        teamLoadOpen.set(false);
        showDungeonBowl.set($teamFormat === 'dungeon bowl');
        isOpen = false;
    };
    const loadTeam = () => {
        teamLoadOpen.set(true);
        showNewTeamDialogue.set(false);
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

<header class="header" class:header--drawer-open={isOpen}>
    <div class="menu__icon" class:menu__icon--close={isOpen}>
        <MaterialButton
            cyData="menu-button"
            symbol={isOpen ? 'close' : 'menu'}
            hoverText={isOpen ? 'Close menu' : 'Open menu'}
            clickFunction={toggleDrawer}
        />
    </div>
    <h1>BB Roster</h1>
</header>
<div class="spacer" class:spacer--show={isOpen} />
<nav class="menu__drawer" class:menu__drawer--open={isOpen}>
    <div class="menu__buttons" class:menu__buttons--hidden={!isOpen}>
        {#if $roster.teamType}
            <Button clickFunction={loadCurrentTeam}
                >Current Team{$roster.teamName
                    ? ': ' + $roster.teamName
                    : ''}</Button
            >
        {/if}
        <Button cyData="new-team" clickFunction={newTeam}>New Team</Button>
        <Button cyData="load-team" clickFunction={loadTeam}>Load Team</Button>
        <!-- <Button cyData="dungeon-bowl" clickFunction={dungeonBowl}
            >Dungeon Bowl</Button
        > -->
    </div>
</nav>

<div class="overlay" on:click={toggleDrawer} class:overlay--visible={isOpen} />

<style lang="scss">
    :root {
        --header-height: 60px;
    }
    .header {
        position: relative;
        z-index: 8;
        width: 100%;
        text-align: center;
        border-bottom: var(--secondary-colour) 2px solid;
        background-color: white;
        display: flex;
        align-items: center;
        &--drawer-open {
            position: fixed;
        }
        h1 {
            margin: 12px 0;
            color: var(--main-colour);
        }
        @media print {
            display: none;
        }
    }
    .spacer {
        height: 63px;
        display: none;

        &--show {
            display: block;
        }
    }
    .menu {
        &__icon {
            z-index: 9;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background-color: white;
            margin: 0 12px;
            @media print {
                display: none;
            }
        }
        &__drawer {
            z-index: 7;

            width: 100%;
            position: fixed;
            left: 0;
            top: -124px;
            transition: transform 250ms ease-in-out;
            background: white;
            height: 124px;
            border-bottom: 2px solid var(--secondary-colour);
            &--open {
                transform: translateY(124px);
            }
        }
        &__buttons {
            display: flex;
            padding: 16px;
            margin-top: 52px;
            &--hidden {
                display: none;
            }
        }
        @media screen and (max-width: 783px) {
            &__drawer {
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
        z-index: 6;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.33);
        transition: opacity 250ms ease-in-out;
        opacity: 0;
        visibility: hidden;
        display: block;

        &--visible {
            visibility: visible;
            opacity: 1;
        }
    }
</style>
