import Vue from "./vue";

let app = new Vue({
  el: "#app",
  data: {
    name: ""
  },
  methods: {
    clear() {
      this.name = "";
    }
  },
  computed: {
    info() {
      return `我叫${this.name}`;
    }
  }
});
