import React, { useState } from "react";
import "./Register.css"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import googleImg from "./assets/googleImg.png";
import linkedInImg from "./assets/linkedInImg.png";
import comfirmPImg from "./assets/VectorconfirmP.png";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
}

const Register = () => {
  // Formik configuration
  const formik = useFormik<FormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "Writer",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      // Form submission logic
      console.log(values);
      formik.resetForm();
    },
  });

  const [visibility, setVisibility] = useState(false);

  return (
    <div className="registerWrapper">
      <h2 className="registerTitle">Register as a Writer/Reader</h2>
      <form className="register-form" onSubmit={formik.handleSubmit}>
        <div className="registerForm1">
          <div className="registerForm1-flex">
            <div className="registerForm1-flex2">
              <label className="registerLabel">First name</label>
              <input
                type="text"
                placeholder="John"
                className="registerForm1-input"
                id="registerForm1-input1"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="error-message">{formik.errors.firstName}</div>
              )}
            </div>
            <div className="registerForm1-flex2">
              <label className="registerLabel">Last name</label>
              <input
                type="text"
                placeholder="Doe"
                className="registerForm1-input"
                id="registerForm1-input2"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="error-message" id="error-message">{formik.errors.lastName}</div>
              )}
            </div>
          </div>
        </div>
        <div className="registerForm1">
          <label className="registerLabel">Are you joining as?</label>
          <select
            className="registerForm1-input2"
            name="userType"
            value={formik.values.userType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="Writer">Writer</option>
            <option value="Reader">Reader</option>
          </select>
        </div>
        <div className="registerForm1-flexx">
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
          </div>
          <div className="registerForm1-flex2">
            <label className="registerLabel">Confirm password</label>
            <div className="registerForm-flex_row">
              <input
                type={visibility ? "text" : "password"}
                placeholder="*********"
                className="registerForm2"
                id="registerForm22"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <img
                src={comfirmPImg}
                alt="img"
                className="visibility"
                onClick={() => setVisibility((prev) => !prev)}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="error-message">{formik.errors.confirmPassword}</div>
            )}
          </div>
        </div>
        <button className="signUp-btn" id="signUp-btn" type="submit">
          Create account
        </button>
      </form>
      <div className="registerForm1" id="registerForm1">
        <button className="signUp-btn" id="signUp-btn_white">
          <img src={googleImg} alt="img" className="signUp-btn_icon" />
          Sign up with Google
        </button>
        <button className="signUp-btn" id="signUp-btn_white">
          <img src={linkedInImg} alt="img" className="signUp-btn_icon" /> Sign
          up with LinkedIn
        </button>
      </div>
    </div>
  );
};

export default Register;
