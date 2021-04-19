<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">Development Update</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">
          Warning: NKNx temporarily with limited features
        </div>
        <div class="modal__body modal__body_wrap">
          <div>
            <p class="text_weight_bold" style="margin-bottom: 24px;">
              Dear valued member,
            </p>
            <p style="margin-bottom: 16px;">
              Our servers are under heavy load since more and more members are
              joining NKNx, Because of that we decided to temporarily disable
              all node updating features. That means for you that the following
              features are
              <b class="text_weight_bold">currently not working</b>:
            </p>

            <ul style="margin-bottom: 16px;">
              <li>
                - Wallet history data (wallet balances will still be updated)
              </li>
              <li>- Updating of your nodes in the dashboard</li>
              <li>
                - ALL mining statistics (mined today, total mined last 3 months,
                etc.)
              </li>
            </ul>

            <p style="margin-bottom: 24px;">
              FastDeploy is still working without any issues. We are already
              working on a new and remastered version of NKNx that will give you
              all features back and many more. So stay tuned and follow us on
              <a
                class="text_link"
                href="https://twitter.com/nknx_org"
                target="_blank"
                >Twitter</a
              >
              or join our
              <a
                class="text_link"
                href="https://discord.gg/MP5eDs55"
                target="_blank"
                >Discord</a
              >
              for the latest news!
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
