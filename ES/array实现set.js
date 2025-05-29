//! arry上的 
// includes()
// 

class fakeSet {
  constructor() {
    this.items = [];
    this.size = 0;
  }

  add(el) {
    if (!this.items.includes(el)) {
      this.items.push(el);
      this.size++;
    }
  }

  has(el) {
    return this.items.includes(el);
  }

  delete(el) {
    const index = this.items.findIndex(el);
    if (index !== -1) {
      this.items.splice(index, 1); // splice(start, len, additem) 从start开始删除len个元素，添加additem
      this.size--;
      return true;
    }
    return false;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.size;
  }

  values() {
    return this.items;
  }
}
