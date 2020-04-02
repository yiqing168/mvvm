import resolveFn from "./resolveFn";
import Dep from "./Dep";

export default class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.value = this.get();
  }
  get() {
    Dep.target = this;
    let value = resolveFn.getVal(this.vm, this.expr);
    Dep.target = null;
    return value;
  }
  update() {
    let newValue = resolveFn.getVal(this.vm, this.expr);
    if (this.value !== newValue) {
      this.cb(newValue);
      this.value = newValue;
    }
  }
}
