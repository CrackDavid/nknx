<template>
  <SparklineStats title="avgNodesPerDay" :change="change" :dailyValue="valueArr | avg">
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
    const day1 = this.dailyNodes[0].avg_cnodecount
    const day2 = this.dailyNodes[1].avg_cnodecount
    if (day1 > 0 && day2 > 0) {
      this.change = (((day1 - day2) / day1) * 100).toFixed(2)
    } else {
      this.change = 0
    }
    this.valueArr = this.dailyNodes
      .slice(this.dailyNodes - 8, this.dailyNodes.length - 1)
      .map(x => x.avg_cnodecount)
  },
  methods: {}
}
</script>
