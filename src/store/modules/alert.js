const state = {
  messages: [],
}

const mutations = {
  UPDATE_MESSAGE(state, newMessage) {
    state.messages.push(newMessage);
  },

  REMOVE_MESSAGE(state, num) {
    state.messages.splice(num, 1);
  }
}

const actions = {
  updateMessage: ({ commit, dispatch }, { message, status }) => {
    const timestamp = Math.floor(new Date() / 1000);
    const newMessage = {
      message,
      status,
      timestamp,
    };
    commit('UPDATE_MESSAGE', newMessage);
    dispatch('removeMessageWithTiming', timestamp);
  },

  removeMessage: ({ commit }, num) => {
    commit('REMOVE_MESSAGE', num);
  },

  removeMessageWithTiming: ({ commit }, timestamp) => {
    setTimeout(() => {
      state.messages.forEach((item, num) => {
        if (item.timestamp === timestamp) {
          commit('REMOVE_MESSAGE', num);
        }
      });
    }, 5000);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}