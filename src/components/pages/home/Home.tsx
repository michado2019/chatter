import "./Home.css";
import LandingPage from "../landingPage/LandingPage";

const Home = () => {
  return (
    <div className="homeWrapper">
      <div className="homeContents">
        <LandingPage />
      </div>
    </div>
  );
};

export default Home;
