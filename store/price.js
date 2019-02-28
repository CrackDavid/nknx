export const state = () => ({
  price: false
})

export const mutations = {
  set(state, priceObj) {
    state.price = priceObj
  }
}

export const getters = {
  get(state) {
    return state.price
  }
}

export const actions = {
  async getCurrentPrice({ commit }) {
    const data = await this.$axios.$get(
      'https://price.nknx.org/price?quote=NKN&currency=USD,ETH'
    )
    commit('set', data[0])
  }
}
