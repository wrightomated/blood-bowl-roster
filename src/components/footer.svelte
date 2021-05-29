<script lang="ts">
    import { localStorageConsent } from '../store/localStorageConsent.store';

    const toggleLocalStorage = () => {
        const s = $localStorageConsent;
        if (s) {
            localStorage.clear();
        }
        localStorageConsent.set(!s);
        location.reload();
    };
</script>

<footer>
    <p>
        No cookies are used on this website. Local storage is used for storing
        saved and current rosters.
        <!-- <span on:click={toggleLocalStorage}>Delete local storage.</span> -->
    </p>
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
