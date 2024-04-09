<script lang="ts">
    import { matchHistorySteps } from '../../store/steppers.store';
    import Stepper from '../uiComponents/stepper/stepper.svelte';
</script>

<Stepper stepStore={matchHistorySteps} title="match.new" />
