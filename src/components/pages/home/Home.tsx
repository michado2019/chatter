import "./Home.css";
import LandingPage from "../landingPage/LandingPage";
import Footer from "../../layouts/footer/Footer";

const Home = () => {
  return (
    <div className="homeWrapper">
      <div className="homeContents">
        <LandingPage />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
