<script lang="ts">
    import { currentUserStore } from '../../store/currentUser.store';
    import { modalState } from '../../store/modal.store';
    import RegisterForm from './registerForm.svelte';
    import LoginForm from './loginForm.svelte';
    import Button from '../uiComponents/button.svelte';
    import { menuDrawerOpen } from '../../store/menuDrawer.store';
    import LoggedOut from './loggedOut.svelte';

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
        >Logout</Button
    >
{:else}
    <Button clickFunction={() => showModal('login')}>Login</Button>
    <Button clickFunction={() => showModal('register')}>Register</Button>
{/if}
