<template>
  <div class="quick-transfers">
    <div class="quick-transfers__fromto">
      <div class="quick-transfers__from">
        <div class="control__header">
          <div class="control__label">{{$t('from')}}</div>
        </div>
        <v-select v-model="selected1" :options="options" class="select select_theme_dark"></v-select>
      </div>
      <div class="quick-transfers__to">
        <div class="control__header">
          <div class="control__label">{{$t('to')}}</div>
        </div>
        <v-select v-model="selected2" :options="options" class="select select_theme_dark"></v-select>
      </div>
    </div>
    <div class="quick-transfers__value">
      <div class="control__header">
        <div class="control__label">{{$t('amount')}}</div>
        <div class="control__tooltip">{{$t('avaliable')}} 84,650</div>
      </div>
      <div class="input input_theme_dark">
        <input type="number" class="input__control">
        <div class="input__label">NKN</div>
      </div>
    </div>
    <button
      class="quick-transfers__btn btn btn_type_default btn_theme_primary-gradient btn_size_small"
    >{{$t('transfer')}}</button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    wallets: {
      type: Object
    }
  },
  data: () => {
    return {
      options: [{ id: 1, label: "Wallet 1" }, { id: 3, label: "Wallet 2" }],
      selected1: { id: 3, label: "Wallet 1" },
      selected2: { id: 3, label: "Wallet 2" }
    };
  },
  destroyed() {},
  mounted: function() {},
  methods: {}
};
</script>
