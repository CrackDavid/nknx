<template>
  <SparklineStats title="avgNodesPerDay" :change="change" :dailyValue="valueArr | avg">
    <DailyNodesChart/>
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
    if (this.dailyNodes.length > 2) {
      const day2 = this.dailyNodes[1].avg_cnodecount
      this.change = (((day1 - day2) / day1) * 100).toFixed(2)
    }
    this.change = 100
    this.valueArr = this.dailyNodes.map(x => x.avg_cnodecount)
  },
  methods: {}
}
</script>
