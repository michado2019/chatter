import "./SmallScreenNav.css";
import { SwitchContext } from "../../context/switchContext/SwitchContext";
import { Link } from "react-router-dom";
import { CustomNavLink } from "../../hooks/CustomNavLinks";
import { NavbarLink } from "../../layouts/navbar/navbarData/NavabarData";
import { Avatar } from "@mui/material"; // Updated import statement
import { Email, GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";
import { UserContext } from "../../context/userContext/UserContext";

const SmallScreenNav = (props: NavbarLink) => {
  // useContexts
  const switchContext = useContext(SwitchContext); // This is a useContext for switch of navbar
  const userContext = useContext(UserContext); // This is a useContext for user
  const userData = localStorage.getItem("user");

  // Handle signout
  const handleSignout = () => {
    localStorage.removeItem("user");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("out");
        userContext?.setUser(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // useEffect to handle the current user
  useEffect(() => {
    // Retrieve user data from the localStorage
    if (userData !== null) {
      const parsedUserData = JSON.parse(userData);
      userContext?.setUser(parsedUserData);
    }
  }, []);

  const defaultAvatarSrc = ""; //Default image

  return (
    <div
      className="smallScreenNav-wrapper"
      style={{
        marginLeft: switchContext?.state ? "0" : "-2000px",
        transition: "all 0.5s",
      }}
    >
      <div className="smallScreenNav-contents">
        {userContext?.user === null ? (
          <div className="smallUser-div">
            <Avatar
              className="smallScreen-user_avatar"
              src={defaultAvatarSrc} // Use the default image source
            />
            <h2 className="smallScreen-user_name">Chatter</h2>
          </div>
        ) : (
          <div className="smallUser-div">
            <img
              src={userContext?.user?.photoURL || defaultAvatarSrc} // Use the default image source if photoUrl is falsy
              alt="profilePix"
              className="smallScreen-user_avatar"
            />
            <h2 className="smallScreen-user_name">
              {userContext?.user?.displayName}
            </h2>
          </div>
        )}
        <ul className="smallScreenLinksOne">
          {props.navbarLinks.map((smallScreenLink) => {
            return (
              <li
                key={smallScreenLink.id}
                className="smallScreenLink-list"
                onClick={() => switchContext?.setState(false)}
              >
                <CustomNavLink
                  to={smallScreenLink.link}
                  className="smallScreenLinksOne-link"
                >
                  {smallScreenLink.name}
                </CustomNavLink>
              </li>
            );
          })}
        </ul>
        <div className="smallScreen-sign_instructionDiv">
          <h2 className="smallScreen-sign_instruction">
            Sign up or log in to your Chatter account.
          </h2>
          <p className="smallScreen-sign_time">Takes less than a few seconds</p>
        </div>
        <div className="smallScreenLinksTwo">
          {userContext?.user === null ? (
            <Link
              to="/sign-in"
              className="smallScreenLinksTwo-link"
              onClick={() => switchContext?.setState(false)}
            >
              Sign in
            </Link>
          ) : (
            <button
              className="smallScreenLinksTwo-link"
              id="smallScreen-signout"
              onClick={handleSignout}
            >
              Sign out
            </button>
          )}
          <Link
            to="/sign-up"
            className="smallScreenLinksTwo-link"
            id="smallScreenLinksTwo-link"
            onClick={() => switchContext?.setState(false)}
          >
            Sign up
          </Link>
        </div>
        <div className="smallScreen-social_div">
          <a
            href="https://github.com/michado2019"
            target="_blank"
            rel="noreferrer"
          >
            <GitHub className="smallScreen-social_icon" />
          </a>
          <a
            href="https://twitter.com/Mike_Adeshina"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter className="smallScreen-social_icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/michado2019"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIn className="smallScreen-social_icon" />
          </a>
          <a href="mailto: adeshinaobafemi09@gmail.com">
            <Email className="smallScreen-social_icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SmallScreenNav;
