<script lang="ts">
    import { customisationRules } from '../../customisation.store';

    export let tier: string;

    customisationRules;
    function getTierInfo(tier: string) {
        return $customisationRules?.tournamentAdvancements?.tiers[tier];
    }
</script>

<div class="boxed-div">
    spp: {getTierInfo(tier).spp}
    advancements: $customisationRules.tournamentAdvancements.advancementCost
</div>
