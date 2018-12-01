const state = {
  modalType: ''
}

const mutations = {
  OPEN_MODAL(state, type) {
    state.modalType = type;
  },

  CLOSE_MODAL(state) {
    state.modalType = '';
  },
}

const actions = {
  openModal: ({ commit }, { type }) => {
    commit('OPEN_MODAL', type);
  },

  closeModal: ({ commit }) => {
    commit('CLOSE_MODAL');
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}