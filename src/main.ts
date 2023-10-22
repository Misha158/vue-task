import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import focusDirective from "./components/focusDirective";

import "./styles/global.scss";

import "./utils/validation";

extend("required", {
  ...required,
  message: "This field is required",
});

Vue.directive("focus", focusDirective);

new Vue({
  router,
  store,
  components: {
    ValidationProvider,
  },
  render: (h) => h(App),
}).$mount("#app");
