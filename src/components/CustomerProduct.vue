<template>
  <Modal v-if="isOpen">
    <div class="modal-container" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ tempProduct.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="tempProduct.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ tempProduct.content }}</p>
              <footer class="blockquote-footer text-right">{{ tempProduct.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!tempProduct.price">{{ tempProduct.origin_price }} 元</div>
              <del class="h6" v-if="tempProduct.price">原價 {{ tempProduct.origin_price }} 元</del>
              <div class="h4" v-if="tempProduct.price">現在只要 {{ tempProduct.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="tempProduct.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{tempProduct.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ tempProduct.num * tempProduct.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary" @click="addCart(tempProduct.id, tempProduct.num)">
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === tempProduct.id"></i>
              加到購物車
            </button>
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
  name: 'CustomerProduct',
  components: {
    Modal
  },
  computed: {
    ...mapState('product', ['tempProduct', 'loadingItem']),
    ...mapState('modal', ['modalType']),
    isOpen() {
      return this.modalType === 'CustomerProduct';
    }
  },
  methods: {
    ...mapActions('product', ['closeModal']),
    ...mapActions('cart', ['addtoCart']),
    addCart(id, qty) {
      this.addtoCart({ id, qty });
    }
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
