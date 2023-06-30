import Navbar from "../../layouts/navbar/Navbar";
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";
import "./About.css";
const About = () => {
  return (
    <div className="aboutWrapper">
      <div className="aboutContents">
        <Navbar navbarLinks={navbarLinks} />
      </div>
    </div>
  );
};
export default About;