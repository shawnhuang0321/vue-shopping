<template>
  <div>
    <h2 class="text-center">
      <span><i class="far fa-list-alt mr-1"></i></span>
      訂單列表
    </h2>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="sendCreateOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            :class="{ 'is-invalid': errors.has('email') }"
            v-validate="'required|email'"
            v-model="form.user.email" placeholder="請輸入 Email">
          <span class="text-danger"
            v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
      
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            :class="{ 'is-invalid': errors.has('name') }"
            v-validate="'required'"
            v-model="form.user.name" placeholder="輸入姓名">
          <span class="text-danger"
            v-if="errors.has('name')">姓名必須輸入</span>
        </div>
      
        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" name="tel" id="usertel"
            :class="{ 'is-invalid': errors.has('address') }"
            v-validate="'required'"
            v-model="form.user.tel" placeholder="請輸入電話">
          <span class="text-danger"
            v-if="errors.has('tel')">電話欄位不得留空</span>
        </div>
      
        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="address" class="form-control" name="address" id="useraddress"
            :class="{ 'is-invalid': errors.has('address') }"
            v-validate="'required'"
            v-model="form.user.address"
            placeholder="請輸入地址">
          <span class="text-danger"
            v-if="errors.has('address')">地址欄位不得留空</span>
        </div>
      
        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name="" id="" class="form-control" cols="30" rows="10"
            v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CartOrder',
  data() {
    return {
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  watch: {
    orderId: function() {
      this.$router.push(`customer_checkout/${this.orderId}`);
    },
  },
  computed: {
    ...mapState('cart', ['orderId']),
  },
  methods: {
    ...mapActions('cart', ['createOrder']),
    sendCreateOrder() {
      this.$validator.validate().then(result => {
        if (!result) {
          alert('欄位填寫不完全');
        }
        else {
          this.createOrder(this.form);
        }
      });
    }
  },
}
</script>
