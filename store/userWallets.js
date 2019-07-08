export const state = () => ({
  userWallets: false
})

export const mutations = {
  setUserWallets(state, userWalletsObj) {
    state.userWallets = userWalletsObj
  }
}

export const getters = {
  getUserWallets(state) {
    return state.userWallets
  }
}

export const actions = {
  async updateUserWallets({ commit }, page) {
    // Checking if page exists
    if (page === null) {
      return false
    }
    const data = await this.$axios.$get(`wallets?page=${page}`)
    commit('setUserWallets', data)
  }
}