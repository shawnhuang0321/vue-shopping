<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6">原價 {{item.origin_price}} 元</del>
              <div class="h5">現在只要 {{item.price}} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProductDetail(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addCart(item.id, 1)">
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <pagination :pagination="pagination"
                @gotData="getCustomerProducts"/>  
    <!-- cart -->
    <Cart />
    <CartOrder />
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';
import Pagination from '../Pagination';
import Cart from '../Cart';
import CartOrder from '../CartOrder';

export default {
  name: 'CustomerOrder',
  components: {
    Pagination,
    Cart,
    CartOrder
  },
  computed: {
    ...mapState('product', ['products', 'pagination', 'isLoading', 'loadingItem']),
  },
  methods: {
    ...mapActions('product', ['getCustomerProducts', 'getProductDetail']),
    ...mapActions('cart', ['addtoCart']),
    addCart(id, qty) {
      this.addtoCart({ id, qty });
    }
  },
  created() {
    this.getCustomerProducts();
  },
}
</script>
