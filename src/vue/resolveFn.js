import Watcher from "./Watcher";

export default {
  getVal(vm, expr) {
    return expr.split(".").reduce((data, current) => {
      return data[current];
    }, vm);
  },
  setValue(vm, exp, value) {
    exp.split(".").reduce((data, current, index, arr) => {
      if (index === arr.length - 1) {
        return (data[current] = value);
      }
      return data[current];
    }, vm.$data);
  },
  text(node, exp, vm) {
    let reg = /\{\{(.+?)\}\}/;
    let expr = exp.match(reg);
    node.textContent = this.getVal(vm, expr[1]);
    new Watcher(vm, expr[1], newValue => {
      node.textContent = newValue;
    });
  },
  model(node, exp, vm) {
    new Watcher(vm, exp, newValue => {
      node.value = newValue;
    });
    node.addEventListener("input", e => {
      let value = e.target.value;
      this.setValue(vm, exp, value);
    });
    let value = this.getVal(vm, exp);
    node.value = value;
  },
  on(node, exp, vm, eventName) {
    node.addEventListener(eventName, e => {
      vm[exp].call(vm, e);
    });
  }
};
