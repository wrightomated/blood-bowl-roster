<script lang="ts">
    import HeaderModalContainer from '../uiComponents/headerModalContainer.svelte';
    import TextElement from '../uiComponents/textElement.svelte';
    import Export from './export.svelte';
    import RosterTextSummary from './rosterTextSummary.svelte';

    let options = ['link', 'roster summary', 'csv'];
    let optionMap = {
        link: {
            title: 'Roster code',
            icon: 'link',
            caption: 'Share a link to this roster',
            show: () => true,
            component: Export,
        },
        'roster summary': {
            title: 'Roster Summary',
            icon: 'text_snippet',
            caption: 'Share a text summary of this roster',
            show: () => true,
            component: RosterTextSummary,
        },
        csv: {
            title: 'CSV',
            icon: 'csv',
            caption: 'Export this roster as a CSV',
            show: () => true,
            component: TextElement,
            componentProps: { text: 'Coming soon' },
        },
    };
</script>

<HeaderModalContainer {options} {optionMap} />
