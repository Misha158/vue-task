import { mapActions } from "vuex";
import * as yup from "yup";
import { extend } from "vee-validate";

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[\p{L}\s]+$/u, "Only alphabets are allowed for this field "),
});

extend("noNumbers", {
  validate: (value) => schema.isValid({ username: value }),
  message: "Only letters are allowed in this field.",
});

export const myMixin = {
  data: () => ({
    username: "",
    phone: "",
  }),

  methods: {
    ...mapActions(["onLogin"]),

    handleLogin: async function () {
      this.onLogin({
        username: this.username,
        phone: this.phone,
      });
    },
  },

  mounted() {
    this.$refs.inputField.focus();
  },
};
