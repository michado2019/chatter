import React from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { getAuth, sendPasswordResetEmail } from "../../firebase";
import "./RetrievePassword.css";
import Navbar from "../../layouts/navbar/Navbar";
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";

interface FormValues {
  email: string;
}

const ChangePassword = () => {
  const initialValues: FormValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const handleSubmit = (values: FormValues, { setSubmitting, setFieldError }: FormikHelpers<FormValues>) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        setSubmitting(false);
        setFieldError("email", ""); // Clear any previous errors
        alert("Password reset link sent to your email!");
      })
      .catch((error) => {
        setSubmitting(false);
        setFieldError("email", error.message);
      });
  };

  return (
    <div className="changePassword-wrapper">
        <Navbar navbarLinks={navbarLinks}/>
      <div className="changePassword-contents">
        <h2 className="changePassword-title">Change password</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="changePassword-form">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="johndoe@example.com"
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <button className="changePassword-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Password Reset Email"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
