import Navbar from "../../layouts/navbar/Navbar";
import "./About.css";
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";
const About = () => {
  return (
    <div className="aboutWrapper">
      <Navbar navbarLinks={navbarLinks} />
      <p>About us page</p>
    </div>
  );
};
export default About;
