<script lang="ts">
    import Footer from './components/footer.svelte';
    import Menu from './components/menu/menu.svelte';
    import Team from './components/team.svelte';
    import Modal from './components/uiComponents/modal.svelte';

    import Overlay from './components/uiComponents/overlay.svelte';
    import { onMount } from 'svelte';
    import { customisationRules } from './customisation/customisation.store';

    onMount(async () => {
        // String replacement by rollup
        const eventId = '__bbroster.env.EVENT_ID';
        // @ts-ignore - this will be a string replacement by rollup
        if (eventId !== 'undefined') {
            try {
                await import(`./customisation/data/${eventId}.data`).then(
                    (customisation) => {
                        console.log({ customisation });

                        customisationRules.set(
                            customisation.tournamentCustomisation
                        );
                    }
                );
            } catch (error) {}
        }

        await import('./components/auth/firebaseAuth.service').then(
            (firebase) => {
                firebase.init();
            }
        );
    });
</script>

<Modal />
<Overlay />

<div class="application">
    <Menu />
    <main>
        <Team />
    </main>
    <Footer />
</div>

<style lang="scss">
    main {
        padding: 8px;
        max-width: 1600px;
        margin: 0 auto;
    }
</style>
