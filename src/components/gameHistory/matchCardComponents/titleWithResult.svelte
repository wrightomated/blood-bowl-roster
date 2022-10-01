<script lang="ts">
    export let title: string;
    export let result: number;
    export let background: 'none' | 'main' | 'secondary' | 'neutral' =
        'neutral';

    const formatter = new Intl.NumberFormat();
</script>

<div class="container {background}">
    <p>{title}</p>
    <p class="result">{formatter.format(result)}</p>
</div>

<style lang="scss">
    .container {
        flex: 1;
        // font-family: var(--display-font);
        text-align: center;
        // margin-top: 8px;
        // margin-bottom: 8px;
        border-radius: 12px;
        padding: 12px;

        &.neutral {
            background-color: var(--secondary-background-colour);
        }
        &.main {
            background-color: var(--main-colour);
            color: white;
        }
        &.secondary {
            background-color: var(--secondary-colour);
            color: white;
        }
        p {
            margin-block-start: 0;
            margin-block-end: 0;
        }

        .result {
            font-size: 20px;
            font-family: var(--display-font);
        }
    }
</style>
