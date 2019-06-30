<template>
  <SparklineStats title="avgBlocksPerDay" :change="change" :dailyValue="valueArr | avg">
    <DailyBlocksChart />
  </SparklineStats>
</template>
<script>
import { mapGetters } from 'vuex'

import SparklineStats from '~/components/SparklineStats/SparklineStats.vue'
import DailyBlocksChart from '~/components/Charts/DailyBlocksChart.vue'

export default {
  components: {
    SparklineStats,
    DailyBlocksChart
  },
  data: () => {
    return {
      change: null,
      valueArr: []
    }
  },
  computed: mapGetters({
    dailyBlocks: 'blocks/getDailyBlocks'
  }),
  destroyed() {},
  mounted: function() {
    const day1 = this.dailyBlocks[1].count
    const day2 = this.dailyBlocks[2].count
    if (day1 > 0 && day2 > 0) {
      this.change = (((day1 - day2) / day1) * 100).toFixed(2)
    } else {
      this.change = 0
    }
    this.valueArr = this.dailyBlocks
      .slice(this.dailyBlocks - 8, this.dailyBlocks.length - 1)
      .map(x => x.count)
  },
  methods: {}
}
</script>
