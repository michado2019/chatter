import "./Home.css";
import LandingPage from "../landingPage/LandingPage";
import Footer from "../../layouts/footer/Footer";
import { UserContext } from "../../context/userContext/UserContext";
import { useContext } from "react";
const Home = () => {
  const userContext = useContext(UserContext);
  return (
    <div className="homeWrapper">
      <div className="homeContents">
        <LandingPage />
        {userContext?.user === null ? "" : <Footer />}
      </div>
    </div>
  );
};

export default Home;
