import "./SignUp.css";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../../layouts/navbar/Navbar";
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";
const SignUp = () => {
  //States
  const [formDisplay, setFormDisplay] = useState(true);

  return (
    <div className="signUp-wrapper">
      <Navbar navbarLinks={navbarLinks}/>
      <div className="signIn-Contents">
        <div
          className="signIn-Contents1"
          style={{ height: formDisplay ? "130vh" : "" }}
        >
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
                borderBottom:
                  formDisplay === true ? "6px solid #543ee0" : "6px solid #ccc",
                transition: "all 0.3s",
              }}
            >
              <Link to="/sign-in/register" className="signIn-Contents2_link2">
                Register
              </Link>
            </h2>
            <h2
              className="signIn-Contents2_link"
              id="signIn-Contents2_link"
              onClick={() => setFormDisplay(false)}
              style={{
                borderBottom:
                  formDisplay === true ? "6px solid #ccc" : "6px solid #543ee0",
                transition: "all 0.3s",
              }}
            >
              <Link to="/sign-in/login" className="signIn-Contents2_link2">
                Log in
              </Link>
            </h2>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
