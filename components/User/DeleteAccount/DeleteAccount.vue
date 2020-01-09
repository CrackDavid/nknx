<template>
  <Card colStart="10" colEnd="13">
    <div class="card-header card-header_border">
      <h3 class="card-header__title text_uppercase">
        {{ $t('dangerArea') }}
      </h3>
    </div>
    <div class="delete-account">
      <p class="delete-account__descr">{{ $t('deleteAccountDescr') }}</p>
      <Button
        class="delete-account__button"
        type="button"
        theme="danger"
        @click.native="deleteAccount"
        >{{ $t('deleteMyAccount') }}</Button
      >
    </div>
  </Card>
</template>

<style lang="scss">
@import './DeleteAccount.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'

export default {
  components: {
    Card,
    Button
  },
  data: () => {
    return {
      loading: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    deleteAccount() {}
  }
}
</script>
