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
    const data = this.dailyTransactions
    const day1 = data[data.length - 2].count
    const day2 = data[data.length - 3].count

    if (day1 > 0 && day2 > 0) {
      this.change = (((day1 - day2) / day1) * 100).toFixed(2)
    } else {
      this.change = 0
    }
    this.valueArr = data
      .slice(data.length - 8, data.length - 1)
      .map(x => x.count)
  },
  methods: {}
}
</script>
