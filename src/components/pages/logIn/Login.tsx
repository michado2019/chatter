import React, { useState, useContext, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthUserType } from "../../context/userContext/userContextData/UserContextData";
import { UserContext } from "../../context/userContext/UserContext";
import "./Login.css";

interface FormDataInterface {
  email: string;
  password: string;
}

const Login = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUserType | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const auth = getAuth();
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            setLoading(false);
            setSuccessMsg("Login successful")
            setUser(user);
            userContext?.setUser({
              displayName: user.displayName,
              email: user.email,
              photoUrl: user?.photoURL,
              emailVerified: user?.emailVerified,
            });
            const navigateToSignIn = () => {
              setTimeout(() => {
                setSuccessMsg(null);
                navigate("/blogs/feed");
              }, 3000);
            };
            navigateToSignIn();
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          setLoading(false);
          const clearError = () => {
            setTimeout(() => {
              setErrorMessage(null);
              setSuccessMsg(null);
            }, 5000);
          };
          clearError();
        });
      formik.resetForm();
    },
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (user !== null) {
      navigate("/blogs/feed");
    }
  }, [user, navigate]);

  return (
    <div className="logIn-wrapper">
      <h2 className="logIn-form_title">Welcome back</h2>
      {errorMessage && <div className="error-message" id="error-message">{errorMessage}</div>}
      {successMsg && <div className="error-message" id="error-message">{successMsg}</div>}
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <div className="loginForm1-flex2">
          <label className="loginLabel">Email address</label>
          <input
            type="text"
            placeholder="johndoe@gmail.com"
            className="loginForm2"
            id="loginForm2"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="loginError-message">{formik.errors.email}</div>
          )}
        </div>
        <div className="loginForm1-flex2">
          <label className="loginLabel">Password</label>
          <div className="loginForm-flex_row">
            <input
              type={visibility ? "text" : "password"}
              placeholder="*********"
              className="loginForm2"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              autoComplete="on"
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
            <div className="loginError-message">{formik.errors.password}</div>
          )}
          <button className="logIn-btn">
            {loading ? "Loging in..." : "Login"}
          </button>
        </div>
      </form>
      <button className="logIn-btn" id="login-btn">
        <Link to="/retrievePassword">Forgot password?</Link>
      </button>
    </div>
  );
};

export default Login;
