export function useContentMenu(container) {
  const x = ref(0);
  const y = ref(0);
  const visible = ref(false);

  const contentMenuHandler = (e) => {
    e.preventDefault();
    x.value = e.clientX;
    y.value = e.clientY;
    visible.value = true;
  };

  const closeHandler = () => {
    visible.value = false;
  };

  onMounted(() => {
    if (!container.value) return;

    container.value.addEventListener("contextmenu", contentMenuHandler);
    window.addEventListener("click", closeHandler, true); // 捕获阶段执行确保无法阻止
    window.addEventListener("contextmenu", closeHandler, true);
  });

  onUnmounted(() => {
    if (!container.value) return;

    container.value.removeEventListener("contextmenu", contentMenuHandler);
    window.removeEventListener("click", closeHandler, true);
    window.removeEventListener("contextmenu", closeHandler, true);
  });

  return { x, y, visible };
}
