<script lang="ts">
    import ColumnControl from './components/columnControl.svelte';

    import Footer from './components/footer.svelte';
    import Menu from './components/menu/menu.svelte';
    import Team from './components/team.svelte';
    import Modal from './components/uiComponents/modal.svelte';
</script>

<Modal>
    <ColumnControl />
</Modal>
<Menu />
<!-- <Modal /> -->
<main>
    <Team />
    <Footer />
</main>

<style lang="scss">
    main {
        padding: 8px;
    }
</style>
