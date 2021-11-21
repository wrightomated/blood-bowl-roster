<script lang="ts">
    import Footer from './components/footer.svelte';
    import Header from './components/header.svelte';
    import Menu from './components/menu/menu.svelte';
    import Team from './components/team.svelte';
</script>

<!-- <Header /> -->
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
