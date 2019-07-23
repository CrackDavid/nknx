<template>
  <SparklineStats title="totalMined" :change="change" :dailyValue="valueArr" symbol="NKN">
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
    return {
      change: null
    }
  },
  computed: {
    ...mapGetters({
      userNodes: 'userNodes/getUserNodes'
    }),
    valueArr: function() {
      return Number(this.userNodes.rewardAll).toFixed(2)
    }
  },
  destroyed() {},
  mounted: function() {
    const data = this.userNodes.sumNodeSnapshots
    const day1 = data[data.length - 2].mined
    const day2 = data[data.length - 3].mined

    if (day1 > 0 && day2 > 0) {
      this.change = (((day1 - day2) / day1) * 100).toFixed(2)
    } else {
      this.change = 0
    }
  },
  methods: {}
}
</script>
