import { mapActions } from "vuex";

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
