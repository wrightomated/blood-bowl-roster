<script lang="ts">
    import Footer from './components/footer.svelte';
    import Menu from './components/menu/menu.svelte';
    import Team from './components/team.svelte';
    import Modal from './components/uiComponents/modal.svelte';

    import Overlay from './components/uiComponents/overlay.svelte';
    import { onMount } from 'svelte';
    import UploadRoster from './components/auth/uploadRoster.svelte';

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
<UploadRoster />

<main>
    <Team />
    <Footer />
</main>

<style lang="scss">
    main {
        padding: 8px;
    }
</style>
