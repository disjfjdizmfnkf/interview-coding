<script setup>
import { ref } from 'vue';
import Dialog from './components/Dialog.vue';


const dialogVisible = ref(false);
const dialogContent = ref('父组件传递过来的弹框内容');
const title = ref('父组件传递过来的弹框标题');

const closeDialog = () => {
  dialogVisible.value = false;
};

const openDialog = () => {
  dialogVisible.value = true;
};
</script>

<template>
  <Dialog :visible="dialogVisible" :title="title" :content="dialogContent" @close="closeDialog"/>
  <button @click="openDialog">Open Dialog</button>
</template>

<style scoped></style>
