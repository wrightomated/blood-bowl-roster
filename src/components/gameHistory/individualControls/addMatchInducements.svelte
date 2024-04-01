<script lang="ts">
    import { inducementAndStarsInRoster } from '../../../store/currentInducements.store';
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import MatchInducements from './matchInducements.svelte';
    import { _ } from 'svelte-i18n';
</script>

<div
    class="inducements"
    in:slide|local={{ duration: 300, easing: quadInOut }}
    out:slide|local={{ duration: 300, easing: quadInOut }}
>
    <div>{$_('match.inducements.directions')}</div>
    <MatchInducements inducements={$inducementAndStarsInRoster} />
</div>

<style>
    .inducements {
        margin: 16px 0;
    }
</style>
