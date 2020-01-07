<template>
  <Card col="5">
    <div class="card-header card-header_border">
      <h3 class="card-header__title">
        {{ $t('yourProfileData') }}
      </h3>
    </div>
    <div class="modal__body modal__body_wrap">
      <div class="modal-input modal-input_flex modal-input_full">
        <label class="modal-input__label modal-input__label_flex">{{
          $t('userName')
        }}</label>
        <div class="modal-input__wrapper_flex">
          <input
            v-model="name"
            class="modal-input__control"
            type="text"
          />
        </div>
      </div>
      <div class="modal-input modal-input_flex modal-input_full">
        <label class="modal-input__label modal-input__label_flex">{{
          $t('userEmail')
        }}</label>
        <div class="modal-input__wrapper_flex">
          <input
            v-model="email"
            readonly
            class="modal-input__control modal-input__control_readonly"
            type="text"
          />
        </div>
      </div>
    </div>
    <div class="modal__footer modal__footer_no-margin">
      <Button
        class="modal__footer-button"
        type="button"
        theme="primary"
        @click.native="saveData"
        >{{ $t('save') }}</Button
      >
    </div>
  </Card>
</template>

<style lang="scss">
@import './ProfileData.scss';
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
      name: '',
      email: ''
    }
  },
  mounted() {
    this.getProfileData()
  },
  methods: {
    getProfileData() {
      this.$axios.get('user').then(response => {
        const {name, email} = response.data
        this.name = name
        this.email = email
      })
    },
    saveData(){
      const newName = this.name
      this.$axios.put('user', {name: newName}).then(response => {
        console.log(response)
      })
    }
  }
}
</script>
