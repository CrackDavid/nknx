<template>
  <Card>
    <div class="market-stats row">
      <div class="market-stats__market-data col col_xs_4">
        <div class="market-data__heading">
          <h3 class="market-data__title">NKN Market Statistic</h3>
          <div class="market-data__rank">Rank {{cmcRank}}</div>
        </div>
        <div class="market-data__market-numbers">
          <div class="market-numbers__item" v-for="item in items" :key="item.title">
            <div class="market-numbers__name">{{item.title}}</div>
            <div class="market-numbers__value" :class="item.class">
              <span class="fe market-numbers__icon" :class="item.icon" v-if="item.icon"/>
              {{item.data}}
            </div>
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
    Card,
    PriceChart
  },
  computed: mapGetters({
    price: 'price/get'
  }),
  data: () => {
    return {
      cmcRank: 0,
      items: {
        price: {
          title: 'Price',
          data: null
        },
        change24h: {
          title: 'Change 24h',
          data: null
        },
        marketcap: {
          title: 'Marketcap',
          data: null
        },
        dailyVolume: {
          title: 'Daily Volume',
          data: null
        },
        nknEth: {
          title: 'NKN/ETH',
          data: null
        }
      }
    }
  },

  destroyed() {},
  mounted: function() {
    this.items.price.data = '$' + this.price.prices[0].price.toFixed(4)
    if (this.price.prices[0].percent_change_24h > 0) {
      this.items.change24h.class = 'market-numbers__value_positive'
      this.items.change24h.icon = 'fe-trending-up'
    } else {
      this.items.change24h.class = 'market-numbers__value_negative'
      this.items.change24h.icon = 'fe-trending-down'
    }
    this.cmcRank = this.price.cmc_rank
    this.items.change24h.data =
      this.price.prices[0].percent_change_24h.toFixed(2) + '%'
    this.items.marketcap.data =
      '$' + this.numberWithCommas(this.price.prices[0].market_cap)
    this.items.dailyVolume.data =
      '$' + this.numberWithCommas(this.price.prices[0].volume_24h)
    this.items.nknEth.data = '$' + this.price.prices[1].price.toFixed(7)
  },
  methods: {
    numberWithCommas(x) {
      x = x.toFixed(0)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
