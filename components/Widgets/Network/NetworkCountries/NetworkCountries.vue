<template>
  <Card>
    <div class="country-list">
      <div class="country-list__header">
        <div>
          <h3 class="country-list__title">
            {{$t('topCountries')}}
            <span
              class="country-list__counter"
            >{{totalCountries.length}} {{$t('inTotal')}}</span>
          </h3>
        </div>
        <div class="country-list__all" @click="toggleCurrentCountries()">
          <span v-if="currentSet==='top'">{{$t('viewAll')}}</span>
          <span v-if="currentSet==='all'">{{$t('viewTop')}}</span>
        </div>
      </div>
      <div class="country-list__heading">
        <div class="w-20">{{$t('country')}}</div>
        <div class="w-70">{{$t('currentNodeCount')}}</div>
        <div class="w-10 text-right">{{$t('network')}} (%)</div>
      </div>
      <div v-for="item in currentCountries" :key="item.country" class="country-list__item">
        <div class="country-list__country w-20">
          <CountryFlag :country="item.countryCode" size="normal"/>
          <span class="country-list__country-name">{{item.country}}</span>
        </div>
        <div class="country-list__stats w-70">
          <div class="country-list__chart" :style="{width: item.relativePercentage+'%'}"></div>
          <div class="country-list__value">{{item.count}}</div>
        </div>
        <div class="country-list__network w-10 text-right">{{item.networkPercentage}}%</div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import { mapGetters } from "vuex";
import CountryFlag from "vue-country-flag";

export default {
  components: {
    Card,
    CountryFlag
  },
  data: () => {
    return {
      totalCountries: [],
      topCountries: [],
      currentCountries: [],
      currentSet: "top"
    };
  },
  computed: {
    ...mapGetters({
      networkNodes: "network/getNetworkNodes"
    })
  },
  mounted: function() {
    this.getCountryList();
  },
  methods: {
    getCountryList: function() {
      const totalCountries = this.networkNodes.countries;
      const totalNodes = this.networkNodes.nodes.length;
      totalCountries.forEach(country => {
        country.relativePercentage = (
          (country.count / totalCountries[0].count) *
          100
        ).toFixed(0);
        country.networkPercentage = (
          (country.count / totalNodes) *
          100
        ).toFixed(0);
      });
      this.totalCountries = totalCountries;
      this.topCountries = totalCountries.slice(0, 6);
      this.currentCountries = this.topCountries;
    },
    toggleCurrentCountries: function() {
      if (this.currentSet === "top") {
        this.currentCountries = this.totalCountries;
        this.currentSet = "all";
      } else {
        this.currentCountries = this.topCountries;
        this.currentSet = "top";
      }
    }
  }
};
</script>
