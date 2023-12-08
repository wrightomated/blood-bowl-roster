<script lang="ts">
    import { currentUserStore } from '../../store/currentUser.store';
    import { modalState } from '../../store/modal.store';
    import RegisterForm from './registerForm.svelte';
    import LoginForm from './loginForm.svelte';
    import Button from '../uiComponents/button.svelte';
    import { menuDrawerOpen } from '../../store/menuDrawer.store';
    import LoggedOut from './loggedOut.svelte';
    import { _ } from 'svelte-i18n';

    let logOutEnabled = true;
    const showModal = (component: string) => {
        menuDrawerOpen.set(false);
        modalState.set({
            ...$modalState,
            isOpen: true,
            component: component === 'register' ? RegisterForm : LoginForm,
        });
    };

    const signUserOut = async () => {
        logOutEnabled = false;
        modalState.set({
            ...$modalState,
            isOpen: true,
            component: LoggedOut,
        });
        const firebase = await import('./firebaseAuth.service');
        await firebase.logout();
        menuDrawerOpen.set(false);
        logOutEnabled = true;
    };
</script>

{#if $currentUserStore?.uid}
    <Button clickFunction={signUserOut} cancel disabled={!logOutEnabled}
        >{$_('menu.logout')}</Button
    >
{:else}
    <Button clickFunction={() => showModal('login')}>{$_('menu.login')}</Button>
    <Button clickFunction={() => showModal('register')}
        >{$_('menu.register')}</Button
    >
{/if}
