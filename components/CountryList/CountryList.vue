<template>
  <Card :col="$mq === 'xl' ? '8' : '12'" padding="none">
    <div class="card-header">
      <div>
        <h3 class="card-header__title">
          {{$t('topCountries')}}
          <span
            class="card-header__counter"
          >{{countries.length}} {{$t('inTotal')}}</span>
        </h3>
      </div>
      <div class="card-header__viewAll" @click="toggleCountries">
        <span v-if="!fullCountries">{{$t('viewAll')}}</span>
        <span v-else>{{$t('viewTop')}}</span>
      </div>
    </div>
    <div class="country-list__stats">
      <div class="country-list__stats-title">{{$t('totalCountries')}}</div>
      <div class="country-list__stats-value">{{countries.length}}</div>
    </div>
    <div v-if="$mq !== 'xs' && $mq !== 'sm' && $mq !== 'md'" class="overflow-x">
      <table class="table">
        <thead class="table__header">
          <tr class="table__row">
            <th class="table__title" style="width: 30%;">{{$t('country')}}</th>
            <th class="table__title">{{$t('nodeCount')}}</th>
            <th
              class="table__title table__item text_align_right"
              style="width: 20%;"
            >{{$t('network')}} (%)</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="item in filterCountries" :key="item.country" class="table__row">
            <td class="table__item country-list__country text_wrap_none">
              <CountryFlag class="country-list__flag" :country="item.country_code" size="normal" />
              <span style="margin-left:40px">{{item.country_name}}</span>
            </td>
            <td class="table__item">
              <span class="country-list__percentage" :style="{width: item.percent+'%'}"></span>
              {{item.count}}
            </td>
            <td
              class="table__item text_align_right"
            >{{item.count}} {{'('+(Number(item.percent)).toFixed(2)+'%)'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <table class="table">
        <thead class="table__header">
          <tr class="table__row">
            <th class="table__title">{{$t('country')}}</th>
            <th class="table__title text_align_right">{{$t('nodeCount')}}</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="item in filterCountries" :key="item.country" class="table__row">
            <td class="table__item country-list__country text_wrap_none">
              <CountryFlag class="country-list__flag" :country="item.country_code" size="normal" />
              <span style="margin-left:40px">{{item.country_name}}</span>
              <div class="country-list__percentage" :style="{width: item.percent+'%'}"></div>
            </td>
            <td
              class="table__item text_align_right"
            >{{item.count}} {{'('+(Number(item.percent)).toFixed(2)+'%)'}}</td>
          </tr>
        </tbody>
      </table>
      <div class="card-footer" style="padding-bottom: 16px;" @click="toggleCountries">
        <span v-if="!fullCountries">{{$t('viewAll')}}</span>
        <span v-else>{{$t('viewTop')}}</span>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './CountryList.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import { mapGetters } from 'vuex'
import CountryFlag from 'vue-country-flag'
import * as CountryNames from 'i18n-iso-countries'

export default {
  components: {
    Card,
    CountryFlag
  },
  data: () => {
    return { fullCountries: false, countries: [] }
  },
  computed: {
    ...mapGetters({
      networkCountries: 'network/getNetworkCountries'
    }),
    filterCountries: function() {
      if (this.fullCountries) {
        return this.countries
      } else {
        return this.countries.slice(0, 10)
      }
    }
  },
  mounted: function() {
    let locale = 'en'
    if (this.$i18n.locale !== 'vi') locale = this.$i18n.locale
    CountryNames.registerLocale(
      require('i18n-iso-countries/langs/' + locale + '.json')
    )
    this.countries = this.networkCountries
    this.countries.forEach(country => {
      country.country_name = CountryNames.getName(country.country_code, locale)
    })
  },
  methods: {
    toggleCountries: function() {
      this.fullCountries = !this.fullCountries
    }
  }
}
</script>
