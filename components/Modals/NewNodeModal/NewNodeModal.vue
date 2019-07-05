<template>
  <div class="modal-wrapper">
    <div v-on-clickaway="closeModal" class="modal-form">
      <div class="modal__header">
        <div class="modal__heading">{{$t('nodeManager')}}</div>
        <span class="modal__close fe fe-x" @click="closeModal"></span>
      </div>
      <div class="modal__title">{{$t('addNodes')}}</div>
      <div class="modal__body">
        <div
          :class="['modal-input', isError === true || isInvalid === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
        >
          <label class="modal-input__label">{{$t('ipAddress')}}</label>
          <div class="modal-input__wrapper">
            <input
              v-model="ip"
              v-validate="'ip'"
              data-vv-as="nodeIp"
              name="nodeIp"
              class="modal-input__control"
              type="text"
              required
              @focus="clearData"
            />
            <span
              :class="['modal-input__icon fe', isError === true || isInvalid === true ? 'fe-x' : isSuccess ? 'fe-check' : null]"
            ></span>
          </div>
          <div class="modal-input__alert">{{ errors.first('nodeIp') }} {{$t(alertMsg)}}</div>
        </div>
        <div class="modal-input">
          <label class="modal-input__label">{{$t('nodeName')}}</label>
          <div class="modal-input__wrapper">
            <input v-model="label" class="modal-input__control" type="text" @focus="clearData" />
          </div>
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
          :theme="isValidated === true ? 'primary' : 'white'"
          :disabled="isValidated === true ? false : true"
          @click.native="isValidated === true ? addNode() : false"
        >{{$t('confirm')}}</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './NewNodeModal.scss';
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
      ip: '',
      label: '',
      isError: false,
      isSuccess: false,
      alertMsg: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      newNodeModalVisible: 'modals/getNewNodeModalVisible',
      userNodes: 'userNodes/getUserNodes'
    }),
    isInvalid() {
      if (
        this.fields.nodeIp !== undefined &&
        this.fields.nodeIp.changed === true
      ) {
        return this.fields.nodeIp.invalid
      } else {
        return false
      }
    },
    isValidated() {
      if (this.fields.nodeIp !== undefined) {
        return this.fields.nodeIp.valid
      } else {
        return false
      }
    }
  },
  destroyed() {
    this.clearData()
  },
  created: function() {},
  mounted: function() {},
  methods: {
    clearData() {
      this.isError = false
      this.isSuccess = false
      this.alertMsg = ''
    },
    closeModal() {
      this.$store.dispatch('modals/updateNewNodeModalVisible', false)
    },
    addNode() {
      const self = this
      const ip = this.ip
      const label = this.label
      this.isLoading = true
      this.$axios
        .$post('nodes', {
          label: label,
          ip: ip
        })
        .then(response => {
          const { duplicate, failed, saved } = response.data
          if (duplicate.length > 0) {
            self.isError = true
            self.alertMsg = 'duplicateNewNodeAlert'
          } else if (failed.length > 0) {
            self.isError = true
            self.alertMsg = 'failedNewNodeAlert'
          } else if (saved.length > 0) {
            self.alertMsg = 'successNewNodeAlert'
            self.isSuccess = true
            let config = {
              filter: '',
              sort: '',
              order: 'desc',
              search: '',
              page: 1
            }
            if (self.userNodes !== false) {
              config.page = self.userNodes.nodes.current_page
            }
            self.$store.dispatch('userNodes/updateUserNodes', config)
            setTimeout(self.closeModal, 1000)
          }
          self.isLoading = false
        })
        .catch(error => {
          self.isError = true
          self.alertMsg = 'failedNewNodeAlert'
          self.isLoading = false
        })
    }
  }
}
</script>
