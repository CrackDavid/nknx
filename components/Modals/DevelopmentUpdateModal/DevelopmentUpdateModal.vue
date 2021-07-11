<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">Important notice</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">
          Hurry up and migrate your account to NKNx beta!
        </div>
        <div class="modal__body modal__body_wrap">
          <div>
            <p class="text_weight_bold" style="margin-bottom: 24px">
              Hello there,
            </p>
            <p style="margin-bottom: 16px">
              As we already announced through social media, discord and telegram
              NKNx will progress to a new authentication system with v3 coming
              on <b>14th of July</b>!
            </p>

            <p style="margin-bottom: 24px">
              This also means that you
              <b
                >need to create a new account on
                <a
                  class="text_link"
                  href="https://beta.nknx.org/"
                  target="_blank"
                  >https://beta.nknx.org/</a
                >
                and readd your nodes by hand to not lose your account data!</b
              >. There is no automated process for this. If you got more than 15
              nodes in your account and need a list of all your IPs please
              contact our support.
            </p>

            <p style="margin-bottom: 24px">
              The beta version of NKNx v3 is available under
              <a class="text_link" href="https://beta.nknx.org/" target="_blank"
                >https://beta.nknx.org/</a
              >
              and will replace NKNx v2 (this website) <b>on 14th of July</b>. So
              make sure you move your nodes to the new system.
            </p>

            <p class="fast-deploy__reminder text_weight_bold">Your NKNx Team</p>
          </div>
        </div>
        <div class="modal__footer">
          <Button
            class="modal__footer-button"
            type="button"
            theme="primary"
            @click.native="closeModal"
            >{{ $t('I Understand') }}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
import Button from '~/components/Button/Button.vue'

export default {
  components: { Button },
  mixins: [clickaway],
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters({
      developmentUpdateModalVisible: 'modals/getDevelopmentUpdateModalVisible',
    }),
  },
  destroyed() {},
  created: function () {},
  mounted: function () {},
  methods: {
    closeModal() {
      this.$store.dispatch('modals/updateDevelopmentUpdateModalVisible', false)
    },
  },
}
</script>
