<script lang="ts">
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';

    import { rosterToString } from '../helpers/rosterToString';

    import { showExport } from '../store/showExport.store';
    import { roster } from '../store/teamRoster.store';

    import MaterialButton from './uiComponents/materialButton.svelte';

    const baseUrl = 'https://bbroster.com';

    let urlCoppied = false;
    let codeCoppied = false;

    $: code = rosterToString($roster);

    const toggleUrlCopy = () => {
        urlCoppied = !urlCoppied;
        codeCoppied = false;
    };
    const toggleCodeCopy = () => {
        codeCoppied = !codeCoppied;
        urlCoppied = false;
    };

    const copyLink = (toggleFn: () => void, id: string) => {
        const urlInputBox: HTMLInputElement = document.querySelector(id);
        urlInputBox.select();
        document.execCommand('copy');
        toggleFn();
    };

    roster.subscribe((x) => {
        urlCoppied = false;
        codeCoppied = false;
    });
</script>

{#if $showExport}
    <div class="container">
        <div class="share-box">
            <label for="url-input">Share Url:</label>
            <input
                id="url-input"
                value="{baseUrl}?code={code}"
                use:blurOnEscapeOrEnter
                readonly
            />
            {#if !urlCoppied}
                <MaterialButton
                    hoverText="Copy Url"
                    symbol="content_copy"
                    cyData="copy-share-url"
                    clickFunction={() => copyLink(toggleUrlCopy, '#url-input')}
                />
            {:else}<i class="material-symbols-outlined saved">check_circle</i
                >{/if}
        </div>
        <div class="share-box">
            <label for="code-input">Export Code:</label>
            <input
                id="code-input"
                data-cy="code-input"
                value={code}
                use:blurOnEscapeOrEnter
                readonly
            />
            {#if !codeCoppied}
                <MaterialButton
                    hoverText="Copy Code"
                    symbol="content_copy"
                    clickFunction={() =>
                        copyLink(toggleCodeCopy, '#code-input')}
                />
            {:else}<i class="material-symbols-outlined saved">check_circle</i
                >{/if}
        </div>
    </div>
{/if}

<style lang="scss">
    .container {
        border-radius: 12px;
        background: var(--secondary-background-colour);
        padding: 10px;
        margin-bottom: 1em;
    }
    .share-box {
        display: flex;
        padding: 10px;
        align-items: center;

        input {
            margin-right: 1em;
        }
        label {
            margin-right: 1em;
        }
        .saved {
            color: green;
        }
    }
</style>
