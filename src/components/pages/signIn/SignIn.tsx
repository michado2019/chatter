import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { FormData } from "./signInData/SignInData";
import "./SignIn.css";
const SignIn = () => {
  //State
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [formDisplay, setFormDisplay] = useState(false);

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
        <div className="signIn-Contents1">
          <h2 className="signIn-title">CHATTER</h2>
          <p className="signIn-details">
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
        </div>
        <div className="signIn-Contents2">
          <div className="signIn-Contents2_linkDiv">
            <h2
              className="signIn-Contents2_link"
              onClick={() => setFormDisplay(true)}
              style={{
                borderBottom: formDisplay === false ? "#111" : "3px solid #543ee0",
                transition: "all 0.3s",
              }}
            >
              Register
            </h2>
            <h2
              className="signIn-Contents2_link"
              id="signIn-Contents2_link"
              onClick={() => setFormDisplay(false)}
              style={{
                borderBottom: formDisplay === false ? "3px solid #543ee0" : "#111",
                transition: "all 0.3s",
              }}
            >
              Log in
            </h2>
          </div>
          <div>
            <form
              className="signIn-form"
              onSubmit={handleSignin}
              style={{ display: formDisplay === false ? "flex" : "none" }}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="formInput"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="formInput"
              />
              <button className="signIn-btn">Sign in</button>
              <button onClick={handleSignout}>Sign out</button>
            </form>
          </div>
          <div style={{ display: formDisplay === false ? "none" : "flex" }}>
            Register
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;