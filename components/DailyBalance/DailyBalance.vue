<template>
  <SparklineStats
    title="totalBalance"
    :change="change"
    :dailyValue="valueArr"
    symbol="NKN"
  >
    <DailyBalanceChart v-if="userWallets.sumWalletSnapshots.length" />
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
    return {}
  },
  computed: {
    ...mapGetters({
      userWallets: 'userWallets/getUserWallets'
    }),
    change: function() {
      const data = this.userWallets.sumWalletSnapshots
      if (data.length) {
        let day1 = data[0].balance
        let day2 = data[1].balance

        if (data[0].hour) {
          day1 = data[0].balance
          day2 = data[24].balance
        }

        if (day1 > 0 && day2 > 0) {
          return (((day1 - day2) / day1) * 100).toFixed(2)
        } else {
          return 0
        }
      } else {
        return '0'
      }
    },
    valueArr: function() {
      return this.userWallets.sumWalletSnapshots.length
        ? Number(this.userWallets.sumWalletSnapshots[0].balance).toFixed(2)
        : '0'
    }
  },
  destroyed() {},
  mounted: function() {},
  methods: {}
}
</script>
