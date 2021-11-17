<script lang="ts">
    import { toggleAnalyticsStorage } from '../analytics/analyticsHelper';

    import { analyticsConsent } from '../store/analyticsConsent.store';

    // import { localStorageConsent } from '../store/localStorageConsent.store';

    // const toggleLocalStorage = () => {
    //     const s = $localStorageConsent;
    //     if (s) {
    //         localStorage.clear();
    //     }
    //     localStorageConsent.set(!s);
    //     location.reload();
    // };

    const toggleAnalytics = () => {
        const consent = $analyticsConsent;
        toggleAnalyticsStorage(consent);
        analyticsConsent.set(!consent);
    };
</script>

<footer>
    <p>Google analytics have been added to help make this better.</p>
    <button on:click={() => toggleAnalytics()}
        >{$analyticsConsent
            ? 'Deny Google cookie'
            : 'Allow Google cookie'}</button
    >

    <p>
        Rule references and player names are property of Games Workshop. This
        site is not affiliated with Games Workshop. I just think they're neat.
    </p>
    <p>
        This is a work in progress. For all queries, concerns and suggestions
        please <a href="mailto:bbrosterapp@gmail.com">email</a>
        or
        <a href="https://github.com/wrightomated/blood-bowl-roster/issues"
            >raise an issue on github</a
        >.
    </p>
</footer>

<style lang="scss">
    @import '../styles/colour';
    p {
        text-align: left;
        font-size: small;
    }
    footer {
        border-top: 1px solid $secondary-colour;
        margin-top: 2em;
        padding-bottom: 1em;
    }
    @media print {
        footer {
            display: none;
        }
    }
</style>
