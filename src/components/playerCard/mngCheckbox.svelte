<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { roster } from '../../store/teamRoster.store';

    export let index: number;
    export let title: string = 'MNG:';
</script>

<label
    ><span class="mini-title">{title}</span>
    <input
        type="checkbox"
        class="checkbox"
        use:blurOnEscapeOrEnter
        bind:checked={$roster.players[index].alterations.mng}
    />
</label>
