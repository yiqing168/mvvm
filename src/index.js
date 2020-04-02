import Vue from "./vue";

let app = new Vue({
  el: "#app",
  data: {
    name: ""
  },
  methods: {
    clear() {
      console.log(this);
      for (let i = 0; i <= 5; i++) {
        this.name = i;
      }
    }
  },
  computed: {
    info() {
      return `我叫${this.name}`;
    }
  }
});
