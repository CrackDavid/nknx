<template>
  <div>
    <div class="row">
      <div class="col col_xs_3">
        <NetworkStatus/>
      </div>
      <div class="col col_xs_3">
        <DailyAverageTransactions/>
      </div>
    </div>
  </div>
</template>

<script>
import NetworkStatus from '~/components/Widgets/Network/NetworkStatus/NetworkStatus.vue'
import DailyAverageTransactions from '~/components/Widgets/Network/DailyAverageTransactions/DailyAverageTransactions.vue'

export default {
  auth: false,
  components: {
    NetworkStatus,
    DailyAverageTransactions
  }
}
</script>
