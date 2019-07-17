export const state = () => ({
  userWallets: false,
  userWalletsConfig: {
    page: 1,
    aggregate: 'day'
  }
})

export const mutations = {
  setUserWallets(state, userWalletsObj) {
    state.userWallets = userWalletsObj
  },
  setUserWalletsConfig(state, userWalletsConfigObj) {
    state.userWalletsConfig = userWalletsConfigObj
  }
}

export const getters = {
  getUserWallets(state) {
    return state.userWallets
  },
  getUserWalletsConfig(state) {
    return state.userWalletsConfig
  }
}

export const actions = {
  async updateUserWallets({ commit }) {
    const { page, aggregate } = this.state.userWallets.userWalletsConfig
    const data = await this.$axios.$get(
      `wallets?page=${page}&aggregate=${aggregate}`
    )
    commit('setUserWallets', data)
  },
  updateUserWalletsConfig({ commit }, config) {
    commit('setUserWalletsConfig', config)
  }
}
