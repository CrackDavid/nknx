<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form fast-deploy__form">
        <div>
          <div class="modal__header">
            <div class="modal__heading">{{ $t('deployNknNodesTo') }}</div>
            <span class="modal__close fe fe-x" @click="closeModal"></span>
          </div>
          <div class="modal__title">{{ $t('customVps') }}</div>

          <div class="modal__body modal__body_wrap">
            <div class="modal-input modal-input_full">
              <label class="modal-input__label">{{ $t('label') }}</label>
              <div class="modal-input__wrapper">
                <input v-model="label" class="modal-input__control" type="text" />
              </div>
            </div>

            <div class="modal-input modal-input_full">
              <label class="modal-input__label">
                {{
                $t('systemArchitecture')
                }}
              </label>
              <div class="modal-input__wrapper">
                <div class="modal-radio__group">
                  <Radio
                    class="modal-radio__item"
                    name="options"
                    label="linux-amd64"
                    :value="activeArchitecture"
                    @change="changeArchitecture"
                  >{{ $t('AMD64') }}</Radio>
                  <Radio
                    class="modal-radio__item"
                    name="options"
                    label="linux-armv6"
                    :value="activeArchitecture"
                    @change="changeArchitecture"
                  >{{ $t('ARMV6') }}</Radio>
                  <Radio
                    class="modal-radio__item"
                    name="options"
                    label="linux-armv7"
                    :value="activeArchitecture"
                    @change="changeArchitecture"
                  >{{ $t('ARMV7') }}</Radio>
                  <Radio
                    class="modal-radio__item"
                    name="options"
                    label="linux-arm64"
                    :value="activeArchitecture"
                    @change="changeArchitecture"
                  >{{ $t('ARMV8') }}</Radio>
                </div>
              </div>
            </div>
          </div>
          <div>{{ $t('fastDeployInstruction') }}</div>
          <br />

          <div
            v-clipboard:copy="
              `wget -O install.sh 'https://api.nknx.org/fast-deploy/install/${fastDeployConfig.uuid}/${activeArchitecture}/${label}'; bash install.sh`
            "
            class="modal__notice"
            @click="copyAlert"
          >
            <span class="modal__notice-copy">
              wget -O install.sh
              'https://api.nknx.org/fast-deploy/install/{{
              fastDeployConfig.uuid
              }}/{{ activeArchitecture }}/{{ label }}'; bash install.sh
              <Copy />
            </span>
          </div>

          <div class="fast-deploy__reminder">
            <b class="text_weight_bold">{{ $t('reminder') }}:</b>
            {{ $t('fastDeployReminder') }}
          </div>

          <div class="modal__footer">
            <Button
              class="modal__footer-button"
              type="button"
              theme="white"
              @click.native="closeModal"
            >{{ $t('close') }}</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './FastDeployCustomModal.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
import Button from '~/components/Button/Button.vue'
import Radio from '~/components/Controls/Radio/Radio.vue'
import Copy from '~/assets/icons/copy.svg'

export default {
  components: { Button, Radio, Copy },
  mixins: [clickaway],
  data: () => {
    return {
      label: 'My-Node-1',
      activeArchitecture: 'linux-amd64'
    }
  },
  computed: {
    ...mapGetters({
      fastDeployCustomModalVisible: 'modals/getFastDeployCustomModalVisible',
      fastDeployConfig: 'fastDeployConfigs/getActiveFastDeployConfig'
    })
  },
  watch: {
    label() {
      this.label = this.label.replace(/[^a-zA-Z0-9]/g, '-').trim()
    }
  },
  destroyed() {},
  created() {},
  mounted() {},
  methods: {
    closeModal() {
      this.$store.dispatch('modals/updateFastDeployCustomModalVisible', false)
    },
    changeArchitecture(newValue) {
      this.activeArchitecture = newValue
    },
    copyAlert() {
      this.$store.dispatch('snackbar/updateSnack', {
        snack: 'fdCopyAlert',
        color: 'alert',
        timeout: true
      })
    }
  }
}
</script>
