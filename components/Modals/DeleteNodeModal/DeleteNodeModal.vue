<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">{{$t('nodeManager')}}</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{$t('deleteNode')}}</div>
        <div class="modal__body modal__body_wrap">
          <div class="modal__message">
            {{$t('deleteNodeConfirm')}}
            {{activeNode.addr}}?
          </div>
          <div
            :class="['modal-input', isError === true || isInvalid === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
          >
            <div class="modal-input__alert">{{$t(alertMsg)}}</div>
          </div>
        </div>
        <div class="modal__footer">
          <span
            :class="['modal__footer-loader fe fe-loader',  isLoading === true ? 'modal__footer-loader_visible' : null]"
          ></span>
          <Button
            class="modal__footer-button"
            type="button"
            theme="white"
            @click.native="closeModal"
          >{{$t('cancel')}}</Button>
          <Button
            class="modal__footer-button"
            type="button"
            theme="primary"
            @click.native="deleteNode(activeNode.id)"
          >{{$t('confirm')}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './DeleteNodeModal.scss';
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
      address: '',
      label: '',
      isError: false,
      isSuccess: false,
      alertMsg: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      deleteNodeModalVisible: 'modals/getDeleteNodeModalVisible',
      activeNode: 'activeNode/getActiveNode'
    })
  },
  destroyed() {},
  created: function() {},
  mounted: function() {},
  methods: {
    closeModal() {
      this.$store.dispatch('modals/updateDeleteNodeModalVisible', false)
    },
    deleteNode(id) {
      const self = this
      this.isLoading = true
      this.$axios
        .$delete(`nodes/${id}`)
        .then(response => {
          self.alertMsg = 'successNodeDeleteAlert'
          self.isSuccess = true
          self.$store.dispatch('userNodes/updateUserNodes')
          self.isLoading = false
          setTimeout(self.closeModal, 1000)
        })
        .catch(error => {
          self.isError = true
          self.alertMsg = 'failedNodeDeleteAlert'
          self.isLoading = false
        })
    }
  }
}
</script>
