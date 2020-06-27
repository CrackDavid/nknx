<template>
  <Card
    :col="$mq === 'xl' ? '3' : $mq === 'llg' ? '6' : $mq === 'lg' ? '6' : '12'"
  >
    <div class="card-header card-header_border">
      <h3 class="card-header__title">
        {{ $t('avatar') }}
      </h3>
    </div>
    <div class="user-avatar">
      <div v-if="!userData.avatar.length" class="user-avatar__image"></div>
      <img
        v-else
        class="user-avatar__image"
        :src="`https://api.nknx.org/storage/avatars/${userData.avatar}`"
      />
      <Button
        class="user-avatar__upload"
        type="button"
        theme="primary"
        @click.native="$refs.file.click()"
        >{{ $t('uploadAPhoto')
        }}<input
          ref="file"
          class="user-avatar__controller"
          type="file"
          @change="uploadAvatar"
      /></Button>
      <div class="user-avatar__remove" @click="removeAvatar">
        {{ $t('removeAvatar') }}
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './UserAvatar.scss';
</style>

<script>
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      userData: 'userData/getUserData'
    })
  },
  mounted() {},
  methods: {
    removeAvatar() {
      this.$axios
        .delete('user/avatar')
        .then(response => {
          this.$store.dispatch('userData/updateUserData')

          this.$store.dispatch('snackbar/updateSnack', {
            snack: 'avatarDeleteSuccess',
            color: 'success',
            timeout: true
          })
        })
        .catch(error => {
          this.$store.dispatch('snackbar/updateSnack', {
            snack: error.response.data.msg,
            color: 'error',
            timeout: true
          })
        })
    },
    uploadAvatar(e) {
      const allowedFormats = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/gif',
        'image/svg',
        'image/svg+xml'
      ]
      const file = e.target.files[0] || e.dataTransfer.files[0]
      const newFile = new FormData()

      newFile.append('avatar', file)

      const isValidFormat =
        allowedFormats.filter(format => format === file.type).length > 0
      const isValidSize = file.size <= 2000000

      if (!isValidFormat) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'notAllowedAvatarFormat',
          color: 'error',
          timeout: true
        })
      } else if (!isValidSize) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'notAllowedAvatarSize',
          color: 'error',
          timeout: true
        })
      } else {
        this.updateAvatar(newFile)
      }
    },
    updateAvatar(img) {
      this.$axios
        .post('user/avatar', img, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.$store.dispatch('userData/updateUserData')

          this.$store.dispatch('snackbar/updateSnack', {
            snack: 'avatarChangeSuccess',
            color: 'success',
            timeout: true
          })
        })
        .catch(error => {
          this.$store.dispatch('snackbar/updateSnack', {
            snack: error.response.data.msg,
            color: 'error',
            timeout: true
          })
        })
    }
  }
}
</script>
