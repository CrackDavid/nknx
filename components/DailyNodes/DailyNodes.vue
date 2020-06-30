<template>
  <SparklineStats
    title="avgNodesPerDay"
    :change="change"
    :dailyValue="valueArr | avg"
  >
    <DailyNodesChart />
  </SparklineStats>
</template>
<script>
import { mapGetters } from 'vuex'

import SparklineStats from '~/components/SparklineStats/SparklineStats.vue'
import DailyNodesChart from '~/components/Charts/DailyNodesChart.vue'

export default {
  components: {
    SparklineStats,
    DailyNodesChart
  },
  data: () => {
    return {
      change: null,
      valueArr: []
    }
  },
  computed: mapGetters({
    dailyNodes: 'nodes/getDailyNodes'
  }),
  destroyed() {},
  mounted: function() {
    const data = this.dailyNodes
    const day1 = data[data.length - 2].avg_cnodecount
    const day2 = data[data.length - 3].avg_cnodecount

    if (day1 > 0 && day2 > 0) {
      this.change = (((day1 - day2) / day1) * 100).toFixed(2)
    } else {
      this.change = '0'
    }
    this.valueArr = data
      .slice(data.length - 8, data.length - 1)
      .map(x => x.avg_cnodecount)
  },
  methods: {}
}
</script>
