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
        {{ $t('activeProviders') }}
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
            @click.native="getVps(prevPage)"
          />
          <Pagination
            :page="nextPage"
            type="next"
            @click.native="getVps(nextPage)"
          />
        </div>
      </div>
    </div>
    <div>
      <table class="table">
        <thead class="table__header">
          <tr class="table__row">
            <th class="table__title" style="width: 1%;">{{ $t('name') }}</th>
            <th class="table__title">{{ $t('provider') }}</th>
            <th class="table__title">{{ $t('key') }}</th>
            <th class="table__title">
              {{ $t('secretOnlyAws') }}
            </th>
            <th class="table__title" style="width: 1%;">
              {{ $t('actions') }}
            </th>
          </tr>
        </thead>
        <tbody v-on-clickaway="closeActionsModal" class="table__body">
          <tr v-for="vps in vpses" :key="vps.id" class="table__row">
            <td class="table__item">
              {{ vps.profile_name }}
            </td>
            <td class="table__item">
              {{ vps.provider }}
            </td>
            <td class="table__item">
              {{ vps.api_token.substring(0, 3) }}*****
            </td>
            <td class="table__item">
              <span v-if="vps.provider === 'AWS'"
                >{{ vps.api_secret.substring(0, 3) }}*****</span
              >
              <span v-else>{{ $t('n/a') }}</span>
            </td>
            <td class="table__item text_align_center">
              <span
                class="node-manager__actions fe fe-more-horizontal"
                @click="isActions = vps.id"
                @clickaway="closeActionsModal"
              >
                <div
                  :class="[
                    'node-manager__actions-modal',
                    isActions === vps.id
                      ? 'node-manager__actions-modal_visible'
                      : null
                  ]"
                >
                  <div
                    class="node-manager__actions-item"
                    @click="openEditNodeModal(vps)"
                  >
                    <span
                      class="node-manager__actions-icon fe fe-edit-2"
                    ></span>
                    <span class="node-manager__actions-title">{{
                      $t('editNode')
                    }}</span>
                  </div>
                  <div
                    class="node-manager__actions-item"
                    @click="openDeleteNodeModal(vps)"
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
@import './ActiveProviders.scss';
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
      vpses: [],
      total: 0,
      isActions: false
    }
  },
  computed: {
    ...mapGetters({
      userProviders: 'userProviders/getUserProviders'
    })
  },
  watch: {
    userProviders() {
      this.parseVpsData(this.userProviders)
    }
  },
  mounted() {
    this.getVps(this.current_page)
  },
  methods: {
    closeActionsModal() {
      this.isActions = false
    },
    openDeleteNodeModal(vps) {
      setTimeout(this.closeActionsModal, 1)
      this.$store.dispatch('activeProvider/updateActiveProvider', vps)
      this.$store.dispatch('modals/updateDeleteProviderModalVisible', true)
    },
    openEditNodeModal(vps) {
      setTimeout(this.closeActionsModal, 1)
      this.$store.dispatch('activeProvider/updateActiveProvider', vps)
      this.$store.dispatch('modals/updateEditProviderModalVisible', true)
    },
    parseVpsData(response) {
      const {
        data,
        current_page,
        prev_page_url,
        next_page_url,
        from,
        total,
        to
      } = response
      this.vpses = data
      this.from = from
      this.to = to
      this.total = total
      this.currentPage = current_page
      this.prevPage = prev_page_url != null ? this.currentPage - 1 : null
      this.nextPage = next_page_url != null ? this.currentPage + 1 : null
      this.loading = false
    },
    getVps(page) {
      const self = this
      // Checking if page exists
      if (page === null) {
        return false
      }
      self.loading = true
      // Disabling pagination untill data fetched
      self.nextPage = null
      self.prevPage = null
      this.$store.dispatch('userProviders/updateUserProviders', page)
    }
  }
}
</script>
