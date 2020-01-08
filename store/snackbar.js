export const state = () => ({
  snack: '',
  color: 'alert',
  timeout: true
})

export const mutations = {
  setSnack (state, payload) {
    state = Object.assign(state, payload)
  }
}

export const getters = {
  getSnack (state) {
    return state
  }
}

export const actions = {
  updateSnack ({ commit }, snack) {
    commit('setSnack', snack)
  }
}
