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
    import type { TournamentCustomisation } from './customisation/types/TournmentCustomisation.type';
    import type { CustomTeam } from './customisation/types/CustomiseTeamList.type';
    import { secretTeams } from './modules/secret-league/secretTeams.store';
    import { playerCatalogue } from './store/playerCatalogue.store';

    const savedLocale = localStorage.getItem(localeStorageKey) || 'en';
    let loadingData: Promise<void>;
    locale.set(savedLocale);
    registerLocales(savedLocale);

    export async function preload() {
        // awaits for the loading of the 'en-US' and 'en' dictionaries
        return waitLocale();
    }

    onMount(async () => {
        // let selectedTeam = localStorage.getItem('selectedTeam');
        // loadingData = new Promise(async (resolve) => {
        //     if (selectedTeam) {
        //         console.log('selectedTeam', selectedTeam);
        //         try {
        //             const selectedTeamJson = JSON.parse(selectedTeam);
        //             if (selectedTeamJson.teamId?.includes('st')) {
        //                 customisationRules.set(selectedTeamJson);
        //                 const { secretTeamsData, secretPlayersData } =
        //                     await loadSecretTeams();
        //                 secretTeams.set(secretTeamsData);
        //                 playerCatalogue.setSecretPlayers(secretPlayersData);
        //                 resolve();
        //             } else {
        //                 resolve();
        //             }
        //         } catch (error) {
        //             console.error('Error loading selected team', error);
        //             resolve();
        //         }
        //     } else {
        //         resolve();
        //     }
        // });

        // String replacement by rollup
        const eventId = '__bbroster.env.EVENT_ID';
        // @ts-ignore - this will be a string replacement by rollup
        if (eventId !== 'undefined') {
            try {
                const response = await fetch(
                    `/assets/tournamentData/${eventId}.json`
                );
                const customisation: TournamentCustomisation =
                    await response.json();
                customisationRules.set(customisation);
                if (customisation.cssVariables) {
                    Object.entries(customisation.cssVariables).forEach(
                        (style) =>
                            document.documentElement.style.setProperty(
                                style[0],
                                style[1]
                            )
                    );
                }
            } catch (error) {
                console.error('Error loading customisation', error);
            }
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

<!-- {#await loadingData}
    <div>Loading...</div>
{:then} -->
<div class="application">
    <Menu />
    <div>
        <main>
            <Team />
        </main>
    </div>
    <Footer />
</div>

<!-- {/await} -->

<!-- <div class="application">
    <Menu />
    <main>
        <Team />
    </main>
    <Footer />
</div> -->

<style lang="scss">
    .application {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    main {
        padding: 8px;
        max-width: 1600px;
        margin: 0 auto 2rem auto;
    }
</style>
