<template>
  <Card>
    <div class="sparkline-stats">
      <div class="sparkline-stats__header">
        <div class="sparkline-stats__title">Average Transactions per Day</div>
        <div
          class="sparkline-stats__change"
          :class="{'sparkline-stats__change_positive': change24>0, 'sparkline-stats__change_negative': change24<0}"
        >
          <span
            class="fe sparkline-stats__icon"
            :class="{'fe-arrow-up-right':change24>0, 'fe-arrow-down-left':change24<0}"
          />
          {{change24}}%
        </div>
      </div>
      <div class="sparkline-stats__value">{{dailyTransactions[0].count}}</div>
      <div class="sparkline-stats__chart">
        <DailyAverageTransactionsChart/>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '~/components/Card/Card.vue'
import DailyAverageTransactionsChart from '~/components/Charts/DailyAverageTransactionsChart.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Card,
    DailyAverageTransactionsChart
  },
  data: () => {
    return {
      change24: null
    }
  },
  computed: mapGetters({
    dailyTransactions: 'transactions/getDailyTransactions'
  }),

  destroyed() {},
  mounted: function() {
    const day1 = this.dailyTransactions[0].count
    const day2 = this.dailyTransactions[1].count
    this.change24 = (((day1 - day2) / day1) * 100).toFixed(2)
  },
  methods: {}
}
</script>
