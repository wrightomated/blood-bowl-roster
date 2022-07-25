<header>
    <h1>BB Roster</h1>
</header>

<style lang="scss">
    header {
        position: relative;
        z-index: 8;
        width: calc(100% - 16px);
        padding: 8px;
        text-align: center;
        border-bottom: var(--neutral) 1px solid;
        margin-bottom: 16px;
        background-color: var(--background);
        h1 {
            color: var(--main-colour);
            margin-block-end: 0;
            margin-top: 0;
        }
    }
    @media print {
        header {
            display: none;
        }
    }
</style>
