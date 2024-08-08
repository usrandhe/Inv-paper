// validationSchema.js
import * as yup from "yup";

const schema = yup.object().shape({
  shortName: yup.string().required("Please enter a short name"),
  fullName: yup.string().required("Please enter a full name"),
  category: yup.string().required("Please select a category"),
});

export default schema;