import resolveFn from "./resolveFn";

/**
 * 编译模板
 */
export default class Compiler {
  constructor(el, vm) {
    this.vm = vm;
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    let fragment = this.createFragment(this.el);
    this.compile(fragment);
    this.el.appendChild(fragment);
  }
  // 是否元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isDirective(attrName) {
    // 是否是指令
    return attrName.startsWith("v-");
  }
  createFragment(node) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  compile(node) {
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        if (child.childNodes && child.childNodes.length) {
          this.compile(child);
        }
        // 所有属性
        let attributes = child.attributes;
        [...attributes].forEach(attribute => {
          console.log(attribute);
          const { name, value } = attribute;
          if (this.isDirective(name)) {
            const directive = name.split("-")[1];
            let [directiveName, eventName] = directive.split(":");
            if (resolveFn[directiveName]) {
              resolveFn[directiveName](child, value, this.vm, eventName);
            }
          }
        });
      } else {
        let content = child.textContent;
        if (/\{\{(.+?)\}\}/.test(content)) {
          // 判断是否有模板语法 {{}}
          resolveFn.text(child, content, this.vm);
        }
      }
    });
  }
}
