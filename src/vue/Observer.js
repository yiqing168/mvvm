import Dep from "./Dep";

export default class Observer {
  constructor(data) {
    this.data = data;
    this.observe(data);
  }
  observe(data) {
    if (data && typeof data === "object") {
      if (Array.isArray(data)) {
        data.forEach(item => {
          this.observe(item);
        });
        return;
      }
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }
  defineReactive(obj, key, val) {
    let _this = this;
    this.observe(val);
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.subs.push(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
          _this.observe(newVal);
          dep.notify(); // 发布
        }
      }
    });
  }
}
