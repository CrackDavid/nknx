<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">{{$t('nodeManager')}}</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{$t('editNode')}} {{activeNode.addr}}</div>
        <div class="modal__body modal__body_wrap">
          <div
            :class="['modal-input', isError === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
          >
            <label class="modal-input__label">{{$t('nodeLabel')}}</label>
            <div class="modal-input__wrapper">
              <input v-model="label" class="modal-input__control" type="text" />
            </div>
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
            @click.native="editNode(activeNode.id)"
          >{{$t('confirm')}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './EditNodeModal.scss';
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
      label: '',
      isError: false,
      isSuccess: false,
      alertMsg: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      editNodeModalVisible: 'modals/getEditNodeModalVisible',
      activeNode: 'activeNode/getActiveNode'
    })
  },
  destroyed() {},
  created: function() {},
  mounted: function() {
    this.label = this.activeNode.pivot.label
  },
  methods: {
    clearData() {
      this.label = ''
      this.isError = false
      this.isSuccess = false
      this.alertMsg = ''
    },
    closeModal() {
      this.$store.dispatch('modals/updateEditNodeModalVisible', false)
      this.clearData()
    },
    editNode(id) {
      const self = this
      const { label } = this
      this.isLoading = true
      this.$axios
        .$put(`nodes/${id}`, { label: label })
        .then(response => {
          self.alertMsg = 'successNodeEditAlert'
          self.isSuccess = true
          self.$store.dispatch('userNodes/updateUserNodes')
          self.isLoading = false
          setTimeout(self.closeModal, 1000)
        })
        .catch(error => {
          self.isError = true
          self.alertMsg = 'failedNodeEditAlert'
          self.isLoading = false
        })
    }
  }
}
</script>
