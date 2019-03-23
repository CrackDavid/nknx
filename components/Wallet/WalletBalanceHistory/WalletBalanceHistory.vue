<template>
  <Card>
    <div class="balance-history">
      <div class="balance-history__header">
        <h3 class="balance-history__heading">{{$t('balanceHistory')}}</h3>
        <div class="balance-history__controls">
          <button
            v-for="item in toggleItems"
            :key="item.dataSet"
            class="btn btn_type_default btn_size_widget balance-history__btn"
            :class="{ btn_theme_secondary: item.dataSet == dataSet, btn_theme_default: item.dataSet != dataSet  }"
            @click="toggleDataSet(item)"
          >{{item.text}}</button>
        </div>
      </div>
      <WalletBalanceHistoryChart :dataSet="dataSet" class="balance-history__chart"/>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import WalletBalanceHistoryChart from "~/components/Charts/WalletBalanceHistoryChart.vue";

export default {
  components: {
    Card,
    WalletBalanceHistoryChart
  },
  data: () => {
    return {
      toggleItems: [
        { text: "7 days", active: true, dataSet: 7 },
        { text: "14 days", active: false, dataSet: 14 },
        { text: "1 month", active: false, dataSet: 30 }
      ],
      dataSet: 7
    };
  },

  destroyed() {},
  mounted: function() {},
  methods: {
    toggleDataSet: function(item) {
      this.dataSet = item.dataSet;
    }
  }
};
</script>
