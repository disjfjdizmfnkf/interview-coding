// 将一颗dom树拆解为一个链表



let nextRenderUnit = null;

function workLoop(deadLine) {
  // IdleDeadLine.timeReaming() 获取当前剩余时间
  console.log(deadLine.timeRemaing());

  nextRenderUnit = getRenderAndReturnNextUnit(nextRenderUnit);

  let shouldYield = false;  // 让出执行权
  while (!shouldYield) {

    shouldYield = deadLine.timeRemaing() < 1;
  }

  requestIdleCallback(workLoop);
}

// 第一个workNode是虚拟dom的根节点
function getRenderAndReturnNextUnit(workNode) {
    if (!workNode) return null;
    // 1. 创建 真实DOM节点
    const vNode = buildFakeDom(workNode);  //* workNode是一个fiberNode
    workNode.parent.dom.append(vNode); // 将真实dom添加到父节点中

    // 2. 遍历子节点，创建 Fiber 节点
    const children = workNode.props.children || [];
    let previousSibling = null;
    children.forEach((child, index) => {
        const newWorkNode = {  //* 一个fiberNode的数据结构
            type: child.type,
            props: child.props,
            child: null, // 第一个子节点
            sibling: null, // 下一个兄弟节点
            parent: workNode, // 父节点
            dom: null, // 对应的 DOM 节点
        };
        if (index === 0) {
            // 第一个子节点
            workNode.child = newWorkNode;
        } else {
            // 设置兄弟节点
            previousSibling.sibling = newWorkNode;
        }
        previousSibling = newWorkNode; // 更新前一个兄弟节点
    });

    // 3. 返回下一个需要处理的任务
    if (workNode.child) return workNode.child; // 优先处理子节点
    let nextFiber = workNode;
    while (nextFiber) {
        if (nextFiber.sibling) return nextFiber.sibling; // 处理兄弟节点
        nextFiber = nextFiber.return; // 回溯到父节点
    }

    return null; // 没有更多任务
}




// 会在浏览器空闲时执行回调(
// 空闲时: 主线程没有高优先级任务处理 
// 高优先级任务: 滚动、动画、渲染) 
// 回调时自动传入IdleDeadline对象
requestIdleCallback(workLoop);
