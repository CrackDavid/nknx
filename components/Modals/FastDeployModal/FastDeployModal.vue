<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form fast-deploy__form">
        <div class="modal__header">
          <div class="modal__heading">{{$t('fastDeploy')}}</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{$t('welcomeToFastDeploy')}}</div>
        <div class="modal-switch">
          <div
            :class="['modal-switch__button', currentView === 'snippets' ? 'modal-switch__button_active' : null]"
            @click="switchView('snippets')"
          >{{$t('createSnippet')}}</div>
          <div
            :class="['modal-switch__button', currentView === 'deployments' ? 'modal-switch__button_active' : null]"
            @click="switchView('deployments')"
          >{{$t('myDeployments')}}</div>
        </div>
        <template v-if="currentView === 'snippets'">
          <div class="modal__body modal__body_wrap">
            <div class="modal__body-title">{{$t('createSnippetDescription')}}</div>
            <div
              :class="['modal-input', isError === true || isInvalid === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
            >
              <label class="modal-input__label">{{$t('walletAddress')}}</label>
              <div class="modal-input__wrapper">
                <input
                  v-model="address"
                  v-validate="{ required: true, regex: /^((^NKN([A-Za-z0-9]){33}){1})$/s }"
                  class="modal-input__control"
                  type="text"
                  name="nknaddress"
                  required
                  @focus="clearData"
                />
                <span
                  :class="['modal-input__icon fe', isError === true || isInvalid === true ? 'fe-x' : isSuccess ? 'fe-check' : null]"
                ></span>
              </div>
              <div class="modal-input__alert">{{ errors.first('nknaddress') }}</div>
            </div>

            <div
              :class="['modal-input modal-input_full', isError === true || isInvalid === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
            >
              <label class="modal-input__label">{{$t('systemArchitecture')}}</label>
              <div class="modal-input__wrapper">
                <div class="modal-radio__group">
                  <Radio
                    class="modal-radio__item"
                    name="options"
                    label="linux-amd64"
                    :value="activeArchitecture"
                    @change="changeArchitecture"
                  >linux-amd64</Radio>
                  <Radio
                    class="modal-radio__item"
                    name="options"
                    label="linux-armv6l"
                    :value="activeArchitecture"
                    @change="changeArchitecture"
                  >linux-armv6l</Radio>
                </div>
              </div>
              <div class="modal-input__alert">{{$t(alertMsg)}}</div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="modal__body modal__body_wrap">
            <div class="modal__body-title">{{$t('userDeploymentHistoryDescription')}}</div>
            <div class="overflow-x">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th style="min-width: 100px;">{{$t('architecture')}}</th>
                    <th>{{$t('beneficiaryAddr')}}</th>
                    <th style="min-width: 1000px;">{{$t('script')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <Fragment v-for="(deploy, index) in deployments" :key="deploy.uuid">
                    <tr>
                      <td class="fast-deploy__toggle" @click="toggleActiveDeploy(deploy.uuid)">
                        {{index + 1}}
                        <span
                          :class="['fe fast-deploy__toggle-icon', activeDeploy === deploy.uuid ? 'fe-chevron-up' : 'fe-chevron-down']"
                        ></span>
                      </td>
                      <td>{{deploy.architecture}}</td>
                      <td>{{deploy.benificiaryAddr}}</td>
                      <td>
                        <i
                          v-clipboard:copy="`wget -O install.sh 'https://api2.nknx.org/deployment/install/${deploy.uuid}'; sudo bash install.sh`"
                          class="fas fa-copy fast-deploy__copy"
                        ></i>
                        <i
                          class="fast-deploy__script"
                        >wget -O install.sh "https://api2.nknx.org/deployment/install/{{deploy.uuid}}"; sudo bash install.sh</i>
                      </td>
                    </tr>
                    <tr
                      v-for="(node, i) in deploy.deployments"
                      :key="node.id"
                      :class="['fast-deploy__node', activeDeploy === deploy.uuid ? 'fast-deploy__node_visible' : null]"
                    >
                      <td colspan="4">
                        <div
                          :class="['fast-deploy__node-info', node.status === 'FINISHED' ? 'fast-deploy__node-info_success' :node.status === 'ADDED' ? 'fast-deploy__node-info_success' : null]"
                        >
                          <div>{{i + 1}}) {{node.ip}}</div>
                          <div>{{$t('status')}}: {{node.status}}</div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                </tbody>
              </table>
            </div>
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
            v-if="currentView === 'snippets'"
            class="modal__footer-button"
            type="button"
            :theme="isValidated === true ? 'primary' : 'white'"
            :disabled="isValidated === true ? false : true"
            @click.native="isValidated === true ? createSnippet() : false"
          >{{$t('create')}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './FastDeployModal.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import { Fragment } from 'vue-fragment'
import { mixin as clickaway } from 'vue-clickaway'
import Button from '~/components/Button/Button.vue'
import Radio from '~/components/Controls/Radio/Radio.vue'

export default {
  components: { Button, Fragment, Radio },
  mixins: [clickaway],
  data: () => {
    return {
      address: '',
      label: '',
      isError: false,
      isSuccess: false,
      alertMsg: '',
      isLoading: false,
      currentView: 'snippets',
      duplicateNodes: [],
      failedNodes: [],
      successNodes: [],
      deployments: [],
      activeDeploy: false,
      activeArchitecture: 'linux-amd64'
    }
  },
  computed: {
    ...mapGetters({
      fastDeployModalVisible: 'modals/getFastDeployModalVisible',
      userNodes: 'userNodes/getUserNodes'
    }),
    isInvalid() {
      if (
        this.fields.nknaddress !== undefined &&
        this.fields.nknaddress.changed === true
      ) {
        return this.fields.nknaddress.invalid
      } else {
        return false
      }
    },
    isValidated() {
      if (this.fields.nknaddress !== undefined) {
        return this.fields.nknaddress.valid
      } else {
        return false
      }
    }
  },
  destroyed() {
    this.clearData()
  },
  created: function() {},
  mounted: function() {
    this.getDeployments()
  },
  methods: {
    toggleActiveDeploy(deploy) {
      this.activeDeploy = this.activeDeploy === deploy ? false : deploy
    },
    changeArchitecture: function(newValue) {
      this.activeArchitecture = newValue
    },
    getDeployments() {
      const self = this
      this.$axios.$get('deployment-entry', {}).then(response => {
        self.deployments = response.data
      })
    },
    clearData() {
      this.isError = false
      this.isSuccess = false
      this.alertMsg = ''
      this.failedNodes = []
      this.duplicateNodes = []
      this.successNodes = []
    },
    closeModal() {
      this.$store.dispatch('modals/updateFastDeployModalVisible', false)
    },
    switchView(val) {
      this.currentView = val
      this.ip = ''
      this.label = ''
      this.clearData()
    },
    createSnippet() {
      const self = this
      const activeArchitecture = this.activeArchitecture
      const address = this.address
      this.isLoading = true

      this.$axios
        .$post('deployment-entry', {
          architecture: activeArchitecture,
          benificiaryAddr: address
        })
        .then(response => {
          self.isSuccess = true
          self.isError = false
          self.alertMsg = 'successSnippetAlert'
          self.isLoading = false
        })
        .catch(error => {
          self.isError = true
          self.alertMsg = 'failedSnippetAlert'
          self.isLoading = false
        })
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
            setTimeout(self.closeModal, 1000)
          }
          self.$store.dispatch('userNodes/updateUserNodes')
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
