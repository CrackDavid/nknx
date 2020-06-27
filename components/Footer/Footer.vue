<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__nav">
        <div class="footer__description">
          <div class="footer__description-title">
            <Logo class="footer__description-logo" />New Kind of Network
          </div>
          <div class="footer__description-text">{{$t('nknDescription')}}</div>
          <div class="footer__description-socials">
            <a
              v-for="social in socials"
              :key="social.url"
              :href="social.url"
              target="_blank"
              class="footer__description-social"
            >
              <component :is="social.icon"></component>
            </a>
          </div>
        </div>

        <div class="footer__nav-item">
          <div class="footer__nav-title">{{ $t("company") }}</div>
          <a
            class="footer__nav-link"
            href="https://www.nkn.org/#/about"
            target="_blank"
          >{{ $t("about") }}</a>
          <a
            class="footer__nav-link"
            href="https://www.nkn.org"
            target="_blank"
          >{{ $t("officialWebsite") }}</a>
        </div>
        <div class="footer__nav-item">
          <div class="footer__nav-title">{{ $t("otherHelpfulTools") }}</div>
          <a class="footer__nav-link" href="http://nstatus.org" target="_blank">{{ $t("nStatus") }}</a>
          <a
            class="footer__nav-link"
            href="https://vault.nknx.org"
            target="_blank"
          >{{ $t("nknxVault") }}</a>
          <a
            class="footer__nav-link"
            href="https://vanity.nknx.org"
            target="_blank"
          >{{ $t("nknxVanity") }}</a>
          <a
            class="footer__nav-link"
            href="https://www.nknx.org"
            target="_blank"
          >{{ $t("nknxNodeManager") }}</a>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__bottom-item">© NKNx 2020. {{$t('allRightsReserved')}}.</div>
        <div class="footer__bottom-item">{{$t('donate')}}: NKNXXXXXGKct2cZuhSGW6xqiqeFVd5nJtAzg</div>
        <div class="footer__bottom-item">
          Coded with
          <span class="fe fe-heart"></span> by Christian Busch & Andrew Tawking
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
@import './Footer';
</style>


<script>
import Logo from '@/assets/icons/logo.svg'
import Twitter from '@/assets/icons/Twitter.svg'
import Telegram from '@/assets/icons/Telegram.svg'
import Medium from '@/assets/icons/MediumSymbol.svg'
import Discord from '@/assets/icons/Discord.svg'

export default {
  components: {
    Logo,
    Twitter,
    Telegram,
    Medium,
    Discord
  },
  data: () => {
    return {
      navigation: [
        {
          title: 'nkn',
          links: [
            {
              title: 'about',
              url: 'https://www.nkn.org/#/about'
            },
            {
              title: 'officialWebsite',
              url: 'https://www.nkn.org/'
            },
            {
              title: 'nknWallet',
              url: 'https://wallet.nkn.org/'
            }
          ]
        },
        {
          title: 'nknxEcosystem',
          links: [
            {
              title: 'nknxNodeManager',
              url: 'https://www.nknx.org'
            },
            {
              title: 'nknxExplorer',
              url: 'https://explorer.nknx.org'
            },
            {
              title: 'nknxVault',
              url: 'https://vault.nknx.org'
            },
            {
              title: 'nknxVanity',
              url: 'https://vanity.nknx.org'
            }
          ]
        }
      ],
      socials: [
        { icon: 'Twitter', url: 'https://twitter.com/NKN_ORG' },
        { icon: 'Telegram', url: 'https://t.me/nknorg' },
        { icon: 'Medium', url: 'https://medium.com/nknetwork' },
        { icon: 'Discord', url: 'https://discord.gg/fvK2Egm' }
      ]
    }
  }
}
</script>
