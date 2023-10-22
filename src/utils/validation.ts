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

const schemaUserId = yup.object().shape({
  userId: yup.number().min(0),
});

extend("onlyNumbers", {
  validate: (value) => schemaUserId.isValid({ userId: value }),
  message: "Only numbers are allowed in this field.",
});
