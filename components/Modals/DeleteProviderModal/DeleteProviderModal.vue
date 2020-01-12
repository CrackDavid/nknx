<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">{{ $t('accountSettings') }}</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{ $t('deleteProvider') }}</div>
        <div class="modal__body modal__body_wrap">
          <div class="modal__message">
            {{ $t('deleteProviderConfirm') }}
            {{ activeProvider.profile_name }}?
          </div>
        </div>
        <div class="modal__footer">
          <span
            :class="[
              'modal__footer-loader fe fe-loader',
              isLoading === true ? 'modal__footer-loader_visible' : null
            ]"
          ></span>
          <Button
            class="modal__footer-button"
            type="button"
            theme="white"
            @click.native="closeModal"
            >{{ $t('cancel') }}</Button
          >
          <Button
            class="modal__footer-button"
            type="button"
            theme="primary"
            @click.native="deleteProvider(activeProvider.id)"
            >{{ $t('confirm') }}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './DeleteProviderModal.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
import Button from '~/components/Button/Button.vue'

export default {
  components: { Button },
  mixins: [clickaway],
  data: () => {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      deleteProviderModalVisible: 'modals/getDeleteProviderModalVisible',
      activeProvider: 'activeProvider/getActiveProvider'
    })
  },
  destroyed() {},
  created: function() {},
  mounted: function() {},
  methods: {
    closeModal() {
      this.$store.dispatch('modals/updateDeleteProviderModalVisible', false)
    },
    deleteProvider(id) {
      this.isLoading = true
      this.$axios
        .$delete(`vps-keys/${id}`)
        .then(response => {
          this.isLoading = false
          this.closeModal()

          this.$store.dispatch('userProviders/updateUserProviders', 1)

          this.$store.dispatch('snackbar/updateSnack', {
            snack: 'providerDeleteSuccess',
            color: 'success',
            timeout: true
          })
        })
        .catch(error => {
          this.isLoading = false
          this.closeModal()
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
