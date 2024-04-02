<script lang="ts">
    import { _ } from 'svelte-i18n';
</script>

<footer class="no-print">
    <p class="blog-link">
        <strong
            ><a href="https://blog.bbroster.com" title="BB Roster Blog"
                >{$_('footer.blog')}
                <i class="material-symbols-outlined">open_in_new</i></a
            ></strong
        >
    </p>
    <p>
        {$_('footer.rules')}
    </p>
    <p>
        {$_('footer.wip')}
    </p>
    <p>
        <a
            href="https://blog.bbroster.com/private-policy/"
            title=""
            target="_blank"
            class="blog-link"
            >{$_('footer.privacy')}
            <i class="material-symbols-outlined">open_in_new</i></a
        >
        |
        <a
            href="https://blog.bbroster.com/terms-of-use/"
            target="_blank"
            class="blog-link"
            >{$_('footer.terms')}
            <i class="material-symbols-outlined">open_in_new</i></a
        >
        |
        <a href="mailto:bbrosterapp@gmail.com" class="blog-link"
            >{$_('common.email')}
            <i class="material-symbols-outlined">email</i></a
        >
    </p>
</footer>

<style lang="scss">
    .blog-link {
        text-decoration: underline;
        i {
            font-size: 12px;
            text-decoration: underline;
            color: var(--secondary-colour);
        }
    }
    p {
        text-align: left;
        font-size: small;
    }
    footer {
        border-top: 1px solid var(--secondary-colour);
        margin: 2em 8px 0 8px;
        padding-bottom: 1em;
    }
</style>
