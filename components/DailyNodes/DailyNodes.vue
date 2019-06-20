<template>
  <SparklineStats title="nodesPerDay" :change="change" :dailyValue="dailyValue">
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
      dailyValue: null
    }
  },
  computed: mapGetters({
    dailyNodes: 'nodes/getDailyNodes'
  }),
  destroyed() {},
  mounted: function() {
    const day1 = this.dailyNodes[0].avg_cnodecount
    const day2 = this.dailyNodes[1].avg_cnodecount
    this.change = (((day1 - day2) / day1) * 100).toFixed(2)
    this.dailyValue = day1
  },
  methods: {}
}
</script>
