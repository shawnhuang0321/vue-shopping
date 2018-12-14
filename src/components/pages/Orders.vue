<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="my-3 d-flex justify-content-between">
      <h2>訂單列表</h2>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th width="150">購買時間</th>
            <th >E-mail</th>
            <th width="250">購買款項</th>
            <th class="text-right" width="120">應付金額</th>
            <th class="text-center" width="120">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{convertTime(item.create_at)}}</td>
            <td>{{item.user.email}}</td>
            <td>
              <p v-for="(orderdetail, index) in item.products" 
                :key="index">
                {{orderdetail.product.title}} 數量: {{orderdetail.qty}} {{orderdetail.product.unit}}
              </p>
            </td>
            <td class="text-right">{{item.total | currency}}</td>
            <td class="text-center">
              <span v-if="item.is_paid" class="text-success">已付款</span>
              <span v-else class="text-danger">未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <pagination :pagination="pagination"
                @gotData="getOrders"/>
  </div>
</template>

<script>
import Pagination from '../Pagination';
import { mapActions, mapState } from 'vuex';
import { convertTime } from '../../utils/utils';

export default {
  name: 'Orders',
  data() {
    return {}
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState('order', ['orders', 'pagination', 'isLoading']),
  },
  methods: {
    ...mapActions('order', ['getOrders']),
    convertTime(time) {
      return convertTime(time);
    },
  },
  created() {
    this.getOrders();
  }
}
</script>
