<script lang="ts">
    import Footer from './components/footer.svelte';
    import Menu from './components/menu/menu.svelte';
    import Team from './components/team.svelte';
    import Modal from './components/uiComponents/modal.svelte';

    import Overlay from './components/uiComponents/overlay.svelte';
    import { onMount } from 'svelte';

    onMount(async () => {
        await import('./components/auth/firebaseAuth.service').then(
            (firebase) => {
                firebase.init();
            }
        );
    });
</script>

<Modal />
<Overlay />
<Menu />

<main>
    <Team />
</main>
<Footer />

<style lang="scss">
    main {
        padding: 8px;
        max-width: 1600px;
        margin: 0 auto;
    }
</style>
