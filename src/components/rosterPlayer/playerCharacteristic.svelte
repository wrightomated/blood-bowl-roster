<script lang="ts">
    import { roster } from '../../store/teamRoster.store';
    import {
        characteristicMaxValue,
        characteristicMinValue,
    } from '../../data/statOrder.data';

    export let index: number;
    export let charIndex: number;

    $: rosterPlayer = $roster.players[index];
    $: alteredStat =
        (rosterPlayer?.alterations?.statChange?.[charIndex] || 0) -
        (rosterPlayer?.alterations?.injuries?.[charIndex] || 0);

    const getBoundedStat = (alt: number, i: number) => {
        switch (i) {
            case 2:
            case 3:
                return alt > characteristicMinValue[i]
                    ? characteristicMinValue[i]
                    : alt < characteristicMaxValue[i]
                    ? characteristicMaxValue[i]
                    : alt;
            default:
                return alt < characteristicMinValue[i]
                    ? characteristicMinValue[i]
                    : alt > characteristicMaxValue[i]
                    ? characteristicMaxValue[i]
                    : alt;
        }
    };

    const getStat = (stat: number, i: number) => {
        const alteredStat =
            stat +
            (rosterPlayer?.alterations?.statChange?.[i] || 0) *
                (i === 2 || i === 3 ? -1 : 1) -
            (rosterPlayer?.alterations?.injuries?.[i] || 0) *
                (i === 2 || i === 3 ? -1 : 1);
        const boundedStat = stat === 0 ? 0 : getBoundedStat(alteredStat, i);
        return `${
            boundedStat === 0 ? '-' : i > 1 ? `${boundedStat}+` : boundedStat
        }`;
    };
</script>

<span class:improved={alteredStat > 0} class:degraded={alteredStat < 0}
    >{getStat(rosterPlayer.player.playerStats[charIndex], charIndex)}</span
>

<style lang="scss">
    .improved {
        color: green;
    }
    .degraded {
        color: var(--main-colour);
    }
</style>
