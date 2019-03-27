<template>
  <Card>
    <div class="wallet-panel">
      <div class="wallet-panel__left">
        <div class="wallet-panel__label">{{label}}</div>
        <div class="wallet-panel__value">
          {{balanceNKN}}
          <span class="wallet-panel__currency">NKN</span>
        </div>
        <div v-clipboard:copy="address" class="wallet-panel__address">
          {{address}}
          <i class="fas fa-copy"></i>
        </div>
      </div>
      <div class="wallet-panel__right">
        <div class="wallet-panel__button">
          <i class="fas fa-qrcode wallet-panel__icon"></i>
          {{$t('recieve')}}
        </div>
        <div class="wallet-panel__button">
          <i class="fab fa-telegram-plane wallet-panel__icon"></i>
          {{$t('send')}}
        </div>
        <div class="wallet-panel__button wallet-panel__button_more">
          <span class="fe fe-more-vertical wallet-panel__icon wallet-panel__icon_more"/>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";

export default {
  components: {
    Card
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
    return {};
  },

  destroyed() {},
  mounted: function() {},
  methods: {}
};
</script>
