<template>
  <SparklineStats
    title="totalMined"
    :change="change"
    :dailyValue="valueArr"
    symbol="NKN"
  >
    <DailyMinedChart />
  </SparklineStats>
</template>
<script>
import { mapGetters } from 'vuex'

import SparklineStats from '~/components/SparklineStats/SparklineStats.vue'
import DailyMinedChart from '~/components/Charts/DailyMinedChart.vue'

export default {
  components: {
    SparklineStats,
    DailyMinedChart
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters({
      userNodesStats: 'userNodes/getUserNodesStats'
    }),
    valueArr: function() {
      return Number(this.userNodesStats.rewardAll).toFixed(2)
    },
    change: function() {
      const data = this.userNodesStats.sumNodeSnapshots
      if (data.length) {
        const day1 = data[0].mined
        const day2 = data[1].mined

        if (day1 > 0 && day2 > 0) {
          return (((day1 - day2) / day1) * 100).toFixed(2)
        } else {
          return (day1 * 100).toFixed(2)
        }
      } else {
        return '0'
      }
    }
  },
  destroyed() {},
  mounted: function() {},
  methods: {}
}
</script>
