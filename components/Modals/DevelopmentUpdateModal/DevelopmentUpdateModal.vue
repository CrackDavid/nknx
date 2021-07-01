<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">Development Update</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">
          NKNx v3 beta is here!
        </div>
        <div class="modal__body modal__body_wrap">
          <div>
            <p class="text_weight_bold" style="margin-bottom: 24px;">
              Hello there,
            </p>
            <p style="margin-bottom: 16px;">
              We worked hard on creating a new and updated version of NKNx the
              last months and now it has finally opened for open beta! V3 comes
              with a completely revamped messaging system as well as important
              changes in the Node Manager, FastDeploy and many more!
            </p>

            <p style="margin-bottom: 24px;">
              Since NKNx v3 is a complete rewrite we also decided to start from
              a blank user base. That means you have to recreate your account
              and readd your nodes by hand. Users who had more than 15 nodes and
              need an export from old NKNx please reach out through our support
              system - we will be happy to help.
            </p>

            <p style="margin-bottom: 24px;">
              The beta version of NKNx v3 is available under
              <a class="text_link" href="https://beta.nknx.org/" target="_blank"
                >https://beta.nknx.org/</a
              >
              and will replace NKNx v2 (this website) in 1-2 weeks. So make sure
              you move your nodes to the new system.
            </p>

            <p style="margin-bottom: 24px;">
              <b class="text_weight_bold">Important:</b> If you consider
              supporting us and get a paid subscription use code
              <span class="text_weight_bold" style="font-style: italic;"
                >standard50</span
              >
              for NKNx Standard or
              <span class="text_weight_bold" style="font-style: italic;"
                >pro50</span
              >
              for NKNx Pro to get 50% off your first month!
            </p>

            <p class="fast-deploy__reminder text_weight_bold">
              Your NKNx Team
            </p>
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
      developmentUpdateModalVisible: 'modals/getDevelopmentUpdateModalVisible'
    })
  },
  destroyed() {},
  created: function() {},
  mounted: function() {},
  methods: {
    closeModal() {
      this.$store.dispatch('modals/updateDevelopmentUpdateModalVisible', false)
    }
  }
}
</script>
