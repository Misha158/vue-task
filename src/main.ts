import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import "./global.scss";

extend("required", {
  ...required,
  message: "This field is required",
});

new Vue({
  router,
  components: {
    ValidationProvider,
  },
  render: (h) => h(App),
}).$mount("#app");
