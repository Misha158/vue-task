export default {
  inserted: function (el, value) {
    if (value.value) {
      el.focus();
    }
  },
};
