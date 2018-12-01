<template>
  <Modal v-if="isOpen">
    <div class="modal-container" id="delProductModal" tabindex="-1" role="dialog"
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
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="closeModal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="removeProduct(tempProduct.id)"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductDelModal',
  data() {
    return {}
  },
  components: {
    Modal
  },
  computed: {
    ...mapState('product', ['tempProduct']),
    ...mapState('modal', ['modalType']),
    isOpen() {
      return this.modalType === 'ProductDelModal';
    }
  },
  methods: {
    ...mapActions('product', ['closeModal', 'removeProduct']),
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
