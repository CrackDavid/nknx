<template>
  <Card>
    <div class="data-switcher">
      <div
        class="data-switcher__btn"
        :class="{'data-switcher__btn_active': currentData =='transactions' }"
        @click="toggleData('transactions')"
        @mousemove="markerMove"
        @mouseleave="markerInitialize"
      >{{$t('transactions')}}</div>
      <div
        class="data-switcher__btn"
        :class="{'data-switcher__btn_active': currentData =='transfers' }"
        @click="toggleData('transfers')"
        @mousemove="markerMove"
        @mouseleave="markerInitialize"
      >{{$t('transfers')}}</div>
      <div class="data-switcher__marker"></div>
    </div>
    <div v-if="transactionLoader">
      <TableRowLoader v-for="row in defaultRows" :key="row"></TableRowLoader>
    </div>
    <!-- Transactions -->
    <table v-if="!transactionLoader && currentData === 'transactions'" class="data-table">
      <thead class="data-table__header">
        <tr class="data-table__row">
          <th class="data-table__title">{{$t('block')}}</th>
          <th class="data-table__title">{{$t('hash')}}</th>
          <th class="data-table__title">{{$t('txType')}}</th>
          <th class="data-table__title">{{$t('amount')}}</th>
          <th class="data-table__title">{{$t('created')}}</th>
        </tr>
      </thead>
      <tbody class="data-table__body">
        <tr v-for="tx in latestTransactions" :key="tx.id" class="data-table__row">
          <td class="data-table__item data-table__item_link">{{tx.block_id}}</td>
          <td class="data-table__item data-table__item_link">{{tx.hash}}</td>
          <td class="data-table__item">
            <span v-if="tx.txType == 66">{{$t('signatureChainTransaction')}}</span>
            <span v-else-if="tx.txType == 0">{{$t('miningReward')}}</span>
            <span v-else-if="tx.txType == 16">{{$t('transfer')}}</span>
            <span v-else>{{ tx.txType }}</span>
          </td>
          <td class="data-table__item">
            {{tx.outputs[0].value}}
            <span>NKN</span>
          </td>
          <td class="data-table__item">{{ $moment(tx.timestamp).fromNow() }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Transfers -->
    <table v-if="!transactionLoader && currentData === 'transfers'" class="data-table">
      <thead class="data-table__header">
        <tr class="data-table__row">
          <th class="data-table__title">{{$t('block')}}</th>
          <th class="data-table__title">{{$t('hash')}}</th>
          <th class="data-table__title">{{$t('from')}}</th>
          <th class="data-table__title">{{$t('to')}}</th>
          <th class="data-table__title">{{$t('amount')}}</th>
          <th class="data-table__title">{{$t('created')}}</th>
        </tr>
      </thead>
      <tbody class="data-table__body">
        <tr v-for="tx in latestTransfers" :key="tx.id" class="data-table__row">
          <td class="data-table__item data-table__item_link">{{tx.block_id}}</td>
          <td class="data-table__item data-table__item_link data-table__item_overflow">{{tx.hash}}</td>
          <td v-if="address == tx.sender" class="data-table__item">{{$t('yourWallet')}}</td>
          <td v-else class="data-table__item data-table__item_link">{{tx.sender}}</td>

          <td v-if="address == tx.outputs[0].address" class="data-table__item">{{$t('yourWallet')}}</td>
          <td v-else class="data-table__item data-table__item_link">{{tx.outputs[0].address}}</td>
          <td
            class="data-table__item"
            :class="[{ 'data-table__item_positive': address == tx.outputs[0].address }, { 'data-table__item_negative': address == tx.sender }]"
          >
            <span v-if="address == tx.sender">-</span>
            <span v-if="address == tx.outputs[0].address">+</span>
            {{tx.outputs[0].value}}
            <span>NKN</span>
          </td>
          <td class="data-table__item">{{ $moment(tx.timestamp).fromNow() }}</td>
        </tr>
      </tbody>
    </table>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import TableRowLoader from "~/components/Loaders/TableRowLoader/TableRowLoader.vue";
export default {
  components: {
    Card,
    TableRowLoader
  },
  props: {
    address: {
      type: String,
      default: ""
    }
  },
  data: () => {
    return {
      defaultRows: 10,
      currentData: "transactions",
      next_pageTransactions: null,
      prev_pageTransactions: null,
      current_pageTransactions: 1,
      next_pageTransfers: null,
      prev_pageTransfers: null,
      current_pageTransfers: 1,
      latestTransfers: [],
      latestTransactions: [],
      transferLoader: true,
      transactionLoader: true
    };
  },

  destroyed() {},
  mounted: function() {
    this.getTransactions();
    this.getTransfers();
    this.markerInitialize();
  },
  methods: {
    toggleData(name) {
      this.currentData = name;
    },
    getTransactions() {
      const self = this;
      self.transactionLoader = true;

      this.$axios
        .$get(
          "https://api.nknx.org/transactions/?withoutpayload=true&txType=0,16,66&per_page=10&withoutattributes=true&withoutinputs=true&address=" +
            this.address
        )
        .then(function(response) {
          self.next_pageTransactions = response.next_page_url;
          self.prev_pageTransactions = response.prev_page_url;
          self.current_pageTransactions = response.current_page;
          self.latestTransactions = response.data;
          self.transactionLoader = false;
        });
    },
    getTransfers() {
      const self = this;
      self.transferLoader = true;

      this.$axios
        .$get(
          "https://api.nknx.org/transactions/?txType=16&per_page=10&withoutpayload=true&withoutattributes=true&withoutinputs=true&address=" +
            this.address
        )
        .then(function(response) {
          self.next_pageTransfers = response.next_page_url;
          self.prev_pageTransfers = response.prev_page_url;
          self.current_pageTransfers = response.current_page;
          self.latestTransfers = response.data;
          self.transferLoader = false;
        });
    },
    getNextBlockPageTransactions() {
      const self = this;
      self.transactionLoader = true;
      this.$axios
        .$get(
          this.next_pageTransactions +
            "&withoutpayload=true&txType=0,16,66&withoutattributes=true&withoutinputs=true&per_page=10&address=" +
            this.address
        )
        .then(function(response) {
          self.next_pageTransactions = response.next_page_url;
          self.prev_pageTransactions = response.prev_page_url;
          self.current_pageTransactions = response.current_page;
          self.latestTransactions = response.data;
          self.transactionLoader = false;
        });
    },
    getPrevBlockPageTransactions() {
      const self = this;
      self.transactionLoader = true;
      this.$axios
        .$get(
          this.prev_pageTransactions +
            "&withoutpayload=true&txType=0,16,66&withoutattributes=true&withoutinputs=true&per_page=10&address=" +
            this.address
        )
        .then(function(response) {
          self.next_pageTransactions = response.next_page_url;
          self.prev_pageTransactions = response.prev_page_url;
          self.current_pageTransactions = response.current_page;
          self.latestTransactions = response.data;
          self.transactionLoader = false;
        });
    },
    getNextBlockPageTransfers() {
      const self = this;
      self.transferLoader = true;
      this.$axios
        .$get(
          this.next_pageTransfers +
            "&txType=16&per_page=10&withoutpayload=true&withoutattributes=true&withoutinputs=true&address=" +
            this.address
        )
        .then(function(response) {
          self.next_pageTransfers = response.next_page_url;
          self.prev_pageTransfers = response.prev_page_url;
          self.current_pageTransfers = response.current_page;
          self.latestTransfers = response.data;
          self.transferLoader = false;
        });
    },
    getPrevBlockPageTransfers() {
      const self = this;
      self.transferLoader = true;
      this.$axios
        .$get(
          this.prev_pageTransfers +
            "&txType=16&per_page=10&withoutpayload=true&withoutattributes=true&withoutinputs=true&address=" +
            this.address
        )
        .then(function(response) {
          self.next_pageTransfers = response.next_page_url;
          self.prev_pageTransfers = response.prev_page_url;
          self.current_pageTransfers = response.current_page;
          self.latestTransfers = response.data;
          self.transferLoader = false;
        });
    },
    markerInitialize() {
      const marker = document.getElementsByClassName(
        "data-switcher__marker"
      )[0];
      const currentActiveElement = document.getElementsByClassName(
        "data-switcher__btn_active"
      )[0];
      const currentActiveElementOffset = currentActiveElement.offsetLeft;
      marker.style.left = currentActiveElementOffset + "px";
    },
    markerMove(e) {
      const marker = document.getElementsByClassName(
        "data-switcher__marker"
      )[0];
      const currentElement = e.target;
      const currentElementOffset = currentElement.offsetLeft;
      marker.style.left = currentElementOffset + "px";
    }
  }
};
</script>
