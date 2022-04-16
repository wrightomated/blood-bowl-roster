<script lang="ts">
    import { currentUserStore } from '../../store/currentUser.store';
    import { modalState } from '../../store/modal.store';
    import { overlayVisible } from '../../store/overlayVisible.store';
    import RegisterForm from './registerForm.svelte';
    import LoginForm from './loginForm.svelte';
    import Button from '../uiComponents/button.svelte';
    import { menuDrawerOpen } from '../../store/menuDrawer.store';

    let logOutEnabled = true;
    const showModal = (component: string) => {
        menuDrawerOpen.set(false);
        modalState.set({
            ...$modalState,
            isOpen: true,
            component: component === 'register' ? RegisterForm : LoginForm,
        });
        overlayVisible.set(true);
    };

    const signUserOut = async () => {
        logOutEnabled = false;
        const firebase = await import('./firebaseAuth.service');
        await firebase.logout();
        menuDrawerOpen.set(false);
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
