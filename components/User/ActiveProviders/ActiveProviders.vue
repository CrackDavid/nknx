<template>
  <Card col="8" padding="none">
    <div class="card-header">
      <h3 class="card-header__title">
        {{ $t('activeProviders') }}
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
            <th class="table__title" style="width: 10%;">{{ $t('name') }}</th>
            <th class="table__title">{{ $t('provider') }}</th>
            <th class="table__title">{{ $t('key') }}</th>
            <th class="table__title">{{ $t('secretOnlyAws') }}</th>
            <th class="table__title" style="width: 10%;">
              {{ $t('actions') }}
            </th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="vps in vpses" :key="vps.id" class="table__row">
            <td class="table__item">
              {{ vps.profile_name }}
            </td>
            <td class="table__item">
              {{ vps.provider }}
            </td>
            <td class="table__item">
              <span
                :class="[
                  'table__item-action',
                  vps.tokenVisible ? 'fe fe-eye-off' : 'fe fe-eye'
                ]"
                @click="vps.tokenVisible = !vps.tokenVisible"
              />
              <span v-if="vps.tokenVisible"> {{ vps.api_token }} </span>
              <span v-else>{{ hideString(vps.api_token) }}</span>
            </td>
            <td class="table__item">
              <span
                v-if="vps.api_secret !== null"
                :class="[
                  'table__item-action',
                  vps.secretVisible ? 'fe fe-eye-off' : 'fe fe-eye'
                ]"
                @click="vps.secretVisible = !vps.secretVisible"
              />
              <span v-if="vps.secretVisible"> {{ vps.api_secret }} </span>
              <span v-else>{{ $t(hideString(vps.api_secret)) }}</span>
            </td>
            <td class="table__item text_align_center">
              <span
                class="node-manager__actions fe fe-more-horizontal"
                @click="isActions = vps.id"
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
import Card from '~/components/Card/Card.vue'
import Pagination from '~/components/Pagination/Pagination'

export default {
  components: {
    Card,
    Pagination
  },
  data: () => {
    return {
      nextPage: null,
      prevPage: null,
      current_page: 1,
      from: 0,
      to: 0,
      loading: false,
      vpses: [],
      isActions: false
    }
  },
  mounted() {
    this.getVps(this.current_page)
  },
  methods: {
    hideString(x) {
      if (x !== null) {
        const template = '*'.repeat(x.length)
        return x.replace(x, template)
      } else {
        return 'n/a'
      }
    },
    closeActionsModal() {
      this.isActions = false
    },
    openDeleteNodeModal(vps) {
      setTimeout(this.closeActionsModal, 1)

      this.$store.dispatch('activeVps/updateActiveVps', vps)
      this.$store.dispatch('modals/updateDeleteVpsModalVisible', true)

      // this.$axios
      //   .$delete(`vps-keys/${id}`)
      //   .then(response => {
      //     this.$store.dispatch('snackbar/updateSnack', {
      //       snack: 'vpsProviderDeleteSuccess',
      //       color: 'success',
      //       timeout: true
      //     })
      //   })
      //   .catch(error => {
      //     this.loading = false
      //     this.$store.dispatch('snackbar/updateSnack', {
      //       snack: error.response.data.msg,
      //       color: 'error',
      //       timeout: true
      //     })
      //   })
    },
    openEditNodeModal(vps) {
      setTimeout(this.closeActionsModal, 1)
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
      // Fetcing data
      this.$axios.$get(`vps-keys/?page=${page}`).then(response => {
        const {
          data,
          current_page,
          prev_page_url,
          next_page_url,
          from,
          to
        } = response
        data.forEach(vps => {
          vps.tokenVisible = false
          vps.secretVisible = false
        })
        self.vpses = data
        self.from = from
        self.to = to
        self.currentPage = current_page
        self.prevPage = prev_page_url != null ? self.currentPage - 1 : null
        self.nextPage = next_page_url != null ? self.currentPage + 1 : null
        self.loading = false
      })
    }
  }
}
</script>
