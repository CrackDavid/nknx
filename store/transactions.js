export const state = () => ({
  dailyTransactions: false,
  latestSigchainTransaction: false
});

export const mutations = {
  setDailyTransactions(state, dailyTransactionsObj) {
    state.dailyTransactions = dailyTransactionsObj;
  },
  setLatestSigchainTransaction(state, latestSigchainTxObject) {
    state.latestSigchainTransaction = latestSigchainTxObject;
  }
};

export const getters = {
  getDailyTransactions(state) {
    return state.dailyTransactions;
  },
  getLatestSigchainTransaction(state) {
    return state.latestSigchainTransaction;
  }
};

export const actions = {
  async getDailyTransactions({ commit }) {
    const data = await this.$axios.$get(
      "https://api2.nknx.org/statistics/daily/transactions"
    );
    commit("setDailyTransactions", data);
  },
  async getLatestSigchainTransaction({ commit }) {
    const data = await this.$axios.$get(
      "https://api2.nknx.org/transactions?latest=1&txType=66"
    );
    commit("setLatestSigchainTransaction", data);
  }
};
