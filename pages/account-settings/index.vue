<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{ $t(pageTitle) }}</h1>
      <SettingsTabs :tabs="tabs" @onTabChange="onTabChange" />
      <Grid class="page__account-settings" :customHeight="true">
        <template v-if="activeTab === 'myAccount'">
          <ProfileData />
          <UserPassword />
          <UserAvatar />
          <DeleteAccount />
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
import UserPassword from '~/components/User/UserPassword/UserPassword.vue'
import UserAvatar from '~/components/User/UserAvatar/UserAvatar.vue'
import DeleteAccount from '~/components/User/DeleteAccount/DeleteAccount.vue'

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
    ProfileData,
    UserPassword,
    UserAvatar,
    DeleteAccount
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
