<template>
  <Modal v-if="isOpen">
    <div class="modal-container" id="couponModal" tabindex="1" role="dialog"
      aria-labelledby="couponModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="couponModalLabel">
              <span>新增優惠卷</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempCoupon.title"
                    placeholder="請輸入標題">
                </div>
                <div class="form-group">
                  <label for="code">優惠碼</label>
                  <input type="text" class="form-control" id="code"
                    v-model="tempCoupon.code"
                    placeholder="請輸入優惠碼">
                </div>
                <div class="form-group">
                  <label for="deadline">到期日</label>
                  <input type="date" class="form-control" id="deadline"
                    v-model="tempCoupon.due_date"
                    placeholder="請輸入到期日">
                </div>
                <div class="form-group">
                  <label for="discount">折扣百分比</label>
                  <input type="text" class="form-control" id="discount"
                    v-model="tempCoupon.percent"
                    placeholder="請輸入折扣">
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="closeModal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon(tempCoupon)">確認</button>
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
  name: 'CouponModal',
  components: {
    Modal
  },
  computed: {
    ...mapState('coupon', ['tempCoupon']),
    ...mapState('modal', ['modalType']),
    isOpen() {
      return this.modalType === 'CouponModal';
    },
  },
  methods: {
    ...mapActions('coupon', ['closeModal', 'updateCoupon']),
  }
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
