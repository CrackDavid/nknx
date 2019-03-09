<template>
  <Card>
    <div class="general-stats">
      <div class="general-stats__item">
        <div class="general-stats__title">
          {{ networkNodes.stats.totalNodes }}
        </div>
        <div class="general-stats__subtitle">
          Current Network Nodes
        </div>
      </div>
      <div class="general-stats__divider"/>
      <div class="general-stats__item">
        <div class="general-stats__data">
          <div v-for="item in items" :key="item.title" class="general-stats__data-item">
            <span class="fe general-stats__data-icon" :class="item.icon"/>
            <div class="general-stats__data-description">
              <div class="general-stats__data-title">
                {{ item.data }}
              </div>
              <div class="general-stats__data-subtitle">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Card
  },
  data: () => {
    return {
      items: {
        countries: {
          icon: "fe-globe",
          title: "Countries",
          data: null
        },
        providers: {
          icon: "fe-database",
          title: "Node Providers",
          data: null
        },
        blocks: {
          icon: "fe-box",
          title: "Blocks 24h",
          data: null
        },
        transactions: {
          icon: "fe-shuffle",
          title: "Transactions 24h",
          data: null
        }
      }
    };
  },
  computed: mapGetters({
    networkStatus: "network/getNetworkStatus",
    networkNodes: "network/getNetworkNodes",
    dailyTransactions: "transactions/getDailyTransactions",
    dailyBlocks: "blocks/getDailyBlocks"
  }),
  destroyed() {
    clearInterval(this.intervalNetworkStatus);
    clearInterval(this.intervalNetworkNodes);
    clearInterval(this.intervalDailyTransactions);
    clearInterval(this.intervalDailyBlocks);
  },
  mounted: function() {
    this.updateNetworkStatus();
    this.updateNetworkNodes();
    this.updateDailyTransactions();
    this.updateDailyBlocks();
    this.intervalNetworkStatus = setInterval(this.updateNetworkStatus, 60000);
    this.intervalNetworkNodes = setInterval(this.updateNetworkNodes, 60000);
    this.intervalDailyTransactions = setInterval(
      this.updateDailyTransactions,
      60000
    );
    this.intervalDailyBlocks = setInterval(this.updateDailyBlocks, 60000);
  },
  methods: {
    updateNetworkStatus() {
      this.$store.dispatch("network/getCurrentNetworkStatus");
    },
    updateNetworkNodes() {
      this.$store.dispatch("network/getCurrentNetworkNodes");
      this.items.countries.data = this.networkNodes.stats.totalCountries;
      this.items.providers.data = this.networkNodes.stats.totalProviders;
    },
    updateDailyTransactions() {
      this.$store.dispatch("transactions/getDailyTransactions");
      this.items.transactions.data = this.dailyTransactions[0].count;
    },
    updateDailyBlocks() {
      this.$store.dispatch("blocks/getDailyBlocks");
      this.items.blocks.data = this.dailyBlocks[0].count;
    }
  }
};
</script>
