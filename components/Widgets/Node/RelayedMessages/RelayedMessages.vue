<template>
  <Card>
    <div class="relayed-messages">
      <div class="relayed-messages__header">
        <h3 class="relayed-messages__title">{{$t('relayedMessages')}}</h3>
      </div>
      <RelayedMessagesChart/>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import RelayedMessagesChart from "~/components/Charts/RelayedMessagesChart.vue";

export default {
  components: {
    Card,
    RelayedMessagesChart
  },
  data: () => {
    return {};
  },

  destroyed() {},
  mounted: function() {},
  methods: {}
};
</script>
