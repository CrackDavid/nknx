<template>
  <Card>
    <div class="market-stats row">
      <div class="market-stats__market-data col col_xs_4">
        <div class="market-data__heading">
          <h3 class="market-data__title">NKN Market Statistic</h3>
          <div class="market-data__rank">Rank {{price.cmc_rank}}</div>
        </div>
        <div class="market-data__market-numbers">
          <div class="market-numbers__item">
            <div class="market-numbers__name">{{$t('price')}}</div>
            <div class="market-numbers__value">${{price.prices[0].price.toFixed(4)}}</div>
          </div>
          <div class="market-numbers__item">
            <div class="market-numbers__name">{{$t('change_24h')}}</div>
            <div
              class="market-numbers__value"
              :class="{'market-numbers__value_positive': price.prices[0].percent_change_24h > 0 | 'market-numbers__value_negative'}"
            >
              <span
                class="fe market-numbers__icon"
                :class="{'fe-trending-up': price.prices[0].percent_change_24h > 0 | 'fe-trending-down'}"
              />
              {{price.prices[0].percent_change_24h.toFixed(2) + '%'}}
            </div>
          </div>
          <div class="market-numbers__item">
            <div class="market-numbers__name">{{$t('marketcap')}}</div>
            <div class="market-numbers__value">${{numberWithCommas(price.prices[0].market_cap)}}</div>
          </div>
          <div class="market-numbers__item">
            <div class="market-numbers__name">{{$t('daily_vol')}}</div>
            <div class="market-numbers__value">${{numberWithCommas(price.prices[0].volume_24h)}}</div>
          </div>
          <div class="market-numbers__item">
            <div class="market-numbers__name">{{$t('nkn_eth')}}</div>
            <div class="market-numbers__value">${{price.prices[0].price.toFixed(7)}}</div>
          </div>
        </div>
      </div>
      <div class="market-stats__market-chart col col_xs_8">
        <price-chart></price-chart>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '~/components/Card/Card.vue'
import PriceChart from '~/components/Charts/PriceChart.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    PriceChart,
    Card
  },
  computed: mapGetters({
    price: 'price/get'
  }),
  data: () => {
    return {
      cmcRank: 0
    }
  },

  destroyed() {},
  mounted: function() {},
  methods: {
    numberWithCommas(x) {
      x = x.toFixed(0)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
