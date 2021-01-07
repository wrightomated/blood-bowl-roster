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

<style lang="scss">
    @import '../styles/colour';
    p {
        text-align: left;
        font-size: small;
    }
    span {
        color: $main-colour;
        &:hover {
            text-decoration: underline;
        }
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

<footer>
    <p>
        No cookies are used on this website. Local storage is used for storing
        saved and current rosters.
        <span on:click={toggleLocalStorage}>Delete local storage.</span>
    </p>
    <p>
        Rule references and player names are property of Games Workshop. This
        site is not affiliated with Games Workshop. I just think they're neat.
    </p>
    <p>
        This is a work in progres.
        <a href="mailto:bbrosterapp@gmail.com">Email</a>
        for all queries, concerns and suggestions.
    </p>
</footer>
