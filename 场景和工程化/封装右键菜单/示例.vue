<template>
  <ContentMenu :menu="menuItems" @select="onMenuSelect">
    <div class="demo-container">
      在此区域右键点击展示上下文菜单
    </div>
  </ContentMenu>
</template>

<script setup>
import { ref } from 'vue';
import ContentMenu from './ContentMenu.vue';

const menuItems = ref([
  { 
    label: '复制', 
    icon: 'icon-copy',
    handler: () => console.log('复制') 
  },
  { 
    label: '粘贴', 
    icon: 'icon-paste',
    handler: () => console.log('粘贴') 
  },
  { divider: true },
  { 
    label: '删除', 
    icon: 'icon-delete',
    disabled: false,
    handler: () => console.log('删除') 
  }
]);

function onMenuSelect({ item, index }) {
  console.log('选择了菜单项:', item.label, '索引:', index);
}

</script>

<style scoped>
.demo-container {
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
</style> 