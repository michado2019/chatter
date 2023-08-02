
import Navbar from "../../layouts/navbar/Navbar";
import "./About.css"
import { navbarLinks } from "../../layouts/navbar/navbarData/NavabarData";
import img from "./assets/myNewProfilePix.jpg"
import Footer from "../../layouts/footer/Footer";
const About = () => {

  return (
    <div>
      <Navbar navbarLinks={navbarLinks} />
      <div className="about-container">
        <h2>About Us</h2>
        <p>
          Welcome to Chatter! We are a multi-functional platform that aims to
          create a vibrant community of authors and readers. Our vision is to
          provide a heaven for bookworms and bloggers, offering access to a
          diverse range of content.
        </p>
        <p>
          At Chatter, we celebrate diversity and foster an inclusive community
          where open-mindedness and respect for all individuals are encouraged.
          We believe in promoting dialogue and understanding, regardless of
          background or beliefs.
        </p>
        <p>
          Whether you're a writer looking to share your creative ideas or a
          reader seeking new and exciting content, Chatter has something to offer
          for everyone. Join us today and be part of our growing community!
        </p>

        <h2>Features</h2>
        <ul>
          <li>Access to a vast collection of articles and blogs</li>
          <li>Real-time analytics for your articles</li>
          <li>Interactive social interactions with other users</li>
          <li>Easy-to-use content creation with built-in Markdown editor</li>
          <li>Customize your profile with a unique avatar</li>
        </ul>

        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={img} alt="Team Member" className="teamImg"/>
            <h3>Adeshina Michael</h3>
            <p>Co-Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src={img} alt="Team Member" className="teamImg"/>
            <h3>Adeshina Michael</h3>
            <p>Co-Founder & CTO</p>
          </div>
          <div className="team-member">
            <img src={img} alt="Team Member" className="teamImg"/>
            <h3>Adeshina Michael</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
