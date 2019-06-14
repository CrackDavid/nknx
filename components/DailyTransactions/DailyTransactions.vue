<template>
  <SparklineStats title="avgTxPerDay" :change="change" :dailyValue="dailyValue">
    <DailyTransactionsChart/>
  </SparklineStats>
</template>
<script>
import { mapGetters } from 'vuex'

import SparklineStats from '~/components/SparklineStats/SparklineStats.vue'
import DailyTransactionsChart from '~/components/Charts/DailyTransactionsChart.vue'

export default {
  components: {
    SparklineStats,
    DailyTransactionsChart
  },
  data: () => {
    return {
      change: null,
      dailyValue: null
    }
  },
  computed: mapGetters({
    dailyTransactions: 'transactions/getDailyTransactions'
  }),
  destroyed() {},
  mounted: function() {
    const day1 = this.dailyTransactions[0].count
    const day2 = this.dailyTransactions[1].count
    this.change = (((day1 - day2) / day1) * 100).toFixed(2)
    this.dailyValue = day1
  },
  methods: {}
}
</script>
