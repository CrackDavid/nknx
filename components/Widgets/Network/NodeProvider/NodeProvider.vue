<template>
  <Card>
    <div class="node-provider">
      <div class="node-provider__header">
        <h3 class="node-provider__heading">{{$t('nodeProvider')}}</h3>
      </div>
    </div>

    <NodeProviderChart/>
    <div class="node-provider__provider-top provider-top">
      <div class="provider-top__title">
        <div>{{$t('top3Providers')}}</div>
        <div>64% VPS {{$t('hosted')}}</div>
      </div>
      <div v-for="item in providersTop" :key="item.provider" class="provider-top__item">
        <div class="provider-top__icon"></div>
        <div class="provider-top__stats">
          <div class="provider-top__heading">
            <div class="provider-top__name">{{item.provider}}</div>
            <div class="provider-top__counter">{{item.count}}</div>
          </div>
          <div class="provider-top__bar" :style="{width: item.percentage+'%'}"></div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import NodeProviderChart from "~/components/Charts/NodeProviderChart.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Card,
    NodeProviderChart
  },
  data: () => {
    return {
      providersTop: null
    };
  },
  computed: mapGetters({
    networkNodes: "network/getNetworkNodes"
  }),
  mounted: function() {
    this.getProvidersTop();
  },
  methods: {
    getProvidersTop: function() {
      const providersTop = this.networkNodes.providers.slice(0, 3);
      providersTop.forEach(provider => {
        provider.percentage = (
          (provider.count / providersTop[0].count) *
          100
        ).toFixed(0);
      });
      this.providersTop = providersTop;
    }
  }
};
</script>
