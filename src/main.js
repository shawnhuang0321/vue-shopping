// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

import App from './App';
import router from './router';
import store from './store';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false
Vue.use(VueAxios, axios, Vuex);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhTWValidate);

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

axios.defaults.baseURL = `${process.env.API_PATH}/api/${process.env.CUSTOMPATH}`;
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.API_PATH}/api/user/check`;
    axios.post(api).then(res => {
      const { data } = res;
      if (data.success) {
        next();
      }
      else {
        next({
          path: '/'
        });
      }
    })
  }
  else {
    next();
  }
})
