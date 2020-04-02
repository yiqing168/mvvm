export default class Dep {
  constructor() {
    this.subs = [];
  }
  add(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    this.subs.forEach(item => item.update());
  }
}
