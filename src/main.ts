import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Vuetify from "vuetify";

import focusDirective from "@/utils/directives/focusDirective";
import intersectionDirective from "@/utils/directives/intersactionDirective";
import "./utils/validation";

import "vuetify/dist/vuetify.min.css";
import "./styles/global.scss";

extend("required", {
  ...required,
  message: "This field is required",
});

Vue.use(Vuetify);
Vue.directive("focus", focusDirective);
Vue.directive("intersection", intersectionDirective);

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  components: {
    ValidationProvider,
  },
  render: (h) => h(App),
}).$mount("#app");
