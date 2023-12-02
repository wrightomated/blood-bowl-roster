<script lang="ts">
    import { onMount } from 'svelte';
    import { customisationRules } from './customisation/customisation.store';
    import { waitLocale, locale } from 'svelte-i18n';
    import { localeStorageKey, registerLocales } from './locale/i18n';

    import Footer from './components/footer.svelte';
    import Menu from './components/menu/menu.svelte';
    import Team from './components/team.svelte';
    import Modal from './components/uiComponents/modal.svelte';
    import Overlay from './components/uiComponents/overlay.svelte';

    const savedLocale = localStorage.getItem(localeStorageKey) || 'en';
    locale.set(savedLocale);
    registerLocales(savedLocale);

    export async function preload() {
        // awaits for the loading of the 'en-US' and 'en' dictionaries
        return waitLocale();
    }

    onMount(async () => {
        // String replacement by rollup
        const eventId = '__bbroster.env.EVENT_ID';
        // @ts-ignore - this will be a string replacement by rollup
        if (eventId !== 'undefined') {
            try {
                // String replacement is happening after build so the data file isn't getting bundled
                // Might need to switch to json
                // await import(`./customisation/data/${eventId}.data`).then(
                await import(`./customisation/data/bigV2023.data`).then(
                    (customisation) => {
                        customisationRules.set(
                            customisation.tournamentCustomisation
                        );
                        if (
                            customisation.tournamentCustomisation.cssVariables
                        ) {
                            Object.entries(
                                customisation.tournamentCustomisation
                                    .cssVariables
                            ).forEach((style) =>
                                document.documentElement.style.setProperty(
                                    style[0],
                                    style[1]
                                )
                            );
                        }
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
