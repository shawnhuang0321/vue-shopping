import {
  getProducts,
  removeProduct,
  updateProduct,
  uploadFile,
  getCustomerProducts,
  getProductDetail
} from '../../api';

import Vue from 'vue';

const state = {
  products: [],
  pagination: {},
  tempProduct: {},
  tempStatus: true,
  loadingItem: '',
  isLoading: false
}

const mutations = {
  LOADING_STATUS(state, status) {
    state.isLoading = status;
  },

  LODAING_ITEM(state, id) {
    state.loadingItem = id;
  },

  GET_PRODUCTS(state, { products, pagination }) {
    state.products = products;
    state.pagination = pagination;
  },

  SET_TEMP_PRODUCT(state, item) {
    state.tempProduct = item;
  },

  SET_TEMP_STATUS(state, status) {
    state.tempStatus = status;
  },

  UPLOAD_FILE(state, imageUrl) {
    Vue.set(state.tempProduct, 'imageUrl', imageUrl);
  },
}

const actions = {
  getProducts: async ({ commit }, page = 1) => {
    commit('LOADING_STATUS', true);
    const { data: { products, pagination } } = await getProducts({ page });
    commit('GET_PRODUCTS', { products, pagination });
    commit('LOADING_STATUS', false);
  },

  getCustomerProducts: async ({ commit }, page = 1) => {
    commit('LOADING_STATUS', true);
    const { data: { products, pagination } } = await getCustomerProducts({ page });
    commit('GET_PRODUCTS', { products, pagination });
    commit('LOADING_STATUS', false);
  },

  getProductDetail: async ({ commit, dispatch }, id) => {
    commit('LODAING_ITEM', id);
    const { data: { product } } = await getProductDetail({ id });
    commit('SET_TEMP_PRODUCT', product);
    commit('LODAING_ITEM', '');
    const type = 'CustomerProduct';
    dispatch('modal/openModal', { type }, { root: true });
  },

  removeProduct: async ({ dispatch }, id) => {
    await removeProduct({ id });
    dispatch('getProducts');
    dispatch('closeModal');
  },

  updateProduct: async ({ commit, dispatch }, product) => {
    commit('LOADING_STATUS', true);
    let api = `/admin/product`;
    let httpMethod = 'post';
    let item = {
      data: product
    };
    if (!state.tempStatus) {
      httpMethod = 'put';
      api = `/admin/product/${product.id}`;
    }
    await updateProduct({ api, httpMethod, item});
    dispatch('getProducts');
    dispatch('closeModal');
    commit('LOADING_STATUS', false);
  },

  uploadFile: async({ commit, dispatch }, imgData) => {
    const id = state.tempProduct.id;
    commit('LODAING_ITEM', id);
    const { data } = await uploadFile({ imgData });
    if (!data.success) {
      const message = data.message;
      const status = 'danger';
      dispatch('alert/updateMessage', { message, status }, { root: true });
    }
    else {
      commit('UPLOAD_FILE', data.imageUrl);
    }
    commit('LODAING_ITEM', '');
  },

  loadingStatus: ({ commit }, type) => {
    commit('LOADING_STATUS', type);
  },

  openModal: ({ commit, dispatch }, { type, item, status }) => {
    commit('SET_TEMP_PRODUCT', item);
    commit('SET_TEMP_STATUS', status);
    dispatch('modal/openModal', { type }, { root: true });
  },

  closeModal: ({ commit, dispatch }) => {
    commit('SET_TEMP_PRODUCT', {});
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