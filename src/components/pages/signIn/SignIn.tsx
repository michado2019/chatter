import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { FormData } from "./signInData/SignInData";
import "./SignIn.css";
import Navbar from "../../layouts/navbar/Navbar";
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

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
      localStorage.setItem("user", JSON.stringify(userContext));
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
    <div className="signIn-wrapper">
      <div className="signIn-Contents">
        <Navbar navbarLinks={navbarLinks} />
        <form className="signIn-form" onSubmit={handleSignin}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button className="signIn-btn">Sign in</button>
        </form>
      </div>
      <button onClick={handleSignout}>Sign out</button>
    </div>
  );
};

export default SignIn;
