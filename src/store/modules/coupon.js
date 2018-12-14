import { getCoupons, removeCoupon, updateCoupon } from '../../api';
import { convertTime } from '../../utils/utils';

const state = {
  pagination: {},
  coupons: [],
  tempCoupon: {},
  tempStatus: true,
  isLoading: false,
}

const mutations = {
  LOADING_STATUS(state, status) {
    state.isLoading = status;
  },

  GET_COUPONS(state, { coupons, pagination }) {
    state.coupons = coupons;
    state.pagination = pagination;
  },

  SET_TEMP_COUPON(state, item) {
    item.due_date = convertTime(item.due_date);
    state.tempCoupon = item;
  },

  SET_TEMP_STATUS(state, status) {
    state.tempStatus = status;
  },
}

const actions = {
  getCoupons: async ({ commit }, page = 1) => {
    commit('LOADING_STATUS', true);
    const { data: { coupons, pagination } } = await getCoupons({ page });
    commit('GET_COUPONS', { coupons, pagination });
    commit('LOADING_STATUS', false);
  },

  updateCoupon: async ({ dispatch }, coupon) => {
    coupon = Object.assign({}, coupon);
    let api = `/admin/coupon`;
    let httpMethod = 'post';
    if (coupon.percent === NaN || '') {
      coupon.percent = 100
    }
    coupon.percent = Number(coupon.percent);
    coupon.due_date = Math.floor(new Date(coupon.due_date).getTime() / 1000);
    let item = {
      data: coupon
    };
    if (!state.tempStatus) {
      api = `/admin/coupon/${coupon.id}`;
      httpMethod = 'put';
    }
    await updateCoupon({ api, httpMethod, item});
    dispatch('getCoupons');
    dispatch('closeModal');
  },

  removeCoupon: async ({ dispatch }, id) => {
    await removeCoupon({ id });
    dispatch('getCoupons');
    dispatch('closeModal');
  },

  openModal: ({ commit, dispatch }, { type, item, status }) => {
    commit('SET_TEMP_COUPON', item);
    commit('SET_TEMP_STATUS', status);
    dispatch('modal/openModal', { type }, { root: true });
  },

  closeModal: ({ commit, dispatch }) => {
    commit('SET_TEMP_COUPON', {});
    commit('SET_TEMP_STATUS', true);
    dispatch('modal/closeModal', null, { root: true });
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}