export const state = () => ({
  userData: false
})

export const mutations = {
  setUserData(state, userDataObj) {
    state.userData = userDataObj
  }
}

export const getters = {
  getUserData(state) {
    return state.userData
  }
}

export const actions = {
  async updateUserData({ commit }) {
    const data = await this.$axios.$get(`user`)
    commit('setUserData', data)
  }
}
