export const state = () => ({
  activeWallet: false
})

export const mutations = {
  setActiveWallet(state, activeWalletObj) {
    state.activeWallet = activeWalletObj
  }
}

export const getters = {
  getActiveWallet(state) {
    return state.activeWallet
  }
}

export const actions = {
  updateActiveWallet({ commit }, wallet) {
    commit('setActiveWallet', wallet)
  }
}
