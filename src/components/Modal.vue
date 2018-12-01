<template>
  <div v-if="isOpen">
    <div class="modal-backdrop"></div>
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Modal',
  computed: {
    ...mapState('modal', ['modalType']),
    isOpen() {
      return this.modalType !== '';
    }
  },
}
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: #000;
  opacity: .5;
}
</style>
