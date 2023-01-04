<script lang="ts">
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import { menuDrawerOpen } from '../../store/menuDrawer.store';
    import MenuItems from './menuItems.svelte';
    import UserProfile from '../auth/userProfile.svelte';
    import UserCircle from './userCircle.svelte';

    let menuComponent: typeof MenuItems | typeof UserProfile;

    const toggleNavMenu = () => {
        menuComponent = MenuItems;
        menuDrawerOpen.set(!$menuDrawerOpen);
    };

    const toggleUserProfile = () => {
        menuComponent = UserProfile;
        menuDrawerOpen.set(!$menuDrawerOpen);
    };

    const closeDrawer = () => {
        menuDrawerOpen.set(false);
    };
</script>

<header class="header" class:header--drawer-open={$menuDrawerOpen}>
    <div class="menu__icon" class:menu__icon--close={$menuDrawerOpen}>
        <MaterialButton
            cyData="menu-button"
            symbol={$menuDrawerOpen ? 'close' : 'menu'}
            hoverText={$menuDrawerOpen ? 'Close menu' : 'Open menu'}
            clickFunction={toggleNavMenu}
        />
    </div>
    <h1>BB Roster</h1>
    <button class="profile" title="User Profile" on:click={toggleUserProfile}>
        <UserCircle />
    </button>
</header>
<div class="spacer" class:spacer--show={$menuDrawerOpen} />
<nav class="menu__drawer" class:menu__drawer--open={$menuDrawerOpen}>
    <div
        class="menu__buttons"
        class:menu__buttons--hidden={!$menuDrawerOpen}
        class:menu__buttons--reversed={menuComponent === UserProfile}
    >
        <svelte:component this={menuComponent} />
    </div>
</nav>

<div
    class="overlay"
    on:click={closeDrawer}
    class:overlay--visible={$menuDrawerOpen}
/>

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
    .profile {
        margin: 0px 12px 0 auto;
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        color: var(--shadow);
        &:hover {
            color: var(--main-colour);
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
            border-bottom: var(--secondary-border);
            &--open {
                transform: translateY(124px);
            }
            @media print {
                display: none;
            }
        }
        &__buttons {
            display: flex;
            padding: 16px;
            margin-top: 52px;
            &--hidden {
                display: none;
            }
            &--reversed {
                justify-content: flex-end;
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
