class LRUCache {
  #cache;
  #capacity;
  constructor(capacity: number) {
    this.#capacity = capacity;
    this.#cache = new Map();
  }

  get(key: number): number {
    if (!this.#cache.has(key)) {
      return -1;
    }
    const value = this.#cache.get(key);
    this.#cache.delete(key);
    this.#cache.set(key, value);
    return value;
  }

  put(key: number, value: number): void {
    if (this.#cache.has(key)) {
      this.#cache.delete(key);
    }
    // 添加元素
    this.#cache.set(key, value);
    // 判断是否超出容量
    if (this.#cache.size > this.#capacity) {
      // keys() 返回一个迭代器 使用next()方法获取下一个item {value: any, done: boolean}
      const firstKey = this.#cache.keys().next().value;
      this.#cache.delete(firstKey);
    }
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
/* 
class LRU {
  #cache;
  #capacity;
  constructor(cap) {
    this.#capacity = cap;
    this.capacity = new Map();
  }

  get(key) {
    if (!this.#cache.has(key)) {
      return -1;
    }
    const value = this.#cache[key];
    this.#cache.delete(key);
    this.#cache.set(key, value);
    return value;
  }

  set(key, value) {
    // 如果key存在，先删除这个旧的item
    if (this.#cache.has(key)) {
      this.#cache.delete(key, value);
    }
    if (this.#cache.size() > this.capacity) {
      const firstKey = this.#cache.keys().next().value;
      this.#cache.delete(firstKey);
    }
    this.#cache.set(key, value);
  }
}

class Node {
  prev;
  next;
  key;
  value;
  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUcache2 {
  #cap;
  #left;
  #right;
  #cache;
  constructor(capacity) {
    this.#cap = capacity;
    this.#cache = new Map();
    this.#right = new Node(); // 虚拟的尾节点
    this.#left = new Node(); // 虚拟的头节点
    this.#left.next = this.#right;
    this.#right.prev = this.#left;
  }

  // 弹出并且返回节点
  #pop(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    return node;
  }

  // 将节点加入到最右边
  #append(node) {
    node.next = this.#right;
    node.prev = this.#right.prev;
    this.#right.prev.next = node;
    this.#right.prev = node;
  }

  // 访问某个值，将这个放在最后作为最新的
  get(key) {
    if (!this.#cache.has(key)) return null;
    const node = this.#cache.get(key);
    this.#pop(node);
    this.#append(node);
    return node.value;
  }

  // 添加或更新节点
  add(key, value) {
    if (this.#cache.has(key)) {
      // 如果已有该键，则先移除该节点
      const node = this.#cache.get(key);
      this.#pop(node);
    } else if (this.#cache.size >= this.#cap) {
      // 如果缓存已满，移除最旧的节点（即头部的节点）
      const node = this.#pop(this.#left.next);
      this.#cache.delete(node.key);
    }

    // 创建新节点并添加到缓存和链表中
    const newNode = new Node(key, value);
    this.#cache.set(key, newNode);
    this.#append(newNode);
  }
}
*/
