<template>
  <div>
    <div class="row">
      <div class="col col_xs_9">
        <div class="row">
          <div class="col col_xs_12">
            <WalletPanel
              address="NhWjY9iwD5Ad8DafiEWbTo4buLpBomdttH"
              label="My Primary Wallet"
              :balanceNKN="84650"
            />
          </div>
        </div>
        <div class="row">
          <div class="col col_xs_12">
            <WalletBalanceHistory address="NhWjY9iwD5Ad8DafiEWbTo4buLpBomdttH"/>
          </div>
        </div>
        <div class="row">
          <div class="col col_xs_12">
            <WalletTransactions address="NhWjY9iwD5Ad8DafiEWbTo4buLpBomdttH"/>
          </div>
        </div>
      </div>
      <div class="col col_xs_3">
        <WalletSide address="NhWjY9iwD5Ad8DafiEWbTo4buLpBomdttH"/>
      </div>
    </div>
  </div>
</template>

<script>
import WalletPanel from "~/components/Wallet/WalletPanel/WalletPanel/";
import WalletSide from "~/components/Wallet/WalletSide/WalletSide/";
import WalletBalanceHistory from "~/components/Wallet/WalletBalanceHistory/WalletBalanceHistory/";
import WalletTransactions from "~/components/Wallet/WalletTransactions/WalletTransactions/";

export default {
  auth: false,
  components: {
    WalletPanel,
    WalletSide,
    WalletBalanceHistory,
    WalletTransactions
  }
};
</script>
