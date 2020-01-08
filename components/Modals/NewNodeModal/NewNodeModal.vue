<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div :class="isLoading === true ? 'modal-form_blured' : null">
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
            <div class="modal__body modal__body_wrap">
              <div
                :class="['modal-input', isError === true || isInvalid === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
              >
                <label class="modal-input__label">{{$t('ipAddress')}}</label>
                <div class="modal-input__wrapper">
                  <input
                    v-model="ip"
                    v-validate="'ip_or_fqdn'"
                    data-vv-delay="1"
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
                  <input
                    v-model="label"
                    class="modal-input__control"
                    type="text"
                    @focus="clearData"
                  />
                </div>
              </div>
              <ul class="modal-list">
                <li
                  v-for="(node, index) in failedNodes"
                  :key="index"
                  class="modal-list__item modal-list__item_error"
                >- {{node}} {{$t('nodeIsOffline')}}</li>
                <li
                  v-for="(node, index) in duplicateNodes"
                  :key="index"
                  class="modal-list__item modal-list__item_error"
                >- {{node}} {{$t('nodeIsDuplicate')}}</li>
                <li
                  v-for="(node, index) in successNodes"
                  :key="index"
                  class="modal-list__item modal-list__item_success"
                >- {{node.addr}} {{$t('successfullyAdded')}}</li>
              </ul>
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
                    v-validate="'multiple_domain_and_ip'"
                    data-vv-as="nodesIp"
                    data-vv-delay="1"
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
                  <input
                    v-model="label"
                    class="modal-input__control"
                    type="text"
                    @focus="clearData"
                  />
                </div>
              </div>

              <ul class="modal-list">
                <li
                  v-for="(node, index) in failedNodes"
                  :key="index"
                  class="modal-list__item modal-list__item_error"
                >- {{node}} {{$t('nodeIsOffline')}}</li>
                <li
                  v-for="(node, index) in duplicateNodes"
                  :key="index"
                  class="modal-list__item modal-list__item_error"
                >- {{node}} {{$t('nodeIsDuplicate')}}</li>
                <li
                  v-for="(node, index) in successNodes"
                  :key="index"
                  class="modal-list__item modal-list__item_success"
                >- {{node.addr}} {{$t('successfullyAdded')}}</li>
              </ul>
            </div>
          </template>
          <div class="modal__footer">
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
            >{{$t('addNode')}}</Button>
            <Button
              v-if="currentView === 'multiple'"
              class="modal__footer-button"
              type="button"
              :theme="isMultipleValidated === true ? 'primary' : 'white'"
              :disabled="isMultipleValidated === true ? false : true"
              @click.native="isMultipleValidated === true ? addNode() : false"
            >{{$t('addNodes')}}</Button>
          </div>
        </div>
        <div v-if="isLoading" class="modal__loading-overlay">
          <span
            :class="['modal__footer-loader modal__footer-loader_static fe fe-loader',  isLoading === true ? 'modal__footer-loader_visible' : null]"
          ></span>
          <div class="modal__loading-overlay-text">{{$t('addNodesLoading')}}</div>
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
import { Validator } from 'vee-validate'
import Button from '~/components/Button/Button.vue'

Validator.extend('multiple_domain_and_ip', {
  getMessage: field => `The field must be a valid ip address or FQDN.`,
  validate: value => {
    value = value.replace(/\s/g, '')
    const ipRegExp = /((?=.*[^]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4})/gim
    const urlRegExp = /((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)[^,]+/gim
    const isIp = ipRegExp.test(value)
    const isUrl = urlRegExp.test(value)
    const result = isIp === true || isUrl === true ? true : false
    return result
  }
})

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
      this.$store.dispatch('userNodes/updateUserNodes')
    },
    switchView(val) {
      this.currentView = val
      this.ip = ''
      this.label = ''
      this.clearData()
    },
    generateChunk(array, chunkSize) {
      return [].concat.apply(
        [],
        array.map((elem, i) => {
          return i % chunkSize ? [] : [array.slice(i, i + chunkSize)]
        })
      )
    },
    generateResponse(data) {
      const { duplicate, failed, saved } = data
      this.duplicateNodes = this.duplicateNodes.concat(duplicate)
      this.failedNodes = this.failedNodes.concat(failed)
      this.successNodes = this.successNodes.concat(saved)

      if (duplicate.length > 0) {
        this.isError = true
        this.alertMsg = 'duplicateNewNodeAlert'
      } else if (failed.length > 0) {
        this.isError = true
        this.alertMsg = 'failedNewNodeAlert'
      } else if (saved.length > 0) {
        this.alertMsg = 'successNewNodeAlert'
        this.isSuccess = true
      }
      this.isLoading = false
    },
    addNode() {
      this.clearData()
      this.isLoading = true
      const label = this.label
      let ip = this.ip
      if (this.currentView === 'multiple') {
        const maxNodes = 10
        const ipRegExp = /((?=.*[^]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4})/gim
        const urlRegExp = /((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)[^,]+/gim
        let ipArray = []
        let urlArray = []
        let promises = []
        let urlIpArray = []

        ip = ip.replace(/\s/g, '')
        ipArray = ip.match(ipRegExp)
        urlArray = ip.match(urlRegExp)

        //ips + urls
        if (ipArray != null && urlArray != null) {
          ipArray = ipArray.concat(urlArray)
          urlIpArray = ipArray
        } else if (ipArray != null && urlArray === null) {
          urlIpArray = ipArray
        } else {
          urlIpArray = urlArray
        }

        // generating chunk with batches
        const chunk = this.generateChunk(urlIpArray, maxNodes)

        // post nodes with delay
        chunk.forEach((ipBatch, index) => {
          const ips = ipBatch.join()
          promises.push(
            this.$axios.$post('nodes', {
              label: label,
              ip: ips
            })
          )
        })
        Promise.all(promises).then(result => {
          result.forEach(response => {
            this.generateResponse(response.data)
          })
        })
      } else {
        this.$axios
          .$post('nodes', {
            label: label,
            ip: ip
          })
          .then(response => {
            this.generateResponse(response.data)
          })
      }
    }
  }
}
</script>
