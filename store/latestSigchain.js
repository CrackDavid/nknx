export const state = () => ({
  latestSigchain: false
})

export const mutations = {
  setLatestSigchain(state, sigchainObj) {
    state.latestSigchain = sigchainObj
  }
}

export const getters = {
  getLatestSigchain(state) {
    return state.latestSigchain
  }
}

export const actions = {
  async updateLatestSigchain({ dispatch }) {
    const data = await this.$axios.$get(
      'https://openapi.nkn.org/api/v1/transactions'
    )
    const latestTxs = data.transactions.data.slice(0, 5)
    const latestSigchain = latestTxs.find(
      tx => tx.txType === 'SIG_CHAIN_TXN_TYPE'
    )
    dispatch('parseLatestSigchain', latestSigchain)

    const channel = this._vm.$pusher.subscribe('tx-updates')
    channel.bind('sig-chain-tx', ({ transaction }) => {
      dispatch('parseLatestSigchain', transaction)
    })
  },
  async parseLatestSigchain({ commit }, tx) {
    const pks = tx.payload.sigchain.sigchain_elems.map(i => i.pubkey).join(',')

    const geoData = await this.$axios.$post('nodes/geolocate', { pks })

    commit('setLatestSigchain', geoData)
  }
}
