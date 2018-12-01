import Vue from 'vue';
import Router from 'vue-router';
import Signin from '@/components/pages/Signin';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupons from '@/components/pages/Coupons';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/admin',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'Products',
          meta: { requiresAuth: true },
          component: Products
        },
        {
          path: 'orders',
          name: 'Orders',
          meta: { requiresAuth: true },
          component: Orders
        },
        {
          path: 'coupons',
          name: 'Coupons',
          meta: { requiresAuth: true },
          component: Coupons
        }
      ]
    },
    {
      path: '/customer',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'CustomerOrder',
          component: CustomerOrder
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout
        }
      ]
    },
    {
      path: '*',
      redirect: '/signin'
    }
  ]
})
