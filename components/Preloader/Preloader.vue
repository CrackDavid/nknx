<template>
  <div class="preloader">
    <Logo class="preloader__item" />
    <div>
      <div class="preloader__text">{{$t('loading')}}...</div>
    </div>
  </div>
</template>

<style lang="scss">
@import './Preloader';
</style>

<script>
import Logo from '@/assets/icons/logo.svg'

export default {
  components: {
    Logo
  },
  data: () => {
    return {}
  },
  mounted: function() {},
  methods: {}
}
</script>
