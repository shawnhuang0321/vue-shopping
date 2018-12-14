import { getCart, addtoCart, removeCart, addCouponCode, createOrder, getOrder, payOrder } from '../../api';

const state = {
  cart: {
    carts: [],
  },
  orderId: '',
  order: {
    user: {}
  },
}

const mutations = {
  GET_CART(state, data) {
    state.cart = data;
  },

  CHECKOUT(state, orderId) {
    state.orderId = orderId;
  },

  GET_ORDER(state, order) {
    state.order = order;
  }
}

const actions = {
  getCart: async ({ commit, dispatch }) => {
    dispatch('product/loadingStatus', true, { root: true });
    const { data: { data } } = await getCart();
    commit('GET_CART', data);
    dispatch('product/loadingStatus', false, { root: true });
  },

  addtoCart: async ({ dispatch }, { id, qty }) => {
    dispatch('product/loadingStatus', true, { root: true });
    const item = {
      data: {
        product_id: id,
        qty
      }
    };
    await addtoCart({ item });
    dispatch('getCart');
    dispatch('product/loadingStatus', false, { root: true });
    dispatch('modal/closeModal', null, { root: true });
  },

  removeCart: async ({ dispatch }, id) => {
    dispatch('product/loadingStatus', true, { root: true });
    await removeCart({ id });
    dispatch('getCart');
    dispatch('product/loadingStatus', false, { root: true });
  },

  addCouponCode: async ({ dispatch }, code) => {
    const coupon = {
      data: {
        code
      }
    };
    const { data: { success, message } } = await addCouponCode({ coupon });
    if (!success) {
      const status = 'danger';
      dispatch('alert/updateMessage', { message, status }, { root: true });
    }
    else {
      const status = 'success';
      dispatch('alert/updateMessage', { message, status }, { root: true });
      dispatch('getCart');
    }
  },

  createOrder: async ({ commit, dispatch }, form) => {
    const order = {
      data: form
    };
    const { data, data: { success, message } } = await createOrder({ order });
    if (!success) {
      const status = 'danger';
      dispatch('alert/updateMessage', { message, status }, { root: true });
    }
    else {
      const status = 'success';
      const { orderId } = data;
      commit('CHECKOUT', orderId);
      dispatch('alert/updateMessage', { message, status }, { root: true });
    }
  },

  getOrder: async ({ commit }, orderId) => {
    const { data: { order } } = await getOrder({ orderId });
    commit('GET_ORDER', order);
  },

  payOrder: async ({ dispatch }, orderId) => {
    const { data: { success } } = await payOrder({ orderId });
    if (success) {
      dispatch('getOrder', orderId);
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}