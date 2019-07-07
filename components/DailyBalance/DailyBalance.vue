<template>
  <SparklineStats title="totalBalance" :change="change" :dailyValue="valueArr" symbol="NKN">
    <DailyBalanceChart />
  </SparklineStats>
</template>
<script>
import { mapGetters } from 'vuex'

import SparklineStats from '~/components/SparklineStats/SparklineStats.vue'
import DailyBalanceChart from '~/components/Charts/DailyBalanceChart.vue'

export default {
  components: {
    SparklineStats,
    DailyBalanceChart
  },
  data: () => {
    return {
      change: null,
      valueArr: []
    }
  },
  computed: mapGetters({
    userWallets: 'userWallets/getUserWallets'
  }),
  destroyed() {},
  mounted: function() {
    const data = this.userWallets.sumWalletSnapshots
    const day1 = data[data.length - 1].sum
    const day2 = data[data.length - 2].sum

    if (day1 > 0 && day2 > 0) {
      this.change = (((day1 - day2) / day1) * 100).toFixed(2)
    } else {
      this.change = 0
    }
    this.valueArr = Number(data[data.length - 1].sum).toFixed(2)
  },
  methods: {}
}
</script>
