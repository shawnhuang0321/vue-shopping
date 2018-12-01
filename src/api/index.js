import axios from 'axios';

export const getProducts = ({ page }) =>
  axios.get(`/admin/products?page=${page}`);

export const removeProduct = ({ id }) =>
  axios.delete(`/admin/product/${id}`);

export const updateProduct = ({ api, httpMethod, item }) =>
  axios[httpMethod](api, item);

export const uploadFile = ({ imgData }) =>
  axios.post(`/admin/upload`, imgData, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  });

export const getOrders = ({ page }) =>
  axios.get(`/admin/orders?page=${page}`);

export const getCoupons = ({ page }) =>
  axios.get(`/admin/coupons?page=${page}`);

export const removeCoupon = ({ id }) =>
  axios.delete(`/admin/coupon/${id}`);

export const updateCoupon = ({ api, httpMethod, item }) =>
  axios[httpMethod](api, item);

export const getCustomerProducts = ({ page }) =>
  axios.get(`/products?page=${page}`);

export const getProductDetail = ({ id }) =>
  axios.get(`/product/${id}`);

export const getCart = () =>
  axios.get(`/cart`);

export const addtoCart = ({ item }) =>
  axios.post(`/cart`, item);

export const removeCart = ({ id }) =>
  axios.delete(`/cart/${id}`);

export const addCouponCode = ({ coupon }) =>
  axios.post(`/coupon`, coupon);

export const createOrder = ({ order }) =>
  axios.post(`/order`, order);

export const getOrder = ({ orderId }) =>
  axios.get(`/order/${orderId}`);

export const payOrder = ({ orderId }) =>
  axios.post(`/pay/${orderId}`);