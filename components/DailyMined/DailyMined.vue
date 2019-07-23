<template>
  <SparklineStats title="totalMined" :change="change" :dailyValue="valueArr | avg">
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
      change: null,
      valueArr: []
    }
  },
  computed: mapGetters({
    userNodes: 'userNodes/getUserNodes'
  }),
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
    this.valueArr = data
      .slice(data.length - 8, data.length - 1)
      .map(x => x.mined)
  },
  methods: {}
}
</script>
