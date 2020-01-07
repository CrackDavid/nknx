<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{ $t(pageTitle) }}</h1>
      <SettingsTabs :tabs="tabs" @onTabChange="onTabChange" />
      <Grid class="page__account-settings">
        <template v-if="activeTab === 'myAccount'">
          <ProfileData />
        </template>
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import SettingsTabs from '~/components/User/SettingsTabs/SettingsTabs.vue'
import ProfileData from '~/components/User/ProfileData/ProfileData.vue'

export default {
  head() {
    return {
      title: this.$t('accountSettings')
    }
  },
  middleware: 'isAuth',
  components: {
    ContentWrapper,
    Grid,
    SettingsTabs,
    ProfileData
  },
  data: () => {
    return {
      tabs: ['myAccount', 'vpsKeys', 'notifications'],
      activeTab: 'myAccount'
    }
  },
  computed: {
    ...mapGetters({
      pageTitle: 'pageTitle/getPageTitle'
    })
  },
  created() {
    this.$store.dispatch('pageTitle/updatePageTitle', 'accountSettings')
  },
  methods: {
    onTabChange(tab) {
      this.activeTab = tab
    }
  }
}
</script>
