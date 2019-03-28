<template>
  <div class="wallet-preview" :class="{'wallet-preview_active': activeAddress == address }">
    <div class="wallet-preview__data">
      <div class="wallet-preview__label">{{label}}</div>
      <div class="wallet-preview__value">
        {{balanceNKN}}
        <span class="wallet-preview__currency">NKN</span>
      </div>
      <div class="wallet-preview__converter">${{balanceUSD}} USD</div>
    </div>
    <div class="wallet-preview__chart">
      <WalletPreviewChart :color1="color1" :color2="color2"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WalletPreviewChart from "~/components/Charts/WalletPreviewChart/";

export default {
  components: { WalletPreviewChart },
  props: {
    address: {
      type: String,
      default: ""
    },
    activeAddress: {
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
    },
    color1: {
      type: String,
      default: ""
    },
    color2: {
      type: String,
      default: ""
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
