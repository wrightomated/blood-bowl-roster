<script lang="ts">
    import Footer from './components/footer.svelte';
    import Menu from './components/menu/menu.svelte';
    import Team from './components/team.svelte';
</script>

<Menu />
<main>
    <Team />
    <Footer />
</main>

<style lang="scss">
    main {
        padding: 8px;
    }
</style>
