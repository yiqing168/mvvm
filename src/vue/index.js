import Observer from "./Observer";
import Compiler from "./Compiler";

export default class Vue {
  constructor(options = {}) {
    this.$options = options;
    this.$data = options.data;
    this.$computed = options.computed;
    this.$el = options.el;
    this.$methods = options.methods;
    // 代理
    this.proxyData();
    // 计算属性
    this.initComputed();
    // 代理方法
    this.initMethods();
    // 数据劫持
    new Observer(this.$data);
    // 编译模板
    new Compiler(this.$el, this);
  }
  // 代理将data属性代理到this上
  proxyData() {
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: false,
        enumerable: true,
        get() {
          return this.$data[key];
        },
        set(newVal) {
          this.$data[key] = newVal;
        }
      });
    });
  }
  // 计算属性
  initComputed() {
    Object.keys(this.$computed).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: false,
        enumerable: true,
        get() {
          return this.$computed[key].call(this);
        }
      });
    });
  }
  // 方法
  initMethods() {
    Object.keys(this.$methods).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this.$methods[key];
        }
      });
    });
  }
}
