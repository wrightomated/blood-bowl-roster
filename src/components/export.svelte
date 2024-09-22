<script lang="ts">
    import { rosterToString } from '../helpers/rosterToString';
    import RosterTextSummary from '../modules/shareRoster/rosterTextSummary.svelte';

    import { showExport } from '../store/showExport.store';
    import { roster } from '../store/teamRoster.store';

    import MaterialButton from './uiComponents/materialButton.svelte';

    const baseUrl = window?.origin || 'https://bbroster.com';

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
        navigator.clipboard.writeText(urlInputBox.innerText);
        toggleFn();
    };

    roster.subscribe((x) => {
        urlCoppied = false;
        codeCoppied = false;
    });
</script>

{#if $showExport}
    <div class="boxed-div">
        <div class="share-box">
            <label for="url-string">Share Url:</label>
            <p id="url-string">{baseUrl}?code={code}</p>

            {#if !urlCoppied}
                <MaterialButton
                    hoverText="Copy Url"
                    symbol="content_copy"
                    cyData="copy-share-url"
                    clickFunction={() => copyLink(toggleUrlCopy, '#url-string')}
                />
            {:else}<i class="material-symbols-outlined saved">check_circle</i
                >{/if}
        </div>
        <div class="share-box">
            <label for="code-string">Export Code:</label>
            <p id="code-string">{code}</p>

            {#if !codeCoppied}
                <MaterialButton
                    hoverText="Copy Code"
                    symbol="content_copy"
                    clickFunction={() =>
                        copyLink(toggleCodeCopy, '#code-string')}
                />
            {:else}<i class="material-symbols-outlined saved">check_circle</i
                >{/if}
        </div>
        <RosterTextSummary />
    </div>
{/if}

<style lang="scss">
    .share-box {
        display: flex;
        padding: 10px;
        align-items: center;

        label {
            margin-right: 1em;
        }
        .saved {
            color: green;
        }
    }
</style>
