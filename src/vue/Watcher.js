import resolveFn from "./resolveFn";
import Dep from "./Dep";
import { queueWatcher } from "./scheduler";

let uid = 0;

export default class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.value = this.get();
    this.id = uid++;
  }
  get() {
    Dep.target = this;
    let value = resolveFn.getVal(this.vm, this.expr);
    Dep.target = null;
    return value;
  }
  update() {
    // 观察者队列
    queueWatcher(this);
  }
  run() {
    let newValue = resolveFn.getVal(this.vm, this.expr);
    if (this.value !== newValue) {
      this.cb(newValue);
      this.value = newValue;
    }
  }
}
