import "./Home.css";
import Navbar from "../../layouts/navbar/Navbar";
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";
import LandingPage from "../landingPage/LandingPage";

const Home = () => {
  return (
    <div className="homeWrapper">
        <Navbar navbarLinks={navbarLinks} />
      <div className="homeContents">
         <LandingPage />
      </div>
    </div>
  );
};

export default Home;