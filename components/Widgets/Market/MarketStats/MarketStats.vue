<template>
  <Card>
    <div class="market-stats">
      <div class="market-stats__market-data">
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
      <div class="market-stats__market-chart"></div>
    </div>
  </Card>
</template>

<script>
import Card from '~/components/Card/Card.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Card
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

  destroyed() {
    clearInterval(this.intervalPrice)
  },
  mounted: function() {
    this.updatePrice()
    this.intervalPrice = setInterval(this.updatePrice, 60000)
  },
  methods: {
    numberWithCommas(x) {
      x = x.toFixed(0)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    updatePrice() {
      this.$store.dispatch('price/getCurrentPrice')
      const usdPrice = this.price.prices[0]
      const ethPrice = this.price.prices[1]
      this.items.price.data = '$' + usdPrice.price.toFixed(4)
      if (usdPrice.percent_change_24h > 0) {
        this.items.change24h.class = 'market-numbers__value_positive'
        this.items.change24h.icon = 'fe-trending-up'
      } else {
        this.items.change24h.class = 'market-numbers__value_negative'
        this.items.change24h.icon = 'fe-trending-down'
      }
      this.cmcRank = this.price.cmc_rank
      this.items.change24h.data = usdPrice.percent_change_24h.toFixed(2) + '%'
      this.items.marketcap.data =
        '$' + this.numberWithCommas(usdPrice.market_cap)
      this.items.dailyVolume.data =
        '$' + this.numberWithCommas(usdPrice.volume_24h)
      this.items.nknEth.data = '$' + ethPrice.price.toFixed(7)
    }
  }
}
</script>
