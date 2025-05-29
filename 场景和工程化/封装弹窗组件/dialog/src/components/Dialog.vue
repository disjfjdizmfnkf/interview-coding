<template >
  <div class="dialog" v-if="props.visible">
    <div class="dialog-mask" @click="emitClose"></div>
    <div class="dialog-content">
      <div class="dialog-title">{{ props.title }}</div>
      <div class="dialog-text">{{ props.content }}</div>
      <div class="dialog-footer">
        <button @click="emitClose">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },

});

const temp = ref();
const emit = defineEmits(['close']);

const emitClose = () => {
  emit('close');
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 10;
}

.dialog-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.dialog-text {
  margin-bottom: 20px;
}

.dialog-footer {
  text-align: right;
}
</style>
