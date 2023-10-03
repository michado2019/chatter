import { useState, useContext, useEffect } from "react";
import "./Register.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import googleImg from "./assets/googleImg.png";
import comfirmPImg from "./assets/VectorconfirmP.png";
import {
  signInWithPopup,
  getAuth,
  provider,
  createUserWithEmailAndPassword,
} from "../../firebase";
import { UserContext } from "../../context/userContext/UserContext";
import { AuthUserType } from "../../context/userContext/userContextData/UserContextData";
import { useNavigate } from "react-router-dom";

//FormData interface
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  //useNagigate to toute to blogs page if user exists
  const navigate = useNavigate();

  //States
  const [visibility, setVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUserType | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  //UserContext
  const userContext = useContext(UserContext);

  //Google sign in
  const handleGoogleSignin = async () => {
    setLoading(true);
    setErrorMessage(null);
    const auth = getAuth();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user !== null) {
          setLoading(false);
        }
        setUser(user);
        //Updating userContext
        userContext?.setUser({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          emailVerified: user.emailVerified,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        setLoading(false);
        console.log(errorMessage);
      });
  };

  // Formik configuration
  const formik = useFormik<FormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      // Form submission logic
      setLoading(true);
      setErrorMessage(null);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user !== null) {
            setLoading(false);
            setSuccessMsg("Registration successful");
            //If there's a user, navigate to sign in page after 3secs
            const navigateToSignIn = () => {
              setTimeout(() => {
                navigate("/sign-in");
              }, 3000);
            };
            navigateToSignIn();
          }
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          setLoading(false);
          setSuccessMsg("Registration not successful");

          //Clear error message aftre 5secs
          const clearError = (setErrorMessage: any) => {
            setTimeout(() => {
              setErrorMessage(null);
              setSuccessMsg("");
            }, 5000);
          };
          clearError(setErrorMessage);
          // ..
        });
      formik.resetForm();
      if (values.email === "" && values.password === "") {
        setErrorMessage(null);
      }
    },
  });

  //UseEffect to save in the localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  //useEffect to navigate to blogs if user exists
  useEffect(() => {
    if (user !== null) {
      navigate("/blogs/feed");
    }
  }, [user, navigate]);

  return (
    <div className="registerWrapper">
      <h2
        className="registerTitle"
        style={{ textAlign: "center", paddingBottom: "15px" }}
      >
        Register as a user of chatter
      </h2>
      {
        //Error message
        errorMessage !== null ? (
          <div className="error-message" id="error-message">
            {errorMessage}
          </div>
        ) : (
          ""
        )
      }
      {
        //Success message
        successMsg !== null ? (
          <div className="error-message" id="error-message">
            {successMsg}
          </div>
        ) : (
          ""
        )
      }
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
                <div className="error-message" id="error-message">
                  {formik.errors.lastName}
                </div>
              )}
            </div>
          </div>
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
                placeholder="Create password"
                className="registerForm2"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="on"
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
                placeholder="Confirm password"
                className="registerForm2"
                id="registerForm22"
                autoComplete="on"
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
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="error-message">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
        </div>
        <button className="signUp-btn" id="signUp-btn" type="submit">
          {
            //Loading
            loading ? "Creating account..." : "Create account"
          }
        </button>
      </form>
      <div className="registerForm1" id="registerForm1">
        <button
          className="signUp-btn"
          id="signUp-btn_white"
          onClick={handleGoogleSignin}
        >
          <img src={googleImg} alt="img" className="signUp-btn_icon" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};
export default Register;
