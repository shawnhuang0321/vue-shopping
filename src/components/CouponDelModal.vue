<template>
  <Modal v-if="isOpen">
    <div class="modal-container" id="delCouponModal" tabindex="1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠卷(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary"
              @click="closeModal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="removeCoupon(tempCoupon.id)">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CouponDelModal',
  components: {
    Modal
  },
  computed: {
    ...mapState('coupon', ['tempCoupon']),
    ...mapState('modal', ['modalType']),
    isOpen() {
      return this.modalType === 'CouponDelModal';
    }
  },
  methods: {
    ...mapActions('coupon', ['closeModal', 'removeCoupon']),
  },
}
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  overflow: hidden;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>