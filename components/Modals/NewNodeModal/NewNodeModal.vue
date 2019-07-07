<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">{{$t('nodeManager')}}</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{$t('addNodes')}}</div>
        <div class="modal-switch">
          <div
            :class="['modal-switch__button', currentView === 'single' ? 'modal-switch__button_active' : null]"
            @click="switchView('single')"
          >{{$t('single')}}</div>
          <div
            :class="['modal-switch__button', currentView === 'multiple' ? 'modal-switch__button_active' : null]"
            @click="switchView('multiple')"
          >{{$t('multiple')}}</div>
        </div>
        <template v-if="currentView === 'single'">
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
        </template>
        <template v-else>
          <div class="modal__body modal__body_wrap">
            <div class="modal__body-title">{{$t('enterMultipleIp')}}</div>
            <div
              :class="['modal-input modal-input_full', isError === true || isMultipleInvalid === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
            >
              <label class="modal-input__label">{{$t('ipAddresses')}}</label>
              <div class="modal-input__wrapper">
                <textarea
                  v-model="ip"
                  v-validate="{ required: true, regex: /((?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4})/igm }"
                  data-vv-as="nodesIp"
                  name="nodesIp"
                  class="modal-input__control modal-input__control_textarea"
                  type="text"
                  required
                  @focus="clearData"
                />
                <span
                  :class="['modal-input__icon fe', isError === true || isMultipleInvalid === true ? 'fe-x' : isSuccess ? 'fe-check' : null]"
                ></span>
              </div>
              <div class="modal-input__alert">{{ errors.first('nodesIp') }} {{$t(alertMsg)}}</div>
            </div>
            <div class="modal-input">
              <label class="modal-input__label">{{$t('nodesName')}}</label>
              <div class="modal-input__wrapper">
                <input v-model="label" class="modal-input__control" type="text" @focus="clearData" />
              </div>
            </div>

            <ul class="modal-list">
              <li
                v-for="(node, index) in failedNodes"
                :key="index"
                class="modal-list__item"
              >- {{node}} {{$t('nodeIsOffline')}}</li>
              <li
                v-for="(node, index) in duplicateNodes"
                :key="index"
                class="modal-list__item"
              >- {{node}} {{$t('nodeIsDuplicate')}}</li>
              <li
                v-for="(node, index) in successNodes"
                :key="index"
                class="modal-list__item"
              >- {{node.address}} {{$t('successfullyAdded')}}</li>
            </ul>
          </div>
        </template>
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
            v-if="currentView === 'single'"
            class="modal__footer-button"
            type="button"
            :theme="isValidated === true ? 'primary' : 'white'"
            :disabled="isValidated === true ? false : true"
            @click.native="isValidated === true ? addNode() : false"
          >{{$t('confirm')}}</Button>
          <Button
            v-if="currentView === 'multiple'"
            class="modal__footer-button"
            type="button"
            :theme="isMultipleValidated === true ? 'primary' : 'white'"
            :disabled="isMultipleValidated === true ? false : true"
            @click.native="isMultipleValidated === true ? addNode() : false"
          >{{$t('confirm')}}</Button>
        </div>
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
      isLoading: false,
      currentView: 'single',
      duplicateNodes: [],
      failedNodes: [],
      successNodes: []
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
    isMultipleInvalid() {
      if (
        this.fields.nodesIp !== undefined &&
        this.fields.nodesIp.changed === true
      ) {
        return this.fields.nodesIp.invalid
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
    },
    isMultipleValidated() {
      if (this.fields.nodesIp !== undefined) {
        return this.fields.nodesIp.valid
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
      this.failedNodes = []
      this.duplicateNodes = []
      this.successNodes = []
    },
    closeModal() {
      this.$store.dispatch('modals/updateNewNodeModalVisible', false)
    },
    switchView(val) {
      this.currentView = val
      this.ip = ''
      this.label = ''
      this.clearData()
    },
    addNode() {
      const self = this
      const label = this.label
      let ip = this.ip

      if (this.currentView === 'multiple') {
        ip = ip.replace(/\s/g, '')
        const ipRegExp = /((?=.*[^]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4})/gim
        let ipArray = []
        ipArray = ip.match(ipRegExp)
        if (ipArray.length > 10) {
          self.isError = true
          self.alertMsg = 'allowedOnly10Nodes'
          return false
        } else {
          ip = ipArray.join()
        }
      }

      this.isLoading = true
      this.$axios
        .$post('nodes', {
          label: label,
          ip: ip
        })
        .then(response => {
          const { duplicate, failed, saved } = response.data
          self.duplicateNodes = duplicate
          self.failedNodes = failed
          self.successNodes = saved

          if (duplicate.length > 0) {
            self.isError = true
            self.alertMsg = 'duplicateNewNodeAlert'
          } else if (failed.length > 0) {
            self.isError = true
            self.alertMsg = 'failedNewNodeAlert'
          } else if (saved.length > 0) {
            self.alertMsg = 'successNewNodeAlert'
            self.isSuccess = true
            self.$store.dispatch('userNodes/updateUserNodes')
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
