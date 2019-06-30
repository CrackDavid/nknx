<template>
  <SparklineStats title="avgTxPerDay" :change="change" :dailyValue="valueArr | avg">
    <DailyTransactionsChart />
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
      valueArr: []
    }
  },
  computed: mapGetters({
    dailyTransactions: 'transactions/getDailyTransactions'
  }),
  destroyed() {},
  mounted: function() {
    const day1 = this.dailyTransactions[1].count
    const day2 = this.dailyTransactions[2].count
    if (day1 > 0 && day2 > 0) {
      this.change = (((day1 - day2) / day1) * 100).toFixed(2)
    } else {
      this.change = 0
    }
    this.valueArr = this.dailyTransactions
      .slice(this.dailyTransactions - 8, this.dailyTransactions.length - 1)
      .map(x => x.count)
  },
  methods: {}
}
</script>
