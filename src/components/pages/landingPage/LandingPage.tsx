import Navbar from "../../layouts/navbar/Navbar";
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";
import "./LandingPage.css";
import ChatterAbout from "./chatterAbout/ChatterAbout";
import ChatterUsers from "./chatterUsers/ChatterUsers";
import ChatterWelcome from "./chatterWelcome/ChatterWelcome";
const LandingPage = () => {
  return (
    <div className="landingPage-wrapper">
      <div className="landingPage-contents">
        <Navbar navbarLinks={navbarLinks} />
        <ChatterWelcome />
        <ChatterAbout />
        <ChatterUsers />
      </div>
    </div>
  );
};

export default LandingPage;
