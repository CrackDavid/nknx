<template>
  <div>
    <div class="row">
      <div class="col col_xs_12">
        <h1>Buttons</h1>
        <div class="guideline">
          <div class="guideline-item">
            <h2>Theme</h2>
            <button class="btn btn_type_default btn_theme_primary btn_size_default">Primary</button>
            <button class="btn btn_type_default btn_theme_secondary btn_size_default">Secondary</button>
            <button class="btn btn_type_default btn_theme_default btn_size_default">Default</button>
            <button class="btn btn_type_default btn_theme_success btn_size_default">Success</button>
            <button class="btn btn_type_default btn_theme_error btn_size_default">Error</button>
          </div>
          <div class="guideline-item">
            <h2>Size</h2>
            <button class="btn btn_type_default btn_theme_primary btn_size_default">Default</button>
            <button class="btn btn_type_default btn_theme_primary btn_size_small">Small</button>
            <button class="btn btn_type_default btn_theme_primary btn_size_widget">Widget</button>
          </div>
          <div class="guideline-item">
            <h2>Type</h2>
            <button class="btn btn_type_default btn_theme_primary btn_size_default">Default</button>
            <button class="btn btn_type_outline btn_theme_primary btn_size_default">Outline</button>
          </div>
          <div class="guideline-item">
            <h2>State</h2>
            <button
              class="btn btn_type_default btn_theme_primary btn_size_default"
              disabled
            >Disabled</button>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col col_xs_12">
        <h1>User node</h1>
        <div class="row">
          <div class="col col_xs_6">
            <h2>Node Performance</h2>
            <Performance/>
          </div>
          <div class="col col_xs_6">
            <h2>Node Relayed Messages</h2>
            <Relayed/>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col col_xs_12">
        <h1>User wallet</h1>
        <div class="row">
          <div class="col col_xs_9">
            <h2>Wallet Panel</h2>
            <WalletPanel
              address="NhWjY9iwD5Ad8DafiEWbTo4buLpBomdttH"
              label="My Primary Wallet"
              balance="84,650"
            />
          </div>
        </div>
        <div class="row">
          <div class="col col_xs_9">
            <h2>Wallet Transactions</h2>
            <WalletTransactions address="NhWjY9iwD5Ad8DafiEWbTo4buLpBomdttH"/>
          </div>
        </div>
        <div class="row">
          <div class="col col_xs_9">
            <h2>Wallet Balance History</h2>
            <WalletBalanceHistory address="NhWjY9iwD5Ad8DafiEWbTo4buLpBomdttH"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Performance from "~/components/Widgets/Node/Performance/Performance.vue";
import Relayed from "~/components/Widgets/Node/RelayedMessages/RelayedMessages.vue";
import WalletPanel from "~/components/Wallet/WalletPanel/WalletPanel.vue";
import WalletTransactions from "~/components/Wallet/WalletTransactions/WalletTransactions.vue";
import WalletBalanceHistory from "~/components/Wallet/WalletBalanceHistory/WalletBalanceHistory.vue";

export default {
  auth: false,
  components: {
    Performance,
    Relayed,
    WalletPanel,
    WalletTransactions,
    WalletBalanceHistory
  }
};
</script>
<style lang="scss" scoped>
.row {
  margin-bottom: 30px;
}
h1 {
  font-size: 32px;
}
h2 {
  font-size: 18px;
}
.guideline {
  display: flex;
  background: #fff;
}
.guideline-item {
  display: flex;
  flex-flow: column wrap;
}
.guideline-item > * {
  margin: 10px;
}
</style>
