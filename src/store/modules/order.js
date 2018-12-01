import { getOrders } from '../../api';

const state = {
  isLoading: false,
  pagination: {},
  orders: []
}

const mutations = {
  GET_ORDERS(state, { orders, pagination }) {
    state.orders = orders;
    state.pagination = pagination;
  },

  LOADING_STATUS(state, status) {
    state.isLoading = status;
  }
}

const actions = {
  getOrders: async ({ commit }, page = 1) => {
    commit('LOADING_STATUS', true);
    const { data: { orders, pagination } } = await getOrders({ page });
    commit('GET_ORDERS', { orders, pagination });
    commit('LOADING_STATUS', false);
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}