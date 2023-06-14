import "./Home.css";
import Navbar from "../../layouts/navbar/Navbar";
import SmallScreenNav from "../smallScreenNav/SmallScreenNav";
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";
import LandingPage from "../landingPage/LandingPage";

const Home = () => {
  return (
    <div className="homeWrapper">
        <Navbar navbarLinks={navbarLinks} />
        <SmallScreenNav navbarLinks={navbarLinks} />
      <div className="homeContents">
         <LandingPage />
      </div>
    </div>
  );
};

export default Home;