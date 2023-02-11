<script lang="ts">
    let imgInputElement;
    let imgPreview;
    $: file = undefined;
    // import Button from './uiComponents/button.svelte';
    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files);
    }

    // let dropbox: HTMLElement;
    // dropbox = document.getElementById('drop-zone');
    // console.log({ dropbox });

    // dropbox?.addEventListener('dragenter', dragenter, false);
    // dropbox?.addEventListener('dragover', dragover, false);
    // dropbox?.addEventListener('drop', drop, false);

    function handleFiles(files: any) {
        file = files[0];
        if (!file?.type?.startsWith('image/')) {
            return;
        }
        imagePreview();

        // document.getElementById('drop-zone').appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
    }

    function handleUpload(event: any) {
        if (event?.target?.files) {
            file = event.target?.files[0];
            imagePreview();
        }
    }

    function imagePreview() {
        imgPreview.file = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imgPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    async function uploadFile() {
        const service = await import('./auth/firebaseStorage.service');
        service.uploadFile(file);
    }
</script>

<!-- {file} -->
<input
    type="file"
    id="roster-image-upload"
    name="img"
    accept="image/*"
    bind:this={imgInputElement}
    on:change={handleUpload}
    class="display-none"
/>
<div
    class="drop-zone"
    id="drop-zone"
    class:display-none={!!file}
    on:dragenter={dragenter}
    on:dragover={dragover}
    on:drop={drop}
    on:click={() => imgInputElement.click()}
>
    <i class="material-symbols-outlined">place_item</i>
</div>
<img
    class="img-preview"
    class:display-none={!file}
    alt="uploaded"
    bind:this={imgPreview}
/>
<button on:click={uploadFile}>Upload</button>
<button on:click={() => (file = undefined)}>Cancel</button>

<style lang="scss">
    .img-preview {
        // height: 200px;
        max-width: 500px;
    }
    .drop-zone {
        cursor: pointer;
        height: 100px;
        width: 100px;
        background-color: var(--secondary-background-colour);
        border: 2px dashed;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-size: 32px;
        }
    }
    .display-none {
        display: none;
    }
</style>
