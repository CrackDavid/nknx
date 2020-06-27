<template>
  <Card
    :col="$mq === 'xl' ? '5' : $mq === 'llg' ? '6' : $mq === 'lg' ? '6' : '12'"
  >
    <div class="card-header card-header_border">
      <h3 class="card-header__title">
        {{ $t('changePassword') }}
      </h3>
    </div>
    <div class="modal__body modal__body_wrap">
      <div class="modal-input modal-input_flex modal-input_full">
        <label class="modal-input__label modal-input__label_flex">{{
          $t('currentPassword')
        }}</label>
        <div class="modal-input__wrapper_flex">
          <input
            v-model="oldPassword"
            class="modal-input__control"
            :type="!oldPasswordVisible ? 'password' : 'text'"
          />
          <span
            :class="[
              'modal-input__action',
              oldPasswordVisible ? 'fe fe-eye-off' : 'fe fe-eye'
            ]"
            @click="toggleOldPasswordVisible"
          />
        </div>
      </div>
      <div class="modal-input modal-input_flex modal-input_full">
        <label class="modal-input__label modal-input__label_flex">{{
          $t('newPassword')
        }}</label>
        <div class="modal-input__wrapper_flex">
          <input
            v-model="newPassword"
            class="modal-input__control"
            :type="!newPasswordVisible ? 'password' : 'text'"
          />
          <span
            :class="[
              'modal-input__action',
              newPasswordVisible ? 'fe fe-eye-off' : 'fe fe-eye'
            ]"
            @click="toggleNewPasswordVisible"
          />
        </div>
      </div>
      <div class="modal-input modal-input_flex modal-input_full">
        <label class="modal-input__label modal-input__label_flex">{{
          $t('confirmPassword')
        }}</label>
        <div class="modal-input__wrapper_flex">
          <input
            v-model="confirmPassword"
            class="modal-input__control"
            :type="!confirmPasswordVisible ? 'password' : 'text'"
          />
          <span
            :class="[
              'modal-input__action',
              confirmPasswordVisible ? 'fe fe-eye-off' : 'fe fe-eye'
            ]"
            @click="toggleConfirmPasswordVisible"
          />
        </div>
      </div>
    </div>
    <div class="modal__footer modal__footer_no-margin">
      <span
        :class="[
          'modal__footer-loader fe fe-loader',
          loading === true ? 'modal__footer-loader_visible' : null
        ]"
      ></span>

      <Button
        class="modal__footer-button"
        type="button"
        :theme="!isDisabled ? 'primary' : 'white'"
        :disabled="isDisabled"
        @click.native="!loading ? saveData() : false"
        >{{ $t('save') }}</Button
      >
    </div>
  </Card>
</template>

<style lang="scss">
@import './UserPassword.scss';
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
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      loading: false,
      oldPasswordVisible: false,
      newPasswordVisible: false,
      confirmPasswordVisible: false
    }
  },
  computed: {
    isPassword() {
      const oldPassword = this.oldPassword
      const password = this.newPassword
      const passwordConfirm = this.confirmPassword

      if (
        password === passwordConfirm &&
        password.length > 1 &&
        passwordConfirm.length > 1 &&
        oldPassword.length > 1
      ) {
        return true
      } else {
        return false
      }
    },
    isDisabled() {
      if (this.isPassword === false || this.loading === true) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {},
  methods: {
    toggleNewPasswordVisible() {
      this.newPasswordVisible = !this.newPasswordVisible
    },
    toggleOldPasswordVisible() {
      this.oldPasswordVisible = !this.oldPasswordVisible
    },
    toggleConfirmPasswordVisible() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible
    },
    saveData() {
      const oldPassword = this.oldPassword
      const newPassword = this.newPassword

      this.loading = true
      this.$axios
        .put('user/password', { old_pass: oldPassword, new_pass: newPassword })
        .then(response => {
          this.$store.dispatch('snackbar/updateSnack', {
            snack: 'passwordChangeSuccess',
            color: 'success',
            timeout: true
          })
          this.loading = false
        })
        .catch(error => {
          this.loading = false

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
