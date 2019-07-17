export const state = () => ({
  newWalletModalVisible: false,
  deleteWalletModalVisible: false,
  newNodeModalVisible: false,
  deleteNodeModalVisible: false,
  deleteAllNodesModalVisible: false,
  deleteAllWalletsModalVisible: false,
  receiveWalletModalVisible: false,
  fastDeployModalVisible: false
})

export const mutations = {
  setNewWalletModalVisible(state, obj) {
    state.newWalletModalVisible = obj
  },
  setDeleteWalletModalVisible(state, obj) {
    state.deleteWalletModalVisible = obj
  },
  setNewNodeModalVisible(state, obj) {
    state.newNodeModalVisible = obj
  },
  setDeleteNodeModalVisible(state, obj) {
    state.deleteNodeModalVisible = obj
  },
  setDeleteAllNodesModalVisible(state, obj) {
    state.deleteAllNodesModalVisible = obj
  },
  setDeleteAllWalletsModalVisible(state, obj) {
    state.deleteAllWalletsModalVisible = obj
  },
  setReceiveWalletModalVisible(state, obj) {
    state.receiveWalletModalVisible = obj
  },
  setFastDeployModalVisible(state, obj) {
    state.fastDeployModalVisible = obj
  }
}

export const getters = {
  getNewWalletModalVisible(state) {
    return state.newWalletModalVisible
  },
  getDeleteWalletModalVisible(state) {
    return state.deleteWalletModalVisible
  },
  getNewNodeModalVisible(state) {
    return state.newNodeModalVisible
  },
  getDeleteNodeModalVisible(state) {
    return state.deleteNodeModalVisible
  },
  getDeleteAllNodesModalVisible(state) {
    return state.deleteAllNodesModalVisible
  },
  getDeleteAllWalletsModalVisible(state) {
    return state.deleteAllWalletsModalVisible
  },
  getReceiveWalletModalVisible(state) {
    return state.receiveWalletModalVisible
  },
  getFastDeployModalVisible(state) {
    return state.fastDeployModalVisible
  }
}

export const actions = {
  updateNewWalletModalVisible({ commit }, obj) {
    commit('setNewWalletModalVisible', obj)
  },
  updateDeleteWalletModalVisible({ commit }, obj) {
    commit('setDeleteWalletModalVisible', obj)
  },
  updateNewNodeModalVisible({ commit }, obj) {
    commit('setNewNodeModalVisible', obj)
  },
  updateDeleteNodeModalVisible({ commit }, obj) {
    commit('setDeleteNodeModalVisible', obj)
  },
  updateDeleteAllNodesModalVisible({ commit }, obj) {
    commit('setDeleteAllNodesModalVisible', obj)
  },
  updateDeleteAllWalletsModalVisible({ commit }, obj) {
    commit('setDeleteAllWalletsModalVisible', obj)
  },
  updateReceiveWalletModalVisible({ commit }, obj) {
    commit('setReceiveWalletModalVisible', obj)
  },
  updateFastDeployModalVisible({ commit }, obj) {
    commit('setFastDeployModalVisible', obj)
  }
}
