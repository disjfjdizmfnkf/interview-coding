<template>
  <div class="container" ref="containerRef">
    <slot></slot>
    <Teleport to="body">
      <div v-resize="onResize" class="menu" v-if="visible">
        <div
          class="menu-list"
          :style="{
            top: `${adjustedPosition.y}px`,
            left: `${adjustedPosition.x}px`,
          }"
        >
          <div
            v-for="(item, index) in menu"
            :key="index"
            class="menu-item"
            :class="{
              'menu-item-divider': item.divider,
              'menu-item-disabled': item.disabled,
            }"
            @click="handleMenuClick(item, index)"
          >
            <i v-if="item.icon" class="menu-item-icon" :class="item.icon"></i>
            <span class="menu-item-label">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useContentMenu } from "./useContentMenu";

const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
    // 菜单项格式: { label: '菜单项', icon: 'icon-class', disabled: false, divider: false, handler: () => {} }
  },
});

const emit = defineEmits(["select"]);

// 初始化DOM引用
const containerRef = ref(null);

// 使用右键菜单hook
const { x, y, visible } = useContentMenu(containerRef);

// 菜单尺寸
const menuWidth = ref(0);
const menuHeight = ref(0);

// 获取并监听视口尺寸
const viewport = useViewport();

// 处理菜单尺寸变化
function onResize({ width, height }) {
  menuWidth.value = width;
  menuHeight.value = height;
}

// 计算调整后的菜单位置，避免溢出视口
const adjustedPosition = computed(() => {
  let adjustedX = x.value;
  let adjustedY = y.value;

  // 检查右边界
  if (adjustedX + menuWidth.value > viewport.width.value) {
    adjustedX = viewport.width.value - menuWidth.value - 5; // 留出5px边距
  }

  // 检查下边界
  if (adjustedY + menuHeight.value > viewport.height.value) {
    adjustedY = viewport.height.value - menuHeight.value - 5; // 留出5px边距
  }

  // 确保不会小于0
  adjustedX = Math.max(5, adjustedX);
  adjustedY = Math.max(5, adjustedY);

  return { x: adjustedX, y: adjustedY };
});

// 处理菜单项点击
function handleMenuClick(item, index) {
  if (item.disabled) return;

  // 隐藏菜单
  visible.value = false;

  // 如果有回调函数，执行它
  if (typeof item.handler === "function") {
    item.handler(item);
  }

  // 触发select事件
  emit("select", { item, index });
}

// 提取的可复用视口hook
function useViewport() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const updateSize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener("resize", updateSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateSize);
  });

  return { width, height };
}
</script>

<style lang="less" scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;

  .menu-list {
    position: absolute;
    min-width: 160px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    padding: 5px 0;
    pointer-events: auto;
    overflow: hidden;
  }

  .menu-item {
    padding: 8px 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    &-icon {
      margin-right: 8px;
      font-size: 16px;
    }

    &-label {
      flex: 1;
    }

    &-divider {
      border-bottom: 1px solid #eee;
      margin: 5px 0;
      padding: 0;
      height: 0;

      &:hover {
        background-color: transparent;
      }
    }

    &-disabled {
      color: #ccc;
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
  }
}

.container {
  position: relative;
}
</style>
