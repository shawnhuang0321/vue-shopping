<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="my-3 d-flex justify-content-between">
      <h2>優惠卷列表</h2>
      <button class="btn btn-primary" @click="doOpenModal('CouponModal', {}, true)">建立新優惠卷</button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th width="150">名稱</th>
            <th width="150">優惠碼</th>
            <th width="150">折扣百分比</th>
            <th width="200">到期日</th>
            <th class="text-right" width="120">是否啟用</th>
            <th class="text-center" width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coupon, index) in coupons" :key="index">
            <td>{{coupon.title}}</td>
            <td>{{coupon.code}}</td>
            <td>{{coupon.percent}}%</td>
            <td>{{convertTime(coupon.due_date)}}</td>
            <td class="text-right">
              <span v-if="coupon.is_enabled" class="text-success">啟用</span>
              <span v-else class="text-danger">未啟用</span></td>
            <td class="text-center">
              <button @click="doOpenModal('CouponModal', coupon, false)" class="btn btn-outline-primary">編輯</button>
              <button @click="doOpenModal('CouponDelModal', coupon)" class="btn btn-outline-danger">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <pagination :pagination="pagination"
                @gotData="getCoupons"/>
  </div>
</template>

<script>
import Pagination from '../Pagination';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Coupons',
  data() {
    return {
      isNew: false
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState('coupon', ['coupons', 'pagination', 'isLoading']),
  },
  methods: {
    ...mapActions('coupon', ['getCoupons', 'openModal']),
    doOpenModal(type, item, status) {
      this.openModal({ type, item, status });
    },
    // updateCoupon() {
    //   let api = `/admin/coupon`;
    //   let httpMethod = 'post';
    //   if (!this.isNew) {
    //     api = `/admin/coupon/${this.tempCoupon.id}`;
    //     httpMethod = 'put';
    //   }
    //   const newCoupon = Object.assign({}, this.tempCoupon);
      // newCoupon.percent = Number(newCoupon.percent);
      // newCoupon.due_date = Math.floor(new Date(newCoupon.due_date).getTime() / 1000);
    //   this.$http[httpMethod](api, {data: newCoupon}).then(res => {
    //     const { success, message } = res.data;
    //     if (success) {
    //       this.closeModal();
    //       this.getCoupons();
    //     }
    //     else {
    //       this.closeModal();
    //       this.$bus.$emit('message:push', message, 'danger')
    //     }
    //   })
    //   $('#couponModal').modal('hide');
    //   this.getCoupons();
    //   this.isNew = false;
    // },
    convertTime(time) {
      let day = new Date(time * 1000);
      let year = day.getFullYear();
      let month = ('0' + (day.getMonth() + 1)).slice(-2);
      let date = ('0' + day.getDate()).slice(-2);
      return `${year}-${month}-${date}`;
    },
  },
  created() {
    this.getCoupons();
  }
}
</script>
