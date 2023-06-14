import "./LandingPage.css";
import ChatterAbout from "./chatterAbout/ChatterAbout";
import ChatterUsers from "./chatterUsers/ChatterUsers";
import ChatterWelcome from "./chatterWelcome/ChatterWelcome";
const LandingPage = () => {
  return (
    <div className="landingPage-wrapper">
      <div className="landingPage-contents">
        <ChatterWelcome />
        <ChatterAbout />
      </div>
    </div>
  );
};

export default LandingPage;
