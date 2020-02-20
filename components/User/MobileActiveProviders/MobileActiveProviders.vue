<template>
  <Card col="12" padding="none">
    <div class="card-header">
      <div>
        <h3 class="card-header__title">{{ $t('activeProviders') }}</h3>
      </div>
      <div class="card-header__right">
        <div class="page-navigation__pagination">
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
    <div class="mobile-active-provider">
      <div
        v-for="vps in vpses"
        :key="vps.id"
        class="mobile-active-provider__item"
      >
        <div class="mobile-active-provider__title">{{ $t('name') }}</div>
        <div class="mobile-active-provider__value text_wrap_none">
          {{ vps.profile_name }}
        </div>
        <div class="mobile-active-provider__title">{{ $t('provider') }}</div>
        <div class="mobile-active-provider__value text_wrap_none">
          {{ vps.provider }}
        </div>
        <div class="mobile-active-provider__title">{{ $t('key') }}</div>
        <div class="mobile-active-provider__value text_wrap_none">
          *****
        </div>
        <div class="mobile-active-provider__title">
          {{ $t('secretOnlyAws') }}
        </div>
        <div
          class="mobile-active-provider__value text_wrap_none"
          v-text="vps.api_secret !== null ? '*****' : 'n/a'"
        ></div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './MobileActiveProviders.scss';
</style>

<script>
import { mapGetters } from 'vuex'

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
      total: 0,
      loading: false,
      vpses: []
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
        to,
        total
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
