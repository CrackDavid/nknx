<template>
  <div>
    <Preloader
      v-if="!latestSigchainTransaction|| !price || !networkStatus || !networkNodes || !dailyTransactions || !dailyBlocks || !dailyHistoryPrice"
    />
    <div
      v-if="latestSigchainTransaction&& price && networkStatus && networkNodes && dailyTransactions && dailyBlocks && dailyHistoryPrice"
      class="page-wrapper"
    >
      <div class="row">
        <div class="col col_xs_12">
          <Topbar/>
        </div>
      </div>
      <div class="row">
        <Sidebar/>
        <div class="main">
          <div class="row">
            <div class="col col_xs_12">
              <Headerbar/>
            </div>
          </div>
          <div class="row">
            <div class="col col_xs_12">
              <div class="content">
                <nuxt/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Preloader from "~/components/Preloader/Preloader.vue";
import Topbar from "~/components/Topbar/Topbar.vue";
import Sidebar from "~/components/Sidebar/Sidebar.vue";
import Headerbar from "~/components/Headerbar/Headerbar.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Preloader,
    Topbar,
    Sidebar,
    Headerbar
  },
  computed: mapGetters({
    price: "price/getCurrentPrice",
    dailyHistoryPrice: "price/getDailyHistoryPrice",
    networkStatus: "network/getNetworkStatus",
    networkNodes: "network/getNetworkNodes",
    dailyTransactions: "transactions/getDailyTransactions",
    latestSigchainTransaction: "transactions/getLatestSigchainTransaction",

    dailyBlocks: "blocks/getDailyBlocks"
  }),
  mounted: function() {
    this.$store.dispatch("network/getCurrentNetworkStatus");
    this.$store.dispatch("network/getCurrentNetworkNodes");
    this.$store.dispatch("price/getCurrentPrice");
    this.$store.dispatch("price/getDailyHistoryPrice");
    this.$store.dispatch("transactions/getDailyTransactions");
    this.$store.dispatch("transactions/getLatestSigchainTransaction");

    this.$store.dispatch("blocks/getDailyBlocks");
  }
};
</script>
