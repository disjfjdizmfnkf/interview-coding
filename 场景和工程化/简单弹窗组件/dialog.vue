<template>
  <div v-if="visible">
    <div>
      <h3>{{ title }}</h3>
      <div>
        <slot></slot>
      </div>
      <div>
        <button @click="onCancel">取消</button>
        <button @click="onConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["update:visible", "confirm", "cancel"]);

const { title, visible } = toRefs(props);

const onCancel = () => {
  emits("update:visible", false);
  emits("cancel");
};
const onConfirm = () => {
  emits("update:visible", false);
  emits("confirm");
};
</script>

<style scoped></style>
