<template>
  <Card col="3">
    <div class="card-header card-header_border">
      <h3 class="card-header__title">
        {{ $t('avatar') }}
      </h3>
    </div>
    <div class="user-avatar">
      <div class="user-avatar__image"></div>
      <Button
        class="user-avatar__upload"
        type="button"
        theme="primary"
        @click.native="uploadPhoto"
        >{{ $t('uploadAPhoto') }}</Button
      >

      <div class="user-avatar__remove">{{ $t('removeAvatar') }}</div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './UserAvatar.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'

export default {
  components: {
    Card,
    Button
  },
  data: () => {
    return {
      loading: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    uploadPhoto() {}
  }
}
</script>
