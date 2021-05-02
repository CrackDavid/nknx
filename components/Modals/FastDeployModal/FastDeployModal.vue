<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form fast-deploy__form">
        <div :class="preloader === true ? 'modal-form_blured' : null">
          <div class="modal__header">
            <div class="modal__heading">{{ $t('deployNknNodesTo') }}</div>
            <span class="modal__close fe fe-x" @click="closeModal"></span>
          </div>
          <div class="modal__title">{{ $t(fastDeployProvider) }}</div>

          <div class="modal__body modal__body_wrap">
            <div v-if="keys.length > 1" class="modal-input_full">
              <label class="modal-input__label ">{{ $t('profile') }}</label>
              <div class="modal-input__wrapper">
                <Select
                  :items="keys"
                  :active-item="activeKey.profile_name"
                  :item-text="'profile_name'"
                  @update="updateKey"
                />
              </div>
            </div>

            <div class="modal-input_full">
              <label class="modal-input__label ">{{ $t('serverSize') }}</label>
              <div class="modal-input__wrapper">
                <Select
                  :items="sizes"
                  :active-item="activeSize.shortcut"
                  :item-text="'shortcut'"
                  @update="updateSize"
                />
              </div>
            </div>

            <div class="modal-input_full">
              <label class="modal-input__label ">{{ $t('region') }}</label>
              <div class="modal-input__wrapper">
                <Select
                  :items="regionNames"
                  :active-item="activeRegion"
                  :upperCase="true"
                  @update="updateRegion"
                />
              </div>
            </div>

            <div class="fast-deploy__count">
              <div class="modal-input fast-deploy__number">
                <label class="modal-input__label">{{
                  $t('numberOfNodes')
                }}</label>
                <div class="modal-input__wrapper modal-input__wrapper_number">
                  <input
                    v-model="count"
                    type="number"
                    class="modal-input__control modal-input__control_number"
                    @keydown="numFilter"
                  />
                  <div class="modal-input__actions">
                    <span
                      class="modal-input__actions-icon fe fe-chevron-up"
                      @click="incCount"
                    />
                    <span
                      class="modal-input__actions-icon fe fe-chevron-down"
                      @click="decCount"
                    />
                  </div>
                </div>
              </div>

              <div class="modal-input_full fast-deploy__scroll">
                <label class="modal-input__label">{{ $t('name') }}</label>
                <div class="modal-input__wrapper">
                  <input
                    v-for="(label, i) in labels"
                    :key="i"
                    v-model="labels[i]"
                    :placeholder="`My-FastDeploy-Node${incrementStart + i}`"
                    class="modal-input__control fast-deploy__name"
                    type="text"
                  />
                </div>
              </div>
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
              :theme="isValid === true ? 'primary' : 'white'"
              :disabled="isValid === true ? false : true"
              @click.native="isValid === true ? deploy() : false"
              >{{ $t('confirm') }}</Button
            >
          </div>
        </div>
      </div>
      <div v-if="preloader" class="modal__loading-overlay">
        <span
          :class="[
            'modal__footer-loader modal__footer-loader_static fe fe-loader',
            preloader === true ? 'modal__footer-loader_visible' : null
          ]"
        ></span>
        <div class="modal__loading-overlay-text">
          {{ $t('fastDeployLoading') }}
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
import { mixin as clickaway } from 'vue-clickaway'
import Button from '~/components/Button/Button.vue'
import Select from '~/components/Controls/Select/Select.vue'

export default {
  components: { Button, Select },
  mixins: [clickaway],
  data: () => {
    return {
      sizes: [],
      keys: [],
      activeSize: '',
      activeRegion: '',
      activeKey: '',
      labels: [],
      count: 1,
      isLoading: false,
      preloader: false,
      incrementStart: 0,
      masterText: 'My-FastDeploy-Node'
    }
  },
  computed: {
    ...mapGetters({
      fastDeployModalVisible: 'modals/getFastDeployModalVisible',
      fastDeployProvider: 'fastDeployProvider/getFastDeployProvider',
      fastDeployConfig: 'fastDeployConfigs/getActiveFastDeployConfig',
      nodeCounter: 'fastDeployConfigs/getNodeCounter',
      userNodes: 'userNodes/getUserNodes'
    }),

    isValid() {
      if (
        this.activeSize !== '' &&
        this.isLoading === false &&
        this.activeRegion !== '' &&
        this.activeKey !== '' &&
        this.labels.length > 0
      ) {
        return true
      } else {
        return false
      }
    },
    regionNames() {
      return this.activeSize
        ? this.activeSize.regions.map(region => region.name)
        : []
    },
    labelsCopy() {
      return this.labels.slice()
    }
  },
  watch: {
    labelsCopy: function(newVal, oldVal) {
      if (this.labelsCopy.length > 0) {
        if (newVal[0] !== oldVal[0]) {
          const string = newVal[0]
          const num = string ? string.match(/\d+$/) : false
          const numLength = num ? num[0].length : 0
          const masterNum = num ? parseInt(num[0], 10) : 0
          const masterText = string.slice(0, string.length - numLength)

          this.masterText = masterText
          this.incrementStart = masterNum - 1

          this.labels.forEach((label, i) => {
            if (i !== 0) {
              this.$set(this.labels, i, `${masterText}${masterNum + i}`)
            }
          })
        }
      }
    },
    count(newVal, oldVal) {
      if (newVal < 1) {
        this.count = 1
      }
      if (newVal > 20) {
        this.count = 20
      }

      const isInc = newVal - oldVal > 0
      const labelsLength = this.labels.length
      const incrementStart = this.incrementStart

      if (isInc) {
        for (let i = labelsLength + 1; i <= newVal; i++) {
          this.labels.push(`${this.masterText}${incrementStart + i}`)
        }
      } else {
        this.labels = this.labels.slice(0, newVal)
      }
    },
    activeSize() {
      const activeSize = this.activeSize
      const activeRegion = this.activeRegion
      const ifRegion = this.activeSize.regions.filter(
        region => region.name === activeRegion
      )

      this.activeRegion = ifRegion.length
        ? ifRegion[0].name
        : activeSize.regions[0].name
    }
  },
  destroyed() {
    this.clearData()
  },
  created() {},
  mounted() {
    this.preloadData()
  },
  methods: {
    incCount() {
      this.count += 1
    },
    decCount() {
      this.count -= 1
    },
    numFilter(e) {
      if ([69, 187, 189, 38, 40].includes(e.keyCode)) {
        e.preventDefault()
      }
    },
    async preloadData() {
      this.preloader = true
      await this.getSizes()
      await this.getKeys()

      this.incrementStart = this.nodeCounter
      this.labels = [`My-FastDeploy-Node-${this.incrementStart + 1}`]

      this.preloader = false
    },
    async getSizes() {
      const provider = this.fastDeployProvider.toLowerCase()

      this.sizes = await this.$axios.$get(
        `fast-deploy/helpers/${provider}/sizes`
      )

      this.sizes.forEach(item => {
        const slug =
          provider === 'aws' || provider === 'hetzner' ? `${item.slug} - ` : ''
        item.shortcut = `${slug}${item.memory / 1024}GB RAM - ${
          item.vcpus
        } CPU Core - ${item.disk}GB SSD`
      })
      this.activeSize = this.sizes[0]
      this.activeRegion = this.activeSize.regions[0].name
    },
    async getKeys() {
      const { data } = await this.$axios.$get(
        `vps-keys/?filter=${this.fastDeployProvider}`
      )
      this.keys = data
      this.activeKey = this.keys[0]
    },
    validateLabels(str) {
      const regExp = /^[a-zA-Z0-9.-]*$/
      return regExp.test(str)
    },
    deploy() {
      const labels = this.labels.join('-')
      const isValidLabels = this.validateLabels(labels)

      const provider = this.fastDeployProvider
      const activeSize = this.activeSize
      const activeRegion = activeSize.regions.filter(
        region => region.name === this.activeRegion
      )[0]

      const payload = {
        provider: this.fastDeployProvider,
        names: this.labels.join(),
        vps_key_id: this.activeKey.id
      }

      switch (provider) {
        case 'DigitalOcean':
          payload.size = activeSize.slug
          payload.region = activeRegion.slug
          break
        case 'Vultr':
          payload.size = activeSize.vpsId
          payload.region = activeRegion.DCID
          break
        case 'Hetzner':
          payload.size = activeSize.vpsId
          payload.region = activeRegion.slug
          break
        case 'AWS':
          payload.size = activeSize.slug
          payload.region = activeRegion.slug
          break
        default:
          return false
      }

      if (isValidLabels) {
        this.isLoading = true
        this.$axios
          .$post(
            `fast-deploy/configurations/${this.fastDeployConfig.id}/deployment`,
            payload
          )
          .then(response => {
            const nodesCount = response.data.length
            const labelsCount = this.labels.length

            this.isLoading = false
            this.$store.dispatch('userNodes/updateUserNodes')
            this.$store.dispatch(
              'fastDeployConfigs/updateNodeCounter',
              this.nodeCounter + this.count
            )
            this.$store.dispatch('snackbar/updateSnack', {
              snack: `${nodesCount} of ${labelsCount} nodes deployed successfully`,
              color: 'success',
              timeout: true
            })
            this.closeModal()
          })
          .catch(error => {
            this.isLoading = false
            this.$store.dispatch('snackbar/updateSnack', {
              snack: error.response.data.msg,
              color: 'error',
              timeout: true
            })
          })
      } else {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'invalidVpsName',
          color: 'error',
          timeout: true
        })
      }
    },
    updateSize(size) {
      this.activeSize = size
    },
    updateRegion(region) {
      this.activeRegion = region
    },
    updateKey(key) {
      this.activeKey = key
    },
    clearData() {},
    closeModal() {
      this.$store.dispatch('modals/updateFastDeployModalVisible', false)
    }
  }
}
</script>
