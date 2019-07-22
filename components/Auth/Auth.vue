<template>
  <div class="auth">
    <div class="auth__left">
      <h1 class="auth__greeting">{{$t('welcomeToNknx')}}</h1>
      <Welcome class="auth__img" />
    </div>
    <div class="auth__right">
      <h2 class="auth__title">{{$t('nknxTitle')}}</h2>
      <p class="auth__message">{{$t('emailNotVerifiedMessage')}}</p>
      <div class="auth__footer">
        <div class="auth__description-title">
          <Logo class="auth__logo" />New Kind Of Network
        </div>
        <p class="auth__description-text">{{$t('nknDescription')}}</p>
        <div class="auth__socials">
          <a
            v-for="social in socials"
            :key="social.url"
            :href="social.url"
            target="_blank"
            class="auth__social"
          >
            <component :is="social.icon"></component>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './Auth';
</style>

<script>
import Welcome from '~/assets/icons/welcome.svg'
import Logo from '~/assets/icons/logo.svg'
import Twitter from '@/assets/icons/Twitter.svg'
import Telegram from '@/assets/icons/Telegram.svg'
import Medium from '@/assets/icons/MediumSymbol.svg'
import Discord from '@/assets/icons/Discord.svg'

export default {
  components: { Welcome, Logo, Twitter, Telegram, Medium, Discord },
  data: () => {
    return {
      socials: [
        { icon: 'Twitter', url: 'https://twitter.com/NKN_ORG' },
        { icon: 'Telegram', url: 'https://t.me/nknorg' },
        { icon: 'Medium', url: 'https://medium.com/nknetwork' },
        { icon: 'Discord', url: 'https://discord.gg/fvK2Egm' }
      ]
    }
  },
  mounted: function() {},
  methods: {}
}
</script>
