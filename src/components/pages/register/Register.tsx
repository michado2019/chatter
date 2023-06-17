import "./Register.css";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormData } from "../signIn/signInData/SignInData";
import { useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";

const Register = () => {
  //State
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [visibility, setVisibility] = useState(false);

  //useContext
  const userContext = useContext(UserContext); //Context for user
  //Handlers
  const handleSignout = () => {
    // Form submission for signout
    localStorage.removeItem("user");
  };

  // Form submission handler
  const handleSignin = (event: React.FormEvent) => {
    event.preventDefault();

    // Form submission for signin & Api call
    if (
      formData.email === "testing@gmail.com" &&
      formData.password === "2052"
    ) {
      //Store userContext on localStorage
      userContext?.setUser({
        firstName: "Mike",
        lastName: "Adeshina",
        email: formData.email,
      });
      localStorage.setItem("user", JSON.stringify(userContext));
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  // Input change handler
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    userContext?.setUser({
      firstName: "Mike",
      lastName: "Adeshina",
      email: formData.email,
    });
  };

  return (
    <div className="registerWrapper">
      <form className="register-form" onSubmit={handleSignin}>
        <label className="register-form_label">You are joining as?</label>
        <select>
          <option value="writer">Writer</option>
          <option value="reader">Reader</option>
        </select>
        <label className="register-form_label">Email address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="formInput"
        />
        <label className="register-form_label">Password</label>
        <div className="registerInputVisibilty-div">
          <input
            type={visibility ? "text/password" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="formInput"
            placeholder="Enter password"
          />
          <label className="register-form_label">Confirm password</label>
          <input
            type="password"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="formInput"
          />
          <div>
            <Visibility
              className="visibility"
              onClick={() => setVisibility((prev) => !prev)}
              style={{ display: visibility ? "flex" : "none" }}
            />
          </div>
          <VisibilityOff
            className="visibility"
            onClick={() => setVisibility((prev) => !prev)}
            style={{ display: visibility ? "none" : "flex" }}
          />
        </div>
        <button className="register-btn">Sign in</button>
        <button onClick={handleSignout}>Sign out</button>
      </form>
    </div>
  );
};

export default Register;
