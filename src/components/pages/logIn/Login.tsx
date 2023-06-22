import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Login.css";

interface FormDataInterface {
  email: string;
  password: string;
}

const Login = () => {
  const [visibility, setVisibility] = useState(false);
  // Formik configuration
  const formik = useFormik<FormDataInterface>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      // Form submission logic
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <div className="logIn-wrapper">
      <h2 className="logIn-form_title">Welcome back</h2>
      <form className="register-form" onSubmit={formik.handleSubmit}>
        <div className="registerForm1-flex2">
          <label className="registerLabel">Email address</label>
          <input
            type="text"
            placeholder="johndoe@gmail.com"
            className="registerForm2"
            id="registerForm2"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>
        <div className="registerForm1-flex2">
          <label className="registerLabel">Password</label>
          <div className="registerForm-flex_row">
            <input
              type={visibility ? "text" : "password"}
              placeholder="*********"
              className="registerForm2"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Visibility
              className="visibility"
              onClick={() => setVisibility((prev) => !prev)}
              style={{ display: visibility ? "none" : "flex" }}
            />
            <VisibilityOff
              className="visibility"
              onClick={() => setVisibility((prev) => !prev)}
              style={{ display: visibility ? "flex" : "none" }}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
          <button className="logIn-btn">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
