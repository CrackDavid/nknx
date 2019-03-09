<template>
  <Card>
    <div class="sparkline-stats">
      <div class="sparkline-stats__header">
        <div class="sparkline-stats__title">Average Blocks per Day</div>
        <div
          class="sparkline-stats__change"
          :class="{'sparkline-stats__change_positive': change24>0, 'sparkline-stats__change_negative': change24<0}"
        >
          <span
            class="fe sparkline-stats__icon"
            :class="{'fe-arrow-up-right':change24>0, 'fe-arrow-down-left':change24<0}"
          />
          {{change24}}%
        </div>
      </div>
      <div class="sparkline-stats__value">{{dailyBlocks[0].count}}</div>
      <div class="sparkline-stats__chart">
        <DailyAverageBlocksChart/>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import DailyAverageBlocksChart from "~/components/Charts/DailyAverageBlocksChart.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Card,
    DailyAverageBlocksChart
  },
  data: () => {
    return {
      change24: null
    };
  },
  computed: mapGetters({
    dailyBlocks: "blocks/getDailyBlocks"
  }),

  destroyed() {},
  mounted: function() {
    const day1 = this.dailyBlocks[0].count;
    const day2 = this.dailyBlocks[1].count;
    this.change24 = (((day1 - day2) / day1) * 100).toFixed(2);
  },
  methods: {}
};
</script>
