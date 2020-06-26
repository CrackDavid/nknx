<template>
  <Card
    :col="
      $mq === 'xl' ? '8' : $mq === 'llg' ? '12' : $mq === 'lg' ? '12' : '12'
    "
    padding="none"
    :overflow="false"
  >
    <div class="card-header">
      <h3 class="card-header__title">
        {{ $t('myConfigurations') }} ({{ $t('clickToSelect') }})
        <span class="card-header__counter"
          >{{ total }} {{ $t('inTotal') }}</span
        >
      </h3>
      <div class="card-header__right">
        <div
          class="page-navigation__pagination page-navigation__pagination_card"
        >
          <Pagination
            :page="prevPage"
            type="prev"
            @click.native="getConfigs(prevPage)"
          />
          <Pagination
            :page="nextPage"
            type="next"
            @click.native="getConfigs(nextPage)"
          />
        </div>
      </div>
    </div>
    <div>
      <table class="table">
        <thead class="table__header">
          <tr class="table__row">
            <th class="table__title" style="width: 10%;">
              {{ $t('label') }}
            </th>
            <th class="table__title" style="width: 10%;">
              {{ $t('beneficiaryAddress') }}
            </th>
            <th class="table__title" style="width: 1%;">
              {{ $t('disableUfw') }}?
            </th>
            <th class="table__title" style="width: 10%;">
              #{{ $t('deployments') }}
            </th>
            <th class="table__title" style="width: 1%;">
              {{ $t('actions') }}
            </th>
          </tr>
        </thead>
        <tbody v-on-clickaway="closeActionsModal" class="table__body">
          <tr
            v-for="config in configs"
            :key="config.id"
            class="table__row table__row_hoverable"
            :class="
              activeFastDeployConfig.id === config.id
                ? 'table__row_active'
                : null
            "
            @click="
              activeFastDeployConfig.id !== config.id
                ? setActiveConfig(config)
                : setActiveConfig(false)
            "
          >
            <td class="table__item">
              {{ config.label }}
            </td>
            <td class="table__item">
              {{ config.beneficiary_addr }}
            </td>
            <td class="table__item">
              <span v-if="config.disable_ufw">{{ $t('yes') }}</span>
              <span v-else>{{ $t('no') }}</span>
            </td>
            <td class="table__item">
              {{ config.fd_deployments_count }}
            </td>
            <td class="table__item text_align_center">
              <span
                class="node-manager__actions fe fe-more-horizontal"
                @click="isActions = config.id"
              >
                <div
                  :class="[
                    'node-manager__actions-modal',
                    isActions === config.id
                      ? 'node-manager__actions-modal_visible'
                      : null
                  ]"
                >
                  <div
                    class="node-manager__actions-item"
                    @click="openDeleteConfigModal(config)"
                  >
                    <span
                      class="node-manager__actions-icon fe fe-trash-2"
                    ></span>
                    <span class="node-manager__actions-title">{{
                      $t('delete')
                    }}</span>
                  </div>
                </div>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
</template>

<style lang="scss">
@import './FastDeployConfigs.scss';
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
      if (!this.isActions) {
        this.$store.dispatch(
          'fastDeployConfigs/updateActiveFastDeployConfig',
          config
        )
      }
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
