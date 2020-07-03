<template>
  <Card col="12" padding="none">
    <div class="card-header card-header_padding">
      <h3 class="card-header__title">{{ $t('myConfigurations') }} ({{ $t('clickToSelect') }})</h3>
      <div class="card-header__right">
        <div class="page-navigation__pagination page-navigation__pagination_card">
          <Pagination :page="prevPage" type="prev" @click.native="getConfigs(prevPage)" />
          <Pagination :page="nextPage" type="next" @click.native="getConfigs(nextPage)" />
        </div>
      </div>
    </div>
    <div class="mobile-fd-config">
      <div
        v-for="config in configs"
        :key="config.id"
        class="mobile-fd-config__item"
        :class="
          activeFastDeployConfig.id === config.id
            ? 'mobile-fd-config__item_active'
            : null
        "
        @click="setActiveConfig(config)"
      >
        <div class="mobile-fd-config__title">{{ $t('label') }}</div>
        <div class="mobile-fd-config__value text_wrap_none">{{ config.label }}</div>
        <div class="mobile-fd-config__title">{{ $t('beneficiaryAddress') }}</div>
        <div class="mobile-fd-config__value text_wrap_none">{{ config.beneficiary_addr }}</div>
        <div class="mobile-fd-config__title">{{ $t('disableUfw') }}?</div>
        <div class="mobile-fd-config__value text_wrap_none">
          <span v-if="config.disable_ufw">{{ $t('no') }}</span>
          <span v-else>{{ $t('yes') }}</span>
        </div>
        <div class="mobile-fd-config__title">#{{ $t('deployments') }}</div>
        <div class="mobile-fd-config__value text_wrap_none">{{ config.fd_deployments_count }}</div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './MobileFastDeployConfigs.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import { mixin as clickaway } from 'vue-clickaway'
import Card from '~/components/Card/Card.vue'
import Pagination from '~/components/Pagination/Pagination'

export default {
  components: {
    Card,
    Pagination
  },
  mixins: [clickaway],
  data: () => {
    return {
      nextPage: null,
      prevPage: null,
      current_page: 1,
      from: 0,
      to: 0,
      loading: false,
      configs: [],
      total: 0,
      isActions: false
    }
  },
  computed: {
    ...mapGetters({
      fastDeployConfigs: 'fastDeployConfigs/getFastDeployConfigs',
      activeFastDeployConfig: 'fastDeployConfigs/getActiveFastDeployConfig'
    })
  },
  watch: {
    fastDeployConfigs() {
      this.parseConfigsData(this.fastDeployConfigs)
    }
  },
  mounted() {
    this.getConfigs(this.current_page)
  },
  methods: {
    closeActionsModal() {
      this.isActions = false
    },
    setActiveConfig(config) {
      this.$store.dispatch(
        'fastDeployConfigs/updateActiveFastDeployConfig',
        config
      )
    },
    openDeleteConfigModal(config) {
      setTimeout(this.closeActionsModal, 1)
      this.$store.dispatch(
        'fastDeployConfigs/updateActiveFastDeployConfig',
        config
      )
      this.$store.dispatch(
        'modals/updateDeleteFastDeployConfigModalVisible',
        true
      )
    },
    parseConfigsData(response) {
      const {
        data,
        current_page,
        prev_page_url,
        next_page_url,
        from,
        total,
        to
      } = response
      this.configs = data
      this.from = from
      this.to = to
      this.total = total
      this.currentPage = current_page
      this.prevPage = prev_page_url != null ? this.currentPage - 1 : null
      this.nextPage = next_page_url != null ? this.currentPage + 1 : null
      this.loading = false
    },
    getConfigs(page) {
      const self = this
      // Checking if page exists
      if (page === null) {
        return false
      }
      self.loading = true
      // Disabling pagination untill data fetched
      self.nextPage = null
      self.prevPage = null
      this.$store.dispatch('fastDeployConfigs/updateFastDeployConfigs', page)
    }
  }
}
</script>
