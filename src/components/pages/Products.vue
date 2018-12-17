<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="my-3 d-flex justify-content-between">
      <h2>產品列表</h2>
      <button class="btn btn-primary" @click="doOpenModal('ProductModal', {}, true)">建立新產品</button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>名稱</th>
            <th class="text-right" width="120">原價</th>
            <th class="text-right" width="120">售價</th>
            <th class="text-center" width="100">是否啟用</th>
            <th class="text-center" width="120">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price | currency}}</td>
            <td class="text-right">{{item.price | currency}}</td>
            <td class="text-center">
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else class="text-danger">未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button @click="doOpenModal('ProductModal', item, false)" class="btn btn-outline-primary">編輯</button>
                <button @click="doOpenModal('ProductDelModal', item)" class="btn btn-outline-danger">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  <!-- Pagination -->
  <pagination :pagination="pagination"
              @gotData="getProducts"/>
  </div>
</template>

<script>
import Pagination from '../Pagination';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Product',
  data() {
    return {}
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState('product', ['products', 'pagination', 'isLoading']),
  },
  methods: {
    ...mapActions('product', ['getProducts', 'removeProduct', 'openModal']),
    doOpenModal(type, item, status) {
      this.openModal({ type, item, status });
    }
  },
  created() {
    this.getProducts();
  }
}
</script>