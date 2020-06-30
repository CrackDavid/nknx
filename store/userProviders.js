export const state = () => ({
  userProviders: false
})

export const mutations = {
  setUserProviders(state, userProvidersObj) {
    state.userProviders = userProvidersObj
  }
}

export const getters = {
  getUserProviders(state) {
    return state.userProviders
  }
}

export const actions = {
  async updateUserProviders({ commit }, page) {
    const data = await this.$axios.$get(`vps-keys/?page=${page}`)
    commit('setUserProviders', data)
  }
}
