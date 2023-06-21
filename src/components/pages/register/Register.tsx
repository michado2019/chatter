import "./Register.css";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  // State
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "Writer",
  });

  const [visibility, setVisibility] = useState(false);

  // Form submission handler
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Form submission logic
    console.log(formData);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "Writer",
    });
  };

  // Input change handler
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="registerWrapper">
      <h2 className="registerTitle">Register as a Writer/Reader</h2>
      <form className="register-form" onSubmit={handleSubmit}>
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
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="registerForm1-flex2">
              <label className="registerLabel">Last name</label>
              <input
                type="text"
                placeholder="Doe"
                className="registerForm1-input"
                id="registerForm1-input2"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="registerForm1">
          <label className="registerLabel">Are you joining as?</label>
          <select
            className="registerForm1-input2"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
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
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="registerForm1-flex2">
            <label className="registerLabel">Password</label>
            <div className="registerForm-flex_row">
              <input
                type={visibility ? "text" : "password"}
                placeholder="*********"
                className="registerForm2"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
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
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <img
                src={comfirmPImg}
                alt="img"
                className="visibility"
                onClick={() => setVisibility((prev) => !prev)}
              />
            </div>
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
