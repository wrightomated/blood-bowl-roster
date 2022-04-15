<script lang="ts">
    import Footer from './components/footer.svelte';
    import Menu from './components/menu/menu.svelte';
    import Team from './components/team.svelte';
    import Modal from './components/uiComponents/modal.svelte';

    import RegisterForm from './components/auth/registerForm.svelte';
    import Overlay from './components/uiComponents/overlay.svelte';
    import { modalState } from './store/modal.store';
    import { overlayVisible } from './store/overlayVisible.store';
    import { onMount } from 'svelte';
    import LoginForm from './components/auth/loginForm.svelte';

    const showModal = (component: string) => {
        modalState.set({
            ...$modalState,
            isOpen: true,
            component: component === 'register' ? RegisterForm : LoginForm,
        });
        overlayVisible.set(true);
    };
    onMount(async () => {
        await import('./components/auth/firebase.service').then((firebase) => {
            firebase.init();
        });
    });
</script>

<Modal />
<Overlay />
<Menu />

<main>
    <button on:click={() => showModal('login')}>login</button>
    <button on:click={() => showModal('register')}>register</button>
    <Team />
    <Footer />
</main>

<style lang="scss">
    main {
        padding: 8px;
    }
</style>
