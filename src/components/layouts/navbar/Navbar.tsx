import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavbarLink } from "./navbarData/NavabarData";
import { MenuOutlined, CancelOutlined } from "@mui/icons-material";
import { CustomNavLink } from "../../hooks/CustomNavLinks";
import { SwitchContext } from "../../context/switchContext/SwitchContext";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from "../../context/userContext/UserContext";

const Navbar = (props: NavbarLink) => {
  //useStates
  const [userDisplay, setUserDisplay] = useState(false);
  const userContext = useContext(UserContext); // This is a useContext for user
  const [user, setUser] = useState(userContext?.user);

  //useContexts
  const switchContext = useContext(SwitchContext); // This is a useContext for switch of navbar

  //Handle signout
  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("user");
        userContext?.setUser(null);
        console.log("out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const defaultAvatarSrc = ""; //Default image

  //useEffect
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);
  return (
    <div className="navbarWrapper">
      <div className="navbarContents">
        <Link to="/" className="navbarLogo">
          CHATTER
        </Link>
        <ul className="navbarLinksOne">
          {props.navbarLinks.map((navbarLink) => {
            return (
              <li key={navbarLink.id} className="navbarLink-list">
                <CustomNavLink
                  to={navbarLink.link}
                  className="navbarLinksOne-link"
                >
                  {navbarLink.name}
                </CustomNavLink>
              </li>
            );
          })}
        </ul>
        <div
          className="navbarLinksTwo"
          style={{ display: userContext?.user !== null ? "none" : "block" }}
        >
          <Link
            to="/sign-up"
            className="navbarLinksTwo-link"
            id="navbarLinksTwo-link"
          >
            Sign up
          </Link>
          {userContext?.user === null ? (
            <Link
              to="/sign-in"
              className="navbarLinksTwo-link"
              id="navbarLinksTwo-link2"
            >
              Sign in
            </Link>
          ) : (
            <button
              className="navbarLinksTwo-link"
              id="navbarSignout"
              onClick={handleSignout}
            >
              Sign out
            </button>
          )}
        </div>
        <div
          className="navbarUser-flex"
          style={{
            display: userContext?.user === null ? "none" : "",
            marginBottom: userDisplay ? "-40px" : "0",
          }}
        >
          <img
            src={user?.photoURL || defaultAvatarSrc} // Use the default image source if photoUrl is falsy
            alt="User"
            className="navbarUser_avatar"
            onClick={() => setUserDisplay((prev) => !prev)}
          />
          <button
            className="navbarLinksTwo-link"
            id="navbarSignout"
            onClick={handleSignout}
            style={{ display: userDisplay ? "block" : "none" }}
          >
            Sign out
          </button>
        </div>
        <div className="navbarMenu-div">
          {switchContext?.state ? (
            <CancelOutlined
              className="navbarMenu"
              onClick={() => switchContext?.setState(!switchContext?.state)}
            />
          ) : (
            <MenuOutlined
              className="navbarMenu"
              onClick={() => switchContext?.setState(!switchContext?.state)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;