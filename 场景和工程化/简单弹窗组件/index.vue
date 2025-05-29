<template>
  <div>
    <button @click="showModal = true">打开弹窗</button>

    <Modal
      :title="'提示'"
      v-model:visible="showModal"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <p>这是弹窗的内容。</p>
    </Modal>
  </div>
</template>

<script setup>
import Modal from "./Modal.vue";

import { ref } from "vue";
const showModal = ref(false);
const handleConfirm = () => {
  console.log("确认按钮被点击了！");
};
const handleCancel = () => {
  console.log("取消按钮被点击了！");
};
</script>
