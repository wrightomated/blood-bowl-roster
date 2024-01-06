<script lang="ts">
    import { _, locale } from 'svelte-i18n';
    import { availableLocales, localeStorageKey } from '../i18n';

    function changeLocale(e) {
        const value = e.target.value;
        localStorage.setItem(localeStorageKey, value);
        // TODO: add this to firebase?
    }
</script>

<div>
    <i class="material-symbols-outlined">language</i>
    <select
        aria-label={$_('menu.locale')}
        bind:value={$locale}
        on:change={changeLocale}
        name="locale"
    >
        {#each availableLocales as l}
            <option value={l}>{l}</option>
        {/each}
    </select>
</div>

<style>
    div {
        display: flex;
        align-items: center;
        margin: 0 8px;
        gap: 4px;
    }
</style>
