<template>
  <Card>
    <div class="wallet-mini">
      <div class="wallet-mini__icon">
        <WalletIcon/>
      </div>
      <div class="wallet-mini__body">
        <div class="wallet-mini__header">
          <div class="wallet-mini__title">{{label}}</div>
          <div class="fe fe-more-horizontal wallet-mini__actions"/>
        </div>
        <div class="wallet-mini__value">
          {{balanceNKN}}
          <span class="wallet-mini__currency">NKN</span>
        </div>
        <div class="wallet-mini__converter">${{balanceUSD}} USD</div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import { mapGetters } from "vuex";
import WalletIcon from "~/assets/icons/wallet.svg";

export default {
  components: {
    Card,
    WalletIcon
  },
  props: {
    address: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    balanceNKN: {
      type: Number,
      default: 0
    }
  },
  data: () => {
    return {
      balanceUSD: 0
    };
  },
  computed: mapGetters({
    price: "price/getCurrentPrice"
  }),
  destroyed() {},
  mounted: function() {
    this.fetchUsdBalance();
  },
  methods: {
    fetchUsdBalance() {
      const usdPrice = this.price.prices[0].price;
      this.balanceUSD = ((this.balanceNKN * usdPrice) / 5).toFixed(0);
    }
  }
};
</script>
